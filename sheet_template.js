/* --- SHEET TEMPLATE V4 (Modularized) --- */

const CS_HEADER = `
    <!-- FIXED HEADER -->
    <div class="cs-v3-header-fixed">
        <!-- TOP ROW: Portrait + Identity + Vitals -->
        <div style="display: flex; gap: 20px; align-items: flex-start;">

            <!-- PORTRAIT -->
            <div class="cs-v3-portrait">
                <img id="char_portrait_img" src="" style="display:none;">
                <span id="char_portrait_placeholder">+</span>
                <input type="file" id="portrait_upload" style="display:none;" accept="image/*">
            </div>

            <!-- INFO COLUMN -->
            <div style="flex: 1;">
                <!-- Name & Level -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <input type="text" class="cs-v3-name" id="char_name" value="NOME EROE" placeholder="Nome Personaggio">
                    <div style="display:flex; gap:5px; align-items:center;">
                        <button id="btn_cloud_save" class="cs-v3-btn-sm" title="Salva in Cloud" style="display:none; background-color:#3ecf8e;">☁️</button>
                        <button id="btn_login" class="cs-v3-btn-sm" title="Login / Registrati">👤</button>
                        <div class="cs-v3-level-box">
                            <span class="cs-v3-label-sm">LIV</span>
                            <span id="char_level_display" style="font-size: 1.2rem; font-weight: bold; color: var(--accent-color);">1</span>
                        </div>
                    </div>
                </div>

                <!-- Dropdowns Row -->
                <div class="cs-v3-sub">
                    <select id="char_race" class="cs-v3-select"><option value="">Razza</option></select>
                    <select id="char_archetype" class="cs-v3-select" disabled><option value="">Archetipo</option></select>
                    <select id="char_class" class="cs-v3-select"><option value="">Classe</option></select>
                    <select id="char_spec" class="cs-v3-select" disabled><option value="">Specializzazione</option></select>
                </div>

                <!-- Details Row -->
                <div class="cs-v3-sub">
                    <select id="char_gender" class="cs-v3-select" style="width: 70px;">
                        <option value="">Gen</option><option value="M">M</option><option value="F">F</option><option value="T">T</option><option value="TT">TT</option>
                    </select>
                    <select id="char_size" class="cs-v3-select" style="width: 90px;">
                        <option value="S">Piccola</option><option value="M" selected>Media</option><option value="L">Grande</option><option value="XL">Enorme</option>
                    </select>
                    <select id="char_align" class="cs-v3-select">
                        <option value="">Allineamento</option>
                        <option value="LB">Legale Buono</option><option value="NB">Neutrale Buono</option><option value="CB">Caotico Buono</option>
                        <option value="LN">Legale Neutrale</option><option value="N">Neutrale</option><option value="CN">Caotico Neutrale</option>
                        <option value="LM">Legale Malvagio</option><option value="NM">Neutrale Malvagio</option><option value="CM">Caotico Malvagio</option>
                    </select>
                    <input type="number" id="char_age" class="cs-v3-input" placeholder="Età" style="width: 60px;">
                </div>
            </div>

            <!-- VITALS COLUMN (XP & HP) -->
            <div style="width: 300px;">
                <!-- XP -->
                <div class="cs-v3-xp-container">
                    <div class="cs-v3-bar-label">
                        <span>ESPERIENZA</span>
                        <span id="xp_display">0 / 300</span>
                    </div>
                    <div class="cs-v3-bar-track">
                        <div class="cs-v3-bar-fill xp-fill" id="xp_bar" style="width: 0%;"></div>
                    </div>
                    <div style="text-align: right; margin-top: 2px;">
                        <button id="btn_add_xp" class="cs-v3-btn-sm">+ XP</button>
                    </div>
                </div>

                <!-- HP -->
                <div class="cs-v3-xp-container" style="margin-top: 10px;">
                    <div class="cs-v3-bar-label">
                        <span>PUNTI FERITA</span>
                        <span id="hp_display">0 / 0</span>
                    </div>
                    <div class="cs-v3-bar-track">
                        <div class="cs-v3-bar-fill hp-fill" id="hp_bar" style="width: 0%;"></div>
                        <div class="cs-v3-bar-fill temp-hp-fill" id="hp_temp_bar" style="width: 0%;"></div>
                    </div>
                    <div class="cs-v3-vitals-inputs">
                        <input type="number" id="hp_current" class="cs-v3-input-sm" placeholder="Curr">
                        <span>/</span>
                        <input type="number" id="hp_max" class="cs-v3-input-sm" placeholder="Max" autocomplete="off">
                        <input type="number" id="hp_temp" class="cs-v3-input-sm" placeholder="Temp" style="border-color: #d900ff; color: #d900ff;">
                    </div>
                </div>
            </div>
        </div>

        <!-- COMPACT ATTRIBUTES HEADER -->
        <div class="cs-v3-attributes-header">
            <div class="attr-box-sm"><span class="lbl">FOR</span><input type="number" id="attr_str" value="10" autocomplete="off" oninput="updateBaseStat('str', this.value)"><span class="mod" id="mod_str">+0</span></div>
            <div class="attr-box-sm"><span class="lbl">DES</span><input type="number" id="attr_dex" value="10" autocomplete="off" oninput="updateBaseStat('dex', this.value)"><span class="mod" id="mod_dex">+0</span></div>
            <div class="attr-box-sm"><span class="lbl">COS</span><input type="number" id="attr_con" value="10" autocomplete="off" oninput="updateBaseStat('con', this.value)"><span class="mod" id="mod_con">+0</span></div>
            <div class="attr-box-sm"><span class="lbl">INT</span><input type="number" id="attr_int" value="10" autocomplete="off" oninput="updateBaseStat('int', this.value)"><span class="mod" id="mod_int">+0</span></div>
            <div class="attr-box-sm"><span class="lbl">SAG</span><input type="number" id="attr_wis" value="10" autocomplete="off" oninput="updateBaseStat('wis', this.value)"><span class="mod" id="mod_wis">+0</span></div>
            <div class="attr-box-sm"><span class="lbl">CAR</span><input type="number" id="attr_cha" value="10" autocomplete="off" oninput="updateBaseStat('cha', this.value)"><span class="mod" id="mod_cha">+0</span></div>

            <div style="width: 1px; background: rgba(255,255,255,0.1); margin: 0 10px;"></div>

            <div class="attr-box-sm" style="width: 60px;"><span class="lbl">CA</span><span class="value-lg" id="stat_ac">10</span></div>
            <div class="attr-box-sm" style="width: 60px;"><span class="lbl">INIT</span><span class="value-lg" id="stat_init">+0</span></div>
            <div class="attr-box-sm" style="width: 60px;"><span class="lbl">COMP</span><span class="value-lg" id="stat_prof">+2</span></div>
            <div class="attr-box-sm" style="width: 60px;"><span class="lbl">VEL</span><span class="value-lg" id="stat_speed">9m</span></div>
        </div>
    </div>
`;

