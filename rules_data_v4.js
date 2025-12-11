const RULES_DATA = {
    SKILL_LIST: [
        { name: "Acrobazia", attr: "dex" },
        { name: "Astrofisica", attr: "int" },
        { name: "Atletica", attr: "str" },
        { name: "Computer", attr: "int" },
        { name: "Cultura", attr: "wis" },
        { name: "Diplomazia", attr: "cha" },
        { name: "Furtività", attr: "dex" },
        { name: "Inganno", attr: "cha" },
        { name: "Intuizione", attr: "wis" },
        { name: "Intimidire", attr: "cha" },
        { name: "Investigazione", attr: "int" },
        { name: "Meccanica", attr: "wis" },
        { name: "Medicina", attr: "wis" },
        { name: "Percezione", attr: "wis" },
        { name: "Performance", attr: "cha" },
        { name: "Persuasione", attr: "cha" },
        { name: "Rapidità di Mano", attr: "dex" },
        { name: "Religione", attr: "int" },
        { name: "Sopravvivenza", attr: "wis" },
        { name: "Storia", attr: "int" },
        { name: "Xenobiologia", attr: "int" }
    ],
    levels: [
        { level: 1, xp_required: 0 },
        { level: 2, xp_required: 300 },
        { level: 3, xp_required: 900 },
        { level: 4, xp_required: 2700 },
        { level: 5, xp_required: 6500 },
        { level: 6, xp_required: 14000 },
        { level: 7, xp_required: 23000 },
        { level: 8, xp_required: 34000 },
        { level: 9, xp_required: 48000 },
        { level: 10, xp_required: 64000 },
        { level: 11, xp_required: 85000 },
        { level: 12, xp_required: 100000 },
        { level: 13, xp_required: 120000 },
        { level: 14, xp_required: 140000 },
        { level: 15, xp_required: 165000 },
        { level: 16, xp_required: 195000 },
        { level: 17, xp_required: 225000 },
        { level: 18, xp_required: 265000 },
        { level: 19, xp_required: 305000 },
        { level: 20, xp_required: 355000 }
    ],
    races: {
        "ashenforged": {
            name: "Ashenforged",
            modifiers: { con: 2 },
            size: "M",
            speed: 9,
            darkvision: 18,
            languages: ["Comune", "Dendusi", "Un altro a scelta"],
            features: [
                {
                    name: "Resilienza",
                    description: "Hai vantaggio sui tiri salvezza contro veleno e malattie e sei resistente ai danni da veleno."
                },
                {
                    name: "Addestramento Artigiano",
                    description: "Ottieni competenza in uno strumento a tua scelta dalla seguente lista: strumenti da fabbro, strumenti da meccanico, utensili da cucina, strumenti da sarto."
                }
            ],
            archetypes: {
                "cerebrale": {
                    name: "Cerebrale",
                    modifiers: { wis: 1 },
                    features: [
                        {
                            name: "Robustezza",
                            description: "Il tuo massimo dei punti ferita aumenta di 1 e aumenta anche di 1 ogni volta che guadagni un livello."
                        }
                    ]
                },
                "somatico": {
                    name: "Somatico",
                    modifiers: { str: 1 },
                    features: [
                        {
                            name: "Armatura Naturale",
                            description: "Quando non indossi armatura, la tua CA è 12 + il tuo modificatore di Destrezza."
                        }
                    ]
                }
            }
        },
        "eldori": {
            name: "Eldori",
            modifiers: { cha: 2 },
            size: "M",
            speed: 9,
            darkvision: 18,
            languages: ["Comune", "Nesieve", "Un linguaggio aggiuntivo a scelta"],
            features: [
                {
                    name: "Iniziato Esper",
                    description: "Ottieni l'uso del talento aegis. Al 3° livello, ottieni l'uso del talento innervate. Al 5° livello, ottieni l'uso del talento clean zone. Questi poteri possono essere usati ciascuno solo una volta e riguadagni tutti gli usi dopo aver terminato un riposo lungo."
                }
            ],
            archetypes: {
                "lunare": {
                    name: "Eldori Lunare",
                    modifiers: { int: 1 },
                    features: [
                        {
                            name: "Scurovisione Superiore",
                            description: "La tua scurovisione aumenta a 27m."
                        },
                        {
                            name: "Attingere dalla Ruota",
                            description: "Una volta per riposo lungo, puoi usare la tua azione bonus per invocare il potere della Grande Ruota, garantendoti vantaggio su un singolo tiro per colpire, tiro di abilità o tiro salvezza. Scegli il tipo di bonus all'attivazione di questa caratteristica. La debole aura di una ruota runica circonda la tua forma mentre la caratteristica è attiva. L'aura è traslucida e non emette luce. Gli effetti di questa caratteristica durano finché il bonus non viene utilizzato o fino alla fine del tuo turno successivo."
                        }
                    ]
                },
                "solare": {
                    name: "Eldori Solare",
                    modifiers: { wis: 2 },
                    features: [
                        {
                            name: "Resistenza Innata",
                            description: "Sei resistente ai danni necrotici e radianti."
                        },
                        {
                            name: "Addestramento nelle Armi",
                            description: "Sei addestrato nell'uso del bastone energetico e della lama lunga."
                        }
                    ]
                }
            }
        },
        "umani": {
            name: "Umani",
            modifiers: {}, // Base modifiers none
            size: "M",
            speed: 9,
            darkvision: 0,
            languages: ["Comune", "Terran"],
            features: [],
            archetypes: {
                "nato_terra": {
                    name: "Nato sulla Terra",
                    modifiers: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 }, // Tutti +1
                    features: [
                        {
                            name: "Linguaggio",
                            description: "Puoi parlare, leggere e scrivere un linguaggio aggiuntivo a tua scelta."
                        }
                    ]
                },
                "galattico": {
                    name: "Galattico",
                    modifiers: {}, // "Due a scelta +1" handled via instruction in features or manual adjustment
                    features: [
                        {
                            name: "Aumento Caratteristica",
                            description: "Aumenta due punteggi di caratteristica a tua scelta di 1."
                        },
                        {
                            name: "Abilità",
                            description: "Ottieni competenza in un'abilità a tua scelta."
                        },
                        {
                            name: "Talento",
                            description: "Ottieni un talento a tua scelta."
                        }
                    ]
                },
                "utopico": {
                    name: "Utopico",
                    modifiers: { cha: 2 }, // "e un altro a scelta +1"
                    features: [
                        {
                            name: "Aumento Caratteristica",
                            description: "Aumenta un punteggio di caratteristica a tua scelta (diverso da Carisma) di 1."
                        },
                        {
                            name: "Abilità",
                            description: "Ottieni competenza in due abilità a tua scelta."
                        },
                        {
                            name: "Volitivo",
                            description: "Hai vantaggio sui tiri salvezza contro l'essere affascinato o spaventato."
                        },
                        {
                            name: "Linguaggio",
                            description: "Puoi parlare, leggere e scrivere un linguaggio aggiuntivo a tua scelta."
                        }
                    ]
                },
                "bruciato": {
                    name: "Bruciato",
                    modifiers: { con: 2, str: 1 },
                    features: [
                        {
                            name: "Muscoloso",
                            description: "Ottieni competenza in Atletica e un'altra abilità a tua scelta."
                        },
                        {
                            name: "Addestramento nelle Armi",
                            description: "Hai competenza a tua scelta con la lama lunga o la pistola automatica."
                        },
                        {
                            name: "Resiliente",
                            description: "Quando viaggi in condizioni di caldo o freddo estremo, sei in grado di resistere un'ora aggiuntiva per ogni bonus di costituzione prima di richiedere un tiro salvezza per l'esaurimento."
                        }
                    ]
                }
            }
        },
        "kesh": {
            name: "Kesh",
            modifiers: { dex: 2 },
            size: "M",
            speed: 9,
            darkvision: 18,
            languages: ["Comune", "Keshian", "Un altro a scelta"],
            features: [
                {
                    name: "Alterazione Minore",
                    description: "Ottieni l'uso del talento alter appearance. Puoi usare questo talento una volta, dopo di che devi completare un riposo lungo prima di poterlo usare di nuovo. Anche quando usi questa caratteristica, non sei in grado di cambiare il colore naturale nero degli occhi che è nativo di tutti i kesh. Al 4° livello, ottieni un uso aggiuntivo di questa caratteristica e puoi estendere la durata per un'ora aggiuntiva. Questo aumenta di un uso e di un'ora aggiuntiva di nuovo al 9° livello e al 14° livello. Riguadagni tutti gli usi di questa caratteristica quando completi un riposo lungo."
                },
                {
                    name: "Fusione della Memoria",
                    description: "Ottieni l'uso del potere shared vision. Puoi usarlo una volta dopo di che devi completare un riposo lungo prima che possa essere usato di nuovo. Carisma è la tua abilità di canalizzazione per questo potere quando usi questa caratteristica."
                }
            ],
            archetypes: {
                "nobile": {
                    name: "Nobile Kesh",
                    modifiers: { cha: 1 },
                    features: [
                        {
                            name: "Addestramento alla Sopravvivenza Kesh",
                            description: "Hai competenza con la lama lunga e il bastone energetico."
                        },
                        {
                            name: "Linguaggio Aggiuntivo",
                            description: "Puoi parlare, leggere e scrivere un linguaggio extra a tua scelta."
                        }
                    ]
                },
                "stelle": {
                    name: "Kesh delle Stelle",
                    modifiers: { int: 1 },
                    features: [
                        {
                            name: "Scienza Spaziale",
                            description: "Puoi aggiungere il tuo bonus di competenza a qualsiasi prova di Intelligenza (Astrofisica), o raddoppiare il tuo bonus di competenza se sei già competente."
                        },
                        {
                            name: "Addestramento Membro dell'Equipaggio",
                            description: "Hai competenza con uno strumento artigiano a tua scelta."
                        }
                    ]
                }
            }
        },
        "promethean": {
            name: "Promethean",
            modifiers: { dex: 2 },
            size: "M",
            speed: 9,
            darkvision: 18,
            languages: ["Comune", "Un altro a scelta"],
            features: [],
            archetypes: {
                "aberrante": {
                    name: "Aberrante",
                    modifiers: {},
                    features: [
                        {
                            name: "Nessun aumento o privilegio",
                            description: "Questo archetipo non fornisce benefici aggiuntivi oltre a quelli base della razza (verificare regole specifiche)."
                        }
                    ]
                },
                "mezzaluna": {
                    name: "Mezzaluna",
                    modifiers: { int: 1 },
                    features: [
                        {
                            name: "Pensiero Logico",
                            description: "Hai vantaggio sui tiri salvezza contro effetti che alterano la mente e allucinatori causati da tossine o poteri esper."
                        },
                        {
                            name: "Senso Acuto",
                            description: "Ottieni competenza nell'abilità Percezione."
                        }
                    ]
                },
                "sangue_fuoco": {
                    name: "Sangue di Fuoco",
                    modifiers: { str: 1 },
                    features: [
                        {
                            name: "Resilienza",
                            description: "Hai vantaggio sui tiri salvezza contro veleno e malattie, e hai resistenza ai danni da veleno."
                        },
                        {
                            name: "Massimo Sforzo",
                            description: "Una volta per riposo lungo, puoi raddoppiare il tuo bonus di competenza a qualsiasi prova di abilità Atletica o Acrobazia. Ottieni un uso aggiuntivo di questa abilità al 5° livello, e di nuovo al 9° e 14° livello."
                        }
                    ]
                }
            }
        },
        "androidi": {
            name: "Androidi",
            modifiers: { int: 2 },
            size: "M",
            speed: 9,
            darkvision: 0,
            languages: ["Comune", "ALOMU"],
            features: [
                {
                    name: "Costrutto Vivente",
                    description: "Anche se sei stato costruito, sei una creatura vivente. Sei immune alle malattie. Non hai bisogno di mangiare o respirare, ma puoi ingerire cibi o bevande se lo desideri. Invece di dormire, entri in uno stato inattivo per 4 ore al giorno durante le quali rimani cosciente dei dintorni."
                },
                {
                    name: "Resilienza Sintetica",
                    description: "Hai vantaggio sui tiri salvezza contro il veleno e hai resistenza ai danni da veleno."
                },
                {
                    name: "Analisi Integrata",
                    description: "Puoi interfacciarti rapidamente con la tecnologia e analizzare i dati. Ottieni competenza nell'abilità Computers (Intelligenza) o Investigazione (Intelligenza)."
                }
            ],
            archetypes: {
                "logica": {
                    name: "Unità Logica",
                    modifiers: { dex: 1 },
                    features: [
                        {
                            name: "Database Vasto",
                            description: "Hai accesso a banche dati storiche e culturali pre-caricate. Ottieni competenza in due: Storia, Religione."
                        },
                        {
                            name: "Interfaccia Diretta",
                            description: "Puoi comunicare con macchine e computer complessi entro 9 metri da te senza bisogno di un terminale fisico, utilizzando una connessione wireless criptata. Questo ti permette di effettuare prove di Computers a distanza e silenziosamente."
                        }
                    ]
                },
                "corazzata": {
                    name: "Unità Corazzata",
                    modifiers: { str: 1 },
                    features: [
                        {
                            name: "Placcatura Integrata",
                            description: "Il tuo corpo ha strati protettivi incorporati. Ottieni un bonus di +1 alla Classe Armatura."
                        },
                        {
                            name: "Struttura Rinforzata",
                            description: "Quando subisci un colpo critico, puoi usare la tua reazione per trasformarlo in un colpo normale. Puoi usare questa capacità una volta, e ne riguadagni l'uso dopo aver terminato un riposo lungo."
                        }
                    ]
                }
            }
        },
        "talandri": {
            name: "Talandri",
            modifiers: { wis: 2 },
            size: "M",
            speed: 9,
            darkvision: 0,
            languages: ["Comune", "Kasath"],
            features: [
                {
                    name: "Quattro Braccia",
                    description: "Possiedi quattro braccia. Le tue braccia secondarie sono capaci quanto quelle primarie, ma la coordinazione mentale richiesta per usarle tutte simultaneamente in combattimento è immensa. Puoi interagire con un oggetto aggiuntivo o caratteristica dell'ambiente gratuitamente durante il tuo turno. Puoi impugnare armi o scudi nelle braccia secondarie, ma non puoi effettuare più attacchi di quanto consentito dalla tua azione di Attacco, né puoi beneficiare di più di uno scudo alla volta. Tuttavia, la versatilità ti permette di tenere oggetti utili (come torce, dispositivi o pozioni) pronti all'uso mentre le mani primarie sono occupate."
                },
                {
                    name: "Passo del Deserto",
                    description: "La tua fisiologia è adatta a terreni difficili e climi aridi. Ignori il terreno difficile creato da macerie, sabbia o detriti naturali. Inoltre, hai bisogno della metà dell'acqua giornaliera rispetto alle altre specie medie per sopravvivere."
                },
                {
                    name: "Erudito della Idaris",
                    description: "Cresciuto tra gli archivi della nave-mondo, hai un'educazione formale. Ottieni competenza in un'abilità a scelta tra Storia (Intelligenza) o Cultura (Intelligenza)."
                }
            ],
            archetypes: {
                "deriviscio": {
                    name: "Deriviscio",
                    modifiers: { dex: 1 },
                    features: [
                        {
                            name: "Danza delle Lame",
                            description: "Sei addestrato a muoverti agilmente in battaglia. Quando indossi un'armatura leggera o nessuna armatura, la tua velocità base di camminata aumenta di 1,5 metri."
                        },
                        {
                            name: "Parata Multipla",
                            description: "Mentre impugni un'arma da mischia in almeno due delle tue mani, ottieni un bonus di +1 alla CA contro gli attacchi di opportunità."
                        }
                    ]
                },
                "navigatore": {
                    name: "Navigatore Stellare",
                    modifiers: { int: 1 },
                    features: [
                        {
                            name: "Adattamento Zero-G",
                            description: "Sei nato nello spazio. Non subisci svantaggio ai tiri per colpire o alle prove di abilità quando ti trovi in gravità zero. Inoltre, hai vantaggio sulle prove di Destrezza (Acrobazia) per manovrare in ambienti a gravità zero o bassa gravità."
                        },
                        {
                            name: "Tecnologia Ancestrale",
                            description: "Hai familiarità con i sistemi antichi. Ottieni competenza nell'abilità Meccanica (Saggezza) o nell'uso degli Strumenti da Tecnico."
                        }
                    ]
                }
            }
        },
        "pahtra": {
            name: "Pahtra",
            modifiers: { dex: 2 },
            size: "M",
            speed: 9,
            darkvision: 18,
            languages: ["Comune", "Pahtra"],
            features: [
                {
                    name: "Sensi Felini",
                    description: "Ottieni competenza nell'abilità Percezione."
                },
                {
                    name: "Armi Naturali",
                    description: "Possiedi artigli retrattili che puoi usare in combattimento. I tuoi colpi senz'armi infliggono danni taglienti pari a 1d4 + il tuo modificatore di Forza, invece dei normali danni contundenti."
                },
                {
                    name: "Atterraggio Agile",
                    description: "Hai resistenza ai danni da caduta e sei sempre considerato competente nelle prove di Destrezza (Acrobazia) per ridurre l'impatto di una caduta."
                }
            ],
            archetypes: {
                "base": { // La chiave resta 'base' per compatibilità, cambia solo il nome visualizzato
                    name: "Cacciatore Silente",
                    modifiers: { con: 1 },
                    features: [
                        {
                            name: "Passo Felpato",
                            description: "Sei un maestro del movimento silenzioso. Ottieni competenza nell'abilità Furtività."
                        },
                        {
                            name: "Scatto del Predatore",
                            description: "Quando usi l'azione di Scatto (Dash), puoi muoverti attraverso il terreno difficile senza penalità di movimento per quel turno."
                        }
                    ]
                },
                "cantore": {
                    name: "Cantore di Guerra",
                    modifiers: { cha: 1 },
                    features: [
                        {
                            name: "Voce Esper",
                            description: "Ottieni l'uso del talento Scarica Sonica come talento Prime (a volontà). La tua caratteristica di canalizzazione per questo talento è il Carisma."
                        },
                        {
                            name: "Ispirazione Musicale",
                            description: "Ottieni competenza nell'abilità Performance o in uno strumento musicale a tua scelta."
                        }
                    ]
                }
            }
        },
        "vesk": {
            name: "Vesk",
            modifiers: { str: 2 },
            size: "M",
            speed: 9,
            darkvision: 18,
            languages: ["Comune", "Vesk"],
            features: [
                {
                    name: "Armatura Naturale",
                    description: "Hai pelle dura e scaglie rinforzate. Quando non indossi armatura, la tua Classe Armatura è 13 + il tuo modificatore di Destrezza. Puoi usare la tua armatura naturale per determinare la tua CA se l'armatura che indossi ti lascerebbe con una CA inferiore. L'uso di uno scudo si applica."
                },
                {
                    name: "Minaccioso",
                    description: "La tua stazza e il tuo aspetto sono intimidatori per natura. Ottieni competenza nell'abilità Intimidire."
                },
                {
                    name: "Armi Naturali",
                    description: "Sei sempre armato. I tuoi artigli o la tua coda sono armi naturali, che puoi usare per effettuare colpi senz'armi. Se colpisci con essi, infliggi danni taglienti pari a 1d4 + il tuo modificatore di Forza, invece dei normali danni contundenti."
                }
            ],
            archetypes: {
                "d_assalto": {
                    name: "Soldato d'Assalto",
                    modifiers: { con: 1 },
                    features: [
                        {
                            name: "Aggressivo",
                            description: "Come azione bonus, puoi muoverti fino alla tua velocità verso una creatura ostile che puoi vedere."
                        },
                        {
                            name: "Corazzato",
                            description: "La tua pelle è ancora più spessa della media. Ottieni un bonus di +1 alla Classe Armatura quando usi la tua Armatura Naturale o quando indossi un'armatura pesante."
                        }
                    ]
                },
                "stratega": {
                    name: "Stratega Imperiale",
                    modifiers: { wis: 1 },
                    features: [
                        {
                            name: "Impavido",
                            description: "Hai vantaggio sui tiri salvezza contro l'essere spaventato."
                        },
                        {
                            name: "Ordine di Battaglia",
                            description: "Hai familiarità con la storia militare e le tattiche. Ottieni competenza nell'abilità Storia (Intelligenza) o Intuizione (Saggezza). Inoltre, puoi usare la tua reazione per concedere vantaggio al tiro per colpire di un alleato che puoi vedere entro 9 metri da te, purché l'alleato stia attaccando un bersaglio che puoi vedere anche tu. Puoi usare questa capacità un numero di volte pari al tuo modificatore di Saggezza (minimo 1) e recuperi tutti gli usi dopo un riposo lungo."
                        }
                    ]
                }
            }
        },
        "ysoki": {
            name: "Ysoki",
            modifiers: { dex: 2 },
            size: "S",
            speed: 9,
            darkvision: 18,
            languages: ["Comune", "Ysoki"],
            features: [
                {
                    name: "Tasche Guanciali",
                    description: "Possiedi delle tasche nelle guance che possono contenere oggetti fino a 0,03 metri cubi (1 piede cubo) di volume o fino a 2,5 kg di peso in totale. Hai vantaggio sulle prove di Destrezza (Rapidità di Mano) per nascondere oggetti nelle tue guance."
                },
                {
                    name: "Grinta",
                    description: "Sei abituato a farti valere contro creature più grandi di te. Hai vantaggio sui tiri salvezza contro l'essere spaventato."
                }
            ],
            archetypes: {
                "ingegnere": {
                    name: "Ingegnere dei Bassifondi",
                    modifiers: { int: 1 },
                    features: [
                        {
                            name: "Manutentore Esperto",
                            description: "Ottieni competenza nell'abilità Meccanica (Saggezza) o Computers (Intelligenza)."
                        },
                        {
                            name: "Strisciare",
                            description: "Puoi muoverti attraverso lo spazio di qualsiasi creatura che sia di una taglia più grande della tua. Inoltre, puoi infilarti in passaggi stretti larghi fino a 15 cm senza dover strizzarti (squeeze), mantenendo la tua velocità normale e senza subire svantaggi."
                        }
                    ]
                },
                "vagabondo": {
                    name: "Vagabondo Stellare",
                    modifiers: { cha: 1 },
                    features: [
                        {
                            name: "Parlantina Sciolta",
                            description: "Ottieni competenza nell'abilità Persuasione o Inganno."
                        },
                        {
                            name: "Sensi Acuti",
                            description: "Ottieni competenza nell'abilità Percezione. I tuoi grandi orecchi e le tue vibrisse ti permettono di notare dettagli che sfuggono ad altri."
                        }
                    ]
                }
            }
        }
    },
    classes: {
        "ingegnere": {
            name: "Ingegnere",
            hit_die: "1d8",
            saving_throws: ["Cos", "Wis"],
            proficiencies: {
                armature: ["Leggere", "Medie"],
                armi: ["Semplici"],
                strumenti: [],
                abilita_scelta: {
                    count: 2,
                    list: ["Astrofisica", "Computer", "Intuizione", "Cultura", "Meccanica", "Medicina", "Persuasione", "Xenobiologia"]
                }
            },
            features: [
                { name: "Forgiatura", level: 1, description: "Ottieni l'accesso alle Tecniche. Conosci 3 Tecniche Prime e puoi preparare tecniche di grado 1." },
                { name: "Specialità Tecnica", level: 1, description: "Scegli un archetipo: Macchinista, Medico o Armeggiatore. Ottieni privilegi specifici al 1°, 2°, 6° e 8° livello." },
                { name: "Richiamare il Rig", level: 1, description: "Reazione: Percepisci la posizione del Rig entro 800km. Azione Bonus: Spendi 1 slot per teletrasportare il Rig nella tua mano. (Dal 5° livello il teletrasporto è gratuito)." },
                { name: "Espansione del Rig", level: 2, description: "Recupero: Riposo Breve o Lungo. Canalizzi energia per effetti speciali. Inizi con Impulso Elettromagnetico (Azione): Costrutti/automi entro 9m fanno TS Intelligenza. Fallimento: Menomati fino a fine tuo prossimo turno o danno subito." },
                { name: "Devastazione Meccanica (I)", level: 5, description: "Il tuo Impulso Elettromagnetico distrugge istantaneamente automi che falliscono il TS se sono di GS 1/2 o inferiore." },
                { name: "Devastazione Meccanica (II)", level: 8, description: "La soglia di distruzione istantanea sale a GS 1 o inferiore." },
                { name: "Riparazione di Fortuna", level: 10, description: "Azione: Tira 1d100. Se il risultato è ≤ al tuo livello, ottieni un effetto speciale deciso dal GM. Ricarica: 7 giorni." },
                { name: "The Jury Rig", level: 20, description: "Il tuo rig agisce in simbiosi perfetta. Non hai più bisogno di lanciare dadi per fargli compiere le sue azioni standard o di routine." }
            ],
            specializations: {
                "macchinista": {
                    name: "Macchinista",
                    features: [
                        { name: "Competenze Bonus", level: 1, description: "Ottieni competenza in Armi Marziali e Scudi." },
                        { name: "Attacco Coordinato", level: 1, description: "Quando usi l'azione Attacco, puoi usare un'Azione Bonus per far attaccare il tuo drone. Danni: 1d6 + Sag radianti." },
                        { name: "Rig Expansion: Fiore di Fuoco", level: 2, description: "Azione: Cono di fiamme di 9m. Danni: 2d10 + Livello Ingegnere (TS Des dimezza)." },
                        { name: "Attacco Sincronizzato", level: 6, description: "L'Attacco Coordinato infligge ora 2d6 danni e il bersaglio deve superare un TS Costituzione o perdere le reazioni." },
                        { name: "Repulsore", level: 8, description: "Azione Bonus (mano secondaria): Attacco a distanza. Danni: 1d8 forza + bersaglio Prono (TS Cost)." }
                    ]
                },
                "medico": {
                    name: "Medico",
                    features: [
                        { name: "Competenza Bonus", level: 1, description: "Ottieni competenza negli Scudi." },
                        { name: "Dottore in Medicina", level: 1, description: "Quando curi con una tecnica (Grado 1+), curi PF extra pari a 2 + grado della tecnica." },
                        { name: "Rig Expansion: Rigenerazione", level: 2, description: "Azione: Riserva di cura pari a 5 × Livello Ingegnere, distribuibile tra creature entro 9m." },
                        { name: "Sapiente della Guarigione", level: 6, description: "Quando curi un'altra creatura con una tecnica, ti curi anche tu di 2 + grado della tecnica." },
                        { name: "Attacco Caricato", level: 8, description: "Una volta per turno, aggiungi 1d8 danni necrotici a un attacco con arma." }
                    ]
                },
                "armeggiatore": {
                    name: "Armeggiatore",
                    features: [
                        { name: "Competenze Bonus", level: 1, description: "Ottieni competenza in Armature Pesanti e Veicoli (Planetari)." },
                        { name: "Potenziamento Equipaggiamento", level: 1, description: "Una volta per riposo lungo, conferisci per 12 ore: +1 CA a un'armatura, oppure +1 Attacco/Danni a un'arma." },
                        { name: "Rig Expansion: Sabotare Equip.", level: 2, description: "Azione: Bersaglio entro 9m effettua TS Intelligenza. Fallimento: Svantaggio all'attacco o Vantaggio contro di lui o Perde resistenze." },
                        { name: "Aggiornamento Difesa", level: 6, description: "Ottieni +1 CA (con armature medie/pesanti) e Resistenza a un tipo di danno." },
                        { name: "Impulso Amplificato", level: 8, description: "Il tuo Impulso Elettromagnetico infligge ora anche 2d10 + Livello Ingegnere danni da fulmine." }
                    ]
                }
            }
        },
        "melder": {
            name: "Melder",
            hit_die: "1d6",
            saving_throws: ["Int", "Wis"],
            proficiencies: {
                armature: [],
                armi: ["Coltello da combattimento", "Lame da lancio", "Bastone pieghevole", "Manganello metallico", "Pistola leggera"],
                strumenti: [],
                abilita_scelta: {
                    count: 2,
                    list: ["Astrofisica", "Intuizione", "Investigazione", "Cultura", "Medicina", "Xenobiologia"]
                }
            },
            features: [
                { name: "Canalizzazione", level: 1, description: "Ottieni l'accesso ai Talenti Esper e ai Talenti Prime. Usi l'Intelligenza per attivarli." },
                { name: "Recupero Esper", level: 1, description: "Una volta al giorno, dopo un Riposo Breve, recuperi Punti Talento pari a: 2 + (Livello Melder / 2)." },
                { name: "Disciplina del Melder", level: 2, description: "Scegli una specializzazione: Metacinetico o Psicogenico." },
                { name: "Aumento Prime", level: 18, description: "Puoi lanciare i tuoi talenti conosciuti di Grado 1 e Grado 2 come se fossero di Grado Prime (a volontà)." },
                { name: "Talenti Caratteristici", level: 20, description: "Scegli due talenti conosciuti di Grado 3. Puoi attivarli ciascuno una volta al Grado 3 senza spendere Punti Talento." }
            ],
            specializations: {
                "metacinetico": {
                    name: "Metacinetico",
                    features: [
                        { name: "Precisione del Talento", level: 2, description: "Quando usi un talento elementale/cinesi ad area, puoi escludere 1 + grado bersagli." },
                        { name: "Potenziamento Prime", level: 6, description: "I tuoi talenti Prime infliggono metà danni se il bersaglio supera il TS." },
                        { name: "Metacinetico Potenziato", level: 10, description: "Aggiungi il modificarore di Intelligenza ai danni di qualsiasi talento elementale o di cinesi." }
                    ]
                },
                "psicogenico": {
                    name: "Psicogenico",
                    features: [
                        { name: "Mesmerizzare", level: 2, description: "Azione: Bersaglio entro 1,5m TS Saggezza o Immobilizzato, Stordito e Inabile." },
                        { name: "Stordire e Disorientare", level: 6, description: "Azione: Bersaglio entro 9m TS Saggezza o Disorientato e Svantaggio al prossimo attacco." },
                        { name: "Mente Secondaria", level: 10, description: "Quando usi un potere psicogenico di Grado 1+ singolo, puoi scegliere un secondo bersaglio." }
                    ]
                }
            }
        },
        "guerriero": {
            name: "Guerriero",
            hit_die: "1d10",
            saving_throws: ["Str", "Con"],
            proficiencies: {
                armature: ["Leggere", "Medie", "Pesanti", "Scudi"], // "Tutte le armature"
                armi: ["Semplici", "Marziali"],
                strumenti: [],
                abilita_scelta: {
                    count: 2,
                    list: ["Acrobazia", "Atletica", "Intuizione", "Intimidire", "Cultura", "Percezione", "Persuasione", "Sopravvivenza"]
                }
            },
            features: [
                { name: "Stile di Combattimento", level: 1, description: "Scegli uno stile di combattimento." },
                { name: "Recuperare Energie", level: 1, description: "Azione Bonus: Recuperi 1d10 + Livello Guerriero PF. Recupero: Riposo Breve/Lungo." },
                { name: "Azione Impetuosa", level: 2, description: "Azione: Compi un'azione addizionale nel tuo turno. Recupero: Riposo Breve/Lungo." },
                { name: "Archetipo Marziale", level: 3, description: "Scegli un archetipo: Paragon, Commando o Guardia della Tempesta." },
                { name: "Attacco Extra", level: 5, description: "Puoi attaccare due volte invece di una quando usi l'azione Attacco." },
                { name: "Indomito", level: 9, description: "Puoi ritirare un Tiro Salvezza fallito. Una volta per riposo lungo." }
            ],
            specializations: {
                "paragon": {
                    name: "Paragon",
                    features: [
                        { name: "Colpo Infuso", level: 3, description: "Azione Bonus: Vantaggio ai tiri per colpire e +Mod. Cost ai danni fino fine turno. 3 usi/riposo." },
                        { name: "Spinta Atletica", level: 7, description: "Aggiungi metà bonus competenza a prove fisiche che non lo usano." },
                        { name: "Stile Aggiuntivo", level: 10, description: "Scegli un secondo Stile di Combattimento." },
                        { name: "Colpo Rapido", level: 15, description: "Runcia al vantaggio per attacco addizionale." },
                        { name: "Sopravvissuto", level: 18, description: "Se < metà PF, recuperi 5 + Mod. Cost PF ogni turno." }
                    ]
                },
                "commando": {
                    name: "Commando",
                    features: [
                        { name: "Addestramento Tattico", level: 3, description: "Competenza in uno strumento/veicolo o abilità." },
                        { name: "Prodezze", level: 3, description: "Ottieni Dadi Prodezza (d8) per manovre." },
                        { name: "Demolitore", level: 7, description: "Competenza in granate e demolizione." },
                        { name: "Prodezze Ampliate", level: 10, description: "Dadi diventano d10." },
                        { name: "Determinazione", level: 15, description: "Se tiri iniziativa senza dadi, ne recuperi uno." }
                    ]
                },
                "guardia_tempesta": {
                    name: "Guardia della Tempesta",
                    features: [
                        { name: "Legame con l'Arma", level: 3, description: "Puoi legarti a un'arma e richiamarla." },
                        { name: "Impulso dell'Arma", level: 3, description: "Attivi effetto extra sul colpo (2 usi/riposo)." },
                        { name: "Impulso Residuo", level: 7, description: "L'arma cambia tipo di danno e supera resistenze dopo Impulso." },
                        { name: "Colpo di Precisione", level: 10, description: "Spendi Impulso per ritirare colpo mancato." },
                        { name: "Ondata Senza Confini", level: 15, description: "Recuperi un impulso all'iniziativa se vuoto." },
                        { name: "Affinità Energetica", level: 18, description: "Resistenza al danno dell'arma con Impulso Residuo." }
                    ]
                }
            }
        },
        "mistico": {
            name: "Mistico",
            hit_die: "1d8",
            saving_throws: ["Wis", "Cha"],
            proficiencies: {
                armature: ["Leggere", "Medie", "Scudi"],
                armi: ["Semplici"],
                strumenti: ["Kit di Erboristeria o Strumento Musicale"],
                abilita_scelta: {
                    count: 2,
                    list: ["Intuizione", "Medicina", "Persuasione", "Religione", "Storia", "Xenobiologia"]
                }
            },
            features: [
                { name: "Canalizzazione", level: 1, description: "Usi Saggezza per Talenti. 3 Prime, 4 Grado 1." },
                { name: "Legame Spirituale", level: 1, description: "Leghi creature per lanciare talenti a tocco a distanza e conoscere stato." },
                { name: "Fonte Vitale", level: 1, description: "Riserva d6 pari a Livello. Azione Bonus cura bersaglio legato." },
                { name: "Connessione Mistica", level: 2, description: "Scegli sottoclasse: Guaritore o Empatica." },
                { name: "Intervento Cosmico", level: 10, description: "Reazione: Guarigione istantanea su legato a 0 PF." }
            ],
            specializations: {
                "guaritore": {
                    name: "Connessione del Guaritore",
                    features: [
                        { name: "Guaritore Potenziato", level: 2, description: "Talenti di cura: +2+Grado. Fonte Vitale: +Mod. Sag." },
                        { name: "Trasferimento Vitale", level: 6, description: "Subisci danni per curare. Se curi al max, eccesso diventa PF Temp." }
                    ]
                },
                "empatico": {
                    name: "Connessione Empatica",
                    features: [
                        { name: "Mente Alveare", level: 2, description: "Telepatia con legati. Legato usa Reazione per +1d4 a TS Sag/Car." },
                        { name: "Sovraccarico Emotivo", level: 6, description: "Reazione quando legato subisce danno: Attaccante subisce danni psichici e Svantaggio." }
                    ]
                }
            }
        },
        "solariano": {
            name: "Solariano",
            hit_die: "1d10",
            saving_throws: ["Con", "Cha"],
            proficiencies: {
                armature: ["Leggere", "Medie", "Scudi"],
                armi: ["Semplici", "Marziali"],
                strumenti: [],
                abilita_scelta: {
                    count: 2,
                    list: ["Astrofisica", "Atletica", "Intimidire", "Intuizione", "Percezione", "Sopravvivenza"]
                }
            },
            features: [
                { name: "Manifestazione Solare", level: 1, description: "Arma Solare o Armatura Solare." },
                { name: "Sintonizzazione Stellare", level: 1, description: "Modo Fotone (+danni fuoco) o Gravitone (+CA, terreno difficile)." },
                { name: "Rivelazioni Stellari", level: 2, description: "Impari poteri cosmici." },
                { name: "Ordine Siderale", level: 3, description: "Scegli Ordine: Corona o Eclissi." },
                { name: "Attacco Extra", level: 5, description: "Attacchi due volte." },
                { name: "Equilibrio Cosmico", level: 7, description: "Recuperi PF cambiando sintonizzazione." },
                { name: "Poteri Zenit", level: 20, description: "Usi Rivelazione Zenit dopo 3 round di sintonizzazione." }
            ],
            specializations: {
                "corona": {
                    name: "Ordine della Corona",
                    features: [
                        { name: "Arma Radiante", level: 3, description: "Arma/Armatura infligge danni fuoco extra pari a Mod. Car." },
                        { name: "Anima del Sole", level: 6, description: "Resistenza Radianti e Fuoco. Ignori resistenza fuoco nemica." }
                    ]
                },
                "eclissi": {
                    name: "Ordine dell'Eclissi",
                    features: [
                        { name: "Peso del Mondo", level: 3, description: "In Gravitone: colpi rallentano bersaglio di 3m." },
                        { name: "Guscio di Eventi", level: 6, description: "Resistenza Forza e Necrotici. Vantaggio TS contro spostamento." }
                    ]
                }
            }
        },
        "paradosso": {
            name: "Paradosso",
            hit_die: "1d6",
            saving_throws: ["Int", "Cha"],
            proficiencies: {
                armature: ["Leggere"],
                armi: ["Semplici"],
                strumenti: [],
                abilita_scelta: {
                    count: 2,
                    list: ["Astrofisica", "Inganno", "Intuizione", "Investigazione", "Percezione", "Storia"]
                }
            },
            features: [
                { name: "Canalizzazione", level: 1, description: "Usi Carisma per Talenti." },
                { name: "Ancora di Realtà", level: 1, description: "Vantaggio TS contro bandire/spostare piano." },
                { name: "Visione Multiversale", level: 1, description: "Azione: Vantaggio a prova/attacco. Usi: Mod. Car." },
                { name: "Campo di Distorsione", level: 2, description: "Azione Bonus: Aura 4,5m. Terreno difficile." },
                { name: "Spostamento Paradigmatico", level: 2, description: "Scegli Paradigma: Catastrofe o Utopia." },
                { name: "Manipolazione Probabilità", level: 3, description: "Reazione: Spendi 2 pt per +/- 1d4 a un tiro vicino." },
                { name: "Sovrapposizione Temporale", level: 5, description: "Svantaggio agli attacchi contro di te con Campo attivo." },
                { name: "Riscrittura Immediata", level: 11, description: "Azione Bonus: Ritiri dado fallito." },
                { name: "Esistenza Non Lineare", level: 15, description: "Immunità invecchiamento. Reazione a 0 PF per svanire e curarsi." },
                { name: "Entità Quantica", level: 20, description: "Resistenza Forza/Psichici. No sorpreso. Se tiri <=9 su d20 diventa 10." }
            ],
            specializations: {
                "catastrofe": {
                    name: "Paradigma della Catastrofe",
                    features: [
                        { name: "Terreno Ostile", level: 2, description: "Danni psichici nell'aura." },
                        { name: "Frattura della Realtà", level: 6, description: "Azione: Danni forza e prono in area." },
                        { name: "Erosione della Volontà", level: 10, description: "Svantaggio TS nemici nell'aura." }
                    ]
                },
                "utopia": {
                    name: "Paradigma dell'Utopia",
                    features: [
                        { name: "Rifugio Sicuro", level: 2, description: "Resistenza elementale nell'aura." },
                        { name: "Negazione del Fallimento", level: 6, description: "Reazione: Alleato ritira TS fallito." },
                        { name: "Egida del Destino", level: 10, description: "Immunità Spaventato/Affascinato e PF Temp nell'aura." }
                    ]
                }
            }
        },
        "specialista": {
            name: "Specialista",
            hit_die: "1d8",
            saving_throws: ["Dex", "Int"],
            proficiencies: {
                armature: ["Leggere"],
                armi: ["Semplici", "Autopistola", "Lama lunga", "Lama corta", "Sciabola"],
                strumenti: ["Strumenti da Infiltrazione"],
                abilita_scelta: {
                    count: 4,
                    list: ["Acrobazia", "Atletica", "Computer", "Inganno", "Intuizione", "Intimidire", "Investigazione", "Percezione", "Persuasione", "Rapidità di Mano", "Furtività"]
                }
            },
            features: [
                { name: "Attitudine Naturale", level: 1, description: "Competenza raddoppiata in 2 abilità." },
                { name: "Colpo Destro", level: 1, description: "1d6 danni extra con vantaggio/alleato." },
                { name: "ID Shadownet", level: 1, description: "Accesso al mercato nero e segreti." },
                { name: "Azione Scaltra", level: 2, description: "Azione Bonus: Scatto, Disimpegno, Nascondersi." },
                { name: "Specializzazione", level: 3, description: "Scegli Infiltrato, Operativo o Artificio." },
                { name: "Schivata Prodigiosa", level: 5, description: "Reazione: Dimezzi danni." },
                { name: "Elusione", level: 7, description: "Niente danni su TS Des superato." },
                { name: "Talento Affidabile", level: 11, description: "Tiri di 9 o meno diventano 10 nelle abilità competenti." },
                { name: "Senso Cieco", level: 14, description: "Senti nascosti entro 3m." },
                { name: "Mente Sfuggente", level: 15, description: "Competenza TS Saggezza." },
                { name: "Elusivo", level: 18, description: "Nessun vantaggio contro di te." },
                { name: "Colpo di Fortuna", level: 20, description: "Fallimento diventa successo/20." }
            ],
            specializations: {
                "infiltrato": {
                    name: "Infiltrato",
                    features: [
                        { name: "Mani Veloci", level: 3, description: "Azione Bonus per Rapidità di Mano/Oggetti." },
                        { name: "Leggero come una Piuma", level: 3, description: "Scalare veloce, Acrobazia per scalare." },
                        { name: "Maestria Furtiva", level: 9, description: "Vantaggio Furtività se muovi poco." },
                        { name: "Esperto di Elettronica", level: 13, description: "Vantaggio Computer." },
                        { name: "Riflessi Supremi", level: 17, description: "Due turni al primo round." }
                    ]
                },
                "operativo": {
                    name: "Operativo",
                    features: [
                        { name: "Addestrato nell'Arte", level: 3, description: "Competenza Camuffamento e Talento Prime." },
                        { name: "Colpo Vitale", level: 3, description: "Vantaggio se non ha agito. Critico se sorpresa." },
                        { name: "Identità Falsificata", level: 9, description: "Crei identità perfette." },
                        { name: "Impersonazione", level: 13, description: "Imiti voci e modi." },
                        { name: "Assassinio", level: 17, description: "Doppio danno su sorpresa." }
                    ]
                },
                "artificio": {
                    name: "Artificio",
                    features: [
                        { name: "Talenti Esper", level: 3, description: "Impari talenti Melder (Int)." },
                        { name: "Difesa Sensoriale", level: 3, description: "Colpo nega attacchi opportunità." },
                        { name: "Smorzatore Gravitazionale", level: 9, description: "Movimento extra su difficile, vantaggio TS prono." },
                        { name: "Occultamento Attivo", level: 13, description: "Nascondersi rende Invisibile." },
                        { name: "Riprogrammazione del Modulo", level: 17, description: "Sostituisci talenti con altre classi." }
                    ]
                }
            }
        },
    },
    FEAT_LIST: [
        { name: "Acrobata", req: "-", desc: "+1 Des. Usi Des per prove di Atletica. Doppio bonus Des ai TS contro Raffica." },
        { name: "Adattabile", req: "-", desc: "+1 a una Caratteristica. Competenza nei TS di quella caratteristica." },
        { name: "Allerta", req: "-", desc: "+5 Iniziativa. Immunità a Sorpresa. Nemici nascosti non hanno vantaggio." },
        { name: "Atletico", req: "-", desc: "+1 For o Des. Rialzarsi costa meno movimento. Vantaggio (1/riposo) su prove fisiche." },
        { name: "Lottatore", req: "-", desc: "+1 For o Cos. Colpi senz'armi d4. Competenza armi improvvisate. Azione bonus afferrare." },
        { name: "Esperto Carica", req: "-", desc: "Azione bonus Attacco/Spinta dopo Scatto. Bonus danni/spinta in linea retta." },
        { name: "Esper Combattimento", req: "-", desc: "Vantaggio TS Costituzione (Concentrazione). Lancio con mani occupate. Reazione: talento su AdO." },
        { name: "Pilota Combattimento", req: "Veicoli", desc: "+1 Des o Sag. Aumenta Difesa Manovra nave. Reazione per +CA nave." },
        { name: "Sapiente Cosmico", req: "Esper", desc: "Scegli Forza/Necrotico/Radioso. Vantaggio TS contro tipo. I tuoi poteri danno -2 ai TS nemici." },
        { name: "Demolitore", req: "-", desc: "+1 For o Sag. Competenza granate. Piazzi esplosivi come Azione Bonus." },
        { name: "Combattente 2 Armi", req: "-", desc: "+1 CA con due armi. Usi armi non leggere. Estrai due armi insieme." },
        { name: "Elementalista", req: "-", desc: "Scegli elemento. Ignori resistenza. Ritiri danni (1/riposo breve)." },
        { name: "Cacciatore di Esper", req: "-", desc: "Reazione attacco vs caster. Danni danno svantaggio conc. Vantaggio attacchi vs caster." },
        { name: "Piè Veloce", req: "-", desc: "Velocità +3m. Ignori terreno difficile scattando. +1 CA se ti muovi." },
        { name: "Fortuito", req: "-", desc: "3 Dadi Fortuna (d6) per migliorare i tuoi tiri o peggiorare i nemici." },
        { name: "Afferratore", req: "For 13", desc: "Vantaggio attacchi vs afferrati. Puoi immobilizzare (pin)." },
        { name: "Maestro Armi Pesanti", req: "-", desc: "Azione bonus attacco su critico/kill. -5 colpire / +10 danni." },
        { name: "Armaiolo", req: "-", desc: "+1 Des. Niente inceppamenti su 1 naturale. Ricarica rapida." },
        { name: "Robusto", req: "-", desc: "+1 Cos. Rimuovi veleno/malattia (1/riposo)." },
        { name: "Equip. Pesante", req: "-", desc: "+1 For. Competenza Armature Pesanti." },
        { name: "Maestro Arm. Pesanti", req: "-", desc: "+1 For. Riduzione danni non magici di 3. Resistenza esplosivi." },
        { name: "Artigliere Pesante", req: "-", desc: "+1 For. Riduci rinculo raffica. Azione bonus attacco extra raffica." },
        { name: "Leader Ispiratore", req: "Car 13", desc: "Conferisci PF temporanei agli alleati dopo riposo." },
        { name: "Mente Acuta", req: "-", desc: "+1 Int o Sag. Memoria eidetica. Prove gruppo." },
        { name: "Equip. Leggero", req: "-", desc: "+1 For o Des. Competenza Armature Leggere." },
        { name: "Esperto Linguista", req: "-", desc: "+1 Int. 3 lingue extra. Vantaggio codici." },
        { name: "Equip. Moderato", req: "-", desc: "+1 For o Des. Competenza Armature Medie e Scudi." },
        { name: "Maestro Hacker", req: "-", desc: "Competenza kit hacker. Vantaggio hacking. Svantaggio TS nemici vs spoofing." },
        { name: "Maestro Infiltrato", req: "-", desc: "Vantaggio segreti/trappole. Bonus disattivare." },
        { name: "Maestro Arm. Medie", req: "-", desc: "No svantaggio furtività. Bonus Des alla CA max +3." },
        { name: "Medico", req: "-", desc: "Stabilizzare cura 1 PF. Kit medico come riposo breve. Bonus cure riposo." },
        { name: "Maestro Armi Asta", req: "-", desc: "Attacco bonus estremità opposta. AdO quando entrano in portata." },
        { name: "Maestro Scudi", req: "-", desc: "Bonus azione spinta. Bonus scudo a TS Des. Reazione eludere danni." },
        { name: "Tattico Navale", req: "-", desc: "+1 Des o Sag. No svantaggio attacchi nave in evasione. Bonus mira nave." },
        { name: "Abile", req: "-", desc: "Competenza in 3 abilità." },
        { name: "Cecchino", req: "-", desc: "No svantaggio lunga gittata. Ignori copertura. -5 colpire / +10 danni." },
        { name: "Pilota Spaziale", req: "-", desc: "+1 Des. Competenza veicoli spaziali." },
        { name: "Tiro Rapido", req: "-", desc: "Ignori ricarica. No svantaggio mischia con armi distanza. Attacco bonus pistola." },
        { name: "Furtivo", req: "-", desc: "Nascondersi se leggermente oscurati. Rimani nascosto se manchi. Visione scura +." },
        { name: "Guidatore Acrobatico", req: "-", desc: "Attacco veicolo no svantaggio. Bonus manovre. Reazione CA veicolo." },
        { name: "Esperto Tecnico", req: "-", desc: "+1 Sag. Vantaggio riparazioni. Kit cura costrutti." },
        { name: "Attore", req: "-", desc: "+1 Car. Vantaggio impersonare." },
        { name: "Duro", req: "-", desc: "PF extra (2 per livello)." },
        { name: "Vigile", req: "-", desc: "+1 Int o Sag. Bonus Percezione/Indagine passiva. Lettura labiale." },
        { name: "Specialista Armi", req: "-", desc: "+1 For o Des. Competenza 5 armi." }
    ]
};

