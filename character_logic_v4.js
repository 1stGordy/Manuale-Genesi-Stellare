/* character_logic_v4.js */

// Global State
const state = {
    baseStats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    raceKey: null,
    archetypeKey: null,
    classKey: null,
    specializationKey: null,
    gender: null, // New
    alignment: null, // New

    level: 1,
    xp: 0,

    hp: {
        max: 10,
        current: 10,
        temp: 0,
        rolled_hp: 0, // Cumulative rolls for levels > 1
        manualOverride: false // NUOVO FLAG
    },

    inventory: {
        weapons: [],   // { name, range, damage, type, ammo, notes }
        equipped: [], // NUOVO: Array per Armature/Scudi { name, ac, strReq, stealth, type }
        backpack: [], // RINOMINATO: Era 'equipment', ora oggetti generici
        vehicles: [],  // { name, type, speed, notes }
        currency: 0    // Karma (formerly Cubil)
    },

    skills: {}, // { "SkillName": true/false }
    feats: [], // List of { name, req, desc }
    asiStatBoosts: 0, // Number of stat boosts taken instead of feats
    preferences: {
        avatarBase64: null,
        theme: 'default'
    },

    editLocked: true, // New flag for Lock Mode

    // ESPER STATE
    esper: {
        preparedSpells: [], // Array of strings (names)
        slotsUsed: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
    }
};

let ELEMENTS = {};

// Initialization
// document.addEventListener('DOMContentLoaded', init); // REMOVED: Must be called manually
window.initCharacterSheet = init; // Expose globally

function init() {
    console.log("Initializing Character Logic V4 (Final Fixes)...");
    injectModalHtml();
    injectLockButton(); // MANDATORY: Inject Lock Button
    mapElements();

    if (typeof RULES_DATA === 'undefined') {
        console.error("RULES_DATA not found. Check rules_data_v4.js");
        return;
    }

    initializeStateFromInputs();
    populateRaceDropdown();
    populateClassDropdown();
    setupListeners();
    setupTabs();
    setupGlobalHelpers();

    // Initial Lock State
    toggleEditMode(true);

    // Initial Load or Render
    // loadCharacter(); // <--- COMMENTA O RIMUOVI QUESTA RIGA PER AVVIO PULITO
    recalculate(); // Lascia solo questo per renderizzare la scheda "vergine"

    // Auth Overlay if needed
    checkAuth();
}

function checkAuth() {
    // Check session or local storage
    const isLoggedIn = sessionStorage.getItem('starfinder_session');

    if (!isLoggedIn) {
        // Mostra il modale di Benvenuto ma NON caricare nulla automaticamente
        // L'utente partirà con una scheda vuota
        showCustomModal("Benvenuto", "Inserisci il nome del personaggio per iniziare una nuova scheda:", "text", (name) => {
            if (name) {
                sessionStorage.setItem('starfinder_session', 'true');
                document.getElementById('char_name').value = name;
                state.name = name;
                // Non salviamo né carichiamo nulla, solo impostiamo il nome
                recalculate();
            }
        });
    }
    // Se è già loggato, NON facciamo nulla (scheda vuota finché non carica dal cloud/file)
}

function injectLockButton() {
    // FIX 1: Explicit Injection of Lock Button next to Dropdowns
    const dropdownRow = document.querySelector('.cs-v3-sub');
    if (dropdownRow && !document.getElementById('btn_lock_edit')) {
        const btn = document.createElement('button');
        btn.id = 'btn_lock_edit';
        btn.className = 'cs-v3-btn-sm';
        btn.style.marginLeft = '10px';
        btn.title = 'Sblocca/Blocca Modifiche';
        btn.innerHTML = '🔒';
        dropdownRow.appendChild(btn);
    }
}

