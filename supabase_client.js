// SUPABASE CLIENT INTEGRATION

const SUPABASE_URL = 'https://tmqfxsjjffvdkwzpkysn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtcWZ4c2pqZmZ2ZGt3enBreXNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2OTM3MDEsImV4cCI6MjA4MDI2OTcwMX0.Bb559AxjxIpTp-Aj4Div3j0LBcAdNGsoZjZ-AcZvOOg';

let supabase = null;
let currentUser = null;

function initSupabase() {
    // Check if client is ALREADY initialized globally (by app.js)
    if (window.supabaseClient) {
        supabase = window.supabaseClient;
        // console.log("Supabase Client Reused from Global.");
    } else if (typeof supabase === 'object' && supabase === null && window.supabase && window.supabase.createClient) {
        // Init client myself if not done
        try {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            console.log("Supabase Client Initialized Locally.");
        } catch (e) {
            console.error("Supabase Init Error:", e);
            return;
        }
    } else if (supabase) {
        // Already initialized
        return;
    } else {
        console.error("Supabase Library not found.");
        return;
    }

    // Session Recovery & Auth Listener (Only if init was successful)
    if (supabase) {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                handleUserSession(session.user);
            }
        });

        supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                handleUserSession(session.user);
            } else {
                handleUserLogout();
            }
        });
    }
}

function handleUserSession(user) {
    currentUser = user;
    console.log("Logged in as:", user.email);

    const btnLogin = document.getElementById('btn_login');
    const btnCloudSave = document.getElementById('btn_cloud_save');

    // Update UI
    if (btnLogin) {
        btnLogin.innerHTML = '🟢';
        btnLogin.title = `Login: ${user.email}`;
        btnLogin.onclick = showLogoutModal;
    }
    if (btnCloudSave) {
        btnCloudSave.style.display = 'inline-block';
        btnCloudSave.onclick = saveToCloud;
    }
}

function handleUserLogout() {
    currentUser = null;
    const btnLogin = document.getElementById('btn_login');
    const btnCloudSave = document.getElementById('btn_cloud_save');

    if (btnLogin) {
        btnLogin.innerHTML = '👤';
        btnLogin.title = "Login / Registrati";
        btnLogin.onclick = showAuthModal;
    }
    if (btnCloudSave) {
        btnCloudSave.style.display = 'none';
    }
}

// --- AUTH UI ---

function showAuthModal() {
    if (!supabase) return alert("Errore connessione DB.");

    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay';
    overlay.style.display = 'flex';
    overlay.innerHTML = `
        <div class="custom-modal-box" style="text-align:center;">
            <div class="custom-modal-title">Accesso Cloud</div>
            <div class="custom-modal-body">
                <input type="email" id="auth_email" class="cs-v3-input" placeholder="Email" style="width:100%; margin-bottom:10px;">
                <input type="password" id="auth_pass" class="cs-v3-input" placeholder="Password" style="width:100%; margin-bottom:10px;">
            </div>
            <div class="custom-modal-actions" style="justify-content:center; gap:10px;">
                <button class="cs-v3-btn-sm" id="btn_do_login">Login</button>
                <button class="cs-v3-btn-sm" id="btn_do_signup">Registrati</button>
                <button class="cs-v3-btn-sm" style="background:#444;" onclick="this.closest('.custom-modal-overlay').remove()">Chiudi</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('btn_do_login').addEventListener('click', async () => {
        const email = document.getElementById('auth_email').value;
        const pass = document.getElementById('auth_pass').value;
        const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) alert("Login Failed: " + error.message);
        else overlay.remove();
    });

    document.getElementById('btn_do_signup').addEventListener('click', async () => {
        const email = document.getElementById('auth_email').value;
        const pass = document.getElementById('auth_pass').value;
        const { error } = await supabase.auth.signUp({ email, password: pass });
        if (error) alert("Signup Failed: " + error.message);
        else {
            alert("Registrazione ok! Controlla la mail.");
            overlay.remove();
        }
    });
}

function showLogoutModal() {
    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay';
    overlay.style.display = 'flex';
    overlay.innerHTML = `
        <div class="custom-modal-box" style="text-align:center;">
            <div class="custom-modal-title">Account</div>
            <div class="custom-modal-body">
                Utente: ${currentUser.email}<br><br>
                <button class="cs-v3-btn-sm" id="btn_cloud_list_load" style="width:100%; margin-bottom:10px;">📂 I Miei Personaggi</button>
            </div>
            <div class="custom-modal-actions" style="justify-content:center; gap:10px;">
                <button class="cs-v3-btn-sm" id="btn_do_logout" style="background:#d9534f;">Logout</button>
                <button class="cs-v3-btn-sm" style="background:#444;" onclick="this.closest('.custom-modal-overlay').remove()">Chiudi</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('btn_do_logout').addEventListener('click', async () => {
        await supabase.auth.signOut();
        overlay.remove();
    });

    document.getElementById('btn_cloud_list_load').addEventListener('click', () => {
        overlay.remove();
        openCloudLoadList();
    });
}

// --- DATA LOGIC ---