const CS_BODY = `
    <!-- SCROLLABLE BODY -->
    <div class="cs-v3-body-scroll">

        <!-- TABS NAVIGATION -->
        <div class="cs-v3-tabs">
            <button class="cs-v3-tab active" data-tab="features">PRIVILEGI</button>
            <button class="cs-v3-tab" data-tab="skills">ABILITÀ</button>
            <button class="cs-v3-tab" data-tab="feats">TALENTI</button>
            <button class="cs-v3-tab" data-tab="esper">ESPER</button>
            <button class="cs-v3-tab" data-tab="weapons">ARMI</button>
            <button class="cs-v3-tab" data-tab="equipment">EQUIP</button>
            <button class="cs-v3-tab" data-tab="vehicles">VEICOLI</button>
            <button class="cs-v3-tab" data-tab="notes">NOTE</button>
        </div>

        <!-- TABS CONTENT -->
        <div id="tab-features" class="tab-pane active"><div id="features-list"></div></div>
        <div id="tab-skills" class="tab-pane"></div>
        <div id="tab-feats" class="tab-pane"></div>
        <div id="tab-esper" class="tab-pane"></div>
        <div id="tab-weapons" class="tab-pane"></div>
        <div id="tab-equipment" class="tab-pane"></div>
        <div id="tab-vehicles" class="tab-pane"></div>
        <div id="tab-notes" class="tab-pane">
            <textarea style="width: 100%; height: 300px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; padding: 10px; font-family: var(--font-body);" placeholder="Note del giocatore..."></textarea>
        </div>
    </div>
`;

