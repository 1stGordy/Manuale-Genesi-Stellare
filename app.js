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
            injectCharacterSheetButton(navTree); // NEW: Inject Character Sheet Button
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
            const contentArea = document.getElementById('content-area');
            contentArea.style.opacity = '0.5';

            fetch(url)
                .then(res => {
                    // Se il file non c'è (404), blocca tutto qui
                    if (!res.ok) throw new Error(`File non trovato (${res.status})`);
                    return res.text();
                })
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');

                    // Cerca il contenuto
                    const newContentEl = doc.getElementById('content-area');

                    // Se la pagina caricata non ha #content-area (es. è una pagina di errore generica)
                    if (!newContentEl) throw new Error("Struttura pagina non valida (manca #content-area)");

                    const newContent = newContentEl.innerHTML;
                    const newTitle = doc.title;

                    setTimeout(() => {
                        contentArea.innerHTML = newContent;
                        document.title = newTitle;
                        window.history.pushState({}, newTitle, url);
                        if (typeof highlightCurrentPage === 'function') highlightCurrentPage();
                        contentArea.style.opacity = '1';
                        window.scrollTo(0, 0);
                        if (window.innerWidth <= 768 && typeof closeMobileMenu === 'function') {
                            closeMobileMenu();
                        }
                    }, 200);
                })
                .catch(err => {
                    console.error("Errore Navigazione:", err);
                    // Feedback visuale utile per capire cosa manca
                    contentArea.innerHTML = `
                        <div style="padding: 50px; text-align: center; color: #ff6b6b;">
                            <h2 style="margin-bottom: 20px;">⚠️ Ops! Pagina non trovata.</h2>
                            <p>Il sistema non riesce a leggere il file:</p>
                            <code style="background: rgba(0,0,0,0.3); padding: 10px; display: block; margin: 20px auto; max-width: 80%; border-radius: 5px;">${url}</code>
                            <p style="color: #aaa; font-size: 0.9em;">
                                <strong>Suggerimento:</strong> Controlla che la cartella "Rulebook..." sia stata copiata dentro "_WEB_BUILD_V4" 
                                e che tu stia usando "Open with Live Server".
                            </p>
                        </div>
                    `;
                    contentArea.style.opacity = '1';
                });
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
                return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
            });

            keys.forEach(key => {
                if (key === '__files__') {
                    // Sort files naturally
                    data[key].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

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

        function injectCharacterSheetButton(container) {
            const btn = document.createElement('div');
            btn.className = 'nav-item';
            btn.textContent = '🧬 SCHEDA PERSONAGGIO';
            btn.style.fontWeight = 'bold';
            btn.style.color = 'var(--accent-color)';
            btn.style.cursor = 'pointer';
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                loadCharacterSheet();
            };
            // Insert at top
            container.insertBefore(btn, container.firstChild);
        }

        function loadCharacterSheet() {
            // CORS FIX: Use embedded string instead of fetch
            if (window.CHARACTER_SHEET_HTML) {
                const html = window.CHARACTER_SHEET_HTML;
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const sheetContent = doc.querySelector('.cs-v3-container');

                if (!sheetContent) return console.error("Container .cs-v3-container not found in template");

                contentArea.style.opacity = '0';
                setTimeout(() => {
                    contentArea.innerHTML = '';
                    // 1. Inietta l'HTML
                    contentArea.innerHTML = window.CHARACTER_SHEET_HTML;

                    document.title = "Scheda Personaggio - Arcanum";
                    window.history.pushState({}, "Scheda Personaggio", "#character-sheet");

                    // 2. Avvia la logica (SOLO ora che l'HTML c'è)
                    if (window.initCharacterSheet) {
                        console.log("Avvio manuale della logica scheda...");
                        window.initCharacterSheet();
                    } else {
                        console.error("Funzione initCharacterSheet non trovata!");
                    }

                    // 3. Collega Supabase (se necessario)
                    if (window.initSupabase) {
                        window.initSupabase();
                    }

                    contentArea.style.opacity = '1';
                    if (window.innerWidth <= 768) closeMobileMenu();
                }, 200);

            } else {
                console.error("CHARACTER_SHEET_HTML not found. Ensure sheet_template.js is loaded.");
            }
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

        // --- AUTH UI: EMAIL & PASSWORD CON TOGGLE ---

        const modalHTML = `
            <div id="login-modal">
                <div class="login-box">
                    <h3>ACCESSO ARCANUM</h3>
                    <p style="margin-bottom: 15px; font-size: 0.9rem; color: var(--text-muted)">Accedi o crea un nuovo account.</p>
                    
                    <div style="margin-bottom: 10px;">
                        <input type="email" id="login-email" placeholder="Email" class="cs-v3-input" style="width:100%;">
                    </div>

                    <div style="position: relative; margin-bottom: 15px;">
                        <input type="password" id="login-password" placeholder="Password" class="cs-v3-input" style="width:100%; padding-right: 40px;">
                        <span id="toggle-password" style="position: absolute; right: 10px; top: 50%; transform: translateY(-85%); cursor: pointer; font-size: 1.2rem; user-select: none;">
                            👁️
                        </span>
                    </div>
                    
                    <div id="login-status" style="margin-bottom: 10px; font-size: 0.8rem; color: var(--accent-color); min-height: 1.2em;"></div>
                    
                    <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                        <button class="login-btn-confirm" id="btn-do-login" style="flex: 1;">LOGIN</button>
                        <button class="login-btn-confirm" id="btn-do-signup" style="flex: 1; background: var(--secondary-accent);">REGISTRATI</button>
                    </div>
                    <button class="login-btn-cancel" id="login-cancel" style="margin-top: 10px; width: 100%;">ANNULLA</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const loginModal = document.getElementById('login-modal');
        const emailInput = document.getElementById('login-email');
        const passInput = document.getElementById('login-password');
        const togglePassBtn = document.getElementById('toggle-password');
        const statusDiv = document.getElementById('login-status');

        // LOGICA TOGGLE PASSWORD
        togglePassBtn.addEventListener('click', () => {
            const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passInput.setAttribute('type', type);
            // Cambia icona (opzionale, o usa emoji diverse)
            togglePassBtn.textContent = type === 'password' ? '👁️' : '🙈';
        });

        // Close Logic
        document.getElementById('login-cancel').addEventListener('click', () => {
            loginModal.classList.remove('open');
            statusDiv.textContent = "";
        });

        // 2. LOGICA LOGIN
        document.getElementById('btn-do-login').addEventListener('click', async () => {
            const email = emailInput.value;
            const password = passInput.value;

            if (!email || !password) {
                statusDiv.textContent = "Inserisci email e password.";
                statusDiv.style.color = "#ff4444";
                return;
            }

            statusDiv.textContent = "Accesso in corso...";
            statusDiv.style.color = "var(--accent-color)";

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                statusDiv.textContent = "Errore: " + error.message;
                statusDiv.style.color = "#ff4444";
            } else {
                statusDiv.textContent = "Login effettuato!";
                statusDiv.style.color = "#00ff00";
                setTimeout(() => {
                    loginModal.classList.remove('open');
                    window.location.reload();
                }, 800);
            }
        });

        // 3. LOGICA REGISTRAZIONE
        document.getElementById('btn-do-signup').addEventListener('click', async () => {
            const email = emailInput.value;
            const password = passInput.value;

            if (!email || !password) {
                statusDiv.textContent = "Inserisci email e password.";
                statusDiv.style.color = "#ff4444";
                return;
            }

            statusDiv.textContent = "Creazione account...";
            statusDiv.style.color = "var(--secondary-accent)";

            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
            });

            if (error) {
                statusDiv.textContent = "Errore: " + error.message;
                statusDiv.style.color = "#ff4444";
            } else {
                // Check if email confirmation is required
                if (data.user && data.user.identities && data.user.identities.length === 0) {
                    statusDiv.textContent = "Utente già esistente.";
                    statusDiv.style.color = "#ff4444";
                } else {
                    statusDiv.textContent = "Registrazione OK! Controlla la mail (se richiesto).";
                    statusDiv.style.color = "#00ff00";
                    // Se l'auto-confirm è attivo, il login è automatico, altrimenti devono confermare
                }
            }
        });

        // --- SUPABASE INIT (Invariato ma incluso per sicurezza del contesto) ---
        if (window.supabase) {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            window.supabaseClient = supabase;
            console.log("Supabase initialized");

            supabase.auth.getSession().then(({ data: { session } }) => {
                if (session) {
                    console.log("Session found:", session);
                    fetchUserRole(session);
                } else {
                    console.log("No session on load");
                    updateAuthUI(null);
                }
            });

            supabase.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                    if (session) fetchUserRole(session);
                } else if (event === 'SIGNED_OUT') {
                    updateAuthUI(null);
                }
            });
        } else {
            console.warn("Supabase SDK not loaded");
        }

        async function fetchUserRole(session) {
            updateAuthUI(session, true);
            try {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();

                session.user.role = profile ? profile.role : 'player';
            } catch (err) {
                session.user.role = 'player';
            }
            updateAuthUI(session, false);
        }

        function updateAuthUI(session, loading = false) {
            const footer = document.querySelector('.sidebar-footer');
            if (!footer) return;

            const existingBtn = document.getElementById('auth-btn');
            if (existingBtn) existingBtn.remove();

            const authWrapper = document.createElement('div');
            authWrapper.id = 'auth-btn';
            authWrapper.style.display = 'flex';
            authWrapper.style.alignItems = 'center';
            authWrapper.style.marginLeft = '10px';
            authWrapper.style.fontSize = '0.8rem';

            if (session) {
                const userContainer = document.createElement('div');
                userContainer.style.display = 'flex';
                userContainer.style.flexDirection = 'column';
                userContainer.style.marginRight = '8px';
                userContainer.style.lineHeight = '1.2';

                const emailSpan = document.createElement('span');
                emailSpan.textContent = session.user.email.split('@')[0]; // Nome breve
                emailSpan.style.color = 'var(--text-color)';
                emailSpan.style.fontWeight = 'bold';

                const roleSpan = document.createElement('span');
                roleSpan.textContent = loading ? '...' : (session.user.role === 'gm' ? '👑 GM' : '👤 Player');
                roleSpan.style.color = session.user.role === 'gm' ? 'gold' : 'var(--text-muted)';

                userContainer.appendChild(emailSpan);
                userContainer.appendChild(roleSpan);

                const logoutBtn = document.createElement('button');
                logoutBtn.textContent = '🚪';
                logoutBtn.title = 'Logout';
                logoutBtn.style.background = 'none';
                logoutBtn.style.border = '1px solid var(--border-color)';
                logoutBtn.style.color = 'var(--text-color)';
                logoutBtn.style.cursor = 'pointer';
                logoutBtn.style.padding = '4px 8px';
                logoutBtn.style.borderRadius = '4px';
                logoutBtn.style.marginLeft = '5px';

                logoutBtn.onclick = async () => {
                    await supabase.auth.signOut();
                    window.location.reload();
                };

                authWrapper.appendChild(userContainer);
                authWrapper.appendChild(logoutBtn);
            } else {
                const loginBtn = document.createElement('button');
                loginBtn.textContent = '🔑 Accedi';
                loginBtn.style.background = 'var(--accent-color)';
                loginBtn.style.color = 'var(--bg-color)';
                loginBtn.style.border = 'none';
                loginBtn.style.padding = '5px 10px';
                loginBtn.style.borderRadius = '4px';
                loginBtn.style.cursor = 'pointer';
                loginBtn.style.fontWeight = 'bold';

                loginBtn.onclick = () => {
                    document.getElementById('login-modal').classList.add('open');
                };
                authWrapper.appendChild(loginBtn);
            }
            footer.appendChild(authWrapper);
        }

    } catch (error) {
        console.error("Critical Error:", error);
    }
});