function injectModalHtml() {
    if (!document.getElementById('custom-modal-overlay')) {
        const html = `
        <div id="custom-modal-overlay" class="custom-modal-overlay">
            <div class="custom-modal-box">
                <div id="custom-modal-title" class="custom-modal-title">Titolo</div>
                <div id="custom-modal-body" class="custom-modal-body">Messaggio</div>
                <div id="custom-modal-input-container"></div>
                <div class="custom-modal-actions" id="custom-modal-actions">
                    <button class="cs-v3-btn-sm" id="custom-modal-cancel">Annulla</button>
                    <button class="cs-v3-btn-sm" id="custom-modal-confirm">Conferma</button>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', html);
    }
}

function mapElements() {
    ELEMENTS = {
        race: document.getElementById('char_race'),
        archetype: document.getElementById('char_archetype'),
        class: document.getElementById('char_class'),
        spec: document.getElementById('char_spec'),
        gender: document.getElementById('char_gender'),
        alignment: document.getElementById('char_align'),
        size: document.getElementById('char_size'),
        age: document.getElementById('char_age'), // Might as well add Age while here

        // FIX 1: Missing Mapping

        // FIX 1: Missing Mapping
        levelDisplay: document.getElementById('char_level_display'),

        // FIX 1: Mapping Lock Button
        btnLock: document.getElementById('btn_lock_edit'),

        attr_str: document.getElementById('attr_str'),
        attr_dex: document.getElementById('attr_dex'),
        attr_con: document.getElementById('attr_con'),
        attr_int: document.getElementById('attr_int'),
        attr_wis: document.getElementById('attr_wis'),
        attr_cha: document.getElementById('attr_cha'),

        mod_str: document.getElementById('mod_str'),
        mod_dex: document.getElementById('mod_dex'),
        mod_con: document.getElementById('mod_con'),
        mod_int: document.getElementById('mod_int'),
        mod_wis: document.getElementById('mod_wis'),
        mod_cha: document.getElementById('mod_cha'),

        size: document.getElementById('char_size'),
        speed: document.getElementById('stat_speed'),
        prof: document.getElementById('stat_prof'),
        stat_init: document.getElementById('stat_init'), // NEW
        stat_ac: document.getElementById('stat_ac'),     // NEW
        featuresList: document.getElementById('features-list'),

        xpDisplay: document.getElementById('xp_display'),
        xpBar: document.getElementById('xp_bar'),
        btnAddXp: document.getElementById('btn_add_xp'),

        hpDisplay: document.getElementById('hp_display'),
        hpBar: document.getElementById('hp_bar'),
        hpCurrent: document.getElementById('hp_current'),
        hpMax: document.getElementById('hp_max'),
        hpTemp: document.getElementById('hp_temp'),
        // Note: We need to find the container for temp HP overlay if not present, but user asked for logic.
        // We will assume a .bar-track exists parent to hpBar.

        // PERSISTENCE & MEDIA
        portraitUpload: document.getElementById('portrait_upload'),
        portraitImg: document.getElementById('char_portrait_img'),
        portraitPlaceholder: document.getElementById('char_portrait_placeholder'),
        btnSave: document.getElementById('btn_save'),
        btnLoad: document.getElementById('btn_load'), // This is mostly for file, but we can dual use
        fileInput: document.getElementById('file_input'),

        tabs: document.querySelectorAll('.cs-v3-tab'),
        tabPanes: document.querySelectorAll('.tab-pane'),

        tabWeapons: document.getElementById('tab-weapons'),
        tabEquipment: document.getElementById('tab-equipment'),
        tabVehicles: document.getElementById('tab-vehicles'),
        tabNotes: document.getElementById('tab-notes'),
        tabSkills: document.getElementById('tab-skills'),
        tabFeats: document.getElementById('tab-feats')
    };

    // Inject Temp HP Overlay into HP Bar Track if missing
    if (ELEMENTS.hpBar && ELEMENTS.hpBar.parentElement) {
        if (!ELEMENTS.hpBar.parentElement.querySelector('.temp-hp-fill')) {
            const tempDiv = document.createElement('div');
            tempDiv.className = 'temp-hp-fill';
            tempDiv.style.width = '0%';
            ELEMENTS.hpBar.parentElement.appendChild(tempDiv);
            ELEMENTS.hpTempFill = tempDiv;
        } else {
            ELEMENTS.hpTempFill = ELEMENTS.hpBar.parentElement.querySelector('.temp-hp-fill');
        }
    }
}

function initializeStateFromInputs() {
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(stat => {
        const input = ELEMENTS[`attr_${stat}`];
        if (input) state.baseStats[stat] = parseInt(input.value) || 10;
    });

    if (ELEMENTS.gender) state.gender = ELEMENTS.gender.value;
    if (ELEMENTS.alignment) state.alignment = ELEMENTS.alignment.value;
    if (ELEMENTS.size) state.size = ELEMENTS.size.value;
    if (ELEMENTS.age) state.age = ELEMENTS.age.value;

    // FIX: Salva esplicitamente le Note prima di qualsiasi salvataggio
    const noteEl = document.querySelector('#tab-notes textarea');
    if (noteEl) state.notes = noteEl.value;
}


function setupGlobalHelpers() {
    window.addWeapon = addWeapon;
    window.removeWeapon = removeWeapon;
    window.updateWeapon = updateWeapon;

    // NEW HELPERS
    window.addEquipped = addEquipped;
    window.removeEquipped = removeEquipped;
    window.updateEquipped = updateEquipped;
    window.addBackpack = addBackpack;
    window.removeBackpack = removeBackpack;
    window.updateBackpack = updateBackpack;

    window.addVehicle = addVehicle;
    window.removeVehicle = removeVehicle;
    window.updateVehicle = updateVehicle;
    window.addXP = addXP;
    window.toggleSkill = toggleSkill;
    window.addFeat = addFeat;
    window.removeFeat = removeFeat;
    window.toggleAsiStatBoost = toggleAsiStatBoost;
    window.openFeatModal = openFeatModal;
    window.closeFeatModal = closeFeatModal;
    window.closeFeatModal = closeFeatModal;
    window.updateFeatModalList = updateFeatModalList;
    window.downloadCharacter = downloadCharacter;

    // ESPER HELPERS
    window.renderEsperTab = renderEsperTab;
    window.updateEsperModalList = updateEsperModalList;
    window.togglePrepared = toggleEsperPreparation;
    window.toggleEsperSlot = toggleEsperSlot;
    window.openEsperModal = openEsperModal;
    window.closeEsperModal = closeEsperModal;
    window.resetEsperPreparations = resetEsperPreparations;
    window.cycleSolarianAttunement = cycleSolarianAttunement;

    // Expose for Supabase Client
    window.state = state;
    window.restoreUIFromState = restoreUIFromState;
    window.recalculate = recalculate;
    window.renderSecondaryTabs = renderSecondaryTabs;
}

// --- DATA POPULATION ---
function populateRaceDropdown() {
    if (!ELEMENTS.race) { console.warn("Race dropdown not found in DOM"); return; }
    ELEMENTS.race.innerHTML = '<option value="">Razza</option>';
    Object.keys(RULES_DATA.races).forEach(key => {
        const race = RULES_DATA.races[key];
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = race.name;
        ELEMENTS.race.appendChild(opt);
    });
}

function populateClassDropdown() {
    ELEMENTS.class.innerHTML = '<option value="">Classe</option>';
    if (RULES_DATA.classes) {
        Object.keys(RULES_DATA.classes).forEach(key => {
            const cls = RULES_DATA.classes[key];
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = cls.name;
            ELEMENTS.class.appendChild(opt);
        });
    }
}

// --- LISTENERS ---
// --- LISTENERS ---
function setupListeners() {
    if (ELEMENTS.btnLock) {
        ELEMENTS.btnLock.addEventListener('click', () => {
            toggleEditMode(!state.editLocked);
        });
    }

    ELEMENTS.race.addEventListener('change', handleRaceChange);
    ELEMENTS.archetype.addEventListener('change', handleArchetypeChange);
    ELEMENTS.class.addEventListener('change', handleClassChange);

    ELEMENTS.spec.addEventListener('change', handleSpecChange);

    // New Listeners for Persistence Fields
    ['gender', 'alignment', 'size', 'age'].forEach(key => {
        if (ELEMENTS[key]) {
            ELEMENTS[key].addEventListener('change', (e) => {
                state[key] = e.target.value;
            });
        }
    });

    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(stat => {
        const input = ELEMENTS[`attr_${stat}`];
        if (input) {
            // FIX: Usa 'input' per reattività immediata (e chiama la nuova funzione)
            input.addEventListener('input', (e) => {
                updateBaseStat(stat, e.target.value);
            });
        }
    });

    if (ELEMENTS.btnAddXp) {
        ELEMENTS.btnAddXp.addEventListener('click', () => {
            showCustomModal("Aggiungi XP", "Inserisci l'ammontare di XP da aggiungere:", "number", (val) => {
                const amount = parseInt(val);
                if (amount) addXP(amount);
            });
        });
    }

    if (ELEMENTS.hpCurrent) ELEMENTS.hpCurrent.addEventListener('change', (e) => {
        state.hp.current = parseInt(e.target.value) || 0;
        updateVitalsUI();
    });
    if (ELEMENTS.hpTemp) ELEMENTS.hpTemp.addEventListener('change', (e) => {
        state.hp.temp = parseInt(e.target.value) || 0;
        updateVitalsUI();
    });

    // FIX 4: HP Manual Override & Recalc Button
    // FIX NOTE: Salva il contenuto della textarea nello stato quando cambia
    const noteArea = document.querySelector('#tab-notes textarea');
    if (noteArea) {
        // Carica note salvate all'avvio
        noteArea.value = state.notes || "";

        // Ascolta modifiche
        noteArea.addEventListener('input', (e) => {
            state.notes = e.target.value;
        });
    }

    // FIX HP IBRIDI: Calcola la differenza (Bonus/Malus) quando l'utente scrive
    if (ELEMENTS.hpMax) {
        ELEMENTS.hpMax.addEventListener('change', (e) => {
            const typedValue = parseInt(e.target.value) || 0;
            const baseValue = getCalculatedBaseHP();

            // La differenza diventa il "Bonus Manuale" permanente
            state.hp.bonus = typedValue - baseValue;

            recalculate();
        });
    }

    // BOTTONE RESET HP
    let btnRecalc = document.getElementById('btn_recalc_hp');
    if (!btnRecalc && ELEMENTS.hpMax && ELEMENTS.hpMax.parentNode) {
        // Create if missing
        btnRecalc = document.createElement('button');
        btnRecalc.id = 'btn_recalc_hp';
        btnRecalc.className = 'cs-v3-btn-sm';
        btnRecalc.style.marginLeft = '5px';
        btnRecalc.style.padding = '2px 6px';
        btnRecalc.style.fontSize = '0.7rem';
        btnRecalc.title = 'Ricalcola HP Max (Rimuove manuale)';
        btnRecalc.innerHTML = '↺';
        ELEMENTS.hpMax.parentNode.appendChild(btnRecalc);
    }

    if (btnRecalc) {
        // Rimuove eventuali vecchi listener clonando il nodo
        const newBtn = btnRecalc.cloneNode(true);
        if (btnRecalc.parentNode) btnRecalc.parentNode.replaceChild(newBtn, btnRecalc);

        newBtn.addEventListener('click', () => {
            if (confirm("Vuoi rimuovere le modifiche manuali ai PF e tornare al calcolo standard?")) {
                state.hp.bonus = 0; // Azzera il bonus
                recalculate();
            }
        });
    }

    // --- NEW LISTENERS ---

    // Avatar Upload
    if (ELEMENTS.portraitPlaceholder) {
        ELEMENTS.portraitPlaceholder.addEventListener('click', () => ELEMENTS.portraitUpload.click());
    }
    if (ELEMENTS.portraitImg) {
        ELEMENTS.portraitImg.addEventListener('click', () => ELEMENTS.portraitUpload.click());
    }
    if (ELEMENTS.portraitUpload) {
        ELEMENTS.portraitUpload.addEventListener('change', handlePortraitUpload);
    }

    // Persistence
    if (ELEMENTS.btnSave) {
        ELEMENTS.btnSave.addEventListener('click', () => {
            // New Flow: Ask where to save
            showCustomModal("Salvataggio", "Dove vuoi salvare il personaggio?", "text", (choice) => {
                // This modal is usually OK/Cancel + Input. We need a choice modal.
                // Let's overload the logic or just use a simple confirm/alert?
                // Creating a custom simple prompt is better.
                // Simpler: Just save to Browser AND Download? Or custom modal with 2 buttons.

                // Let's implement a proper dual-choice modal or hijack this one.
                // Actually, let's just make a new simple helper: `showSaveChoiceModal`
                showSaveChoiceModal();
            });
        });
    }

    // Load from File (Backup)
    if (ELEMENTS.btnLoad) {
        ELEMENTS.btnLoad.addEventListener('click', () => {
            // Choice Modal for Load
            showLoadChoiceModal();
        });
    }
    if (ELEMENTS.fileInput) {
        ELEMENTS.fileInput.addEventListener('change', handleFileUpload);
    }
}

// --- PERSISTENCE & MEDIA LOGIC ---

function handlePortraitUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // 1. Basic Check (still useful to avoid massive files)
    if (file.size > 10 * 1024 * 1024) {
        alert("File troppo grande (Max 10MB per upload iniziale).");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            // 2. Canvas Compression
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Max dimensions
            const MAX_WIDTH = 500;
            const MAX_HEIGHT = 500;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            // 3. Export as JPEG with 0.7 quality
            const dataUrl = canvas.toDataURL('image/jpeg', 0.7);

            if (!state.preferences) state.preferences = {};
            state.preferences.avatarBase64 = dataUrl;
            updatePortraitUI();

            // Auto-save attempt
            saveCharacter();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function updatePortraitUI() {
    if (state.preferences && state.preferences.avatarBase64) {
        ELEMENTS.portraitImg.src = state.preferences.avatarBase64;
        ELEMENTS.portraitImg.style.display = 'block';
        ELEMENTS.portraitPlaceholder.style.display = 'none';
    } else {
        ELEMENTS.portraitImg.style.display = 'none';
        ELEMENTS.portraitPlaceholder.style.display = 'block'; // Ensure flexible display or block
    }
}



function showSaveChoiceModal() {
    // Quick custom modal for choice
    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay';
    overlay.style.display = 'flex';
    overlay.innerHTML = `
        <div class="custom-modal-box" style="text-align:center;">
            <div class="custom-modal-title">Salva Personaggio</div>
            <div class="custom-modal-body">Scegli dove salvare i dati:</div>
            <div class="custom-modal-actions" style="justify-content:center; gap:10px;">
                <button class="cs-v3-btn-sm" onclick="saveToLocalStorage(); document.body.removeChild(this.closest('.custom-modal-overlay'));">Browser (Locale)</button>
                <button class="cs-v3-btn-sm" onclick="downloadCharacter(); document.body.removeChild(this.closest('.custom-modal-overlay'));">Scarica File (JSON)</button>
                <button class="cs-v3-btn-sm" style="background:#444;" onclick="document.body.removeChild(this.closest('.custom-modal-overlay'));">Annulla</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

}

function showLoadChoiceModal() {
    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay';
    overlay.style.display = 'flex';
    overlay.innerHTML = `
        <div class="custom-modal-box" style="text-align:center;">
            <div class="custom-modal-title">Carica Personaggio</div>
            <div class="custom-modal-body">Scegli da dove caricare i dati:</div>
            <div class="custom-modal-actions" style="justify-content:center; gap:10px;">
                <button class="cs-v3-btn-sm" onclick="loadFromLocalStorage(); document.body.removeChild(this.closest('.custom-modal-overlay'));">Browser (Locale)</button>
                <button class="cs-v3-btn-sm" onclick="triggerFileUpload(); document.body.removeChild(this.closest('.custom-modal-overlay'));">Carica File (JSON)</button>
                <button class="cs-v3-btn-sm" style="background:#444;" onclick="document.body.removeChild(this.closest('.custom-modal-overlay'));">Annulla</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function loadFromLocalStorage() {
    loadCharacter();
    alert("Caricato dal Browser!");
}

function triggerFileUpload() {
    if (ELEMENTS.fileInput) ELEMENTS.fileInput.click();
}

function saveToLocalStorage() {
    saveCharacter();
    alert("Salvato nel Browser con successo!");
}

function downloadCharacter() {
    initializeStateFromInputs();
    const nameEl = document.getElementById('char_name');
    if (nameEl) state.name = nameEl.value;

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", (state.name || "character") + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function saveCharacter() {
    // Sync inputs to state before saving (just in case)
    initializeStateFromInputs();
    // Need to sync name too
    const nameEl = document.getElementById('char_name');
    if (nameEl) state.name = nameEl.value; // Store name in state if not already

    try {
        localStorage.setItem('starfinder_char_v4', JSON.stringify(state));
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            alert("Errore: Impossibile salvare! L'immagine è troppo grande per il browser.\nRiduci la dimensione o usa il download file.");
        } else {
            alert("Errore durante il salvataggio: " + e.message);
        }
    }
}

function loadCharacter() {
    const data = localStorage.getItem('starfinder_char_v4');
    if (data) {
        try {
            const loadedState = JSON.parse(data);
            // Verify structure matches V4 (rudimentary check)
            if (loadedState.baseStats) {
                // Merge loaded state into current state
                Object.assign(state, loadedState);

                // Restore UI
                restoreUIFromState();
                recalculate();
                renderSecondaryTabs();
                console.log("Character loaded from LocalStorage.");
                return;
            }
        } catch (e) {
            console.error("Error loading save:", e);
        }
    }
    // Fallback if no save or error
    recalculate();
    renderSecondaryTabs();
}

function restoreUIFromState() {
    // Inputs Base
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(stat => {
        if (ELEMENTS[`attr_${stat}`]) ELEMENTS[`attr_${stat}`].value = state.baseStats[stat] + getStatBonus(stat);
    });

    if (state.name && document.getElementById('char_name')) {
        document.getElementById('char_name').value = state.name;
    }

    if (state.gender && ELEMENTS.gender) ELEMENTS.gender.value = state.gender;
    if (state.alignment && ELEMENTS.alignment) ELEMENTS.alignment.value = state.alignment;
    if (state.size && ELEMENTS.size) ELEMENTS.size.value = state.size;
    if (state.age && ELEMENTS.age) ELEMENTS.age.value = state.age;

    // Dropdowns (Popolamento manuale per coerenza)
    if (state.raceKey) {
        ELEMENTS.race.value = state.raceKey;
        // Popola archetipi
        ELEMENTS.archetype.innerHTML = '<option value="">Archetipo</option>';
        if (RULES_DATA.races[state.raceKey]?.archetypes) {
            Object.keys(RULES_DATA.races[state.raceKey].archetypes).forEach(archKey => {
                const arch = RULES_DATA.races[state.raceKey].archetypes[archKey];
                const opt = document.createElement('option');
                opt.value = archKey;
                opt.textContent = arch.name;
                ELEMENTS.archetype.appendChild(opt);
            });
            ELEMENTS.archetype.disabled = false;
        }
    }
    if (state.archetypeKey) ELEMENTS.archetype.value = state.archetypeKey;

    if (state.classKey) {
        ELEMENTS.class.value = state.classKey;
        // Popola specializzazioni
        ELEMENTS.spec.innerHTML = '<option value="">Specializzazione</option>';
        if (RULES_DATA.classes[state.classKey]?.specializations) {
            Object.keys(RULES_DATA.classes[state.classKey].specializations).forEach(specKey => {
                const spec = RULES_DATA.classes[state.classKey].specializations[specKey];
                const opt = document.createElement('option');
                opt.value = specKey;
                opt.textContent = spec.name;
                ELEMENTS.spec.appendChild(opt);
            });
        }
    }
    if (state.specializationKey) ELEMENTS.spec.value = state.specializationKey;

    // Vitals
    if (ELEMENTS.hpCurrent) ELEMENTS.hpCurrent.value = state.hp.current;
    if (ELEMENTS.hpMax) ELEMENTS.hpMax.value = state.hp.max;
    if (ELEMENTS.hpTemp) ELEMENTS.hpTemp.value = state.hp.temp;

    // FIX NOTE: Ripristina il testo delle note nella textarea
    const noteEl = document.querySelector('#tab-notes textarea');
    if (noteEl) {
        noteEl.value = state.notes || "";
    }

    // Assicura che gli array esistano
    if (!state.inventory.backpack) state.inventory.backpack = [];
    if (!state.inventory.equipped) state.inventory.equipped = [];

    // Aggiorna Avatar
    updatePortraitUI();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const loadedState = JSON.parse(e.target.result);
            Object.assign(state, loadedState);
            restoreUIFromState();
            recalculate();
            renderSecondaryTabs();
            alert("Personaggio caricato da file!");
        } catch (err) {
            alert("Errore nel file di salvataggio.");
        }
    };
    reader.readAsText(file);
}

function toggleEditMode(locked) {
    state.editLocked = locked;

    // Toggle Button Visual
    if (ELEMENTS.btnLock) {
        ELEMENTS.btnLock.innerHTML = locked ? "🔒" : "🔓";
        ELEMENTS.btnLock.style.background = locked ? "transparent" : "var(--accent-color)";
        ELEMENTS.btnLock.style.color = locked ? "var(--text-color)" : "#000";
    }

    // Toggle Dropdowns
    ELEMENTS.race.disabled = locked;

    // Archetype and Spec logic depends on selection too, but Lock overrides all
    if (locked) {
        ELEMENTS.archetype.disabled = true;
        ELEMENTS.class.disabled = true;
        ELEMENTS.spec.disabled = true;
    } else {
        // Unlock but respect logic
        ELEMENTS.class.disabled = false;
        ELEMENTS.archetype.disabled = !state.raceKey; // Enable only if race selected
        // Spec enabled only if Class selected AND Level >= 3
        const canPickSpec = state.classKey && state.level >= 3;
        ELEMENTS.spec.disabled = !canPickSpec;
    }
}

// --- HANDLERS ---
function handleRaceChange() {
    const raceKey = ELEMENTS.race.value;
    state.raceKey = raceKey;
    state.archetypeKey = null;
    ELEMENTS.archetype.innerHTML = '<option value="">Archetipo</option>';

    // Only enable if not locked
    if (!state.editLocked) {
        ELEMENTS.archetype.disabled = true;
    }

    if (raceKey && RULES_DATA.races[raceKey]) {
        const race = RULES_DATA.races[raceKey];
        if (race.archetypes) {
            Object.keys(race.archetypes).forEach(archKey => {
                const arch = race.archetypes[archKey];
                const opt = document.createElement('option');
                opt.value = archKey;
                opt.textContent = arch.name;
                ELEMENTS.archetype.appendChild(opt);
            });
            if (!state.editLocked) ELEMENTS.archetype.disabled = false;
        }
        if (race.size && ELEMENTS.size) ELEMENTS.size.value = race.size;
        if (race.speed && ELEMENTS.speed) ELEMENTS.speed.textContent = race.speed + "m";
    }
    recalculate();
}

function handleArchetypeChange() {
    state.archetypeKey = ELEMENTS.archetype.value;
    recalculate();
}

function handleClassChange() {
    state.classKey = ELEMENTS.class.value;
    state.specializationKey = null;
    ELEMENTS.spec.innerHTML = '<option value="">Specializzazione</option>';

    // Spec Logic: Only enable if Level >= 3 and not locked
    const canPickSpec = state.classKey && state.level >= 3 && !state.editLocked;
    ELEMENTS.spec.disabled = !canPickSpec;

    if (state.classKey && RULES_DATA.classes[state.classKey]) {
        const cls = RULES_DATA.classes[state.classKey];
        const hpLabel = document.querySelector('#hp_display').parentElement.querySelector('span:first-child');
        if (hpLabel) hpLabel.textContent = `PUNTI FERITA (${cls.hit_die})`;

        if (cls.specializations) {
            Object.keys(cls.specializations).forEach(specKey => {
                const spec = cls.specializations[specKey];
                const opt = document.createElement('option');
                opt.value = specKey;
                opt.textContent = spec.name;
                ELEMENTS.spec.appendChild(opt);
            });
        }
        if (state.level < 3) {
            ELEMENTS.spec.disabled = true;
        }
    }

    // FIX 4: Retroactive HP Calculation (Average)
    // Formula: (MaxDie + Mod) + ((AvgDie + Mod) * (Lvl - 1))
    // We update rolled_hp to match the "average" expectations for levels > 1
    if (state.classKey && RULES_DATA.classes[state.classKey] && state.level > 1) {
        const cls = RULES_DATA.classes[state.classKey];
        const hitDieMax = parseInt(cls.hit_die.replace('1d', ''));
        const hitDieAvg = (hitDieMax / 2) + 0.5; // e.g. d6 (3.5), d10 (5.5)

        // rolled_hp in our state tracks the RAW dice rolls for levels 2..N
        // We set it to: (Avg) * (Level - 1)
        // Note: The CON modifier is added in calculateDerivedStats, so here we only store the DIE value.
        // Wait, calculateDerivedStats adds CON to EACH level? 
        // Let's check calculateDerivedStats logic below. 
        // It says: maxHP = lvl1HP + extraHP. 
        // And lvl1HP = hitDie + conMod.
        // extraHP = state.hp.rolled_hp.
        // And logic in LevelUp adds (roll + conMod) to rolled_hp.
        // So rolled_hp INCLUDES Con Mod.

        // Re-calculating Rolled HP (assuming Average Roll + Current Con Mod)
        // We use current CON mod because if CON changes, we want it to apply to all levels retroactively usually?
        // Starfinder/D&D rules say Con applies retroactively. 
        // So if we store strictly the "Rolls + Con", it bakes in the Con at that time.
        // But `calculateDerivedStats` just takes `rolled_hp` and adds it through.

        // Better Approach for Class Change:
        // Set rolled_hp to: (AvgRoll + CurrentCon) * (Level - 1)

        const conMod = parseInt(ELEMENTS.mod_con.textContent) || 0;
        const avgGainPerLevel = Math.floor(hitDieAvg + conMod); // Round down or keep float? Usually floor in HP total? Let's floor per level to be safe/standard.

        state.hp.rolled_hp = avgGainPerLevel * (state.level - 1);
    } else {
        state.hp.rolled_hp = 0;
    }

    calculateDerivedStats();
    state.hp.current = state.hp.max;
    recalculate();
}

function handleSpecChange() {
    state.specializationKey = ELEMENTS.spec.value;
    recalculate();
}

// --- MODAL SYSTEM ---
function showCustomModal(title, message, inputType, callback) {
    const overlay = document.getElementById('custom-modal-overlay');
    const titleEl = document.getElementById('custom-modal-title');
    const bodyEl = document.getElementById('custom-modal-body');
    const inputContainer = document.getElementById('custom-modal-input-container');
    const btnConfirm = document.getElementById('custom-modal-confirm');
    const btnCancel = document.getElementById('custom-modal-cancel');

    if (!overlay) return;

    titleEl.textContent = title;
    bodyEl.textContent = message;
    inputContainer.innerHTML = '';

    let inputEl = null;

    if (inputType) {
        inputEl = document.createElement('input');
        inputEl.type = inputType === 'number' ? 'number' : 'text';
        inputEl.className = 'custom-modal-input';
        if (inputType === 'number') inputEl.value = 0;
        inputContainer.appendChild(inputEl);
        setTimeout(() => inputEl.focus(), 100);
    }

    overlay.style.display = 'flex';

    // Cleanup old listeners
    const newBtnConfirm = btnConfirm.cloneNode(true);
    btnConfirm.parentNode.replaceChild(newBtnConfirm, btnConfirm);
    const newBtnCancel = btnCancel.cloneNode(true);
    btnCancel.parentNode.replaceChild(newBtnCancel, btnCancel);

    newBtnConfirm.addEventListener('click', () => {
        if (callback) {
            const val = inputEl ? inputEl.value : null;
            callback(val);
        }
        overlay.style.display = 'none';
    });

    newBtnCancel.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    // Allow Enter key
    if (inputEl) {
        inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') newBtnConfirm.click();
        });
    }
}

// --- CORE XP & HP LOGIC ---

function addXP(amount) {
    state.xp += amount;
    checkLevelUp();
    updateVitalsUI();
}

function checkLevelUp() {
    if (!RULES_DATA.levels) return;

    // 1. Calcola nuovo livello
    let newLevel = 1;
    for (let i = 0; i < RULES_DATA.levels.length; i++) {
        if (state.xp >= RULES_DATA.levels[i].xp_required) {
            newLevel = RULES_DATA.levels[i].level;
        } else {
            break;
        }
    }

    // 2. Se c'è Level Up
    if (newLevel > state.level) {
        const levelsGained = newLevel - state.level;
        let hpLog = [];
        let totalGain = 0;

        // 3. HP Rolling
        if (state.classKey && RULES_DATA.classes[state.classKey]) {
            const cls = RULES_DATA.classes[state.classKey];
            const hitDie = parseInt(cls.hit_die.replace('1d', ''));
            const conMod = parseInt(ELEMENTS.mod_con ? ELEMENTS.mod_con.textContent : 0) || 0;

            for (let i = 0; i < levelsGained; i++) {
                const roll = Math.floor(Math.random() * hitDie) + 1;
                const gain = Math.max(1, roll + conMod);
                state.hp.rolled_hp += gain;
                totalGain += gain;
                hpLog.push(`Liv ${state.level + i + 1}: d${hitDie}(${roll}) + ${conMod} = ${gain} HP`);
            }
        }

        // 4. Aggiorna Livello nello Stato
        state.level = newLevel;
        if (ELEMENTS.levelDisplay) ELEMENTS.levelDisplay.textContent = state.level;

        // 5. REFILL RISORSE (Al Nuovo Massimo)
        calculateDerivedStats();
        state.hp.current = state.hp.max; // Full HP

        if (state.esper) {
            const cls = state.classKey ? state.classKey.toLowerCase() : "";
            const spec = state.specializationKey ? state.specializationKey.toLowerCase() : "";

            // Slot Ingegnere (Reset)
            if (state.esper.slotsUsed) {
                for (let i = 1; i <= 9; i++) state.esper.slotsUsed[i] = 0;
            }

            // TP Refill (Legge direttamente la tabella del livello attuale)
            if (cls === 'melder') state.esper.currentTP = MELDER_TP_TABLE[state.level];
            else if (cls === 'mistico') state.esper.currentTP = MISTICO_TP_TABLE[state.level];
            else if (cls === 'paradosso') state.esper.currentTP = PARADOSSO_TP_TABLE[state.level];
            else if (cls === 'specialista' && spec === 'artificio') state.esper.currentTP = ARTIFICIO_TP_TABLE[state.level];

            // Risorse Guerriero
            if (cls === 'guerriero') {
                if (spec === 'commando') state.esper.stuntDice = COMMANDO_DICE_COUNT_TABLE[state.level];
                if (spec === 'paragon') state.esper.paragonCharges = 3;
                if (spec === 'guardia_tempesta') state.esper.stormCharges = 2;
            }
        }

        // 6. Feedback
        setTimeout(() => {
            showCustomModal(
                "LEVEL UP!",
                `Sei salito al livello ${state.level}!\n\nHP Guadagnati: ${totalGain}\nRisorse ripristinate al massimo (HP, TP, Slot).\n\nDettagli:\n${hpLog.join('\n')}`,
                null,
                () => { recalculate(); }
            );
        }, 300);
    }

    recalculate();
}

// Helper: Calcola gli HP Base (Dado Vita Liv 1 + Tiri Dadi successivi accumulati)
function getCalculatedBaseHP() {
    let maxHP = 0;
    const conVal = state.baseStats.con + getStatBonus('con');
    const conMod = Math.floor((conVal - 10) / 2);

    if (state.classKey && RULES_DATA.classes[state.classKey]) {
        const cls = RULES_DATA.classes[state.classKey];
        const hitDie = parseInt(cls.hit_die.replace('1d', ''));

        // Livello 1: Prende sempre il massimo del dado + Costituzione
        const level1HP = hitDie + conMod;

        // Livelli successivi: Usa 'rolled_hp' che contiene la somma storica dei tiri fatti (inclusa Cos)
        // Nota: rolled_hp viene incrementato dalla funzione checkLevelUp() ogni volta che sali di livello
        maxHP = level1HP + (state.hp.rolled_hp || 0);
    } else {
        maxHP = 10 + conMod; // Fallback
    }
    return maxHP;
}

function calculateDerivedStats() {
    // 1. INIZIATIVA & DEX
    const dexVal = state.baseStats.dex + getStatBonus('dex');
    const dexMod = Math.floor((dexVal - 10) / 2);
    if (ELEMENTS.stat_init) ELEMENTS.stat_init.textContent = (dexMod >= 0 ? "+" : "") + dexMod;

    // 2. PROFICIENCY
    const prof = Math.ceil(1 + (state.level / 4));
    if (ELEMENTS.prof) ELEMENTS.prof.textContent = `+${prof}`;

    // 3. CA & VELOCITÀ
    let armorBase = 10;
    let shieldBonus = 0;
    let speedPenalty = 0;
    const strVal = state.baseStats.str + getStatBonus('str');
    let hasArmor = false;

    if (!state.inventory.equipped) state.inventory.equipped = [];

    state.inventory.equipped.forEach(item => {
        const acVal = parseInt(item.ac) || 0;
        const strReq = parseInt(item.str_req) || 0;
        const name = (item.name || "").toLowerCase();

        if (name.includes('scudo') || name.includes('shield')) {
            shieldBonus += acVal;
        } else {
            if (acVal > armorBase || !hasArmor) {
                armorBase = acVal;
                hasArmor = true;
            }
        }

        // FIX: Penalità Velocità immediata se Forza < Requisito
        if (strReq > strVal) {
            speedPenalty = 3;
        }
    });

    // CA Totale: Armatura + Des + Scudo
    const totalAC = armorBase + dexMod + shieldBonus;
    if (ELEMENTS.stat_ac) ELEMENTS.stat_ac.textContent = totalAC;

    // 4. VELOCITÀ
    let raceSpeed = 9;
    if (state.raceKey && RULES_DATA.races[state.raceKey]) raceSpeed = RULES_DATA.races[state.raceKey].speed;
    const finalSpeed = Math.max(0, raceSpeed - speedPenalty);

    if (ELEMENTS.speed) {
        ELEMENTS.speed.textContent = finalSpeed + "m";
        ELEMENTS.speed.style.color = speedPenalty > 0 ? "#ff4444" : "white";
    }

    // 5. HP (LOGICA IBRIDA: Base + Bonus Manuale)
    const baseHP = getCalculatedBaseHP();
    const manualBonus = state.hp.bonus || 0; // Il delta salvato dall'utente

    state.hp.max = baseHP + manualBonus;

    // Aggiorna l'input visuale (se non lo sto digitando ora)
    if (ELEMENTS.hpMax && document.activeElement !== ELEMENTS.hpMax) {
        ELEMENTS.hpMax.value = state.hp.max;
    }

    // Feedback visuale: Bordo azzurro se c'è una modifica manuale attiva
    if (ELEMENTS.hpMax) {
        ELEMENTS.hpMax.style.borderColor = manualBonus !== 0 ? "#00f3ff" : "var(--border-color)";
        // Tooltip per vedere i dettagli passandoci sopra col mouse
        ELEMENTS.hpMax.title = `Base (Classe+Dadi): ${baseHP} | Modifica Manuale: ${manualBonus >= 0 ? '+' : ''}${manualBonus}`;
    }

    updateVitalsUI();
}


function getStatBonus(stat) {
    let bonus = 0;
    if (state.raceKey && RULES_DATA.races[state.raceKey]) {
        const race = RULES_DATA.races[state.raceKey];
        if (race.modifiers && race.modifiers[stat]) bonus += race.modifiers[stat];
        if (state.archetypeKey && race.archetypes && race.archetypes[state.archetypeKey]) {
            const arch = race.archetypes[state.archetypeKey];
            if (arch.modifiers && arch.modifiers[stat]) bonus += arch.modifiers[stat];
        }
    }
    return bonus;
}

function updateModifiers() {
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(stat => {
        const input = ELEMENTS[`attr_${stat}`];
        const val = parseInt(input.value) || 10;
        const mod = Math.floor((val - 10) / 2);
        const modEl = ELEMENTS[`mod_${stat}`];
        if (modEl) modEl.textContent = mod >= 0 ? "+" + mod : mod;
    });
}

function updateVitalsUI() {
    // 3. Level Update
    if (ELEMENTS.levelDisplay) {
        ELEMENTS.levelDisplay.textContent = state.level;
    }

    // REF: XP_Display = TotalXP - CurrentLevelThreshold
    // REF: XP_Target = NextLevelThreshold - CurrentLevelThreshold

    const currentLevelObj = RULES_DATA.levels.find(l => l.level === state.level);
    const nextLevelObj = RULES_DATA.levels.find(l => l.level === state.level + 1);

    const currentThreshold = currentLevelObj ? currentLevelObj.xp_required : 0;
    const nextThreshold = nextLevelObj ? nextLevelObj.xp_required : (currentThreshold + 100000);

    const xpForDisplay = state.xp - currentThreshold;
    const xpNeeded = nextThreshold - currentThreshold;

    if (ELEMENTS.xpDisplay) {
        ELEMENTS.xpDisplay.textContent = `${xpForDisplay} / ${xpNeeded}`;
    }

    if (ELEMENTS.xpBar) {
        const pct = Math.min(100, Math.max(0, (xpForDisplay / xpNeeded) * 100));
        ELEMENTS.xpBar.style.width = `${pct}%`;
    }

    // 2. HP UI Update (Temp HP Display)
    if (ELEMENTS.hpDisplay) {
        if (state.hp.temp > 0) {
            ELEMENTS.hpDisplay.textContent = `${state.hp.current} (+${state.hp.temp}) / ${state.hp.max}`;
        } else {
            ELEMENTS.hpDisplay.textContent = `${state.hp.current} / ${state.hp.max}`;
        }
    }

    // Main HP Bar (Red)
    const hpPct = Math.min(100, Math.max(0, (state.hp.current / state.hp.max) * 100));
    if (ELEMENTS.hpBar) ELEMENTS.hpBar.style.width = `${hpPct}%`;

    // Temp HP Overlay (Purple)
    const tempPct = Math.min(100, Math.max(0, (state.hp.temp / state.hp.max) * 100));
    if (ELEMENTS.hpTempFill) {
        ELEMENTS.hpTempFill.style.width = `${tempPct}%`;
    }

    // Check Spec Lock/Unlock on level change
    if (!state.editLocked && state.classKey) {
        ELEMENTS.spec.disabled = state.level < 3;
    }
}

// --- LOGICA MIGLIORATA PER IL PARSING DELLE COMPETENZE ---

function scanDescriptionForSkills(text) {
    if (!text) return [];
    const foundSkills = [];
    const lowerText = text.toLowerCase();

    // Itera su tutte le skill conosciute nel sistema
    SKILL_LIST.forEach(skill => {
        const sName = skill.name.toLowerCase();

        // Regex robuste per intercettare le frasi nel file rules_data_v4.js
        // Es: "Ottieni competenza nell'abilità Percezione"
        // Es: "Ottieni competenza in Percezione"
        // Es: "Hai competenza nell'abilità Percezione"
        // Es: "Competenza in due: Storia, Religione"

        // Pattern 1: Frase diretta
        const p1 = new RegExp(`competenza (?:nell'abilità|in) .*\\b${sName}\\b`, 'i');

        // Pattern 2: Elenchi (es. "Competenza in Storia e Religione")
        const p2 = new RegExp(`\\b${sName}\\b`, 'i');

        // Controllo se la skill è menzionata in un contesto di competenza
        if (lowerText.includes("competenza") || lowerText.includes("addestrato")) {
            // Escludiamo i casi di scelta "o" se non vogliamo forzare la scelta (es. "Persuasione o Inganno")
            // Ma per ora attiviamo tutto ciò che è esplicito.
            if (p1.test(lowerText) || (lowerText.includes("competenza") && p2.test(lowerText))) {
                // Verifica extra per evitare falsi positivi su parole simili
                // Se la descrizione dice "o un'altra abilità", ignoriamo. 
                // Qui ci fidiamo che se il nome della skill è presente vicino a "competenza", è valido.
                foundSkills.push(skill.name);
            }
        }
    });

    return foundSkills;
}

