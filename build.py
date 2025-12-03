import os
import shutil
import markdown
import re
import json
import stat

# Configuration
# Determine Root: If we are in 'web-guide' (local dev), look up. Otherwise (GitHub Actions), look here.
if os.path.basename(os.getcwd()) == 'web-guide':
    VAULT_ROOT = os.path.dirname(os.getcwd())
else:
    VAULT_ROOT = os.getcwd()

OUTPUT_DIR = os.path.join(os.getcwd(), 'public')
TEMPLATE_PATH = os.path.join(os.getcwd(), 'src', 'template.html')
ASSETS_DIR_NAME = 'immagini' # Name of the assets folder in Obsidian
IGNORE_DIRS = {'.obsidian', 'web-guide', '.git', '.gemini', '.agent', '.github', 'public', 'src', 'build', 'dist'}
ALLOWED_DIRS = ['Rulebook Genesi Stellare'] # Only these directories will be included

# Helper to handle permission errors on Windows
def on_rm_error(func, path, exc_info):
    os.chmod(path, stat.S_IWRITE)
    try:
        func(path)
    except Exception:
        pass

# Ensure output directory exists
if os.path.exists(OUTPUT_DIR):
    try:
        shutil.rmtree(OUTPUT_DIR, onerror=on_rm_error)
    except Exception as e:
        print(f"Warning: Could not fully clean output directory: {e}")

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(os.path.join(OUTPUT_DIR, 'assets'), exist_ok=True)

# Data structures
sidebar_tree = {}
search_index = []
file_mapping = {} # filename -> output_path (relative to public)

def scan_vault(root_dir):
    """Scans the vault and builds a file mapping."""
    for root, dirs, files in os.walk(root_dir):
        # Filter directories
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS and not d.startswith('.')]
        
        # Check if current root is within an allowed directory
        # rel_root = os.path.relpath(root, root_dir)
        # if rel_root == '.':
        #     # At root, only traverse into allowed dirs
        #     dirs[:] = [d for d in dirs if d in ALLOWED_DIRS]
        #     continue
        
        # If we are not in an allowed dir (and not at root), skip
        # (The logic above handles the entry into allowed dirs, so we just need to ensure we don't traverse out? 
        # os.walk is recursive, so if we filter at root, we are good.)
        
        for file in files:
            if file.endswith('.md'):
                abs_path = os.path.join(root, file)
                rel_path = os.path.relpath(abs_path, root_dir)
                
                # Create output path
                html_filename = os.path.splitext(file)[0] + '.html'
                # Maintain directory structure in output
                output_rel_path = os.path.join(os.path.dirname(rel_path), html_filename)
                
                file_mapping[os.path.splitext(file)[0]] = {
                    'source': abs_path,
                    'output': output_rel_path,
                    'rel_dir': os.path.dirname(rel_path)
                }

def build_sidebar_structure(root_dir):
    """Builds a nested dictionary for the sidebar."""
    tree = {}
    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS and not d.startswith('.')]
        
        # Filter allowed dirs at root
        rel_root = os.path.relpath(root, root_dir)
        if rel_root == '.':
            dirs[:] = [d for d in dirs if d in ALLOWED_DIRS]
        
        rel_path = os.path.relpath(root, root_dir)
        if rel_path == '.':
            current_level = tree
        else:
            parts = rel_path.split(os.sep)
            current_level = tree
            for part in parts:
                if part not in current_level:
                    current_level[part] = {}
                current_level = current_level[part]
        
        # Add files to current level
        if '__files__' not in current_level:
            current_level['__files__'] = []
            
        for file in files:
            if file.endswith('.md'):
                page_name = os.path.splitext(file)[0]
                if page_name in file_mapping:
                     current_level['__files__'].append({
                         'name': page_name,
                         'path': file_mapping[page_name]['output'].replace(os.sep, '/')
                     })
    return tree

def generate_html(title, content, sidebar_json, root_path):
    with open(TEMPLATE_PATH, 'r', encoding='utf-8') as f:
        template = f.read()
    
    html = template.replace('{{TITLE}}', title)
    html = html.replace('{{CONTENT}}', content)
    html = html.replace('{{ SIDEBAR_DATA }}', json.dumps(sidebar_json))
    html = html.replace('{{ROOT}}', root_path)
    return html

