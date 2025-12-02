document.addEventListener('DOMContentLoaded', () => {
    const navTree = document.getElementById('nav-tree');
    const contentArea = document.getElementById('content-area');
    const sidebar = document.getElementById('sidebar');

    // Calculate Absolute App Root at startup
    // This ensures we always resolve links correctly regardless of current "virtual" URL
    const APP_BASE_URL = new URL(window.SITE_ROOT, window.location.href).href;

    // Render Sidebar
    renderSidebar(window.SIDEBAR_DATA, navTree);

    // Highlight current page
    highlightCurrentPage();

    // SPA Navigation Interception
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        // Only intercept internal links that are not hash links
        if (link && link.href && !link.href.includes('#') && link.origin === window.location.origin) {
            // Check if it's a file protocol link
            if (window.location.protocol === 'file:') {
                // Allow navigation, but we need to ensure we don't break relative paths for the NEXT page load
                // if we were to do a full reload. 
                // But for SPA, we just fetch.
            }

            e.preventDefault();
            navigateTo(link.href);
        }
    });

    // Search Functionality
    const searchInput = document.getElementById('sidebar-search');
    let searchIndex = window.SEARCH_INDEX || [];

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            navTree.innerHTML = '';
            renderSidebar(window.SIDEBAR_DATA, navTree);
            highlightCurrentPage();
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
            // Resolve path against APP_BASE_URL
            link.href = new URL(res.path, APP_BASE_URL).href;
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

                contentArea.style.opacity = '0';

                setTimeout(() => {
                    contentArea.innerHTML = newContent;
                    document.title = newTitle;
                    window.history.pushState({}, newTitle, url);

                    highlightCurrentPage();

                    contentArea.style.opacity = '1';
                    window.scrollTo(0, 0);

                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        closeMobileMenu();
                    }
                }, 200);
            })
            .catch(err => console.error("Navigation error:", err));
    }

    function highlightCurrentPage() {
        document.querySelectorAll('.nav-item').forEach(link => {
            link.classList.remove('active');
            // Compare decoded absolute URLs
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
        });
    }

    window.onpopstate = () => {
        navigateTo(window.location.href);
    };

    // Mobile Menu Logic
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileOverlay = document.getElementById('mobile-overlay');

    function toggleMobileMenu() {
        sidebar.classList.toggle('open');
        mobileOverlay.classList.toggle('open');
    }

    function closeMobileMenu() {
        sidebar.classList.remove('open');
        mobileOverlay.classList.remove('open');
    }

    if (mobileBtn && sidebar && mobileOverlay) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    // Helper to render sidebar
    function renderSidebar(data, container) {
        const keys = Object.keys(data).sort((a, b) => {
            if (a === '__files__') return 1;
            if (b === '__files__') return -1;
            return a.localeCompare(b);
        });

        keys.forEach(key => {
            if (key === '__files__') {
                data[key].forEach(file => {
                    const link = document.createElement('a');
                    // Resolve path against APP_BASE_URL
                    link.href = new URL(file.path, APP_BASE_URL).href;
                    link.className = 'nav-item';
                    link.textContent = file.name;
                    container.appendChild(link);
                });
            } else {
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
});