function getAutoSkills() {
    const autoSkills = new Set();

    // Helper per scansionare un array di features
    const scanFeatures = (featuresArray) => {
        if (!featuresArray) return;
        featuresArray.forEach(feat => {
            const skills = scanDescriptionForSkills(feat.description);
            skills.forEach(s => autoSkills.add(s));
        });
    };

    // 1. RAZZA BASE
    if (state.raceKey && RULES_DATA.races[state.raceKey]) {
        const race = RULES_DATA.races[state.raceKey];
        scanFeatures(race.features);

        // 2. ARCHETIPO RAZZIALE
        if (state.archetypeKey && race.archetypes && race.archetypes[state.archetypeKey]) {
            const arch = race.archetypes[state.archetypeKey];
            scanFeatures(arch.features);
        }
    }

    // 3. CLASSE BASE
    if (state.classKey && RULES_DATA.classes[state.classKey]) {
        const cls = RULES_DATA.classes[state.classKey];
        scanFeatures(cls.features);

        // 4. SPECIALIZZAZIONE CLASSE
        if (state.specializationKey && cls.specializations && cls.specializations[state.specializationKey]) {
            const spec = cls.specializations[state.specializationKey];
            scanFeatures(spec.features);
        }
    }

    return autoSkills;
}

function recalculate() {
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(stat => {
        const base = state.baseStats[stat];
        const bonus = getStatBonus(stat);
        const input = ELEMENTS[`attr_${stat}`];
        if (input && document.activeElement !== input) {
            input.value = base + bonus;
        }
    });

    // NOTE: We no longer "apply" auto proficiencies to state.skills permanently.
    // Instead, we calculate them on the fly in renderSkills().
    // This allows "subtractive" logic (if I change race, the old auto-skills disappear).

    updateModifiers();
    calculateDerivedStats();
    renderFeatures();
    renderSkills();
    updateVitalsUI();

    // Re-check lock states in case level changed
    if (!state.editLocked) {
        if (state.level < 3) {
            ELEMENTS.spec.disabled = true;
            ELEMENTS.spec.value = "";
        } else {
            ELEMENTS.spec.disabled = !state.classKey;
        }
    }

    // Request 3: Fix Feats Reactivity
    renderSecondaryTabs();

    // --- REATTIVITÀ UI ESPER (FIX LIVEMODE) ---
    if (state.classKey === 'Ingegnere' || state.esper) {
        refreshEsperUI();
    }
}

