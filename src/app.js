document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log("App started");

        const navTree = document.getElementById('nav-tree');
        const contentArea = document.getElementById('content-area');
        const sidebar = document.getElementById('sidebar');

        // Calculate Absolute App Root at startup
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
            if (link && link.href && !link.href.includes('#') && link.origin === window.location.origin) {
                if (window.location.protocol === 'file:') {
                    // Allow navigation for file protocol
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
                if (decodeURIComponent(link.href) === decodeURIComponent(window.location.href)) {
                    link.classList.add('active');
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

        // Inject Login Modal HTML
        const modalHTML = `
            <div id="login-modal">
                <div class="login-box">
                    <h3>ACCESSO ARCANUM</h3>
                    <p style="margin-bottom: 15px; font-size: 0.9rem; color: var(--text-muted)">Inserisci la tua email per ricevere il Magic Link.</p>
                    <input type="email" id="login-email" placeholder="nome@esempio.com">
                    <div style="display: flex; justify-content: center;">
                        <button class="login-btn-confirm" id="login-confirm">INVIA LINK</button>
                        <button class="login-btn-cancel" id="login-cancel">ANNULLA</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const loginModal = document.getElementById('login-modal');
        const loginEmailInput = document.getElementById('login-email');
        const loginConfirmBtn = document.getElementById('login-confirm');
        const loginCancelBtn = document.getElementById('login-cancel');

        if (loginCancelBtn) {
            loginCancelBtn.addEventListener('click', () => {
                loginModal.classList.remove('open');
            });
        }

        if (loginConfirmBtn) {
            loginConfirmBtn.addEventListener('click', () => {
                const email = loginEmailInput.value;
                if (email) {
                    handleLogin(email);
                    loginModal.classList.remove('open');
                }
            });
        }

        if (window.supabase) {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            console.log("Supabase initialized");

            supabase.auth.onAuthStateChange((event, session) => {
                if (session) {
                    fetchUserRole(session);
                } else {
                    updateAuthUI(null);
                }
            });

        } else {
            console.warn("Supabase SDK not loaded");
            const footer = document.querySelector('.sidebar-footer');
            if (footer) {
                const authBtn = document.createElement('button');
                authBtn.textContent = '⚠️ No Cloud';
                footer.appendChild(authBtn);
            }
        }

        async function fetchUserRole(session) {
            try {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();
                
                if (profile) {
                    session.user.role = profile.role;
                } else {
                    session.user.role = 'player';
                }
            } catch (err) {
                console.error("Error fetching role:", err);
                session.user.role = 'player';
            }
            updateAuthUI(session);
        }

        function updateAuthUI(session) {
            const footer = document.querySelector('.sidebar-footer');
            if (!footer) return;

            const existingBtn = document.getElementById('auth-btn');
            if (existingBtn) existingBtn.remove();

            const authWrapper = document.createElement('div');
            authWrapper.id = 'auth-btn';
            authWrapper.style.display = 'flex';
            authWrapper.style.alignItems = 'center';
            authWrapper.style.marginLeft = '10px';

            if (session) {
                const roleBadge = document.createElement('span');
                roleBadge.textContent = session.user.role === 'gm' ? '👑 GM' : '👤 Player';
                roleBadge.style.fontSize = '0.8rem';
                roleBadge.style.marginRight = '8px';
                roleBadge.style.color = session.user.role === 'gm' ? 'gold' : 'var(--text-muted)';
                
                const logoutBtn = document.createElement('button');
                logoutBtn.textContent = '🚪';
                logoutBtn.title = 'Logout';
                logoutBtn.style.background = 'none';
                logoutBtn.style.border = '1px solid var(--border-color)';
                logoutBtn.style.color = 'var(--text-color)';
                logoutBtn.style.cursor = 'pointer';
                logoutBtn.style.padding = '2px 6px';
                logoutBtn.style.borderRadius = '4px';
                
                logoutBtn.onclick = async () => {
                    await supabase.auth.signOut();
                };
                
                authWrapper.appendChild(roleBadge);
                authWrapper.appendChild(logoutBtn);
            } else {
                const loginBtn = document.createElement('button');
                loginBtn.textContent = '🔑 Login';
                loginBtn.onclick = () => {
                    loginModal.classList.add('open');
                };
                authWrapper.appendChild(loginBtn);
            }
            footer.appendChild(authWrapper);
        }

        async function handleLogin(email) {
            const { error } = await supabase.auth.signInWithOtp({ 
                email,
                options: {
                    emailRedirectTo: window.location.href
                }
            });
            if (error) {
                alert('Errore: ' + error.message);
            } else {
                alert('Controlla la tua email! Clicca sul Magic Link per entrare.');
            }
        }

    } catch (error) {
        alert("Errore Critico JS: " + error.message);
        console.error(error);
    }
});