const CS_MODALS = `
    <!-- FEAT SELECTION MODAL -->
    <div id="feat-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:1000; align-items:center; justify-content:center;">
        <div style="background:var(--bg-color); width:90%; max-width:600px; padding:20px; border:1px solid var(--accent-color); border-radius:8px; max-height:80vh; display:flex; flex-direction:column; box-shadow: 0 0 20px rgba(0,0,0,0.8);">
            <h3 style="margin-top:0; border-bottom:1px solid var(--border-color); padding-bottom:10px;">Seleziona Talento</h3>
            <div id="feat-selection-list" style="overflow-y:auto; flex-grow:1; margin-bottom:10px; padding-right:5px;"></div>
            <div style="display:flex; justify-content:flex-end;">
                <button class="cs-v3-btn-sm" onclick="closeFeatModal()">Chiudi</button>
            </div>
        </div>
    </div>

    <!-- ESPER SELECTION MODAL -->
    <div id="esper-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:1000; align-items:center; justify-content:center;">
        <div style="background:var(--bg-color); width:90%; max-width:800px; padding:20px; border:1px solid var(--accent-color); border-radius:8px; max-height:85vh; display:flex; flex-direction:column; box-shadow: 0 0 20px rgba(0,0,0,0.8);">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:10px; margin-bottom:10px;">
                <h3 style="margin:0;">Seleziona Potere Esper</h3>
            </div>
            <div style="display:flex; gap:10px; margin-bottom:10px;">
                <select id="esper-modal-filter" onchange="updateEsperModalList()" style="flex:1; padding:5px; background:var(--input-bg); color:var(--text-color); border:1px solid var(--border-color);">
                    <option value="all">Tutti i Gradi</option>
                    <option value="0">Grado 0 (Prime)</option><option value="1">Grado 1</option><option value="2">Grado 2</option>
                    <option value="3">Grado 3</option><option value="4">Grado 4</option><option value="5">Grado 5</option>
                    <option value="6">Grado 6</option><option value="7">Grado 7</option><option value="8">Grado 8</option><option value="9">Grado 9</option>
                </select>
                <input type="text" id="esper-search-input" placeholder="🔍 Cerca tecnica..." onkeyup="updateEsperModalList()" 
                       style="flex:2; background:var(--input-bg); border:1px solid var(--border-color); color:var(--text-color); padding:5px; border-radius:4px;">
            </div>
            <div id="esper-selection-list" style="overflow-y:auto; flex-grow:1; margin-bottom:10px; padding-right:5px;"></div>
            <div style="display:flex; justify-content:space-between; border-top:1px solid var(--border-color); padding-top:10px;">
                <button class="cs-v3-btn-sm" style="background:#ff4444; border-color:#ff0000;" onclick="resetEsperPreparations()">⚠ Reset Scelte</button>
                <button class="cs-v3-btn-sm" onclick="closeEsperModal()">Chiudi</button>
            </div>
        </div>
    </div>
`;

window.CHARACTER_SHEET_HTML = `
    <div class="cs-v3-container">
        ${CS_HEADER}
        ${CS_BODY}
    </div>
    ${CS_MODALS}
`;

/* --- LOGICA MODALE ESPER (Spostata nel Template) --- */