/* --- REATTIVITÀ UI ESPER --- */
// Questa funzione va chiamata alla fine di recalculate() o updateBaseStat()
function refreshEsperUI() {
    // 1. Se la Modale "Gestisci Tecniche" è aperta, ridisegnala con i nuovi numeri
    const modal = document.getElementById('esper-modal');
    if (modal && modal.style.display !== 'none') {
        if (typeof updateEsperModalList === 'function') updateEsperModalList();
    }

    // 2. Se siamo nella Tab "Esper" della scheda principale, ridisegnala
    // (renderSecondaryTabs lo fa già, ma forziamo se necessario o se la tab è attiva)
    const activeTab = document.querySelector('.cs-v3-tab.active'); // Nota: classe corretta è cs-v3-tab
    if (activeTab && (activeTab.getAttribute('data-tab') === 'esper')) {
        if (typeof renderEsperTab === 'function') {
            renderEsperTab();
        }
    }
}


// --- RENDERING FEATURES (Unchanged) ---
function renderFeatures() {
    if (!ELEMENTS.featuresList) return;

    let leftColumnHtml = `<div class="chips-container">`;
    if (state.raceKey && RULES_DATA.races[state.raceKey]) {
        const race = RULES_DATA.races[state.raceKey];
        if (race.features) race.features.forEach(f => leftColumnHtml += createFeatureChip(f.name, f.description, "Razza"));
        if (race.languages) leftColumnHtml += createFeatureChip("Lingue", race.languages.join(", "), "Razza");
        if (race.darkvision) leftColumnHtml += createFeatureChip("Scurovisione", `Vedi al buio fino a ${race.darkvision} metri.`, "Razza");

        if (state.archetypeKey && race.archetypes && race.archetypes[state.archetypeKey]) {
            const arch = race.archetypes[state.archetypeKey];
            if (arch.features) arch.features.forEach(f => leftColumnHtml += createFeatureChip(f.name, f.description, `Archetipo: ${arch.name}`));
        }
    } else {
        leftColumnHtml += `<p style="color:var(--text-muted); font-style:italic;">Seleziona una razza...</p>`;
    }
    leftColumnHtml += `</div>`;

    let rightColumnHtml = `<div class="chips-container">`;
    if (state.classKey && RULES_DATA.classes[state.classKey]) {
        const cls = RULES_DATA.classes[state.classKey];
        if (cls.features) {
            cls.features.forEach(f => {
                if (f.level <= state.level) {
                    rightColumnHtml += createFeatureChip(f.name, f.description, `Classe: ${cls.name} (Lvl ${f.level})`);
                }
            });
        }
        if (state.specializationKey && cls.specializations && cls.specializations[state.specializationKey]) {
            const spec = cls.specializations[state.specializationKey];
            rightColumnHtml += `<div style="width:100%; border-bottom:1px solid #333; margin:5px 0;"></div>`;
            if (spec.features) {
                spec.features.forEach(f => {
                    if (f.level <= state.level) {
                        rightColumnHtml += createFeatureChip(f.name, f.description, `Spec: ${spec.name} (Lvl ${f.level})`);
                    }
                });
            }
        }
    } else {
        rightColumnHtml += `<p style="color:var(--text-muted); font-style:italic;">Seleziona una classe...</p>`;
    }
    rightColumnHtml += `</div>`;

    ELEMENTS.featuresList.innerHTML = `
        <div class="features-grid">
            <div class="feature-column">
                <h3>Tratti Razziali & Archetipo</h3>
                ${leftColumnHtml}
            </div>
            <div class="feature-column">
                <h3>Privilegi di Classe</h3>
                ${rightColumnHtml}
            </div>
        </div>
    `;
}

function createFeatureChip(name, description, source) {
    return `
        <div class="feature-chip" tabindex="0">
            <span class="chip-title">${name}</span>
            <div class="feature-tooltip">
                <div style="font-size:0.7em; color:var(--accent-color); margin-bottom:4px; text-transform:uppercase;">${source}</div>
                ${description}
            </div>
        </div>
    `;
}


// --- SECONDARY TABS RENDERING (TABLES) ---

const SKILL_LIST = [
    { name: 'Acrobazia', attr: 'dex' },
    { name: 'Astrofisica', attr: 'int' },
    { name: 'Atletica', attr: 'str' },
    { name: 'Computer', attr: 'int' },
    { name: 'Cultura', attr: 'wis' },
    { name: 'Diplomazia', attr: 'cha' },
    { name: 'Furtività', attr: 'dex' },
    { name: 'Inganno', attr: 'cha' },
    { name: 'Intuizione', attr: 'wis' },
    { name: 'Intimidire', attr: 'cha' },
    { name: 'Investigazione', attr: 'int' },
    { name: 'Meccanica', attr: 'wis' },
    { name: 'Medicina', attr: 'wis' },
    { name: 'Percezione', attr: 'wis' },
    { name: 'Performance', attr: 'cha' },
    { name: 'Persuasione', attr: 'cha' },
    { name: 'Rapidità di Mano', attr: 'dex' },
    { name: 'Religione', attr: 'int' },
    { name: 'Sopravvivenza', attr: 'wis' },
    { name: 'Storia', attr: 'int' },
    { name: 'Xenobiologia', attr: 'int' }
];

function renderSecondaryTabs() {
    renderSkills();
    renderWeapons();
    renderEquipment();
    renderVehicles();
    renderVehicles();
    renderFeats();
    renderEsperTab();
}

// 0. SKILLS TABLE (V3 Logic Integrated + Data Driven)
function renderSkills() {
    if (!ELEMENTS.tabSkills) return;

    // 0. Get Auto-Skills from Rules
    const autoSkills = getAutoSkills();

    // 1. Calculate Proficiency Bonus
    const profBonus = Math.ceil(1 + (state.level / 4));

    let html = `
    <table style="width:100%; text-align:left; border-collapse: collapse;">
        <thead>
            <tr style="border-bottom: 1px solid var(--border-color);">
                <th style="width: 40px; text-align: center;">Comp</th>
                <th>Abilità</th>
                <th style="width: 50px;">Attr</th>
                <th style="width: 50px; text-align: center;">Bonus</th>
            </tr>
        </thead>
        <tbody>
    `;

    SKILL_LIST.forEach(skill => {
        const val = state.baseStats[skill.attr];

        let mod = 0;
        const modEl = ELEMENTS[`mod_${skill.attr}`];
        if (modEl) {
            mod = parseInt(modEl.textContent) || 0;
        }

        // isProf is TRUE if: Manual Toggle OR Auto-Granted
        const isManual = state.skills[skill.name] || false;
        const isAuto = autoSkills.has(skill.name);
        const isProf = isManual || isAuto;

        const total = mod + (isProf ? profBonus : 0);
        const sign = total >= 0 ? '+' : '';

        // UI Logic: 
        // If Auto, checkbox is checked and disabled (shows source is 'Game Rule').
        // Add a visual indicator that it's auto-granted.

        let disabled = "";
        let rowStyle = "";
        let icon = "";

        if (isAuto) {
            disabled = "disabled";
            rowStyle = "background: rgba(var(--accent-rgb), 0.1);"; // Subtle highlight
            icon = '<span style="font-size:0.8em; color:var(--accent-color); margin-left:5px;" title="Conferito da Razza/Classe">★</span>';
        } else if (state.editLocked) {
            disabled = "disabled";
        }

        html += `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); ${rowStyle}">
            <td style="padding: 5px; text-align: center;">
                <input type="checkbox" 
                    ${isProf ? 'checked' : ''} 
                    ${disabled}
                    onclick="toggleSkill('${skill.name}')"
                    style="cursor: pointer;">
            </td>
            <td>${skill.name}${icon}</td>
            <td style="color: var(--text-muted); font-size: 0.8rem; text-transform:uppercase;">${skill.attr}</td>
            <td style="color: var(--accent-color); font-weight: bold; text-align: center;">${sign}${total}</td>
        </tr>
        `;
    });

    html += '</tbody></table>';
    ELEMENTS.tabSkills.innerHTML = html;
}

function toggleSkill(skillName) {
    if (state.editLocked) return;
    state.skills[skillName] = !state.skills[skillName];
    renderSkills();
}



// 1. WEAPONS TABLE
function renderWeapons() {
    if (!ELEMENTS.tabWeapons) return;
    let html = `<h3>Armi</h3>
    <table class="cs-v3-table">
        <thead>
            <tr>
                <th>Arma</th>
                <th style="width:80px;">Gittata</th>
                <th style="width:80px;">Danni</th>
                <th style="width:80px;">Tipo</th>
                <th style="width:60px;">Mun.</th>
                <th style="width:40px;"></th>
            </tr>
        </thead>
        <tbody>`;

    if (state.inventory.weapons.length > 0) {
        state.inventory.weapons.forEach((w, index) => {
            html += `
            <tr style="border-bottom:none;">
                <td><input type="text" value="${w.name}" onchange="updateWeapon(${index}, 'name', this.value)" placeholder="Nome Arma" style="width:100%; background:transparent; border:none; color:var(--text-color);"></td>
                <td><input type="text" value="${w.range}" onchange="updateWeapon(${index}, 'range', this.value)" placeholder="m" style="width:100%; background:transparent; border:none; color:var(--text-color);"></td>
                <td><input type="text" value="${w.damage}" onchange="updateWeapon(${index}, 'damage', this.value)" placeholder="Dadi" style="width:100%; background:transparent; border:none; color:var(--text-color);"></td>
                <td><input type="text" value="${w.type}" onchange="updateWeapon(${index}, 'type', this.value)" placeholder="Danno" style="width:100%; background:transparent; border:none; color:var(--text-color);"></td>
                <td><input type="number" value="${w.ammo || 0}" onchange="updateWeapon(${index}, 'ammo', this.value)" placeholder="0" style="width:100%; background:transparent; border:none; color:var(--text-color);"></td>
                <td rowspan="2" style="vertical-align:middle; border-bottom:1px solid rgba(255,255,255,0.1);">
                    <button class="cs-v3-btn-sm" style="background:#ff0000; padding:2px 5px;" onclick="removeWeapon(${index})">X</button>
                </td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                <td colspan="5">
                    <input type="text" value="${w.notes || ''}" onchange="updateWeapon(${index}, 'notes', this.value)" 
                    placeholder="Note (es. Possibilità di colpire in volo)" style="font-size:0.8rem; color:var(--text-muted); font-style:italic; width:100%; background:transparent; border:none;">
                </td>
            </tr>`;
        });
    } else {
        html += '<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">Nessuna arma equipaggiata.</td></tr>';
    }

    html += `</tbody></table><button class="cs-v3-btn-sm" style="margin-top:10px;" onclick="addWeapon()">+ Aggiungi Arma</button>`;
    ELEMENTS.tabWeapons.innerHTML = html;
}

function addWeapon() {
    showCustomModal("Nuova Arma", "Inserisci il nome della nuova arma:", "text", (name) => {
        if (name) {
            state.inventory.weapons.push({ name, range: '', damage: '', type: '', ammo: 0, notes: '' });
            renderWeapons();
        }
    });
}
function removeWeapon(index) {
    state.inventory.weapons.splice(index, 1);
    renderWeapons();
}
function updateWeapon(index, field, value) {
    state.inventory.weapons[index][field] = value;
}

// 2. EQUIPMENT TABLE (Split: Equipped vs Backpack)
function renderEquipment() {
    if (!ELEMENTS.tabEquipment) return;

    // TABELLA 1: INDOSSATO
    let html = `<h3>Indossato (Armature & Scudi)</h3>
    <table class="cs-v3-table">
        <thead>
            <tr>
                <th>Oggetto</th>
                <th style="width:60px;">CA</th>
                <th style="width:60px;">For.Req</th>
                <th style="width:120px;">Furtività</th>
                <th style="width:40px;"></th>
            </tr>
        </thead>
        <tbody>`;

    if (!state.inventory.equipped) state.inventory.equipped = [];

    state.inventory.equipped.forEach((item, i) => {
        html += `<tr>
            <td><input type="text" value="${item.name}" onchange="updateEquipped(${i}, 'name', this.value)" placeholder="Nome Armatura"></td>
            <td><input type="number" value="${item.ac}" onchange="updateEquipped(${i}, 'ac', this.value)" placeholder="0"></td>
            <td><input type="number" value="${item.str_req}" onchange="updateEquipped(${i}, 'str_req', this.value)" placeholder="0"></td>
            <td>
                <select class="cs-v3-select" onchange="updateEquipped(${i}, 'stealth', this.value)" style="width:100%; padding:5px;">
                    <option value="normal" ${item.stealth === 'normal' ? 'selected' : ''}>Normale</option>
                    <option value="adv" ${item.stealth === 'adv' ? 'selected' : ''}>Vantaggio</option>
                    <option value="dis" ${item.stealth === 'dis' ? 'selected' : ''}>Svantaggio</option>
                </select>
            </td>
            <td><button class="cs-v3-btn-sm" style="background:red;" onclick="removeEquipped(${i})">X</button></td>
        </tr>`;
    });
    html += `</tbody></table>
    <button class="cs-v3-btn-sm" onclick="addEquipped()" style="margin-top:10px;">+ Aggiungi Armatura</button>
    <hr style="border-color:var(--border-color); margin: 20px 0;">`;

    // TABELLA 2: ZAINO
    html += `<h3>Zaino</h3>
    <table class="cs-v3-table">
        <thead>
            <tr>
                <th>Oggetto</th>
                <th style="width:60px;">Q.ta</th>
                <th>Note</th>
                <th style="width:40px;"></th>
            </tr>
        </thead>
        <tbody>`;

    if (!state.inventory.backpack) state.inventory.backpack = [];

    state.inventory.backpack.forEach((item, i) => {
        html += `<tr>
            <td><input type="text" value="${item.name}" onchange="updateBackpack(${i}, 'name', this.value)"></td>
            <td><input type="number" value="${item.quantity}" onchange="updateBackpack(${i}, 'quantity', this.value)"></td>
            <td><input type="text" value="${item.notes}" onchange="updateBackpack(${i}, 'notes', this.value)"></td>
            <td><button class="cs-v3-btn-sm" style="background:red;" onclick="removeBackpack(${i})">X</button></td>
        </tr>`;
    });
    html += `</tbody></table>
    <button class="cs-v3-btn-sm" onclick="addBackpack()" style="margin-top:10px;">+ Aggiungi Oggetto</button>
    
    <div style="margin-top:20px; border-top:1px solid var(--border-color); padding-top:10px;">
        <label style="color:var(--accent-color); font-weight:bold;">Karma (K): </label>
        <input type="number" value="${state.inventory.currency || 0}" onchange="state.inventory.currency = this.value" style="background:rgba(0,0,0,0.3); border:1px solid var(--border-color); color:var(--text-color); padding:5px; width:100px; border-radius:4px; margin-left:10px;">
    </div>`;

    ELEMENTS.tabEquipment.innerHTML = html;
}


// HELPERS FOR NEW EQUIPMENT
function addEquipped() {
    state.inventory.equipped.push({ name: 'Nuova Armatura', ac: 0, str_req: 0, stealth: 'normal', type: 'Armor' });
    renderEquipment();
    recalculate(); // Update Stat AC
}
function removeEquipped(index) {
    state.inventory.equipped.splice(index, 1);
    renderEquipment();
    recalculate();
}
// Aggiungi o sostituisci questa funzione helper
function updateEquipped(index, field, value) {
    state.inventory.equipped[index][field] = value;
    // FIX: Ricalcola SEMPRE per aggiornare velocità/CA istantaneamente
    recalculate();
}

function addBackpack() {
    state.inventory.backpack.push({ name: 'Nuovo Oggetto', quantity: 1, notes: '-' });
    renderEquipment();
}
function removeBackpack(index) {
    state.inventory.backpack.splice(index, 1);
    renderEquipment();
}
function updateBackpack(index, field, value) {
    state.inventory.backpack[index][field] = value;
}

