import os
import re
import json

# Configuration
# Adjust these paths based on where the script runs
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONTENT_DIR = os.path.join(BASE_DIR, 'Rulebook Genesi Stellare')
OUTPUT_FILE = os.path.join(BASE_DIR, 'web-guide', 'src', 'rules_data.js')

# Regex Patterns
# Species
RE_SPECIES_TRAITS_HEADER = re.compile(r'\*\*TRATTI DEGLI (.*?)\*\*', re.IGNORECASE)
RE_TRAIT = re.compile(r'\*\*(.*?)\.\*\*\s*(.*)', re.DOTALL)
RE_SUBRACE = re.compile(r'###\s+(.*)')

# Classes
RE_CLASS_TITLE = re.compile(r'^##\s+(.*)$', re.MULTILINE)
RE_HIT_DIE = re.compile(r'\*\*Dadi Vita:\*\*\s*(.*)')
RE_PROFICIENCIES = re.compile(r'\*\*Competenze\*\*', re.IGNORECASE)
RE_COMP_ARMOR = re.compile(r'\*\*Armature:\*\*\s*(.*)')
RE_COMP_WEAPONS = re.compile(r'\*\*Armi:\*\*\s*(.*)')
RE_COMP_TOOLS = re.compile(r'\*\*Strumenti:\*\*\s*(.*)')
RE_COMP_SAVES = re.compile(r'\*\*Tiri Salvezza:\*\*\s*(.*)')
RE_COMP_SKILLS = re.compile(r'\*\*Abilità:\*\*\s*(.*)')

# Powers
RE_POWER_GRADE = re.compile(r'##\s+Grado\s+(\d+)', re.IGNORECASE)
RE_POWER_TITLE = re.compile(r'###\s+(.*)')
RE_POWER_FIELD = re.compile(r'[-*]\s*\*\*(.*?):\*\*\s*(.*)')

data = {
    "species": {},
    "classes": {},
    "powers": {} # Keyed by Class Name -> Grade -> List
}

def parse_species(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    filename = os.path.basename(file_path)
    species_name = filename.replace('.md', '').split('_')[-1].replace('.md', '') # Remove number prefix
    
    # Find main traits section
    traits_match = RE_SPECIES_TRAITS_HEADER.search(content)
    if not traits_match:
        # Fallback: use filename
        pass

    species_data = {
        "name": species_name,
        "traits": [],
        "subraces": []
    }

    # Split by headers to find subraces
    sections = re.split(r'^###\s+', content, flags=re.MULTILINE)
    
    # First section is Intro + Base Traits
    base_section = sections[0]
    # Extract bold traits
    for line in base_section.split('\n'):
        m = RE_TRAIT.match(line.strip())
        if m:
            species_data["traits"].append({
                "name": m.group(1),
                "description": m.group(2).strip()
            })

    # Subsequent sections are subraces (usually)
    for section in sections[1:]:
        lines = section.split('\n')
        subrace_name = lines[0].strip().replace('**', '') # Clean name
        
        # Check if it's actually a subrace or just a section
        # Heuristic: Subraces usually have "Aumento dei Punteggi" or similar traits
        is_subrace = False
        sub_traits = []
        for line in lines[1:]:
            m = RE_TRAIT.match(line.strip())
            if m:
                is_subrace = True
                sub_traits.append({
                    "name": m.group(1),
                    "description": m.group(2).strip()
                })
        
        if is_subrace:
            species_data["subraces"].append({
                "name": subrace_name,
                "traits": sub_traits
            })

    data["species"][species_name] = species_data
    print(f"Parsed Species: {species_name}")

def parse_class(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    filename = os.path.basename(file_path)
    class_name = filename.replace('.md', '').split('_')[-1]
    
    class_data = {
        "name": class_name,
        "hit_die": "1d8", # Default
        "proficiencies": {},
        "features": [], # TODO: Parse table or feature list
        "subclasses": []
    }
    
    # Extract Base Stats
    m_hd = RE_HIT_DIE.search(content)
    if m_hd: class_data["hit_die"] = m_hd.group(1).strip()
    
    m_armor = RE_COMP_ARMOR.search(content)
    if m_armor: class_data["proficiencies"]["armor"] = m_armor.group(1).strip()
    
    m_weap = RE_COMP_WEAPONS.search(content)
    if m_weap: class_data["proficiencies"]["weapons"] = m_weap.group(1).strip()
    
    m_saves = RE_COMP_SAVES.search(content)
    if m_saves: class_data["proficiencies"]["saves"] = m_saves.group(1).strip()
    
    data["classes"][class_name] = class_data
    print(f"Parsed Class: {class_name}")
    
    # Parse Powers (Compendium)
    # Look for "Compendio" or "Poteri" section
    if "Compendio" in content or "Poteri Esper" in content:
        parse_powers(content, class_name)

def parse_powers(content, class_name):
    powers_by_grade = {}
    
    # Split by Grade
    grade_sections = re.split(r'^##\s+Grado\s+(\d+)', content, flags=re.MULTILINE)
    
    # re.split returns [preamble, grade_num, section_content, grade_num, section_content...]
    # We skip 0 (preamble)
    
    for i in range(1, len(grade_sections), 2):
        grade = grade_sections[i]
        section_text = grade_sections[i+1]
        
        powers_list = []
        
        # Split by Power Title (### Name)
        power_chunks = re.split(r'^###\s+', section_text, flags=re.MULTILINE)
        
        for chunk in power_chunks[1:]: # Skip empty first chunk
            lines = chunk.strip().split('\n')
            power_name = lines[0].strip()
            
            power_obj = {
                "name": power_name,
                "grade": grade,
                "description": ""
            }
            
            desc_lines = []
            for line in lines[1:]:
                field_match = RE_POWER_FIELD.match(line.strip())
                if field_match:
                    key = field_match.group(1).lower().replace(' ', '_')
                    val = field_match.group(2).strip()
                    power_obj[key] = val
                else:
                    if line.strip():
                        desc_lines.append(line.strip())
            
            power_obj["description"] = " ".join(desc_lines)
            powers_list.append(power_obj)
            
        powers_by_grade[grade] = powers_list

    data["powers"][class_name] = powers_by_grade
    print(f"Parsed Powers for {class_name}: Found {len(powers_by_grade)} grades")

def main():
    print(f"Scanning content in: {CONTENT_DIR}")
    
    # Walk through directories
    for root, dirs, files in os.walk(CONTENT_DIR):
        for file in files:
            if not file.endswith('.md'): continue
            
            full_path = os.path.join(root, file)
            
            if "01_Specie" in root:
                if "introduzione" not in file:
                    parse_species(full_path)
            elif "02_classi" in root:
                parse_class(full_path)
            elif "04_Esper power" in root:
                # Handle generic powers if any, or specific class powers if separated
                pass

    # Write JSON
    js_content = f"window.RULES_DATA = {json.dumps(data, indent=2, ensure_ascii=False)};"
    
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"Successfully wrote rules data to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
