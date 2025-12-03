window.RULES_DATA = {
    classes: {
        warrior: {
            name: "Guerriero",
            powers: [
                { id: "w1", name: "Colpo Potente", desc: "Infliggi +2 danni con armi da mischia.", type: "passive" },
                { id: "w2", name: "Urlo di Guerra", desc: "I nemici entro 9m hanno svantaggio ai tiri salvezza.", type: "active" }
            ]
        },
        mage: {
            name: "Mago",
            powers: [
                { id: "m1", name: "Dardo Incantato", desc: "Lancia 3 dardi che colpiscono automaticamente (1d4+1 danni).", type: "active" },
                { id: "m2", name: "Scudo Arcano", desc: "+5 CA fino al prossimo turno.", type: "reaction" }
            ]
        },
        rogue: {
            name: "Ladro",
            powers: [
                { id: "r1", name: "Attacco Furtivo", desc: "Danni extra se hai vantaggio.", type: "passive" },
                { id: "r2", name: "Schivata Prodigiosa", desc: "Dimezza i danni di un attacco subito.", type: "reaction" }
            ]
        },
        cleric: {
            name: "Chierico",
            powers: [
                { id: "c1", name: "Cura Ferite", desc: "Guarisci 1d8 + Mod Saggezza.", type: "active" },
                { id: "c2", name: "Benedizione", desc: "+1d4 ai tiri per colpire degli alleati.", type: "active" }
            ]
        }
    }
};