// 3. VEHICLES TABLE
function renderVehicles() {
    if (!ELEMENTS.tabVehicles) return;
    let html = `<h3>Veicoli</h3>
    <table class="cs-v3-table">
        <thead>
            <tr>
                <th>Veicolo</th>
                <th style="width:100px;">Tipo</th>
                <th style="width:100px;">Velocità</th>
                <th>Note</th>
                <th style="width:50px;"></th>
            </tr>
        </thead>
        <tbody>`;

    if (state.inventory.vehicles.length > 0) {
        state.inventory.vehicles.forEach((v, index) => {
            html += `
            <tr>
                <td><input type="text" value="${v.name}" onchange="updateVehicle(${index}, 'name', this.value)" style="width:100%; background:transparent; border:none; color:var(--text-color);"></td>
                <td><input type="text" value="${v.type}" onchange="updateVehicle(${index}, 'type', this.value)" style="width:100%; background:transparent; border:none; color:var(--text-color);"></td>
                <td><input type="text" value="${v.speed}" onchange="updateVehicle(${index}, 'speed', this.value)" style="width:100%; background:transparent; border:none; color:var(--text-color);"></td>
                <td><input type="text" value="${v.notes}" onchange="updateVehicle(${index}, 'notes', this.value)" style="width:100%; background:transparent; border:none; color:var(--text-color);"></td>
                <td><button class="cs-v3-btn-sm" style="background:#ff0000; padding:2px 5px;" onclick="removeVehicle(${index})">X</button></td>
            </tr>`;
        });
    } else {
        html += '<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">Nessun veicolo posseduto.</td></tr>';
    }

    html += `</tbody></table><button class="cs-v3-btn-sm" style="margin-top:10px;" onclick="addVehicle()">+ Aggiungi Veicolo</button>`;
    ELEMENTS.tabVehicles.innerHTML = html;
}

function addVehicle() {
    showCustomModal("Nuovo Veicolo", "Nome del veicolo:", "text", (name) => {
        if (name) {
            state.inventory.vehicles.push({ name, type: 'Terrestre', speed: '100km/h', notes: '-' });
            renderVehicles();
        }
    });
}
function removeVehicle(index) {
    state.inventory.vehicles.splice(index, 1);
    renderVehicles();
}
function updateVehicle(index, field, value) {
    state.inventory.vehicles[index][field] = value;
}

// --- TABS LOGIC ---
function setupTabs() {
    ELEMENTS.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            ELEMENTS.tabs.forEach(t => t.classList.remove('active'));
            ELEMENTS.tabPanes.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            const pane = document.getElementById(`tab-${tabId}`);
            if (pane) pane.classList.add('active');
        });
    });
}

// --- FEATS LOGIC ---

const ASI_LEVELS = {
    "Guerriero": [4, 6, 8, 12, 14, 16, 19],
    "Specialista": [4, 8, 10, 12, 16, 19],
    "default": [4, 8, 12, 16, 19]
};

function checkFeatPrerequisites(feat) {
    const req = feat.req || feat.prerequisite; // Support both naming conventions
    if (!req || req === "-" || req === "Nessuno") return true;

    // Controlla Statistiche
    const statMatch = req.match(/(For|Des|Cos|Int|Sag|Car)\s*(\d+)/i);
    if (statMatch) {
        const map = { 'For': 'str', 'Des': 'dex', 'Cos': 'con', 'Int': 'int', 'Sag': 'wis', 'Car': 'cha' };
        const attr = map[statMatch[1]];
        const val = parseInt(statMatch[2]);
        const total = state.baseStats[attr] + getStatBonus(attr);
        return total >= val;
    }

    // Controlla Razza/Classe/Livello
    if (req === "Esper") return ["Melder", "Mistico", "Paradosso", "Solariano"].includes(RULES_DATA.classes[state.classKey]?.name);
    if (RULES_DATA.races[req]) return RULES_DATA.races[state.raceKey]?.name === RULES_DATA.races[req].name;

    return true;
}

function calculateFeatData() {
    let totalSlots = 1; // Base Level 1
    if (state.raceKey && RULES_DATA.races[state.raceKey]?.name === "Umani") totalSlots++;

    if (state.classKey && RULES_DATA.classes[state.classKey]) {
        const cls = RULES_DATA.classes[state.classKey];
        const asiLevels = ASI_LEVELS[cls.name] || ASI_LEVELS.default;

        asiLevels.forEach(lvl => {
            if (state.level >= lvl) totalSlots++;
        });
    }

    const featsTaken = state.feats ? state.feats.length : 0;
    const asiUsed = state.asiStatBoosts || 0;
    return { totalSlots, featsTaken, statBoosts: asiUsed, remaining: totalSlots - featsTaken - asiUsed };
}

