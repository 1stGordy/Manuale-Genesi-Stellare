document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log("App started");
        // alert("App Caricata! Se vedi questo messaggio, il codice funziona."); // Debug

        const navTree = document.getElementById('nav-tree');
        const contentArea = document.getElementById('content-area');
        const sidebar = document.getElementById('sidebar');

        // Calculate Absolute App Root at startup
        // This ensures we always resolve links correctly regardless of current "virtual" URL
        const APP_BASE_URL = new URL(window.SITE_ROOT, window.location.href).href;

        // Render Sidebar
        if (window.SIDEBAR_DATA) {
            renderSidebar(window.SIDEBAR_DATA, navTree);
        } else {
            console.error("SIDEBAR_DATA missing");
            navTree.innerHTML = "<div>Error: Data missing</div>";
        }

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
        // --- Dice Roller Logic ---
        const diceToggleBtn = document.getElementById('dice-toggle-btn');
        const dicePanel = document.getElementById('dice-panel');
        const closeDiceBtn = document.getElementById('close-dice-btn');
        const diceBtns = document.querySelectorAll('.dice-btn');
        const diceValueDisplay = document.getElementById('dice-value');
        const diceAnim = document.getElementById('dice-animation');
        const diceLog = document.getElementById('dice-log');

        function toggleDicePanel() {
            if (dicePanel) dicePanel.classList.toggle('open');
        }

        if (diceToggleBtn) diceToggleBtn.addEventListener('click', toggleDicePanel);
        if (closeDiceBtn) closeDiceBtn.addEventListener('click', toggleDicePanel);

        if (diceBtns) {
            diceBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const sides = parseInt(btn.getAttribute('data-sides'));
                    rollDice(sides);
                });
            });
        }

        function rollDice(sides) {
            if (diceValueDisplay) diceValueDisplay.style.display = 'none';
            if (diceAnim) {
                diceAnim.classList.add('rolling');
                diceAnim.style.display = 'block';
            }

            setTimeout(() => {
                const result = Math.floor(Math.random() * sides) + 1;

                if (diceAnim) {
                    diceAnim.classList.remove('rolling');
                    diceAnim.style.display = 'none';
                }
                if (diceValueDisplay) {
                    diceValueDisplay.style.display = 'block';
                    diceValueDisplay.textContent = result;
                }

                addToLog(sides, result);
            }, 600);
        }

        function addToLog(sides, result) {
            if (!diceLog) return;
            const li = document.createElement('li');
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            let resultClass = 'roll-val';
            if (sides === 20 && result === 20) resultClass = 'crit-success';
            if (sides === 20 && result === 1) resultClass = 'crit-fail';

            li.innerHTML = `<span>${time} - d${sides}</span> <span class="${resultClass}">${result}</span>`;

            diceLog.prepend(li);
            if (diceLog.children.length > 20) {
                diceLog.removeChild(diceLog.lastChild);
            }
        }

        // --- Supabase Integration ---
        const SUPABASE_URL = 'https://tmqfxsjjffvdkwzpkysn.supabase.co';
        const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtcWZ4c2pqZmZ2ZGt3enBreXNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2OTM3MDEsImV4cCI6MjA4MDI2OTcwMX0.Bb559AxjxIpTp-Aj4Div3j0LBcAdNGsoZjZ-AcZvOOg';

        let supabase = null;
        if (window.supabase) {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            console.log("Supabase initialized");
            checkSession();
        } else {
            console.warn("Supabase SDK not loaded");
            // Fallback UI
            const footer = document.querySelector('.sidebar-footer');
            if (footer) {
                const authBtn = document.createElement('button');
                authBtn.textContent = '⚠️ No Cloud';
                authBtn.title = 'Supabase SDK missing';
                authBtn.style.marginLeft = '10px';
                footer.appendChild(authBtn);
            }
        }

        async function checkSession() {
            const { data: { session } } = await supabase.auth.getSession();
            updateAuthUI(session);
        }

        function updateAuthUI(session) {
            const footer = document.querySelector('.sidebar-footer');
            if (!footer) return;

            // Remove existing auth btn if any
            const existingBtn = document.getElementById('auth-btn');
            if (existingBtn) existingBtn.remove();

            const authBtn = document.createElement('button');
            authBtn.id = 'auth-btn';
            authBtn.style.marginLeft = '10px';

            if (session) {
                authBtn.textContent = '👤 Profilo';
                authBtn.onclick = () => {
                    alert(`Loggato come: ${session.user.email}`);
                    // Future: Open Profile Modal
                };

                const logoutBtn = document.createElement('button');
                logoutBtn.textContent = '🚪';
                logoutBtn.title = 'Logout';
                logoutBtn.style.marginLeft = '5px';
                logoutBtn.onclick = async () => {
                    await supabase.auth.signOut();
                    window.location.reload();
                };
                footer.appendChild(logoutBtn);
            } else {
                authBtn.textContent = '🔑 Login';
                authBtn.onclick = () => {
                    const email = prompt("Inserisci la tua email per il Magic Link:");
                    if (email) handleLogin(email);
                };
            }
            footer.appendChild(authBtn);
        }

        async function handleLogin(email) {
            const { error } = await supabase.auth.signInWithOtp({ email });
            if (error) {
                alert('Errore: ' + error.message);
            } else {
                alert('Controlla la tua email per il link di accesso!');
            }
        }

    } catch (error) {
        alert("Errore Critico JS: " + error.message);
        console.error(error);
    }
});
