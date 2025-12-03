
// character_logic.js - Handles the logic for the V3 Character Sheet

document.addEventListener('DOMContentLoaded', () => {
    // Ensure rulesData is available
    if (typeof rulesData === 'undefined') {
        console.error("rulesData not found! Make sure rules_data.js is loaded.");
        return;
    }

    console.log("Character Logic Initialized");

    // DOM Elements
    const speciesSelect = document.getElementById('char-species');
    const classSelect = document.getElementById('char-class');
    const powersContainer = document.getElementById('powers-container');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const navBtns = document.querySelectorAll('.cs-v3-nav-btn');

    // Attribute Inputs
    const attributes = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

    // --- INITIALIZATION ---
    populateDropdowns();
    setupEventListeners();

    // Load initial state if available (mock)
    updateModifiers();

    // --- FUNCTIONS ---

    function populateDropdowns() {
        // Populate Species
        if (rulesData.species) {
            rulesData.species.forEach(s => {
                const opt = document.createElement('option');
                opt.value = s.name;
                opt.textContent = s.name;
                speciesSelect.appendChild(opt);
            });
        }

        // Populate Classes
        if (rulesData.classes) {
            rulesData.classes.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.name; // Use name as value for simplicity
                opt.textContent = c.name;
                classSelect.appendChild(opt);
            });
        }
    }

    function setupEventListeners() {
        // Class Change -> Update Powers
        classSelect.addEventListener('change', () => {
            const selectedClass = classSelect.value;
            renderPowers(selectedClass);
        });

        // Attribute Changes -> Update Modifiers
        attributes.forEach(attr => {
            const input = document.getElementById(`attr-${attr}`);
            if (input) {
                input.addEventListener('input', () => {
                    updateModifier(attr, input.value);
                });
            }
        });

        // Power Filters
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add to clicked
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                filterPowers(filter);
            });
        });

        // Bottom Navigation
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // UI Updates
                navBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Hide all tabs
                document.querySelectorAll('.cs-v3-tab-content').forEach(c => c.classList.remove('active'));

                // Show target tab
                const targetId = btn.dataset.target;
                document.getElementById(targetId).classList.add('active');
            });
        });
    }

    function updateModifier(attr, score) {
        const mod = Math.floor((score - 10) / 2);
        const modElement = document.getElementById(`mod-${attr}`);
        if (modElement) {
            const sign = mod >= 0 ? '+' : '';
            modElement.textContent = `${sign}${mod}`;
        }
    }

    function updateModifiers() {
        attributes.forEach(attr => {
            const input = document.getElementById(`attr-${attr}`);
            if (input) updateModifier(attr, input.value);
        });
    }

    function renderPowers(className) {
        powersContainer.innerHTML = ''; // Clear existing

        if (!className) {
            powersContainer.innerHTML = '<div class="placeholder-text">Seleziona una classe per vedere i poteri.</div>';
            return;
        }

        // Find class data
        const classData = rulesData.classes.find(c => c.name === className);

        if (!classData || !classData.powers) {
            powersContainer.innerHTML = '<div class="placeholder-text">Nessun potere trovato per questa classe.</div>';
            return;
        }

        // Render each power
        classData.powers.forEach(power => {
            const card = createPowerCard(power);
            powersContainer.appendChild(card);
        });
    }

    function createPowerCard(power) {
        const div = document.createElement('div');
        div.className = 'power-card';

        // Determine Grade/Type for styling (Mock logic as data structure varies)
        // Assuming power.name or description might contain hints, or we just default
        // In a real scenario, we'd parse the "Grado" from the description or have a specific field.
        // For now, we'll try to guess or default to grade-1
        let gradeClass = 'grade-1';

        // Simple heuristic for demo: check if description mentions "Grado 0" etc.
        // The provided JSON has "Grado 0 (Talenti Prime)" in description for Melder.
        // But individual powers don't have a 'grade' field in the JSON snippet I saw.
        // I will assume they are flat for now or I need to parse headers.
        // Wait, the JSON structure for Melder has a big description block for "Discipline del Melder"
        // and then individual powers. The individual powers don't seem to have a 'grade' property explicitly
        // in the array, they are just objects.
        // However, the user said: "Cerca tutti i poteri di quella classe."
        // I will just render them all for now.

        div.innerHTML = `
            <div class="power-header">
                <span class="power-name">${power.name}</span>
                <span class="power-cost">Az</span>
            </div>
            <div class="power-body">
                <p>${formatDescription(power.description)}</p>
            </div>
        `;

        // Add data attributes for filtering if we can figure out the grade
        div.dataset.grade = "1"; // Default

        return div;
    }

    function formatDescription(desc) {
        if (!desc) return '';
        // Convert markdown-like syntax to HTML if needed
        // Simple bolding
        return desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    function filterPowers(filter) {
        const cards = document.querySelectorAll('.power-card');
        cards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                // Check data-grade (needs real data implementation)
                if (card.dataset.grade === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

});