function renderFeats() {
    if (!ELEMENTS.tabFeats) return;

    const { totalSlots, featsTaken, statBoosts, remaining } = calculateFeatData();
    const currentFeats = state.feats || [];

    let html = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; padding:10px; background:rgba(0,0,0,0.3); border-radius:4px;">
        <div>
            <strong>Slot Totali:</strong> ${totalSlots} <br>
            <span style="font-size:0.9em; color:var(--text-muted);">
                (Talenti: ${featsTaken} | Aum. Caratt: ${statBoosts})
            </span>
        </div>
        <div style="text-align:right;">
            <strong>Rimanenti:</strong> <span style="color:${remaining > 0 ? 'var(--accent-color)' : 'white'}">${remaining}</span>
        </div>
    </div>

    <!-- ASI CONTROLS -->
    <div style="margin-bottom:15px; padding:10px; border:1px solid var(--border-color); border-radius:4px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <span>Aumento Punteggi Caratteristica (ASI)</span>
            <div>
                <button class="cs-v3-btn-sm" onclick="toggleAsiStatBoost(-1)">-</button>
                <span style="margin:0 10px; font-weight:bold;">${statBoosts}</span>
                <button class="cs-v3-btn-sm" onclick="toggleAsiStatBoost(1)">+</button>
            </div>
        </div>
        <p style="font-size:0.8em; color:var(--text-muted); margin-top:5px;">
            Ogni volta che selezioni questo, puoi aumentare una caratteristica di +2 o due di +1.
            Aggiorna manualmente i punteggi sopra.
        </p>
    </div>

    <h3>Talenti Selezionati</h3>
    `;

    if (currentFeats.length > 0) {
        currentFeats.forEach((feat, index) => {
            html += `
            <div style="background:rgba(255,255,255,0.05); padding:10px; margin-bottom:5px; border-left:3px solid var(--accent-color); position:relative;">
                <div style="font-weight:bold;">${feat.name}</div>
                <div style="font-size:0.85em; color:var(--text-muted);">Req: ${feat.req || '-'}</div>
                <div style="font-size:0.9em; margin-top:3px;">${feat.desc || feat.description}</div>
                <button class="cs-v3-btn-sm" style="position:absolute; top:5px; right:5px; background:#ff4444;" onclick="removeFeat(${index})">X</button>
            </div>
            `;
        });
    } else {
        html += `<p style="color:var(--text-muted); font-style:italic;">Nessun talento selezionato.</p>`;
    }

    if (remaining > 0) {
        html += `<button class="cs-v3-btn-sm" style="width:100%; margin-top:10px;" onclick="openFeatModal()">+ Seleziona Talento</button>`;
    } else {
        html += `<button class="cs-v3-btn-sm" style="width:100%; margin-top:10px;" disabled>Nessuno slot disponibile</button>`;
    }

    ELEMENTS.tabFeats.innerHTML = html;
}

function addFeat(featName) {
    const { remaining } = calculateFeatData();
    if (remaining <= 0) {
        showCustomModal("Slot Esauriti", "Non hai slot talento disponibili!", null, null);
        return;
    }

    const feat = RULES_DATA.FEAT_LIST.find(f => f.name === featName);
    if (feat) {
        if (!state.feats) state.feats = [];
        state.feats.push(feat);
        renderFeats();
        updateFeatModalList();
        closeFeatModal();
    }
}

function removeFeat(index) {
    state.feats.splice(index, 1);
    renderFeats();
}

function toggleAsiStatBoost(change) {
    if (!state.asiStatBoosts) state.asiStatBoosts = 0;
    if (change > 0) {
        const { remaining } = calculateFeatData();
        if (remaining <= 0) {
            showCustomModal("Slot Esauriti", "Non hai slot disponibili!", null, null);
            return;
        }
    }
    state.asiStatBoosts += change;
    if (state.asiStatBoosts < 0) state.asiStatBoosts = 0;
    renderFeats();
}

function openFeatModal() {
    const modal = document.getElementById('feat-modal');
    if (modal) {
        updateFeatModalList();
        modal.style.display = 'flex';
    }
}

function closeFeatModal() {
    const modal = document.getElementById('feat-modal');
    if (modal) modal.style.display = 'none';
}

function updateFeatModalList() {
    const container = document.getElementById('feat-selection-list');
    if (!container) return;

    let html = '';
    const feats = RULES_DATA.FEAT_LIST || [];
    const currentFeats = state.feats || [];
    const { remaining } = calculateFeatData();

    feats.forEach(feat => {
        if (currentFeats.find(f => f.name === feat.name)) return;
        const reqMet = checkFeatPrerequisites(feat);
        const opacity = reqMet ? '1' : '0.5';
        const btnState = reqMet ? '' : 'disabled';
        const statusText = reqMet ? '' : '<span style="color:red; font-size:0.8em;">(Requisiti non soddisfatti)</span>';

        html += `
        <div style="background:rgba(0,0,0,0.4); padding:10px; margin-bottom:5px; border:1px solid var(--border-color); opacity:${opacity}; display:flex; justify-content:space-between; align-items:center;">
            <div style="flex:1;">
                <div style="font-weight:bold;">${feat.name} ${statusText}</div>
                <div style="font-size:0.8em; color:var(--text-muted);">Req: ${feat.req}</div>
                <div style="font-size:0.85em;">${feat.desc}</div>
            </div>
            <button class="cs-v3-btn-sm" ${btnState} onclick="addFeat('${feat.name.replace(/'/g, "\\'")}')">Scegli</button>
        </div>
        `;
    });
    container.innerHTML = html;
}

// --- ESPER SYSTEM (ENGINEER) ---

function renderEsperTab() {
    const tab = document.getElementById('tab-esper');
    if (!tab) return;

    // 1. Check if Engineer OR Melder O Specialista Artificio (Lv 3+)
    const currentClass = state.classKey ? state.classKey.toLowerCase() : "";
    const spec = state.specializationKey ? state.specializationKey.toLowerCase() : "";

    // Condizione: Ingegnere, Melder, Specialista Artificio (Lv 3+), Guerriero
    const isEsper = (currentClass === 'ingegnere') || (currentClass === 'melder') || (currentClass === 'paradosso') || (currentClass === 'mistico') || (currentClass === 'solariano') || (currentClass === 'guerriero') || (currentClass === 'specialista' && spec === 'artificio' && state.level >= 3);

    if (!isEsper) {
        tab.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted);">
            <p>Questa sezione è riservata alle classi con poteri Esper (es. Ingegnere, Melder).</p>
        </div>`;
        return;
    }

    ensureEsperState();

    let html = `<div class="esper-container" style="padding:10px;">`;

    // --- INTERFACCIA PUNTI TALENTO (MELDER, MISTICO, PARADOSSO E ARTIFICIO) ---
    if (currentClass === 'melder' || currentClass === 'mistico' || currentClass === 'paradosso' || (currentClass === 'specialista' && spec === 'artificio')) {

        // Determina massimali e TP correnti
        let maxTP, currentTP;
        if (currentClass === 'melder') {
            maxTP = getMelderMaxTP();
        } else if (currentClass === 'mistico') {
            maxTP = getMisticoMaxTP();
        } else if (currentClass === 'paradosso') {
            maxTP = getParadossoMaxTP();
        } else {
            // Artificio
            maxTP = ARTIFICIO_TP_TABLE[state.level] || 0;
        }

        currentTP = state.esper.currentTP;
        if (typeof currentTP === 'undefined') {
            currentTP = maxTP;
            state.esper.currentTP = maxTP;
        }

        // Cap fix if level dropped or changed
        if (currentTP > maxTP && state.level > 1) currentTP = maxTP;

        const tpPercent = Math.min(100, Math.max(0, (currentTP / maxTP) * 100));

        // Configurazione Colori e Titoli
        let barColor = 'var(--accent-color, #00f3ff)';
        let barGradient = 'var(--accent-color, #00f3ff)';
        let title = 'Specialista Artificio';
        let subTitle = 'Hacker Esper';

        if (currentClass === 'melder') {
            barColor = 'var(--secondary-accent, #9b59b6)';
            barGradient = 'linear-gradient(90deg, #8e44ad, #9b59b6)';
            title = 'Melder';
            subTitle = 'Canalizzatore Psionico';
        } else if (currentClass === 'mistico') {
            barColor = '#f1c40f';
            barGradient = 'linear-gradient(90deg, #f39c12, #f1c40f)';
            title = 'Mistico';
            subTitle = 'Canalizzatore Divino';
        } else if (currentClass === 'paradosso') {
            barColor = '#c0392b';
            barGradient = 'linear-gradient(90deg, #8e44ad, #c0392b)';
            title = 'Paradosso';
            subTitle = 'Anomalia Temporale';
        }

        // A. HEADER & TP BAR
        html += `
        <div style="background:rgba(0,0,0,0.4); padding:15px; border-radius:8px; margin-bottom:20px; border-left:4px solid ${barColor}; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div style="flex-grow:1;">
                <div style="font-size:1.4em; font-weight:bold; color:${barColor}; text-transform:uppercase; letter-spacing:1px;">${title}</div>
                <div style="font-size:0.8em; color:var(--text-muted); display:flex; align-items:center; gap:5px;">
                    <span style="background:${barColor}; color:black; padding:2px 6px; border-radius:4px; font-weight:bold;">LIV ${state.level}</span>
                    <span>${subTitle}</span>
                </div>
            </div>
            
            <div style="display:flex; gap:8px;">
                <button class="cs-v3-btn-sm" onclick="openEsperModal()" title="Gestisci Talenti">
                    <span>⚡ Gestisci</span>
                </button>
                <button class="cs-v3-btn-sm" style="border-color:#2ecc71; color:#2ecc71; background:rgba(46, 204, 113, 0.1);" onclick="performLongRest()" title="Riposo Lungo">
                    <span>💤 Riposo</span>
                </button>
            </div>

            </div>
        
        <div class="tp-container" style="position:relative; height:25px; background:#111; border-radius:4px; overflow:hidden; margin-bottom:20px; border:1px solid ${barColor};">
            <div class="tp-fill" style="width:${tpPercent}%; background:${barGradient}; height:100%; transition:width 0.5s cubic-bezier(0.4, 0, 0.2, 1);"></div>
            <div style="position:absolute; top:0; left:0; width:100%; height:100%; display:flex; align-items:center; justify-content:center; text-shadow:0 1px 3px black; font-weight:bold; color:white; font-family:var(--font-header); letter-spacing:1px;">
                ${currentTP} / ${maxTP} TP
            </div>
        </div>
        `;

        // B. KNOWN TALENTS GRID
        html += `<h3>Talenti Conosciuti</h3>
        <div class="esper-grid">`;

        const known = state.esper.knownSpells || [];
        // Sort by Grade
        known.sort((a, b) => {
            const pA = RULES_DATA.ESPER_POWERS.find(x => x.name === a) || { grade: 0 };
            const pB = RULES_DATA.ESPER_POWERS.find(x => x.name === b) || { grade: 0 };
            return pA.grade - pB.grade;
        });

        if (known.length === 0) {
            html += `<p style="grid-column:1/-1; color:var(--text-muted);">Nessun talento conosciuto. Usa "Gestisci Talenti" per apprenderne.</p>`;
        } else {
            known.forEach(name => {
                const p = RULES_DATA.ESPER_POWERS.find(x => x.name === name) || { name: name, description: "...", grade: "?" };
                const cost = TALENT_COST_TABLE[p.grade];
                const cleanDesc = p.description ? p.description.replace(/"/g, '&quot;') : "";

                let canCast = true;
                if (p.grade > 0 && currentTP < cost) canCast = false;

                const cardClass = canCast ? "selected" : "locked"; // Reuse styles or add locked style
                const costLabel = p.grade === 0 ? "Prime (0 TP)" : `${cost} TP`;
                const statusColor = canCast ? barColor : '#666';
                const borderStyle = canCast ? `border:1px solid ${statusColor};` : `border:1px solid #444; opacity:0.6;`;

                html += `
                <div class="esper-card" style="${borderStyle} cursor:pointer;" onclick="castMelderTalent('${name.replace(/'/g, "\\'")}')">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <strong>${name}</strong>
                        <span style="color:${statusColor}; font-weight:bold; font-size:0.9em;">${costLabel}</span>
                    </div>
                    <div style="font-size:0.8em; color:var(--text-muted); margin:3px 0;">
                        Grado ${p.grade} • ${p.time || '-'}
                    </div>
                    <div style="font-size:0.85em; color:#ccc; font-style:italic;">
                        ${cleanDesc}
                    </div>
                </div>`;
            });
        }
        html += `</div>`;

    }

    // --- INTERFACCIA GUERRIERO ---
    else if (currentClass === 'guerriero') {
        let headerHtml = "";

        // 1. COMMANDO HEADER (Dice Bar)
        if (spec === 'commando' && state.level >= 3) {
            const maxDice = RULES_DATA.COMMANDO_DICE_COUNT_TABLE[state.level] || 0;
            const currentDice = state.esper.stuntDice;
            const diceType = RULES_DATA.COMMANDO_DICE_TYPE_TABLE[state.level] || 8;

            // Percentuale per barra visiva
            const barPercent = maxDice > 0 ? (currentDice / maxDice) * 100 : 0;

            headerHtml = `
            <div style="background:rgba(0,0,0,0.4); padding:15px; border-radius:8px; margin-bottom:20px; border-left:4px solid #e74c3c; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div style="flex-grow:1;">
                    <div style="font-size:1.4em; font-weight:bold; color:#e74c3c; text-transform:uppercase;">Commando (Liv. ${state.level})</div>
                    <div style="font-size:0.9em; color:var(--text-muted);">Dadi Prodezza: d${diceType}</div>
                    <div class="tp-container" style="position:relative; height:15px; background:#222; border-radius:12px; overflow:hidden; box-shadow:0 0 5px rgba(0,0,0,0.5); margin-top:5px; width:100%; max-width:200px;">
                        <div class="tp-fill" style="width:${barPercent}%; background:linear-gradient(90deg, #c0392b, #e74c3c); height:100%; transition:width 0.3s ease;"></div>
                         <div style="position:absolute; top:0; left:0; width:100%; height:100%; display:flex; align-items:center; justify-content:center; text-shadow:1px 1px 2px black; font-size:0.7em; font-weight:bold; color:white;">
                            ${currentDice} / ${maxDice}
                        </div>
                    </div>
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cs-v3-btn-sm" onclick="openEsperModal()">⚔ Stili</button>
                    <button class="cs-v3-btn-sm" style="border-color:#2ecc71; color:#2ecc71; background:rgba(46, 204, 113, 0.1);" onclick="performLongRest()">💤 Riposo</button>
                </div>
            </div>`;
        }
        // 2. PARAGON HEADER (Charge Dots)
        else if (spec === 'paragon' && state.level >= 3) {
            const currentCharges = state.esper.paragonCharges;
            let dotsHtml = "";
            for (let i = 0; i < 3; i++) {
                const color = i < currentCharges ? "#e74c3c" : "#444";
                dotsHtml += `<div style="width:15px; height:15px; border-radius:50%; background:${color}; border:1px solid #000;"></div>`;
            }

            headerHtml = `
            <div style="background:rgba(0,0,0,0.4); padding:15px; border-radius:8px; margin-bottom:20px; border-left:4px solid #e74c3c; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div style="flex-grow:1;">
                    <div style="font-size:1.4em; font-weight:bold; color:#e74c3c; text-transform:uppercase;">Paragon (Liv. ${state.level})</div>
                    <div style="font-size:0.9em; color:var(--text-muted);">Cariche Colpo Infuso</div>
                    <div style="display:flex; gap:5px; margin-top:5px;">${dotsHtml}</div>
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cs-v3-btn-sm" onclick="openEsperModal()">⚔ Stili</button>
                    <button class="cs-v3-btn-sm" style="border-color:#2ecc71; color:#2ecc71; background:rgba(46, 204, 113, 0.1);" onclick="performLongRest()">💤 Riposo</button>
                </div>
            </div>`;
        }
        // 3. BASE HEADER (Guard / Warrior < 3)
        else {
            headerHtml = `
            <div style="background:rgba(0,0,0,0.4); padding:15px; border-radius:8px; margin-bottom:20px; border-left:4px solid #e74c3c; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div style="flex-grow:1;">
                    <div style="font-size:1.4em; font-weight:bold; color:#e74c3c; text-transform:uppercase;">Tecniche Marziali</div>
                    <div style="font-size:0.9em; color:var(--text-muted);">Guerriero</div>
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cs-v3-btn-sm" onclick="openEsperModal()">⚔ Stili</button>
                    <button class="cs-v3-btn-sm" style="border-color:#2ecc71; color:#2ecc71; background:rgba(46, 204, 113, 0.1);" onclick="performLongRest()">💤 Riposo</button>
                </div>
            </div>`;
        }

        html += headerHtml;
        html += `<h3>Tecniche Attive</h3><div class="esper-grid">`;

        // 1. STILI SELEZIONATI (Da knownSpells)
        (state.esper.knownSpells || []).forEach(name => {
            const p = RULES_DATA.ESPER_POWERS.find(x => x.name === name);
            if (p) html += renderEsperCardHTML(p, name, p.description, "selected", '<span style="color:var(--text-muted);">Stile</span>');
        });

        // 2. AUTO-AGGIUNTA: PRODEZZE (Commando Liv 3+)
        if (spec === 'commando' && state.level >= 3) {
            // Prendi TUTTE le prodezze dal DB (Grado 1, Guerriero, No Risorse Speciali)
            const stunts = RULES_DATA.ESPER_POWERS.filter(p => p.class === 'Guerriero' && p.grade === 1 && !p.usesResource);
            stunts.forEach(p => {
                const cleanDesc = p.description.replace(/"/g, '&quot;');
                // Card Cliccabile che chiama castWarriorPower
                html += `
                <div class="esper-card" style="border:1px solid #e74c3c; cursor:pointer;" onclick="castWarriorPower('${p.name.replace(/'/g, "\\'")}')">
                    <div class="ec-header">
                        <span class="ec-name">${p.name}</span>
                        <span class="ec-time" style="background:#e74c3c; color:white; font-size:0.7em;">1 Dado</span>
                    </div>
                    <div class="ec-desc">${cleanDesc}</div>
                </div>`;
            });
        }

        // 3. AUTO-AGGIUNTA: PARAGON (Abilità Livello)
        if (spec === 'paragon') {
            if (state.level >= 3) {
                const p = RULES_DATA.ESPER_POWERS.find(x => x.name === "Colpo Infuso");
                if (p) {
                    html += `
                    <div class="esper-card" style="border:1px solid #e74c3c; cursor:pointer;" onclick="castWarriorPower('Colpo Infuso')">
                        <div class="ec-header">
                            <span class="ec-name">Colpo Infuso</span>
                            <span class="ec-time" style="background:#e74c3c; color:white; font-size:0.7em;">Carica</span>
                        </div>
                        <div class="ec-desc">${p.description}</div>
                    </div>`;
                }
            }
            if (state.level >= 18) {
                const p = RULES_DATA.ESPER_POWERS.find(x => x.name === "Sopravvissuto");
                if (p) {
                    html += `
                    <div class="esper-card" style="border:1px solid #e74c3c; cursor:pointer;" onclick="castWarriorPower('Sopravvissuto')">
                        <div class="ec-header">
                            <span class="ec-name">Sopravvissuto</span>
                            <span class="ec-time" style="background:#444; color:white; font-size:0.7em;">Attiva</span>
                        </div>
                        <div class="ec-desc">${p.description}</div>
                    </div>`;
                }
            }
        }

        html += `</div>`;
    }
    // --- INTERFACCIA INGEGNERE ---
    else if (currentClass === 'ingegnere') {
        // A. HEADER: Stats & Config
        const maxPrepared = getPreparedLimit();
        const currentPrepared = state.esper.preparedSpells.length;

        html += `
        <div style="background:rgba(0,0,0,0.4); padding:15px; border-radius:8px; margin-bottom:20px; border-left:4px solid var(--accent-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div style="flex-grow:1;">
                <div style="font-size:1.4em; font-weight:bold; color:var(--accent-color); text-transform:uppercase;">Ingegnere</div>
                <div style="font-size:0.9em; color:var(--text-muted);">
                    Preparati: <strong style="color:white;">${currentPrepared} / ${maxPrepared}</strong>
                </div>
            </div>
            <div style="display:flex; gap:8px;">
                <button class="cs-v3-btn-sm" onclick="openEsperModal()">⚡ Tecniche</button>
                <button class="cs-v3-btn-sm" style="border-color:#2ecc71; color:#2ecc71; background:rgba(46, 204, 113, 0.1);" onclick="performLongRest()">💤 Riposo</button>
            </div>
        </div>`;

        // B. SLOTS TRACKER
        html += `<div id="esper-slots-container" style="margin-bottom:20px;">
            ${renderEsperSlots()}
        </div>`;

        // C. ACTIVE POWERS (GRID VIEW)
        html += `<h3>Tecniche Attive</h3>
        <div class="esper-grid">`;

        // 0. Prime Powers (From Primes List)
        (state.esper.primes || []).forEach(name => {
            const p = RULES_DATA.ESPER_POWERS.find(x => x.name === name) || { name: name, description: "Tecnica Prime", grade: 0 };
            const cleanDesc = p.description ? p.description.replace(/"/g, '&quot;') : "";
            html += renderEsperCardHTML(p, name, cleanDesc, "selected", '<span style="color:var(--accent-color);">Prime</span>');
        });

        // 1. Specialization Powers (Always Prepared, Gold Border)
        const specPowers = getUnlockedSpecialtyPowers();
        specPowers.forEach(name => {
            const p = RULES_DATA.ESPER_POWERS.find(x => x.name === name) || { name: name, description: "Potere Bonus", grade: "?" };
            const cleanDesc = p.description ? p.description.replace(/"/g, '&quot;') : "";
            html += renderEsperCardHTML(p, name, cleanDesc, "specialty", '<span style="color:#ffd700;">★ Spec</span>');
        });

        // 2. Prepared Powers (Blue Border) - Exclude Primes and Specialties
        state.esper.preparedSpells.forEach(name => {
            const p = RULES_DATA.ESPER_POWERS.find(x => x.name === name) || { name: name, description: "...", grade: "?" };
            const cleanDesc = p.description ? p.description.replace(/"/g, '&quot;') : "";
            html += renderEsperCardHTML(p, name, cleanDesc, "selected", `<span style="color:var(--accent-color);">G${p.grade}</span>`);
        });

        if (state.esper.primes.length === 0 && state.esper.preparedSpells.length === 0 && specPowers.length === 0) {
            html += `<p style="grid-column:1/-1; color:var(--text-muted);">Nessun potere preparato o disponibile.</p>`;
        }

        html += `</div>`;
    }
    // --- INTERFACCIA SOLARIANO ---
    else if (currentClass === 'solariano') {
        const attunement = state.esper.attunement || 0;
        let attunementLabel = "Non Sintonizzato";
        let attunementColor = "#777";
        let icon = "⚪";
        let barClass = "";

        if (attunement === 1) {
            attunementLabel = "Modo Fotone (Solare)";
            attunementColor = "#f1c40f"; // Gold
            icon = "☀️";
            barClass = "photon-mode";
        } else if (attunement === 2) {
            attunementLabel = "Modo Gravitone (Vuoto)";
            attunementColor = "#8e44ad"; // Dark Purple
            icon = "⚫";
            barClass = "graviton-mode";
        }

        html += `
        <div style="background:rgba(0,0,0,0.4); padding:15px; border-radius:8px; margin-bottom:20px; border-left:4px solid ${attunementColor}; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div style="flex-grow:1;">
                <div style="font-size:1.4em; font-weight:bold; color:${attunementColor}; text-transform:uppercase; letter-spacing:1px;">Solariano</div>
                <div style="font-size:0.8em; color:var(--text-muted); display:flex; align-items:center; gap:5px;">
                    <span style="background:${attunementColor}; color:black; padding:2px 6px; border-radius:4px; font-weight:bold;">LIV ${state.level}</span>
                    <span>Sintonizzazione Stellare</span>
                </div>
            </div>
            
            <div style="display:flex; gap:8px;">
                <button class="cs-v3-btn-sm" onclick="openEsperModal()" title="Gestisci Rivelazioni">
                    <span>⚡ Gestisci</span>
                </button>
                <button class="cs-v3-btn-sm" style="border-color:#2ecc71; color:#2ecc71; background:rgba(46, 204, 113, 0.1);" onclick="performLongRest()" title="Riposo Lungo">
                    <span>💤 Riposo</span>
                </button>
            </div>
        </div>

        <div onclick="cycleSolarianAttunement()" style="margin-bottom:20px; background:#222; border:1px solid ${attunementColor}; border-radius:8px; padding:10px; text-align:center; cursor:pointer; transition:all 0.3s; box-shadow:0 0 10px ${attunementColor}40;">
            <div style="font-size:1.5em; margin-bottom:5px;">${icon}</div>
            <div style="font-weight:bold; color:${attunementColor}; text-transform:uppercase; letter-spacing:1px;">${attunementLabel}</div>
            <div style="font-size:0.7em; color:#aaa; margin-top:2px;">Clicca per cambiare stato</div>
        </div>
        
        <h3>Rivelazioni Conosciute</h3>
        <div class="esper-grid">`;

        const known = state.esper.knownSpells || [];
        // Sort by Grade
        known.sort((a, b) => {
            const pA = RULES_DATA.ESPER_POWERS.find(x => x.name === a) || { grade: 0 };
            const pB = RULES_DATA.ESPER_POWERS.find(x => x.name === b) || { grade: 0 };
            return pA.grade - pB.grade;
        });

        // LISTA CARD RIVELAZIONI
        known.forEach(name => {
            const p = RULES_DATA.ESPER_POWERS.find(x => x.name === name);
            if (!p) return;

            // --- LOGICA SINTONIZZAZIONE (COLORS) ---
            // 0=Neutro, 1=Fotone (Oro), 2=Gravitone (Viola)

            // Rilevamento Keywords nel Nome o Descrizione
            const text = (p.name + " " + p.description).toLowerCase();
            const isPhoton = text.includes("fotone") || text.includes("solare") || text.includes("fuoco") || text.includes("radiant") || text.includes("luce");
            const isGraviton = text.includes("gravit") || text.includes("vuoto") || text.includes("forza") || text.includes("nero") || text.includes("oscurità");

            let cardStyle = "background:rgba(255,255,255,0.05); border:1px solid #444;";
            let timeBadge = "background:#444; color:#ccc;";

            // SE ATTIVO FOTONE E POTERE È FOTONE
            if (attunement === 1 && isPhoton) {
                cardStyle = "background:rgba(241, 196, 15, 0.15); border:1px solid #f1c40f; box-shadow:0 0 8px rgba(241, 196, 15, 0.2);";
                timeBadge = "background:#f1c40f; color:#000; font-weight:bold;";
            }
            // SE ATTIVO GRAVITONE E POTERE È GRAVITONE
            else if (attunement === 2 && isGraviton) {
                cardStyle = "background:rgba(142, 68, 173, 0.15); border:1px solid #8e44ad; box-shadow:0 0 8px rgba(142, 68, 173, 0.2);";
                timeBadge = "background:#8e44ad; color:#fff; font-weight:bold;";
            }

            const cleanDesc = p.description.replace(/"/g, '&quot;');

            html += `
            <div class="esper-card" style="${cardStyle} cursor:pointer; transition:all 0.3s;" onclick="alert('Uso Rivelazione: ${p.name}')">
                <div class="ec-header">
                    <span class="ec-name">${p.name}</span>
                    <span class="ec-time" style="${timeBadge} padding:2px 6px; border-radius:4px; font-size:0.7em;">G${p.grade}</span>
                </div>
                <div class="ec-meta" style="color:rgba(255,255,255,0.6);">
                    <span>${p.time || '-'}</span> | <span>${p.range || '-'}</span>
                </div>
                <div class="ec-desc" style="color:rgba(255,255,255,0.8);">${cleanDesc}</div>
            </div>`;
        });
        html += `</div>`;
    }

    html += `</div>`;
    tab.innerHTML = html;
}

// Helper to DRY card rendering
function renderEsperCardHTML(p, name, cleanDesc, extraClass, statusLabel) {
    return `
    <div class="esper-card ${extraClass}" onclick="castSpell('${name.replace(/'/g, "\\'")}')">
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong>${name}</strong>
            ${statusLabel}
        </div>
        <div style="font-size:0.8em; color:var(--text-muted); margin:3px 0;">
            ${p.time || '-'}
        </div>
        <div style="font-size:0.85em; color:#ccc; font-style:italic;">
            ${cleanDesc}
        </div>
    </div>`;
}

function renderEsperSlots() {
    const slotsMax = getSlotsMax();
    let html = `<div style="display:flex; flex-wrap:wrap; gap:15px;">`;

    for (let grade = 1; grade <= 9; grade++) {
        const total = slotsMax[grade] || 0;
        if (total === 0) continue;

        const used = state.esper.slotsUsed[grade] || 0;
        html += `<div style="background:rgba(0,0,0,0.3); padding:5px 10px; border-radius:5px; border:1px solid var(--border-color);">
            <div style="font-size:0.8em; text-align:center; margin-bottom:5px;">GRADO ${grade}</div>
            <div style="display:flex; gap:5px;">`;

        for (let i = 0; i < total; i++) {
            const isUsed = i < used;
            const color = isUsed ? '#333' : 'var(--accent-color)';
            html += `<div onclick="toggleEsperSlot(${grade}, ${i})"
                style="width:15px; height:15px; border-radius:50%; background:${color}; border:1px solid var(--accent-color); cursor:pointer;">
            </div>`;
        }
        html += `</div></div>`;
    }
    html += `</div>`;
    return html;
}

/* --- GESTIONE STATO ESPER (LOGICA FIXATA) --- */

// Funzione di sicurezza per inizializzare lo stato se manca
function ensureEsperState() {
    if (!state.esper) state.esper = {};
    if (!state.esper.primes) state.esper.primes = [];
    if (!state.esper.preparedSpells) state.esper.preparedSpells = [];
    if (!state.esper.slotsUsed) state.esper.slotsUsed = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

    const currentClass = state.classKey ? state.classKey.toLowerCase() : "";
    const spec = state.specializationKey ? state.specializationKey.toLowerCase() : "";

    if (currentClass === 'melder') {
        if (!state.esper.knownSpells) state.esper.knownSpells = [];
        if (typeof state.esper.currentTP === 'undefined') state.esper.currentTP = getMelderMaxTP();
    } else if (currentClass === 'mistico') {
        if (!state.esper.knownSpells) state.esper.knownSpells = [];
        if (typeof state.esper.currentTP === 'undefined') state.esper.currentTP = getMisticoMaxTP();
    } else if (currentClass === 'paradosso') {
        if (!state.esper.knownSpells) state.esper.knownSpells = [];
        if (typeof state.esper.currentTP === 'undefined') state.esper.currentTP = getParadossoMaxTP();
    } else if (currentClass === 'specialista' && spec === 'artificio') {
        if (!state.esper.knownSpells) state.esper.knownSpells = [];
        if (typeof state.esper.currentTP === 'undefined') state.esper.currentTP = ARTIFICIO_TP_TABLE[state.level] || 0;
    } else if (currentClass === 'guerriero') {
        if (!state.esper.knownSpells) state.esper.knownSpells = [];
        if (spec === 'commando') {
            const maxDice = RULES_DATA.COMMANDO_DICE_COUNT_TABLE[state.level] || 0;
            if (typeof state.esper.stuntDice === 'undefined') state.esper.stuntDice = maxDice;
        } else if (spec === 'paragon') {
            if (typeof state.esper.paragonCharges === 'undefined') state.esper.paragonCharges = 3;
        }
    } else if (currentClass === 'solariano') {
        if (!state.esper.knownSpells) state.esper.knownSpells = [];
        if (typeof state.esper.attunement === 'undefined') state.esper.attunement = 0; // 0=None, 1=Photon, 2=Graviton
    }
}

/* --- HELPER CALCOLI --- */

// 1. Limite Tecniche Prime (Tabella fissa per livello)
function getPrimeLimit() {
    const level = state.level || 1;
    return (typeof ENGINEER_PRIME_KNOWN_TABLE !== 'undefined') ? (ENGINEER_PRIME_KNOWN_TABLE[level] || 3) : 3;
}

// 2. Limite Tecniche Preparate (Grado 1+)
// Formula: Livello + Modificatore Saggezza (Minimo 1)
function getPreparedLimit() {
    const wis = state.baseStats.wis || 10;
    const mod = Math.floor((wis - 10) / 2);
    const level = state.level || 1;
    return Math.max(1, mod + level);
}

// 3. Grado Massimo Lanciabile (Level Gating)
// Controlla qual è lo slot più alto disponibile per il livello attuale
function getMaxCastableGrade() {
    const level = state.level || 1;
    const slots = (RULES_DATA.ENGINEER_SLOTS_TABLE && RULES_DATA.ENGINEER_SLOTS_TABLE[level]) || [];
    for (let i = slots.length - 1; i >= 0; i--) {
        if (slots[i] > 0) return i + 1; // +1 perché l'array parte da 0
    }
    return 0;
}

/* --- HELPER SPECIFICI MELDER --- */

// 1. Calcolo Punti Talento Max
function getMelderMaxTP() {
    const level = state.level || 1;
    return MELDER_TP_TABLE[level] || 4;
}

// 2. Limite Talenti Conosciuti (Graduate 1-9)
// Formula Melder: 6 + (Livello-1)*2 = 4 + (Livello * 2)
function getMelderGradedLimit() {
    const level = state.level || 1;
    return 4 + (level * 2);
}

// 3. Grado Massimo Lanciabile Melder
function getMelderMaxGrade() {
    const level = state.level || 1;
    return MELDER_MAX_GRADE_TABLE[level] || 1;
}

/* --- HELPER MISTICO --- */
function getMisticoMaxTP() {
    const level = state.level || 1;
    return MISTICO_TP_TABLE[level] || 4;
}

// Formula Talenti Conosciuti Mistico: 4 iniziali + 2 per livello
// (Livello 1: 4. Livello 2: 6. Ecc) -> 2 + (Livello * 2)
function getMisticoGradedLimit() {
    const level = state.level || 1;
    return 2 + (level * 2);
}

// Grado Massimo (Stessa tabella del Melder)
function getMisticoMaxGrade() {
    const level = state.level || 1;
    return MELDER_MAX_GRADE_TABLE[level] || 1;
}

/* --- HELPER PARADOSSO --- */
function getParadossoMaxTP() {
    const level = state.level || 1;
    return (typeof PARADOSSO_TP_TABLE !== 'undefined' ? PARADOSSO_TP_TABLE[level] : 4) || 4;
}

function getParadossoGradedLimit() {
    const level = state.level || 1;
    // Formula: 4 + (Livello * 2)
    return 4 + (level * 2);
}

function getParadossoMaxGrade() {
    const level = state.level || 1;
    return (typeof MELDER_MAX_GRADE_TABLE !== 'undefined' ? MELDER_MAX_GRADE_TABLE[level] : 1) || 1;
}

/* --- FUNZIONE GESTIONE SELEZIONE (SWITCH CLASSE) --- */
function toggleEsperPreparation(powerName) {
    ensureEsperState();
    const power = RULES_DATA.ESPER_POWERS.find(p => p.name === powerName);
    if (!power) {
        console.error("Potere non trovato nel DB:", powerName);
        return;
    }

    // 1. CHECK ESCLUSIVITÀ SOTTOCLASSE
    if (power.exclusiveSpec) {
        const mySpec = state.specializationKey ? state.specializationKey.toLowerCase() : "";
        if (mySpec !== power.exclusiveSpec) {
            showCustomModal("Restrizione di Classe", `Questo potere è disponibile solo per la specializzazione: ${power.exclusiveSpec.toUpperCase()}.`, null, null);
            return;
        }
    }

    // A. Controllo Specializzazioni (Sempre attive)
    const specialties = getUnlockedSpecialtyPowers();
    if (specialties.includes(powerName)) {
        alert("Questo potere deriva dalla tua Specializzazione ed è sempre attivo.");
        return;
    }

    // === FIX CONFRONTO ===
    const currentClass = state.classKey ? state.classKey.toLowerCase() : "";
    const spec = state.specializationKey ? state.specializationKey.toLowerCase() : "";

    // --- GUERRIERO ---
    if (currentClass === 'guerriero') {
        // Blocca selezione di tutto ciò che non è uno Stile (Grado 0)
        if (power.grade !== 0) {
            // Le abilità di classe e le prodezze sono automatiche, non si selezionano qui
            return;
        }

        if (!state.esper.knownSpells) state.esper.knownSpells = [];
        const isKnown = state.esper.knownSpells.includes(powerName);

        if (isKnown) {
            // Rimozione
            const idx = state.esper.knownSpells.indexOf(powerName);
            state.esper.knownSpells.splice(idx, 1);
        } else {
            // Aggiunta con Limite Stili
            let styleLimit = 1;
            // Paragon al livello 10 ne ottiene un secondo
            if (spec === 'paragon' && state.level >= 10) styleLimit = 2;

            if (state.esper.knownSpells.length >= styleLimit) {
                showCustomModal("Limite Raggiunto", `Puoi selezionare al massimo ${styleLimit} Stile/i di Combattimento.`, null, null);
                return;
            }
            state.esper.knownSpells.push(powerName);
        }

        updateEsperModalList();
        renderEsperTab();
        return;
    }

    // --- RAMO INGEGNERE ---
    if (currentClass === 'ingegnere') {
        const slotsMax = getSlotsMax();
        const maxLevel = getMaxCastableGrade();
        const primesMax = getPrimeLimit();
        const preparedMax = getPreparedLimit();

        // B. LOGICA RAMO 1: TECNICHE PRIME (GRADO 0)
        if (power.grade === 0) {
            const idx = state.esper.primes.indexOf(powerName);
            if (idx > -1) {
                state.esper.primes.splice(idx, 1);
            } else {
                if (state.esper.primes.length >= primesMax) {
                    alert(`Hai già raggiunto il limite di ${primesMax} Tecniche Prime.`);
                    return;
                }
                state.esper.primes.push(powerName);
            }
        }
        // C. LOGICA RAMO 2: TECNICHE GRADUATE (GRADO 1+)
        else {
            if (power.grade > maxLevel) {
                alert(`Livello insufficiente. Puoi preparare fino al Grado ${maxLevel}.`);
                return;
            }
            const idx = state.esper.preparedSpells.indexOf(powerName);
            if (idx > -1) {
                state.esper.preparedSpells.splice(idx, 1);
            } else {
                if (state.esper.preparedSpells.length >= preparedMax) {
                    alert(`Hai già preparato il massimo numero di poteri (${preparedMax}).`);
                    return;
                }
                state.esper.preparedSpells.push(powerName);
            }
        }
    }
    // --- RAMO SPECIALISTA (ARTIFICIO) ---
    else if (currentClass === 'specialista' && spec === 'artificio') {
        if (!state.esper.knownSpells) state.esper.knownSpells = [];

        // Check Blocco Livello (Visuale + Logico)
        const maxGrade = ARTIFICIO_MAX_GRADE_TABLE[state.level] || 0;
        if (power.grade > 0 && power.grade > maxGrade) {
            // Usa Modale Custom invece di alert
            showCustomModal("Livello Insufficiente", `Al livello ${state.level} puoi apprendere solo fino al Grado ${maxGrade}.`, null, null);
            return;
        }

        const isKnown = state.esper.knownSpells.includes(powerName);

        if (isKnown) {
            const idx = state.esper.knownSpells.indexOf(powerName);
            state.esper.knownSpells.splice(idx, 1);
        } else {
            // Limiti
            if (power.grade === 0) {
                const limit = ARTIFICIO_PRIME_KNOWN_TABLE[state.level] || 0;
                const count = state.esper.knownSpells.filter(n => {
                    const p = RULES_DATA.ESPER_POWERS.find(x => x.name === n);
                    return p && p.grade === 0;
                }).length;
                if (count >= limit) {
                    showCustomModal("Limite Raggiunto", `Hai già appreso il massimo numero di Tecniche Prime (${limit}).`, null, null);
                    return;
                }
            } else {
                const limit = ARTIFICIO_KNOWN_TABLE[state.level] || 0;
                const count = state.esper.knownSpells.filter(n => {
                    const p = RULES_DATA.ESPER_POWERS.find(x => x.name === n);
                    return p && p.grade > 0;
                }).length;
                if (count >= limit) {
                    showCustomModal("Limite Raggiunto", `Hai già appreso il massimo numero di Talenti Tech (${limit}).`, null, null);
                    return;
                }
            }
            state.esper.knownSpells.push(powerName);
        }
        if (typeof updateEsperModalList === 'function') updateEsperModalList();
        if (typeof renderEsperTab === 'function') renderEsperTab();
        return;
    }

    // --- GESTIONE PARADOSSO ---
    else if (currentClass === 'paradosso') {
        if (!state.esper.knownSpells) state.esper.knownSpells = [];
        const isKnown = state.esper.knownSpells.includes(powerName);

        if (isKnown) {
            // RIMOZIONE
            const idx = state.esper.knownSpells.indexOf(powerName);
            state.esper.knownSpells.splice(idx, 1);
        } else {
            // AGGIUNTA
            // Limiti Paradosso
            if (power.grade === 0) {
                const limit = (typeof PARADOSSO_PRIME_KNOWN_TABLE !== 'undefined' ? PARADOSSO_PRIME_KNOWN_TABLE[state.level] : 3) || 3;
                const count = state.esper.knownSpells.filter(n => {
                    const p = (RULES_DATA.ESPER_POWERS && RULES_DATA.ESPER_POWERS.find(x => x.name === n)) || {};
                    return p.grade === 0;
                }).length;
                if (count >= limit) {
                    showCustomModal("Limite Raggiunto", `Limite Tecniche Prime: ${limit}.`, null, null);
                    return;
                }
            } else {
                const maxGrade = getParadossoMaxGrade();
                if (power.grade > maxGrade) {
                    showCustomModal("Livello Insufficiente", `Grado massimo attuale: ${maxGrade}.`, null, null);
                    return;
                }
                const limit = getParadossoGradedLimit();
                const count = state.esper.knownSpells.filter(n => {
                    const p = (RULES_DATA.ESPER_POWERS && RULES_DATA.ESPER_POWERS.find(x => x.name === n)) || {};
                    return p.grade > 0;
                }).length;
                if (count >= limit) {
                    showCustomModal("Limite Raggiunto", `Limite Talenti Conosciuti: ${limit}.`, null, null);
                    return;
                }
            }
            state.esper.knownSpells.push(powerName);
        }
        updateEsperModalList();
        renderEsperTab();
        return;
    }

    // --- GESTIONE MISTICO ---
    else if (currentClass === 'mistico') {
        if (!state.esper.knownSpells) state.esper.knownSpells = [];
        const isKnown = state.esper.knownSpells.includes(powerName);

        if (isKnown) {
            const idx = state.esper.knownSpells.indexOf(powerName);
            state.esper.knownSpells.splice(idx, 1);
        } else {
            // Limiti Mistico
            if (power.grade === 0) {
                const limit = MISTICO_PRIME_KNOWN_TABLE[state.level] || 3;
                const count = state.esper.knownSpells.filter(n => {
                    const p = (RULES_DATA.ESPER_POWERS && RULES_DATA.ESPER_POWERS.find(x => x.name === n)) || {};
                    return p.grade === 0;
                }).length;
                if (count >= limit) {
                    showCustomModal("Limite Raggiunto", `Hai raggiunto il limite di ${limit} Talenti Prime.`, null, null);
                    return;
                }
            } else {
                const maxGrade = getMisticoMaxGrade();
                if (power.grade > maxGrade) {
                    showCustomModal("Livello Insufficiente", `Puoi apprendere solo fino al Grado ${maxGrade}.`, null, null);
                    return;
                }
                const limit = getMisticoGradedLimit();
                const count = state.esper.knownSpells.filter(n => {
                    const p = (RULES_DATA.ESPER_POWERS && RULES_DATA.ESPER_POWERS.find(x => x.name === n)) || {};
                    return p.grade > 0;
                }).length;
                if (count >= limit) {
                    showCustomModal("Limite Raggiunto", `Hai raggiunto il limite di ${limit} Talenti conosciuti.`, null, null);
                    return;
                }
            }
            state.esper.knownSpells.push(powerName);
        }
        updateEsperModalList();
        renderEsperTab();
        return;
    }

    // --- MELDER LEGACY CHECK (Safety) ---
    else if (currentClass === 'melder') {
        if (!state.esper.knownSpells) state.esper.knownSpells = [];
        const isKnown = state.esper.knownSpells.includes(powerName);

        if (isKnown) {
            const idx = state.esper.knownSpells.indexOf(powerName);
            state.esper.knownSpells.splice(idx, 1);
        } else {
            const maxGrade = getMelderMaxGrade();
            if (power.grade > 0 && power.grade > maxGrade) {
                showCustomModal("Livello Insufficiente", `Grado massimo attuale: ${maxGrade}`, null, null);
                return;
            }
            // Logic Simplified per coerenza
            if (power.grade === 0) {
                const limit = MELDER_PRIME_KNOWN_TABLE[state.level] || 3;
                const count = state.esper.knownSpells.filter(n => {
                    const p = RULES_DATA.ESPER_POWERS.find(x => x.name === n);
                    return p && p.grade === 0;
                }).length;
                if (count >= limit) { showCustomModal("Limite Raggiunto", "Hai raggiunto il limite di tecnche Prime.", null, null); return; }
            } else {
                const limit = getMelderGradedLimit();
                const count = state.esper.knownSpells.filter(n => {
                    const p = RULES_DATA.ESPER_POWERS.find(x => x.name === n);
                    return p && p.grade > 0;
                }).length;
                if (count >= limit) { showCustomModal("Limite Raggiunto", "Hai raggiunto il limite di talenti conosciuti.", null, null); return; }
            }
            state.esper.knownSpells.push(powerName);
        }
    }
    // --- GESTIONE SOLARIANO ---
    else if (currentClass === 'solariano') {
        if (!state.esper.knownSpells) state.esper.knownSpells = [];
        const isKnown = state.esper.knownSpells.includes(powerName);

        if (isKnown) {
            const idx = state.esper.knownSpells.indexOf(powerName);
            state.esper.knownSpells.splice(idx, 1);
        } else {
            // Check Livello 1 (Tabella restituisce 0)
            const limit = SOLARIAN_KNOWN_TABLE[state.level] || 0;
            if (limit === 0) {
                showCustomModal("Livello Insufficiente", "I Solariani iniziano ad apprendere Rivelazioni al Livello 2.", null, null);
                return;
            }

            const maxGrade = SOLARIAN_MAX_GRADE_TABLE[state.level] || 1;
            if (power.grade > maxGrade) {
                showCustomModal("Livello Insufficiente", `Puoi apprendere solo fino al Grado ${maxGrade}.`, null, null);
                return;
            }

            if (state.esper.knownSpells.length >= limit) {
                showCustomModal("Limite Raggiunto", `Hai raggiunto il limite di ${limit} Rivelazioni conosciute.`, null, null);
                return;
            }
            state.esper.knownSpells.push(powerName);
        }
    }

    // Aggiornamento immediato della UI
    if (typeof updateEsperModalList === 'function') updateEsperModalList();
    if (typeof renderEsperTab === 'function') renderEsperTab();
}

/* --- LANCIO POTERI GUERRIERO --- */
function castWarriorPower(powerName) {
    const power = RULES_DATA.ESPER_POWERS.find(p => p.name === powerName);
    if (!power) return;

    const spec = state.specializationKey ? state.specializationKey.toLowerCase() : "";

    // 1. COMMANDO: PRODEZZE (Lancio Silenzioso)
    if (spec === 'commando' && power.grade === 1 && !power.usesResource) {
        if (state.esper.stuntDice > 0) {
            state.esper.stuntDice--; // Scala dado
            renderEsperTab(); // Aggiorna barra visuale
            // Nessun alert, azione rapida
        } else {
            showCustomModal("Esauriti", "Non hai più Dadi Prodezza.", null, null);
        }
        return;
    }

    // 2. PARAGON: COLPO INFUSO
    if (power.usesResource === "paragon") {
        if (state.esper.paragonCharges > 0) {
            state.esper.paragonCharges--;
            renderEsperTab();
        } else {
            showCustomModal("Esaurito", "Cariche terminate.", null, null);
        }
        return;
    }

    // 3. PARAGON: SOPRAVVISSUTO (Logica Automatica)
    if (power.usesResource === "paragon_passive") {
        const halfHP = Math.floor(state.hp.max / 2);
        if (state.hp.current > 0 && state.hp.current < halfHP) {
            const conVal = state.baseStats.con + getStatBonus('con'); // O usa .mod_con element
            const conMod = Math.floor((conVal - 10) / 2);
            const heal = 5 + conMod;

            const oldHP = state.hp.current;
            state.hp.current = Math.min(state.hp.max, state.hp.current + heal);

            alert(`Sopravvissuto attivato!\nRecuperati ${heal} PF (${oldHP} -> ${state.hp.current})`);

            if (window.updateVitalsUI) window.updateVitalsUI();
        } else {
            showCustomModal("Condizioni non soddisfatte", "Devi avere meno della metà dei PF (e più di 0) per usare Sopravvissuto.", null, null);
        }
        return;
    }
}

/* --- FUNZIONE LANCIO MELDER (SILENZIOSA) --- */
function castMelderTalent(powerName) {
    const power = RULES_DATA.ESPER_POWERS.find(p => p.name === powerName);
    if (!power) return;

    if (power.grade === 0) {
        // Lancio gratuito (Prime), nessun feedback invasivo
        return;
    }

    const cost = TALENT_COST_TABLE[power.grade];

    // Controlla TP
    if (state.esper.currentTP >= cost) {
        state.esper.currentTP -= cost;
        // NESSUN ALERT: Aggiorna solo la barra visivamente
        renderEsperTab();
    } else {
        // Errore usa la modale custom, più elegante
        showCustomModal("Energia Insufficiente", `Servono ${cost} TP, ne hai solo ${state.esper.currentTP}.`, null, null);
    }
}

/* --- FUNZIONE RIPOSO LUNGO (MODALE CUSTOM) --- */
function performLongRest() {
    showCustomModal(
        "Riposo Lungo",
        "Vuoi effettuare un riposo lungo? Recupererai tutti i PF e le risorse.",
        null, // Nessun input
        () => { // Callback di conferma
            // 1. Ripristina PV
            state.hp.current = state.hp.max;

            // 2. Ripristina Slot Esper
            if (state.esper && state.esper.slotsUsed) {
                for (let i = 1; i <= 9; i++) {
                    state.esper.slotsUsed[i] = 0;
                }
            }

            // 3. Ripristina TP (Melder) - Fix Case Insensitive
            if (state.classKey && state.classKey.toLowerCase() === 'melder') {
                if (typeof getMelderMaxTP === 'function') {
                    state.esper.currentTP = getMelderMaxTP();
                } else {
                    state.esper.currentTP = MELDER_TP_TABLE[state.level] || 4;
                }
            } else if (state.classKey && state.classKey.toLowerCase() === 'mistico') {
                state.esper.currentTP = getMisticoMaxTP();
            } else if (state.classKey && state.classKey.toLowerCase() === 'paradosso') {
                state.esper.currentTP = getParadossoMaxTP();
            } else if (state.classKey && state.classKey.toLowerCase() === 'specialista') {
                state.esper.currentTP = ARTIFICIO_TP_TABLE[state.level] || 0;
            }

            // 4. Reset Guerriero
            if (state.classKey && state.classKey.toLowerCase() === 'guerriero') {
                const spec = state.specializationKey ? state.specializationKey.toLowerCase() : "";

                // Reset Commando
                if (spec === 'commando') {
                    state.esper.stuntDice = RULES_DATA.COMMANDO_DICE_COUNT_TABLE[state.level] || 0;
                }
                // Reset Paragon
                if (spec === 'paragon') {
                    state.esper.paragonCharges = 3;
                }
            }

            // Aggiorna UI
            if (window.recalculate) window.recalculate();
            if (window.renderEsperTab) window.renderEsperTab();
        }
    );
}

function getUnlockedSpecialtyPowers() {
    const spec = state.specializationKey ? state.specializationKey.toLowerCase() : null;
    if (!spec || !RULES_DATA.ENGINEER_SPECIALTIES_BY_LEVEL || !RULES_DATA.ENGINEER_SPECIALTIES_BY_LEVEL[spec]) return [];

    let unlocked = [];
    const table = RULES_DATA.ENGINEER_SPECIALTIES_BY_LEVEL[spec];
    for (const [lvlStr, powers] of Object.entries(table)) {
        if (state.level >= parseInt(lvlStr)) {
            unlocked = unlocked.concat(powers);
        }
    }
    return unlocked;
}


// --- LOGIC: SLOTS & CASTING ---

function getSlotsMax() {
    const table = RULES_DATA.ENGINEER_SLOTS_TABLE;
    if (!table) return [];

    const row = table[state.level];
    if (!row) return [];

    // Row is [Slot1 ... Slot9], convert to array indexed by grade
    const res = [];
    res[0] = 0;
    for (let i = 0; i < row.length; i++) {
        res[i + 1] = row[i];
    }
    return res;
}

function toggleEsperSlot(grade, slotIndex) {
    if (!state.esper.slotsUsed[grade]) state.esper.slotsUsed[grade] = 0;
    const currentUsed = state.esper.slotsUsed[grade];

    if (slotIndex < currentUsed) {
        // Toggle OFF (set count to index)
        state.esper.slotsUsed[grade] = slotIndex;
    } else {
        // Toggle ON (set count to index + 1)
        state.esper.slotsUsed[grade] = slotIndex + 1;
    }
    renderEsperTab();
}

function castSpell(powerName) {
    const currentClass = state.classKey ? state.classKey.toLowerCase() : "";
    const spec = state.specializationKey ? state.specializationKey.toLowerCase() : "";

    // 1. Melder / Artificio Logic (Delegated)
    if (currentClass === 'melder' || (currentClass === 'specialista' && spec === 'artificio')) {
        castMelderTalent(powerName);
        return;
    }

    // 2. Engineer Logic (Slots)
    const power = RULES_DATA.ESPER_POWERS.find(p => p.name === powerName);
    if (!power) {
        alert("Errore: Potere non trovato.");
        return;
    }

    // Cantrips (Grade 0) are free
    if (power.grade === 0) {
        return;
    }

    const maxSlots = getSlotsMax();
    let consumedGrade = -1;

    // Auto-search slot
    for (let g = power.grade; g <= 9; g++) {
        const used = state.esper.slotsUsed[g] || 0;
        const total = maxSlots[g] || 0;
        if (used < total) {
            consumedGrade = g;
            break;
        }
    }

    if (consumedGrade !== -1) {
        state.esper.slotsUsed[consumedGrade]++;
        renderEsperTab();
    } else {
        alert("Non hai slot disponibili di grado sufficiente!");
    }
}

// --- MODAL UI ---

function openEsperModal() {
    const modal = document.getElementById('esper-modal');
    if (modal) {
        modal.style.display = 'flex'; // Changed to flex to center
        updateEsperModalList();
    }
}

function closeEsperModal() {
    const modal = document.getElementById('esper-modal');
    if (modal) modal.style.display = 'none';
}

/* --- UPDATE BASE STAT (Estratta per reattività) --- */
function updateBaseStat(attr, valueStr) {
    const val = parseInt(valueStr) || 10;
    const bonus = getStatBonus(attr);
    state.baseStats[attr] = val - bonus;

    updateModifiers();
    calculateDerivedStats();
    renderSkills(); // Reattività Skill

    /* --- INIEZIONE PER AGGIORNAMENTO LIVE ESPER --- */
    // 1. Se la Modale Esper è aperta, forziamo il ricalcolo immediato della lista
    const esperModal = document.getElementById('esper-modal');
    if (esperModal && esperModal.style.display !== 'none') {
        if (typeof updateEsperModalList === 'function') {
            updateEsperModalList();
        }
    }

    // 2. Refresh Tab Principale se attiva
    if (typeof refreshEsperUI === 'function') {
        refreshEsperUI();
    }
}






/* --- NUOVA FUNZIONE RESET (Unificata) --- */
function resetEsperPreparations() {
    showCustomModal(
        "Reset Talenti",
        "Vuoi dimenticare tutti i talenti/tecniche selezionati per sceglierli di nuovo?",
        null,
        () => {
            // Esegui Reset in base alla classe
            const cls = state.classKey ? state.classKey.toLowerCase() : "";

            if (cls === 'ingegnere') {
                state.esper.primes = [];
                state.esper.preparedSpells = [];
            } else {
                // Melder e Specialista usano knownSpells
                state.esper.knownSpells = [];
            }

            // Aggiorna UI
            if (typeof updateEsperModalList === 'function') updateEsperModalList();
            if (typeof renderEsperTab === 'function') renderEsperTab();
        }
    );
}

// Solarian Cycle
function cycleSolarianAttunement() {
    if (!state.esper) return;
    // 0 -> 1 -> 2 -> 0
    state.esper.attunement = ((state.esper.attunement || 0) + 1) % 3;
    renderEsperTab();
}