function updateEsperModalList() {
    const container = document.getElementById('esper-selection-list');
    const filterGrade = document.getElementById('esper-modal-filter').value;
    const searchTerm = document.getElementById('esper-search-input') ? document.getElementById('esper-search-input').value.toLowerCase() : "";

    if (!container || !state.classKey) return;
    ensureEsperState();

    const cls = state.classKey.toLowerCase();
    const spec = state.specializationKey ? state.specializationKey.toLowerCase() : "";

    const isMelder = (cls === 'melder');
    const isMistico = (cls === 'mistico');
    const isArtificio = (cls === 'specialista' && spec === 'artificio');
    const isWarrior = (cls === 'guerriero');
    const isSolarian = (cls === 'solariano');
    const isParadosso = (cls === 'paradosso');

    // --- 1. HEADER STATISTICHE (Diversificato) ---
    let statsHtml = "";

    if (isArtificio) {
        const primeLimit = ARTIFICIO_PRIME_KNOWN_TABLE[state.level] || 0;
        const primeCount = (state.esper.knownSpells || []).filter(n => {
            const p = RULES_DATA.ESPER_POWERS.find(x => x.name === n);
            return p && p.grade === 0;
        }).length;

        const techLimit = ARTIFICIO_KNOWN_TABLE[state.level] || 0;
        const techCount = (state.esper.knownSpells || []).filter(n => {
            const p = RULES_DATA.ESPER_POWERS.find(x => x.name === n);
            return p && p.grade > 0;
        }).length;

        statsHtml = `
            <div class="stat-box" style="border-right:1px solid rgba(255,255,255,0.1);">
                <span class="stat-label">Gadget Prime</span>
                <span class="stat-value ${primeCount >= primeLimit ? 'limit-reached' : ''}">${primeCount} / ${primeLimit}</span>
            </div>
            <div class="stat-box">
                <span class="stat-label">Talenti Tech (G1-4)</span>
                <span class="stat-value ${techCount >= techLimit ? 'limit-reached' : ''}">${techCount} / ${techLimit}</span>
            </div>
        `;
    }
    else if (isMelder) {
        const primeLimit = MELDER_PRIME_KNOWN_TABLE[state.level] || 3;
        const primeCount = (state.esper.knownSpells || []).filter(n => {
            const p = RULES_DATA.ESPER_POWERS.find(x => x.name === n);
            return p && p.grade === 0;
        }).length;
        const gradedLimit = getMelderGradedLimit();
        const gradedCount = (state.esper.knownSpells || []).filter(n => {
            const p = RULES_DATA.ESPER_POWERS.find(x => x.name === n);
            return p && p.grade > 0;
        }).length;

        statsHtml = `
            <div class="stat-box" style="border-right:1px solid rgba(255,255,255,0.1);">
                <span class="stat-label">Prime Conosciute</span>
                <span class="stat-value ${primeCount >= primeLimit ? 'limit-reached' : ''}">${primeCount} / ${primeLimit}</span>
            </div>
            <div class="stat-box">
                <span class="stat-label">Talenti Appresi</span>
                <span class="stat-value ${gradedCount >= gradedLimit ? 'limit-reached' : ''}">${gradedCount} / ${gradedLimit}</span>
            </div>
        `;
    }
    else if (isMistico) {
        const primeLimit = MISTICO_PRIME_KNOWN_TABLE[state.level] || 3;
        const primeCount = (state.esper.knownSpells || []).filter(n => {
            const p = RULES_DATA.ESPER_POWERS.find(x => x.name === n);
            return p && p.grade === 0;
        }).length;
        const gradedLimit = getMisticoGradedLimit();
        const gradedCount = (state.esper.knownSpells || []).filter(n => {
            const p = RULES_DATA.ESPER_POWERS.find(x => x.name === n);
            return p && p.grade > 0;
        }).length;

        statsHtml = `
            <div class="stat-box" style="border-right:1px solid rgba(255,255,255,0.1);">
                <span class="stat-label">Prime Conosciute</span>
                <span class="stat-value ${primeCount >= primeLimit ? 'limit-reached' : ''}">${primeCount} / ${primeLimit}</span>
            </div>
            <div class="stat-box">
                <span class="stat-label">Talenti Appresi</span>
                <span class="stat-value ${gradedCount >= gradedLimit ? 'limit-reached' : ''}">${gradedCount} / ${gradedLimit}</span>
            </div>
        `;
    }
    else if (isParadosso) {
        const primeLimit = (typeof PARADOSSO_PRIME_KNOWN_TABLE !== 'undefined' ? PARADOSSO_PRIME_KNOWN_TABLE[state.level] : 3) || 3;
        const primeCount = (state.esper.knownSpells || []).filter(n => {
            const p = RULES_DATA.ESPER_POWERS.find(x => x.name === n);
            return p && p.grade === 0;
        }).length;
        const gradedLimit = (typeof getParadossoGradedLimit === 'function' ? getParadossoGradedLimit() : 4 + (state.level * 2));
        const gradedCount = (state.esper.knownSpells || []).filter(n => {
            const p = RULES_DATA.ESPER_POWERS.find(x => x.name === n);
            return p && p.grade > 0;
        }).length;

        statsHtml = `
            <div class="stat-box" style="border-right:1px solid rgba(255,255,255,0.1);">
                <span class="stat-label">Prime Conosciute</span>
                <span class="stat-value ${primeCount >= primeLimit ? 'limit-reached' : ''}">${primeCount} / ${primeLimit}</span>
            </div>
            <div class="stat-box">
                <span class="stat-label">Talenti Appresi</span>
                <span class="stat-value ${gradedCount >= gradedLimit ? 'limit-reached' : ''}">${gradedCount} / ${gradedLimit}</span>
            </div>
        `;
    }
    else if (isSolarian) {
        const limit = SOLARIAN_KNOWN_TABLE[state.level] || 0;
        const count = (state.esper.knownSpells || []).length;

        statsHtml = `
            <div class="stat-box">
                <span class="stat-label">Rivelazioni</span>
                <span class="stat-value ${count >= limit ? 'limit-reached' : ''}">${count} / ${limit}</span>
            </div>
        `;
    }
    else if (isWarrior) {
        let styleLimit = 1;
        if (spec === 'paragon' && state.level >= 10) styleLimit = 2;

        const currentStyles = (state.esper.knownSpells || []).filter(n => {
            const p = RULES_DATA.ESPER_POWERS.find(x => x.name === n);
            return p && p.grade === 0;
        }).length;

        statsHtml = `
            <div class="stat-box" style="border-right:1px solid rgba(255,255,255,0.1);">
                <span class="stat-label">Stili Combattimento</span>
                <span class="stat-value ${currentStyles >= styleLimit ? 'limit-reached' : ''}">${currentStyles} / ${styleLimit}</span>
            </div>
            <div class="stat-box">
                <span class="stat-label">Abilità / Prodezze</span>
                <span class="stat-value">Gestite da Classe</span>
            </div>
        `;
    }
    else {
        const wisMod = Math.floor((state.baseStats.wis - 10) / 2);
        const primeLimit = (typeof getPrimeLimit === 'function') ? getPrimeLimit() : 0;
        const primeCount = (state.esper.primes || []).length;
        const prepLimit = (typeof getPreparedLimit === 'function') ? getPreparedLimit() : 0;
        const prepCount = (state.esper.preparedSpells || []).length;

        statsHtml = `
            <div class="stat-box" style="border-right:1px solid rgba(255,255,255,0.1);">
                <span class="stat-label">Prime (Grado 0)</span>
                <span class="stat-value ${primeCount >= primeLimit ? 'limit-reached' : ''}">${primeCount} / ${primeLimit}</span>
            </div>
            <div class="stat-box">
                <span class="stat-label">Preparate (G1+)</span>
                <span class="stat-value ${prepCount >= prepLimit ? 'limit-reached' : ''}">${prepCount} / ${prepLimit}</span>
                <span class="stat-formula">(Liv. ${state.level} + Sag ${wisMod})</span>
            </div>
        `;
    }

    let html = `
        <div class="esper-stats-container">
            ${statsHtml}
        </div>
        <div class="esper-grid">
    `;

    // --- 2. LISTA CARD (Filtro Rigido) ---
    // Determina grado massimo per visual lock
    let maxCastable = 0;
    if (isArtificio) maxCastable = ARTIFICIO_MAX_GRADE_TABLE[state.level] || 0;
    else if (isMelder) maxCastable = getMelderMaxGrade();
    else if (isMistico) maxCastable = getMisticoMaxGrade();
    else if (isParadosso) maxCastable = (typeof getParadossoMaxGrade === 'function' ? getParadossoMaxGrade() : 1);
    else if (isSolarian) maxCastable = SOLARIAN_MAX_GRADE_TABLE[state.level] || 1;
    else if (isWarrior) maxCastable = 0; // Warrior sees ONLY Grade 0
    else maxCastable = (typeof getMaxCastableGrade === 'function') ? getMaxCastableGrade() : 9;

    for (let g = 0; g <= 9; g++) {
        if (filterGrade !== 'all' && parseInt(filterGrade) !== g) continue;

        // GUERRIERO FILTER: Solo Grade 0
        if (isWarrior && g !== 0) continue;

        const powers = RULES_DATA.ESPER_POWERS.filter(p => {
            if (p.grade !== g) return false;
            const pClass = p.class.toLowerCase();

            if (isArtificio) return pClass === 'specialista';
            else if (isMelder) return pClass === 'melder';
            else if (isMistico) return pClass === 'mistico';
            else if (isParadosso) return pClass === 'paradosso';
            else if (isSolarian) return pClass === 'solariano';
            else if (isWarrior) return pClass === 'guerriero';
            else if (state.classKey.toLowerCase() === 'ingegnere') return pClass === 'ingegnere';
            return pClass === 'ingegnere'; // Fallback
        });

        const filtered = powers.filter(p => p.name.toLowerCase().includes(searchTerm));
        if (filtered.length === 0 && searchTerm !== "") continue;
        if (powers.length === 0) continue;

        const isGradeLocked = (g > 0 && g > maxCastable);

        let gradeHeader = "Grado " + g;
        if (g === 0) {
            if (isMelder || isMistico || isParadosso) gradeHeader = "Talenti Prime";
            else if (isArtificio) gradeHeader = "Gadget Prime";
            else if (isWarrior) gradeHeader = "Stili di Combattimento";
            else if (isSolarian) gradeHeader = "Rivelazioni";
            else gradeHeader = "Tecniche Prime";
        } else if (g === 1 && isWarrior) {
            if (spec === 'commando') gradeHeader = "Prodezze (Commando)";
            else gradeHeader = "Abilità Speciali (Paragon)";
        }

        html += `<div class="esper-grade-header">
            ${gradeHeader}
            ${isGradeLocked ? '<span style="font-size:0.7em; color:#ff4444; margin-left:10px;">🔒 Livello Insufficiente</span>' : ''}
        </div>`;

        filtered.forEach(p => {
            // CONTROLLO ESCLUSIVITÀ SOTTOCLASSE
            let isSpecLocked = false;
            let specLockLabel = "";

            if (p.exclusiveSpec) {
                // Se il potere ha un'esclusiva e la mia spec non corrisponde
                const mySpec = state.specializationKey ? state.specializationKey.toLowerCase() : "";
                if (mySpec !== p.exclusiveSpec) {
                    isSpecLocked = true;
                    specLockLabel = `Richiede ${p.exclusiveSpec.charAt(0).toUpperCase() + p.exclusiveSpec.slice(1)}`;
                }
            }

            const isSpec = (typeof getUnlockedSpecialtyPowers === 'function') ? getUnlockedSpecialtyPowers().includes(p.name) : false;
            let isSelected = false;

            if (isMelder || isArtificio || isWarrior || isMistico || isSolarian || isParadosso) {
                isSelected = (state.esper.knownSpells || []).includes(p.name);
            } else {
                if (g === 0) isSelected = (state.esper.primes || []).includes(p.name);
                else isSelected = (state.esper.preparedSpells || []).includes(p.name);
            }

            let cssClass = "esper-card";
            if (isSpec) cssClass += " specialty";
            else if (isSelected) cssClass += " selected";
            else if (isGradeLocked) cssClass += " locked";

            let label = "";
            let clickAction = `toggleEsperPreparation('${p.name.replace(/'/g, "\\'")}')`;

            if (isGradeLocked) {
                label = "🔒 Bloccato";
                clickAction = "";
            } else if (isSpecLocked) { // NUOVO BLOCCO
                cssClass += " locked";
                label = `<span style='color:#ff4444'>🔒 ${specLockLabel}</span>`;
                clickAction = ""; // Disabilita click
            } else if (isSpec) {
                label = "<span style='color:#ffd700'>★ Special</span>";
                clickAction = "";
            } else if (isSelected) {
                label = "<span style='color:var(--accent-color)'>✔ Appreso</span>";
            }
            if (isWarrior && p.grade === 1 && p.usesResource === "paragon") {
                label = "<span style='color:#e74c3c'>Carica</span> " + label;
            } else if (isWarrior && p.grade === 1 && spec === 'commando') {
                label = "<span style='color:#e74c3c'>Dado</span> " + label;
            }

            const cleanDesc = p.description.replace(/"/g, '&quot;');
            const shortDesc = cleanDesc.length > 60 ? cleanDesc.substring(0, 60) + "..." : cleanDesc;

            html += `
            <div class="${cssClass}" onclick="${clickAction}">
                <div class="ec-header">
                    <span class="ec-name">${p.name}</span>
                    <span class="ec-time">${p.time}</span>
                </div>
                <div class="ec-meta">
                    <span>${p.range}</span> | <span>${p.duration}</span>
                </div>
                <div class="ec-desc" title="${cleanDesc}">${shortDesc}</div>
                <div class="ec-footer">${label}</div>
            </div>`;
        });
    }
    html += `</div>`;
    container.innerHTML = html;
}