// --- DATA UPDATE: ENGINEER ESPER ---
// Progression Table: [Level, Slot1, Slot2, ... Slot9]
// Note: Level 0 is not used, index matches level.
RULES_DATA.ENGINEER_SLOTS_TABLE = {
    1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
    2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
    3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
    4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
    5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
    6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
    7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
    8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
    9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
    10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
    11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
    12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
    13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
    14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
    15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
    16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
    17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
    18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
    19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
    20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
};

// Specialties Bonus Spells (Always Prepared)
// Keys match the specialization keys in RULES_DATA.classes.ingegnere.specializations
RULES_DATA.ENGINEER_SPECIALTIES_BY_LEVEL = {
    "macchinista": {
        1: ["Esplosione Laser", "Potenziamento Sensoriale"],
        3: ["Drone d'Assalto", "Arma Potenziata"],
        5: ["Assorbimento", "Schema d'Attacco"],
        7: ["Sfera al Plasma", "Sentinella Furtiva"],
        9: ["Contagio", "Incenerimento"]
    },
    "medico": {
        1: ["Riparare", "Trauma"],
        3: ["Sostenere", "Rimedio Minore"],
        5: ["Ottimizzare", "Resuscitare"],
        7: ["Suscettibilità Energetica", "Microstabilizzatore"],
        9: ["Riparare di Massa", "Rianimare"] // Nota: "Riparare di Massa" è spesso alias di Guarigione di Massa
    },
    "armeggiatore": {
        1: ["Impedenza", "Disturbatore Sensoriale"],
        3: ["Collegamento Corticale", "Paralizzatore"],
        5: ["Costruzione Rapida", "Effetto Disfacimento"], // Costruzione Rapida -> Costrutto Rapido? Verifica nomi DB
        7: ["Microstabilizzatore", "Sfera di Plasma"],
        9: ["Incenerimento", "Rimedio Maggiore"]
    }
};