def main():
    print(f"Scanning vault at: {VAULT_ROOT}")
    scan_vault(VAULT_ROOT)
    
    print(f"Found {len(file_mapping)} markdown files.")
    
    sidebar_data = build_sidebar_structure(VAULT_ROOT)
    
    # Copy assets
    assets_src = os.path.join(VAULT_ROOT, ASSETS_DIR_NAME)
    if os.path.exists(assets_src):
        print("Copying assets...")
        for file in os.listdir(assets_src):
            shutil.copy2(os.path.join(assets_src, file), os.path.join(OUTPUT_DIR, 'assets', file))
    
    # Process files
    md = markdown.Markdown(extensions=['tables', 'fenced_code', 'nl2br'])
    
    for page_name, info in file_mapping.items():
        with open(info['source'], 'r', encoding='utf-8') as f:
            raw_md = f.read()
            
        # Calculate relative root path
        # info['output'] is like 'Folder/Subfolder/Page.html'
        # We need to go up 2 levels: '../../'
        path_parts = info['output'].replace('\\', '/').split('/')
        depth = len(path_parts) - 1
        root_path = '../' * depth if depth > 0 else './'
        
        # Convert to HTML
        html_content = md.convert(raw_md)
        
        # Post-process (Wikilinks, Images) with relative paths
        def replace_link(match):
            link_text = match.group(1)
            target_page = link_text.split('|')[0]
            label = link_text.split('|')[1] if '|' in link_text else target_page
            
            if target_page in file_mapping:
                target_info = file_mapping[target_page]
                # Calculate relative path from current page to target page
                target_rel_path = root_path + target_info['output'].replace(os.sep, '/')
                return f'<a href="{target_rel_path}" class="internal-link" data-link="{target_page}">{label}</a>'
            else:
                return f'<span class="broken-link">{label}</span>'

        def replace_image(match):
            image_name = match.group(1)
            import urllib.parse
            encoded_name = urllib.parse.quote(image_name)
            return f'<img src="{root_path}assets/{encoded_name}" alt="{image_name}" loading="lazy" class="content-image">'

        html_content = re.sub(r'!\[\[(.*?)\]\]', replace_image, html_content)
        html_content = re.sub(r'\[\[(.*?)\]\]', replace_link, html_content)
        
        # Add to search index (store path relative to root)
        search_index.append({
            'title': page_name,
            'content': raw_md[:200],
            'path': info['output'].replace(os.sep, '/') # This is relative to root
        })
        
        # Generate full HTML page
        full_html = generate_html(page_name, html_content, sidebar_data, root_path)
        
        # Write to output
        output_path = os.path.join(OUTPUT_DIR, info['output'])
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(full_html)
            
    # Write search index to JS file (for file:// protocol support)
    with open(os.path.join(OUTPUT_DIR, 'search_data.js'), 'w', encoding='utf-8') as f:
        f.write(f"window.SEARCH_INDEX = {json.dumps(search_index)};")
        
    # Copy static assets (css, js)
    shutil.copy2(os.path.join(os.getcwd(), 'src', 'style.css'), os.path.join(OUTPUT_DIR, 'style.css'))
    shutil.copy2(os.path.join(os.getcwd(), 'src', 'app.js'), os.path.join(OUTPUT_DIR, 'app.js'))
    shutil.copy2(os.path.join(os.getcwd(), 'src', 'rules_data.js'), os.path.join(OUTPUT_DIR, 'rules_data.js'))

    # Copy components directory
    components_src = os.path.join(os.getcwd(), 'src', 'components')
    if os.path.exists(components_src):
        components_dst = os.path.join(OUTPUT_DIR, 'components')
        if os.path.exists(components_dst):
             shutil.rmtree(components_dst)
        shutil.copytree(components_src, components_dst)
    
    # Generate default index.html if missing
    index_path = os.path.join(OUTPUT_DIR, 'index.html')
    if not os.path.exists(index_path):
        print("Generating default index.html...")
        welcome_content = """
        <div class="welcome-message">
            <h2>Benvenuto nel Tuo Manuale</h2>
            <p>Usa la barra laterale per navigare tra i contenuti del tuo Vault.</p>
            <p>Qui troverai tutte le tue note convertite in un sito web moderno.</p>
        </div>
        """
        # index.html is at root, so root_path is ./
        full_html = generate_html("Home", welcome_content, sidebar_data, "./")
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(full_html)
    
    print("Build complete!")

if __name__ == "__main__":
    main()