async function saveToCloud() {
    if (!currentUser) return alert("Devi essere loggato!");
    if (!window.state) return alert("Errore interno: state non trovato");

    // Sync UI to State
    if (window.initializeStateFromInputs) window.initializeStateFromInputs();

    // Ensure name is captured
    const nameEl = document.getElementById('char_name');
    if (nameEl) window.state.name = nameEl.value;

    const charName = window.state.name || "Senza Nome";

    // UPSERT LOGIC
    // We check if state has a db_id
    const payload = {
        user_id: currentUser.id,
        name: charName,
        data: window.state
    };

    // If we have an ID, we include it to update that specific row
    if (window.state.db_id) {
        payload.id = window.state.db_id;
    }

    const { data, error } = await supabase
        .from('characters')
        .upsert(payload)
        .select()
        .single();

    if (error) {
        console.error("Save Error", error);
        alert("Errore salvataggio: " + error.message);
    } else {
        // Success
        console.log("Saved:", data);
        // Save the ID back to state so future saves update this row
        window.state.db_id = data.id;
        alert("Salvataggio completato! ☁️");
    }
}

async function openCloudLoadList() {
    if (!currentUser) return;

    // Fetch list (id, name only)
    const DM_EMAIL = 'emanuele.capuzzo13@gmail.com';

    let query = supabase
        .from('characters')
        .select('id, name, user_id, profiles(email)'); // Join profiles if possible, otherwise just get user_id (NOTE: Profiles requires foreign key or public view)
    // If profile join fails (no FK), just select id, name, user_id. Assuming profiles table linked via auth.

    // Fallback if profiles not linked in simple schema: just standard select.
    // Ideally we want to know WHO owns the character if we are DM.

    // LOGIC:
    // IF CURRENT USER == DM => Select ALL
    // ELSE => Select WHERE user_id == CURRENT USER

    if (currentUser.email !== DM_EMAIL) {
        query = query.eq('user_id', currentUser.id);
    }

    const { data: list, error } = await query.order('name', { ascending: true });

    if (error) {
        return alert("Errore caricamento lista: " + error.message);
    }

    if (!list || list.length === 0) {
        return alert("Nessun personaggio salvato nel cloud.");
    }

    // Show Selection Modal
    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay';
    overlay.style.display = 'flex';

    let listHtml = list.map(char => {
        let extraInfo = `ID: ...${char.id.slice(-4)}`;
        // DM View: Show owner
        if (currentUser.email === DM_EMAIL && char.user_id !== currentUser.id) {
            const owner = (char.profiles && char.profiles.email) ? char.profiles.email : "Player";
            extraInfo += ` | 👤 ${owner}`;
        }

        return `
        <div style="background:rgba(255,255,255,0.1); padding:10px; margin:5px 0; display:flex; justify-content:space-between; align-items:center; border:1px solid #444;">
            <div style="cursor:pointer; flex:1;" onclick="loadCharacterData('${char.id}')">
                <strong>${char.name}</strong>
                <span style="font-size:0.8em; color:#aaa;">${extraInfo}</span>
            </div>
            <button class="cs-v3-btn-sm" style="background:#d9534f; margin-left:10px; padding:5px 10px;" onclick="deleteCharacter('${char.id}')" title="Elimina">🗑️</button>
        </div>
    `}).join('');

    overlay.innerHTML = `
        <div class="custom-modal-box" style="width:400px; max-height:80vh; display:flex; flex-direction:column;">
            <div class="custom-modal-title">Carica Personaggio</div>
            <div class="custom-modal-body" style="overflow-y:auto; flex:1;">
                ${listHtml}
            </div>
            <div class="custom-modal-actions" style="justify-content:center;">
                <button class="cs-v3-btn-sm" style="background:#444;" onclick="this.closest('.custom-modal-overlay').remove()">Annulla</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Helper attached to window to be clickable from string HTML
    window.loadCharacterData = async (id) => {
        document.body.removeChild(overlay);
        await performLoad(id);
    };

    window.deleteCharacter = async (id) => {
        if (!confirm("Sei sicuro di voler eliminare questo personaggio? Questa azione è irreversibile.")) return;

        const { error } = await supabase
            .from('characters')
            .delete()
            .eq('id', id);

        if (error) {
            alert("Errore eliminazione: " + error.message);
        } else {
            alert("Personaggio eliminato.");
            document.body.removeChild(overlay);
            openCloudLoadList(); // Refresh list
        }
    };
}

async function performLoad(id) {
    const { data, error } = await supabase
        .from('characters')
        .select('data, id') // Select ID too just in case
        .eq('id', id)
        .single();

    if (error) {
        alert("Errore caricamento dati: " + error.message);
    } else if (data) {
        const charData = data.data;
        // Inject ID to state for future upserts
        charData.db_id = data.id;

        // Apply to Global State
        if (window.state) {
            Object.assign(window.state, charData);

            // Re-render UI
            if (window.restoreUIFromState) window.restoreUIFromState();
            if (window.recalculate) window.recalculate();
            if (window.renderSecondaryTabs) window.renderSecondaryTabs();

            alert(`Personaggio "${charData.name}" caricato!`);
        }
    }
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
    // Only init if not triggered by main app (fallback)
    setTimeout(() => {
        if (!supabase) initSupabase();
    }, 1000);
});
