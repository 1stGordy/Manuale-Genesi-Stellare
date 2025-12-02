document.addEventListener('DOMContentLoaded', () => {
    const navTree = document.getElementById('nav-tree');
    const contentArea = document.getElementById('content-area');
    const sidebar = document.getElementById('sidebar');

    // Render Sidebar
    renderSidebar(window.SIDEBAR_DATA, navTree);

    // Highlight current page
    // We need to match the current path. 
    // window.location.pathname might be absolute file path.
    // Let's try to match by filename if possible or fuzzy match.
    const currentUrl = window.location.href;
    const allLinks = document.querySelectorAll('.nav-item');

    allLinks.forEach(link => {
        // Compare absolute URLs to handle relative paths correctly
        // We use decodeURIComponent to handle encoded spaces in URLs (e.g. %20 vs space)
        try {
            if (decodeURIComponent(link.href) === decodeURIComponent(window.location.href)) {
                link.classList.add('active');
                // Expand parents
                let parent = link.parentElement;
                while (parent && parent.id !== 'nav-tree') {
                    if (parent.classList.contains('nav-folder')) {
                        parent.classList.add('open');
                    }
                    parent = parent.parentElement;
                }
            }
        } catch (e) {
            console.error("Error matching links:", e);
        }
    });

    // SPA Navigation Interception
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        // Only intercept internal links that are not hash links
        if (link && link.href && !link.href.includes('#') && link.origin === window.location.origin) {
            // Check if it's a file protocol link
            if (window.location.protocol === 'file:') {
                // For file protocol, we can't easily use fetch() to get other files due to CORS/security
                // unless we are careful. But usually file:// fetch is blocked.
                // So for file protocol, we should just let the browser navigate normally.
                return;
            }

            e.preventDefault();
            navigateTo(link.href);
        }
    });

    // Search Functionality
    const searchInput = document.getElementById('sidebar-search');
    // Load from global variable (injected via search_data.js)
    let searchIndex = window.SEARCH_INDEX || [];

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            // Restore tree
            navTree.innerHTML = '';
            renderSidebar(window.SIDEBAR_DATA, navTree);
            return;
        }

        const results = searchIndex.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query)
        );

        renderSearchResults(results);
    });

    function renderSearchResults(results) {
        navTree.innerHTML = '';
        if (results.length === 0) {
            navTree.innerHTML = '<div style="padding:10px; color: var(--text-muted)">Nessun risultato.</div>';
            return;
        }

        results.forEach(res => {
            const link = document.createElement('a');
            // res.path is relative to root. We need to make it relative to current page?
            // Or just absolute?
            // If we are at root, res.path is fine.
            // If we are deep, we need window.SITE_ROOT + res.path
            link.href = window.SITE_ROOT + res.path;
            link.className = 'nav-item';
            link.textContent = res.title;
            navTree.appendChild(link);
        });
    }

    function navigateTo(url) {
        fetch(url)
            .then(res => res.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newContent = doc.getElementById('content-area').innerHTML;
                const newTitle = doc.title;

                // Fade out
                contentArea.style.opacity = '0';

                setTimeout(() => {
                    contentArea.innerHTML = newContent;
                    document.title = newTitle;
                    window.history.pushState({}, newTitle, url);

                    // Update active link
                    document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active'));
                    // Re-highlight logic...

                    // Fade in
                    contentArea.style.opacity = '1';
                    window.scrollTo(0, 0);
                }, 200);
            });
    }

    window.onpopstate = () => {
        navigateTo(window.location.href);
    };
});

function renderSidebar(data, container) {
    // Sort keys: folders first, then files
    const keys = Object.keys(data).sort((a, b) => {
        if (a === '__files__') return 1;
        if (b === '__files__') return -1;
        return a.localeCompare(b);
    });

    keys.forEach(key => {
        if (key === '__files__') {
            data[key].forEach(file => {
                const link = document.createElement('a');
                // file.path is relative to public root. 
                // We need to prepend SITE_ROOT to make it relative to current page
                link.href = window.SITE_ROOT + file.path;
                link.className = 'nav-item';
                link.textContent = file.name;
                container.appendChild(link);
            });
        } else {
            // It's a folder
            const folder = document.createElement('div');
            folder.className = 'nav-folder';

            const title = document.createElement('div');
            title.className = 'nav-folder-title';
            title.textContent = key;
            title.onclick = (e) => {
                e.stopPropagation();
                folder.classList.toggle('open');
            };

            const content = document.createElement('div');
            content.className = 'nav-folder-content';

            folder.appendChild(title);
            folder.appendChild(content);
            container.appendChild(folder);

            renderSidebar(data[key], content);
        }
    });
}