RULES_DATA.ESPER_POWERS = [
    // ==========================================
    // CLASSE: INGEGNERE (Forgiatura)
    // ==========================================

    // --- GRADO 0 (PRIME) ---
    { name: "Amplificare Abilità", grade: 0, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "1 minuto", description: "Inietti un booster in una creatura consenziente. +1d4 a una prova di caratteristica." },
    { name: "Analizzare Dispositivo", grade: 0, class: "Ingegnere", time: "1 minuto", range: "Tocco", duration: "Istantanea", description: "Scopri comandi, meccanismi e funzioni di un automa o dispositivo." },
    { name: "Attivare Dispositivo", grade: 0, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Conc., 1 min", description: "Fornisci energia o attivi un dispositivo semplice a distanza." },
    { name: "Cerchio Statico", grade: 0, class: "Ingegnere", time: "1 azione", range: "Self (1,5m)", duration: "Istantanea", description: "Emetti energia. Creature entro 1,5m subiscono 1d6 danni da fulmine (TS Cost)." },
    { name: "Deflettere Elementi", grade: 0, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "Conc., 1 min", description: "Generatore di campo. +2 al prossimo TS contro danni elementali." },
    { name: "Scarica Elettrica", grade: 0, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "1d8 danni da fulmine. Il bersaglio perde la copertura." },
    { name: "Scarica Sonica", grade: 0, class: "Ingegnere", time: "1 azione", range: "Self (1,5m)", duration: "Istantanea", description: "Esplosione sonica. 1d6 danni da tuono a creature vicine (TS Cost)." },
    { name: "Schermo Virtuale", grade: 0, class: "Ingegnere", time: "1 azione", range: "27 metri", duration: "Conc., 1 min", description: "Visualizzi i contenuti di un display distante davanti a te." },
    { name: "Spruzzo Acido", grade: 0, class: "Ingegnere", time: "1 azione", range: "3 metri", duration: "Istantanea", description: "Spruzzi acido. 1d10 danni da acido (TS Des)." },
    { name: "Stabilizzare", grade: 0, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Rendi stabile una creatura a 0 PF." },
    { name: "Visione Gamma", grade: 0, class: "Ingegnere", time: "1 azione", range: "Self", duration: "10 min", description: "Ottieni scurovisione 12m. Svantaggio con luce intensa." },

    // --- GRADO 1 ---
    { name: "Balsamo da Campo", grade: 1, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Cura 3 creature per 1d4 + mod forgiatura. No costrutti." },
    { name: "Barriera", grade: 1, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Conc., 10 min", description: "Campo di forza su una creatura. +2 alla CA." },
    { name: "Braccio di Carico", grade: 1, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "Conc., 1 min", description: "Vantaggio su Atletica e capacità di carico aumentata." },
    { name: "Carica Voltaica", grade: 1, class: "Ingegnere", time: "1 bonus", range: "Self", duration: "Conc., 1 min", description: "Arma infligge 1d4 danni fulmine extra." },
    { name: "Connessione Remota", grade: 1, class: "Ingegnere", time: "1 azione", range: "27 metri", duration: "Conc., 10 min", description: "Usi un dispositivo a distanza come se fossi lì." },
    { name: "Difensore a Spirale", grade: 1, class: "Ingegnere", time: "1 reazione", range: "Self", duration: "Istantanea", description: "Scudi deflettono attacco. Svantaggio al tiro per colpire nemico." },
    { name: "Direttiva Intercettazione", grade: 1, class: "Ingegnere", time: "1 bonus", range: "Self", duration: "Conc., 1 min", description: "Vantaggio TS Des/Sag contro automi e costrutti." },
    { name: "Disturbatore Sensoriale", grade: 1, class: "Ingegnere", time: "1 bonus", range: "9 metri", duration: "1 minuto", description: "Mascheramento. Chi attacca il bersaglio deve fare TS Sag o perdere l'attacco." },
    { name: "Esplosione Laser", grade: 1, class: "Ingegnere", time: "1 azione", range: "36 metri", duration: "Istantanea", description: "4d6 radianti. Vantaggio al prossimo attacco contro il bersaglio." },
    { name: "Impedenza", grade: 1, class: "Ingegnere", time: "1 azione", range: "9 metri", duration: "Conc., 1 min", description: "Disturba 3 creature. -1d4 a tiri per colpire e TS (TS Sag)." },
    { name: "Potenziamento Sensoriale", grade: 1, class: "Ingegnere", time: "1 azione", range: "9 metri", duration: "Conc., 1 min", description: "3 creature ottengono +1d4 a tiri per colpire e TS." },
    { name: "Rimescolatore Bersaglio", grade: 1, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "Conc., 10 min", description: "Automi/Costrutti hanno svantaggio a colpire il bersaglio." },
    { name: "Riparare", grade: 1, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Cura creatura o costrutto di 1d8 + mod." },
    { name: "Sensi Esper", grade: 1, class: "Ingegnere", time: "1 azione", range: "Self", duration: "Conc., 10 min", description: "Percepisci poteri esper attivi entro 9m." },
    { name: "Trauma", grade: 1, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Attacco in mischia. 3d10 danni necrotici." },

    // --- GRADO 2 ---
    { name: "Arma Potenziata", grade: 2, class: "Ingegnere", time: "1 bonus", range: "Tocco", duration: "Conc., 1 ora", description: "Arma diventa magica +1 a colpire e danni." },
    { name: "Rimedio Minore", grade: 2, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Cura malattia o condizione (cieco, sordo, paralizzato, avvelenato)." },
    { name: "Cappello Nero", grade: 2, class: "Ingegnere", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Vantaggio hacking. Hackera talenti di interdizione." },
    { name: "Cecità/Sordità", grade: 2, class: "Ingegnere", time: "1 azione", range: "9 metri", duration: "1 minuto", description: "Acceca o assorda un nemico (TS Cost)." },
    { name: "Collegamento Corticale", grade: 2, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "1 ora", description: "Link vitale. Bersaglio ha +1 CA/TS e resistenze, ma tu subisci i suoi danni." },
    { name: "Comando Falso", grade: 2, class: "Ingegnere", time: "1 azione", range: "9 metri", duration: "Conc., 10 min", description: "Inganni automa/costrutto (TS Int). Ti crede amico." },
    { name: "Disintossicare", grade: 2, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "1 ora", description: "Neutralizza veleno. Vantaggio TS e resistenza danni veleno." },
    { name: "Drone d'Assalto", grade: 2, class: "Ingegnere", time: "1 bonus", range: "15 metri", duration: "1 minuto", description: "Drone attacca per 1d8+mod radianti. Muove e attacca come bonus." },
    { name: "Fantasma Dati", grade: 2, class: "Ingegnere", time: "1 azione", range: "Self", duration: "Conc., 1 ora", description: "Stealth digitale per te e 6 alleati." },
    { name: "Individuare Verità", grade: 2, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "10 min", description: "Area di verità 4,5m. Impossibile mentire deliberatamente." },
    { name: "Infravisione", grade: 2, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "8 ore", description: "Conferisce visione infrarossi 18m." },
    { name: "Lama al Plasma", grade: 2, class: "Ingegnere", time: "1 bonus", range: "Self", duration: "Conc., 10 min", description: "Generi lama. Attacco mischia 3d6 radianti." },
    { name: "Paralizzatore", grade: 2, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Conc., 1 min", description: "Rete elettrica. TS Cost o Paralizzato." },
    { name: "Potenziare Abilità", grade: 2, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "Conc., 1 ora", description: "Vantaggio a una caratteristica o PF temporanei." },
    { name: "Riparazione Rapida", grade: 2, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Ripara automa/veicolo 1d8+mod." },
    { name: "Scanner di Sicurezza", grade: 2, class: "Ingegnere", time: "1 azione", range: "36 metri", duration: "Istantanea", description: "Rilevi presenza e tipo di trappole in vista." },
    { name: "Sostenere", grade: 2, class: "Ingegnere", time: "1 azione", range: "9 metri", duration: "8 ore", description: "Aumenta PF max e attuali di 5 a 3 creature." },
    { name: "Trattamento di Massa", grade: 2, class: "Ingegnere", time: "10 min", range: "9 metri", duration: "Istantanea", description: "Cura 6 creature per 2d8+mod." },

    // --- GRADO 3 ---
    { name: "Adattamento Atmosferico", grade: 3, class: "Ingegnere", time: "1 azione", range: "9 metri", duration: "24 ore", description: "10 creature respirano in vuoto/acqua." },
    { name: "Assorbimento", grade: 3, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "Conc., 1 ora", description: "Resistenza a un tipo di danno elementale." },
    { name: "Balsamo da Campo Maggiore", grade: 3, class: "Ingegnere", time: "1 bonus", range: "18 metri", duration: "Istantanea", description: "Cura 6 creature 1d4+mod." },
    { name: "Blocco Sistema", grade: 3, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "Permanente", description: "Blocchi accesso a dispositivo elettronico." },
    { name: "Condensatore", grade: 3, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "1 ora", description: "Sfera di luce intensa." },
    { name: "Corrompere Modello", grade: 3, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "Conc., 1 min", description: "Maledizione: svantaggio o danni extra." },
    { name: "Costrutto Rapido", grade: 3, class: "Ingegnere", time: "1 minuto", range: "Self", duration: "Istantanea", description: "Crei un costrutto robotico (GS 2)." },
    { name: "Estensione Sensoriale", grade: 3, class: "Ingegnere", time: "1 minuto", range: "8 km", duration: "Conc., 10 min", description: "Sensore invisibile remoto." },
    { name: "Forgiare Veicolo", grade: 3, class: "Ingegnere", time: "10 min", range: "9 metri", duration: "Conc., 8 ore", description: "Crei un veicolo terrestre temporaneo." },
    { name: "Innesco Programmato", grade: 3, class: "Ingegnere", time: "1 ora", range: "Tocco", duration: "Attivazione", description: "Glifo esplosivo o potere immagazzinato." },
    { name: "Ottimizzatore", grade: 3, class: "Ingegnere", time: "1 azione", range: "9 metri", duration: "Conc., 1 min", description: "Bersagli ricevono cure massimizzate." },
    { name: "Raggio a Impulsi", grade: 3, class: "Ingegnere", time: "1 azione", range: "Linea 18m", duration: "Istantanea", description: "Danni e stordimento costrutti. Disabilita tech." },
    { name: "Resuscitare", grade: 3, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Riporta in vita creatura morta da 1 min." },
    { name: "Riparazione da Campo", grade: 3, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Cura 3 costrutti 1d4+mod." },
    { name: "Ripristinare Modello", grade: 3, class: "Ingegnere", time: "1 azione", range: "36 metri", duration: "Istantanea", description: "Rimuovi maledizioni." },
    { name: "Sbrogliare Effetto", grade: 3, class: "Ingegnere", time: "1 azione", range: "36 metri", duration: "Istantanea", description: "Termina effetti/poteri attivi." },
    { name: "Schema d'Attacco", grade: 3, class: "Ingegnere", time: "1 azione", range: "36 metri", duration: "Conc., 1 min", description: "Sciame droni. 3d8 danni in area ripetibili." },
    { name: "Sentinella Personale", grade: 3, class: "Ingegnere", time: "1 azione", range: "Self", duration: "Conc., 10 min", description: "Droni orbitanti. 3d8 danni a chi si avvicina." },
    { name: "Traduttore Universale", grade: 3, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "1 ora", description: "Comprendi e parla ogni lingua." },
    { name: "Zona d'Impatto", grade: 3, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "3d10 forza e getta proni." },

    // --- GRADO 4 ---
    { name: "Anello di Fulmini", grade: 4, class: "Ingegnere", time: "1 azione", range: "90 metri", duration: "Istantanea", description: "Anello 5d8 fulmine." },
    { name: "Campo Reattivo", grade: 4, class: "Ingegnere", time: "1 azione", range: "Self", duration: "10 min", description: "Scudo fuoco/freddo. Danni a chi colpisce." },
    { name: "Costrutto Base", grade: 4, class: "Ingegnere", time: "1 minuto", range: "18 metri", duration: "Conc., 1 ora", description: "Forgi costrutti obbedienti." },
    { name: "Drenare Potere", grade: 4, class: "Ingegnere", time: "1 azione", range: "9 metri", duration: "Istantanea", description: "Danni a costrutti/device, ti curi." },
    { name: "Egida Superiore", grade: 4, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "Conc., 1 ora", description: "Resistenza danni fisici (Pelle di pietra)." },
    { name: "Micro Stabilizzatore", grade: 4, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "8 ore", description: "Previene morte (resta a 1 PF)." },
    { name: "Raggio Traente", grade: 4, class: "Ingegnere", time: "1 bonus", range: "9 metri", duration: "Conc., 1 min", description: "Attira nemico 6m." },
    { name: "Sentinella Furtiva", grade: 4, class: "Ingegnere", time: "1 azione", range: "9 metri", duration: "8 ore", description: "Torretta invisibile. Spara a ostili." },
    { name: "Sfera al Plasma", grade: 4, class: "Ingegnere", time: "1 azione", range: "36 metri", duration: "Conc., 1 min", description: "Sfera danni radianti e fulmini." },
    { name: "Suscettibilità Energetica", grade: 4, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "1 min", description: "Rimuove resistenza e aggiunge danni." },
    { name: "Svincolare", grade: 4, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "1 ora", description: "Libertà di movimento." },
    { name: "Trasferimento Condotto", grade: 4, class: "Ingegnere", time: "1 bonus", range: "36 metri", duration: "Istantanea", description: "Teletrasporto tramite cavi/device." },
    { name: "Trasmutare Forma", grade: 4, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Conc., 1 ora", description: "Polimorfia in bestia." },
    { name: "Zona Ustionante", grade: 4, class: "Ingegnere", time: "1 azione", range: "36 metri", duration: "Conc., 10 min", description: "Muro di fuoco." },

    // --- GRADO 5 ---
    { name: "Barricata d'Acciaio", grade: 5, class: "Ingegnere", time: "1 azione", range: "36 metri", duration: "Conc., 10 min", description: "Muro di acciaio solido." },
    { name: "Contagio", grade: 5, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "7 giorni", description: "Infetti con malattia." },
    { name: "Esplosione Tossica", grade: 5, class: "Ingegnere", time: "1 azione", range: "90 metri", duration: "Conc., 1 min", description: "Nube di gas velenoso." },
    { name: "Guarigione di Massa", grade: 5, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Cura 6 creature 3d8+mod." },
    { name: "Guardiano Imponente", grade: 5, class: "Ingegnere", time: "1 minuto", range: "27 metri", duration: "Conc., 1 ora", description: "Animi oggetti (Costrutto)." },
    { name: "Incenerire", grade: 5, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Colonna di fuoco (4d6 fuoco + 4d6 radianti)." },
    { name: "Interdizione Cosmica", grade: 5, class: "Ingegnere", time: "1 azione", range: "Self", duration: "Istantanea", description: "Area protetta da entità." },
    { name: "Matrice di Controllo", grade: 5, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Conc., 1 min", description: "Domina mostro (Tech)." },
    { name: "Percezione Estesa", grade: 5, class: "Ingegnere", time: "10 min", range: "Self", duration: "Conc., 10 min", description: "Scrutare ovunque nel sistema." },
    { name: "Rianimare", grade: 5, class: "Ingegnere", time: "1 ora", range: "Tocco", duration: "Istantanea", description: "Resurrezione (<10 giorni)." },
    { name: "Richiamo Istantaneo", grade: 5, class: "Ingegnere", time: "1 azione", range: "Self", duration: "Conc., 1 ora", description: "Memoria eidetica e bonus Int." },
    { name: "Rimedio Maggiore", grade: 5, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Rimuovi esaurimento/maledizioni." },
    { name: "Riparazione da Campo Maggiore", grade: 5, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Cura 4 costrutti 1d8+mod." },
    { name: "Stasi Meccanica", grade: 5, class: "Ingegnere", time: "1 azione", range: "27 metri", duration: "Conc., 1 min", description: "Blocca mostro (automa)." },
    { name: "Tuta di Sopravvivenza", grade: 5, class: "Ingegnere", time: "1 azione", range: "9 metri", duration: "24 ore", description: "Protezione gruppo (Gas/Temp/Respiro)." },

    // --- GRADO 6 ---
    { name: "Barriera di Lame", grade: 6, class: "Ingegnere", time: "1 azione", range: "27 metri", duration: "Conc., 10 min", description: "Muro di lame vorticose." },
    { name: "Campo di Negazione", grade: 6, class: "Ingegnere", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Blocca poteri grado 5 o meno." },
    { name: "Cerotto Stimolante", grade: 6, class: "Ingegnere", time: "10 min", range: "9 metri", duration: "Istantanea", description: "Buff gruppo: Immunità paura/veleno, +PF." },
    { name: "Colpo Diretto", grade: 6, class: "Ingegnere", time: "1 bonus", range: "Self", duration: "Conc., 1 min", description: "Comandi alleati di attaccare." },
    { name: "Forgiare Automa", grade: 6, class: "Ingegnere", time: "1 minuto", range: "3 metri", duration: "Istantanea", description: "Crea costrutto fedele 24h." },
    { name: "Navigatore Virtuale", grade: 6, class: "Ingegnere", time: "1 minuto", range: "Self", duration: "Conc., 24 ore", description: "Trova percorso." },
    { name: "Passaggio Dinamico", grade: 6, class: "Ingegnere", time: "1 azione", range: "Self", duration: "1 round", description: "Teletrasporto tra dispositivi." },
    { name: "Punto di Ritorno", grade: 6, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Teletrasporto gruppo a casa." },
    { name: "Rifugio Interdetto", grade: 6, class: "Ingegnere", time: "1 bonus", range: "15 metri", duration: "1 min", description: "Proteggi area, blocca TP." },
    { name: "Rinnovamento Cellulare", grade: 6, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Cura 70 PF, rimuove tutto." },
    { name: "Vera Vista", grade: 6, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "1 ora", description: "Visione del vero." },
    { name: "Virus", grade: 6, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Danni necrotici 14d6." },

    // --- GRADO 7 ---
    { name: "Controllo Gravità", grade: 7, class: "Ingegnere", time: "1 azione", range: "30 metri", duration: "Conc., 1 min", description: "Inverti gravità." },
    { name: "Copia Cloni", grade: 7, class: "Ingegnere", time: "12 ore", range: "Tocco", duration: "Perm.", description: "Simulacro." },
    { name: "Design Duraturo", grade: 7, class: "Ingegnere", time: "1 azione", range: "Tocco", duration: "24 ore", description: "Potenzia costrutto/veicolo." },
    { name: "Forma Intangibile", grade: 7, class: "Ingegnere", time: "1 azione", range: "Self", duration: "8 ore", description: "Diventi etereo." },
    { name: "Innesco Funesto", grade: 7, class: "Ingegnere", time: "1 min", range: "Tocco", duration: "Attivazione", description: "Simbolo letale." },
    { name: "Rianimazione Totale", grade: 7, class: "Ingegnere", time: "1 ora", range: "Tocco", duration: "Istantanea", description: "Resurrezione." },
    { name: "Rigenerare", grade: 7, class: "Ingegnere", time: "1 min", range: "Tocco", duration: "1 ora", description: "Rigenera PF e arti." },
    { name: "Rottura dell'Anima", grade: 7, class: "Ingegnere", time: "1 bonus", range: "9 metri", duration: "Istantanea", description: "Onda sonica letale." },
    { name: "Smantellare", grade: 7, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Distruggi costrutto." },
    { name: "Tempesta di Fuoco", grade: 7, class: "Ingegnere", time: "1 azione", range: "45 metri", duration: "Istantanea", description: "Tempesta di fuoco." },

    // --- GRADO 8 ---
    { name: "Aura Reattiva", grade: 8, class: "Ingegnere", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Aura sacra (Danni radianti)." },
    { name: "Costrutto d'Elite", grade: 8, class: "Ingegnere", time: "1 min", range: "Self", duration: "Istantanea", description: "Forgi Alpha Mecharoid." },
    { name: "Negazione Superiore", grade: 8, class: "Ingegnere", time: "1 azione", range: "Self (3m)", duration: "Conc., 1 min", description: "Campo anti-magia." },
    { name: "Passeggiata Spaziale", grade: 8, class: "Ingegnere", time: "1 azione", range: "9 metri", duration: "Conc., 10 min", description: "Volo di gruppo, vuoto." },
    { name: "Ricostruzione Totale", grade: 8, class: "Ingegnere", time: "1 ora", range: "Tocco", duration: "Istantanea", description: "Ripara totalmente oggetto distrutto." },

    // --- GRADO 9 ---
    { name: "Mutaforma", grade: 9, class: "Ingegnere", time: "1 azione", range: "Self", duration: "Conc., 1 ora", description: "Polimorfia reale." },
    { name: "Preveggenza", grade: 9, class: "Ingegnere", time: "1 min", range: "Tocco", duration: "8 ore", description: "Vantaggio su tutto." },
    { name: "Rinnovamento di Massa", grade: 9, class: "Ingegnere", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Cura 700 PF divisi." },
    { name: "Ripristino Totale", grade: 9, class: "Ingegnere", time: "1 ora", range: "Tocco", duration: "Istantanea", description: "Resurrezione verace." },

    // ==========================================
    // CLASSE: MELDER (Canalizzazione) - LISTA UFFICIALE
    // ==========================================

    // --- GRADO 0 (PRIME) ---
    { name: "Analizzare Dispositivo", grade: 0, class: "Melder", time: "1 min", range: "Tocco", duration: "Istantanea", description: "Scopri funzioni e meccanismi di un dispositivo." },
    { name: "Attivare Dispositivo", grade: 0, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 1 min", description: "Fornisci energia o attivi un dispositivo a distanza." },
    { name: "Condotto Oscuro", grade: 0, class: "Melder", time: "1 azione", range: "36 m", duration: "1 round", description: "1d8 necrotici e il bersaglio non può recuperare PF." },
    { name: "Dardo di Forza", grade: 0, class: "Melder", time: "1 azione", range: "36 m", duration: "Istantanea", description: "1d10 danni da forza." },
    { name: "Dita Agili", grade: 0, class: "Melder", time: "1 azione", range: "9 m", duration: "1 min", description: "Telecinesi minore (manipoli oggetti, apri porte)." },
    { name: "Egida", grade: 0, class: "Melder", time: "1 azione", range: "Self", duration: "1 round", description: "Resistenza danni fisici e +2 TS Destrezza." },
    { name: "Lama Protonica", grade: 0, class: "Melder", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Lama di energia. Attacco mischia 1d6 forza." },
    { name: "Messaggio Mentale", grade: 0, class: "Melder", time: "1 azione", range: "36 m", duration: "1 round", description: "Invii un messaggio telepatico e ricevi risposta." },
    { name: "Mira Intuitiva", grade: 0, class: "Melder", time: "1 azione", range: "9 m", duration: "Conc., 1 round", description: "Vantaggio al primo tiro per colpire." },
    { name: "Morsa di Gelo", grade: 0, class: "Melder", time: "1 azione", range: "18 m", duration: "Istantanea", description: "1d8 freddo e riduci velocità di 3m." },
    { name: "Punto di Esplosione", grade: 0, class: "Melder", time: "1 azione", range: "3 m", duration: "Istantanea", description: "Esplosione di fiamme sul bersaglio. 1d12 fuoco." },
    { name: "Punto Illusorio", grade: 0, class: "Melder", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Crei un suono o un'immagine statica." },
    { name: "Rinnovare", grade: 0, class: "Melder", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Ripari rottura in un oggetto (max 30cm)." },
    { name: "Schermo Virtuale", grade: 0, class: "Melder", time: "1 azione", range: "27 m", duration: "Conc., 1 min", description: "Visualizzi display digitali a distanza." },
    { name: "Sfera Fulminante", grade: 0, class: "Melder", time: "1 azione", range: "18 m", duration: "Istantanea", description: "1d6 fulmine a un bersaglio o due vicini." },
    { name: "Spinta", grade: 0, class: "Melder", time: "1 azione", range: "3 m", duration: "Istantanea", description: "1d8 forza e spinta di 3m." },
    { name: "Spinta Direzionale", grade: 0, class: "Melder", time: "1 azione", range: "9 m", duration: "Istantanea", description: "Spingi creatura o oggetto di 1,5m." },

    // --- GRADO 1 ---
    { name: "Alterare Aspetto", grade: 1, class: "Melder", time: "1 azione", range: "Self", duration: "1 ora", description: "Modifichi il tuo aspetto fisico e vestiti." },
    { name: "Aprire Canale", grade: 1, class: "Melder", time: "1 azione", range: "150 m", duration: "Conc., 10 min", description: "Trasmetti voce/immagine a dispositivo noto." },
    { name: "Bastione", grade: 1, class: "Melder", time: "1 reazione", range: "Self", duration: "Istantanea", description: "+5 CA contro un attacco, protegge da Dardi di Forza." },
    { name: "Caduta Lenta", grade: 1, class: "Melder", time: "1 reazione", range: "18 m", duration: "1 min", description: "Rallenti caduta per 5 creature." },
    { name: "Campo di Protezione", grade: 1, class: "Melder", time: "1 azione", range: "Self", duration: "8 ore", description: "La tua CA diventa 13 + Des." },
    { name: "Compagno Legato", grade: 1, class: "Melder", time: "1 ora", range: "3 m", duration: "Istantanea", description: "Crei un famiglio di sorium (forma piccola/minuscola)." },
    { name: "Contraccolpo Psichico", grade: 1, class: "Melder", time: "1 reazione", range: "18 m", duration: "Istantanea", description: "2d10 danni psichici a chi ti colpisce." },
    { name: "Decifrare Linguaggi", grade: 1, class: "Melder", time: "1 azione", range: "Self", duration: "1 ora", description: "Comprendi ogni lingua scritta o parlata." },
    { name: "Dischi Guida", grade: 1, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 10 min", description: "+2 TS Des/Cost e velocità di scalata." },
    { name: "Distorsione", grade: 1, class: "Melder", time: "1 azione", range: "27 m", duration: "Istantanea", description: "Sfera esplosiva. 3d8 danni da forza." },
    { name: "Disturbatore Bersaglio", grade: 1, class: "Melder", time: "1 azione", range: "Tocco", duration: "Conc., 10 min", description: "Svantaggio agli attacchi di automi/costrutti contro il bersaglio." },
    { name: "Forma Illusoria", grade: 1, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 10 min", description: "Immagine silenziosa di oggetto/creatura (cubo 4,5m)." },
    { name: "Forza Concussiva", grade: 1, class: "Melder", time: "1 azione", range: "18 m", duration: "Istantanea", description: "Esplosione in quadrato 3m. Proni." },
    { name: "Frusta Artica", grade: 1, class: "Melder", time: "1 azione", range: "Cono 4,5m", duration: "Istantanea", description: "3d6 danni da freddo." },
    { name: "Frusta di Fulmini", grade: 1, class: "Melder", time: "1 azione", range: "36 m", duration: "Conc., 1 min", description: "1d10 fulmine. Azione per ripetere danno automaticamente." },
    { name: "Innervare", grade: 1, class: "Melder", time: "1 azione", range: "Self", duration: "1 ora", description: "Ottieni 1d4+4 Punti Ferita Temporanei." },
    { name: "Lancia di Fuoco", grade: 1, class: "Melder", time: "1 azione", range: "36 m", duration: "Istantanea", description: "2d8 fuoco e svantaggio al prossimo attacco/TS." },
    { name: "Malia", grade: 1, class: "Melder", time: "1 azione", range: "9 m", duration: "1 ora", description: "Charme su umanoide. Ti considera amico." },
    { name: "Moto Rapido", grade: 1, class: "Melder", time: "1 bonus", range: "Self", duration: "Conc., 10 min", description: "Puoi scattare come Azione Bonus." },
    { name: "Passo di Fase", grade: 1, class: "Melder", time: "1 azione", range: "Self", duration: "Istantanea", description: "Teletrasporto di 3 metri." },
    { name: "Passo Rapido", grade: 1, class: "Melder", time: "1 azione", range: "Tocco", duration: "1 ora", description: "Velocità aumentata di 3m." },
    { name: "Paura Primordiale", grade: 1, class: "Melder", time: "1 azione", range: "9 m", duration: "Conc., 1 min", description: "Bersaglio cade prono e inabile per paura." },
    { name: "Rinculo Sinaptico", grade: 1, class: "Melder", time: "1 azione", range: "18 m", duration: "Istantanea", description: "3d6 psichici e reazione per fuggire." },
    { name: "Salto", grade: 1, class: "Melder", time: "1 azione", range: "Tocco", duration: "1 min", description: "Distanza di salto triplicata." },
    { name: "Sensi Esper", grade: 1, class: "Melder", time: "1 azione", range: "Self", duration: "Conc., 10 min", description: "Percepisci aure e poteri attivi." },
    { name: "Stordire", grade: 1, class: "Melder", time: "1 azione", range: "27 m", duration: "Istantanea", description: "Creature in area 6m sono confuse/trattenute." },
    { name: "Tiro Propulso", grade: 1, class: "Melder", time: "1 azione", range: "45 m", duration: "Istantanea", description: "Scagli oggetto in linea retta. 3d8 contundenti." },
    { name: "Visione Condivisa", grade: 1, class: "Melder", time: "1 azione", range: "3 m", duration: "Conc., 1 min", description: "Condividi ricordi. Vantaggio percezione." },

    // --- GRADO 2 ---
    { name: "Agitazione Molecolare", grade: 2, class: "Melder", time: "1 azione", range: "36 m", duration: "Conc., 1 min", description: "Rendi metallo rovente. 2d8 fuoco." },
    { name: "Alterare Forma", grade: 2, class: "Melder", time: "1 azione", range: "Self", duration: "Conc., 1 ora", description: "Adattamento acquatico, aspetto o armi naturali." },
    { name: "Campo di Stasi", grade: 2, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 1 min", description: "Paralizza umanoide." },
    { name: "Cappello Nero", grade: 2, class: "Melder", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Vantaggio hacking e rompi interdizioni." },
    { name: "Cecità/Sordità", grade: 2, class: "Melder", time: "1 azione", range: "9 m", duration: "1 min", description: "Rendi cieco o sordo un nemico." },
    { name: "Dischi Fiammeggianti", grade: 2, class: "Melder", time: "1 azione", range: "36 m", duration: "Conc., 1 min", description: "3 dischi di fuoco (2d6 l'uno)." },
    { name: "Eclissi", grade: 2, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 10 min", description: "Sfera oscurità magica 4,5m." },
    { name: "Fantasma Dati", grade: 2, class: "Melder", time: "1 azione", range: "Self", duration: "Conc., 1 ora", description: "Maschera digitale per gruppo." },
    { name: "Inclinazione Estesa", grade: 2, class: "Melder", time: "1 azione", range: "Tocco", duration: "Conc., 1 ora", description: "Movimento su pareti/soffitti." },
    { name: "Individuare Pensieri", grade: 2, class: "Melder", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Leggi pensieri superficiali." },
    { name: "Individuare Verità", grade: 2, class: "Melder", time: "1 azione", range: "18 m", duration: "10 min", description: "Zona di verità 4,5m." },
    { name: "Influenza Imponente", grade: 2, class: "Melder", time: "1 azione", range: "36 m", duration: "Conc., 1 min", description: "Affascini e dai comandi." },
    { name: "Levitazione", grade: 2, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 10 min", description: "Sollevi creatura o oggetto verticalmente." },
    { name: "Offuscare", grade: 2, class: "Melder", time: "1 azione", range: "Tocco", duration: "Conc., 1 ora", description: "Invisibilità (termina se attacchi)." },
    { name: "Onda Disgregante", grade: 2, class: "Melder", time: "1 azione", range: "27 m", duration: "Istantanea", description: "4d4 necrotici + 2d4 turno dopo." },
    { name: "Onda Psichica", grade: 2, class: "Melder", time: "1 azione", range: "Cono 4,5m", duration: "Istantanea", description: "3d6 danni psichici." },
    { name: "Pacificare", grade: 2, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 1 min", description: "Sopprimi emozioni forti/paura/charme." },
    { name: "Pacchetto Cloni", grade: 2, class: "Melder", time: "1 azione", range: "Self", duration: "1 min", description: "3 duplicati illusori difensivi." },
    { name: "Raggio di Luce", grade: 2, class: "Melder", time: "1 azione", range: "Linea 9m", duration: "Istantanea", description: "3d8 danni radianti." },
    { name: "Scassinare", grade: 2, class: "Melder", time: "1 azione", range: "18 m", duration: "Istantanea", description: "Apri serrature a distanza." },
    { name: "Sfera Gravitazionale", grade: 2, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 10 min", description: "Sfera terreno difficile e trattenuto." },
    { name: "Sfocatura", grade: 2, class: "Melder", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Svantaggio ai nemici che ti attaccano." },
    { name: "Sigillo Magnetico", grade: 2, class: "Melder", time: "1 azione", range: "Tocco", duration: "Perm.", description: "Chiudi magicamente porta/contenitore." },
    { name: "Spira Gelida", grade: 2, class: "Melder", time: "1 azione", range: "27 m", duration: "Istantanea", description: "Cubo di ghiaccio. 3d8 freddo." },
    { name: "Spostamento di Fase", grade: 2, class: "Melder", time: "1 bonus", range: "Self", duration: "Istantanea", description: "Teletrasporto 9m." },
    { name: "Suggestione", grade: 2, class: "Melder", time: "1 azione", range: "9 m", duration: "Conc., 8 ore", description: "Impianti un corso d'azione ragionevole." },
    { name: "Taglio Spaziale", grade: 2, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 1 min", description: "Cubo lame invisibili. 2d8 taglienti." },
    { name: "Tasca Dimensionale", grade: 2, class: "Melder", time: "1 azione", range: "18 m", duration: "1 ora", description: "Spazio extradimensionale per 8 creature." },
    { name: "Zona Pulita", grade: 2, class: "Melder", time: "1 azione", range: "Self", duration: "Conc., 10 min", description: "Sfera 3m. Filtra gas, estingue fiamme." },

    // --- GRADO 3 ---
    { name: "Adattamento Atmosferico", grade: 3, class: "Melder", time: "1 azione", range: "9 m", duration: "24 ore", description: "Respiro in ogni ambiente." },
    { name: "Anti-Individuazione", grade: 3, class: "Melder", time: "1 azione", range: "Tocco", duration: "8 ore", description: "Nasconde da divinazione." },
    { name: "Assorbimento", grade: 3, class: "Melder", time: "1 azione", range: "Tocco", duration: "Conc., 1 ora", description: "Resistenza a un tipo di energia." },
    { name: "Blocco Sistema", grade: 3, class: "Melder", time: "1 azione", range: "Tocco", duration: "Perm.", description: "Blocca accesso dispositivo." },
    { name: "Celerità", grade: 3, class: "Melder", time: "1 azione", range: "9 m", duration: "Conc., 1 min", description: "Velocità x2, +2 CA, Azione extra." },
    { name: "Condensatore", grade: 3, class: "Melder", time: "1 azione", range: "18 m", duration: "1 ora", description: "Sfera di luce diurna." },
    { name: "Contro-Forma", grade: 3, class: "Melder", time: "1 reazione", range: "18 m", duration: "Istantanea", description: "Interrompi potere/incantesimo." },
    { name: "Corrompere Modello", grade: 3, class: "Melder", time: "1 azione", range: "Tocco", duration: "Conc., 1 min", description: "Maledizione." },
    { name: "Disegno Illusorio", grade: 3, class: "Melder", time: "1 azione", range: "36 m", duration: "Conc., 10 min", description: "Illusione visiva/sonora/olfattiva." },
    { name: "Disegno Ipnotico", grade: 3, class: "Melder", time: "1 azione", range: "36 m", duration: "Conc., 1 min", description: "Creature affascinate/inabili." },
    { name: "Energia Vampirica", grade: 3, class: "Melder", time: "1 azione", range: "36 m", duration: "Conc., 1 min", description: "Sfera oscurità, danni necrotici/freddo." },
    { name: "Esplosione di Fiamme", grade: 3, class: "Melder", time: "1 azione", range: "Linea 30m", duration: "Istantanea", description: "8d6 danni da fuoco." },
    { name: "Estensione Sensoriale", grade: 3, class: "Melder", time: "1 min", range: "8 km", duration: "Conc., 10 min", description: "Sensore remoto." },
    { name: "Forgiare Veicolo", grade: 3, class: "Melder", time: "10 min", range: "9 m", duration: "Conc., 8 ore", description: "Crea veicolo." },
    { name: "Innesco Programmato", grade: 3, class: "Melder", time: "1 ora", range: "Tocco", duration: "Attivazione", description: "Glifo." },
    { name: "Pozzo Energetico", grade: 3, class: "Melder", time: "1 azione", range: "9 m", duration: "Istantanea", description: "3d6 necrotici, ti curi metà." },
    { name: "Presa Avvizzente", grade: 3, class: "Melder", time: "1 azione", range: "18 m", duration: "Istantanea", description: "4d8 necrotici e paura." },
    { name: "Sbrogliare Effetto", grade: 3, class: "Melder", time: "1 azione", range: "36 m", duration: "Istantanea", description: "Termina effetti." },
    { name: "Sfera Paralizzante", grade: 3, class: "Melder", time: "1 azione", range: "27 m", duration: "Conc., 1 min", description: "Creature inabili." },
    { name: "Sifone", grade: 3, class: "Melder", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Attacco tocco 3d6 necrotici e cura." },
    { name: "Singolarità", grade: 3, class: "Melder", time: "1 azione", range: "45 m", duration: "Istantanea", description: "Esplosione 8d6 forza." },
    { name: "Traduttore Universale", grade: 3, class: "Melder", time: "1 azione", range: "Tocco", duration: "1 ora", description: "Comprendi ogni lingua." },
    { name: "Volare", grade: 3, class: "Melder", time: "1 azione", range: "Tocco", duration: "Conc., 10 min", description: "Volo 18m." },
    { name: "Volto Orripilante", grade: 3, class: "Melder", time: "1 azione", range: "Cono 9m", duration: "Conc., 1 min", description: "Paura." },

    // --- GRADO 4 ---
    { name: "Anello di Fulmini", grade: 4, class: "Melder", time: "1 azione", range: "90 m", duration: "Istantanea", description: "Anello 5d8 fulmine." },
    { name: "Aspetto del Terrore", grade: 4, class: "Melder", time: "1 azione", range: "36 m", duration: "Conc., 1 min", description: "Danni psichici ricorrenti." },
    { name: "Campo Reattivo", grade: 4, class: "Melder", time: "1 azione", range: "Self", duration: "10 min", description: "Scudo fuoco/freddo." },
    { name: "Contenitore Dimensionale", grade: 4, class: "Melder", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Nascondi oggetto piano etereo." },
    { name: "Devastare Modello", grade: 4, class: "Melder", time: "1 azione", range: "9 m", duration: "Istantanea", description: "8d8 necrotici." },
    { name: "Drenare Potere", grade: 4, class: "Melder", time: "1 azione", range: "9 m", duration: "Istantanea", description: "Danni costrutti/tech." },
    { name: "Egida Superiore", grade: 4, class: "Melder", time: "1 azione", range: "Tocco", duration: "Conc., 1 ora", description: "Resistenza danni fisici." },
    { name: "Fabbricare", grade: 4, class: "Melder", time: "10 min", range: "36 m", duration: "Istantanea", description: "Converti materiali in prodotto." },
    { name: "Lancio", grade: 4, class: "Melder", time: "1 azione", range: "18 m", duration: "Istantanea", description: "Scagli nemico 6d6 danni." },
    { name: "Nebbia del Caos", grade: 4, class: "Melder", time: "1 azione", range: "27 m", duration: "Conc., 1 min", description: "Confusione in area." },
    { name: "Offuscare Superiore", grade: 4, class: "Melder", time: "1 azione", range: "Tocco", duration: "Conc., 1 min", description: "Invisibilità persistente." },
    { name: "Osservatore Velato", grade: 4, class: "Melder", time: "1 azione", range: "9 m", duration: "Conc., 1 ora", description: "Sensore invisibile mobile." },
    { name: "Portale", grade: 4, class: "Melder", time: "1 azione", range: "150 m", duration: "Istantanea", description: "Teletrasporto + passeggero." },
    { name: "Pozzo Gravitazionale", grade: 4, class: "Melder", time: "1 azione", range: "27 m", duration: "Conc., 1 min", description: "Area gravità e danni." },
    { name: "Sfera Protettiva", grade: 4, class: "Melder", time: "1 azione", range: "9 m", duration: "Conc., 1 min", description: "Sfera invulnerabile." },
    { name: "Trasferimento Condotto", grade: 4, class: "Melder", time: "1 bonus", range: "36 m", duration: "Istantanea", description: "Teletrasporto via cavi." },
    { name: "Trasmutare Forma", grade: 4, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 1 ora", description: "Polimorfia in bestia." },
    { name: "Zona Sicura", grade: 4, class: "Melder", time: "10 min", range: "36 m", duration: "24 ore", description: "Proteggi area da divinazione." },
    { name: "Zona Ustionante", grade: 4, class: "Melder", time: "1 azione", range: "36 m", duration: "Conc., 10 min", description: "Muro di fuoco." },

    // --- GRADO 5 ---
    { name: "Alterazione di Massa", grade: 5, class: "Melder", time: "1 azione", range: "9 m", duration: "8 ore", description: "Camuffare gruppo." },
    { name: "Barricata d'Acciaio", grade: 5, class: "Melder", time: "1 azione", range: "36 m", duration: "Conc., 10 min", description: "Muro solido." },
    { name: "Campo di Forza", grade: 5, class: "Melder", time: "1 azione", range: "36 m", duration: "Conc., 10 min", description: "Barriera invisibile." },
    { name: "Dominazione", grade: 5, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 1 min", description: "Controlli umanoide." },
    { name: "Doppio Inganno", grade: 5, class: "Melder", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Invisibile + copia illusoria." },
    { name: "Elica di Curvatura", grade: 5, class: "Melder", time: "1 azione", range: "Cono 18m", duration: "Istantanea", description: "8d8 forza." },
    { name: "Forza Proiettata", grade: 5, class: "Melder", time: "1 azione", range: "36 m", duration: "Conc., 1 min", description: "Mano telecinetica." },
    { name: "Fossa Ribollente", grade: 5, class: "Melder", time: "1 azione", range: "36 m", duration: "Conc., 1 min", description: "Terreno fango/pietra." },
    { name: "Guardiano Imponente", grade: 5, class: "Melder", time: "1 min", range: "27 m", duration: "Conc., 1 ora", description: "Costrutto da materiali." },
    { name: "Legame Telepatico", grade: 5, class: "Melder", time: "1 azione", range: "9 m", duration: "1 ora", description: "Link mentale gruppo." },
    { name: "Modificare Memoria", grade: 5, class: "Melder", time: "1 azione", range: "9 m", duration: "Conc., 1 min", description: "Riscrivi ricordi." },
    { name: "Nebbia Frigida", grade: 5, class: "Melder", time: "1 azione", range: "36 m", duration: "Conc., 10 min", description: "Nube freddo dannosa." },
    { name: "Passaggio Spaziale", grade: 5, class: "Melder", time: "1 azione", range: "300 m", duration: "Istantanea", description: "Cerchio teletrasporto." },
    { name: "Percezione Estesa", grade: 5, class: "Melder", time: "10 min", range: "Self", duration: "Conc., 10 min", description: "Scrutare." },
    { name: "Richiamo Istantaneo", grade: 5, class: "Melder", time: "1 azione", range: "Self", duration: "Conc., 1 ora", description: "Memoria perfetta." },
    { name: "Stasi Superiore", grade: 5, class: "Melder", time: "1 azione", range: "27 m", duration: "Conc., 1 min", description: "Blocca mostro." },
    { name: "Telecinesi", grade: 5, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 10 min", description: "Manipoli oggetti/creature." },
    { name: "Tessere Sogni", grade: 5, class: "Melder", time: "1 min", range: "Speciale", duration: "8 ore", description: "Messaggio onirico." },
    { name: "Tuta di Sopravvivenza", grade: 5, class: "Melder", time: "1 azione", range: "9 m", duration: "24 ore", description: "Protezione ambientale gruppo." },

    // --- GRADO 6 ---
    { name: "Camminare nella Fase", grade: 6, class: "Melder", time: "1 azione", range: "150 m", duration: "Conc., 10 min", description: "Portale teletrasporto." },
    { name: "Campo di Negazione", grade: 6, class: "Melder", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Immunità poteri G5-." },
    { name: "Catena di Fulmini", grade: 6, class: "Melder", time: "1 azione", range: "45 m", duration: "Istantanea", description: "10d8 fulmine multiplo." },
    { name: "Disfunzione Motoria", grade: 6, class: "Melder", time: "1 azione", range: "9 m", duration: "Conc., 1 min", description: "Danza irresistibile." },
    { name: "Disintegrare", grade: 6, class: "Melder", time: "1 azione", range: "18 m", duration: "Istantanea", description: "10d6+40 forza. Polverizza." },
    { name: "Infrangi Sensi", grade: 6, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 1 min", description: "Stordito/Cieco/Sordo." },
    { name: "Innesco Illusorio", grade: 6, class: "Melder", time: "1 azione", range: "36 m", duration: "Perm.", description: "Illusione programmata." },
    { name: "Raggio di Fusione", grade: 6, class: "Melder", time: "1 azione", range: "Linea 18m", duration: "Conc., 1 min", description: "6d8 radianti." },
    { name: "Sfera di Curvatura", grade: 6, class: "Melder", time: "1 azione", range: "45 m", duration: "Istantanea", description: "8d6 forza sfera." },
    { name: "Struttura Sicura", grade: 6, class: "Melder", time: "10 min", range: "Tocco", duration: "24 ore", description: "Protezione edificio." },
    { name: "Suggestione di Massa", grade: 6, class: "Melder", time: "1 azione", range: "18 m", duration: "24 ore", description: "Suggestione su 12 creature." },
    { name: "Vera Vista", grade: 6, class: "Melder", time: "1 azione", range: "Tocco", duration: "1 ora", description: "Visione del vero." },
    { name: "Zona di Gelo", grade: 6, class: "Melder", time: "1 azione", range: "36 m", duration: "Conc., 10 min", description: "Muro di ghiaccio." },

    // --- GRADO 7 ---
    { name: "Controllo Gravità", grade: 7, class: "Melder", time: "1 azione", range: "30 m", duration: "Conc., 1 min", description: "Inverti gravità." },
    { name: "Copia Cloni", grade: 7, class: "Melder", time: "12 ore", range: "Tocco", duration: "Perm.", description: "Simulacro." },
    { name: "Devastazione", grade: 7, class: "Melder", time: "1 azione", range: "18 m", duration: "Istantanea", description: "7d8+30 necrotici." },
    { name: "Divergenza Temporale", grade: 7, class: "Melder", time: "1 azione", range: "Tocco", duration: "8 ore", description: "Stasi temporale." },
    { name: "Forma Intangibile", grade: 7, class: "Melder", time: "1 azione", range: "Self", duration: "8 ore", description: "Etereo." },
    { name: "Lama di Fenditura", grade: 7, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 1 min", description: "Spada di forza." },
    { name: "Piega Spaziale", grade: 7, class: "Melder", time: "1 azione", range: "3 m", duration: "Istantanea", description: "Teletrasporto gruppo." },
    { name: "Predare", grade: 7, class: "Melder", time: "1 azione", range: "18 m", duration: "Istantanea", description: "Parola potere: Dolore." },
    { name: "Prigione di Forza", grade: 7, class: "Melder", time: "1 azione", range: "30 m", duration: "1 ora", description: "Gabbia indistruttibile." },
    { name: "Vortice Elementale", grade: 7, class: "Melder", time: "1 azione", range: "45 m", duration: "Istantanea", description: "Palla fuoco ritardata." },
    { name: "Vortice Stritolante", grade: 7, class: "Melder", time: "1 azione", range: "90 m", duration: "Conc., 1 min", description: "Vortice/Tornado." },

    // --- GRADO 8 ---
    { name: "Antipatia/Simpatia", grade: 8, class: "Melder", time: "1 ora", range: "18 m", duration: "10 gg", description: "Attrae o respinge." },
    { name: "Dominazione Superiore", grade: 8, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 1 ora", description: "Domina mostro." },
    { name: "Frattura Mentale", grade: 8, class: "Melder", time: "1 azione", range: "45 m", duration: "Istantanea", description: "Azzera intelligenza." },
    { name: "Negazione Superiore", grade: 8, class: "Melder", time: "1 azione", range: "Self", duration: "Conc., 1 ora", description: "Campo anti-magia." },
    { name: "Sovraccarico Psichico", grade: 8, class: "Melder", time: "1 azione", range: "18 m", duration: "Istantanea", description: "Stordimento garantito." },
    { name: "Telepatia", grade: 8, class: "Melder", time: "1 azione", range: "Illimitata", duration: "24 ore", description: "Link mentale." },
    { name: "Tempesta Contorta", grade: 8, class: "Melder", time: "1 azione", range: "150 m", duration: "Conc., 1 min", description: "Terremoto." },
    { name: "Vortice Oscuro", grade: 8, class: "Melder", time: "1 azione", range: "45 m", duration: "Istantanea", description: "Esplosione solare necrotica." },
    { name: "Vuoto Mentale", grade: 8, class: "Melder", time: "1 azione", range: "Tocco", duration: "24 ore", description: "Immunità mentale." },
    { name: "Zona Fantasma", grade: 8, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 10 min", description: "Labirinto." },

    // --- GRADO 9 ---
    { name: "Armatura Indistruttibile", grade: 9, class: "Melder", time: "1 azione", range: "Self", duration: "Conc., 10 min", description: "Invulnerabilità." },
    { name: "Mutaforma", grade: 9, class: "Melder", time: "1 azione", range: "Self", duration: "Conc., 1 ora", description: "Polimorfia reale." },
    { name: "Preveggenza", grade: 9, class: "Melder", time: "1 min", range: "Tocco", duration: "8 ore", description: "Vantaggio su tutto." },
    { name: "Prigione Cosmica", grade: 9, class: "Melder", time: "1 min", range: "9 m", duration: "Perm.", description: "Imprigionare." },
    { name: "Stasi Temporale", grade: 9, class: "Melder", time: "1 azione", range: "Self", duration: "Istantanea", description: "Fermare il tempo." },
    { name: "Tempesta di Curvatura", grade: 9, class: "Melder", time: "1 azione", range: "1,5 km", duration: "Istantanea", description: "Sciame di meteore." },
    { name: "Terminare Funzione", grade: 9, class: "Melder", time: "1 azione", range: "18 m", duration: "Istantanea", description: "Parola potere: Uccidere." },
    { name: "Trama Cosmica", grade: 9, class: "Melder", time: "1 azione", range: "Self", duration: "Istantanea", description: "Desiderio." },
    { name: "Trasmutazione Totale", grade: 9, class: "Melder", time: "1 azione", range: "18 m", duration: "Conc., 1 ora", description: "Polimorfia di massa." },
    { name: "Zona di Terrore", grade: 9, class: "Melder", time: "1 azione", range: "Self", duration: "Istantanea", description: "Urlo psichico." },

    // ==========================================
    // CLASSE: SPECIALISTA (Artificio)
    // ==========================================

    // GRADO 0 (PRIME)
    { name: "Analisi Rapida", grade: 0, class: "Specialista", time: "1 azione", range: "18 m", duration: "Istantanea", description: "Individui resistenze/vulnerabilità di un bersaglio." },
    { name: "Calcolo Balistico", grade: 0, class: "Specialista", time: "1 azione", range: "9 m", duration: "Conc., 1 round", description: "Vantaggio al primo attacco nel prossimo turno." },
    { name: "Diversivo Sonoro", grade: 0, class: "Specialista", time: "1 azione", range: "18 m", duration: "1 min", description: "Crei suoni per distrarre (passi, voci)." },
    { name: "Hackeraggio Flash", grade: 0, class: "Specialista", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Apri/Attivi serrature elettroniche semplici istantaneamente." },
    { name: "Lama Nascosta", grade: 0, class: "Specialista", time: "1 bonus", range: "Self", duration: "Istantanea", description: "Estrai e attacchi con arma nascosta a sorpresa." },
    { name: "Messaggio Fantasma", grade: 0, class: "Specialista", time: "1 azione", range: "Tocco", duration: "Perm.", description: "Lasci messaggio olografico invisibile." },
    { name: "Rampino Tattico", grade: 0, class: "Specialista", time: "1 bonus", range: "9 m", duration: "Istantanea", description: "Ti tiri verso superficie o attiri oggetto (5kg)." },
    { name: "Riparazione d'Emergenza", grade: 0, class: "Specialista", time: "1 min", range: "Tocco", duration: "Istantanea", description: "Ripari piccolo oggetto o strappo." },
    { name: "Segnale Criptato", grade: 0, class: "Specialista", time: "1 azione", range: "36 m", duration: "1 round", description: "Messaggio silenzioso e vantaggio attacco alleato." },
    { name: "Spray Marcatore", grade: 0, class: "Specialista", time: "1 azione", range: "3 m", duration: "1 ora", description: "Marchi bersaglio invisibilmente. Vantaggio a tracciarlo." },
    { name: "Torcia Chimica", grade: 0, class: "Specialista", time: "1 azione", range: "Tocco", duration: "1 ora", description: "Luce chimica intensa 6m + fioca 6m." },

    // GRADO 1
    { name: "Caduta Frenata", grade: 1, class: "Specialista", time: "1 reazione", range: "Self", duration: "1 min", description: "Rallenti caduta, zero danni (Grav-Chute)." },
    { name: "Colpo Stordente", grade: 1, class: "Specialista", time: "1 azione", range: "Mischia", duration: "Istantanea", description: "1d8 fulmine e nega reazioni (Taser)." },
    { name: "Deflettore Cinetico", grade: 1, class: "Specialista", time: "1 reazione", range: "Self", duration: "1 round", description: "+5 CA contro un attacco." },
    { name: "Granata Fumogena", grade: 1, class: "Specialista", time: "1 azione", range: "18 m", duration: "1 min", description: "Nube oscura raggio 6m." },
    { name: "Identificare Tech", grade: 1, class: "Specialista", time: "1 min", range: "Tocco", duration: "Istantanea", description: "Analizzi proprietà oggetto tecnologico." },
    { name: "Maschera Olografica", grade: 1, class: "Specialista", time: "1 azione", range: "Self", duration: "1 ora", description: "Cambi aspetto (Disguise Self)." },
    { name: "Olio Tattico", grade: 1, class: "Specialista", time: "1 azione", range: "18 m", duration: "1 min", description: "Terreno scivoloso (Unto)." },
    { name: "Passo Silenzioso", grade: 1, class: "Specialista", time: "1 azione", range: "Self", duration: "1 ora", description: "Vantaggio Furtività, no tracce." },
    { name: "Rete Tattica", grade: 1, class: "Specialista", time: "1 azione", range: "9 m", duration: "Conc., 10 min", description: "+1d4 attacco a 3 alleati (Bless tech)." },
    { name: "Scatto di Adrenalina", grade: 1, class: "Specialista", time: "1 bonus", range: "Self", duration: "Istantanea", description: "Scatto/Disimpegno immediato, salto doppio." },
    { name: "Sensori di Prossimità", grade: 1, class: "Specialista", time: "1 azione", range: "9 m", duration: "8 ore", description: "Allarme area (3 sensori)." },
    { name: "Traduttore Universale", grade: 1, class: "Specialista", time: "1 azione", range: "Self", duration: "1 ora", description: "Comprendi lingue." },

    // GRADO 2
    { name: "Arrampicata del Ragno", grade: 2, class: "Specialista", time: "1 azione", range: "Self", duration: "1 ora", description: "Cammini su pareti/soffitti." },
    { name: "Dardo Soporifero", grade: 2, class: "Specialista", time: "1 azione", range: "18 m", duration: "1 min", description: "Addormenta bersaglio (HP basato)." },
    { name: "Decoy Olografici", grade: 2, class: "Specialista", time: "1 azione", range: "Self", duration: "1 min", description: "Copie illusorie (Mirror Image)." },
    { name: "Occultamento Ottico", grade: 2, class: "Specialista", time: "1 azione", range: "Self", duration: "Conc., 1 ora", description: "Invisibilità." },
    { name: "Rete di Contenimento", grade: 2, class: "Specialista", time: "1 azione", range: "18 m", duration: "Conc., 1 ora", description: "Intrappola in area (Ragnatela)." },
    { name: "Rilevatore di Trappole", grade: 2, class: "Specialista", time: "1 azione", range: "36 m", duration: "Istantanea", description: "Trova trappole." },
    { name: "Scassinatore Digitale", grade: 2, class: "Specialista", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Apre serrature CD 20 o vantaggio." },
    { name: "Silenzio Assoluto", grade: 2, class: "Specialista", time: "1 azione", range: "36 m", duration: "Conc., 10 min", description: "Sfera silenzio 6m." },
    { name: "Visione Termica", grade: 2, class: "Specialista", time: "1 bonus", range: "Self", duration: "1 ora", description: "Vedi calore attraverso muri sottili." },

    // GRADO 3
    { name: "Drone Esploratore", grade: 3, class: "Specialista", time: "10 min", range: "Illimitata", duration: "Conc., 1 ora", description: "Sensore remoto volante." },
    { name: "Fantasma nella Macchina", grade: 3, class: "Specialista", time: "1 azione", range: "Tocco", duration: "1 ora", description: "Controlli sistemi connessi a distanza." },
    { name: "Granata Stordente", grade: 3, class: "Specialista", time: "1 azione", range: "18 m", duration: "Istantanea", description: "Acceca e assorda in area (Flashbang)." },
    { name: "Haste (Sovraccarico)", grade: 3, class: "Specialista", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Velocità x2, +2 CA, Azione extra." },
    { name: "Jammer di Frequenza", grade: 3, class: "Specialista", time: "1 azione", range: "Self", duration: "8 ore", description: "Anti-individuazione/divinazione." },
    { name: "Jetpack", grade: 3, class: "Specialista", time: "1 azione", range: "Self", duration: "Conc., 10 min", description: "Volo 18m." },
    { name: "Nube Tossica", grade: 3, class: "Specialista", time: "1 azione", range: "27 m", duration: "Conc., 1 min", description: "Gas velenoso 3d6." },
    { name: "Proiettore Olografico", grade: 3, class: "Specialista", time: "1 azione", range: "36 m", duration: "Conc., 10 min", description: "Illusione maggiore." },
    { name: "Rebreather", grade: 3, class: "Specialista", time: "1 azione", range: "Self", duration: "24 ore", description: "Respiro in acqua/vuoto per gruppo." },

    // GRADO 4
    { name: "Campo Cinetico", grade: 4, class: "Specialista", time: "1 azione", range: "Self", duration: "Conc., 1 ora", description: "Resistenza danni fisici (Pelle di pietra)." },
    { name: "Confusione Neurale", grade: 4, class: "Specialista", time: "1 azione", range: "27 m", duration: "Conc., 1 min", description: "Confusione in area." },
    { name: "Libertà di Movimento", grade: 4, class: "Specialista", time: "1 azione", range: "Self", duration: "1 ora", description: "Immunità paralisi/trattenuto." },
    { name: "Localizzatore Perfetto", grade: 4, class: "Specialista", time: "1 azione", range: "Illimitata", duration: "Conc., 1 ora", description: "Trova creatura/oggetto (Localizza)." },
    { name: "Occhio Arcano", grade: 4, class: "Specialista", time: "1 azione", range: "9 m", duration: "Conc., 1 ora", description: "Drone spia invisibile." },
    { name: "Passaggio Dimensionale", grade: 4, class: "Specialista", time: "1 azione", range: "150 m", duration: "Istantanea", description: "Teletrasporto (Blink/Porta)." },

    // ==========================================
    // CLASSE: GUERRIERO (Tecniche Marziali)
    // ==========================================

    // --- STILI (Grado 0 - Selezionabili) ---
    { name: "Stile: Difesa", grade: 0, class: "Guerriero", time: "Passivo", range: "Self", duration: "Perm.", description: "+1 alla CA quando indossi armatura." },
    { name: "Stile: Duellare", grade: 0, class: "Guerriero", time: "Passivo", range: "Self", duration: "Perm.", description: "+2 ai danni con arma da mischia in una mano." },
    { name: "Stile: Armi Grandi", grade: 0, class: "Guerriero", time: "Passivo", range: "Self", duration: "Perm.", description: "Ritira 1 o 2 ai danni con armi a due mani." },
    { name: "Stile: Artiglieria", grade: 0, class: "Guerriero", time: "Passivo", range: "Self", duration: "Perm.", description: "Riduci il rinculo delle armi da fuoco di 1." },
    { name: "Stile: Protezione", grade: 0, class: "Guerriero", time: "Reazione", range: "1,5 m", duration: "Istantanea", description: "Svantaggio a un attacco contro un alleato." },
    { name: "Stile: Deterrenza", grade: 0, class: "Guerriero", time: "Reazione", range: "1,5 m", duration: "Istantanea", description: "AdO se un nemico spara a distanza." },
    { name: "Stile: Tiro Ravvicinato", grade: 0, class: "Guerriero", time: "Passivo", range: "Self", duration: "Perm.", description: "Nessun svantaggio attacchi distanza in mischia." },
    { name: "Stile: Tiro di Precisione", grade: 0, class: "Guerriero", time: "Passivo", range: "Self", duration: "Perm.", description: "+2 ai tiri per colpire a distanza." },
    { name: "Stile: Due Armi", grade: 0, class: "Guerriero", time: "Passivo", range: "Self", duration: "Perm.", description: "Aggiungi mod caratteristica al danno secondario." },

    // --- PARAGON (Abilità Fisse - Non selezionabili, appaiono per livello) ---
    { name: "Colpo Infuso", grade: 1, class: "Guerriero", time: "Az. Bonus", range: "Self", duration: "1 turno", description: "Vantaggio TxC e +Mod. Cost ai danni. (3 cariche)", usesResource: "paragon" },
    { name: "Sopravvissuto", grade: 1, class: "Guerriero", time: "Inizio Turno", range: "Self", duration: "Istantanea", description: "Se PF < 50% e > 0, recuperi 5 + Mod. Cost PF.", usesResource: "paragon_passive" },

    // --- COMMANDO (Prodezze - Non selezionabili, appaiono TUTTE al liv 3) ---
    { name: "Contrattacco", grade: 1, class: "Guerriero", time: "Reazione", range: "Mischia", duration: "Istantanea", description: "Se mancato in mischia: Attacca il nemico. Aggiungi il Dado Prodezza ai danni." },
    { name: "Doppio Colpo", grade: 1, class: "Guerriero", time: "Speciale", range: "1,5 m", duration: "Istantanea", description: "Se colpisci: Danneggi un secondo nemico vicino. Danno = Dado Prodezza." },
    { name: "Spinta Extra", grade: 1, class: "Guerriero", time: "Gratuita", range: "Self", duration: "Istantanea", description: "Aggiungi il Dado Prodezza a una prova di Forza o Destrezza." },
    { name: "Esplosione Lampo", grade: 1, class: "Guerriero", time: "Speciale", range: "Arma", duration: "Istantanea", description: "Se colpisci: Aggiungi Dado ai danni. Bersaglio TS Des o Accecato." },
    { name: "Marchio del Guardiano", grade: 1, class: "Guerriero", time: "Bonus/Reaz", range: "Vicinanza", duration: "Variabile", description: "Marchi nemico. Se attacca altri, Reazione per attaccarlo (aggiungi Dado a colpire)." },
    { name: "Parata", grade: 1, class: "Guerriero", time: "Reazione", range: "Self", duration: "Istantanea", description: "Se colpito: Aggiungi Dado alla CA. Se manca, dimezzi comunque i danni." },
    { name: "Colpo di Precisione", grade: 1, class: "Guerriero", time: "Gratuita", range: "Self", duration: "Istantanea", description: "Aggiungi il Dado al Tiro per Colpire (dichiara prima o dopo)." },
    { name: "Colpo Rapido", grade: 1, class: "Guerriero", time: "Az. Bonus", range: "Mischia", duration: "Istantanea", description: "Attacco senz'armi/improvvisato. Danno = Dado. Niente AdO." },
    { name: "Fuoco di Ritorno", grade: 1, class: "Guerriero", time: "Reazione", range: "Distanza", duration: "Istantanea", description: "Se mancato a distanza: Rispondi al fuoco. Aggiungi Dado a colpire." },
    { name: "Attacco di Spinta", grade: 1, class: "Guerriero", time: "Speciale", range: "Mischia", duration: "Istantanea", description: "Se colpisci: Aggiungi Dado ai danni. Nemico TS Forza o spinto 3m e Prono." },
    { name: "Passo Sicuro", grade: 1, class: "Guerriero", time: "Az. Bonus", range: "Self", duration: "1 round", description: "Aggiungi Dado ai TS Forza/Des contro movimento forzato/prono." },
    { name: "Lancio Mirato", grade: 1, class: "Guerriero", time: "Speciale", range: "Distanza", duration: "Istantanea", description: "Aggiungi Dado a prova Atletica (Granate) o TxC Lanciagranate." },
    { name: "Colpo di Squadra", grade: 1, class: "Guerriero", time: "Reazione", range: "Alleato", duration: "Istantanea", description: "Se colpisci: Rinunci al danno base. Un alleato attacca (aggiunge il tuo Dado al TxC)." },
    { name: "Manovra Acrobatica", grade: 1, class: "Guerriero", time: "Movimento", range: "Self", duration: "Turno", description: "Aggiungi il Dado alla CA finché ti muovi." },
    // Livello 10+
    { name: "Carica di Comando", grade: 1, class: "Guerriero", time: "Speciale", range: "Alleati", duration: "Istantanea", description: "(Liv 10+) Con Azione Impetuosa: 2 alleati usano Reazione per attaccare." },
    { name: "Vento Coraggioso", grade: 1, class: "Guerriero", time: "Speciale", range: "Alleati", duration: "Istantanea", description: "(Liv 10+) Con Recuperare Energie: 3 alleati recuperano PF pari al Dado." },
    { name: "Carica Esplosiva", grade: 1, class: "Guerriero", time: "Azione", range: "Tocco", duration: "1 round", description: "(Liv 10+) Attacchi esplosivo. Prossimo turno: Danni fuoco = Dado e TS Cost o Stordito." },

    // ==========================================
    // CLASSE: MISTICO (Canalizzazione Saggezza)
    // ==========================================

    // --- GRADO 0 (PRIME) ---
    { name: "Guida Spirituale", grade: 0, class: "Mistico", time: "1 azione", range: "Tocco", duration: "Conc., 1 min", description: "+1d4 a una prova di caratteristica." },
    { name: "Interferenza Psichica", grade: 0, class: "Mistico", time: "1 azione", range: "18 metri", duration: "1 round", description: "1d6 danni psichici e no reazioni." },
    { name: "Luce dell'Anima", grade: 0, class: "Mistico", time: "1 azione", range: "Tocco", duration: "1 ora", description: "Oggetto emette luce (6m + 6m)." },
    { name: "Nesso Sensoriale", grade: 0, class: "Mistico", time: "1 azione", range: "9 metri", duration: "1 round", description: "Conosci stato emotivo e posizione bersaglio." },
    { name: "Sguardo Rassicurante", grade: 0, class: "Mistico", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Nuovo TS con vantaggio contro Paura." },
    { name: "Stabilizzare", grade: 0, class: "Mistico", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Stabilizzi creatura a 0 PF." },
    { name: "Tocco della Resistenza", grade: 0, class: "Mistico", time: "1 azione", range: "Tocco", duration: "Conc., 1 min", description: "+1d4 a un Tiro Salvezza." },

    // --- GRADO 1 ---
    { name: "Anatema", grade: 1, class: "Mistico", time: "1 azione", range: "9 metri", duration: "Conc., 1 min", description: "3 bersagli sottraggono 1d4 a TxC e TS." },
    { name: "Benedizione Cosmica", grade: 1, class: "Mistico", time: "1 azione", range: "9 metri", duration: "Conc., 1 min", description: "3 bersagli aggiungono 1d4 a TxC e TS." },
    { name: "Comando Mentale", grade: 1, class: "Mistico", time: "1 azione", range: "18 metri", duration: "1 round", description: "Imponi una parola di comando (fuggire, cadere, ecc)." },
    { name: "Dardo Radiante", grade: 1, class: "Mistico", time: "1 azione", range: "36 metri", duration: "1 round", description: "4d6 radianti e vantaggio al prossimo attacco." },
    { name: "Infusione Vitale", grade: 1, class: "Mistico", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Cura 1d8 + Mod. Saggezza." },
    { name: "Parola di Conforto", grade: 1, class: "Mistico", time: "1 bonus", range: "18 metri", duration: "Istantanea", description: "Cura 1d4 + Mod. Saggezza a distanza." },
    { name: "Rilevazione dell'Aura", grade: 1, class: "Mistico", time: "1 azione", range: "Self", duration: "Conc., 10 min", description: "Percepisci creature extra-planari o non morti." },
    { name: "Santuario", grade: 1, class: "Mistico", time: "1 bonus", range: "9 metri", duration: "1 min", description: "Nemici devono superare TS Sag per attaccare il bersaglio." },
    { name: "Scudo Psichico", grade: 1, class: "Mistico", time: "1 bonus", range: "18 metri", duration: "Conc., 10 min", description: "+2 alla CA." },

    // --- GRADO 2 ---
    { name: "Arma Spirituale", grade: 2, class: "Mistico", time: "1 bonus", range: "18 metri", duration: "1 min", description: "Arma spettrale attacca (1d8 + Sag forza)." },
    { name: "Calmare Emozioni", grade: 2, class: "Mistico", time: "1 azione", range: "18 metri", duration: "Conc., 1 min", description: "Sopprimi paura/charme o ostilità." },
    { name: "Cecità/Sordità", grade: 2, class: "Mistico", time: "1 azione", range: "9 metri", duration: "1 min", description: "Acceca o assorda bersaglio." },
    { name: "Legame di Protezione", grade: 2, class: "Mistico", time: "1 azione", range: "Tocco", duration: "1 ora", description: "+1 CA/TS, resistenza danni, ma condividi danno." },
    { name: "Preghiera di Guarigione", grade: 2, class: "Mistico", time: "10 min", range: "9 metri", duration: "Istantanea", description: "Cura 6 creature di 2d8 + Sag." },
    { name: "Restaurare Inferiore", grade: 2, class: "Mistico", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Cura condizioni (cieco, sordo, paralizzato, veleno)." },
    { name: "Silenzio", grade: 2, class: "Mistico", time: "1 azione", range: "36 metri", duration: "Conc., 10 min", description: "Sfera di silenzio assoluto 6m." },
    { name: "Zona di Verità", grade: 2, class: "Mistico", time: "1 azione", range: "18 metri", duration: "10 min", description: "Impossibile mentire nell'area." },
    // Special: Connessione Empatica
    { name: "Legame di Dolore", grade: 2, class: "Mistico", exclusiveSpec: "empatico", time: "1 reazione", range: "18 metri", duration: "Istantanea", description: "Dividi danni subiti da alleato con l'attaccante." },

    // --- GRADO 3 ---
    { name: "Chiaroveggenza", grade: 3, class: "Mistico", time: "10 min", range: "1,5 km", duration: "Conc., 10 min", description: "Sensore remoto visivo o uditivo." },
    { name: "Dissolvi Magia/Potere", grade: 3, class: "Mistico", time: "1 azione", range: "36 metri", duration: "Istantanea", description: "Termina effetti o incantesimi." },
    { name: "Faro di Speranza", grade: 3, class: "Mistico", time: "1 azione", range: "9 metri", duration: "Conc., 1 min", description: "Vantaggio TS Sag/Morte, cure massimizzate." },
    { name: "Guarigione di Massa (Parola)", grade: 3, class: "Mistico", time: "1 bonus", range: "18 metri", duration: "Istantanea", description: "Cura 6 creature 1d4 + Sag." },
    { name: "Revivificare", grade: 3, class: "Mistico", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Riporta in vita morto da <1 min." },
    { name: "Rimuovi Maledizione", grade: 3, class: "Mistico", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Rimuove maledizioni." },
    { name: "Spiriti Guardiani", grade: 3, class: "Mistico", time: "1 azione", range: "Self", duration: "Conc., 10 min", description: "Area dannosa (3d8) e rallentante attorno a te." },
    // Special: Connessione Guaritore
    { name: "Trasfusione Vitale", grade: 3, class: "Mistico", exclusiveSpec: "guaritore", time: "1 azione", range: "9 metri", duration: "Istantanea", description: "Subisci 4d8 necrotici, curi il doppio a un alleato." },

    // --- GRADO 4 ---
    { name: "Esilio", grade: 4, class: "Mistico", time: "1 azione", range: "18 metri", duration: "Conc., 1 min", description: "Bandi creatura su altro piano." },
    { name: "Guardiano della Fede", grade: 4, class: "Mistico", time: "1 azione", range: "9 metri", duration: "8 ore", description: "Guardiano immobile infligge danni." },
    { name: "Interdizione alla Morte", grade: 4, class: "Mistico", time: "1 azione", range: "Tocco", duration: "8 ore", description: "La prima volta che vai a 0 PF, resti a 1." },
    { name: "Libertà di Movimento", grade: 4, class: "Mistico", time: "1 azione", range: "Tocco", duration: "1 ora", description: "Immunità paralisi, trattenuto, terreno difficile." },
    { name: "Localizza Creatura", grade: 4, class: "Mistico", time: "1 azione", range: "Self", duration: "Conc., 1 ora", description: "Trova creatura nota entro 300m." },
    // Special: Connessione Guaritore
    { name: "Aura di Vita", grade: 4, class: "Mistico", exclusiveSpec: "guaritore", time: "1 azione", range: "Self", duration: "Conc., 10 min", description: "Resistenza necrotica, rialza da 0 PF." },
    // Special: Connessione Empatica
    { name: "Rete Empatica", grade: 4, class: "Mistico", exclusiveSpec: "empatico", time: "1 azione", range: "9 metri", duration: "1 ora", description: "Link mentale 4 creature, condividono bonus." },

    // --- GRADO 5 ---
    { name: "Colpo Fiammeggiante", grade: 5, class: "Mistico", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Colonna di fuoco (4d6 fuoco + 4d6 radianti)." },
    { name: "Guarigione di Massa", grade: 5, class: "Mistico", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Cura 6 creature 3d8 + Sag." },
    { name: "Legame Telepatico", grade: 5, class: "Mistico", time: "1 azione", range: "9 metri", duration: "1 ora", description: "Link mentale di gruppo." },
    { name: "Restaurare Superiore", grade: 5, class: "Mistico", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Rimuovi esaurimento, charme, pietrificazione." },
    { name: "Rianimare Morti", grade: 5, class: "Mistico", time: "1 ora", range: "Tocco", duration: "Istantanea", description: "Resurrezione (<10 giorni)." },
    // Special: Connessione Empatica
    { name: "Feedback Psichico", grade: 5, class: "Mistico", exclusiveSpec: "empatico", time: "1 reazione", range: "18 metri", duration: "Istantanea", description: "Nemico subisce metà danni inflitti a legato e Stordito." },

    // --- GRADO 6 ---
    { name: "Banchetto degli Eroi", grade: 6, class: "Mistico", time: "10 min", range: "9 metri", duration: "Istantanea", description: "Immunità paura/veleno, vantaggi Sag, +PF." },
    { name: "Guarigione", grade: 6, class: "Mistico", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Cura 70 PF, rimuove cecità/malattie." },
    { name: "Parola del Ritiro", grade: 6, class: "Mistico", time: "1 azione", range: "1,5 metri", duration: "Istantanea", description: "Teletrasporto gruppo al santuario." },
    { name: "Vera Vista", grade: 6, class: "Mistico", time: "1 azione", range: "Tocco", duration: "1 ora", description: "Visione del vero 36m." },
    // Special: Connessione Guaritore
    { name: "Santuario di Massa", grade: 6, class: "Mistico", exclusiveSpec: "guaritore", time: "1 azione", range: "18 metri", duration: "Conc., 1 min", description: "Santuario su tutti e rigenerazione." },

    // --- GRADO 7 ---
    { name: "Forma Eterea", grade: 7, class: "Mistico", time: "1 azione", range: "Self", duration: "8 ore", description: "Diventi etereo e intangibile." },
    { name: "Resurrezione", grade: 7, class: "Mistico", time: "1 ora", range: "Tocco", duration: "Istantanea", description: "Riporta in vita (<100 anni)." },
    { name: "Rigenerazione", grade: 7, class: "Mistico", time: "1 min", range: "Tocco", duration: "1 ora", description: "4d8+15 PF, rigenera 1 PF/round." },

    // --- GRADO 8 ---
    { name: "Aura Sacra", grade: 8, class: "Mistico", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Vantaggio TS alleati, svantaggio attacchi nemici." },
    { name: "Vuoto Mentale", grade: 8, class: "Mistico", time: "1 azione", range: "Tocco", duration: "24 ore", description: "Immunità danni psichici e divinazione." },

    // --- GRADO 9 ---
    { name: "Guarigione di Massa Suprema", grade: 9, class: "Mistico", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Cura 700 PF distribuiti." },
    { name: "Previsione", grade: 9, class: "Mistico", time: "1 min", range: "Tocco", duration: "8 ore", description: "Vantaggio su tutto, nemici svantaggio." },
    { name: "Resurrezione Verace", grade: 9, class: "Mistico", time: "1 ora", range: "Tocco", duration: "Istantanea", description: "Resurrezione perfetta (<200 anni)." },

    // ==========================================
    // CLASSE: SOLARIANO (Rivelazioni Stellari)
    // ==========================================

    // --- GRADO 0 (PRIME - A Volontà) ---
    { name: "Attrazione Minore", grade: 0, class: "Solariano", time: "1 azione", range: "9 metri", duration: "Istantanea", description: "Attiri oggetto o creatura (1,5m). [Gravitone]" },
    { name: "Colpo Stellare", grade: 0, class: "Solariano", time: "Attacco", range: "Mischia", duration: "Istantanea", description: "Colpo che punisce il movimento (1d8 forza se si muove). [Gravitone]" },
    { name: "Fiamma Sacra (Stellare)", grade: 0, class: "Solariano", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Danni radianti 1d8 (TS Des). [Fotone]" },
    { name: "Luce Guida", grade: 0, class: "Solariano", time: "1 azione", range: "Tocco", duration: "1 ora", description: "Oggetto emette luce. [Fotone]" },
    { name: "Resistenza", grade: 0, class: "Solariano", time: "1 azione", range: "Tocco", duration: "Conc., 1 min", description: "+1d4 a un TS." },
    { name: "Stabilità Gravitazionale", grade: 0, class: "Solariano", time: "1 azione", range: "Self", duration: "1 min", description: "Vantaggio contro spinta/prono. [Gravitone]" },

    // --- GRADO 1 ---
    { name: "Armatura di Agathys (Vuoto)", grade: 1, class: "Solariano", time: "1 azione", range: "Self", duration: "1 ora", description: "5 PF Temporanei e 5 danni freddo a chi colpisce in mischia. [Gravitone]" },
    { name: "Assorbire Elementi", grade: 1, class: "Solariano", time: "1 reazione", range: "Self", duration: "1 round", description: "Resistenza e danni extra al prossimo attacco. [Fotone]" },
    { name: "Attrazione del Buco Nero", grade: 1, class: "Solariano", time: "1 bonus", range: "9 metri", duration: "Istantanea", description: "Trascini nemico 4,5m verso di te. [Gravitone]" },
    { name: "Dardo Guida", grade: 1, class: "Solariano", time: "1 azione", range: "36 metri", duration: "1 round", description: "4d6 radianti e vantaggio prossimo attacco. [Fotone]" },
    { name: "Duello Compulsivo", grade: 1, class: "Solariano", time: "1 bonus", range: "9 metri", duration: "Conc., 1 min", description: "Costringi nemico a combattere te. [Gravitone]" },
    { name: "Esplosione Supernova", grade: 1, class: "Solariano", time: "1 azione", range: "Self (3m)", duration: "Istantanea", description: "AOE Radianti 2d6 a tutti entro 3m. [Fotone]" },
    { name: "Mani Brucianti (Solare)", grade: 1, class: "Solariano", time: "1 azione", range: "Cono 4,5m", duration: "Istantanea", description: "3d6 danni da fuoco. [Fotone]" },
    { name: "Punizione Divina (Solare)", grade: 1, class: "Solariano", time: "1 bonus", range: "Self", duration: "Conc., 1 min", description: "Attacco fa 2d6 radianti extra. [Fotone]" },
    { name: "Scudo della Fede (Gravità)", grade: 1, class: "Solariano", time: "1 bonus", range: "18 metri", duration: "Conc., 10 min", description: "+2 CA distorcendo lo spazio. [Gravitone]" },

    // --- GRADO 2 ---
    { name: "Arma Magica (Stellare)", grade: 2, class: "Solariano", time: "1 bonus", range: "Tocco", duration: "Conc., 1 ora", description: "Arma diventa magica +1." },
    { name: "Bagliore Accecante", grade: 2, class: "Solariano", time: "1 reazione", range: "18 metri", duration: "Istantanea", description: "Accechi attaccante e svantaggio. [Fotone]" },
    { name: "Blocca Persone (Presa)", grade: 2, class: "Solariano", time: "1 azione", range: "18 metri", duration: "Conc., 1 min", description: "Paralizzi umanoide con gravità. [Gravitone]" },
    { name: "Oscurità", grade: 2, class: "Solariano", time: "1 azione", range: "18 metri", duration: "Conc., 10 min", description: "Sfera oscurità magica. [Gravitone]" },
    { name: "Passo Brumoso (Salto)", grade: 2, class: "Solariano", time: "1 bonus", range: "Self", duration: "Istantanea", description: "Teletrasporto 9m. [Gravitone]" },
    { name: "Punizione Marchiante", grade: 2, class: "Solariano", time: "1 bonus", range: "Self", duration: "Conc., 1 min", description: "Danni radianti e rivela invisibili. [Fotone]" },
    { name: "Raggio Rovente", grade: 2, class: "Solariano", time: "1 azione", range: "36 metri", duration: "Istantanea", description: "3 raggi di fuoco (2d6 l'uno). [Fotone]" },
    { name: "Scatto Stellare", grade: 2, class: "Solariano", time: "1 bonus", range: "Self", duration: "1 round", description: "Volo 9m fino a fine turno. [Fotone]" },

    // --- GRADO 3 ---
    { name: "Campo di Densità", grade: 3, class: "Solariano", time: "1 reazione", range: "Self", duration: "Istantanea", description: "Riduci danni subiti pari a Livello+Car. [Gravitone]" },
    { name: "Lama del Sole", grade: 3, class: "Solariano", time: "1 azione", range: "Mischia", duration: "Istantanea", description: "Attacco fuoco e incendio continuo. [Fotone]" },
    { name: "Lentezza (Pozzo Grav.)", grade: 3, class: "Solariano", time: "1 azione", range: "36 metri", duration: "Conc., 1 min", description: "Rallenti tempo/gravità in cubo 12m. [Gravitone]" },
    { name: "Luce Diurna", grade: 3, class: "Solariano", time: "1 azione", range: "18 metri", duration: "1 ora", description: "Luce solare intensa 18m. [Fotone]" },
    { name: "Muro di Vento (Gravità)", grade: 3, class: "Solariano", time: "1 azione", range: "36 metri", duration: "Conc., 1 min", description: "Muro gravitazionale blocca proiettili. [Gravitone]" },
    { name: "Palla di Fuoco (Solare)", grade: 3, class: "Solariano", time: "1 azione", range: "45 metri", duration: "Istantanea", description: "Esplosione 8d6 fuoco. [Fotone]" },
    { name: "Punizione Accecante", grade: 3, class: "Solariano", time: "1 bonus", range: "Self", duration: "Conc., 1 min", description: "3d8 radianti extra e cecità. [Fotone]" },
    { name: "Volare", grade: 3, class: "Solariano", time: "1 azione", range: "Tocco", duration: "Conc., 10 min", description: "Volo 18m (manipolazione gravità). [Gravitone]" },

    // --- GRADO 4 ---
    { name: "Esilio", grade: 4, class: "Solariano", time: "1 azione", range: "18 metri", duration: "Conc., 1 min", description: "Bandi nel vuoto/altro piano. [Gravitone]" },
    { name: "Gravità Nera", grade: 4, class: "Solariano", time: "1 azione", range: "27 metri", duration: "Conc., 1 min", description: "Tentacoli neri: 3d6 contundenti e trattenuto. [Gravitone]" },
    { name: "Muro di Fuoco (Solare)", grade: 4, class: "Solariano", time: "1 azione", range: "36 metri", duration: "Conc., 1 min", description: "Muro fiamme opaco. 5d8 fuoco. [Fotone]" },
    { name: "Punizione Vacillante", grade: 4, class: "Solariano", time: "1 bonus", range: "Self", duration: "Conc., 1 min", description: "4d6 psichici e svantaggio attacchi/prove. [Gravitone]" },
    { name: "Schiacciamento Gravitazionale", grade: 4, class: "Solariano", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Cilindro gravità. 4d8 forza e prono. [Gravitone]" },
    { name: "Scudo di Fuoco (Stellare)", grade: 4, class: "Solariano", time: "1 azione", range: "Self", duration: "10 min", description: "Danni fuoco/freddo a chi ti colpisce. [Fotone]" },

    // --- GRADO 5 ---
    { name: "Cerchio di Potere", grade: 5, class: "Solariano", time: "1 azione", range: "Self", duration: "Conc., 10 min", description: "Vantaggio TS magici e Evasione per alleati. [Fotone]" },
    { name: "Colpo Infuocato", grade: 5, class: "Solariano", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Colonna fuoco divino. 4d6 fuoco + 4d6 radianti. [Fotone]" },
    { name: "Esplosione Coronale", grade: 5, class: "Solariano", time: "1 azione", range: "45 metri", duration: "Istantanea", description: "Alba. Sfera radiante 8d6. [Fotone]" },
    { name: "Muro di Forza", grade: 5, class: "Solariano", time: "1 azione", range: "36 metri", duration: "Conc., 10 min", description: "Barriera invisibile indistruttibile. [Gravitone]" },
    { name: "Punizione Bandente", grade: 5, class: "Solariano", time: "1 bonus", range: "Self", duration: "Conc., 1 min", description: "5d10 forza. Se scende a 50 PF, esilio. [Gravitone]" },
    { name: "Telecinesi", grade: 5, class: "Solariano", time: "1 azione", range: "18 metri", duration: "Conc., 10 min", description: "Manipolazione gravitazionale oggetti/creature. [Gravitone]" },

    // --- GRADO 6 ---
    { name: "Raggio Solare", grade: 6, class: "Solariano", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Linea radiante 6d8 continua. Acceca. [Fotone]" },
    { name: "Singolarità Solare", grade: 6, class: "Solariano", time: "1 azione", range: "18 metri", duration: "Conc., 1 min", description: "Buco nero. Attira e infligge danni forza. [Gravitone]" },

    // --- GRADO 7 ---
    { name: "Forma di Luce Pura", grade: 7, class: "Solariano", time: "1 bonus", range: "Self", duration: "1 min", description: "Avatar solare. Volo, Resistenze, danni a contatto. [Fotone]" },
    { name: "Tempesta di Fuoco", grade: 7, class: "Solariano", time: "1 azione", range: "45 metri", duration: "Istantanea", description: "Pioggia di fuoco 7d10. [Fotone]" },

    // --- GRADO 8 ---
    { name: "Esplosione Solare", grade: 8, class: "Solariano", time: "1 azione", range: "45 metri", duration: "Istantanea", description: "Esplosione solare 12d6 radianti e cecità. [Fotone]" },
    { name: "Orizzonte degli Eventi", grade: 8, class: "Solariano", time: "1 azione", range: "Self", duration: "Conc., 10 min", description: "Campo anti-magia e gravitazionale. [Gravitone]" },

    // --- GRADO 9 ---
    { name: "Sciame di Meteore", grade: 9, class: "Solariano", time: "1 azione", range: "1,5 km", duration: "Istantanea", description: "Distruzione totale. 20d6 fuoco + 20d6 contundenti. [Gravitone]" },
    { name: "Supernova Totale", grade: 9, class: "Solariano", time: "1 azione", range: "Self", duration: "Istantanea", description: "Esplosione finale. 20d6 fuoco + 20d6 radianti. [Fotone]" },

    // ==========================================
    // CLASSE: PARADOSSO (Canalizzazione Carisma)
    // ==========================================

    // --- GRADO 0 (PRIME) ---
    { name: "Déjà Vu", grade: 0, class: "Paradosso", time: "1 azione", range: "18 metri", duration: "1 round", description: "Ripetizione mentale. Svantaggio al primo attacco nemico." },
    { name: "Glitch", grade: 0, class: "Paradosso", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Errore nella realtà. 1d8 danni psichici e no reazioni." },
    { name: "Guida Probabilistica", grade: 0, class: "Paradosso", time: "1 azione", range: "Tocco", duration: "Conc., 1 min", description: "+1d4 a una prova di caratteristica." },
    { name: "Mano Spettrale", grade: 0, class: "Paradosso", time: "1 azione", range: "9 metri", duration: "1 min", description: "Mano di 'rumore bianco' per manipolare oggetti." },
    { name: "Manutenzione Temporale", grade: 0, class: "Paradosso", time: "1 min", range: "Tocco", duration: "Istantanea", description: "Ripari oggetto 'ricordando' quando era intatto." },
    { name: "Passo Falso", grade: 0, class: "Paradosso", time: "1 azione", range: "9 metri", duration: "Istantanea", description: "Sposti percezione terreno. Bersaglio cade prono." },
    { name: "Sesto Senso Temporale", grade: 0, class: "Paradosso", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Percepisci spostamenti temporali/teletrasporti recenti." },

    // --- GRADO 1 ---
    { name: "Armatura di Inerzia", grade: 1, class: "Paradosso", time: "1 azione", range: "Self", duration: "8 ore", description: "CA diventa 13 + Car." },
    { name: "Dissonanza Cognitiva", grade: 1, class: "Paradosso", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "3d6 psichici e reazione di fuga." },
    { name: "Fortuna del Principiante", grade: 1, class: "Paradosso", time: "1 bonus", range: "Self", duration: "Conc., 1 min", description: "Attacchi armi +1d4 radianti." },
    { name: "Proiettili Fantasma", grade: 1, class: "Paradosso", time: "1 azione", range: "36 metri", duration: "Istantanea", description: "3 dardi infallibili (1d4+1 forza)." },
    { name: "Promemoria dal Futuro", grade: 1, class: "Paradosso", time: "1 min", range: "Tocco", duration: "Istantanea", description: "Identificare oggetto tramite ricordi futuri." },
    { name: "Salto Cronale", grade: 1, class: "Paradosso", time: "1 bonus", range: "Self", duration: "Istantanea", description: "Teletrasporto 9m." },
    { name: "Scudo Entropico", grade: 1, class: "Paradosso", time: "1 reazione", range: "Self", duration: "1 round", description: "+5 CA contro un attacco." },

    // --- GRADO 2 ---
    { name: "Blocca Persone", grade: 2, class: "Paradosso", time: "1 azione", range: "18 metri", duration: "Conc., 1 min", description: "Congeli umanoide nel tempo." },
    { name: "Frantumare", grade: 2, class: "Paradosso", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "3d8 tuono in area." },
    { name: "Immagine Residua", grade: 2, class: "Paradosso", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Svantaggio agli attacchi contro di te." },
    { name: "Riavvolgere Ferita", grade: 2, class: "Paradosso", time: "1 bonus", range: "18 metri", duration: "Istantanea", description: "Cura 1d8 + Car o ripara oggetto." },
    { name: "Scambio Quantico", grade: 2, class: "Paradosso", time: "1 bonus", range: "9 metri", duration: "Istantanea", description: "Scambi posizione con creatura/oggetto." },
    { name: "Vedere l'Invisibile", grade: 2, class: "Paradosso", time: "1 azione", range: "Self", duration: "1 ora", description: "Vedi invisibile ed etereo." },
    // Special: Catastrofe
    { name: "Collasso Strutturale", grade: 2, class: "Paradosso", exclusiveSpec: "catastrofe", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Invecchi oggetto fino a distruggerlo o -2 CA armatura." },

    // --- GRADO 3 ---
    { name: "Accelerazione", grade: 3, class: "Paradosso", time: "1 azione", range: "9 metri", duration: "Conc., 1 min", description: "Velocità x2, +2 CA, Azione extra (Haste)." },
    { name: "Contro-Realtà", grade: 3, class: "Paradosso", time: "1 reazione", range: "18 metri", duration: "Istantanea", description: "Controincantesimo." },
    { name: "Decelerazione", grade: 3, class: "Paradosso", time: "1 azione", range: "36 metri", duration: "Conc., 1 min", description: "Rallenti tempo per nemici (Slow)." },
    { name: "Intermittenza", grade: 3, class: "Paradosso", time: "1 azione", range: "Self", duration: "1 min", description: "Salti tra timeline (Blink)." },
    { name: "Passo Dimensionale", grade: 3, class: "Paradosso", time: "1 azione", range: "27 metri", duration: "Istantanea", description: "Teletrasporto + Danni tuono all'arrivo." },
    { name: "Riavvolgimento Tattico", grade: 3, class: "Paradosso", time: "1 reazione", range: "9 metri", duration: "Istantanea", description: "Alleato colpito si sposta e dimezza danni." },
    // Special: Utopia
    { name: "Scudo dell'Egida Perfetta", grade: 3, class: "Paradosso", exclusiveSpec: "utopia", time: "1 reazione", range: "9 metri", duration: "1 round", description: "Immunità totale a una singola fonte di danno per 3 creature." },

    // --- GRADO 4 ---
    { name: "Confusione Temporale", grade: 4, class: "Paradosso", time: "1 azione", range: "27 metri", duration: "Conc., 1 min", description: "Confusione in area." },
    { name: "Esilio", grade: 4, class: "Paradosso", time: "1 azione", range: "18 metri", duration: "Conc., 1 min", description: "Bandi fuori dalla realtà." },
    { name: "Porta Dimensionale", grade: 4, class: "Paradosso", time: "1 azione", range: "150 metri", duration: "Istantanea", description: "Teletrasporto preciso con passeggero." },
    { name: "Sfera di Stasi", grade: 4, class: "Paradosso", time: "1 azione", range: "18 metri", duration: "Conc., 1 min", description: "Sfera invulnerabile (Resiliente)." },
    { name: "Tasca Fuori dal Tempo", grade: 4, class: "Paradosso", time: "1 azione", range: "Tocco", duration: "1 ora", description: "Nascondi oggetto/creatura." },

    // --- GRADO 5 ---
    { name: "Ancora Planare", grade: 5, class: "Paradosso", time: "1 azione", range: "18 metri", duration: "1 ora", description: "Blocchi spostamenti dimensionali." },
    { name: "Cerchio di Teletrasporto", grade: 5, class: "Paradosso", time: "1 min", range: "3 metri", duration: "1 round", description: "Portale stabile." },
    { name: "Dominare Persone", grade: 5, class: "Paradosso", time: "1 azione", range: "18 metri", duration: "Conc., 1 min", description: "Controlli umanoide." },
    { name: "Modificare Memoria", grade: 5, class: "Paradosso", time: "1 azione", range: "9 metri", duration: "Conc., 1 min", description: "Riscrivi passato recente." },
    { name: "Muro di Forza", grade: 5, class: "Paradosso", time: "1 azione", range: "36 metri", duration: "Conc., 10 min", description: "Barriera invisibile." },
    // Special: Catastrofe
    { name: "Zona Morta", grade: 5, class: "Paradosso", exclusiveSpec: "catastrofe", time: "1 azione", range: "36 metri", duration: "Conc., 10 min", description: "Area necrotica, impedisce vita/resurrezione." },

    // --- GRADO 6 ---
    { name: "Contingenza", grade: 6, class: "Paradosso", time: "10 min", range: "Self", duration: "10 giorni", description: "Programmi attivazione potere." },
    { name: "Disintegrare", grade: 6, class: "Paradosso", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Entropia accelerata (10d6+40 forza)." },
    { name: "Globo di Invulnerabilità", grade: 6, class: "Paradosso", time: "1 azione", range: "Self", duration: "Conc., 1 min", description: "Immunità poteri G5-." },
    { name: "Sguardo del Futuro", grade: 6, class: "Paradosso", time: "1 azione", range: "9 metri", duration: "Conc., 1 min", description: "Nemico deve superare TS Sag per attaccarti." },
    // Special: Utopia
    { name: "Guarigione Temporale", grade: 6, class: "Paradosso", exclusiveSpec: "utopia", time: "1 bonus", range: "18 metri", duration: "Istantanea", description: "Ripristini PF persi nell'ultimo round." },

    // --- GRADO 7 ---
    { name: "Inversione di Gravità", grade: 7, class: "Paradosso", time: "1 azione", range: "30 metri", duration: "Conc., 1 min", description: "Caduta verso l'alto." },
    { name: "Paradosso Temporale", grade: 7, class: "Paradosso", time: "12 ore", range: "Tocco", duration: "Perm.", description: "Simulacro da altra timeline." },
    { name: "Spostamento Planare", grade: 7, class: "Paradosso", time: "1 azione", range: "Tocco", duration: "Istantanea", description: "Viaggio dimensionale." },
    { name: "Teletrasporto di Massa", grade: 7, class: "Paradosso", time: "1 azione", range: "3 metri", duration: "Istantanea", description: "Teletrasporto gruppo." },
    // Special: Catastrofe
    { name: "Piaga dell'Entropia", grade: 7, class: "Paradosso", exclusiveSpec: "catastrofe", time: "1 azione", range: "18 metri", duration: "1 min", description: "Vulnerabilità a tutti i danni (TS Cost)." },

    // --- GRADO 8 ---
    { name: "Esplosione Solare", grade: 8, class: "Paradosso", time: "1 azione", range: "45 metri", duration: "Istantanea", description: "Stella morente (Radianti/Cecità)." },
    { name: "Labirinto", grade: 8, class: "Paradosso", time: "1 azione", range: "18 metri", duration: "Conc., 10 min", description: "Bandi in demi-piano." },
    { name: "Parola del Potere: Stordire", grade: 8, class: "Paradosso", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Stordimento automatico (<150 PF)." },
    { name: "Vuoto Mentale", grade: 8, class: "Paradosso", time: "1 azione", range: "Tocco", duration: "24 ore", description: "Mente fuori dal tempo." },
    // Special: Utopia
    { name: "Santuario Eterno", grade: 8, class: "Paradosso", exclusiveSpec: "utopia", time: "1 azione", range: "Self (30m)", duration: "24 ore", description: "Area pacifica assoluta. Niente invecchiamento/fame/attacchi." },

    // --- GRADO 9 ---
    { name: "Arresto del Tempo", grade: 9, class: "Paradosso", time: "1 azione", range: "Self", duration: "Istantanea", description: "1d4+1 turni consecutivi." },
    { name: "Desiderio", grade: 9, class: "Paradosso", time: "1 azione", range: "Self", duration: "Istantanea", description: "Riscrivi la realtà." },
    { name: "Esecuzione Perfetta", grade: 9, class: "Paradosso", time: "1 min", range: "Tocco", duration: "8 ore", description: "Previsione." },
    { name: "Parola del Potere: Uccidere", grade: 9, class: "Paradosso", time: "1 azione", range: "18 metri", duration: "Istantanea", description: "Uccisione istantanea (<100 PF)." },
    // Special: Catastrofe
    { name: "Evento di Estinzione", grade: 9, class: "Paradosso", exclusiveSpec: "catastrofe", time: "1 azione", range: "1,5 km", duration: "Istantanea", description: "Sciame di meteore entropico." },
    // Special: Utopia
    { name: "Forma Perfetta", grade: 9, class: "Paradosso", exclusiveSpec: "utopia", time: "1 azione", range: "Tocco", duration: "1 ora", description: "Versione ideale: Full PF, +4 Stats, Resistenza tutto." }
];

// Tabella Tecniche Prime Conosciute (Grado 0)
const ENGINEER_PRIME_KNOWN_TABLE = {
    1: 3, 2: 3, 3: 3,
    4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4,
    10: 5, 11: 5, 12: 5, 13: 5, 14: 5, 15: 5, 16: 5, 17: 5, 18: 5, 19: 5, 20: 5
};

/* --- PROGRESSIONE MELDER --- */

// Punti Talento Totali per Livello (Riserva di energia)
const MELDER_TP_TABLE = {
    1: 4, 2: 6, 3: 14, 4: 17, 5: 27,
    6: 32, 7: 38, 8: 44, 9: 57, 10: 64,
    11: 73, 12: 78, 13: 83, 14: 88, 15: 94,
    16: 100, 17: 107, 18: 114, 19: 123, 20: 133
};

// Grado Massimo del Talento accessibile per Livello
const MELDER_MAX_GRADE_TABLE = {
    1: 1, 2: 1, 3: 2, 4: 2, 5: 3,
    6: 3, 7: 4, 8: 4, 9: 5, 10: 5,
    11: 6, 12: 6, 13: 7, 14: 7, 15: 8,
    16: 8, 17: 9, 18: 9, 19: 9, 20: 9
};

// Talenti Prime (Grado 0) Conosciuti
const MELDER_PRIME_KNOWN_TABLE = {
    1: 3, 2: 3, 3: 3, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4,
    10: 5, 11: 5, 12: 5, 13: 5, 14: 5, 15: 5, 16: 5, 17: 5, 18: 5, 19: 5, 20: 5
};

// Costo in Punti Talento per Grado
const TALENT_COST_TABLE = {
    0: 0, 1: 2, 2: 3, 3: 5, 4: 6,
    5: 7, 6: 8, 7: 9, 8: 10, 9: 11
};

/* --- PROGRESSIONE SPECIALISTA (ARTIFICIO) --- */

// Punti Talento Totali (Livello 3+)
const ARTIFICIO_TP_TABLE = {
    1: 0, 2: 0,
    3: 4, 4: 6, 5: 6, 6: 6,
    7: 14, 8: 14, 9: 14,
    10: 17, 11: 17, 12: 17,
    13: 27, 14: 27, 15: 27,
    16: 32, 17: 32, 18: 32,
    19: 38, 20: 38
};

// Grado Massimo Lanciabile
const ARTIFICIO_MAX_GRADE_TABLE = {
    1: 0, 2: 0,
    3: 1, 4: 1, 5: 1, 6: 1,
    7: 2, 8: 2, 9: 2,
    10: 2, 11: 2, 12: 2,
    13: 3, 14: 3, 15: 3,
    16: 3, 17: 3, 18: 3,
    19: 4, 20: 4
};

/* --- PROGRESSIONE GUERRIERO (COMMANDO) --- */

// Quantità Dadi Prodezza per Livello
RULES_DATA.COMMANDO_DICE_COUNT_TABLE = {
    1: 0, 2: 0,
    3: 3, 4: 3,
    5: 4, 6: 4,
    7: 5, 8: 6, 9: 6,
    10: 6, 11: 6, 12: 6, 13: 6, 14: 6, 15: 6, 16: 6, 17: 6,
    18: 6, 19: 6, 20: 6
};

// Tipo di Dado (Size) per Livello
RULES_DATA.COMMANDO_DICE_TYPE_TABLE = {
    1: 0, 2: 0,
    3: 8, 4: 8, 5: 8, 6: 8, 7: 8, 8: 8, 9: 8,
    10: 10, 11: 10, 12: 10, 13: 10, 14: 10, 15: 10, 16: 10, 17: 10,
    18: 12, 19: 12, 20: 12
};

// Talenti Conosciuti (Esclusi Prime)
const ARTIFICIO_KNOWN_TABLE = {
    1: 0, 2: 0,
    3: 3, 4: 4, 5: 4, 6: 4,
    7: 5, 8: 6, 9: 6,
    10: 7, 11: 8, 12: 8,
    13: 9, 14: 10, 15: 10,
    16: 11, 17: 11, 18: 11,
    19: 12, 20: 13
};

// Talenti Prime Conosciuti
const ARTIFICIO_PRIME_KNOWN_TABLE = {
    1: 0, 2: 0,
    3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3,
    10: 4, 11: 4, 12: 4, 13: 4, 14: 4, 15: 4, 16: 4, 17: 4, 18: 4, 19: 4, 20: 4
};

/* --- PROGRESSIONE MISTICO --- */

// Punti Talento Totali (Uguale al Melder)
const MISTICO_TP_TABLE = {
    1: 4, 2: 6, 3: 14, 4: 17, 5: 27,
    6: 32, 7: 38, 8: 44, 9: 57, 10: 64,
    11: 73, 12: 78, 13: 83, 14: 88, 15: 94,
    16: 100, 17: 107, 18: 114, 19: 123, 20: 133
};

// Talenti Prime Conosciuti (Uguale agli altri)
const MISTICO_PRIME_KNOWN_TABLE = {
    1: 3, 2: 3, 3: 3, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4,
    10: 5, 11: 5, 12: 5, 13: 5, 14: 5, 15: 5, 16: 5, 17: 5, 18: 5, 19: 5, 20: 5
};

/* --- PROGRESSIONE SOLARIANO --- */

// Rivelazioni Conosciute (Totali)
const SOLARIAN_KNOWN_TABLE = {
    1: 1, 2: 2, 3: 2, 4: 2, 5: 3,
    6: 3, 7: 4, 8: 4, 9: 5, 10: 5,
    11: 6, 12: 6, 13: 7, 14: 7, 15: 8,
    16: 8, 17: 8, 18: 9, 19: 9, 20: 10
};

// Grado Massimo Rivelazione
const SOLARIAN_MAX_GRADE_TABLE = {
    1: 1, 2: 1, 3: 1, 4: 2, 5: 2,
    6: 3, 7: 3, 8: 4, 9: 4, 10: 5,
    11: 5, 12: 6, 13: 6, 14: 7, 15: 7,
    16: 8, 17: 8, 18: 9, 19: 9, 20: 9
};

/* --- PROGRESSIONE PARADOSSO --- */

// Punti Talento Totali (Uguale a Melder/Mistico)
const PARADOSSO_TP_TABLE = {
    1: 4, 2: 6, 3: 14, 4: 17, 5: 27,
    6: 32, 7: 38, 8: 44, 9: 57, 10: 64,
    11: 73, 12: 78, 13: 83, 14: 88, 15: 94,
    16: 100, 17: 107, 18: 114, 19: 123, 20: 133
};

// Talenti Prime Conosciuti
const PARADOSSO_PRIME_KNOWN_TABLE = {
    1: 3, 2: 3, 3: 3, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4,
    10: 5, 11: 5, 12: 5, 13: 5, 14: 5, 15: 5, 16: 5, 17: 5, 18: 5, 19: 5, 20: 5
};

