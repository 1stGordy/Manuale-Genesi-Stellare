
# MASTER CONFIGURATION: Character Sheet System

## SEZIONE 1: Interfaccia Utente (Frontend)

Questa sezione definisce il layout visivo e gli input dell'utente.

### 1.1 Header (Parte Alta - Fissa)

_Visibile sempre. Contiene i dati anagrafici e le barre vitali._

#### Dati Identificativi & Selettori

|**ID Campo**|**Etichetta**|**Tipo Input**|**Fonte Dati / Opzioni**|**Logica & Trigger (Backend)**|
|---|---|---|---|---|
|`char_name`|**Nome**|Testo|-|-|
|`char_img`|**Avatar**|Upload|-|Visualizzazione circolare (50% border-radius).|
|`char_gender`|**Genere**|Dropdown|M, F, T, TT|-|
|`char_race`|**Razza**|Dropdown|_Vedi DB Razze_|Imposta `char_size` default. Filtra `char_archetype`. Applica bonus stat razziali.|
|`char_archetype`|**Archetipo**|Dropdown|_Dipendente da Razza_|Applica bonus stat archetipo. Aggiunge privilegi specifici.|
|`char_size`|**Taglia**|Dropdown|S, M, L, XL|Default da Razza. Modificabile manualmente.|
|`char_age`|**Età**|Numero|-|-|
|`char_align`|**Allineamento**|Dropdown|LB, NB, CB, LN, N, CN, LM, NM, CM|-|
|`char_class`|**Classe**|Dropdown|_Vedi DB Classi_|Imposta `hit_die`. Filtra `char_spec`. Attiva tab Esper. Imposta TS.|
|`char_spec`|**Specializzazione**|Dropdown|_Dipendente da Classe_|Aggiunge privilegi specifici.|
|`char_level`|**Livello**|Numero (Auto)|1 - 20|Calcolato come `SUM(class_levels)`. Determina `prof_bonus`.|

#### Barre Vitali & Progressione

|**ID Campo**|**Nome**|**Colore**|**Logica di Visualizzazione & Calcolo**|
|---|---|---|---|
|`xp_bar`|**EXP**|Giallo|**Display:** `xp_current` / `xp_next_req`.<br><br>  <br><br>**Logica Rollover:** Se `xp_current` >= `xp_next_req`:<br><br>  <br><br>1. Livello +1.<br><br>  <br><br>2. `xp_current` = `xp_current` - `xp_next_req`.<br><br>  <br><br>_Vedi Tabella XP._|
|`hp_bar`|**Punti Ferita**|Rosso|**Max:** (`hit_die` * `lvl`) + (`mod_con` * `lvl`).<br><br>  <br><br>**Current:** Input danni/cure.<br><br>  <br><br>**Visual:** Barra rossa riempitiva su sfondo grigio.|
|`hp_temp`|**PF Temp**|Viola (Overlay)|**Logica Danni:** Input Danno -> Sottrai prima da `hp_temp`. Se `hp_temp` < 0, sottrai resto da `hp_current`.<br><br>  <br><br>**Visual:** Sovrapposizione trasparente sulla barra rossa.|

#### Statistiche Base (Caratteristiche)

_Modificando il Punteggio, si aggiornano automaticamente Modificatore e Derivati._

|**Statistica**|**ID**|**Punteggio (Input)**|**Modificatore (Auto)**|
|---|---|---|---|
|**FORZA**|`str`|1-20+|`(Val-10)/2`|
|**DESTREZZA**|`dex`|1-20+|`(Val-10)/2`|
|**COSTITUZIONE**|`con`|1-20+|`(Val-10)/2`|
|**INTELLIGENZA**|`int`|1-20+|`(Val-10)/2`|
|**SAGGEZZA**|`wis`|1-20+|`(Val-10)/2`|
|**CARISMA**|`cha`|1-20+|`(Val-10)/2`|

#### Statistiche Derivate (Calcolate)

|**Nome**|**Formula**|**Note**|
|---|---|---|
|**Iniziativa**|`mod_dex` + `bonus_vari`|-|
|**Classe Armatura (CA)**|`base_armor` + `shield` + `mod_dex` (limitato) + `misc`|Se Armatura Media: Max Dex +2. Se Pesante: Max Dex +0.|
|**Bonus Competenza**|Vedi Tabella Livelli (+2 a lv1)|Si somma a tiri/skill in cui si è competenti.|

---

### 1.2 Navbar (Menu Scorrimento Laterale)

Pulsanti per cambiare la vista inferiore.

[Privilegi] [Abilità] [Talenti] [Esper] [Armi] [Equipaggiamento] [Veicoli] [Note]

---

### 1.3 Parte Inferiore (Contenuto Dinamico)

#### TAB: Privilegi

- **Privilegi di Classe/Razza:** Lista generata automaticamente dal DB in base al livello.
    
- **Lingue:** Campo testo (Default da Razza).
    
- **Competenze Armi:** Checkbox [ ] Semplici [ ] Marziali [ ] Altro. (Auto-check da Classe).
    
- **Competenze Armature:** Checkbox [ ] Leggere [ ] Medie [ ] Pesanti [ ] Scudi. (Auto-check da Classe).
    

#### TAB: Abilità

_Tabella con calcolo automatico. Checkbox "Competenza" aggiunge il Bonus Competenza._

|**Competenza [x]**|**Nome Abilità**|**Caratteristica**|**Totale Bonus**|
|---|---|---|---|
|[ ]|Acrobazia|DEX|`mod` + (`prof` se check)|
|[ ]|Astrofisica|INT|`mod` + (`prof` se check)|
|[ ]|Atletica|STR|`mod` + (`prof` se check)|
|[ ]|Computer|INT|`mod` + (`prof` se check)|
|[ ]|Cultura|WIS|`mod` + (`prof` se check)|
|[ ]|Diplomazia|CHA|`mod` + (`prof` se check)|
|[ ]|Furtività|DEX|`mod` + (`prof` se check)|
|[ ]|Inganno|CHA|`mod` + (`prof` se check)|
|[ ]|Intuizione|WIS|`mod` + (`prof` se check)|
|[ ]|Intimidire|CHA|`mod` + (`prof` se check)|
|[ ]|Investigazione|INT|`mod` + (`prof` se check)|
|[ ]|Meccanica|WIS|`mod` + (`prof` se check)|
|[ ]|Medicina|WIS|`mod` + (`prof` se check)|
|[ ]|Percezione|WIS|`mod` + (`prof` se check)|
|[ ]|Performance|CHA|`mod` + (`prof` se check)|
|[ ]|Persuasione|CHA|`mod` + (`prof` se check)|
|[ ]|Rapidità di Mano|DEX|`mod` + (`prof` se check)|
|[ ]|Religione|INT|`mod` + (`prof` se check)|
|[ ]|Sopravvivenza|WIS|`mod` + (`prof` se check)|
|[ ]|Storia|INT|`mod` + (`prof` se check)|
|[ ]|Xenobiologia|INT|`mod` + (`prof` se check)|

#### TAB: Talenti (Feats)

- **Lista Attiva:** Card dei talenti acquisiti.
    
- **Pulsante [+ Aggiungi]:** Apre modale. Mostra solo talenti con prerequisiti soddisfatti.
    

#### TAB: Esper (Poteri)

_Layout variabile in base alla Classe._

**Caso A: Canalizzazione (Punti)** _(Melder, Mistico, Paradosso, Solariano)_

- **Risorse:** Box `Punti Talento Max` (Da tabella) / `Attuali` (Input).
    
- **Statistiche:** `Attacco Magico` (`prof` + `stat`) | `CD Salvezza` (8 + `prof` + `stat`).
    
- **Lista:** Card Poteri (Nome, Costo, Gittata, Effetto).
    

**Caso B: Tecniche (Slot)** _(Ingegnere, Specialista-Artificio)_

- **Risorse:** Griglia Slot (Livello 1-9). Riga 1: Max. Riga 2: Usati.
    
- **Lista:** Card Poteri divisi per Grado.
    

**Caso C: Manovre** _(Guerriero-Commando)_

- **Risorse:** `Dadi Prodezza` (Max/Attuali).
    
- **Lista:** Card Manovre.
    

#### TAB: Armi

- **Globali:** `Attacco Mischia` (`prof`+`str/dex`) | `Attacco Distanza` (`prof`+`dex`).
    
- Tabella Dinamica:
    
    | Arma | Gittata | Danni | Tipo | Munizioni (Max/Res) |
    
    | --- | --- | --- | --- | --- |
    
    | (Input) | (Input) | (Input) | (Input) | (Input) |
    

#### TAB: Equipaggiamento

- **Valuta:** Campo `Cubil`.
    
- **Tabella:** Oggetto, Quantità, Note.
    

#### TAB: Veicoli

- **Tabella:** Nome, Taglia, Velocità, Carico, Ruolo.
    
- **Statistiche Veicolo:**
    
    - **CA:** `base` + `manovrabilità` + `dex_pilota`.
        
    - **HP:** `dadi` + (2 * `int_tecnico`).
        
    - **IS:** `base` + `wis_tecnico`.
        

#### TAB: Note

- Area di testo libera.
    

---

# SEZIONE 2: Database Regole (Backend)
Vedere sempre appendici Corrispondenti per maggiore comprensione e per i testi specifici da inserire
## 2.1 Tabella Esperienza (Livellamento)

|**XP Totali**|**Livello**|**XP Totali**|**Livello**|
|---|---|---|---|
|0|1|85.000|11|
|300|2|100.000|12|
|900|3|120.000|13|
|2.700|4|140.000|14|
|6.500|5|165.000|15|
|14.000|6|195.000|16|
|23.000|7|225.000|17|
|34.000|8|265.000|18|
|48.000|9|305.000|19|
|64.000|10|355.000|20|

## 2.2 Database Razze
rifarsi all'appendice C per una maggiore completezza

|**Razza**|**Modificatori**|**Taglia**|**Velocità**|**Scurovisione**|**Privilegi Base**|
|---|---|---|---|---|---|
|**Ashenforged**|Cos +2|M|9m|18m|Resilienza (Veleno), Add. Artigiano|
|**Eldori**|Car +2|M|9m|18m|Iniziato Esper (Aegis, Innervate, Clean Zone)|
|**Umani**|-|M|9m|-|(Vedi Archetipi)|
|**Kesh**|Des +2|M|9m|18m|Alterazione Minore, Fusione Memoria|
|**Promethean**|Des +2|M|9m|18m|(Vedi Archetipi)|
|**Androidi**|Int +2|M|9m|-|Costrutto Vivente, Resilienza Sintetica, Analisi Integrata|
|**Talandri**|Sag +2|M|9m|-|Quattro Braccia, Passo del Deserto, Erudito|
|**Pahtra**|Des +2|M|9m|18m|Sensi Felini, Armi Naturali (1d4 Tagl.), Atterraggio Agile|
|**Vesk**|For +2|M|9m|18m|Armatura Naturale (13+Dex), Minaccioso, Armi Naturali (1d4)|
|**Ysoki**|Des +2|S|9m|18m|Tasche Guanciali, Grinta|

### Archetipi Razziali

_Selezionare la Razza sblocca questi Archetipi:_

- **Ashenforged:** Cerebrale (+1 Sag, +HP), Somatico (+1 For, CA Nat 12+Des).
    
- **Eldori:** Lunare (+1 Int, Scurovisione 27m, Attingere Ruota), Solare (+2 Sag, Resistenza Necro/Rad, Armi).
    
- **Umani:** Nato sulla Terra (+1 All, Lingua), Galattico (+2 a scelta, Skill, Talento), Utopico (+2 Car +1 Altro, 2 Skill, Volitivo), Bruciato (+2 Cos +1 For, Atletica, Armi, Resilienza).
    
- **Kesh:** Nobile (+1 Car, Armi, Lingua), Delle Stelle (+1 Int, Astrofisica, Strumento).
    
- **Promethean:** Aberrante (-), Mezzaluna (+1 Int, Logica, Percezione), Sangue di Fuoco (+1 For, Resilienza, Sforzo).
    
- **Androidi:** Logica (+1 Des, Storia/Religione, Interfaccia), Corazzata (+1 For, +1 CA, Struttura).
    
- **Talandri:** Deriviscio (+1 Des, +Velocità, Parata), Navigatore (+1 Int, Zero-G, Tecnologia).
    
- **Pahtra:** Base (+1 Cos, Furtività, Scatto), Cantore (+1 Car, Sonic Burst, Musica).
    
- **Vesk:** D'Assalto (+1 Cos, Aggressivo, Corazzato), Stratega (+1 Sag, Impavido, Ordine Battaglia).
    
- **Ysoki:** Bassifondi (+1 Int, Meccanica, Strisciare), Vagabondo (+1 Car, Persuasione, Sensi Acuti).
    

## 2.3 Database Classi
rifarsi all'appendice B per una maggiore completezza
### Ingegnere

- **Dadi Vita:** 1d8. **TS:** Cos, Sag. **Stat Casting:** Saggezza.
    
- **Progressione:** Tecniche (Slot).
    
- **Privilegi Chiave:** Forgiatura, Rig (Espansione), Devastazione Meccanica.
    
- **Specializzazioni:**
    
    - _Macchinista:_ Armi Marziali, Drone (Attacco Coordinato), Fiore di Fuoco.
        
    - _Medico:_ Cure potenziate, Rigenerazione (Pool), Rianimazione.
        
    - _Armeggiatore:_ Armature Pesanti, Veicoli, Potenziamento Equip, Sabotaggio.
        

### Melder

- **Dadi Vita:** 1d6. **TS:** Int, Sag. **Stat Casting:** Intelligenza.
    
- **Progressione:** Canalizzazione (Punti Talento).
    
- **Privilegi Chiave:** Recupero Esper, Aumento Prime.
    
- **Specializzazioni:**
    
    - _Metacinetico:_ Precisione Talenti, Danni potenziati (Int).
        
    - _Psicogenico:_ Mesmerizzare, Stordire/Disorientare, Doppi Bersagli.
        

### Specialista

- **Dadi Vita:** 1d8. **TS:** Des, Int. **Stat Casting:** Intelligenza (Solo Artificio).
    
- **Progressione:** Nessuna (Base) / Tecniche (Artificio).
    
- **Privilegi Chiave:** Attitudine Naturale, Colpo Destro (d6), Azione Scaltra, Schivata, Elusione.
    
- **Specializzazioni:**
    
    - _Infiltrato:_ Mani Veloci, Scalare (Acrobazia), Furtività, Hacking.
        
    - _Operativo:_ Talento Prime, Colpo Vitale (Critico sorpresa), Travestimento.
        
    - _Artificio:_ Talenti Esper (Melder), Difesa Sensoriale, Occultamento.
        

### Guerriero

- **Dadi Vita:** 1d10. **TS:** For, Cos.
    
- **Progressione:** Nessuna.
    
- **Privilegi Chiave:** Stile Combattimento, Recuperare Energie, Azione Impetuosa, Attacco Extra (x2/x3).
    
- **Specializzazioni:**
    
    - _Paragon:_ Colpo Infuso, Bonus Atletica, Stile Extra, Critico esteso.
        
    - _Commando:_ Dadi Prodezza (Manovre Tattiche), Demolitore.
        
    - _Guardia della Tempesta:_ Legame Arma, Impulso Elementale, Scudo Tempesta.
        

### Mistico

- **Dadi Vita:** 1d8. **TS:** Sag, Car. **Stat Casting:** Saggezza.
    
- **Progressione:** Canalizzazione (Punti Talento).
    
- **Privilegi Chiave:** Legame Spirituale, Fonte Vitale (Pool Cura d6).
    
- **Specializzazioni:**
    
    - _Guaritore:_ Cure +Bonus, Trasferimento Vita (Sacrificio).
        
    - _Empatico:_ Mente Alveare (Telepatia + Bonus TS), Feedback Danni.
        

### Solariano

- **Dadi Vita:** 1d10. **TS:** Cos, Car. **Stat Casting:** Carisma.
    
- **Progressione:** Rivelazioni (Speciali).
    
- **Privilegi Chiave:** Manifestazione (Arma/Armatura), Sintonizzazione (Fotone/Gravitone).
    
- **Specializzazioni:**
    
    - _Corona:_ Danni Fuoco/Radianti, Resistenze.
        
    - _Eclissi:_ Controllo Gravità, Rallentamento, Difesa.
        

### Paradosso

- **Dadi Vita:** 1d6. **TS:** Int, Car. **Stat Casting:** Carisma.
    
- **Progressione:** Canalizzazione (Punti Talento).
    
- **Privilegi Chiave:** Ancora Realtà, Campo Distorsione (Aura), Manipolazione Probabilità.
    
- **Specializzazioni:**
    
    - _Catastrofe:_ Danni aura, Frattura Realtà, Erosione TS.
        
    - _Utopia:_ Resistenze aura, Reroll Alleati, Protezione.
        

---

## 2.4 Database Multiclasse & Talenti

### Regole Multiclasse

#### Prerequisiti
_Per prendere un livello in una nuova classe, devi soddisfare i requisiti sia della tua classe attuale che di quella nuova._

| Classe               | Punteggio Minimo Richiesto (13)                |
| :------------------- | :--------------------------------------------- |
| **Ingegnere**        | Saggezza 13                                    |
| **Melder**           | Intelligenza 13                                |
| **Specialista**      | Destrezza 13                                   |
| **Guerriero**        | Forza 13 **oppure** Destrezza 13               |
| **Mistico**          | Saggezza 13                                    |
| **Cavaliere Solare** | (Forza 13 **o** Destrezza 13) **E** Carisma 13 |
| **Paradosso**        | Carisma 13                                     |
| **Adepto**           | Carisma 13                                     |
| **Cybermante**       | Intelligenza 13                                |
| **Cacciatore**       | Destrezza 13 **e** Saggezza 13                 |
| **Sentinella**       | Forza 13 **e** Carisma 13                      |

#### 2. Competenze Acquisite
_Quando ottieni il primo livello in una nuova classe (non la prima in assoluto), ottieni SOLO queste competenze:_

| Classe               | Competenze Guadagnate                                                     |
| :------------------- | :------------------------------------------------------------------------ |
| **Ingegnere**        | Armature leggere, Medie, Armi semplici.                                   |
| **Melder**           | Nessuna.                                                                  |
| **Specialista**      | Armature leggere, 1 Abilità di classe, Strumenti da Infiltrazione.        |
| **Guerriero**        | Armature leggere, Medie, Scudi, Armi semplici, Armi marziali.             |
| **Mistico**          | Armature leggere, Scudi, Armi semplici.                                   |
| **Cavaliere Solare** | Armature leggere, Medie, Scudi, Armi semplici, Armi marziali.             |
| **Paradosso**        | Armature leggere, Armi semplici.                                          |
| **Cybermante**       | Armature leggere, Armi semplici.                                          |
| **Cacciatore**       | Armature leggere, Medie, Scudi, Armi semplici, Armi da guerra, 1 Abilità. |
| **Sentinella**       | Armature leggere, Medie, Scudi, Armi semplici, Armi da guerra.            |

 #### 3. Gestione Privilegi (Multiclasse)
Regole speciali per quando si combinano classi specifiche.

| Privilegio                 | Regola di Cumulo                                                                                                |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| **Punti Ferita**           | Ottieni il Dado Vita standard + Cos (non il massimo come al lv 1).                                              |
| **Attacco Extra**          | **Non si somma.** Se lo ottieni da due classi, ne hai comunque solo uno (o la versione migliore).               |
| **Difesa Senza Armatura**  | **Non si somma.** Puoi averne solo una versione attiva.                                                         |
| **Espansione del Rig**     | Ottieni i nuovi effetti della nuova classe, ma **non usi aggiuntivi** (a meno che la classe non lo specifichi). |
| **Canalizzazione (Slot)**  | **Ingegnere + (1/2 Cacciatore/Sentinella)**. Usa la tabella slot multiclasse standard.                          |
| **Canalizzazione (Punti)** | **Mistico + Melder + (1/3 Specialista/Guerriero magici)**. Somma i livelli per il totale Punti Talento.         |
| **Poteri Conosciuti**      | Calcolati **separatamente** per ogni classe.                                                                    |

---


### Lista Talenti (Selezione)

_Ogni talento può essere preso al posto di un Aumento Caratteristica._

#### Talenti Generali
| Talento | Requisiti | Effetto |
| :--- | :--- | :--- |
| **Acrobata** | - | +1 Des. Usi Des per prove di Atletica. Doppio bonus Des ai TS contro Raffica. |
| **Adattabile** | - | +1 a una Caratteristica. Competenza nei TS di quella caratteristica. |
| **Allerta** | - | +5 Iniziativa. Immunità a Sorpresa. Nemici nascosti non hanno vantaggio. |
| **Atletico** | - | +1 For o Des. Rialzarsi costa meno movimento. Vantaggio (1/riposo) su prove fisiche. |
| **Lottatore** | - | +1 For o Cos. Colpi senz'armi d4. Competenza armi improvvisate. Azione bonus afferrare. |
| **Esperto Carica** | - | Azione bonus Attacco/Spinta dopo Scatto. Bonus danni/spinta in linea retta. |
| **Esper Combattimento**| - | Vantaggio TS Costituzione (Concentrazione). Lancio con mani occupate. Reazione: talento su AdO. |
| **Pilota Combattimento**| Veicoli | +1 Des o Sag. Aumenta Difesa Manovra nave. Reazione per +CA nave. |
| **Sapiente Cosmico** | Esper | Scegli Forza/Necrotico/Radioso. Vantaggio TS contro tipo. I tuoi poteri danno -2 ai TS nemici. |
| **Demolitore** | - | +1 For o Sag. Competenza granate. Piazzi esplosivi come Azione Bonus. |
| **Combattente 2 Armi** | - | +1 CA con due armi. Usi armi non leggere. Estrai due armi insieme. |
| **Elementalista** | - | Scegli elemento. Ignori resistenza. Ritiri danni (1/riposo breve). |
| **Cacciatore di Esper**| - | Reazione attacco vs caster. Danni danno svantaggio conc. Vantaggio attacchi vs caster. |
| **Piè Veloce** | - | Velocità +3m. Ignori terreno difficile scattando. +1 CA se ti muovi. |
| **Fortuito** | - | 3 Dadi Fortuna (d6) per migliorare i tuoi tiri o peggiorare i nemici. |
| **Afferratore** | For 13 | Vantaggio attacchi vs afferrati. Puoi immobilizzare (pin). |
| **Maestro Armi Pesanti**| - | Azione bonus attacco su critico/kill. -5 colpire / +10 danni. |
| **Armaiolo** | - | +1 Des. Niente inceppamenti su 1 naturale. Ricarica rapida. |
| **Robusto** | - | +1 Cos. Rimuovi veleno/malattia (1/riposo). |
| **Equip. Pesante** | - | +1 For. Competenza Armature Pesanti. |
| **Maestro Arm. Pesanti**| - | +1 For. Riduzione danni non magici di 3. Resistenza esplosivi. |
| **Artigliere Pesante** | - | +1 For. Riduci rinculo raffica. Azione bonus attacco extra raffica. |
| **Leader Ispiratore** | Car 13 | Conferisci PF temporanei agli alleati dopo riposo. |
| **Mente Acuta** | - | +1 Int o Sag. Memoria eidetica. Prove gruppo. |
| **Equip. Leggero** | - | +1 For o Des. Competenza Armature Leggere. |
| **Esperto Linguista** | - | +1 Int. 3 lingue extra. Vantaggio codici. |
| **Equip. Moderato** | - | +1 For o Des. Competenza Armature Medie e Scudi. |
| **Maestro Hacker** | - | Competenza kit hacker. Vantaggio hacking. Svantaggio TS nemici vs spoofing. |
| **Maestro Infiltrato** | - | Vantaggio segreti/trappole. Bonus disattivare. |
| **Maestro Arm. Medie** | - | No svantaggio furtività. Bonus Des alla CA max +3. |
| **Medico** | - | Stabilizzare cura 1 PF. Kit medico come riposo breve. Bonus cure riposo. |
| **Maestro Armi Asta** | - | Attacco bonus estremità opposta. AdO quando entrano in portata. |
| **Maestro Scudi** | - | Bonus azione spinta. Bonus scudo a TS Des. Reazione eludere danni. |
| **Tattico Navale** | - | +1 Des o Sag. No svantaggio attacchi nave in evasione. Bonus mira nave. |
| **Abile** | - | Competenza in 3 abilità. |
| **Cecchino** | - | No svantaggio lunga gittata. Ignori copertura. -5 colpire / +10 danni. |
| **Pilota Spaziale** | - | +1 Des. Competenza veicoli spaziali. |
| **Tiro Rapido** | - | Ignori ricarica. No svantaggio mischia con armi distanza. Attacco bonus pistola. |
| **Furtivo** | - | Nascondersi se leggermente oscurati. Rimani nascosto se manchi. Visione scura +. |
| **Guidatore Acrobatico**| - | Attacco veicolo no svantaggio. Bonus manovre. Reazione CA veicolo. |
| **Esperto Tecnico** | - | +1 Sag. Vantaggio riparazioni. Kit cura costrutti. |
| **Attore** | - | +1 Car. Vantaggio impersonare. |
| **Duro** | - | PF extra (2 per livello). |
| **Vigile** | - | +1 Int o Sag. Bonus Percezione/Indagine passiva. Lettura labiale. |
| **Specialista Armi** | - | +1 For o Des. Competenza 5 armi. |

#### Talenti Razziali e di Classe
| Talento                   | Requisito          | Effetto                                                                         |
| :------------------------ | :----------------- | :------------------------------------------------------------------------------ |
| **Carica Corazzata**      | Vesk               | +1 For/Cos. Scatto -> Bonus attacco (Prono).                                    |
| **Mente Logica Avanzata** | Androide/Ingegnere | +1 Int. Vantaggio TS Int. Bonus Int a colpire/TS Des (1/riposo).                |
| **Agilità 4 Braccia**     | Talandri           | +1 Des. Ricarica gratis. Vantaggio Scalare/Rapidità Mano.                       |
| **Eredità Resistenza**    | Pahtra/Ysoki       | +1 Cos. Ritira Dadi Vita. Vantaggio TS Malattie/Veleni.                         |
| **Protocollo Sinton.**    | Solariano/Melder   | +1 Talento Prime. Reazione cambio Sintonia (Solariano) o +2 Punti Max (Melder). |
| **Ancora Temporale**      | Paradosso          | +1 Car. No sorpresa. Reazione successo TS spostamento.                          |
| **Sintonia Sciame**       | Mistico Empatico   | +9m Telepatia. Reazione dimezza danni psichici alleato (condividi).             |


---

## 2.5 Liste Poteri (Esper/Tecniche)

_Questi dati popolano le card nella TAB "Esper" o "Talenti" (Operativo)._ Rifarsi all'Appendice B classi 

---

## 3. Logica di Calcolo per Antigravity (Scripting)

1. **Gestione Livello & XP:**
    
    - `Total_Level` = Somma dei livelli di tutte le classi selezionate.
        
    - `Next_Level_Threshold` = Lookup nella Tabella XP basato su `Total_Level`.
        
    - `XP_Display` = `Total_XP` - `XP_Threshold_Previous_Level`.
        
2. **Calcolo Punti Ferita (HP):**
    
    - `Livello 1`: Max Dado Vita Classe 1 + Mod. Costituzione.
        
    - `Livelli successivi`: (Lancio Dado Vita + Mod. Costituzione).
        
    - `Totale`: Somma di tutti i livelli.
        
3. **Calcolo Statistiche Combattimento:**
    
    - `Iniziativa`: Mod. Destrezza + (Talento "Allerta" ? 5 : 0) + (Paradosso Lv20 ? Vantaggio : 0).
        
    - `CA`: Base Armatura + (Scudo ? Bonus Scudo : 0) + Min(Mod. Destrezza, Cap Armatura).
        
    - `Attacco`: Mod. Statistica (For/Des/Int/Sag/Car) + Bonus Competenza (se competente).
        
4. **Gestione Risorse (Pools):**
    
    - Le risorse come "Punti Talento", "Dadi Prodezza", "Fonte Vitale" devono essere variabili indipendenti (`current_val`, `max_val`) che si resettano con pulsanti "Riposo Breve" o "Riposo Lungo".

--- 
# Sezione 3: Appendici informative ed esplicative
# Appendice B: Classi
In questa appendice verranno descritte tutte le classi con solo cose utile e modificatori che dovranno essere usati negli altri campi, importantissimo è il link e il variare di tutto
## Ingegnere

| Caratteristica           | Descrizione                                                                                                   |
| :----------------------- | :------------------------------------------------------------------------------------------------------------ |
| Dadi Vita                | 1d8 per livello da ingegnere                                                                                  |
| PF ai Livelli Successivi | 1d8 (o 5) + il tuo modificatore di Costituzione per livello dopo il 1°                                        |
| **Competenze**           |                                                                                                               |
| Armature                 | Leggere, Medie                                                                                                |
| Armi                     | Semplici                                                                                                      |
| Tiri Salvezza            | Costituzione, Saggezza                                                                                        |
| Abilità                  | Scegline due tra: Astrofisica, Computer, Intuizione, Cultura, Meccanica, Medicina, Persuasione e Xenobiologia |

### Tabella dell'ingegnere 

| Livello | Bonus Comp. | Privilegi                                                              | Tecniche Prime | Slot 1° | Slot 2° | Slot 3° | Slot 4° | Slot 5° | Slot 6° | Slot 7° | Slot 8° | Slot 9° |
| :-----: | :---------: | :--------------------------------------------------------------------- | :------------: | :-----: | :-----: | :-----: | :-----: | :-----: | ------- | ------- | ------- | ------- |
|   1°    |     +2      | Forgiatura, Specialità Tecnica                                         |       3        |    2    |    —    |    —    |    —    |    —    | —       | —       | —       | —       |
|   2°    |     +2      | Privilegio Specialità, Espansione del Rig (1/riposo)                   |       3        |    3    |    —    |    —    |    —    |    —    | —       | —       | —       | —       |
|   3°    |     +2      | —                                                                      |       3        |    4    |    2    |    —    |    —    |    —    | —       | —       | —       | —       |
|   4°    |     +2      | Aumento Punteggi Caratteristica                                        |       4        |    4    |    3    |    —    |    —    |    —    | —       | —       | —       | —       |
|   5°    |     +3      | Devastazione Meccanica (GS 1/2)                                        |       4        |    4    |    3    |    2    |    —    |    —    | —       | —       | —       | —       |
|   6°    |     +3      | Privilegio Specialità, Espansione del Rig (2/riposo)                   |       4        |    4    |    3    |    3    |    —    |    —    | —       | —       | —       |         |
|   7°    |     +3      | —                                                                      |       4        |    4    |    3    |    3    |    1    |    —    | —       | —       | —       | —       |
|   8°    |     +3      | Aumento Punteggi, Devastazione Meccanica (GS 1), Privilegio Specialità |       4        |    4    |    3    |    3    |    2    |    —    | —       | —       | —       | —       |
|   9°    |     +4      | —                                                                      |       4        |    4    |    3    |    3    |    3    |    1    | —       | —       | —       | —       |
|   10°   |     +4      | Riparazione di Fortuna (*The Jury Rig*)                                |       5        |    4    |    3    |    3    |    3    |    2    | —       | —       | —       | —       |
|   11°   |     +4      | Devastazione Meccanica (GS2)                                           |       5        |    4    |    3    |    3    |    3    |    2    | 1       | —       | —       | —       |
|   12°   |     +4      | Aumento Punteggi Caratteristica                                        |       5        |    4    |    3    |    3    |    3    |    2    | 1       | —       | —       | —       |
|   13°   |     +5      | —                                                                      |       5        |    4    |    3    |    3    |    3    |    2    | 1       | 1       | —       | —       |
|   14°   |     +5      | Devastazione Meccanica (GS3)                                           |       5        |    4    |    3    |    3    |    3    |    2    | 1       | 1       | —       | —       |
|   15°   |     +5      | —                                                                      |       5        |    4    |    3    |    3    |    3    |    2    | 1       | 1       | 1       | —       |
|   16°   |     +5      | Aumento Punteggi Caratteristica                                        |       5        |    4    |    3    |    3    |    3    |    2    | 1       | 1       | 1       | —       |
|   17°   |     +6      | Devastazione Meccanica (GS4), Specialità Tecnica                       |       5        |    4    |    3    |    3    |    3    |    2    | 1       | 1       | 1       | 1       |
|   18°   |     +6      | Espansione del Rig (3/riposo)                                          |       5        |    4    |    3    |    3    |    3    |    3    | 1       | 1       | 1       | 1       |
|   19°   |     +6      | Aumento Punteggi Caratteristica                                        |       5        |    4    |    3    |    3    |    3    |    3    | 2       | 1       | 1       | 1       |
|   20°   |     +6      | *The Jury Rig*                                                         |       5        |    4    |    3    |    3    |    3    |    3    | 2       | 2       | 1       | 1       |
### Privilegi di Classe: Ingegnere

#### Statistiche di Forgiatura
| Caratteristica | Dettaglio |
| :--- | :--- |
| **Caratteristica Chiave** | **Saggezza** |
| **CD Tiro Salvezza** | 8 + Bonus di Competenza + Modificatore di Saggezza |
| **Modificatore Attacco** | Bonus di Competenza + Modificatore di Saggezza |
| **Preparazione** | Lista di tecniche = Mod. Saggezza + Livello da Ingegnere.<br>Recupero slot: Riposo Lungo. |
| **Focus** | **Rig dell'Ingegnere**: Set di strumenti, sorium e micro-droni. |
| **Convenzionale** | Puoi lanciare tecniche col tag "convenzionale" senza spendere slot (richiede 10 min extra). |

---

#### Tabella dei Privilegi

| Livello | Privilegio | Descrizione |
| :--- | :--- | :--- |
| **1°** | **Forgiatura** | Ottieni l'accesso alle Tecniche. Conosci **3 Tecniche Prime** e puoi preparare tecniche di grado 1. |
| **1°** | **Specialità Tecnica** | Scegli un archetipo: **Macchinista**, **Medico** o **Armeggiatore**.<br>Ottieni privilegi specifici al 1°, 2°, 6° e 8° livello. |
| **1°** | **Richiamare il Rig** | **Reazione:** Percepisci la posizione del Rig entro 800km.<br>**Azione Bonus:** Spendi 1 slot per teletrasportare il Rig nella tua mano.<br>_(Dal 5° livello il teletrasporto è gratuito)._ |
| **2°** | **Espansione del Rig** | **Recupero:** Riposo Breve o Lungo.<br>Canalizzi energia per effetti speciali. Inizi con:<br>**Impulso Elettromagnetico (Azione):** Costrutti/automi entro 9m fanno TS Intelligenza. Fallimento: **Menomati** fino a fine tuo prossimo turno o danno subito. |
| **5°** | **Devastazione Meccanica (I)** | Il tuo *Impulso Elettromagnetico* distrugge istantaneamente automi che falliscono il TS se sono di **GS 1/2 o inferiore**. |
| **8°** | **Devastazione Meccanica (II)** | La soglia di distruzione istantanea sale a **GS 1 o inferiore**. |
| **10°** | **Riparazione di Fortuna** | **Azione:** Tira 1d100. Se il risultato è **≤ al tuo livello**, ottieni un effetto speciale deciso dal GM (es. tecnica potente).<br>**Ricarica:** 7 giorni (solo se ha successo). |
| **Max** | **The Jury Rig** | Il tuo rig agisce in simbiosi perfetta. Non hai più bisogno di lanciare dadi per fargli compiere le sue azioni standard o di routine (successo automatico). |

--- 

### Specializzazione dell'ingegnere

#### Macchinista
_Focalizzato sul combattimento diretto e sul supporto offensivo tramite droni._

| Livello | Privilegio | Descrizione |
| :--- | :--- | :--- |
| **1°** | **Competenze Bonus** | Ottieni competenza in **Armi Marziali** e **Scudi**. |
| **1°** | **Attacco Coordinato** | Quando usi l'azione Attacco, puoi usare un'**Azione Bonus** per far attaccare il tuo drone. Danni: **1d6 + Sag radianti**. Usi pari al Mod. Saggezza. |
| **1°** | **Tecniche Bonus** | *Esplosione Laser, Potenziamento Sensoriale* |
| **2°** | **Rig Expansion: Fiore di Fuoco** | **Azione:** Cono di fiamme di 9m. Danni: **2d10 + Livello Ingegnere** (TS Des dimezza). |
| **3°** | **Tecniche Bonus** | *Drone d'Assalto, Arma Potenziata* |
| **5°** | **Tecniche Bonus** | *Assorbimento, Schema d'Attacco* |
| **6°** | **Attacco Sincronizzato** | L'*Attacco Coordinato* infligge ora **2d6 danni** e il bersaglio deve superare un **TS Costituzione** o perdere le reazioni. |
| **7°** | **Tecniche Bonus** | *Sfera al Plasma, Sentinella Furtiva* |
| **8°** | **Repulsore** | **Azione Bonus** (mano secondaria): Attacco a distanza. Danni: **1d8 forza** + bersaglio **Prono** (TS Cost).<br>_(Aumenta a 2d8 al 14° livello)._ |
| **9°** | **Tecniche Bonus** | *Contagio, Incenerimento* |

---

#### Medico
_Specialista nel supporto vitale e nel recupero rapido sul campo._

| Livello | Privilegio | Descrizione |
| :--- | :--- | :--- |
| **1°** | **Competenza Bonus** | Ottieni competenza negli **Scudi**. |
| **1°** | **Dottore in Medicina** | Quando curi con una tecnica (Grado 1+), curi PF extra pari a **2 + grado della tecnica**. |
| **1°** | **Tecniche Bonus** | *Riparare, Trauma* |
| **2°** | **Rig Expansion: Rigenerazione** | **Azione:** Riserva di cura pari a **5 × Livello Ingegnere**, distribuibile tra creature entro 9m (max metà PF del bersaglio per cura). |
| **3°** | **Tecniche Bonus** | *Sostenere, Rimedio Minore* |
| **5°** | **Tecniche Bonus** | *Ottimizzare, Resuscitare* |
| **6°** | **Sapiente della Guarigione** | Quando curi un'altra creatura con una tecnica, ti curi anche tu di **2 + grado della tecnica**. |
| **7°** | **Tecniche Bonus** | *Suscettibilità Energetica, Microstabilizzatore* |
| **8°** | **Attacco Caricato** | Una volta per turno, aggiungi **1d8 danni necrotici** a un attacco con arma.<br>_(Aumenta a 2d8 al 14° livello)._ |
| **9°** | **Tecniche Bonus** | *Riparare di Massa (Guarigione di massa?), Rianimare* |

---

#### Armeggiatore
_Maestro della modifica dell'equipaggiamento e del sabotaggio nemico._

| Livello | Privilegio | Descrizione |
| :--- | :--- | :--- |
| **1°** | **Competenze Bonus** | Ottieni competenza in **Armature Pesanti** e **Veicoli (Planetari)**. |
| **1°** | **Potenziamento Equipaggiamento** | Una volta per riposo lungo, conferisci per 12 ore:<br>• **+1 CA** a un'armatura, *oppure*<br>• **+1 Attacco/Danni** a un'arma. |
| **1°** | **Tecniche Bonus** | *Impedenza, Disturbatore Sensoriale* |
| **2°** | **Rig Expansion: Sabotare Equip.** | **Azione:** Bersaglio entro 9m effettua TS Intelligenza. Fallimento (scegli uno):<br>• Svantaggio all'attacco<br>• Prossimo attacco contro di lui ha vantaggio<br>• Perde resistenze fisiche. |
| **3°** | **Tecniche Bonus** | *Collegamento Corticale, Paralizzatore* |
| **5°** | **Tecniche Bonus** | *Costruzione Rapida (Costrutto?), Effetto Disfacimento* |
| **6°** | **Aggiornamento Difesa** | Ottieni **+1 CA** (con armature medie/pesanti) e **Resistenza** a un tipo di danno (Fuoco, Freddo, Fulmine, Forza). Puoi cambiare resistenza con un riposo lungo. |
| **7°** | **Tecniche Bonus** | *Microstabilizzatore, Sfera di Plasma* |
| **8°** | **Impulso Amplificato** | Il tuo *Impulso Elettromagnetico* (privilegio base Ing.) infligge ora anche **2d10 + Livello Ingegnere** danni da fulmine. |
| **9°** | **Tecniche Bonus** | *Incenerimento, Rimedio Maggiore* |

---

### Poteri Esper Ingegnere

| Caratteristica di Lancio: | Saggezza   |
| ------------------------- | ---------- |
| Tipo di Potere: Tecniche  | Forgiatura |

#### Grado 0 (Tecniche Prime)
_Queste tecniche possono essere utilizzate a volontà._

| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Amplificare Abilità** | 1 azione | Tocco | 1 minuto | Inietti un booster in una creatura consenziente. Una volta durante la durata, il bersaglio può tirare un d4 e aggiungere il numero ottenuto a una prova di caratteristica a sua scelta. Può tirare il dado prima o dopo aver effettuato la prova. L'effetto termina dopo l'uso. |
| **Analizzare Dispositivo** | 1 minuto | Tocco | Istantanea | Scopri tutti i comandi, i meccanismi e le funzioni elettroniche o meccaniche di un automa, costrutto, dispositivo, macchina o veicolo toccato. Ottieni una conoscenza di base su come attivare e far funzionare il dispositivo. |
| **Attivare Dispositivo** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Puoi fornire energia o attivare un dispositivo semplice (non più grande di un cubo di 1,5m) a distanza, come un pannello luci, una ventola o uno schermo. Se l'oggetto non ha alimentazione, gli fornisci energia per la durata. |
| **Cerchio Statico** | 1 azione | Personale (1,5m) | Istantanea | Estendi le braccia emettendo brevi flussi di energia elettrostatica. Ogni creatura a tua scelta entro 1,5 metri da te deve superare un TS su Costituzione o subire **1d6 danni da fulmine**.<br>_Il danno aumenta di 1d6 al 5° (2d6), 11° (3d6) e 17° livello (4d6)._ |
| **Deflettere Elementi** | 1 azione | Tocco | Concentrazione, fino a 1 minuto | Piazzi un piccolo generatore di campo su una creatura consenziente. Una volta prima della fine della durata, quella creatura riceve un bonus di +2 al prossimo Tiro Salvezza contro qualsiasi tipo di danno elementale (fuoco, freddo, fulmine, tuono, acido). L'effetto termina dopo l'uso. |
| **Scarica Elettrica** | 1 azione | 18 metri | Istantanea | Lanci uno spuntone di elettricità verso un bersaglio entro gittata. Effettua un attacco a distanza di forgiatura. Il bersaglio non beneficia di copertura per questo attacco. Se colpisci, il bersaglio subisce **1d8 danni da fulmine** e perde la sua copertura fino all'inizio del tuo prossimo turno.<br>_Il danno aumenta di 1d8 al 5° (2d8), 11° (3d8) e 17° livello (4d8)._ |
| **Scarica Sonica** | 1 azione | Personale (1,5m) | Istantanea | Emetti un'esplosione di energia sonica centrata su di te. Ogni creatura entro un raggio di 1,5 metri (escluso te) deve effettuare un TS su Costituzione o subire **1d6 danni da tuono**. La tecnica emette un boato udibile fino a 45 metri.<br>_Il danno aumenta di 1d6 al 5° (2d6), 11° (3d6) e 17° livello (4d6)._ |
| **Schermo Virtuale** | 1 azione | 27 metri | Concentrazione, fino a 1 minuto | Puoi visualizzare i contenuti su schermo di qualsiasi display di dati digitale che puoi vedere entro la gittata. Le informazioni appaiono davanti a te in un'immagine traslucida che solo tu puoi vedere. |
| **Spruzzo Acido** | 1 azione | 3 metri | Istantanea | Spruzzi un rapido getto di acido verso una creatura entro la gittata. La creatura deve superare un TS su Destrezza o subire **1d10 danni da acido**.<br>_Il danno aumenta di 1d10 al 5° (2d10), 11° (3d10) e 17° livello (4d10)._ |
| **Stabilizzare** | 1 azione | Tocco | Istantanea | Quando attivi questo potere su una creatura vivente a 0 punti ferita, quella creatura diventa stabile. |
| **Visione Gamma** | 1 azione | Personale | 10 minuti | Il tuo impianto altera la tua capacità di vedere spettri di luce potenziati. Ottieni scurovisione con un raggio di 12 metri. Disattivare questa abilità richiede un'azione. Mentre sei alla luce del sole o luce molto intensa, hai svantaggio ai tiri per colpire e alle prove di Saggezza (Percezione) basate sulla vista. |

#### Grado 1
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Balsamo da Campo** | 1 azione | 18 metri | Istantanea | Invii micro-droni per somministrare cure ai tuoi alleati. Tre creature a tua scelta che puoi vedere entro la gittata recuperano punti ferita pari a **1d4 + il tuo modificatore di forgiatura**. Questa abilità non ha effetto su costrutti o automi.<br>_A Gradi Superiori: La guarigione aumenta di 1d4 per ogni grado sopra il 1°._ |
| **Barriera** | 1 azione | 18 metri | Concentrazione, fino a 10 minuti | Un campo di forza appare e circonda una creatura a tua scelta entro la gittata, garantendole un bonus di +2 alla CA per la durata. |
| **Braccio di Carico** | 1 azione | Tocco | Concentrazione, fino a 1 minuto | Forgi un accessorio cibernetico sopra l'arto di una creatura consenziente. Per la durata, il bersaglio ha vantaggio alle prove di Forza (Atletica) effettuate per muovere, sollevare o trasportare oggetti e lo fa come se fosse di una taglia più grande. |
| **Carica Voltaica** | 1 azione bonus | Personale | Concentrazione, fino a 1 minuto | Imbui le tue armi con energia elettrica caricata. Fino al termine dell'effetto, i tuoi attacchi con l'arma infliggono **1d4 danni da fulmine extra** quando colpiscono. |
| **Connessione Remota** | 1 azione | 27 metri | Concentrazione, fino a 10 minuti | Puoi usare un dispositivo vicino come se fosse proprio di fronte a te. Scegli qualsiasi dispositivo elettronico entro la gittata che puoi vedere. Appare un set di controlli virtuali davanti a te, permettendoti di usare il dispositivo come se lo stessi toccando fisicamente. |
| **Difensore a Spirale** | 1 reazione | Personale | Istantanea | _(Quando vieni bersagliato da un attacco)_ Attivi un gruppo di piccoli scudi energetici che spirala verso l'alto intorno al tuo corpo per deflettere un attacco in arrivo da un bersaglio che scegli. L'attacco del bersaglio ha svantaggio al tiro per colpire. |
| **Direttiva Intercettazione** | 1 azione bonus | Personale | Concentrazione, fino a 1 minuto | Sei in grado di leggere e comprendere i pattern di comando elettronici all'interno o scambiati tra automi e costrutti. Fino al termine dell'effetto, hai vantaggio ai Tiri Salvezza su Destrezza e Saggezza contro gli attacchi da qualsiasi minaccia di questo tipo. |
| **Disturbatore Sensoriale** | 1 azione bonus | 9 metri | 1 minuto | Crei un effetto di mascheramento sensoriale intorno a una creatura entro la gittata. Fino al termine dell'effetto, qualsiasi creatura che bersaglia la creatura influenzata con un attacco o un potere dannoso deve prima effettuare un TS su Saggezza. Se fallisce, deve scegliere un nuovo bersaglio o perdere l'attacco. Termina se la creatura protetta attacca. |
| **Esplosione Laser** | 1 azione | 36 metri | Istantanea | Spara un raggio laser ad alta potenza verso una creatura a tua scelta entro la gittata. Effettua un attacco a distanza di forgiatura. Se colpisce, il bersaglio subisce **4d6 danni radianti**. Inoltre, il prossimo tiro per colpire effettuato contro questo bersaglio prima della fine del tuo prossimo turno ha vantaggio.<br>_A Gradi Superiori: Il danno aumenta di 1d6 per ogni grado sopra il 1°._ |
| **Impedenza** | 1 azione | 9 metri | Concentrazione, fino a 1 minuto | Un pacchetto di micro-droni disturba e distrae fino a tre creature a tua scelta entro la gittata che puoi vedere. Ogni creatura deve effettuare un TS su Saggezza. Per la durata, ogni bersaglio che fallisce subisce una penalità di 1d4 a tutti i tiri per colpire e tiri salvezza.<br>_A Gradi Superiori: +1 bersaglio aggiuntivo per ogni grado sopra il 1°._ |
| **Potenziamento Sensoriale** | 1 azione | 9 metri | Concentrazione, fino a 1 minuto | Fornisci un aggiornamento sensoriale a un massimo di tre creature a tua scelta entro la gittata. Ogni creatura ottiene un bonus di +1d4 ai tiri per colpire e ai tiri salvezza prima della fine della durata.<br>_A Gradi Superiori: +1 bersaglio aggiuntivo per ogni grado sopra il 1°._ |
| **Rimescolatore Bersaglio** | 1 azione | Tocco | Concentrazione, fino a 10 minuti | Piazzi un dispositivo su una creatura consenziente. Fino al termine dell'effetto, diventa una macchia per i sensori di mira dell'IA di automi e costrutti. Le creature di quei tipi hanno svantaggio ai tiri per colpire contro il bersaglio. |
| **Riparare** | 1 azione | Tocco | Istantanea | Una creatura (o un costrutto/automa/oggetto) che tocchi recupera punti ferita pari a **1d8 + il tuo modificatore di forgiatura**.<br>_A Gradi Superiori: La guarigione aumenta di 1d8 per ogni grado sopra il 1°._ |
| **Sensi Esper** | 1 azione | Personale | Concentrazione, fino a 10 minuti | Per la durata, percepisci la presenza di qualsiasi potere esper attivo entro 9 metri da te. Se percepisci un potere, puoi usare la tua azione per vedere una debole aura attorno a qualsiasi creatura o oggetto visibile che porta l'effetto. |
| **Trauma** | 1 azione | Tocco | Istantanea | Causi una rottura nel corpo della creatura. Effettua un attacco in mischia di forgiatura. Se colpisce, il bersaglio subisce **3d10 danni necrotici**.<br>_A Gradi Superiori: Il danno aumenta di 1d10 per ogni grado sopra il 1°._ |

#### Grado 2
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Arma Potenziata** | 1 azione bonus | Tocco | Concentrazione, fino a 1 ora | Tocchi un'arma mondana, caricandola con l'energia del tuo rig. Fino al termine dell'effetto, quell'arma diventa un'arma forgiata (magica) con un bonus di +1 ai tiri per colpire e ai danni.<br>_A Gradi Superiori: Il bonus diventa +2 al Grado 4 e +3 al Grado 6._ |
| **Rimedio Minore** | 1 azione | Tocco | Istantanea | Somministri un trattamento a una creatura e poni fine a una malattia o a una condizione che la affligge (cecità, sordità, paralisi, avvelenamento). |
| **Cappello Nero** | 1 azione | Personale | Concentrazione, fino a 1 minuto | Sei in grado di analizzare rapidamente dati elettronici. Ottieni vantaggio su tutte le prove di Intelligenza fatte usando un kit da hacker per rompere la crittografia o la sicurezza di un sistema. Permette anche di hackerare talenti di interdizione di grado 2 o inferiore. |
| **Cecità/Sordità** | 1 azione | 9 metri | 1 minuto | Puoi accecare o assordare un nemico. Scegli una creatura che puoi vedere, deve fare un TS su Costituzione o essere accecata o assordata. Può ripetere il TS alla fine di ogni suo turno. |
| **Collegamento Corticale** | 1 azione | Tocco | 1 ora | Piazzi un dispositivo su una creatura consenziente che si lega al tuo impianto. Mentre il bersaglio è entro 18 metri da te, ottiene un bonus di +1 alla CA e ai Tiri Salvezza, e ha resistenza a tutti i danni. Tuttavia, ogni volta che subisce danni, tu subisci lo stesso ammontare di danni. |
| **Comando Falso** | 1 azione | 9 metri | Concentrazione, fino a 10 minuti | Tenti di ingannare il protocollo di sicurezza di un automa o costrutto che puoi vedere. Il bersaglio deve effettuare un TS su Intelligenza. Se fallisce, ti considera un conoscente amichevole per la durata. L'effetto termina se tu o i tuoi compagni lo attaccate. |
| **Disintossicare** | 1 azione | Tocco | 1 ora | Fornisci a una creatura un'antitossina speciale. Neutralizzi un veleno attivo. Per la durata, il bersaglio ha vantaggio ai TS contro veleno e resistenza ai danni da veleno. |
| **Drone d'Assalto** | 1 azione bonus | 15 metri | 1 minuto | Lanci un piccolo drone da taglio al plasma che controlli. Quando lo attivi, fai un attacco in mischia di forgiatura contro una creatura entro 1,5m dal drone. Danni: **1d8 + mod. forgiatura radianti**. Come azione bonus nei turni successivi, puoi muovere il drone di 6 metri e ripetere l'attacco.<br>_A Gradi Superiori: +1d8 danni ogni due gradi sopra il 2° (Grado 4, 6, ecc.)._ |
| **Fantasma Dati** | 1 azione | Personale | Concentrazione, fino a 1 ora | Crei una maschera digitale per nascondere la presenza tua e di fino a 6 compagni su qualsiasi sistema informatico o rete. Penalità di -10 alle prove per localizzarvi. |
| **Individuare Verità** | 1 azione | 18 metri | 10 minuti | Crei una zona di onde psichiche che proibisce l'inganno in una sfera di 4,5 metri. Chi fallisce un TS Carisma non può mentire deliberatamente. |
| **Infravisione** | 1 azione | Tocco | 8 ore | Tocchi una creatura consenziente per garantirle la capacità di vedere lo spettro infrarosso. Ottiene infravisione fino a 18 metri. |
| **Lama al Plasma** | 1 azione bonus | Personale | Concentrazione, fino a 10 minuti | Generi una piccola lama da taglio al plasma. Puoi usare la tua azione per fare un attacco in mischia di forgiatura. Se colpisci, infliggi **3d6 danni radianti**. |
| **Paralizzatore** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Generi una rete stordente elettrica su un bersaglio. Deve superare un TS su Costituzione o essere Paralizzato. Può ripetere il TS alla fine di ogni suo turno.<br>_A Gradi Superiori: +1 bersaglio per ogni grado sopra il 2°._ |
| **Potenziare Abilità** | 1 azione | Tocco | Concentrazione, fino a 1 ora | Tocchi una creatura e le concedi un miglioramento fisico o mentale (vantaggio alle prove di una caratteristica a scelta, o PF temporanei per Costituzione, o capacità di carico per Forza). |
| **Riparazione Rapida** | 1 azione | Tocco | Istantanea | Ripari un automa, costrutto, dispositivo meccanico o veicolo che puoi toccare. Recupera **1d8 + il tuo modificatore di forgiatura** Punti Ferita (o Punti Scafo).<br>_A Gradi Superiori: +1d8 guarigione per ogni grado sopra il 2°._ |
| **Scanner di Sicurezza** | 1 azione | 36 metri | Istantanea | Percepisci la presenza di qualsiasi trappola entro la gittata che sia in linea di vista. Non ne apprendi la posizione esatta, ma la natura del pericolo. |
| **Sostenere** | 1 azione | 9 metri | 8 ore | Inietti uno stimolante di potenziamento. Scegli fino a tre creature. I loro Punti Ferita massimi e attuali aumentano di 5 per la durata.<br>_A Gradi Superiori: +5 PF per ogni grado sopra il 2°._ |
| **Trattamento di Massa** | 10 minuti | 9 metri | Istantanea | Tratti medicalmente fino a sei creature a tua scelta. Ognuna recupera **2d8 + mod. forgiatura PF**. Non ha effetto su costrutti.<br>_A Gradi Superiori: +1d8 guarigione per ogni grado sopra il 2°._ |

#### Grado 3
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Adattamento Atmosferico** | 1 azione | 9 metri | 24 ore | Conferisce a 10 creature la capacità di respirare in ambienti privi di aria (vuoto, sott'acqua). |
| **Assorbimento** | 1 azione | Tocco | Concentrazione, fino a 1 ora | Tocchi una creatura e crei un sottile campo di energia. La creatura ha resistenza a un tipo di danno elementale a tua scelta (acido, freddo, fuoco, fulmine, tuono). |
| **Balsamo da Campo Maggiore** | 1 azione bonus | 18 metri | Istantanea | Invii micro-droni per cure d'emergenza. Fino a sei creature recuperano **1d4 + mod. forgiatura PF**.<br>_A Gradi Superiori: +1d4 guarigione per ogni grado sopra il 3°._ |
| **Blocco Sistema** | 1 azione | Tocco | Fino a dissoluzione | Piazzi una restrizione di sicurezza su un dispositivo dati elettronico, bloccandone l'accesso a chiunque tranne te e le creature designate. |
| **Condensatore** | 1 azione | 18 metri | 1 ora | Una sfera di luce intensa (raggio 18m) si diffonde da un punto o oggetto. |
| **Corrompere Modello** | 1 azione | Tocco | Concentrazione, fino a 1 minuto | Piazzi un marcatore su una creatura (attacco in mischia). TS Saggezza o subisce uno svantaggio a scelta o danni necrotici extra dai tuoi attacchi. |
| **Costrutto Rapido** | 1 minuto | Personale | Istantanea | Crei un costrutto robotico (statistiche da "Forged Construct") che ti obbedisce. Controllo per 24 ore.<br>_A Gradi Superiori: Crei più costrutti o di grado più alto._ |
| **Estensione Sensoriale** | 1 minuto | 8 km | Concentrazione, fino a 10 minuti | Crei un sensore invisibile in un luogo noto o ovvio per vedere e sentire a distanza. |
| **Forgiare Veicolo** | 10 minuti | 9 metri | Concentrazione, fino a 8 ore | Assembli un veicolo terrestre temporaneo (moto o auto) che può trasportare fino a 4 creature medie. Hai competenza raddoppiata per guidarlo.<br>_A Gradi Superiori: Veicoli più grandi, volanti o acquatici._ |
| **Innesco Programmato** | 1 ora | Tocco | Fino a attivazione | Piazzi un micro-dispositivo o glifo. Esplode (5d8 danni) o lancia un potere immagazzinato quando attivato da condizioni specifiche. |
| **Ottimizzatore** | 1 azione | 9 metri | Concentrazione, fino a 1 minuto | Somministri un vitalizzante. I bersagli hanno vantaggio ai TS su Saggezza e Morte, e recuperano il massimo dei PF da qualsiasi cura. |
| **Raggio a Impulsi** | 1 azione | Linea 18 metri | Istantanea | Spara un raggio ionico. Ogni creatura nella linea deve superare un TS Destrezza. I costrutti subiscono **5d6 danni da fulmine** e sono Storditi. Le creature organiche subiscono danni ma non stordimento. Disabilita l'elettronica. |
| **Resuscitare** | 1 azione | Tocco | Istantanea | Tratti una creatura morta entro l'ultimo minuto. Ritorna in vita con 1 punto ferita. |
| **Riparazione da Campo** | 1 azione | 18 metri | Istantanea | Invii droni a riparare fino a tre costrutti o veicoli. Recuperano **1d4 + mod. forgiatura PF/Scafo**. |
| **Ripristinare Modello** | 1 azione | 36 metri | Istantanea | Rimuovi tutti i marcatori soprannaturali e le maledizioni da una creatura o oggetto. |
| **Sbrogliare Effetto** | 1 azione | 36 metri | Istantanea | Scegli una creatura, oggetto o effetto magico/esper. Termini qualsiasi potere di grado 3 o inferiore su di esso. Per gradi superiori, serve una prova di caratteristica. |
| **Schema d'Attacco** | 1 azione | 36 metri | Concentrazione, fino a 1 minuto | Uno sciame di droni spara su un'area (cubo 6m x 3m). Le creature subiscono **3d8 danni da fuoco e forza** (TS Destrezza dimezza). Puoi ripetere l'attacco come azione nei turni successivi. |
| **Sentinella Personale** | 1 azione | Personale (4,5m) | Concentrazione, fino a 10 minuti | Crei piccoli droni stealth che orbitano intorno a te. I nemici che entrano nell'area o iniziano il turno lì devono superare un TS Saggezza o subire **3d8 danni radianti**. |
| **Traduttore Universale** | 1 azione | Tocco | 1 ora | Conferisci la capacità di comprendere qualsiasi lingua parlata. |
| **Zona d'Impatto** | 1 azione | 18 metri | Istantanea | Lanci un dispositivo che esplode con forza concussiva in un cubo di 4,5 metri. **3d10 danni da forza** e i bersagli cadono proni (TS Destrezza). |

#### Grado 4
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Anello di Fulmini** | 1 azione | 90 metri | Istantanea | Crei un anello di elettricità a terra (raggio 6m). Chi è nell'area subisce **5d8 danni da fulmine** (TS Destrezza). |
| **Campo Reattivo** | 1 azione | Personale | 10 minuti | Ti circondi di un'aura di calore o freddo. Resistenza all'elemento opposto e 2d8 danni a chi ti colpisce in mischia. |
| **Costrutto Base** | 1 minuto | 18 metri | Concentrazione, fino a 1 ora | Forgi costrutti temporanei (fino a GS 2) che obbediscono ai tuoi comandi. |
| **Drenare Potere** | 1 azione | 9 metri | Istantanea | Contro Costrutti: Attacco a distanza, **5d6 forza**, ti curi pari al danno.<br>Contro Dispositivi: TS del dispositivo o si spegne e ti cura in base alla grandezza. |
| **Egida Superiore** | 1 azione | Tocco | Concentrazione, fino a 1 ora | Resistenza a danni contundenti, perforanti e taglienti. +3 ai TS su Raffica. |
| **Micro Stabilizzatore** | 1 azione | Tocco | 8 ore | Attacchi un dispositivo a una creatura. La prima volta che scenderebbe a 0 PF, scende invece a 1 PF e l'effetto termina. |
| **Raggio Traente** | 1 azione bonus | 9 metri | Concentrazione, fino a 1 minuto | Appare un drone. Puoi dirigerlo per tirare una creatura di 6 metri verso il drone (TS Destrezza). |
| **Sentinella Furtiva** | 1 azione | 9 metri | 8 ore | Lanci un micro-drone invisibile che staziona in un punto. Spara un raggio (20 danni radianti, TS Destrezza dimezza) a chi si avvicina ostilmente. Si disattiva dopo aver inflitto 60 danni totali. |
| **Sfera al Plasma** | 1 azione | 36 metri | Concentrazione, fino a 1 minuto | Lanci un drone che crea una sfera di energia di 6 metri. Chi entra subisce **2d6 danni radianti** (TS Costituzione). Puoi usare un'azione bonus per sparare un fulmine (4d6) dalla sfera. |
| **Suscettibilità Energetica** | 1 azione | 18 metri | 1 minuto | Applichi una debilitazione a una creatura (TS Costituzione). Perde resistenza a un elemento scelto e subisce **2d6 danni extra** di quel tipo la prima volta che viene colpita ogni turno. |
| **Svincolare** | 1 azione | Tocco | 1 ora | Il bersaglio ignora terreno difficile, non può essere paralizzato o trattenuto e può liberarsi da manette/prese spendendo movimento. |
| **Trasferimento Condotto** | 1 azione bonus | 36 metri | Istantanea | Ti teletrasporti tra due dispositivi o cavi elettrici connessi. |
| **Trasmutare Forma** | 1 azione | 18 metri | Concentrazione, fino a 1 ora | Trasformi una creatura in una bestia di GS pari o inferiore. |
| **Zona Ustionante** | 1 azione | 36 metri | Concentrazione, fino a 10 minuti | Crei una cupola di energia infuocata. Chi è all'interno o entro 3m dall'esterno subisce **5d8 danni da fuoco** (TS Destrezza). |

#### Grado 5
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Barricata d'Acciaio** | 1 azione | 36 metri | Concentrazione, fino a 10 minuti | Crei un muro solido di acciaio (pannelli 3m x 3m, spessore 15cm). Fornisce copertura totale e ha PF propri. |
| **Contagio** | 1 azione | Tocco | 7 giorni | Infetti una creatura con una malattia debilitante tramite attacco in mischia. |
| **Esplosione Tossica** | 1 azione | 90 metri | Concentrazione, fino a 1 minuto | Lanci un drone che rilascia gas tossico in una sfera di 6 metri. **4d10 danni da veleno** (TS Costituzione). |
| **Guarigione di Massa** | 1 azione | 18 metri | Istantanea | Energia positiva cura fino a 6 creature in un punto scelto. Recuperano **3d8 + mod. PF**. |
| **Guardiano Imponente** | 1 minuto | 27 metri | Concentrazione, fino a 1 ora | Forgi un protettore meccanico (GS 5 o inferiore) da metallo/plastica presente nell'area. |
| **Incenerire** | 1 azione | 18 metri | Istantanea | Attacco aereo orbitale o da drone pesante. Un cilindro di raggio 3m e alto 12m viene colpito. TS Destrezza: **4d6 danni fuoco + 4d6 danni radianti**. |
| **Interdizione Cosmica** | 1 azione | Personale | Istantanea | Crei un'area protetta (raggio 18m). Blocca entità energetiche e puoi aggiungere un effetto extra (luce, silenzio, paura, blocco teletrasporto). |
| **Matrice di Controllo** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Tenti di assumere il controllo di un automa o costrutto. TS Intelligenza o obbedisce ai tuoi comandi. |
| **Percezione Estesa** | 10 minuti | Personale | Concentrazione, fino a 10 minuti | Estendi i sensi per vedere e sentire un bersaglio ovunque nel sistema solare (TS Saggezza). |
| **Rianimare** | 1 ora | Tocco | Istantanea | Riporti in vita una creatura morta da non più di 10 giorni con 1 PF. Cura veleni e malattie non magiche. |
| **Richiamo Istantaneo** | 1 azione | Personale | Concentrazione, fino a 1 ora | Ottieni memoria eidetica e +10 a prove di Intelligenza per ricordare info. |
| **Rimedio Maggiore** | 1 azione | Tocco | Istantanea | Rimuovi un livello di esaurimento, o effetti di charme, pietrificazione, maledizioni o riduzione PF/statistiche. |
| **Riparazione da Campo Maggiore** | 1 azione | 18 metri | Istantanea | Invii droni a riparare fino a 4 costrutti. Recuperano **1d8 + mod. PF**. |
| **Stasi Meccanica** | 1 azione | 27 metri | Concentrazione, fino a 1 minuto | Paralizzi un automa o costrutto (TS Saggezza ripetibile). |
| **Tuta di Sopravvivenza** | 1 azione | 9 metri | 24 ore | Crei campi di forza ambientali per 8 creature. Respirano ovunque, immuni a gas velenosi e temperature estreme. |

#### Grado 6
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Barriera di Lame** | 1 azione | 27 metri | Concentrazione, fino a 10 minuti | Muro di lame vorticose in acciaio forgiato. Fornisce copertura e infligge **6d10 danni taglienti** a chi attraversa (TS Destrezza). |
| **Campo di Negazione** | 1 azione | Personale (3m) | Concentrazione, fino a 1 minuto | Sfera che blocca poteri esper di grado 5 o inferiore. |
| **Cerotto Stimolante** | 10 minuti | 9 metri | Istantanea | Somministri un booster a 12 creature. Cura malattie/veleni, immunità a paura/veleno, vantaggio TS Saggezza, +2d10 PF max. Effetto 24 ore. |
| **Colpo Diretto** | 1 azione bonus | Personale (9m) | Concentrazione, fino a 1 minuto | Crei un link tattico. Come azione bonus nei turni successivi, comandi a un alleato di usare la reazione per attaccare un bersaglio. |
| **Forgiare Automa** | 1 minuto | 3 metri | Istantanea | Assembli parti meccaniche per creare un costrutto fedele (Alphalite) che rimane attivo per 24 ore. |
| **Navigatore Virtuale** | 1 minuto | Personale | Concentrazione, fino a 24 ore | Crei un display che mostra la rotta più breve e diretta verso una destinazione nota nel sistema solare. |
| **Passaggio Dinamico** | 1 azione | Personale | 1 round | Crei un link tra un dispositivo grande vicino e uno lontano (stesso sistema). Permette il teletrasporto tra i due. |
| **Punto di Ritorno** | 1 azione | 18 metri | Istantanea | Teletrasporti te e 5 creature in un "rifugio" designato precedentemente (luogo familiare). |
| **Rifugio Interdetto** | 1 azione bonus | 15 metri | 1 minuto | Proteggi un'area (4000 mq). Blocca teletrasporto in entrata. Danneggia specifici tipi di creature (es. costrutti, netherant) che entrano (**5d10 danni radianti o necrotici**). |
| **Rinnovamento Cellulare** | 1 azione | 18 metri | Istantanea | Curi 70 PF a una creatura e rimuovi cecità, sordità e malattie. |
| **Vera Vista** | 1 azione | Tocco | 1 ora | Conferisci visione del vero (36m). |
| **Virus** | 1 azione | 18 metri | Istantanea | Scateni una malattia virale. TS Costituzione. **14d6 danni necrotici** (o metà). Riduce PF massimi. |

#### Grado 7
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Controllo Gravità** | 1 azione | 30 metri | Concentrazione, fino a 1 minuto | Aumenti, annulli o inverti la gravità in un cilindro di 15 metri. |
| **Copia Cloni** | 12 ore | Tocco | Permanente | Crei un simulacro illusorio ma semi-reale di una bestia o umanoide. Ha metà PF e non recupera slot. |
| **Design Duraturo** | 1 azione | Tocco | 24 ore | Ottimizzi un costrutto o veicolo. Immunità a corrosione meteo, muove normale su terreno difficile, immunità stordito/inabile. Recupera max PF con riparazioni rapide. |
| **Forma Intangibile** | 1 azione | Personale | 8 ore | Diventi etereo e intangibile. |
| **Innesco Funesto** | 1 minuto | Tocco | Fino a attivazione | Piazzi un glifo letale. All'attivazione, infligge effetti devastanti (es. 10d10 necrotici, follia, dolore atroce) in un raggio di 18m. |
| **Rianimazione Totale** | 1 ora | Tocco | Istantanea | Riporta in vita una creatura morta da non più di un secolo con tutti i PF. |
| **Rigenerare** | 1 minuto | Tocco | 1 ora | Il bersaglio recupera 4d8+15 PF e rigenera 1 PF ogni turno. Arti persi ricrescono. |
| **Rottura dell'Anima** | 1 azione bonus | 9 metri | Istantanea | Onda sonica distruttiva. Creature con <50 PF assordate, <40 cieche/sorde, <30 stordite, <20 uccise istantaneamente. |
| **Smantellare** | 1 azione | 18 metri | Istantanea | Invii naniti contro un costrutto/veicolo. TS Costituzione. Fallimento: **6d8 forza + 6d8 fulmine** e paralizzato. Successo: metà danni e menomato. |
| **Tempesta di Fuoco** | 1 azione | 45 metri | Istantanea | Dieci cubi di fuoco da 3m. **7d10 danni da fuoco** (TS Destrezza). |

#### Grado 8
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Aura Reattiva** | 1 azione | Personale | Concentrazione, fino a 1 minuto | Sfera di 9m. Alleati hanno vantaggio ai TS. Nemici che colpiscono un alleato subiscono **6d10 danni radianti** (TS Destrezza dimezza). |
| **Costrutto d'Elite** | 1 minuto | Personale | Istantanea | Forgi un costrutto avanzato (Prime Alpha Mecharoid) che ti obbedisce. Controllo per 24 ore. |
| **Negazione Superiore** | 1 azione | Personale (3m) | Concentrazione, fino a 1 minuto | Blocca poteri, oggetti forgiati, evocazioni e teletrasporto nell'area. |
| **Passeggiata Spaziale** | 1 azione | 9 metri | Concentrazione, fino a 10 minuti | 10 creature possono sopravvivere nel vuoto, volare (90m) e sono immuni a danni elementali mondani. |
| **Ricostruzione Totale** | 1 ora | Tocco | Istantanea | Ripari completamente un costrutto, veicolo o dispositivo distrutto (non più di 100 anni), ripristinando tutti i PF/Scafo e integrità. |

#### Grado 9
| Nome                      | Tempo di attivazione | Gittata   | Durata                       | Descrizione                                                                                                                                  |
| :------------------------ | :------------------- | :-------- | :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mutaforma**             | 1 azione             | Personale | Concentrazione, fino a 1 ora | Assumi la forma di qualsiasi creatura con GS pari al tuo livello o inferiore.                                                                |
| **Preveggenza**           | 1 minuto             | Tocco     | 8 ore                        | Il bersaglio non può essere sorpreso e ha vantaggio a tiri per colpire, prove e TS. I nemici hanno svantaggio.                               |
| **Rinnovamento di Massa** | 1 azione             | 18 metri  | Istantanea                   | Curi fino a 700 PF divisi tra creature a scelta. Rimuovi malattie, cecità, sordità.                                                          |
| **Ripristino Totale**     | 1 ora                | Tocco     | Istantanea                   | Riporti in vita una creatura morta da non più di 300 anni con tutti i PF, rimuovendo ogni male. Può rigenerare un corpo intero se distrutto. |
## Melder

| Caratteristica           | Descrizione                                                                                          |
| :----------------------- | :--------------------------------------------------------------------------------------------------- |
| Dadi Vita                | 1d6 per livello da melder                                                                            |
| PF al 1° Livello         | 6 + il tuo modificatore di Costituzione                                                              |
| PF ai Livelli Successivi | 1d6 (o 4) + il tuo modificatore di Costituzione per livello dopo il 1°                               |
| **Competenze**           |                                                                                                      |
| Armature                 | Nessuna                                                                                              |
| Armi                     | Coltello da combattimento, lame da lancio, bastone pieghevole, manganello metallico, pistola leggera |
| Tiri Salvezza            | Intelligenza, Saggezza                                                                               |
| Abilità                  | Due a scelta tra Astrofisica, Intuizione, Investigazione, Cultura, Medicina e Xenobiologia           |

### Tabella: Il Melder

| Livello | Bonus Comp. | Talenti Prime | Punti Talento | Grado Max Talento | Privilegi                       |
| :-----: | :---------: | :-----------: | :-----------: | :---------------: | :------------------------------ |
|   1°    |     +2      |       3       |       4       |         1         | Canalizzazione, Recupero Esper  |
|   2°    |     +2      |       3       |       6       |         1         | Disciplina Melder               |
|   3°    |     +2      |       3       |      14       |         2         | —                               |
|   4°    |     +2      |       4       |      17       |         2         | Aumento Punteggi Caratteristica |
|   5°    |     +3      |       4       |      27       |         3         | —                               |
|   6°    |     +3      |       4       |      32       |         3         | Privilegio Disciplina Melder    |
|   7°    |     +3      |       4       |      38       |         4         | —                               |
|   8°    |     +3      |       4       |      44       |         4         | Aumento Punteggi Caratteristica |
|   9°    |     +4      |       4       |      57       |         5         | —                               |
|   10°   |     +4      |       5       |      64       |         5         | Privilegio Disciplina Melder    |
|   11°   |     +4      |       5       |      73       |         6         |                                 |
|   12°   |     +4      |       5       |      78       |         6         | Aumento Punteggi Caratteristica |
|   13°   |     +5      |       5       |      83       |         7         |                                 |
|   14°   |     +5      |       5       |      88       |         7         |                                 |
|   15°   |     +5      |       5       |      94       |         8         |                                 |
|   16°   |     +5      |       5       |      100      |         8         | Aumento Punteggi Caratteristica |
|   17°   |     +6      |       5       |      107      |         9         |                                 |
|   18°   |     +6      |       5       |      114      |         9         | Aumento Prime                   |
|   19°   |     +6      |       5       |      123      |         9         | Aumento Punteggi Caratteristica |
|   20°   |     +6      |       5       |      133      |         9         | Talenti Caratteristici          |
### Privilegi di Classe: Melder

#### Statistiche di Canalizzazione
Il Melder attinge al potere della propria mente e alla fusione con l'universo per manifestare effetti chiamati Talenti

| Caratteristica | Dettaglio |
| :--- | :--- |
| **Caratteristica Chiave** | **Intelligenza** |
| **CD Tiro Salvezza** | 8 + Bonus di Competenza + Modificatore di Intelligenza |
| **Modificatore Attacco** | Bonus di Competenza + Modificatore di Intelligenza |
| **Risorsa** | **Punti Talento** (Recupero: Riposo Lungo) |
| **Talenti Conosciuti** | **Livello 1:** 3 Prime + 6 Talenti.<br>**Avanzamento:** +2 Talenti ogni volta che sali di livello. |
| **Convenzionale** | Puoi usare un talento col tag "convenzionale" senza spendere punti se lo conosci (rituale). |

---

### Tabella dei Privilegi

| Livello | Privilegio                 | Descrizione                                                                                                                                                                              |
| :------ | :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1°**  | **Canalizzazione**         | Ottieni l'accesso ai Talenti Esper e ai Talenti Prime. Usi l'Intelligenza per attivarli spendendo Punti Talento.                                                                         |
| **1°**  | **Recupero Esper**         | Una volta al giorno, dopo un **Riposo Breve**, recuperi Punti Talento pari a: **2 + (Livello Melder / 2)** (arrotondato per difetto).                                                    |
| **2°**  | **Disciplina del Melder**  | Scegli una specializzazione: **Metacinetico** o **Psicogenico**.<br>Ottieni privilegi specifici al 2°, 6° e 10° livello.                                                                 |
| **18°** | **Aumento Prime**          | Hai raggiunto una padronanza mentale assoluta. Puoi lanciare i tuoi talenti conosciuti di **Grado 1 e Grado 2** come se fossero di Grado Prime (ovvero a volontà, senza costo in punti). |
| **20°** | **Talenti Caratteristici** | Scegli due talenti conosciuti di **Grado 3**. Puoi attivarli ciascuno una volta al Grado 3 senza spendere Punti Talento.<br>**Recupero:** Riposo Breve o Lungo.                          |

### Specializzazioni Melder

#### Metacinetico
_Maestro della manipolazione della materia e dell'energia elementale._

| Livello | Privilegio | Descrizione |
| :--- | :--- | :--- |
| **2°** | **Precisione del Talento** | Quando usi un talento elementale o di cinesi che colpisce un'area, puoi scegliere un numero di creature pari a **1 + il grado del talento**. Le creature scelte superano automaticamente il TS e non subiscono danni (anche se normalmente ne subirebbero la metà). |
| **6°** | **Potenziamento Prime** | I tuoi talenti Prime che infliggono danni influenzano comunque le creature che superano il TS: subiscono **metà danni** (ma nessun effetto aggiuntivo). |
| **10°** | **Metacinetico Potenziato** | Aggiungi il tuo **modificatore di Intelligenza** a un tiro di danno di qualsiasi talento elementale o di cinesi. |

---

#### Psicogenico
_Specialista nel controllo mentale e nell'alterazione delle percezioni._

| Livello | Privilegio | Descrizione |
| :--- | :--- | :--- |
| **2°** | **Mesmerizzare** | **Azione:** Un bersaglio entro 1,5m che può vederti/sentirti deve superare un TS Saggezza. Fallimento: **Immobilizzato, Stordito (_Dazed_) e Inabile** fino alla fine del tuo prossimo turno. Puoi mantenere l'effetto spendendo un'azione nei turni successivi. Termina se il bersaglio subisce danni o si allontana. |
| **6°** | **Stordire e Disorientare** | **Azione:** Un bersaglio entro 9m effettua un TS Saggezza. Fallimento: **Disorientato** (non può usare reazioni) e ha **Svantaggio** al prossimo attacco. Successo: Il bersaglio è immune a questo potere per un riposo lungo. |
| **10°** | **Mente Secondaria** | Quando usi un potere psicogenico di **Grado 1 o superiore** che influenza un bersaglio singolo, puoi scegliere un **secondo bersaglio** entro la gittata per lo stesso potere. |
### Esper Melder

| **Caratteristica di Lancio:** | Intelligenza                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Tipo di Potere:**           | Talenti (Canalizzazione) (Questi talenti sono talenti esper, diversi dai talenti normali descritti in un'altra appendice) |

#### Grado 0

| Nome                       | Tempo di attivazione | Gittata   | Durata                          | Descrizione                                                                                                                                                                                                                                                                                                                                                           |
| :------------------------- | :------------------- | :-------- | :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Analizzare Dispositivo** | 1 minuto             | Tocco     | Istantanea                      | Scopri tutti i comandi, i meccanismi e le funzioni elettroniche o meccaniche di un automa, costrutto, dispositivo, macchina o veicolo toccato. Ottieni una conoscenza di base su come attivare e far funzionare il dispositivo.                                                                                                                                       |
| **Attivare Dispositivo**   | 1 azione             | 18 metri  | Concentrazione, fino a 1 minuto | Puoi fornire energia o attivare un dispositivo semplice (non più grande di un cubo di 1,5m) a distanza, come un pannello luci, una ventola o uno schermo. Se l'oggetto non ha alimentazione, gli fornisci energia per la durata.                                                                                                                                      |
| **Condotto Oscuro**        | 1 azione             | 36 metri  | 1 round                         | Crei una zona oscura di energia distruttiva attorno al bersaglio. Effettua un attacco a distanza di canalizzazione contro una creatura entro la gittata. Se colpisci, il bersaglio subisce **1d8 danni necrotici** e non può recuperare punti ferita fino all'inizio del tuo prossimo turno.<br>_Il danno aumenta di 1d8 al 5° (2d8), 11° (3d8) e 17° livello (4d8)._ |
| **Dardo di Forza**         | 1 azione             | 36 metri  | Istantanea                      | Un raggio di energia scaturisce dalle tue mani. Effettua un attacco a distanza di canalizzazione. Se colpisce, il bersaglio subisce **1d10 danni da forza**.<br>_Il danno aumenta di 1d10 al 5° (2d10), 11° (3d10) e 17° livello (4d10)._                                                                                                                             |
| **Dita Agili**             | 1 azione             | 9 metri   | 1 minuto                        | Sei in grado di generare un effetto telecinetico minore. Per la durata, puoi usare la tua azione per manipolare un oggetto, aprire una porta o un contenitore non chiusi a chiave, raccogliere un oggetto o versare il contenuto di una giara. Non puoi attaccare o attivare oggetti magici con questo potere.                                                        |
| **Egida**                  | 1 azione             | Personale | 1 round                         | Crei una barriera cinetica intorno a te. Fino alla fine del tuo prossimo turno, hai resistenza ai danni contundenti, perforanti e taglienti inflitti da attacchi con armi. Ricevi anche un bonus di +2 ai Tiri Salvezza su Destrezza contro effetti ad area (Burst Save).                                                                                             |
| **Lama Protonica**         | 1 azione             | Personale | Concentrazione, fino a 1 minuto | Una piccola lama di pura energia si forma intorno alla tua mano. La lama emette luce fioca per 3 metri. Per la durata, puoi usare la tua azione per effettuare un attacco in mischia di canalizzazione. Se colpisci, infliggi **1d6 danni da forza**.                                                                                                                 |
| **Messaggio Mentale**      | 1 azione             | 36 metri  | 1 round                         | Scegli una creatura entro la gittata e sussurri un messaggio. Il bersaglio (e solo il bersaglio) sente il messaggio e può rispondere con un sussurro che solo tu puoi sentire. Puoi lanciare questo potere attraverso oggetti solidi se conosci il bersaglio.                                                                                                         |
| **Mira Intuitiva**         | 1 azione             | 9 metri   | Concentrazione, fino a 1 round  | Focalizzi la tua attenzione verso un bersaglio entro la gittata. Ottieni vantaggio al tuo primo tiro per colpire contro il bersaglio nel tuo prossimo turno, fintanto che questo potere rimane attivo.                                                                                                                                                                |
| **Morsa di Gelo**          | 1 azione             | 18 metri  | Istantanea                      | L'aria diventa un'aura di gelo attorno a una creatura. Effettua un attacco a distanza di canalizzazione. Se colpisci, il bersaglio subisce **1d8 danni da freddo** e la sua velocità è ridotta di 3 metri fino all'inizio del tuo prossimo turno.<br>_Il danno aumenta di 1d8 al 5° (2d8), 11° (3d8) e 17° livello (4d8)._                                            |
| **Punto di Esplosione**    | 1 azione             | 3 metri   | Istantanea                      | Estendi la mano verso una creatura entro la gittata e causi un'esplosione di fiamme nella sua posizione. La creatura deve superare un TS su Costituzione o subire **1d12 danni da fuoco**.<br>_Il danno aumenta di 1d12 al 5° (2d12), 11° (3d12) e 17° livello (4d12)._                                                                                               |
| **Punto Illusorio**        | 1 azione             | Personale | Concentrazione, fino a 1 minuto | Crei una distorsione spaziale che emette un suono (da un sussurro a un urlo) o l'immagine statica di un oggetto (non più grande di un cubo di 1,5m) entro la gittata che dura per la durata.                                                                                                                                                                          |
| **Rinnovare**              | 1 azione             | Tocco     | Istantanea                      | Questo potere ripara una singola rottura o strappo in un oggetto che tocchi, come una maglia rotta, un tubo corroso o un cavo tagliato, purché la rottura non sia più grande di 30 cm.                                                                                                                                                                                |
| **Schermo Virtuale**       | 1 azione             | 27 metri  | Concentrazione, fino a 1 minuto | Puoi vedere i contenuti di qualsiasi display digitale entro la gittata come se fosse davanti a te. L'immagine appare traslucida solo per te.                                                                                                                                                                                                                          |
| **Sfera Fulminante**       | 1 azione             | 18 metri  | Istantanea                      | Scagli una sfera di energia elettrica. Scegli una creatura entro la gittata, o due creature entro la gittata che si trovino entro 1,5 metri l'una dall'altra. Un bersaglio deve superare un TS su Destrezza o subire **1d6 danni da fulmine**.<br>_Il danno aumenta di 1d6 al 5° (2d6), 11° (3d6) e 17° livello (4d6)._                                               |
| **Spinta**                 | 1 azione             | 3 metri   | Istantanea                      | Un'onda gravitazionale scatta dalla tua mano. Effettua un attacco a distanza di canalizzazione. Se colpisci, il bersaglio subisce **1d8 danni da forza** e deve effettuare un TS su Forza o essere spinto 3 metri via da te.<br>_Il danno aumenta di 1d8 al 5° (2d8), 11° (3d8) e 17° livello (4d8)._                                                                 |
| **Spinta Direzionale**     | 1 azione             | 9 metri   | Istantanea                      | Crei un'onda di forza opposta. Il bersaglio deve superare un TS su Forza o essere spinto fino a 1,5 metri via da te. Puoi anche muovere oggetti liberi fino a 22kg di 3 metri.                                                                                                                                                                                        |
|                            |                      |           |                                 |                                                                                                                                                                                                                                                                                                                                                                       |
#### Grado 1
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Alterare Aspetto** | 1 azione | Personale | 1 ora | Pieghi le particelle nello spettro visibile per far apparire te stesso diverso (inclusi vestiti ed equipaggiamento). Puoi sembrare 30cm più alto o basso, grasso o magro, ma la struttura corporea di base deve rimanere la stessa. |
| **Aprire Canale** | 1 azione | 150 metri | Concentrazione, fino a 10 minuti | Per la durata, puoi trasmettere la tua voce e la tua immagine a un dispositivo di comunicazione elettronico entro la gittata che hai visto o toccato nelle ultime 24 ore. |
| **Bastione** | 1 reazione | Personale | Istantanea | _(Quando vieni colpito da un attacco)_ Una barriera invisibile di forza appare e ti protegge. Fino all'inizio del tuo prossimo turno, hai un bonus di **+5 alla CA**, incluso contro l'attacco scatenante. Funziona anche come PSD contro armi cinetiche. |
| **Caduta Lenta** | 1 reazione | 18 metri | 1 minuto | _(Quando tu o una creatura entro 18m cade)_ Scegli fino a cinque creature che cadono. La loro velocità di discesa rallenta a 18 metri per round, annullando i danni da caduta se atterrano prima che l'incantesimo termini. |
| **Campo di Protezione** | 1 azione | Personale | 8 ore | Generi un campo di forza minore dal tuo corpo. La tua CA base diventa **13 + il tuo modificatore di Destrezza**. Termina se indossi armatura. |
| **Compagno Legato** | 1 ora | 3 metri | Istantanea | Imbui del materiale solido di sorium per creare un compagno legato (famiglio) che prende la forma di una creatura piccola o minuscola a tua scelta. Agisce indipendentemente ma obbedisce ai tuoi comandi. |
| **Contraccolpo Psichico** | 1 reazione | 18 metri | Istantanea | _(In risposta all'essere danneggiato da una creatura entro 18m che puoi vedere)_ Piazzi un marchio psichico sulla creatura che ti ha colpito. Il bersaglio deve effettuare un TS su Destrezza. Subisce **2d10 danni psichici** se fallisce, o la metà se riesce.<br>_A Gradi Superiori: +1d10 danni per ogni grado sopra il 1°._ |
| **Decifrare Linguaggi** | 1 azione | Personale | 1 ora | Per la durata, comprendi il significato letterale di qualsiasi lingua parlata che ascolti e qualsiasi lingua scritta che vedi. |
| **Dischi Guida** | 1 azione | 18 metri | Concentrazione, fino a 10 minuti | Crei piccoli dischi gravitazionali che orbitano attorno a una creatura. Il bersaglio ha un bonus di **+2 a tutti i TS su Destrezza e Costituzione** e ottiene una velocità di scalata pari alla velocità di camminata. |
| **Distorsione** | 1 azione | 27 metri | Istantanea | Deformi l'aria intorno a te in una sfera e la scagli. Effettua un attacco a distanza di canalizzazione. Se colpisce, la sfera esplode in una micro-singolarità e la creatura subisce **3d8 danni da forza**.<br>_A Gradi Superiori: +1d8 danni per ogni grado sopra il 1°._ |
| **Disturbatore Bersaglio** | 1 azione | Tocco | Concentrazione, fino a 10 minuti | Piazzi un dispositivo su una creatura. Diventa un'immagine sfocata per i sensori di automi e costrutti. Tali creature hanno svantaggio ai tiri per colpire contro il bersaglio. |
| **Forma Illusoria** | 1 azione | 18 metri | Concentrazione, fino a 10 minuti | Crei l'immagine di un oggetto o creatura non più grande di un cubo di 4,5 metri. L'immagine è puramente visiva (niente suoni o odori). |
| **Forza Concussiva** | 1 azione | 18 metri | Istantanea | Esplosione di energia in un quadrato di 3 metri. Ogni creatura nell'area deve superare un TS su Destrezza o essere gettata **Prona**. Le creature adiacenti a chi ha fallito devono a loro volta fare il TS o cadere prone. |
| **Frusta Artica** | 1 azione | Personale (Cono 4,5m) | Istantanea | Scateni un arco di vento sottozero. Ogni creatura nel cono deve effettuare un TS su Destrezza. Subisce **3d6 danni da freddo** se fallisce, o la metà se riesce.<br>_A Gradi Superiori: +1d6 danni per ogni grado sopra il 1°._ |
| **Frusta di Fulmini** | 1 azione | 36 metri | Concentrazione, fino a 1 minuto | Una striscia di elettricità scatta verso una creatura. Attacco a distanza di canalizzazione. Colpisce per **1d10 danni da fulmine** e si aggancia. Puoi usare la tua azione nei turni successivi per infliggere automaticamente 1d10 danni.<br>_A Gradi Superiori: +1d10 danni iniziali per ogni grado sopra il 1°._ |
| **Innervare** | 1 azione | Personale | 1 ora | Galvanizzi la tua forma fisica. Ottieni **1d4+4 Punti Ferita Temporanei**.<br>_A Gradi Superiori: +5 PF temporanei per ogni grado sopra il 1°._ |
| **Lancia di Fuoco** | 1 azione | 36 metri | Istantanea | Un raggio di fiamme colpisce una creatura. Attacco a distanza di canalizzazione. Colpisce per **2d8 danni da fuoco** e il bersaglio deve superare un TS Costituzione o avere svantaggio al prossimo attacco o TS.<br>_A Gradi Superiori: +1d8 danni per ogni grado sopra il 1°._ |
| **Malia (Beguile)** | 1 azione | 9 metri | 1 ora | Tenti di affascinare un umanoide. TS su Saggezza o diventa **Affascinato** e ti considera un amico amichevole.<br>_A Gradi Superiori: +1 bersaglio per ogni grado sopra il 1°._ |
| **Moto Rapido** | 1 azione bonus | Personale | Concentrazione, fino a 10 minuti | La tua velocità aumenta incredibilmente. Per la durata, puoi usare l'azione di Scatto come azione bonus in ogni tuo turno. |
| **Passo di Fase** | 1 azione | Personale | Istantanea | Pieghi lo spazio. Ti teletrasporti di 3 metri in uno spazio libero che puoi vedere. |
| **Passo Rapido** | 1 azione | Tocco | 1 ora | La velocità del bersaglio aumenta di 3 metri.<br>_A Gradi Superiori: +1 bersaglio per ogni grado sopra il 1°._ |
| **Paura Primordiale** | 1 azione | 9 metri | Concentrazione, fino a 1 minuto | Un bersaglio diventa terrorizzato. TS su Saggezza o cade prono, diventa inabile e non può alzarsi per la durata. |
| **Rinculo Sinaptico** | 1 azione | 18 metri | Istantanea | Ondata di feedback psichico. TS su Saggezza. Fallimento: **3d6 danni psichici** e deve usare la reazione per muoversi lontano da te. Successo: metà danni.<br>_A Gradi Superiori: +1d6 danni per ogni grado sopra il 1°._ |
| **Salto** | 1 azione | Tocco | 1 minuto | La distanza di salto della creatura toccata è triplicata. |
| **Sensi Esper** | 1 azione | Personale | Concentrazione, fino a 10 minuti | Percepisci la presenza di poteri esper o aure magiche entro 9 metri da te. |
| **Stordire (Daze)** | 1 azione | 27 metri | Istantanea | Creature entro 6 metri da un punto devono superare un TS su Saggezza o essere confuse e considerate **Trattenute** fino alla fine del loro prossimo turno. |
| **Tiro Propulso** | 1 azione | 45 metri | Istantanea | Scagli un oggetto di 2-5 kg in linea retta per 27 metri. Se colpisce una creatura, essa deve fare un TS su Destrezza o subire **3d8 danni contundenti**.<br>_A Gradi Superiori: +1d8 danni per ogni grado sopra il 1°._ |
| **Visione Condivisa** | 1 azione | 3 metri | Concentrazione, fino a 1 minuto | Condividi un ricordo sensoriale con fino a 4 creature, permettendo loro di vedere/sentire ciò che hai vissuto. Conferisce vantaggio alle prove di Percezione pertinenti. |

#### Grado 2
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Agitazione Molecolare** | 1 azione | 36 metri | Concentrazione, fino a 1 minuto | Scegli un oggetto manufatto metallico. Lo rendi rovente. Chi lo tocca o indossa subisce **2d8 danni da fuoco**. Se indossato, il possessore ha svantaggio a tiri per colpire e prove abilità.<br>_A Gradi Superiori: +1d8 danni per ogni grado sopra il 2°._ |
| **Alterare Forma** | 1 azione | Personale | Concentrazione, fino a 1 ora | Assumi una forma diversa: Adattamento Acquatico (branchie, nuoto), Cambio Aspetto (disguise self fisico), Adattamento Bassa Gravità (volo in zero-g), o Armi Naturali (1d6 danni, magiche +1). |
| **Campo di Stasi** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Scegli un umanoide. Deve superare un TS su Saggezza o essere **Paralizzato**. Può ripetere il TS alla fine di ogni turno.<br>_A Gradi Superiori: +1 bersaglio per ogni grado sopra il 2°._ |
| **Cappello Nero** | 1 azione | Personale | Concentrazione, fino a 1 minuto | Analizzi dati elettronici. Vantaggio su prove Intelligenza con kit hacker. Puoi hackerare talenti di interdizione di grado 2 o inferiore.<br>_A Gradi Superiori: Puoi hackerare poteri di grado superiore._ |
| **Cecità/Sordità** | 1 azione | 9 metri | 1 minuto | Una creatura deve superare un TS Costituzione o essere accecata o assordata. TS ripetibile ogni turno.<br>_A Gradi Superiori: +1 bersaglio per ogni grado sopra il 2°._ |
| **Dischi Fiammeggianti** | 1 azione | 36 metri | Concentrazione, fino a 1 minuto | Crei tre dischi di fuoco. Puoi lanciarli (attacco a distanza, 120ft gittata) infliggendo **2d6 danni da fuoco** ciascuno.<br>_A Gradi Superiori: +1 disco per ogni grado sopra il 2°._ |
| **Eclissi** | 1 azione | 18 metri | Concentrazione, fino a 10 minuti | Sfera di oscurità magica di 4,5 metri di raggio. Blocca la scurovisione. |
| **Fantasma Dati** | 1 azione | Personale | Concentrazione, fino a 1 ora | Crei una maschera digitale per te e fino a 6 compagni. Penalità di -10 alle prove per localizzarvi nei sistemi informatici e le tracce vengono cancellate alla fine. |
| **Inclinazione Estesa** | 1 azione | Tocco | Concentrazione, fino a 1 ora | Una creatura ottiene velocità di scalata e può muoversi su pareti e soffitti con le mani libere. |
| **Individuare Pensieri** | 1 azione | Personale | Concentrazione, fino a 1 minuto | Leggi pensieri superficiali di creature entro 9m. Puoi sondare più a fondo (TS Saggezza). |
| **Individuare Verità** | 1 azione | 18 metri | 10 minuti | Crei una zona di verità (sfera 4,5m). Chi entra deve superare un TS Carisma o non può mentire deliberatamente. |
| **Influenza Imponente** | 1 azione | 36 metri | Concentrazione, fino a 1 minuto | Un umanoide deve superare TS Saggezza o essere affascinato. Puoi usare la tua azione per fargli attaccare un altro bersaglio. |
| **Levitazione** | 1 azione | 18 metri | Concentrazione, fino a 10 minuti | Sollevi una creatura o oggetto (fino a 225kg) di 6 metri verticalmente. |
| **Offuscare** | 1 azione | Tocco | Concentrazione, fino a 1 ora | Rendi una creatura invisibile. Termina se attacca o lancia un potere.<br>_A Gradi Superiori: +1 bersaglio per ogni grado sopra il 2°._ |
| **Onda Disgregante** | 1 azione | 27 metri | Istantanea | Attacco a distanza. **4d4 danni necrotici** subito e **2d4** alla fine del turno successivo.<br>_A Gradi Superiori: +1d4 a entrambi i danni per ogni grado sopra il 2°._ |
| **Onda Psichica** | 1 azione | Personale (Cono 4,5m) | Istantanea | Ondata mentale. Creature nel cono fanno TS Saggezza. Fallimento: **3d6 danni psichici**.<br>_A Gradi Superiori: +1d6 danni per ogni grado sopra il 2°._ |
| **Pacificare** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Sopprimi emozioni forti in una sfera di 6m. TS Carisma. Rimuove paura/charme o rende indifferenti creature ostili. |
| **Pacchetto Cloni** | 1 azione | Personale | 1 minuto | Tre duplicati illusori appaiono nel tuo spazio. Quando vieni attaccato, tira 1d20 per vedere se colpiscono un duplicato (distruggendolo) invece di te. |
| **Raggio di Luce** | 1 azione | 9 metri (linea 9m x 1,5m) | Istantanea | Linea di energia. Creature nell'area fanno TS Destrezza. Fallimento: **3d8 danni radianti**.<br>_A Gradi Superiori: +1d8 danni per ogni grado sopra il 2°._ |
| **Scassinare** | 1 azione | 18 metri | Istantanea | Sblocchi a distanza una serratura meccanica, elettronica o un Sigillo Magnetico. |
| **Sfera Gravitazionale** | 1 azione | 18 metri | Concentrazione, fino a 10 minuti | Sfera di 6m di raggio. Terreno difficile e oscurata. Chi entra fa TS Destrezza o è **Trattenuto**. Può usare un'azione per liberarsi (TS Forza). |
| **Sfocatura** | 1 azione | Personale | Concentrazione, fino a 1 minuto | La tua immagine si sposta. I nemici hanno svantaggio ai tiri per colpire contro di te. |
| **Sigillo Magnetico** | 1 azione | Tocco | Fino a dissoluzione | Chiudi magicamente una porta o contenitore. La CD per forzarla aumenta di 10. |
| **Spira Gelida** | 1 azione | 27 metri | Istantanea | Cubo di 3m di ghiaccio. Creature fanno TS Costituzione. Fallimento: **3d8 danni da freddo** e non possono usare reazioni.<br>_A Gradi Superiori: +1d8 danni per ogni grado sopra il 2°._ |
| **Spostamento di Fase** | 1 azione bonus | Personale | Istantanea | Ti teletrasporti fino a 9 metri in uno spazio libero visibile. |
| **Suggestione** | 1 azione | 9 metri | Concentrazione, fino a 8 ore | Suggerisci un corso d'azione a una creatura (TS Saggezza nega). Deve sembrare ragionevole. |
| **Taglio Spaziale** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Crei pieghe nello spazio in un cubo di 1,5m. Invisibili (TS Saggezza per notare). Chi entra subisce **2d8 danni taglienti**.<br>_A Gradi Superiori: +1d8 danni per ogni grado sopra il 2°._ |
| **Tasca Dimensionale** | 1 azione | 18 metri | 1 ora | Crei un ingresso invisibile per uno spazio extradimensionale che contiene fino a 8 creature. |
| **Zona Pulita** | 1 azione | Personale | Concentrazione, fino a 10 minuti | Sfera di 3m centrata su di te. Filtra gas, estingue fiamme e rimuove la condizione di avvelenato. |

#### Grado 3
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Adattamento Atmosferico** | 1 azione | 9 metri | 24 ore | Conferisce a 10 creature la capacità di respirare in qualsiasi ambiente (sott'acqua, vuoto). |
| **Anti-Individuazione** | 1 azione | Tocco | 8 ore | Il bersaglio non può essere individuato da poteri di divinazione o sensori magici. |
| **Assorbimento** | 1 azione | Tocco | Concentrazione, fino a 1 ora | Conferisci a una creatura resistenza a un tipo di danno (Acido, Freddo, Fuoco, Fulmine, Tuono). |
| **Blocco Sistema** | 1 azione | Tocco | Fino a dissoluzione | Blocchi l'accesso a un dispositivo elettronico. Richiede password o hacking per usare. |
| **Celerità** | 1 azione | 9 metri | Concentrazione, fino a 1 minuto | Velocità raddoppiata, +2 CA, vantaggio su TS Destrezza, azione aggiuntiva limitata (attacco, scatto, etc). Letargia alla fine. |
| **Condensatore** | 1 azione | 18 metri | 1 ora | Sfera di luce di 18m di raggio. Dissolve oscurità di grado 3 o inferiore. |
| **Contro-Forma** | 1 reazione | 18 metri | Istantanea | Interrompi il lancio di un potere esper avversario. Automatico se grado 3 o meno, altrimenti prova caratteristica.<br>_A Gradi Superiori: Interrompe automaticamente poteri di grado superiore._ |
| **Corrompere Modello** | 1 azione | Tocco | Concentrazione, fino a 1 minuto | Attacco in mischia. Maledici il bersaglio (svantaggio caratteristica, attacchi, o danni necrotici extra).<br>_A Gradi Superiori: Durata aumenta e non richiede concentrazione._ |
| **Disegno Illusorio** | 1 azione | 36 metri | Concentrazione, fino a 10 minuti | Crei l'immagine di un oggetto o creatura (cubo 6m) con suoni e odori. Può muoversi.<br>_A Gradi Superiori: Diventa permanente (senza concentrazione) a grado 6._ |
| **Disegno Ipnotico** | 1 azione | 36 metri | Concentrazione, fino a 1 minuto | Pattern di colori in un cubo di 9m. Creature affascinate, inabili e velocità 0 (TS Saggezza). |
| **Energia Vampirica (Energy Sink)** | 1 azione | 36 metri | Concentrazione, fino a 1 minuto | Sfera di 6m di antimateria/oscurità. Acceca, blocca elettronica. Danni necrotici all'inizio del turno (2d6) e se si esce dall'area. |
| **Esplosione di Fiamme** | 1 azione | Personale (Linea 30m) | Istantanea | Linea di fuoco larga 1,5m. **8d6 danni da fuoco** (TS Destrezza).<br>_A Gradi Superiori: +1d6 danni per ogni grado sopra il 3°._ |
| **Estensione Sensoriale** | 1 minuto | 8 km | Concentrazione, fino a 10 minuti | Crei un sensore invisibile in un luogo noto o ovvio per vedere e sentire. |
| **Forgiare Veicolo** | 10 minuti | 9 metri | Concentrazione, fino a 8 ore | Crei un veicolo terrestre (moto o auto). Hai competenza e bonus doppio alla guida.<br>_A Gradi Superiori: Veicoli più grandi o volanti/acquatici._ |
| **Innesco Programmato** | 1 ora | Tocco | Fino a attivazione | Piazzi un glifo su superficie o oggetto. Esplode (5d8 danni elementali) o lancia un potere immagazzinato quando attivato.<br>_A Gradi Superiori: +1d8 danni._ |
| **Pozzo Energetico** | 1 azione | 9 metri | Istantanea | Attacco a distanza. **3d6 danni necrotici** e ti curi della metà del danno inflitto. |
| **Presa Avvizzente** | 1 azione | 18 metri | Istantanea | Dardo di antimateria. Attacco a distanza. **4d8 danni necrotici** e bersaglio spaventato fino al prossimo turno.<br>_A Gradi Superiori: +1d8 danni per ogni grado sopra il 3°._ |
| **Sbrogliare Effetto** | 1 azione | 36 metri | Istantanea | Termini effetti di poteri su una creatura o oggetto. Automatico per grado 3 o meno. |
| **Sfera Paralizzante** | 1 azione | 27 metri | Concentrazione, fino a 1 minuto | Sfera psichica di 6m. Creature devono superare TS Costituzione o essere **Inabili**. |
| **Sifone** | 1 azione | Personale | Concentrazione, fino a 1 minuto | Attacco in mischia canalizzazione. **3d6 necrotici** e ti curi metà. Ripetibile ogni turno.<br>_A Gradi Superiori: +1d6 danni per ogni grado sopra il 3°._ |
| **Singolarità** | 1 azione | 45 metri | Istantanea | Globo gravitazionale esplode (raggio 6m). **8d6 danni da forza** (TS Destrezza). Danneggia strutture.<br>_A Gradi Superiori: +1d6 danni per ogni grado sopra il 3°._ |
| **Traduttore Universale** | 1 azione | Tocco | 1 ora | La creatura toccata capisce qualsiasi lingua parlata e viene compresa da chiunque. |
| **Volare** | 1 azione | Tocco | Concentrazione, fino a 10 minuti | Il bersaglio ottiene velocità di volo 18m.<br>_A Gradi Superiori: +1 bersaglio per ogni grado sopra il 3°._ |
| **Volto Orripilante** | 1 azione | Personale (Cono 9m) | Concentrazione, fino a 1 minuto | Proietti paura. Creature nel cono devono superare TS Saggezza o fuggire spaventate. |

#### Grado 4
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Anello di Fulmini** | 1 azione | 90 metri | Istantanea | Anello di elettricità a terra (raggio 6m). **5d8 danni da fulmine** (TS Destrezza).<br>_A Gradi Superiori: +1d8 danni per ogni grado sopra il 4°._ |
| **Aspetto del Terrore** | 1 azione | 36 metri | Concentrazione, fino a 1 minuto | Il bersaglio vede la sua paura peggiore. Spaventato. Fine turno TS Saggezza o **4d10 danni psichici**.<br>_A Gradi Superiori: +1d10 danni per ogni grado sopra il 4°._ |
| **Campo Reattivo** | 1 azione | Personale | 10 minuti | Aura di fuoco o freddo. Resistenza all'elemento opposto. Chi ti colpisce in mischia subisce 2d8 danni dell'elemento scelto. |
| **Contenitore Dimensionale** | 1 azione | Tocco | Istantanea | Nascondi una cassa (e contenuto) nel piano etereo. Richiamabile con un token. |
| **Devastare Modello** | 1 azione | 9 metri | Istantanea | Distruzione cellulare. TS Costituzione. **8d8 danni necrotici** (metà se salvo). Danni massimi su piante.<br>_A Gradi Superiori: +1d8 danni per ogni grado sopra il 4°._ |
| **Drenare Potere** | 1 azione | 9 metri | Istantanea | Contro Costrutti: Attacco a distanza, **5d6 forza**, ti curi pari al danno.<br>Contro Dispositivi: TS del dispositivo o si spegne e ti cura.<br>_A Gradi Superiori: +1d6 danni/cure per ogni grado sopra il 4°._ |
| **Egida Superiore** | 1 azione | Tocco | Concentrazione, fino a 1 ora | Resistenza a danni contundenti, perforanti e taglienti. +3 ai TS su Raffica. |
| **Fabbricare** | 10 minuti | 36 metri | Istantanea | Converti materiali grezzi in prodotti finiti (es. ponte di metallo da rottami). |
| **Lancio** | 1 azione | 18 metri | Istantanea | Attacco a distanza. **6d6 danni forza** al bersaglio (TS Costituzione). Se fallisce, puoi lanciarlo contro un muro o un'altra creatura (danni impatto extra e prono).<br>_A Gradi Superiori: +1d6 danni per ogni grado sopra il 4°._ |
| **Nebbia del Caos** | 1 azione | 27 metri | Concentrazione, fino a 1 minuto | Sfera di 3m. Creature devono superare TS Saggezza o agire casualmente (Confusione). |
| **Offuscare Superiore** | 1 azione | Tocco | Concentrazione, fino a 1 minuto | Invisibilità che non termina se attacchi o lanci poteri. |
| **Osservatore Velato** | 1 azione | 9 metri | Concentrazione, fino a 1 ora | Crei un sensore sferico invisibile che puoi muovere e attraverso cui vedere (scurovisione). |
| **Portale** | 1 azione | 150 metri | Istantanea | Teletrasporti te stesso e un passeggero (o oggetti) in un punto visibile o visualizzato. |
| **Pozzo Gravitazionale** | 1 azione | 27 metri | Concentrazione, fino a 1 minuto | Area di 6m di gravità schiacciante. Terreno difficile. TS Destrezza o **3d6 forza** e trattenuto. |
| **Sfera Protettiva** | 1 azione | 9 metri | Concentrazione, fino a 1 minuto | Racchiudi una creatura o oggetto in una sfera di forza invulnerabile. Niente entra o esce. |
| **Trasferimento Condotto** | 1 azione bonus | 36 metri | Istantanea | Ti teletrasporti tra due dispositivi o cavi elettrici connessi. |
| **Trasmutare Forma** | 1 azione | 18 metri | Concentrazione, fino a 1 ora | Trasformi una creatura in una bestia di GS pari o inferiore (Polimorfia). |
| **Zona Sicura** | 10 minuti | 36 metri | 24 ore | Proteggi un'area (cubo fino a 30m) da sensori, teletrasporto e divinazione. |
| **Zona Ustionante** | 1 azione | 36 metri | Concentrazione, fino a 10 minuti | Cupola o muro di fuoco. **5d8 danni da fuoco** a chi attraversa o inizia il turno vicino.<br>_A Gradi Superiori: +1d8 danni per ogni grado sopra il 4°._ |

#### Grado 5
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Alterazione di Massa** | 1 azione | 9 metri | 8 ore | Cambi l'aspetto di un numero qualsiasi di creature che puoi vedere (Sembrare). |
| **Barricata d'Acciaio** | 1 azione | 36 metri | Concentrazione, fino a 10 minuti | Crei un muro solido di acciaio (pannelli 3m x 3m). Fornisce copertura e blocca passaggio. |
| **Campo di Forza** | 1 azione | 36 metri | Concentrazione, fino a 10 minuti | Crei un muro o semisfera invisibile e indistruttibile di forza. |
| **Dominazione** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Controlli telepaticamente le azioni di un umanoide (TS Saggezza).<br>_A Gradi Superiori: Durata aumenta (fino a 8 ore a grado 8)._ |
| **Doppio Inganno** | 1 azione | Personale | Concentrazione, fino a 1 minuto | Diventi invisibile e crei un doppio illusorio che agisce al tuo posto. |
| **Elica di Curvatura** | 1 azione | Personale (cono 18m) | Istantanea | Ondata di distorsione spaziale. **8d8 danni da forza** (TS Costituzione).<br>_A Gradi Superiori: +1d8 danni per ogni grado sopra il 5°._ |
| **Forza Proiettata** | 1 azione | 36 metri | Concentrazione, fino a 1 minuto | Crei una mano di forza telecinetica. Può colpire (4d8), spingere, afferrare o proteggere. |
| **Fossa Ribollente** | 1 azione | 36 metri | Concentrazione, fino a 1 minuto | Trasformi il terreno in fango ribollente. Danni, terreno difficile e trattiene. |
| **Guardiano Imponente** | 1 minuto | 27 metri | Concentrazione, fino a 1 ora | Crei un costrutto guardiano (statistiche da Golem o simile) da materiali presenti. |
| **Legame Telepatico** | 1 azione | 9 metri | 1 ora | Colleghi mentalmente fino a 8 creature. Comunicazione istantanea a qualsiasi distanza. |
| **Modificare Memoria** | 1 azione | 9 metri | Concentrazione, fino a 1 minuto | Riscrivi fino a 10 minuti di memoria recente di un bersaglio affascinato. |
| **Nebbia Frigida** | 1 azione | 36 metri | Concentrazione, fino a 10 minuti | Nube di nebbia gelida (raggio 6m). **5d8 danni da freddo** a chi entra o inizia turno. Si muove 3m lontano da te ogni turno. |
| **Passaggio Spaziale** | 1 azione | 300 metri | Istantanea | Crei un cerchio di teletrasporto temporaneo che collega due punti (Cerchio di Teletrasporto). |
| **Percezione Estesa** | 1 azione | Personale | 1 ora | Ottieni visione del vero (vedere invisibile, trasformazioni, etereo) fino a 36m. |
| **Richiamo Istantaneo** | 1 azione | Personale | Concentrazione, fino a 1 ora | Ottieni memoria eidetica e +10 a prove di Conoscenza per ricordare informazioni. |
| **Stasi Superiore** | 1 azione | 27 metri | Concentrazione, fino a 1 minuto | Paralizzi una creatura qualsiasi (Blocca Mostro). |
| **Telecinesi** | 1 azione | 18 metri | Concentrazione, fino a 10 minuti | Manipoli creature o oggetti pesanti (fino a 450kg) con la mente. |
| **Tessere Sogni** | 1 minuto | Speciale | 8 ore | Entri nei sogni di una creatura per messaggi o incubi (danni psichici al risveglio). |
| **Tuta di Sopravvivenza** | 1 azione | 9 metri | 24 ore | Fino a 8 creature diventano immuni a veleni gassosi, estremi di temperatura e possono respirare ovunque. |

#### Grado 6
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Camminare nella Fase** | 1 azione | 150 metri | Concentrazione, fino a 10 minuti | Crei due portali collegati. Usi il teletrasporto per muoverti tra essi. |
| **Campo di Negazione** | 1 azione | Personale (raggio 3m) | Concentrazione, fino a 1 minuto | Sfera immobile che blocca poteri di grado 5 o inferiore. |
| **Catena di Fulmini** | 1 azione | 45 metri | Istantanea | Fulmine colpisce un bersaglio (**10d8**) e rimbalza su altri 3 bersagli. |
| **Disfunzione Motoria** | 1 azione | 9 metri | Concentrazione, fino a 1 minuto | Il bersaglio balla o si muove erraticamente. Svantaggio a CA e TS Destrezza, deve usare movimento per ballare. |
| **Disintegrare** | 1 azione | 18 metri | Istantanea | Raggio verde. **10d6 + 40 danni da forza**. Se riduce a 0 PF, riduce in polvere. Distrugge creazioni di forza. |
| **Infrangi Sensi** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Un bersaglio deve scegliere: Spaventato e fugge, Nauseato (svantaggio azioni), o Addormentato. |
| **Innesco Illusorio** | 1 azione | 36 metri | Permanente (fino a attivazione) | Crei un'illusione programmata che si attiva a condizioni specifiche (durata illusione 5 min). |
| **Raggio di Fusione** | 1 azione | Personale (linea 18m) | Concentrazione, fino a 1 minuto | Raggio solare. **6d8 radianti** e acceca. Puoi creare un nuovo raggio ogni turno. |
| **Sfera di Curvatura** | 1 azione | 45 metri | Istantanea | Sfera di gravità esplosiva. **8d6 danni da forza** in un raggio di 18m (Sfera Congelante di Otiluke variante). |
| **Struttura Sicura** | 10 minuti | Tocco | 24 ore | Proteggi un edificio (230 mq). Porte bloccate, corridoi confusi, scale scivolose, sensori bloccati. |
| **Suggestione di Massa** | 1 azione | 18 metri | 24 ore | Impianti una suggestione in fino a 12 creature. |
| **Vera Vista** | 1 azione | Tocco | 1 ora | Conferisci Visione del Vero (36m) a una creatura. |
| **Zona di Gelo** | 1 azione | 36 metri | Concentrazione, fino a 10 minuti | Muro di ghiaccio solido. Può essere distrutto o usato per intrappolare. |

#### Grado 7
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Controllo Gravità** | 1 azione | 30 metri | Concentrazione, fino a 1 minuto | Inverti la gravità in un cilindro di 15m. Creature e oggetti cadono verso l'alto. |
| **Copia Cloni** | 12 ore | Tocco | Permanente | Crei un simulacro di una bestia o umanoide (metà PF, non recupera risorse). |
| **Devastazione** | 1 azione | 18 metri | Istantanea | Infliggi dolore atroce. **7d8 + 30 danni necrotici**. Se uccide, crea uno zombi (o simile) sotto tuo controllo. |
| **Divergenza Temporale** | 1 azione | Tocco | 8 ore | Metti un bersaglio in stasi temporale (Sequestro). Invisibile e immune a divinazione. |
| **Forma Intangibile** | 1 azione | Personale | 8 ore | Diventi etereo. Puoi muoverti attraverso oggetti e creature. |
| **Lama di Fenditura** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Spada di forza planare. Attacca per 3d10 danni da forza. |
| **Piega Spaziale** | 1 azione | 3 metri | Istantanea | Teletrasporti te e fino a 8 creature in qualsiasi luogo conosciuto sullo stesso piano. |
| **Predare** | 1 azione | 18 metri | Istantanea | Parola del Potere: Dolore. Se <100 PF, il bersaglio subisce dolore atroce (svantaggi, velocità ridotta). |
| **Prigione di Forza** | 1 azione | 30 metri | 1 ora | Crei una gabbia o scatola di forza indistruttibile e invisibile. Nessun TS. |
| **Vortice Elementale** | 1 azione | 45 metri | Istantanea | Palla di energia elementale che esplode (12d6 danni del tipo scelto). |
| **Vortice Stritolante** | 1 azione | 90 metri | Concentrazione, fino a 1 minuto | Tornado di gravità. Danni (10d6) e trattiene creature. |

#### Grado 8
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Antipatia/Simpatia** | 1 ora | 18 metri | 10 giorni | Oggetto o area attrae o respinge specifici tipi di creature. |
| **Dominazione Superiore** | 1 azione | 18 metri | Concentrazione, fino a 1 ora | Controlli totalmente un mostro o creatura (TS Saggezza). |
| **Frattura Mentale** | 1 azione | 45 metri | Istantanea | Distruggi l'intelletto di una creatura (Int e Car diventano 1). |
| **Negazione Superiore** | 1 azione | Personale (raggio 3m) | Concentrazione, fino a 1 ora | Campo Anti-Magia. Sopprime tutti i poteri ed effetti esper/magici. |
| **Sovraccarico Psichico** | 1 azione | 18 metri | Istantanea | Parola del Potere: Stordire. Se <150 PF, bersaglio stordito. |
| **Telepatia** | 1 azione | Illimitata | 24 ore | Legame mentale con una creatura ovunque nel piano. |
| **Tempesta Contorta** | 1 azione | 150 metri | Concentrazione, fino a 1 minuto | Terremoto localizzato o tempesta elettrica. Danni strutture, prono, danni fulmine. |
| **Vortice Oscuro** | 1 azione | 45 metri | Istantanea | Esplosione solare necrotica. **12d6 necrotici** e cecità permanente. |
| **Vuoto Mentale** | 1 azione | Tocco | 24 ore | Immunità a danni psichici, lettura pensiero e divinazione. |
| **Zona Fantasma** | 1 azione | 18 metri | Concentrazione, fino a 10 minuti | Bandi una creatura in un labirinto demiplanare (TS Intelligenza per uscire). |

#### Grado 9
| Nome                         | Tempo di attivazione | Gittata   | Durata                           | Descrizione                                                                                |
| :--------------------------- | :------------------- | :-------- | :------------------------------- | :----------------------------------------------------------------------------------------- |
| **Armatura Indistruttibile** | 1 azione             | Personale | Concentrazione, fino a 10 minuti | Diventi immune a tutti i danni.                                                            |
| **Mutaforma**                | 1 azione             | Personale | Concentrazione, fino a 1 ora     | Assumi la forma di qualsiasi creatura (come *Polimorfia* ma mantieni statistiche mentali). |
| **Preveggenza**              | 1 minuto             | Tocco     | 8 ore                            | Vantaggio a tiri per colpire, prove abilità, TS. I nemici hanno svantaggio a colpirti.     |
| **Prigione Cosmica**         | 1 minuto             | 9 metri   | Permanente                       | Sigilli una creatura in una forma di stasi o prigione dimensionale (Imprigionare).         |
| **Stasi Temporale**          | 1 azione             | Personale | Istantanea                       | Fermi il tempo per 1d4+1 turni consecutivi.                                                |
| **Tempesta di Curvatura**    | 1 azione             | 1,5 km    | Istantanea                       | 4 sfere di distruzione (12m raggio). **20d6 forza + 20d6 freddo** ciascuna.                |
| **Terminare Funzione**       | 1 azione             | 18 metri  | Istantanea                       | Parola del Potere: Uccidere. Se <100 PF, il bersaglio muore istantaneamente.               |
| **Trama Cosmica**            | 1 azione             | Personale | Istantanea                       | Desiderio. Alteri la realtà per duplicare poteri o creare effetti unici.                   |
| **Trasmutazione Totale**     | 1 azione             | 18 metri  | Concentrazione, fino a 1 ora     | Trasformi una creatura in un'altra creatura o oggetto (Polimorfia Reale).                  |
| **Zona di Terrore**          | 1 azione             | Personale | Istantanea                       | Urlo Psichico. Fino a 10 creature entro 27m. **14d6 psichici** e stordito.                 |
## Specialista

| Caratteristica           | Descrizione                                                                                                                                                |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dadi Vita                | 1d8 per livello da specialista                                                                                                                             |
| PF al 1° Livello         | 8 + il tuo modificatore di Costituzione                                                                                                                    |
| PF ai Livelli Successivi | 1d8 (o 5) + il tuo modificatore di Costituzione per livello dopo il 1°                                                                                     |
| Competenze               |                                                                                                                                                            |
| Armature                 | Leggere                                                                                                                                                    |
| Armi                     | Semplici, autopistola, lama lunga, lama corta, sciabola                                                                                                    |
| Strumenti                | Strumenti da Infiltrazione                                                                                                                                 |
| Tiri Salvezza            | Destrezza, Intelligenza                                                                                                                                    |
| Abilità                  | Quattro a scelta tra Acrobazia, Atletica, Computer, Inganno, Intuizione, Intimidire, Investigazione, Percezione, Persuasione, Rapidità di Mano e Furtività |
### Tabella dello Specialista

| Livello | Bonus Comp. | Colpo Destro | Privilegi                                       |
| :-----: | :---------: | :----------: | :---------------------------------------------- |
|   1°    |     +2      |     1d6      | Attitudine Naturale, Colpo Destro, ID Shadownet |
|   2°    |     +2      |     1d6      | Azione Scaltra                                  |
|   3°    |     +2      |     2d6      | Specializzazione dello Specialista              |
|   4°    |     +2      |     2d6      | Aumento Punteggi Caratteristica                 |
|   5°    |     +3      |     3d6      | Schivata Prodigiosa                             |
|   6°    |     +3      |     3d6      | Attitudine Naturale (miglioramento)             |
|   7°    |     +3      |     4d6      | Elusione                                        |
|   8°    |     +3      |     4d6      | Aumento Punteggi Caratteristica                 |
|   9°    |     +4      |     5d6      | Privilegio Specializzazione                     |
|   10°   |     +4      |     5d6      | Aumento Punteggi Caratteristica                 |
|   11°   |     +4      |     6d6      | Talento Affidabile                              |
|   12°   |     +4      |     6d6      | Aumento Punteggi Caratteristica                 |
|   13°   |     +5      |     7d6      | Privilegio Specializzazione                     |
|   14°   |     +5      |     7d6      | Senso Cieco                                     |
|   15°   |     +5      |     8d6      | Mente Sfuggente                                 |
|   16°   |     +5      |     8d6      | Aumento Punteggi Caratteristica                 |
|   17°   |     +6      |     9d6      | Privilegio Specializzazione                     |
|   18°   |     +6      |     9d6      | Elusivo                                         |
|   19°   |     +6      |     10d6     | Aumento Punteggi Caratteristica                 |
|   20°   |     +6      |     10d6     | Colpo di Fortuna                                |
### Caratteristiche di Classe

| Livello | Privilegio              | Descrizione                                                                                                                                                                                                                                                                 |
| :------ | :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1°**  | **Attitudine Naturale** | Scegli due competenze nelle abilità o strumenti. Il tuo bonus di competenza è raddoppiato per le prove che usano quelle competenze. Al **6° livello**, ne scegli altre due.                                                                                                 |
| **1°**  | **Colpo Destro**        | Una volta per turno, infliggi **1d6 danni extra** a una creatura colpita se hai vantaggio al tiro per colpire. L'attacco deve usare un'arma accurata (*finesse*) o a distanza. Non serve vantaggio se un nemico del bersaglio è entro 1,5m da esso e tu non hai svantaggio. |
| **1°**  | **ID Shadownet**        | Hai un avatar online nello Shadownet (Matrice Intergalattica segreta). Puoi decodificare messaggi segreti, commerciare segreti e accedere al mercato nero.                                                                                                                  |
| **2°**  | **Azione Scaltra**      | Puoi usare un'**azione bonus** in ogni tuo turno per Scattare, Disimpegnarsi o Nascondersi.                                                                                                                                                                                 |
| **3°**  | **Specializzazione**    | Scegli una Specializzazione tra **Infiltrato**, **Operativo** o **Artificio** (conferisce privilegi aggiuntivi specifici).                                                                                                                                                  |
| **5°**  | **Schivata Prodigiosa** | Quando un attaccante che puoi vedere ti colpisce, puoi usare la tua **reazione** per dimezzare i danni.                                                                                                                                                                     |
| **7°**  | **Elusione**            | Quando sei soggetto a un effetto che permette un TS su Destrezza per dimezzare i danni, non subisci danni se superi il TS e solo la metà se fallisci.                                                                                                                       |
| **11°** | **Talento Affidabile**  | Hai affinato le tue abilità scelte. Ogni volta che effettui una prova di abilità che ti permette di aggiungere il tuo bonus di competenza, puoi considerare un tiro di d20 di **9 o inferiore come un 10**.                                                                 |
| **14°** | **Senso Cieco**         | Se sei in grado di sentire, sei consapevole della posizione di qualsiasi creatura nascosta o invisibile entro **3 metri** (10 piedi) da te.                                                                                                                                 |
| **15°** | **Mente Sfuggente**     | Hai acquisito una maggiore forza mentale. Ottieni competenza nei **Tiri Salvezza su Saggezza**.                                                                                                                                                                             |
| **18°** | **Elusivo**             | Sei così sfuggente che gli attaccanti raramente ottengono un vantaggio contro di te. Nessun tiro per colpire ha vantaggio contro di te mentre non sei incapacitato.                                                                                                         |
| **20°** | **Colpo di Fortuna**    | Se il tuo attacco manca un bersaglio entro il raggio, puoi trasformare il mancato colpo in un successo. In alternativa, se fallisci una prova di abilità, puoi considerare il tiro di d20 come un **20**. Recupero: Riposo Breve o Lungo.                                   |

### Specializzazione Specialista

#### Infiltrato
_Maestro della furtività, dell'acrobazia e dell'intrusione digitale._

| Livello | Privilegio | Descrizione |
| :--- | :--- | :--- |
| **3°** | **Mani Veloci** | Puoi usare l'azione bonus di **Azione Scaltra** per effettuare prove di **Rapidità di Mano**, usare **strumenti da infiltrazione** o compiere l'azione **Usare un Oggetto**. |
| **3°** | **Leggero come una Piuma** | Scalare non costa movimento extra. Puoi usare **Acrobazia** (invece di Atletica) per scalare. I tuoi salti sono basati sulla **Destrezza** (invece che sulla Forza). |
| **9°** | **Maestria Furtiva** | Hai **vantaggio** alle prove di **Destrezza (Furtività)** se nel tuo turno ti muovi di non più della metà della tua velocità. |
| **13°** | **Esperto di Elettronica** | Hai vantaggio su prove di **Intelligenza (Computer)** per identificare/usare console e dati. Ignori le restrizioni linguistiche per l'attivazione di tali dispositivi. |
| **17°** | **Riflessi Supremi** | Puoi effettuare **due turni durante il primo round** di combattimento (uno alla tua iniziativa, uno a iniziativa -10). Non utilizzabile se sei sorpreso. |

---

#### Operativo
_Assassino letale e maestro del travestimento e dell'inganno._

| Livello | Privilegio | Descrizione |
| :--- | :--- | :--- |
| **3°** | **Addestrato nell'Arte** | Ottieni competenza nel **Kit da Camuffamento** e in un altro kit (falsario, hacker o gioco).<br>Impari un **Talento Prime** a scelta tra: *Analizzare Dispositivo, Messaggio Mentale, Lama Protonica* o *Dispositivo di Attivazione*. |
| **3°** | **Colpo Vitale** | Hai **vantaggio** ai tiri per colpire contro creature che non hanno ancora agito nel combattimento. Se colpisci una creatura **sorpresa**, il colpo è automaticamente un **Critico**. |
| **9°** | **Identità Falsificata** | Puoi creare false identità perfette spendendo tempo e denaro (include documenti, storici e credenziali). |
| **13°** | **Impersonazione** | Dopo 3 ore di studio, puoi imitare perfettamente la voce e i modi di un individuo. Hai **vantaggio** col kit da travestimento per replicarlo e **vantaggio** su **Carisma (Inganno)** per non essere scoperto. |
| **17°** | **Assassinio** | Quando colpisci una creatura **sorpresa**, questa deve superare un **TS Costituzione** (CD 8 + Comp + Des). Se fallisce, subisce il **doppio dei danni** dall'attacco. |

---

#### Artificio
_Specialista che combina abilità marziali con poteri mentali e tecnologici._

| Livello | Privilegio                      | Descrizione                                                                                                                                                                                           |
| :------ | :------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **3°**  | **Talenti Esper**               | Impari talenti dalla lista **Melder** (Chiaroveggenza, Metafase, Psicogenico).<br>**Caratteristica:** Intelligenza.<br>**Risorse:** Usi i Punti Talento (vedi tabella progressione Artificio).        |
| **3°**  | **Difesa Sensoriale**           | Se colpisci una creatura con un attacco in mischia, quel bersaglio non può effettuare **attacchi di opportunità** contro di te per il resto del turno.                                                |
| **9°**  | **Smorzatore Gravitazionale**   | Ti muovi di 1,5m extra su terreno difficile. Hai **vantaggio** ai Tiri Salvezza per evitare di cadere prono.                                                                                          |
| **13°** | **Occultamento Attivo**         | Quando usi l'azione **Nascondersi** (tramite Azione Scaltra), diventi **Invisibile** (effetto *Offuscare*). Dura 1 minuto, finché mantieni concentrazione, o finché non attacchi/usi poteri.          |
| **17°** | **Riprogrammazione del Modulo** | Impari il talento *Svelare* (extra). Inoltre, puoi **sostituire due** dei tuoi talenti conosciuti con qualsiasi talento/tecnica di **qualsiasi altra classe**. Questi contano come talenti Artificio. |

### Esper Specialista

| **Caratteristica di Attivazione:** | Intelligenza o Destrezza (a seconda della build)Forza o Destrezza (a seconda dell'arma usata) |
| ---------------------------------- | --------------------------------------------------------------------------------------------- |
| Tipo di Potere                     | Tecniche (Gadget, Manovre Tattiche, Hacking e Chimica)                                        |


### Punteggi esper per Artificio

| **Livello** | **Talenti Prime** | **Talenti Conosciuti** | **Punti Talento** | **Grado Max Talento** |
| ----------- | ----------------- | ---------------------- | ----------------- | --------------------- |
| 3°          | 3                 | 3                      | 4                 | 1                     |
| 4°          | 3                 | 4                      | 6                 | 1                     |
| 5°          | 3                 | 4                      | 6                 | 1                     |
| 6°          | 3                 | 4                      | 6                 | 1                     |
| 7°          | 3                 | 5                      | 14                | 2                     |
| 8°          | 3                 | 6                      | 14                | 2                     |
| 9°          | 3                 | 6                      | 14                | 2                     |
| 10°         | 4                 | 7                      | 17                | 2                     |
| 11°         | 4                 | 8                      | 17                | 2                     |
| 12°         | 4                 | 8                      | 17                | 2                     |
| 13°         | 4                 | 9                      | 27                | 3                     |
| 14°         | 4                 | 10                     | 27                | 3                     |
| 15°         | 4                 | 10                     | 27                | 3                     |
| 16°         | 4                 | 11                     | 32                | 3                     |
| 17°         | 4                 | 11                     | 32                | 3                     |
| 18°         | 4                 | 11                     | 32                | 3                     |
| 19°         | 4                 | 12                     | 38                | 4                     |
| 20°         | 4                 | 13                     | 38                | 4                     |
#### Grado 0 (Tecniche Prime)
_Gadget tascabili ad uso rapido e manovre istintive._

| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Analisi Rapida** | 1 azione | 18 metri | Istantanea | I tuoi sensori ottici o la tua intuizione individuano i punti deboli. Ottieni informazioni sulle resistenze, immunità o vulnerabilità ai danni di una creatura o oggetto visibile. |
| **Calcolo Balistico** | 1 azione | 9 metri | Concentrazione, fino a 1 round | Il tuo HUD calcola la traiettoria perfetta. Ottieni vantaggio al tuo primo tiro per colpire contro un bersaglio specifico nel tuo prossimo turno. |
| **Diversivo Sonoro** | 1 azione | 18 metri | 1 minuto | Lanci un micro-emettitore che aderisce a una superficie. Puoi attivarlo come reazione per produrre un suono specifico (passi, voci, spari) per distrarre le guardie o attirare l'attenzione. |
| **Hackeraggio Flash** | 1 azione | Tocco | Istantanea | Sovraccarichi una serratura elettronica semplice o un pannello luci non protetto, aprendolo o spegnendolo/accendendolo istantaneamente senza prove di abilità. |
| **Lama Nascosta** | 1 azione bonus | Personale | Istantanea | Con un movimento impercettibile, estrai o crei un'arma improvvisata (o un pugnale nascosto) ed effettui un attacco. Se colpisci, l'arma viene riposta istantaneamente, lasciando il nemico confuso sulla fonte del danno. |
| **Messaggio Fantasma** | 1 azione | Tocco | Fino a cancellazione | Lasci un messaggio olografico o digitale criptato su un oggetto o una superficie. È invisibile a occhio nudo e può essere letto solo tramite un visore specifico o un codice che tu stabilisci. |
| **Rampino Tattico** | 1 azione bonus | 9 metri | Istantanea | Spara un cavo retrattile dal polso. Ti trascini verso una superficie o un oggetto solido, o attiri un oggetto non fissato (max 5 kg) nella tua mano. |
| **Riparazione d'Emergenza** | 1 minuto | Tocco | Istantanea | Ripari istantaneamente un singolo strappo o rottura in un oggetto (come una tuta o un'arma), purché la rottura non sia più grande di 30 cm. |
| **Segnale Criptato** | 1 azione | 36 metri | 1 round | Invii un messaggio silenzioso a un alleato tramite conduzione ossea. L'alleato può rispondere. Se usato in combattimento, concede vantaggio al prossimo attacco dell'alleato contro un bersaglio entro 1,5m da te. |
| **Spray Marcatore** | 1 azione | 3 metri | 1 ora | Spruzzi un bersaglio con isotopi tracciabili invisibili. Hai vantaggio a qualsiasi prova di Saggezza (Sopravvivenza) o Percezione per tracciare o individuare il bersaglio. |
| **Torcia Chimica** | 1 azione | Tocco | 1 ora | Attivi uno stick chimico o un drone luminoso che aderisce a un oggetto. Emette luce intensa per 6 metri e luce fioca per altri 6 metri. Il colore è a tua scelta. |

#### Grado 1
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Caduta Frenata (Grav-Chute)** | 1 reazione | Personale | 1 minuto | _(Quando cadi)_ Attivi dei micro-propulsori o un paracadute olografico. La tua velocità di discesa rallenta a 18 metri per round e non subisci danni da caduta. |
| **Colpo Stordente** | 1 azione | Contatto (Mischia) | Istantanea | Colpisci un nemico con un taser o un punto di pressione. Effettua un attacco in mischia. Se colpisce, infliggi **1d8 danni da fulmine** e il bersaglio non può usare reazioni fino all'inizio del suo prossimo turno.<br>_A Gradi Superiori: +1d8 danni per ogni grado extra._ |
| **Deflettore Cinetico** | 1 reazione | Personale | 1 round | Attivi uno scudo di energia rigida al momento dell'impatto. Aumenti la tua CA di +5 fino all'inizio del tuo prossimo turno, bloccando anche i Dardi di Forza (Magic Missile). |
| **Granata Fumogena** | 1 azione | 18 metri | 1 minuto | Lanci un dispositivo che crea una nube di fumo denso in un raggio di 6 metri. L'area è pesantemente oscurata. Il fumo persiste finché non si disperde o viene soffiato via. |
| **Identificare Tech** | 1 minuto | Tocco | Istantanea | Colleghi il tuo datapad a un oggetto tecnologico o artefatto. Apprendi le sue proprietà, come usarlo, quante cariche ha e se è maledetto o tracciato. |
| **Maschera Olografica** | 1 azione | Personale | 1 ora | Un proiettore portatile altera il tuo aspetto (inclusi vestiti e armi). Sembri un'altra creatura della tua stessa taglia. |
| **Olio Tattico** | 1 azione | 18 metri | 1 minuto | Lanci una fiala di lubrificante sintetico a frizione zero. Copre un quadrato di 3 metri. È terreno difficile e chi vi entra deve superare un TS su Destrezza o cadere prono. |
| **Passo Silenzioso** | 1 azione | Personale | 1 ora | Attivi smorzatori sonori negli stivali. Ottieni vantaggio alle prove di Destrezza (Furtività) per muoverti silenziosamente e non lasci tracce termiche. |
| **Rete Tattica** | 1 azione | 9 metri | Concentrazione, fino a 10 minuti | Colleghi i sistemi di puntamento di fino a 3 alleati. Quando un alleato attacca un bersaglio che hai attaccato tu in questo turno, ottiene +1d4 al tiro per colpire. |
| **Scatto di Adrenalina** | 1 azione bonus | Personale | Istantanea | Ti inietti uno stimolante rapido. Puoi effettuare l'azione di Disimpegno o Scatto immediatamente, e la tua distanza di salto raddoppia per questo turno. |
| **Sensori di Prossimità** | 1 azione | 9 metri | 8 ore | Piazzi fino a 3 micro-sensori. Se una creatura Minuscola o più grande entra nel raggio di 3 metri da un sensore, ricevi un segnale silenzioso sul tuo HUD. |
| **Traduttore Universale** | 1 azione | Personale | 1 ora | Il tuo auricolare traduce in tempo reale qualsiasi lingua parlata e traduce la tua voce nella lingua desiderata. |

#### Grado 2
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Arrampicata del Ragno** | 1 azione | Personale | 1 ora | Guanti e stivali magnetici o a micro-ventose ti permettono di muoverti su pareti verticali e soffitti a velocità normale, lasciando le mani libere. |
| **Dardo Soporifero** | 1 azione | 18 metri | 1 minuto | Spara un dardo o una siringa. Il bersaglio deve superare un TS Costituzione o cadere addormentato (privo di sensi). Si sveglia se subisce danni o viene scosso.<br>_A Gradi Superiori: Puoi bersagliare una creatura aggiuntiva per ogni grado extra._ |
| **Decoy Olografici** | 1 azione | Personale | 1 minuto | Proietti tre copie illusorie di te stesso che si muovono con te. Quando vieni attaccato, l'attaccante deve tirare un d20 per vedere se colpisce una copia. Le copie hanno CA 10 + Des e vengono distrutte se colpite. |
| **Occultamento Ottico** | 1 azione | Personale | Concentrazione, fino a 1 ora | Attivi un campo di mimetizzazione che ti rende invisibile. Termina se attacchi o lanci una tecnica offensiva. |
| **Rete di Contenimento** | 1 azione | 18 metri | Concentrazione, fino a 1 ora | Spara una rete in fibra di carbonio o schiuma adesiva. Riempie un cubo di 6 metri. È terreno difficile e chi inizia il turno lì deve superare un TS Destrezza o essere **Trattenuto**. |
| **Rilevatore di Trappole** | 1 azione | 36 metri | Istantanea | Il tuo scanner evidenzia la presenza di trappole meccaniche, elettroniche o naturali nella tua linea di vista. Non ne rivela la posizione esatta, ma la natura del pericolo. |
| **Scassinatore Digitale** | 1 azione | Tocco | Istantanea | Un dispositivo universale apre una serratura elettronica o meccanica (CD 20 o inferiore) istantaneamente. Se la CD è superiore, ti garantisce vantaggio alla prova. |
| **Silenzio Assoluto** | 1 azione | 36 metri | Concentrazione, fino a 10 minuti | Lanci un dispositivo che genera un campo di annullamento sonoro (sfera di 6m). Nessun suono può essere emesso o passare attraverso la sfera. Ottimo per infiltrazioni stealth o per neutralizzare incantatori verbali. |
| **Visione Termica** | 1 azione bonus | Personale | 1 ora | Ottieni scurovisione e la capacità di vedere le fonti di calore attraverso pareti sottili (fino a 30 cm di spessore) entro 18 metri. |

#### Grado 3
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Drone Esploratore** | 10 minuti | Illimitata (stesso piano) | Concentrazione, fino a 1 ora | Crei un sensore invisibile (o un micro-drone grande quanto un insetto) che vola e trasmette video/audio. Puoi vederci attraverso come azione. |
| **Fantasma nella Macchina** | 1 azione | Tocco | 1 ora | Inserisci un virus in un terminale. Puoi controllare torrette, telecamere o porte collegate a quella rete come se fossi nella sala di controllo, fino a 1 km di distanza. |
| **Granata Stordente (Flashbang)** | 1 azione | 18 metri | Istantanea | Esplosione di luce e suono in un raggio di 6 metri. Le creature devono superare un TS Costituzione o essere Accecate e Assordate fino alla fine del tuo prossimo turno. |
| **Haste (Sovraccarico Metabolico)** | 1 azione | Personale (o Tocco) | Concentrazione, fino a 1 minuto | Iniezione di stimolanti. La velocità raddoppia, +2 alla CA, vantaggio ai TS su Destrezza e un'azione aggiuntiva per turno (Attacco singolo, Scatto, Disimpegno, Nascondersi). Quando finisce, l'utente perde un turno per letargia. |
| **Jammer di Frequenza** | 1 azione | Personale (raggio 3m) | 8 ore | Tu e il tuo equipaggiamento diventate immuni a qualsiasi magia o tecnologia di divinazione e localizzazione. I sensori non possono rilevarti. |
| **Jetpack (Volo)** | 1 azione | Personale | Concentrazione, fino a 10 minuti | Attivi propulsori dorsali o stivali gravitazionali. Ottieni una velocità di volo di 18 metri. |
| **Nube Tossica** | 1 azione | 27 metri | Concentrazione, fino a 1 minuto | Rilasci un gas nervino in una sfera di 6 metri. Le creature all'interno devono superare un TS Costituzione o subire **3d6 danni da veleno** e non possono recuperare punti ferita. Metà danni se superano. |
| **Proiettore Olografico Maggiore** | 1 azione | 36 metri | Concentrazione, fino a 10 minuti | Crei un'illusione visiva, sonora e olfattiva complessa (grande fino a un cubo di 6 metri). Sembra reale finché non viene interagita fisicamente. |
| **Rebreather (Respiro Acquatico)** | 1 azione | Personale (+10 alleati) | 24 ore | Distribuisci maschere o pillole ossigenanti. I bersagli possono respirare sott'acqua (o nel vuoto, a seconda del setting) per la durata. |

#### Grado 4
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Campo Cinetico (Pelle di Pietra)** | 1 azione | Personale | Concentrazione, fino a 1 ora | Un campo di forza aderente assorbe gli impatti. Hai resistenza ai danni contundenti, perforanti e taglienti non magici. (Costa 100 crediti di polvere di diamante o sorium per attivazione). |
| **Confusione Neurale** | 1 azione | 27 metri | Concentrazione, fino a 1 minuto | Emetti un segnale che interferisce con le sinapsi. Le creature in una sfera di 3 metri devono superare un TS Saggezza o agire casualmente (attaccare a vuoto, muoversi a caso, stare fermi) ogni turno. |
| **Libertà di Movimento** | 1 azione | Personale | 1 ora | Il tuo equipaggiamento rilascia oli speciali o campi di fase. Non puoi essere paralizzato o trattenuto, ignori terreno difficile e puoi spendere 1,5m di movimento per sfuggire automaticamente a prese non magiche. |
| **Localizzatore Perfetto** | 1 azione | Illimitata (stesso piano) | Concentrazione, fino a 1 ora | Se possiedi un oggetto personale di una creatura o l'hai colpita con uno Spray Marcatore, conosci la sua posizione esatta e direzione di movimento, purché sia sullo stesso piano di esistenza. |
| **Occhio Arcano (Drone Spia)** | 1 azione | 9 metri | Concentrazione, fino a 1 ora | Un micro-drone invisibile vola ed esplora. Ha scurovisione e trasmette dati in tempo reale. Può passare attraverso fessure minuscole. |
| **Passaggio Dimensionale (Blink)** | 1 azione | 150 metri | Istantanea | Attivi un prototipo di teletrasporto portatile. Ti sposti istantaneamente in un punto visibile portando con te equipaggiamento e una creatura consenziente. |


## Guerriero

| Caratteristica               | Descrizione                                                                                                     |
| :--------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| **Dadi Vita**                | 1d10 per livello da guerriero                                                                                   |
| **PF al 1° Livello**         | 10 + il tuo modificatore di Costituzione                                                                        |
| **PF ai Livelli Successivi** | 1d10 (o 6) + il tuo modificatore di Costituzione per livello dopo il 1°                                         |
| Competenze                   |                                                                                                                 |
| **Armature**                 | Tutte le armature, scudi                                                                                        |
| **Armi**                     | Armi semplici, armi marziali                                                                                    |
| **Strumenti**                | Nessuno                                                                                                         |
| **Tiri Salvezza**            | Forza, Costituzione                                                                                             |
| **Abilità**                  | Due a scelta tra: Acrobazia, Atletica, Intuizione, Intimidire, Cultura, Percezione, Persuasione e Sopravvivenza |
### Tabella del Guerriero

| Livello | Bonus Comp. | Privilegi                                  |
| :-----: | :---------: | :----------------------------------------- |
|   1°    |     +2      | Stile di Combattimento, Recuperare Energie |
|   2°    |     +2      | Azione Impetuosa (1 uso)                   |
|   3°    |     +2      | Specializzazione Marziale                  |
|   4°    |     +2      | Aumento Punteggi Caratteristica            |
|   5°    |     +3      | Attacco Extra                              |
|   6°    |     +3      | Aumento Punteggi Caratteristica            |
|   7°    |     +3      | Privilegio Specializzazione                |
|   8°    |     +3      | Aumento Punteggi Caratteristica            |
|   9°    |     +4      | Indomito (1 uso)                           |
|   10°   |     +4      | Privilegio Specializzazione                |
|   11°   |     +4      | Attacco Extra (2)                          |
|   12°   |     +4      | Aumento Punteggi Caratteristica            |
|   13°   |     +5      | Indomito (2 uso)                           |
|   14°   |     +5      | Aumento Punteggi Caratteristica            |
|   15°   |     +5      | Privilegio Specializzazione                |
|   16°   |     +5      | Aumento Punteggi Caratteristica            |
|   17°   |     +6      | Indomito (3 uso),Azione Impetuosa (2 uso)  |
|   18°   |     +6      | Privilegio Specializzazione                |
|   19°   |     +6      | Aumento Punteggi Caratteristica            |
|   20°   |     +6      | Attacco Extra (3)                          |

### Caratteristiche di Classe

| Livello | Privilegio                 | Descrizione                                                                                                                         |
| :------ | :------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| **1°**  | **Stile di Combattimento** | Scegli uno stile (vedi dettagli sotto).                                                                                             |
| **1°**  | **Recuperare Energie**     | **Azione Bonus:** Recuperi **1d10 + Livello Guerriero** PF, oppure rimuovi un livello di esaurimento. Recupero: Riposo Breve/Lungo. |
| **2°**  | **Azione Impetuosa**       | **Azione:** Compi un'azione addizionale nel tuo turno. Recupero: Riposo Breve/Lungo.                                                |
| **3°**  | **Archetipo Marziale**     | Scegli un archetipo: **Paragon**, **Commando** o **Guardia della Tempesta**.                                                        |
| **5°**  | **Attacco Extra**          | Puoi attaccare due volte invece di una quando usi l'azione Attacco.                                                                 |
| **9°**  | **Indomito**               | Puoi ritirare un Tiro Salvezza fallito. Una volta per riposo lungo.                                                                 |

---

#### Stili di Combattimento (Dettaglio)
* **Difesa:** +1 alla CA quando indossi armatura.
* **Duellare:** +2 ai danni con arma da mischia in una mano (nessun'altra arma).
* **Combattere con Armi Grandi:** Ritira 1 o 2 ai danni con armi a due mani.
* **Artiglieria (Gunnery):** Riduci il rinculo (*recoil*) delle armi da fuoco di 1.
* **Protezione:** Reazione per dare svantaggio a un attacco contro un alleato entro 1,5m (richiede scudo).
* **Deterrenza a Distanza:** Reazione per fare attacco di opportunità se un nemico entro 1,5m fa un attacco a distanza.
* **Tiro Ravvicinato (Point Shooting):** Non hai svantaggio agli attacchi a distanza entro 1,5m da un nemico.
* **Tiro di Precisione:** +2 ai tiri per colpire con armi a distanza.
* **Combattere con Due Armi:** Aggiungi mod. caratteristica ai danni del secondo attacco.


### Specializzazione Marziale Guerriero

#### Paragon
_Il guerriero d'élite, maestro della perfezione fisica e tattica._

| Livello | Privilegio | Descrizione |
| :--- | :--- | :--- |
| **3°** | **Colpo Infuso** | **Azione Bonus:** Ottieni vantaggio ai tiri per colpire. Fino a fine turno, aggiungi il tuo **Mod. Costituzione** ai danni dell'arma. 3 usi per riposo. |
| **7°** | **Spinta Atletica** | Aggiungi metà bonus competenza alle prove di Forza, Destrezza o Costituzione che non lo usano già. Salti in lungo aumentati. |
| **10°** | **Stile Aggiuntivo** | Scegli un secondo Stile di Combattimento dalla lista base. |
| **15°** | **Colpo Rapido** | Quando hai **vantaggio** su un attacco con arma, puoi rinunciarvi per effettuare un **attacco addizionale** contro lo stesso bersaglio. (Max 1 volta per turno). |
| **18°** | **Sopravvissuto** | All'inizio del turno, se hai meno della metà dei PF ma più di 0, recuperi **5 + Mod. Costituzione** PF. |

---

#### Commando
_Specialista tattico che utilizza manovre e prodezze per dominare il campo._

| Livello | Privilegio | Descrizione |
| :--- | :--- | :--- |
| **3°** | **Addestramento Tattico** | Competenza in uno strumento/veicolo o abilità (Computer, Intuizione, Percezione, Furtività, ecc.). |
| **3°** | **Prodezze (Stunts)** | Ottieni **Dadi Prodezza** (**d8**). Spendi per manovre (vedi tabella sotto). Recupero: Riposo. |
| **7°** | **Demolitore** | Ottieni competenza in granate e strumenti da demolizione. |
| **10°** | **Prodezze Ampliate** | I dadi diventano **d10**. Ottieni l'accesso a manovre avanzate (*Carica di Comando, Vento Coraggioso, Carica Esplosiva*). |
| **15°** | **Determinazione** | Se tiri iniziativa senza dadi prodezza, ne recuperi uno. |

##### Tabella Prodezze (Combat Stunts)
_Spendi un Dado Prodezza per attivare:_

| Prodezza | Effetto |
| :--- | :--- |
| **Contrattacco** | **Reazione** (se mancato in mischia): Attacchi il nemico. Aggiungi il dado ai danni. |
| **Doppio Colpo** | (Se colpisci): Danneggi un secondo nemico entro 1,5m dal primo. Danno = Dado Prodezza. |
| **Spinta Extra** | Aggiungi il dado a una prova di Forza o Destrezza. |
| **Esplosione Lampo** | (Se colpisci): Aggiungi dado ai danni. Bersaglio fa TS Des o è **Accecato**. |
| **Marchio del Guardiano** | Marchi un nemico vicino. Se attacca altri, puoi usare **Reazione** per attaccarlo (aggiungi dado a colpire). |
| **Parata** | **Reazione** (se colpito): Aggiungi dado alla CA. Se colpisce ancora, dimezzi i danni. |
| **Colpo di Precisione** | Aggiungi il dado al Tiro per Colpire (prima o dopo il tiro). |
| **Colpo Rapido** | **Azione Bonus**: Colpisci con colpo senz'armi/improvvisato. Danno = Dado. Bersaglio non può fare AdO. |
| **Fuoco di Ritorno** | **Reazione** (se mancato a distanza): Attacchi a distanza il nemico. Aggiungi dado a colpire. |
| **Attacco di Spinta** | (Se colpisci in mischia): Aggiungi dado ai danni. Nemico (Grande o meno) TS Forza o spinto 3m e **Prono**. |
| **Passo Sicuro** | **Azione Bonus**: Aggiungi dado ai TS Forza/Des contro movimento forzato/prono fino al prossimo turno. |
| **Lancio Mirato** | Aggiungi dado a prova di Atletica per granate o tiro per colpire con lanciagranate. |
| **Colpo di Squadra** | (Se colpisci): Rinunci al danno per far attaccare un alleato (**Reazione**), che aggiunge il dado al suo tiro per colpire. |
| **Manovra Acrobatica** | (In movimento): Aggiungi il dado alla tua CA finché ti muovi. |
| **Carica di Comando** (Liv 10+) | (Con Azione Impetuosa): Invece dell'azione extra, 2 alleati usano Azione Bonus per attaccare. |
| **Vento Coraggioso** (Liv 10+) | (Con Recuperare Energie): 3 alleati recuperano PF pari al tiro del Dado Prodezza. |
| **Carica Esplosiva** (Liv 10+) | Attacchi un esplosivo. Al prossimo turno nemico: danni fuoco = Dado Prodezza e TS Cost o **Stordito**. |

---

#### Guardia della Tempesta
_Combattente elementale che infonde la propria arma di potere distruttivo._

| Livello | Privilegio | Descrizione |
| :--- | :--- | :--- |
| **3°** | **Legame con l'Arma** | Puoi legarti a un'arma e richiamarla istantaneamente in mano. |
| **3°** | **Impulso dell'Arma** | (Una volta per turno, se colpisci): Attivi un effetto extra (es. danni fuoco, acido, elettricità, o buttare prono) oltre al danno normale. **2 usi** per riposo. |
| **7°** | **Impulso Residuo** | Quando usi l'Impulso, l'arma cambia tipo di danno per corrispondere all'effetto fino al prossimo turno e supera le resistenze. |
| **10°** | **Colpo di Precisione** | Se manchi con l'arma legata, puoi spendere un *Impulso* per ritirare il tiro. Se colpisci, applichi l'effetto dell'impulso. Se manchi, l'uso è perso. |
| **15°** | **Ondata Senza Confini** | Se tiri iniziativa senza *Impulsi* rimanenti, ne recuperi uno. |
| **18°** | **Affinità Energetica** | Quando usi *Impulso Residuo*, ottieni **Resistenza** al tipo di danno dell'arma. |

### Esper guerriero

| **Caratteristica di Attivazione:** | Forza o Destrezza (a seconda dell'arma usata) |
| ---------------------------------- | --------------------------------------------- |
| **Tipo di Potere                   | Manovre (Fisiche, Tattiche e Tecnologiche)    |

#### Grado 0 (Manovre Base)
_Queste tecniche rappresentano l'addestramento fondamentale, utilizzabili a volontà o con minimo sforzo._

| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Colpo di Pomolo** | 1 azione bonus | Mischia | Istantanea | Dopo aver effettuato un attacco, colpisci con l'impugnatura. Infliggi **1d4 danni contundenti** automatici (senza modificatore) a un bersaglio adiacente. |
| **Copertura Improvvisata** | 1 reazione | Personale | 1 round | Quando vieni bersagliato da un attacco a distanza, ti getti dietro un oggetto o usi il terreno. Ottieni i benefici di mezza copertura (+2 CA) contro quell'attacco. |
| **Manutenzione Rapida** | 1 azione | Tocco | Istantanea | Rimuovi inceppamenti minori da un'arma da fuoco o ripari ammaccature superficiali in un'armatura, rimuovendo penalità temporanee dovute all'usura o sporcizia. |
| **Postura Salda** | 1 reazione | Personale | Istantanea | _(Quando verresti spostato)_ Pianti i piedi a terra o attivi i magneti degli stivali. Hai vantaggio su qualsiasi prova o TS per evitare di essere spinto, trascinato o gettato a terra prono. |
| **Ricarica Tattica** | 1 azione bonus | Personale | Istantanea | Puoi ricaricare un'arma con la proprietà _Ricarica_ o cambiare un caricatore come parte di questa azione bonus, anche se hai le mani occupate (usando tecniche rapide). |
| **Sguardo Intimidatorio** | 1 azione | 9 metri | 1 round | Fissi un nemico negli occhi. Deve superare un TS Saggezza (CD 8 + prof + Carisma) o avere svantaggio al prossimo attacco contro di te. |
| **Valutazione Tattica** | 1 azione bonus | 18 metri | Istantanea | Analizzi la postura di un avversario. Il DM ti rivela se il bersaglio è superiore, uguale o inferiore a te in una delle seguenti statistiche: Forza, Destrezza o CA. |

#### Grado 1
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Carica Travolgente** | 1 azione | Movimento | Istantanea | Ti muovi fino alla tua velocità in linea retta. Puoi passare attraverso lo spazio di creature di taglia uguale o inferiore. Ogni creatura attraverso cui passi deve superare un TS Forza o cadere prona e subire **1d6 danni contundenti**. |
| **Colpo Possente** | 1 azione | Arma | Istantanea | Effettui un attacco in mischia con -5 al tiro per colpire. Se colpisci, aggiungi **+10 ai danni**. Se l'attacco riduce il bersaglio a 0 PF, puoi effettuare un altro attacco come azione bonus. |
| **Grido di Battaglia** | 1 azione bonus | 9 metri | Istantanea | Emetti un urlo che rinvigorisce gli alleati. Fino a 3 alleati entro la gittata guadagnano **1d8 Punti Ferita Temporanei**. |
| **Parata Riflessa** | 1 reazione | Personale | Istantanea | Quando vieni colpito da un attacco in mischia, riduci il danno di **1d10 + modificatore Des/For + livello guerriero**. |
| **Raffica di Soppressione** | 1 azione | Arma a distanza | Istantanea | Svuoti il caricatore in un cono di 4,5 metri. Le creature nell'area devono superare un TS Destrezza o subire i danni dell'arma. Le creature che falliscono non possono muoversi verso di te nel loro prossimo turno. |
| **Scudo Umano** | 1 reazione | 1,5 metri | Istantanea | Se hai una creatura afferrata (in grapple), quando vieni attaccato puoi usare la tua reazione per interporre la creatura afferrata. L'attacco colpisce la creatura afferrata invece di te se il tiro per colpire supera la sua CA. |
| **Spezzare la Guardia** | 1 azione (attacco) | Mischia | 1 round | Fai un attacco per disarmare o sbilanciare. Se ha successo, il bersaglio ha anche svantaggio a tutti i tiri per colpire fino all'inizio del tuo prossimo turno. |

#### Grado 2
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Adrenalina Pura** | 1 azione bonus | Personale | 1 turno | Ottieni una reazione aggiuntiva che puoi usare in questo round. Inoltre, la tua velocità aumenta di 3 metri. |
| **Colpo al Ginocchio** | 1 azione | Arma | Istantanea | Effettui un attacco mirato. Se colpisci, infliggi danni normali e la velocità del bersaglio è ridotta a 0 fino alla fine del suo prossimo turno. |
| **Colpo Sismico** | 1 azione | 3 metri (raggio) | Istantanea | Colpisci il terreno con forza tremenda. Tutte le creature entro 3 metri devono superare un TS Destrezza o subire **2d8 danni da impatto** e cadere prone. Il terreno diventa difficile. |
| **Intercettazione** | 1 reazione | 3 metri | Istantanea | Quando un alleato entro 3 metri viene attaccato, puoi muoverti nel suo spazio (spostandolo di 1,5m) e diventare il bersaglio dell'attacco. Hai resistenza ai danni di quell'attacco. |
| **Muro di Lame** | 1 azione | Personale | 1 round | Fai roteare la tua arma difensivamente. Fino all'inizio del tuo prossimo turno, la tua CA aumenta di +2 e chiunque ti colpisca in mischia subisce danni pari al tuo modificatore di Forza/Destrezza. |
| **Tiro di Precisione Estremo** | 1 azione | Arma a distanza | Istantanea | Effettui un singolo attacco a distanza ignorando qualsiasi copertura (tranne totale) e penalità di gittata. Se colpisci, aggiungi il tuo livello ai danni. |

#### Grado 3
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Colpo Spacca-Scudi** | 1 azione | Mischia | Fino a riparazione | Colpisci con forza devastante l'armatura o lo scudo nemico. Il bersaglio deve superare un TS Costituzione. Se fallisce, la sua CA è ridotta permanentemente di 2 (fino a riparazione dell'armatura) e subisce danni normali. |
| **Ordine del Comandante** | 1 azione | 18 metri | Istantanea | Scegli un alleato. Quell'alleato può usare la sua reazione per effettuare immediatamente un attacco o muoversi della sua velocità senza provocare attacchi di opportunità. |
| **Resistenza al Dolore** | 1 reazione | Personale | Istantanea | _(Quando subisci danni)_ Dimezzi i danni subiti dall'attacco scatenante. Inoltre, non puoi essere gettato prono o spostato fino all'inizio del tuo prossimo turno. |
| **Sventagliata Letale** | 1 azione | Arma a distanza | Istantanea | Scegli un punto entro gittata. Effettui un attacco contro ogni creatura entro 3 metri da quel punto. Devi avere munizioni sufficienti. |
| **Vortice d'Acciaio** | 1 azione | 1,5 metri | Istantanea | Effettui un attacco in mischia contro ogni creatura entro la tua portata. Tira i danni separatamente per ogni bersaglio colpito. |

#### Grado 4
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Colpo Decapitante** | 1 azione | Mischia | Istantanea | Tenti un colpo letale. Effettua un attacco. Se colpisci e il bersaglio ha 30 PF o meno, muore istantaneamente. Se ha più di 30 PF, subisce **6d8 danni extra**. |
| **Disarmo Violento** | 1 azione | Mischia | Istantanea | Colpisci per disarmare. Se l'attacco supera la CA avversaria, il nemico subisce danni normali, l'arma vola via e il braccio del nemico è intorpidito (svantaggio ai tiri per colpire) per 1 round. |
| **Presenza Terrificante** | 1 azione | 18 metri | 1 minuto | Ogni nemico entro 18 metri che può vederti deve superare un TS Saggezza o essere **Spaventato** da te. Se spaventato, deve usare la sua azione per scappare. |
| **Resistenza Inumana** | 1 azione bonus | Personale | 1 minuto | Per la durata, ottieni resistenza ai danni contundenti, perforanti e taglienti non magici. Se scendi a 0 PF, puoi fare un TS Costituzione (CD 10) per scendere invece a 1 PF (una volta per attivazione). |

#### Grado 5
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Juggernaut** | 1 azione bonus | Personale | 1 minuto | Diventi inarrestabile. Sei immune alle condizioni: Spaventato, Affascinato, Paralizzato, Stordito e Trattenuto. La tua velocità non può essere ridotta. Ottieni **20 PF temporanei** all'attivazione. |
| **Tempesta di Lame** | 1 azione | 9 metri | Istantanea | Ti muovi a velocità inumana tra i nemici. Teletrasportati o scatta verso fino a 5 bersagli entro 9 metri. Effettua un attacco contro ciascuno. Se colpisci, è **critico automatico**. |
| **Zona di Uccisione** | 1 azione | Personale | 1 round | Fino all'inizio del tuo prossimo turno, hai reazioni infinite, ma puoi usarle solo per effettuare attacchi di opportunità. Chiunque si muova nella tua portata (anche di 1,5m) provoca un attacco. |

#### Grado 6
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Colpo Perfetto** | Nessuna | Arma | Istantanea | _(Parte dell'attacco)_ Dichiari un Colpo Perfetto prima di tirare. L'attacco colpisce automaticamente (non serve tirare il d20). È considerato un **colpo critico** e infligge il massimo dei danni possibili. |
| **Muro di Ferro** | 1 reazione | Personale | 1 round | Fino al tuo prossimo turno, sei immune a tutti i danni fisici (contundenti, perforanti, taglienti) e hai vantaggio su tutti i Tiri Salvezza. Non puoi muoverti dalla tua posizione. |
| **Ultima Resistenza** | Reazione | Personale | Istantanea | _(Quando vai a 0 PF)_ Invece di cadere privo di sensi, recuperi PF pari alla metà del tuo massimo, ti alzi in piedi (se prono) ed effettui immediatamente un'azione di attacco completa contro chi ti ha abbattuto. |

#### Grado 7
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Furia del Berserker** | 1 azione bonus | Personale | 1 minuto | Entri in uno stato di furia micidiale. Ottieni un attacco extra per ogni azione di Attacco che effettui. I tuoi attacchi critici avvengono con 18-20. Non puoi lanciare poteri o concentrarti. |
| **Onda d'Urto Cinetica** | 1 azione | Cono (18m) | Istantanea | Colpisci l'aria o il terreno con tale forza da generare un'onda d'urto. Ogni creatura nel cono deve superare un TS Costituzione. Fallimento: **10d8 danni da forza** e stordito per 1 round. Successo: metà danni. |
| **Spezzare l'Orda** | 1 azione | Mischia o Distanza | Istantanea | Effettui un attacco contro ogni nemico che puoi vedere entro la portata della tua arma. Se uccidi un nemico, ottieni un attacco bonus contro un altro bersaglio entro 3 metri da quello abbattuto. |

#### Grado 8
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Bombardamento Orbitale** | 1 azione | Vista | Istantanea | Lanci un segnalatore o chiami un supporto orbitale. Un raggio di energia cinetica o laser colpisce un punto. Cilindro di 12m di raggio, altezza infinita. TS Destrezza. Fallimento: **20d6 fuoco + 20d6 forza**. Successo: metà danni. |
| **Maestro della Guerra** | 1 azione bonus | Aura (18m) | 1 ora | La tua presenza domina il campo. Tu e tutti gli alleati entro 18 metri avete vantaggio su tutti i tiri per colpire, le prove di abilità e i tiri salvezza. Inoltre, siete immuni alla paura e allo charme. |
| **Vortice di Distruzione** | 1 azione | Personale | 1 minuto | Diventi una macchina di morte. Qualsiasi creatura che inizia il suo turno entro 3 metri da te o entra in quello spazio per la prima volta subisce automaticamente **4d10 danni taglienti o contundenti** (a seconda della tua arma). |

#### Grado 9
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Colpo dell'Apocalisse** | 1 azione | Arma | Istantanea | Canalizzi ogni grammo di forza in un singolo colpo. Se colpisci, il bersaglio deve superare un TS Costituzione con CD 20. Fallimento: il bersaglio è ridotto a 0 PF e il suo corpo è distrutto. Successo: subisce **150 danni**. |
| **Dio della Guerra** | 1 azione bonus | Personale | 10 minuti | Diventi l'incarnazione della battaglia. Sei immune a tutti i danni da armi non magiche/non forgiate. Rigeneri 20 PF all'inizio di ogni turno. Le tue statistiche di Forza e Costituzione diventano 24 (se inferiori). I tuoi attacchi ignorano resistenze e immunità. |
| **Esercito di Uno** | 1 azione | Personale | Istantanea | Effettui quattro azioni di Attacco complete in questo turno (oltre alla tua azione normale, per un totale di 5 azioni di attacco). Dopo aver usato questa tecnica, subisci 2 livelli di indebolimento. |

---

#### Tecniche Specifiche per Specializzazione (Guerriero)

_Disponibili solo per i guerrieri che hanno scelto il rispettivo archetipo e raggiunto il livello adeguato._

##### Archetipo: Paragone (Paragon)
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Analisi del Flusso** (Grado 3) | 1 azione bonus | - | 1 minuto | Studi i movimenti del nemico. Per 1 minuto, i tuoi attacchi contro quel bersaglio specifico non possono subire svantaggio e criticano con 19-20. |
| **Contrattacco Maestro** (Grado 5) | Reazione | - | Istantanea | Quando un nemico ti manca con un attacco in mischia, puoi effettuare un attacco di opportunità contro di lui. Se colpisci, lo sbilanci (prono) o lo disarmi automaticamente. |
| **Perfezione Marziale** (Grado 7) | Passiva | - | Permanente | Aggiungi il tuo modificatore di competenza ai danni di tutte le armi in cui sei specializzato (oltre al normale modificatore di caratteristica). |
| **Taglio Dimensionale** (Grado 9) | 1 azione | Linea (30m) | Istantanea | Colpisci l'aria con tale perfezione da tagliare lo spazio. Colpisci tutti i nemici in una linea di 30 metri. I danni ignorano l'armatura (colpiscono come se la CA fosse 10) e sono considerati danni da forza. |

##### Archetipo: Commando
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Trappola Improvvisata** (Grado 2) | 1 azione | Tocco | Fino a attivazione | Piazzi una carica o un dispositivo innescato. La prima creatura che passa entro 1,5m subisce **4d6 danni da fuoco/perforanti** e viene gettata a terra. |
| **Fuoco di Copertura Totale** (Grado 4) | 1 azione | Cono (18m) | Concentrazione, fino a 1 round | Spara in continuazione in un'area. Nessun nemico può attraversare l'area senza subire danni pari a un tuo attacco normale. Gli alleati nell'area sono considerati avere Copertura Totale contro attacchi provenienti dall'altro lato del cono. |
| **Demolizione Controllata** (Grado 6) | 1 azione | 18 metri | Istantanea | Piazzi o lanci una carica che distrugge una struttura o un veicolo. Infligge 100 danni a oggetti/strutture in un raggio di 3 metri. Le creature nell'area subiscono **10d6 danni**. |
| **Attacco Nucleare Tattico** (Grado 9) | 1 azione | 1 km | Istantanea | Lanci o guidi un micro-ordigno nucleare. Sfera di 60 metri. Tutte le creature nell'area subiscono **40d6 danni** (metà fuoco, metà necrotici/radiazioni). Le strutture nell'area sono vaporizzate. |

##### Archetipo: Guardia della Tempesta (Storm Guard)
| Nome                                     | Tempo di attivazione | Gittata           | Durata     | Descrizione                                                                                                                                                                                                                                    |
| :--------------------------------------- | :------------------- | :---------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sovraccarico dell'Impianto** (Grado 3) | 1 azione bonus       | -                 | 1 minuto   | Spingi il tuo impianto sorium al limite. I tuoi attacchi in mischia infliggono **1d6 danni extra da energia** (fuoco, fulmine o forza) ma subisci 1d4 danni necrotici alla fine di ogni turno in cui attacchi.                                 |
| **Attrazione Magnetica** (Grado 4)       | 1 azione             | 9 metri           | Istantanea | Attivi un campo magnetico ad alta intensità. Tutti i nemici entro 9 metri che indossano metallo devono superare un TS Forza o essere trascinati adiacenti a te. Puoi fare un attacco rotante (colpendo tutti gli adiacenti) come azione bonus. |
| **Scudo di Tempesta** (Grado 6)          | 1 azione             | Personale         | 10 minuti  | Un campo di energia crepitante ti circonda. Ottieni +2 CA e chiunque ti colpisca in mischia subisce **2d8 danni da fulmine o fuoco**.                                                                                                          |
| **Esplosione Nova** (Grado 8)            | 1 azione             | 18 metri (raggio) | Istantanea | Rilasci tutta l'energia del tuo impianto in una volta sola. Ogni creatura entro 18 metri subisce **12d8 danni da forza e 12d8 danni da fulmine** (TS Costituzione dimezza). Tu diventi esausto (1 livello).                                    |


## Mistico
| Caratteristica               | Descrizione                                                                          |
| :--------------------------- | :----------------------------------------------------------------------------------- |
| **Dadi Vita**                | 1d8 per livello da mistico                                                           |
| **PF al 1° Livello**         | 8 + il tuo modificatore di Costituzione                                              |
| **PF ai Livelli Successivi** | 1d8 (o 5) + il tuo modificatore di Costituzione per livello dopo il 1°               |
| Competenze                   |                                                                                      |
| **Armature**                 | Leggere, Medie, Scudi                                                                |
| **Armi**                     | Armi semplici                                                                        |
| **Strumenti**                | Kit di Erboristeria o uno Strumento Musicale                                         |
| **Tiri Salvezza**            | Saggezza, Carisma                                                                    |
| **Abilità**                  | Due a scelta tra: Intuizione, Medicina, Persuasione, Religione, Storia, Xenobiologia |
### Tabella del Mistico

| Livello | Bonus Comp. | Talenti Prime | Punti Talento | Grado Max Talento | Privilegi                                       |
| :-----: | :---------: | :-----------: | :-----------: | :---------------: | :---------------------------------------------- |
|   1°    |     +2      |       3       |       4       |         1         | Canalizzazione, Legame Spirituale, Fonte Vitale |
|   2°    |     +2      |       3       |       6       |         1         | Connessione Mistica, Fonte Vitale (2d6)         |
|   3°    |     +2      |       3       |      14       |         2         | Fonte Vitale (3d6)                              |
|   4°    |     +2      |       4       |      17       |         2         | Aumento Punteggi Caratteristica                 |
|   5°    |     +3      |       4       |      27       |         3         | Fonte Vitale (4d6)                              |
|   6°    |     +3      |       4       |      32       |         3         | Privilegio Connessione, Fonte Vitale (5d6)      |
|   7°    |     +3      |       4       |      38       |         4         | Fonte Vitale (6d6)                              |
|   8°    |     +3      |       4       |      44       |         4         | Aumento Punteggi,                               |
|   9°    |     +4      |       4       |      57       |         5         | Fonte Vitale (7d6)                              |
|   10°   |     +4      |       5       |      64       |         5         | Intervento Cosmico,                             |
|   11°   |     +4      |       5       |      73       |         6         |                                                 |
|   12°   |     +4      |       5       |      78       |         6         | Aumento Punteggi Caratteristica                 |
|   13°   |     +5      |       5       |      83       |         7         | Fonte Vitale (8d6)                              |
|   14°   |     +5      |       5       |      88       |         7         |                                                 |
|   15°   |     +5      |       5       |      94       |         8         | Aumento Punteggi Caratteristica                 |
|   16°   |     +5      |       5       |      100      |         8         | Aumento Punteggi Caratteristica                 |
|   17°   |     +6      |       5       |      107      |         9         | Fonte Vitale (9d6)                              |
|   18°   |     +6      |       5       |      114      |         9         |                                                 |
|   19°   |     +6      |       5       |      123      |         9         | Aumento Punteggi Caratteristica                 |
|   20°   |     +6      |       5       |      133      |         9         | Fonte Vitale (10d6)                             |
### Caratteristiche di Classe

| Livello | Privilegio                 | Descrizione                                                                                                                                                                                                    |
| :------ | :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1°**  | **Canalizzazione**         | Usi la **Saggezza** per lanciare Talenti. Conosci **3 Talenti Prime** e **4 Talenti di Grado 1**.<br>Risorsa: **Punti Talento** (Recupero: Riposo Lungo).<br>_Consigliati: Domini Psicogenico e Alterazione._  |
| **1°**  | **Legame Spirituale**      | Scegli creature (pari a Mod. Sag) da legare dopo riposo lungo. Se entro 30m:<br>• **Condotto:** Puoi lanciare talenti a "Tocco" su di loro fino a 9m.<br>• **Consapevolezza:** Conosci direzione e PF attuali. |
| **1°**  | **Fonte Vitale**           | Riserva di dadi **d6** pari al Livello. **Azione Bonus:** Spendi dadi (max Mod. Sag) per curare un bersaglio legato entro 18m. Recupero: Riposo Lungo.                                                         |
| **2°**  | **Connessione Mistica**    | Scegli una sottoclasse: **Connessione del Guaritore** o **Connessione Empatica**.                                                                                                                              |
| **4°**  | **Aumento Caratteristica** | Aumenti una caratteristica di 2 o due di 1 (o scegli un Talento).                                                                                                                                              |
| **8°**  | **Aumento Caratteristica** | Aumenti una caratteristica di 2 o due di 1 (o scegli un Talento).                                                                                                                                              |
| **10°** | **Intervento Cosmico**     | **Reazione** (quando un legato entro 18m va a 0 PF): Il bersaglio recupera immediatamente metà dei suoi PF massimi. Tu subisci **1 livello di Indebolimento**. Recupero: Riposo Lungo.                         |

### Specializzazioni mistico 

#### Connessione del Guaritore
_Focalizzato sul potenziamento delle cure e sul sacrificio per il gruppo._

| Livello | Privilegio | Descrizione |
| :--- | :--- | :--- |
| **2°** | **Guaritore Potenziato** | • Quando usi un Talento (Grado 1+) per curare, aggiungi **2 + Grado Talento** ai PF curati.<br>• Quando usi *Fonte Vitale*, aggiungi il **Mod. Saggezza** al totale curato. |
| **6°** | **Trasferimento Vitale** | **Azione:** Tocchi un legato e subisci danni necrotici (a scelta, non riducibili). Il bersaglio recupera pari PF.<br>Inoltre, se curi un legato al massimo dei PF, l'eccesso diventa **PF Temporanei** (Max 10). |

---

#### Connessione Empatica
_Focalizzato sulla comunicazione mentale e sulla condivisione del dolore._

| Livello | Privilegio               | Descrizione                                                                                                                                                               |
| :------ | :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **2°**  | **Mente Alveare**        | Telepatia tra legati entro 30m.<br>Un legato può usare **Reazione** per aggiungere **1d4** a un TS su Saggezza o Carisma.                                                 |
| **6°**  | **Sovraccarico Emotivo** | **Reazione** (quando un legato subisce danni): L'attaccante deve fare un TS Saggezza. Fallimento: **2d8 + Mod. Sag danni psichici** e **Svantaggio** al prossimo attacco. |

### Esper mistico 

| **Caratteristica di Attivazione:** | Saggezza                                        |
| ---------------------------------- | ----------------------------------------------- |
| **Tipo di Potere:**                | Talenti (Canalizzazione Spirituale e Biocinesi) |

#### Grado 0 (Talenti Prime)
_Questi talenti rappresentano la connessione costante del Mistico con il flusso dell'universo._

| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Guida Spirituale** | 1 azione | Tocco | Concentrazione, fino a 1 minuto | Tocchi una creatura consenziente. Una volta prima che l'effetto termini, il bersaglio può tirare un d4 e aggiungere il risultato a una prova di caratteristica a sua scelta. |
| **Interferenza Psichica** | 1 azione | 18 metri | 1 round | Disturbi il flusso di energia di un nemico. Il bersaglio deve superare un TS su Intelligenza o subire **1d6 danni psichici** e non può effettuare reazioni fino all'inizio del tuo prossimo turno.<br>_Il danno aumenta ai livelli 5, 11 e 17._ |
| **Luce dell'Anima** | 1 azione | Tocco | 1 ora | Fai brillare un oggetto (o la tua stessa pelle) di luce stellare. Emette luce intensa per 6 metri e luce fioca per altri 6 metri. |
| **Nesso Sensoriale** | 1 azione | 9 metri | 1 round | Stabilisci un breve legame mentale con una creatura. Conosci il suo stato emotivo attuale e la sua posizione esatta, anche se è invisibile, fintanto che rimane entro la gittata. |
| **Sguardo Rassicurante** | 1 azione | 18 metri | Istantanea | Scegli una creatura che può vederti. Se è Spaventata, ottiene un nuovo Tiro Salvezza con vantaggio per terminare l'effetto. |
| **Stabilizzare** | 1 azione | Tocco | Istantanea | Incanali energia vitale residua in una creatura vivente con 0 Punti Ferita. La creatura diventa stabile. |
| **Tocco della Resistenza** | 1 azione | Tocco | Concentrazione, fino a 1 minuto | Il bersaglio può tirare un d4 e aggiungerlo a un Tiro Salvezza a sua scelta. |

#### Grado 1
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Anatema (Bane)** | 1 azione | 9 metri | Concentrazione, fino a 1 minuto | Fino a tre creature devono superare un TS Carisma o sottrarre **1d4** ai loro tiri per colpire e tiri salvezza. |
| **Benedizione Cosmica** | 1 azione | 9 metri | Concentrazione, fino a 1 minuto | Fino a tre creature a tua scelta possono aggiungere **1d4** ai tiri per colpire e ai tiri salvezza.<br>_A Gradi Superiori: +1 creatura per ogni grado extra._ |
| **Comando Mentale** | 1 azione | 18 metri | 1 round | Imponi una singola parola di comando (es: "Fermati", "Lascia", "Fuggi") a una creatura. Se fallisce un TS Saggezza, obbedisce nel suo prossimo turno. |
| **Dardo Radiante** | 1 azione | 36 metri | 1 round | Attacco a distanza. **4d6 danni radianti** e il prossimo attacco contro il bersaglio ha vantaggio. |
| **Infusione Vitale** | 1 azione | Tocco | Istantanea | Una creatura che tocchi recupera Punti Ferita pari a **1d8 + il tuo modificatore di Saggezza**.<br>_A Gradi Superiori: +1d8 per ogni grado extra._ |
| **Parola di Conforto** | 1 azione bonus | 18 metri | Istantanea | Una creatura a tua scelta che puoi vedere entro gittata recupera PF pari a **1d4 + il tuo modificatore di Saggezza**. |
| **Rilevazione dell'Aura** | 1 azione | Personale | Concentrazione, fino a 10 minuti | Percepisci la presenza di non morti, celestiali, immondi o aberrazioni entro 9 metri, così come luoghi o oggetti consacrati/sconsacrati. |
| **Santuario** | 1 azione bonus | 9 metri | 1 minuto | Qualsiasi creatura che tenti di attaccare o lanciare un incantesimo dannoso contro il bersaglio protetto deve prima superare un TS Saggezza. Se fallisce, deve scegliere un nuovo bersaglio o perdere l'attacco. |
| **Scudo Psichico** | 1 azione bonus | 18 metri | Concentrazione, fino a 10 minuti | Un campo di forza mentale circonda una creatura. Ottiene **+2 alla CA** per la durata. |

#### Grado 2
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Arma Spirituale** | 1 azione bonus | 18 metri | 1 minuto | Crei un'arma fluttuante di energia spettrale. Puoi attaccare con essa (azione bonus, **1d8 + Sag danni forza**). |
| **Calmare Emozioni** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Sopprimi emozioni forti in un'area di 6 metri. Le creature possono scegliere di fallire il TS. Se falliscono, non possono essere spaventate o affascinate, o diventano indifferenti se erano ostili. |
| **Cecità/Sordità** | 1 azione | 9 metri | 1 minuto | Infliggi cecità o sordità a un nemico (TS Costituzione). |
| **Legame di Protezione** | 1 azione | Tocco | 1 ora | Mentre il bersaglio è entro 18 metri da te, ottiene +1 a CA e TS, e ha resistenza a tutti i danni. Tuttavia, tu subisci lo stesso ammontare di danni ogni volta che lui ne subisce. |
| **Preghiera di Guarigione** | 10 minuti | 9 metri | Istantanea | Fino a sei creature recuperano **2d8 + Saggezza PF**. |
| **Restaurare Inferiore** | 1 azione | Tocco | Istantanea | Tocchi una creatura e poni fine a una malattia o a una condizione tra: accecato, assordato, paralizzato o avvelenato. |
| **Silenzio** | 1 azione | 36 metri | Concentrazione, fino a 10 minuti | Nessun suono può essere creato o passare attraverso una sfera di 6 metri. Blocca i poteri che richiedono componenti verbali. |
| **Zona di Verità** | 1 azione | 18 metri | 10 minuti | Le creature in una sfera di 4,5 metri non possono mentire deliberatamente se falliscono un TS Carisma. |

#### Grado 3
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Chiaroveggenza** | 10 minuti | 1,5 km | Concentrazione, fino a 10 minuti | Crei un sensore invisibile in un luogo noto per vedere o sentire. |
| **Dissolvi Magia/Potere** | 1 azione | 36 metri | Istantanea | Termini incantesimi o effetti esper attivi su un bersaglio. |
| **Faro di Speranza** | 1 azione | 9 metri | Concentrazione, fino a 1 minuto | Gli alleati hanno vantaggio ai TS Saggezza e ai TS contro morte, e recuperano il massimo dei PF da qualsiasi cura. |
| **Guarigione di Massa (Parola)** | 1 azione bonus | 18 metri | Istantanea | Fino a sei creature recuperano **1d4 + Saggezza PF**. |
| **Revivificare** | 1 azione | Tocco | Istantanea | Riporti in vita una creatura morta nell'ultimo minuto. Ritorna con 1 PF. Richiede diamanti o cristalli sorium costosi (300 crediti) che vengono consumati. |
| **Rimuovi Maledizione** | 1 azione | Tocco | Istantanea | Rimuovi tutte le maledizioni che affliggono una creatura o un oggetto. |
| **Spiriti Guardiani** | 1 azione | Personale (4,5m) | Concentrazione, fino a 10 minuti | Spiriti cosmici ti circondano. I nemici nell'area subiscono **3d8 danni radianti o necrotici** (TS Saggezza dimezza) e hanno velocità dimezzata. |

#### Grado 4
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Esilio (Banishment)** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Invii una creatura in un piano di esistenza innocuo (o nel suo piano nativo se extra-dimensionale). Se mantieni la concentrazione per tutta la durata, l'aberrazione non ritorna. |
| **Guardiano della Fede** | 1 azione | 9 metri | 8 ore | Crei un guardiano spettrale immobile. Chi si avvicina ostilmente subisce **20 danni radianti** (TS Des dimezza). |
| **Interdizione alla Morte** | 1 azione | Tocco | 8 ore | La prima volta che il bersaglio scenderebbe a 0 PF, scende invece a 1 PF e l'effetto termina. Protegge anche dalla morte istantanea senza danni. |
| **Libertà di Movimento** | 1 azione | Tocco | 1 ora | Il bersaglio ignora terreno difficile, non può essere paralizzato o trattenuto, e sfugge automaticamente alle prese. |
| **Localizza Creatura** | 1 azione | Personale | Concentrazione, fino a 1 ora | Percepisci la direzione verso una creatura specifica o generica entro 300 metri. |

#### Grado 5
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Colpo Fiammeggiante** | 1 azione | 18 metri | Istantanea | Colonna di fuoco divino. **4d6 danni da fuoco e 4d6 danni radianti** in un cilindro di 3 metri (TS Des dimezza). |
| **Guarigione di Massa** | 1 azione | 18 metri | Istantanea | Fino a sei creature recuperano **3d8 + Saggezza PF**. Inoltre cura cecità e sordità. |
| **Legame Telepatico** | 1 azione | 9 metri | 1 ora | Colleghi mentalmente fino a 8 creature. Possono comunicare a qualsiasi distanza (stesso piano). |
| **Restaurare Superiore** | 1 azione | Tocco | Istantanea | Rimuovi un livello di esaurimento, o effetti di charme, pietrificazione, maledizioni, o riduzione di caratteristiche/PF massimi. |
| **Rianimare Morti** | 1 ora | Tocco | Istantanea | Riporti in vita una creatura morta da non più di 10 giorni. Cura veleni e malattie non magiche. Penalità ai tiri per qualche giorno. Richiede un diamante/cristallo (500 crediti) consumato. |

#### Grado 6
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Banchetto degli Eroi** | 10 minuti | 9 metri | Istantanea | Crei un pasto magnifico per 12 creature. Cura malattie, immunità a veleno e paura, vantaggio ai TS Saggezza, e aumenta i PF massimi di **2d10** per 24 ore. |
| **Guarigione (Heal)** | 1 azione | 18 metri | Istantanea | Un bersaglio recupera **70 PF** e viene curato da cecità, sordità e malattie. |
| **Parola del Ritiro** | 1 azione | 1,5 metri | Istantanea | Teletrasporti te e fino a 5 creature consenzienti in un santuario precedentemente designato (stesso piano). |
| **Vera Vista** | 1 azione | Tocco | 1 ora | Conferisci visione del vero fino a 36 metri (vede invisibile, porte segrete, Piano Etereo). |

#### Grado 7
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Forma Eterea** | 1 azione | Personale | 8 ore | Diventi intangibile e ti sposti nel Piano Etereo. |
| **Resurrezione** | 1 ora | Tocco | Istantanea | Riporti in vita una creatura morta da non più di un secolo. |
| **Rigenerazione** | 1 minuto | Tocco | 1 ora | Il bersaglio recupera **4d8+15 PF**. Per l'ora successiva, recupera 1 PF ogni round e gli arti mozzati ricrescono. |

#### Grado 8
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Aura Sacra** | 1 azione | Personale | Concentrazione, fino a 1 minuto | Emetti luce in un raggio di 9 metri. Gli alleati hanno vantaggio a tutti i TS e i nemici hanno svantaggio agli attacchi contro di loro. I non morti/demoni vengono accecati se ti colpiscono. |
| **Vuoto Mentale** | 1 azione | Tocco | 24 ore | Il bersaglio è immune ai danni psichici, alla lettura del pensiero, alle divinazioni e allo charme. |

#### Grado 9
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Guarigione di Massa Suprema** | 1 azione | 18 metri | Istantanea | Curi **700 PF** distribuiti tra le creature che scegli entro gittata. |
| **Previsione** | 1 minuto | Tocco | 8 ore | Il bersaglio vede nel futuro immediato. Ha vantaggio a tiri per colpire, prove abilità e TS. I nemici hanno svantaggio agli attacchi contro di lui. |
| **Resurrezione Verace** | 1 ora | Tocco | Istantanea | Riporti in vita una creatura morta da non più di 200 anni, con tutti i PF e senza penalità. Non serve il corpo, ne crea uno nuovo. |

#### Esper Specializzazioni Mistico

##### Connessione del Guaritore
_Poteri esclusivi per i mistici della Connessione del Guaritore._

| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Trasfusione Vitale** (Grado 3) | 1 azione | 9 metri | Istantanea | Subisci **4d8 danni necrotici** che non possono essere ridotti. Un alleato recupera il doppio dei PF persi da te. |
| **Aura di Vita** (Grado 4) | 1 azione | Personale (9m) | Concentrazione, fino a 10 minuti | Gli alleati nell'aura hanno resistenza ai danni necrotici e i loro PF massimi non possono essere ridotti. Se un alleato a 0 PF inizia il turno nell'aura, recupera 1 PF. |
| **Santuario di Massa** (Grado 6) | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Tutti gli alleati in un raggio di 9 metri ottengono i benefici dell'incantesimo *Santuario* e rigenerano 5 PF all'inizio del loro turno. |

##### Connessione Empatica
_Poteri esclusivi per i mistici della Connessione Empatica._

| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Legame di Dolore** (Grado 2) | 1 reazione | 18 metri | Istantanea | Quando un alleato subisce danni, puoi dividere quei danni equamente tra te e l'attaccante (danno psichico per l'attaccante). |
| **Rete Empatica** (Grado 4) | 1 azione | 9 metri | 1 ora | Colleghi le menti di 4 creature consenzienti. Se una di esse deve fare un TS su Intelligenza, Saggezza o Carisma, può usare il modificatore più alto tra tutti i membri del gruppo collegato. |
| **Feedback Psichico** (Grado 5) | 1 reazione | 18 metri | Istantanea | Quando un nemico infligge danni a un tuo alleato legato, il nemico subisce immediatamente danni psichici pari alla metà del danno inflitto e deve superare un TS Saggezza o essere Stordito fino alla fine del suo prossimo turno. |
## Solariano
| Caratteristica               | Descrizione                                                                                 |
| :--------------------------- | :------------------------------------------------------------------------------------------ |
| **Dadi Vita**                | 1d10 per livello da cavaliere solare                                                        |
| **PF al 1° Livello**         | 10 + il tuo modificatore di Costituzione                                                    |
| **PF ai Livelli Successivi** | 1d10 (o 6) + il tuo modificatore di Costituzione per livello dopo il 1°                     |
| Competenze                   |                                                                                             |
| **Armature**                 | Leggere, Medie, Scudi                                                                       |
| **Armi**                     | Armi semplici, Armi marziali                                                                |
| **Strumenti**                | Nessuno                                                                                     |
| **Tiri Salvezza**            | Costituzione, Carisma                                                                       |
| **Abilità**                  | Due a scelta tra: Astrofisica, Atletica, Intimidire, Intuizione, Percezione e Sopravvivenza |
### Tabella Solariano

| Livello | Bonus Comp. | Rivelazioni Conosciute | Grado max | Privilegi                                                       |
| :-----: | :---------: | :--------------------: | --------- | :-------------------------------------------------------------- |
|   1°    |     +2      |           -            | 0         | Manifestazione Solare, Sintonizzazione Stellare                 |
|   2°    |     +2      |           2            | 1         | Rivelazioni Stellari                                            |
|   3°    |     +2      |           2            | 1         | Ordine Siderale                                                 |
|   4°    |     +2      |           2            | 2         | Aumento Punteggi Caratteristica                                 |
|   5°    |     +3      |           3            | 2         | Attacco Extra                                                   |
|   6°    |     +3      |           3            | 3         | Rivelazione Stellare, Privilegio Ordine                         |
|   7°    |     +3      |           4            | 3         | Equilibrio Cosmico                                              |
|   8°    |     +3      |           4            | 4         | Aumento Punteggi Caratteristica                                 |
|   9°    |     +4      |           5            | 4         | Manifestazione Solare, Sintonizzazione Stellare (aumento di 1d) |
|   10°   |     +4      |           5            | 5         | Privilegio Ordine                                               |
|   11°   |     +4      |           6            | 6         |                                                                 |
|   12°   |     +4      |           6            | 6         | Aumento Punteggi Caratteristica                                 |
|   13°   |     +5      |           7            | 7         | Manifestazione Solare, Sintonizzazione Stellare (aumento di 2d) |
|   14°   |     +5      |           7            | 7         |                                                                 |
|   15°   |     +5      |           8            | 7         |                                                                 |
|   16°   |     +5      |           8            | 8         | Aumento Punteggi Caratteristica                                 |
|   17°   |     +6      |           8            | 8         | Manifestazione Solare, Sintonizzazione Stellare (aumento di 3d) |
|   18°   |     +6      |           9            | 8         |                                                                 |
|   19°   |     +6      |           9            | 9         | Aumento Punteggi Caratteristica                                 |
|   20°   |     +6      |           10           | 9         | Poteri Zenit                                                    |
### Caratteristiche di Classe

| Livello | Privilegio                   | Descrizione                                                                                                                                                                                                                                                            |
| :------ | :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1°**  | **Manifestazione Solare**    | Scegli una forma fisica per la tua energia:<br>• **Arma Solare:** Azione bonus per creare arma marziale (1d8/1d10, radiante o forza). Magica dal 6° liv.<br>• **Armatura Solare:** Azione bonus per alone protettivo. CA = 13 + Des. Resistenza freddo/fuoco. Luce 3m. |
| **1°**  | **Sintonizzazione Stellare** | Attivi un modo (durata 1 min):<br>• **Modo Fotone:** +1d4 danni fuoco in mischia (aumenta a 1d6 al 5°, 1d8 al 10°, 1d10 al 15°).<br>• **Modo Gravitone:** +1 CA e terreno difficile entro 1,5m per i nemici.                                                           |
| **2°**  | **Rivelazioni Stellari**     | Impari a usare poteri cosmici (vedi Lista Rivelazioni).<br>**CD Tiro Salvezza:** 8 + Bonus Comp. + Mod. Carisma.                                                                                                                                                       |
| **3°**  | **Ordine Siderale**          | Scegli un Ordine filosofico: **Ordine dell'Eclissi** o **Ordine della Corona**.                                                                                                                                                                                        |
| **4°**  | **Aumento Caratteristica**   | Aumenti una caratteristica di 2 o due di 1 (o scegli un Talento).                                                                                                                                                                                                      |
| **5°**  | **Attacco Extra**            | Puoi attaccare due volte invece di una quando usi l'azione Attacco.                                                                                                                                                                                                    |
| **7°**  | **Equilibrio Cosmico**       | Quando cambi Sintonizzazione (Fotone ↔ Gravitone) in combattimento, recuperi **PF = Mod. Carisma + Livello**. Usi: Bonus Competenza per riposo lungo.                                                                                                                  |
| **8°**  | **Aumento Caratteristica**   | Aumenti una caratteristica di 2 o due di 1 (o scegli un Talento).                                                                                                                                                                                                      |
| **12°** | **Aumento Caratteristica**   | Aumenti una caratteristica di 2 o due di 1 (o scegli un Talento).                                                                                                                                                                                                      |
| **16°** | **Aumento Caratteristica**   | Aumenti una caratteristica di 2 o due di 1 (o scegli un Talento).                                                                                                                                                                                                      |
| **19°** | **Aumento Caratteristica**   | Aumenti una caratteristica di 2 o due di 1 (o scegli un Talento).                                                                                                                                                                                                      |
| **20°** | **Poteri Zenit**             | Se mantieni la stessa sintonizzazione per **3 round**, puoi usare una **Rivelazione Zenit** (Grado 9) come azione bonus. Dopo l'uso, la sintonizzazione termina.                                                                                                       |

### Specializzazione Solariano 

#### Ordine della Corona
_Focalizzato sulla luce, sul calore e sul danno distruttivo._

| Livello | Privilegio | Descrizione |
| :--- | :--- | :--- |
| **3°** | **Arma Radiante** | • **Se hai Arma Solare:** Infligge danni da fuoco extra pari al tuo **Mod. Carisma**.<br>• **Se hai Armatura Solare:** Chi ti colpisce in mischia subisce danni da fuoco pari al tuo **Mod. Carisma**. |
| **6°** | **Anima del Sole** | Ottieni resistenza ai danni **Radianti** e da **Fuoco**. I tuoi attacchi ignorano la resistenza ai danni da fuoco dei nemici. |

#### Ordine dell'Eclissi
_Focalizzato sulla gravità, sul controllo del campo e sulla difesa._

| Livello | Privilegio           | Descrizione                                                                                                                                                                         |
| :------ | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **3°**  | **Peso del Mondo**   | Mentre sei in **Modo Gravitone**: Se colpisci una creatura con l'Arma Solare (o in mischia se hai l'Armatura), la sua velocità è ridotta di **3 metri** fino al suo prossimo turno. |
| **6°**  | **Guscio di Eventi** | Ottieni resistenza ai danni da **Forza** e **Necrotici**. Hai vantaggio ai TS per evitare di essere spostato o gettato prono.                                                       |

### Poteri Esper Solariano

| **Caratteristica di Lancio:** | Carisma                               |
| ----------------------------- | ------------------------------------- |
| **Tipo di Potere              | Rivelazioni (Canalizzazione Stellare) |

#### Grado 0 (Rivelazioni Prime)
_Questi poteri possono essere usati a volontà._

| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Attrazione Minore** | 1 azione | 9 metri | Istantanea | Crei un micro-pozzo gravitazionale su un oggetto non indossato o trasportato entro la gittata. L'oggetto vola immediatamente nella tua mano libera. Se usato su una creatura, questa deve superare un TS su Forza o essere tirata di 1,5 metri verso di te. |
| **Colpo Stellare** | 1 azione | 1,5 metri (Mischia) | Istantanea | _(Parte dell'attacco)_ Effettua un attacco in mischia. Se colpisci, il bersaglio subisce gli effetti normali e un alone di gravità lo avvolge: se il bersaglio si muove volontariamente prima dell'inizio del tuo prossimo turno, subisce **1d8 danni da forza** e il potere termina.<br>_Il danno aumenta di 1d8 al 5° (2d8), 11° (3d8) e 17° livello (4d8)._ |
| **Fiamma Sacra (Stellare)** | 1 azione | 18 metri | Istantanea | Una radianza simile a una fiamma discende su una creatura che puoi vedere entro la gittata. Il bersaglio deve superare un TS su Destrezza o subire **1d8 danni radianti**. Il bersaglio non ottiene benefici dalla copertura per questo tiro salvezza.<br>_Il danno aumenta di 1d8 al 5° (2d8), 11° (3d8) e 17° livello (4d8)._ |
| **Luce Guida** | 1 azione | Tocco | 1 ora | Tocchi un oggetto. Fino alla fine dell'incantesimo, l'oggetto emette luce intensa in un raggio di 6 metri e luce fioca per altri 6 metri. La luce può essere colorata a tua scelta. Se copri l'oggetto, la luce viene bloccata. |
| **Resistenza** | 1 azione | Tocco | Concentrazione, fino a 1 minuto | Tocchi una creatura consenziente. Una volta prima che l'incantesimo termini, il bersaglio può tirare un d4 e aggiungere il numero ottenuto a un tiro salvezza a sua scelta. |
| **Stabilità Gravitazionale** | 1 azione | Personale | 1 minuto | Aumenti la tua densità personale. Hai vantaggio sulle prove di Forza e sui Tiri Salvezza per evitare di essere spostato, spinto o gettato a terra prono contro la tua volontà. |

#### Grado 1
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Armatura di Agathys (Vuoto)** | 1 azione | Personale | 1 ora | Una forza spettrale di vuoto e gelo ti circonda. Ottieni **5 Punti Ferita Temporanei**. Se una creatura ti colpisce con un attacco in mischia mentre hai questi punti ferita, subisce **5 danni da freddo**.<br>_A Gradi Superiori: +5 PF e +5 danni per ogni grado extra._ |
| **Assorbire Elementi** | 1 reazione | Personale | 1 round | _(Quando subisci danni elementali)_ Il tuo campo stellare cattura energia. Hai resistenza al tipo di danno scatenante fino al prossimo turno. Inoltre, il tuo primo attacco in mischia successivo infligge **1d6 danni extra** dello stesso tipo. |
| **Attrazione del Buco Nero** | 1 azione bonus | 9 metri | Istantanea | Generi un'improvvisa singolarità dietro un nemico. Scegli una creatura entro la gittata. Deve superare un TS su Forza o essere trascinata in linea retta fino a 4,5 metri verso di te. Se termina questo movimento entro 1,5 metri da te, puoi attaccarla in mischia come parte della stessa azione bonus. |
| **Dardo Guida** | 1 azione | 36 metri | 1 round | Un lampo di luce stellare si dirige verso una creatura. Attacco a distanza. Colpisce per **4d6 danni radianti** e il prossimo tiro per colpire contro il bersaglio ha vantaggio.<br>_A Gradi Superiori: +1d6 danni per ogni grado extra._ |
| **Duello Compulsivo** | 1 azione bonus | 9 metri | Concentrazione, fino a 1 minuto | Costringi una creatura a combattere te. TS Saggezza. Se fallisce, ha svantaggio agli attacchi contro altri e deve fare TS Saggezza per allontanarsi oltre 9 metri da te. |
| **Esplosione Supernova** | 1 azione | Personale (3m) | Istantanea | Rilasci un'ondata di energia fotonica. Ogni creatura entro 3 metri da te deve effettuare un TS su Destrezza. Subisce **2d6 danni radianti** (metà se salva).<br>_**Sintonizzazione Fotone:** Il raggio aumenta a 4,5 metri.<br>A Gradi Superiori: +1d6 danni per ogni grado extra._ |
| **Mani Brucianti (Solare)** | 1 azione | Personale (cono 4,5m) | Istantanea | Una sottile lastra di fiamme solari scaturisce dalle mani. Ogni creatura nel cono deve effettuare un TS su Destrezza. Subisce **3d6 danni da fuoco** (metà se salva). |
| **Punizione Divina (Solare)** | 1 azione bonus | Personale | Concentrazione, fino a 1 minuto | Il tuo prossimo attacco in mischia infligge **2d6 danni radianti** extra. Se il bersaglio è un non morto o un netherant, subisce invece **2d8 danni radianti** extra.<br>_A Gradi Superiori: +1d6 (o +1d8) danni per ogni grado extra._ |
| **Scudo della Fede (Gravità)** | 1 azione bonus | 18 metri | Concentrazione, fino a 10 minuti | Un campo di gravità distorce lo spazio attorno a una creatura a tua scelta entro gittata. Il bersaglio ottiene un bonus di **+2 alla CA** per la durata. |

#### Grado 2
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Arma Magica (Stellare)** | 1 azione bonus | Tocco | Concentrazione, fino a 1 ora | Tocchi un'arma non magica. Fino alla fine dell'incantesimo, quell'arma diventa un'arma magica con un bonus di +1 ai tiri per colpire e ai danni. |
| **Bagliore Accecante** | 1 reazione | 18 metri | Istantanea | _(Quando vieni attaccato)_ Interponi un flash di luce. L'attaccante deve superare un TS su Costituzione o essere **Accecato** fino alla fine del suo turno, imponendo svantaggio all'attacco. |
| **Blocca Persone (Presa)** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | La gravità aumenta attorno a un umanoide. TS Saggezza o viene **Paralizzato**. TS ripetibile ogni turno.<br>_A Gradi Superiori: +1 bersaglio per ogni grado extra._ |
| **Oscurità** | 1 azione | 18 metri | Concentrazione, fino a 10 minuti | Oscurità magica riempie una sfera di 4,5 metri. Blocca scurovisione e luce non magica.<br>_**Sintonizzazione Gravitone:** L'area è terreno difficile._ |
| **Passo Brumoso (Salto)** | 1 azione bonus | Personale | Istantanea | Ti teletrasporti fino a 9 metri in uno spazio libero che puoi vedere. |
| **Punizione Marchiante** | 1 azione bonus | Personale | Concentrazione, fino a 1 minuto | Il tuo prossimo attacco infligge **2d6 danni radianti** extra. Se il bersaglio è invisibile, diventa visibile ed emette luce fioca. Non può diventare invisibile. |
| **Raggio Rovente** | 1 azione | 36 metri | Istantanea | Crei tre raggi di fuoco. Attacco a distanza per ognuno. **2d6 danni da fuoco** per colpo.<br>_A Gradi Superiori: +1 raggio per ogni grado extra._ |
| **Scatto Stellare** | 1 azione bonus | Personale | 1 round | Ottieni una velocità di volo di 9 metri fino alla fine del turno. Se non atterri, cadi. Non provoca attacchi di opportunità. |

#### Grado 3
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Campo di Densità** | 1 reazione | Personale | Istantanea | _(Quando subisci danni)_ Aumenti la tua densità. Riduci i danni subiti di un ammontare pari al tuo **Livello da Solariano + Modificatore di Carisma**. |
| **Lama del Sole** | 1 azione | 1,5 metri | Istantanea | Attacco in mischia. Se colpisci, aggiungi **3d8 danni da fuoco** e il bersaglio prende fuoco (1d6 danni/turno finché non spento). |
| **Lentezza (Pozzo Grav.)** | 1 azione | 36 metri | Concentrazione, fino a 1 minuto | Alterazione temporale in un cubo di 12m. Fino a 6 creature fanno TS Saggezza. Fallimento: velocità dimezzata, -2 CA/TS Des, no reazioni, solo 1 azione/turno. |
| **Luce Diurna** | 1 azione | 18 metri | 1 ora | Sfera di luce solare di 18m raggio. Dissolve oscurità magica di grado 3 o inferiore. |
| **Muro di Vento (Gravità)** | 1 azione | 36 metri | Concentrazione, fino a 1 minuto | Muro di gravità compressa (15m lungh, 4,5m alt). Blocca nebbie, gas, creature volanti e proiettili piccoli. |
| **Palla di Fuoco (Solare)** | 1 azione | 45 metri | Istantanea | Esplosione in sfera di 6m. TS Destrezza: **8d6 danni da fuoco** (metà se salva). |
| **Punizione Accecante** | 1 azione bonus | Personale | Concentrazione, fino a 1 minuto | Il prossimo attacco infligge **3d8 danni radianti** extra. TS Costituzione o bersaglio **Accecato**. |
| **Volare** | 1 azione | Tocco | Concentrazione, fino a 10 minuti | Manipoli la gravità attorno a una creatura. Il bersaglio ottiene una velocità di volo di 18 metri per la durata. |

#### Grado 4
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Esilio** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Invii una creatura in un altro piano o nel vuoto. TS Carisma. Se nativa, va in una semi-dimensione temporanea. Se extra-planare, torna a casa. |
| **Gravità Nera** | 1 azione | 27 metri | Concentrazione, fino a 1 minuto | Area di 6m a terra (terreno difficile). TS Destrezza o **3d6 danni contundenti** e **Trattenuto**. 3d6 danni ogni turno. |
| **Muro di Fuoco (Solare)** | 1 azione | 36 metri | Concentrazione, fino a 1 minuto | Muro di fuoco opaco. Chi attraversa o sta vicino subisce **5d8 danni da fuoco** (TS Destrezza). |
| **Punizione Vacillante** | 1 azione bonus | Personale | Concentrazione, fino a 1 minuto | Il prossimo attacco infligge **4d6 danni psichici** extra. TS Saggezza o svantaggio a colpire/prove e niente reazioni. |
| **Schiacciamento Gravitazionale** | 1 azione | 18 metri | Istantanea | Cilindro di gravità (6m raggio). TS Forza. Fallimento: **4d8 danni da forza** e **Prono**. Successo: metà danni. Terreno difficile. |
| **Scudo di Fuoco (Stellare)** | 1 azione | Personale | 10 minuti | Aura di fiamme (calde o fredde). Emetti luce. Chi ti colpisce in mischia subisce **2d8 danni** (fuoco o freddo). |

#### Grado 5
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Cerchio di Potere** | 1 azione | Personale (9m) | Concentrazione, fino a 10 minuti | Aura divina. Vantaggio ai TS contro magia per te e alleati. Se un TS dimezza i danni, invece li annulla completamente. |
| **Colpo Infuocato** | 1 azione | 18 metri | Istantanea | Colonna di fuoco (3m raggio). TS Destrezza: **4d6 danni da fuoco + 4d6 danni radianti** (metà se salva). |
| **Esplosione Coronale** | 1 azione | 45 metri | Istantanea | Sfera di fuoco di 6m. TS Destrezza: **8d6 danni da fuoco**.<br>_**Sintonizzazione Fotone:** Raggio 9m e ignora resistenza al fuoco._ |
| **Muro di Forza** | 1 azione | 36 metri | Concentrazione, fino a 10 minuti | Muro invisibile e indistruttibile. Blocca passaggio fisico e magico. |
| **Punizione Bandente** | 1 azione bonus | Personale | Concentrazione, fino a 1 minuto | Il prossimo attacco infligge **5d10 danni da forza** extra. Se il bersaglio scende a 50 PF o meno, viene bandito (come _Esilio_). |
| **Telecinesi** | 1 azione | 18 metri | Concentrazione, fino a 10 minuti | Usi la gravità per manipolare oggetti (450kg) o trattenere creature (Prova contrapposta). |

#### Grado 6
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Raggio Solare** | 1 azione | Personale (Linea 18m) | Concentrazione, fino a 1 minuto | Linea di luce. TS Costituzione: **6d8 danni radianti** e **Accecato**. Puoi ripetere ogni turno. |
| **Singolarità Solare** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Buco nero (9m raggio). Oscurità e terreno difficile. TS Forza all'inizio del turno o **10d6 danni da forza** e trascinamento al centro. |

#### Grado 7
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Forma di Luce Pura** | 1 azione bonus | Personale | 1 minuto | Diventi energia fotonica. Resistenza danni non magici, volo 18m, attraversi oggetti. Chi ti tocca subisce **2d8 radianti**. |
| **Tempesta di Fuoco** | 1 azione | 45 metri | Istantanea | Dieci cubi di fuoco da 3m. TS Destrezza: **7d10 danni da fuoco**. |

#### Grado 8
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Esplosione Solare** | 1 azione | 45 metri | Istantanea | Luce brillante (18m raggio). TS Costituzione: **12d6 danni radianti** e **Accecato** per 1 minuto. |
| **Orizzonte degli Eventi** | 1 azione | Personale (18m) | Concentrazione, fino a 10 minuti | Aura gravitazionale. Nessuno può entrare/uscire o teletrasportarsi senza TS Carisma. Nemici hanno velocità dimezzata. |

#### Grado 9
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Sciame di Meteore** | 1 azione | 1,5 km | Istantanea | Quattro sfere (12m raggio). TS Destrezza: **20d6 fuoco + 20d6 contundenti**. |
| **Supernova Totale** | 1 azione | Personale (30m) | Istantanea | _(Richiede 3 turni di carica Fotone)_ Esplosione cataclismica. TS Destrezza: **20d6 fuoco + 20d6 radianti**. Subisci indebolimento dopo l'uso. |
## Paradosso 
| Caratteristica               | Descrizione                                                                             |
| :--------------------------- | :-------------------------------------------------------------------------------------- |
| **Dadi Vita**                | 1d6 per livello da paradosso                                                            |
| **PF al 1° Livello**         | 6 + il tuo modificatore di Costituzione                                                 |
| **PF ai Livelli Successivi** | 1d6 (o 4) + il tuo modificatore di Costituzione per livello dopo il 1°                  |
| Competenze                   |                                                                                         |
| **Armature**                 | Leggere                                                                                 |
| **Armi**                     | Armi semplici                                                                           |
| **Strumenti**                | Nessuno                                                                                 |
| **Tiri Salvezza**            | Intelligenza, Carisma                                                                   |
| **Abilità**                  | Due a scelta tra: Astrofisica, Inganno, Intuizione, Investigazione, Percezione e Storia |
### Tabella Pradosso

| Livello | Bonus Comp. | Talenti Prime | Punti Talento | Grado Max Talento | Privilegi                                              |
| :-----: | :---------: | :-----------: | :-----------: | :---------------: | :----------------------------------------------------- |
|   1°    |     +2      |       3       |       4       |         1         | Canalizzazione, Ancora di Realtà, Visione Multiversale |
|   2°    |     +2      |       3       |       6       |         1         | Campo di Distorsione, Spostamento Paradigmatico        |
|   3°    |     +2      |       3       |      14       |         2         | Manipolazione delle Probabilità                        |
|   4°    |     +2      |       4       |      17       |         2         | Aumento Punteggi Caratteristica                        |
|   5°    |     +3      |       4       |      27       |         3         | Sovrapposizione Temporale                              |
|   6°    |     +3      |       4       |      32       |         3         | Privilegio Specializzazioni                            |
|   7°    |     +3      |       4       |      38       |         4         | Ancoraggio Saldo                                       |
|   8°    |     +3      |       4       |      44       |         4         | Aumento Punteggi Caratteristica                        |
|   9°    |     +4      |       4       |      57       |         5         | —                                                      |
|   10°   |     +4      |       5       |      64       |         5         | Privilegio Specializzazione                            |
|   11°   |     +4      |       5       |      73       |         6         | Riscrittura immediata                                  |
|   12°   |     +4      |       5       |      78       |         6         | Aumento Punteggi Caratteristica                        |
|   13°   |     +5      |       5       |      83       |         7         |                                                        |
|   14°   |     +5      |       5       |      88       |         7         | Aumento Punteggi Caratteristica                        |
|   15°   |     +5      |       5       |      94       |         8         | Esistenza non lineare                                  |
|   16°   |     +5      |       5       |      100      |         8         | Aumento Punteggi Caratteristica                        |
|   17°   |     +6      |       5       |      107      |         9         |                                                        |
|   18°   |     +6      |       5       |      114      |         9         | Aumento Punteggi Caratteristica                        |
|   19°   |     +6      |       5       |      123      |         9         | Aumento Punteggi Caratteristica                        |
|   20°   |     +6      |       5       |      133      |         9         | Entità quantica                                        |
### Caratteristiche di Classe

#### Canalizzazione (*Channeling*)
| Caratteristica            | Dettaglio                                                                                                    |
| :------------------------ | :----------------------------------------------------------------------------------------------------------- |
| **Caratteristica Chiave** | **Carisma**                                                                                                  |
| **CD Tiro Salvezza**      | 8 + Bonus di Competenza + Modificatore di Carisma                                                            |
| **Modificatore Attacco**  | Bonus di Competenza + Modificatore di Carisma                                                                |
| **Risorsa**               | **Punti Talento** (Recupero: Riposo Lungo)                                                                   |
| **Talenti Conosciuti**    | **Livello 1:** 3 Prime + 5 Talenti (Grado 1).<br>**Avanzamento:** +2 Talenti ogni volta che sali di livello. |
| **Domini Consigliati**    | Metafase, Cinesi, Psicogenico.                                                                               |

| Livello | Privilegio                    | Descrizione                                                                                                                                                                                                                                                    |
| :------ | :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1°**  | **Ancora di Realtà**          | Scegli un oggetto/concetto come focus. Hai vantaggio ai TS contro l'essere bandito, spostato di piano o alterazione della memoria finché lo possiedi.                                                                                                          |
| **1°**  | **Visione Multiversale**      | **Azione:** Ottieni **Vantaggio** a una prova di abilità o tiro per colpire. Usi: Mod. Carisma per riposo lungo.                                                                                                                                               |
| **2°**  | **Campo di Distorsione**      | **Azione Bonus:** Aura di 4,5m (15ft). Terreno difficile per i nemici. Conferisce benefici basati sul Paradigma. Durata: 1 min. Usi: 2 per riposo.                                                                                                             |
| **2°**  | **Spostamento Paradigmatico** | Scegli una specializzazione: **Paradigma della Catastrofe** o **Paradigma dell'Utopia**.                                                                                                                                                                       |
| **3°**  | **Manipolazione Probabilità** | **Reazione:** Spendi 2 Punti Talento quando una creatura entro 18m effettua un tiro. Tira **1d4** e applicalo come bonus o penalità (prima di sapere il risultato).                                                                                            |
| **5°**  | **Sovrapposizione Temporale** | Quando attivi *Campo di Distorsione*, diventi parzialmente intangibile. I tiri per colpire contro di te hanno **Svantaggio** fino al tuo prossimo turno.                                                                                                       |
| **11°** | **Riscrittura Immediata**     | **Azione Bonus:** Se fallisci un tiro per colpire o prova abilità nel tuo turno, puoi ritirare il dado (devi usare il nuovo risultato). Usi: Mod. Carisma per riposo.                                                                                          |
| **15°** | **Esistenza Non Lineare**     | • **Immunità Temporale:** Non puoi essere invecchiato o rallentato nel tempo.<br>• **Elusione del Fato (Reazione):** Se vai a 0 PF, spendi 5 Punti Talento per svanire e riapparire al turno successivo con **4d10 + Livello** PF. (1 volta per riposo lungo). |
| **20°** | **Entità Quantica**           | • Resistenza danni **Forza** e **Psichici**.<br>• Non puoi essere sorpreso e hai Vantaggio all'Iniziativa.<br>• **Collasso:** Una volta per turno, se tiri 9 o meno su un d20, puoi trattarlo come **10**.                                                     |
### Specializzazione Paradosso

#### Paradigma della Catastrofe
_Incarna l'entropia e il disastro inevitabile._

| Livello | Privilegio                 | Descrizione                                                                                                                                                                                                                                 |
| :------ | :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **2°**  | **Terreno Ostile**         | Quando il *Campo di Distorsione* è attivo, i nemici che iniziano il turno o entrano nell'aura subiscono **danni psichici pari al tuo Bonus di Competenza**.                                                                                 |
| **6°**  | **Frattura della Realtà**  | **Azione (3 Punti Talento):** Apri una frattura entro 18m. Creature entro 3m fanno TS Destrezza: **4d6 danni forza** e **Prone** (o metà danni).                                                                                            |
| **10°** | **Erosione della Volontà** | Mentre il tuo *Campo di Distorsione* è attivo, l'entropia logora la mente dei nemici. Le creature ostili all'interno dell'aura hanno **Svantaggio ai Tiri Salvezza su Intelligenza, Saggezza e Carisma** contro i tuoi poteri da Paradosso. |

#### Paradigma dell'Utopia
_Incarna la perfezione, la sicurezza e la realtà ideale._

| Livello | Privilegio                   | Descrizione                                                                                                                                                                                                                                                                                                |
| :------ | :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **2°**  | **Rifugio Sicuro**           | Quando il *Campo di Distorsione* è attivo, tu e gli alleati nell'aura avete **Resistenza** a un tipo di danno scelto all'attivazione (acido, freddo, fuoco, fulmine, tuono).                                                                                                                               |
| **6°**  | **Negazione del Fallimento** | **Reazione (3 Punti Talento):** Quando un alleato entro 9m fallisce un TS, puoi fargli ritirare il dado (deve usare il nuovo risultato).                                                                                                                                                                   |
| **10°** | **Egida del Destino**        | Mentre il tuo *Campo di Distorsione* è attivo, la realtà lavora per proteggervi. Tu e gli alleati all'interno dell'aura siete immuni alle condizioni **Spaventato** e **Affascinato**. Inoltre, all'inizio di ogni tuo turno, gli alleati nell'aura guadagnano **PF Temporanei pari al tuo Mod. Carisma**. |

### Esper Paradosso

| Caratteristica di Attivazione: | Carisma                                                          |
| ------------------------------ | ---------------------------------------------------------------- |
| Tipo di Potere                 | Talenti (Manipolazione della Realtà, Cronomanzia e Entropia)<br> |

#### Grado 0 (Talenti Prime)
_Alterazioni minori della causalità, utilizzabili a volontà._

| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Déjà Vu** | 1 azione | 18 metri | 1 round | Costringi una creatura a rivivere mentalmente l'ultimo secondo. Il bersaglio deve superare un TS su Intelligenza o avere svantaggio al primo tiro per colpire che effettua prima dell'inizio del tuo prossimo turno, disorientato dalla ripetizione. |
| **Glitch** | 1 azione | 18 metri | Istantanea | Provochi un micro-errore nella realtà attorno a un bersaglio. Una creatura deve superare un TS su Intelligenza o subire **1d8 danni psichici** mentre vede versioni distorte di se stessa. Se fallisce, non può effettuare reazioni fino all'inizio del tuo prossimo turno.<br>_Il danno aumenta di 1d8 ai livelli 5, 11 e 17._ |
| **Guida Probabilistica** | 1 azione | Tocco | Concentrazione, fino a 1 minuto | Tocchi una creatura consenziente e le mostri un breve flash di un futuro possibile in cui ha successo. Il bersaglio può aggiungere 1d4 a una prova di caratteristica a sua scelta prima che la durata termini. |
| **Mano Spettrale (Glitch)** | 1 azione | 9 metri | 1 minuto | Evochi una mano fatta di "rumore bianco" visivo e statico. Può manipolare oggetti (fino a 5 kg), aprire porte o fluttuare. Se la mano viene distrutta, l'oggetto torna istantaneamente alla sua posizione originale. |
| **Manutenzione Temporale** | 1 minuto | Tocco | Istantanea | Ripari un oggetto rotto o danneggiato "ricordando" una versione temporale in cui era intatto. Funziona su rotture non più grandi di 30 cm. Puoi anche ripristinare cibo avariato o pulire vestiti istantaneamente. |
| **Passo Falso** | 1 azione | 9 metri | Istantanea | Sposti di pochi millisecondi la percezione del terreno di una creatura. Deve superare un TS su Destrezza o cadere Prona, inciampando su un ostacolo che in questa linea temporale non esiste. |
| **Sesto Senso Temporale** | 1 azione | Personale | Concentrazione, fino a 1 minuto | Percepisci fluttuazioni nel tempo. Sai se un oggetto è stato spostato negli ultimi 10 minuti o se una creatura ha usato poteri di teletrasporto nell'area recentemente. |

#### Grado 1
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Armatura di Inerzia** | 1 azione | Personale | 8 ore | Uno strato di forza distorta ti avvolge, rallentando i colpi in arrivo. La tua CA diventa **13 + Modificatore Carisma**. L'armatura appare come una leggera sfocatura attorno al tuo corpo. |
| **Dissonanza Cognitiva** | 1 azione | 18 metri | Istantanea | Sussurri una verità paradossale nella mente di una creatura. Il bersaglio deve effettuare un TS su Saggezza. Se fallisce, subisce **3d6 danni psichici** e deve usare la sua reazione immediatamente per fuggire il più lontano possibile da te. |
| **Fortuna del Principiante** | 1 azione bonus | Personale | Concentrazione, fino a 1 minuto | Attingi alla fortuna di una timeline in cui sei un guerriero esperto. I tuoi attacchi con armi infliggono **1d4 danni radianti extra**. |
| **Proiettili Fantasma** | 1 azione | 36 metri | Istantanea | Materializzi tre dardi di energia instabile che colpiscono infallibilmente. Ogni dardo infligge **1d4+1 danni da forza**. |
| **Promemoria dal Futuro** | 1 minuto | Tocco | Istantanea | Tocchi un oggetto e ricevi "ricordi" di come usarlo da una tua versione futura. Apprendi le sue proprietà, funzioni, cariche residue e come attivarlo (equivalente a Identificare). |
| **Salto Cronale** | 1 azione bonus | Personale | Istantanea | Ti cancelli dal presente per riapparire istantaneamente altrove. Ti teletrasporti fino a 9 metri in uno spazio libero che puoi vedere. |
| **Scudo Entropico** | 1 reazione | Personale | 1 round | _(Quando vieni colpito)_ Fai vibrare la tua esistenza tra due realtà. Fino all'inizio del tuo prossimo turno, hai un bonus di **+5 alla CA**, incluso contro l'attacco scatenante. |

#### Grado 2
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Blocca Persone (Stasi)** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Congeli un umanoide nel tempo. Il bersaglio è **Paralizzato**. È cosciente ma immobile, come un video in pausa. Può ripetere il TS Saggezza alla fine di ogni suo turno. |
| **Frantumare (Shatter)** | 1 azione | 18 metri | Istantanea | Crei un punto di frequenza distruttiva che fa vibrare la materia fino a romperla. Ogni creatura in una sfera di 3 metri deve superare un TS Costituzione o subire **3d8 danni da tuono**. I costrutti hanno svantaggio al TS. |
| **Immagine Residua** | 1 azione | Personale | Concentrazione, fino a 1 minuto | Il tuo corpo lascia scie visive ritardate. Qualsiasi creatura ha svantaggio ai tiri per colpire contro di te, poiché colpisce dove eri una frazione di secondo fa. |
| **Riavvolgere Ferita** | 1 azione bonus | 18 metri | Istantanea | Inverti il tempo localizzato su una ferita recente. Una creatura recupera **1d8 + Modificatore Carisma PF**. Funziona anche come riparazione su costrutti e oggetti. |
| **Scambio Quantico** | 1 azione bonus | 9 metri | Istantanea | Scegli una creatura consenziente (o un oggetto non fissato) entro gittata. Scambiate istantaneamente le posizioni. |
| **Vedere l'Invisibile** | 1 azione | Personale | 1 ora | I tuoi occhi percepiscono sfasamenti dimensionali. Vedi creature invisibili ed eteree come se fossero circondate da scariche statiche. |

#### Grado 3
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Accelerazione (Haste)** | 1 azione | 9 metri | Concentrazione, fino a 1 minuto | Acceleri il flusso temporale di una creatura. Velocità raddoppiata, +2 CA, vantaggio TS Des, azione aggiuntiva limitata. Letargia alla fine. |
| **Contro-Realtà** | 1 reazione | 18 metri | Istantanea | Interrompi un potere o incantesimo mentre viene lanciato, dichiarando che "in questa timeline non è successo". Automatico per grado 3 o inferiore. |
| **Decelerazione (Slow)** | 1 azione | 36 metri | Concentrazione, fino a 1 minuto | Rallenti il tempo per un massimo di 6 creature in un cubo di 12 metri. TS Saggezza. Fallimento: velocità dimezzata, -2 CA e TS Destrezza, no reazioni, solo un'azione o bonus. |
| **Intermittenza (Blink)** | 1 azione | Personale | 1 minuto | Alla fine di ogni tuo turno, tira 1d20. Se fai 11+, svanisci in una timeline adiacente (non puoi essere colpito). Riappari all'inizio del tuo prossimo turno. |
| **Passo Dimensionale** | 1 azione | 27 metri | Istantanea | Ti teletrasporti in un punto visibile. Nel punto che lasci, lo spazio collassa con un boato: le creature entro 3 metri subiscono **3d10 danni da tuono** (TS Costituzione dimezza). |
| **Riavvolgimento Tattico** | 1 reazione | 9 metri | Istantanea | _(Quando un alleato viene colpito)_ Riavvolgi il tempo di un secondo. L'alleato si teletrasporta di 1,5 metri e il danno dell'attacco è dimezzato. |

#### Grado 4
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Confusione Temporale** | 1 azione | 27 metri | Concentrazione, fino a 1 minuto | Sovrapponi multiple realtà contraddittorie nella mente delle creature in una sfera di 3 metri. TS Saggezza o agiscono casualmente (Confusione). |
| **Esilio** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Spingi una creatura fuori dalla realtà corrente. Se nativa, finisce in una tasca temporale. Se extra-planare, ritorna al suo piano d'origine. |
| **Porta Dimensionale** | 1 azione | 150 metri | Istantanea | Ti teletrasporti (con un passeggero) in un punto preciso entro gittata. Non hai bisogno di vederlo, basta visualizzarlo o descriverlo con coordinate. |
| **Sfera di Stasi** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Racchiudi una creatura o oggetto in una sfera di forza scintillante dove il tempo è quasi fermo. Niente passa attraverso. |
| **Tasca Fuori dal Tempo** | 1 azione | Tocco | 1 ora | Nascondi un oggetto o una creatura consenziente in una piega temporale. Diventa invisibile e intangibile. |

#### Grado 5
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Ancora Planare** | 1 azione | 18 metri | 1 ora | Blocchi una creatura in questa specifica realtà. TS Carisma. Se fallisce, non può usare teletrasporto, viaggi planari o diventare etereo. |
| **Cerchio di Teletrasporto** | 1 minuto | 3 metri | 1 round | Crei un portale stabile verso un altro cerchio di teletrasporto permanente conosciuto. |
| **Dominare Persone** | 1 azione | 18 metri | Concentrazione, fino a 1 minuto | Assumi il controllo delle azioni di un umanoide, come se fossi tu il "giocatore" della sua realtà. |
| **Modificare Memoria** | 1 azione | 9 metri | Concentrazione, fino a 1 minuto | Riscrivi fino a 10 minuti di memoria di una creatura, alterando la sua percezione del passato. |
| **Muro di Forza** | 1 azione | 36 metri | Concentrazione, fino a 10 minuti | Crei un pannello o una cupola di forza invisibile ("un muro di pixel solidi") che nulla può attraversare fisicamente. |

#### Grado 6
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Contingenza** | 10 minuti | Personale | 10 giorni | Programmi un potere di grado 5 o inferiore che si attiverà automaticamente su di te quando si verifica una condizione specifica futura. |
| **Disintegrare** | 1 azione | 18 metri | Istantanea | Acceleri l'entropia di un bersaglio di milioni di anni. TS Destrezza. Fallimento: **10d6 + 40 danni da forza**. Se ridotto a 0 PF, diventa polvere. |
| **Globo di Invulnerabilità** | 1 azione | Personale (3m) | Concentrazione, fino a 1 minuto | Una barriera sferica respinge le alterazioni esterne. Blocca qualsiasi potere esper di Grado 5 o inferiore lanciato dall'esterno. |
| **Sguardo del Futuro** | 1 azione | 9 metri | Concentrazione, fino a 1 minuto | Fissi una creatura. Ogni volta che cerca di attaccarti, deve superare un TS Saggezza o perdere l'attacco, poiché tu hai già visto il colpo. |

#### Grado 7
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Inversione di Gravità** | 1 azione | 30 metri | Concentrazione, fino a 1 minuto | Inverti la gravità in un cilindro di 15 metri. Creature e oggetti cadono verso l'alto. |
| **Paradosso Temporale** | 12 ore | Tocco | Fino a dissoluzione | Estrai una versione di te stesso (o di una creatura) da una timeline passata (Simulacro). Ha metà dei PF massimi e non recupera slot. |
| **Spostamento Planare** | 1 azione | Tocco | Istantanea | Trasporti te e fino a 8 creature su un altro piano di esistenza (o dimensione alternativa/timeline). Richiede un focus. |
| **Teletrasporto di Massa** | 1 azione | 3 metri | Istantanea | Trasferisci istantaneamente te stesso e fino a 8 creature consenzienti in un luogo conosciuto sullo stesso piano di esistenza. |

#### Grado 8
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Esplosione Solare** | 1 azione | 45 metri | Istantanea | Evoca la luce di una stella morente in un raggio di 18 metri. **12d6 danni radianti** e cecità permanente (TS Costituzione dimezza). |
| **Labirinto** | 1 azione | 18 metri | Concentrazione, fino a 10 minuti | Bandi una creatura in un semi-piano labirintico. Ogni round, il bersaglio può tentare una prova di Intelligenza (CD 20) per fuggire. |
| **Parola del Potere: Stordire** | 1 azione | 18 metri | Istantanea | Pronunci una parola che sovraccarica il cervello. Se il bersaglio ha meno di 150 PF, è stordito automaticamente. |
| **Vuoto Mentale** | 1 azione | Tocco | 24 ore | La mente del bersaglio esiste fuori dal flusso del tempo. Immunità ai danni psichici, alla lettura del pensiero e alla divinazione. |

#### Grado 9
| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Arresto del Tempo** | 1 azione | Personale | Istantanea | Fermi il flusso del tempo per tutti tranne te. Ottieni **1d4 + 1 turni consecutivi**. Se interagisci con altri, l'effetto termina. |
| **Desiderio (Trama Cosmica)** | 1 azione | Personale | Istantanea | Parli all'universo per riscriverlo. Duplichi poteri di grado 8 o crei effetti unici. Causa stress fisico estremo. |
| **Esecuzione Perfetta** | 1 minuto | Tocco | 8 ore | Il bersaglio vede il futuro immediato (Preveggenza). Non può essere sorpreso e ha Vantaggio su tutto. I nemici hanno Svantaggio. |
| **Parola del Potere: Uccidere** | 1 azione | 18 metri | Istantanea | Pronunci una parola che recide il bersaglio dalla linea temporale. Se ha meno di 100 PF, muore istantaneamente senza tiro salvezza. |
#### Tecniche Specifiche per Specializzazione Paradosso

Disponibili solo per i Paradossi che seguono lo specifico paradigma e hanno raggiunto il livello adeguato.

##### Paradigma della Catastrofe
_Poteri esclusivi per chi abbraccia l'inevitabile fine di tutte le cose._

| Nome | Tempo di attivazione | Gittata | Durata | Descrizione |
| :--- | :--- | :--- | :--- | :--- |
| **Collasso Strutturale** (Grado 2) | 1 azione | - | Istantanea | Scegli un oggetto non magico o una sezione di muro/pavimento. Invecchi il materiale di mille anni in un secondo. L'oggetto si sbriciola. Se usato su un'armatura/arma nemica, la CA si riduce di 2 o i danni diminuiscono. |
| **Zona Morta** (Grado 5) | 1 azione | 36 metri (Sfera 6m) | Concentrazione, fino a 10 minuti | Crei un'area dove la vita non può esistere. Ogni creatura che inizia il turno nell'area subisce **5d8 danni necrotici**. Le piante avvizziscono. Se una creatura muore qui, non può essere resuscitata se non con *Desiderio*. |
| **Piaga dell'Entropia** (Grado 7) | 1 azione | 18 metri | 1 minuto | Infetti una creatura con entropia pura. Il bersaglio ha **vulnerabilità a tutti i danni**. Alla fine di ogni turno, può fare un TS Costituzione per terminare l'effetto. |
| **Evento di Estinzione** (Grado 9) | 1 azione | 1,5 km | Istantanea | Simile a *Sciame di Meteore*, ma evochi frammenti di pianeti distrutti. 4 sfere di impatto (raggio 12m). **20d6 danni da fuoco + 20d6 danni contundenti** per ogni sfera. |

##### Paradigma dell'Utopia
_Poteri esclusivi per chi cerca di riscrivere la realtà in una forma perfetta._

| Nome                                    | Tempo di attivazione  | Gittata        | Durata     | Descrizione                                                                                                                                                                                          |
| :-------------------------------------- | :-------------------- | :------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Scudo dell'Egida Perfetta** (Grado 3) | 1 azione (o reazione) | 9 metri        | 1 round    | Scegli fino a 3 creature. Fino al tuo prossimo turno, sono **immuni a Tutti i Danni** derivanti da una singola fonte a tua scelta (es: il prossimo soffio di drago, la prossima esplosione).         |
| **Guarigione Temporale** (Grado 6)      | 1 azione bonus        | -              | Istantanea | Scegli una creatura che ha subito danni nell'ultimo round. Ripristini i suoi PF al valore esatto che avevano all'inizio del suo ultimo turno. Non rimuove condizioni, annulla solo la perdita di PF. |
| **Santuario Eterno** (Grado 8)          | 1 azione              | - (Raggio 30m) | 24 ore     | All'interno dell'area, le creature non invecchiano, non hanno fame/sete e le malattie sono sospese. Nessun attacco può essere effettuato all'interno dell'area (blocco automatico o CD altissima).   |
| **Forma Perfetta** (Grado 9)            | 1 azione              | Tocco          | 1 ora      | Il bersaglio diventa la versione ideale di se stesso. Recupera tutti i PF, rimuove tutte le condizioni, ottiene **+4 a tutte le caratteristiche** (max 24) e **resistenza a tutti i danni**.         |
# Appendice C: Razze 

## Ashenforged 
| Aumento dei Punteggi di Caratteristica | Cos+2                                                                                                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Taglia                                 | M                                                                                                                                                           |
| Velocità                               | 9m                                                                                                                                                          |
| **Scurovisione.**                      | 18                                                                                                                                                          |
| Lingue                                 | Comune,Dendusi e un altro linguaggio a tua scelta.                                                                                                          |
| **Resilienza.**                        | Hai vantaggio sui tiri salvezza contro veleno e malattie e sei resistente ai danni da veleno.                                                               |
| **Addestramento Artigiano.**           | Ottieni competenza in uno strumento a tua scelta dalla seguente lista: strumenti da fabbro, strumenti da meccanico, utensili da cucina, strumenti da sarto. |
### Archetipo
#### Cerebrale 
| Aumento dei Punteggi di Caratteristica | Sag+1                                                                                                 |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Robustezza.**                        | Il tuo massimo dei punti ferita aumenta di 1 e aumenta anche di 1 ogni volta che guadagni un livello. |
#### Somatico
| Aumento dei Punteggi di Caratteristica | For+1                                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------- |
| **Armatura Naturale.**                 | Quando non indossi armatura, la tua CA è 12 + il tuo modificatore di Destrezza. |
## Eldori

| Aumento dei Punteggi di Caratteristica | Car+2                                                                                                                                                                                                                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Taglia                                 | M                                                                                                                                                                                                                                                                         |
| Velocità                               | 9m                                                                                                                                                                                                                                                                        |
| **Scurovisione.**                      | 18                                                                                                                                                                                                                                                                        |
| Lingue                                 | Comune,Nesieve e un linguaggio aggiuntivo a tua scelta.                                                                                                                                                                                                                   |
| **Iniziato Esper.**                    | Ottieni l'uso del talento aegis. Al 3° livello, ottieni l'uso del talento innervate.<br>Al 5° livello, ottieni l'uso del talento clean zone.<br>Questi poteri possono essere usati ciascuno solo una volta e riguadagni tutti gli usi dopo aver terminato un riposo lungo |

### **Archetipo di Specie.** 

#### Eldori Lunare
| Aumento dei Punteggi di Caratteristica | Int+1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Scurovisione Superiore.**            | 27m                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Attingere dalla Ruota.**             | Una volta per riposo lungo, puoi usare la tua azione bonus per invocare il potere della Grande Ruota, garantendoti vantaggio su un singolo tiro per colpire, tiro di abilità o tiro salvezza.<br>Scegli il tipo di bonus all'attivazione di questa caratteristica. La debole aura di una ruota runica circonda la tua forma mentre la caratteristica è attiva.<br>L'aura è traslucida e non emette luce. Gli effetti di questa caratteristica durano finché il bonus non viene utilizzato o fino alla fine del tuo turno successivo. |

#### Eldori Solare
| Aumento dei Punteggi di Caratteristica | Sag+2                                                             |
| -------------------------------------- | ----------------------------------------------------------------- |
| Resistenza Innata                      | Sei resistente ai danni necrotici e radianti.                     |
| **Addestramento nelle Armi.**          | Sei addestrato nell'uso del bastone energetico e della lama lunga |

## Umani

| Taglia   | M                 |
| -------- | ----------------- |
| Velocità | 9m                |
| Lingue   | Comune, e Terran. |
### **Archetipo.** 

#### Nato sulla terra 
| **Aumento dei Punteggi di Caratteristica.** | Tutti +1                                                               |
| ------------------------------------------- | ---------------------------------------------------------------------- |
| Linguaggio                                  | Puoi parlare, leggere e scrivere un linguaggio aggiuntivo a tua scelta |

#### Galattico 
| **Aumento dei Punteggi di Caratteristica.** | Due a tua scelta +1                            |
| ------------------------------------------- | ---------------------------------------------- |
| **Abilità.**                                | Ottieni competenza in un'abilità a tua scelta. |
| **Talento.**                                | Ottieni un talento a tua scelta.               |

#### Utopico
| **Aumento dei Punteggi di Caratteristica.** | Car+2 e un altro punteggio di caratteristica a tua scelta aumenta di 1    |
| ------------------------------------------- | ------------------------------------------------------------------------- |
| **Abilità.**                                | Ottieni competenza in due abilità a tua scelta.                           |
| **Volitivo.**                               | Hai vantaggio sui tiri salvezza contro l'essere affascinato o spaventato. |
| **Linguaggio.**                             | Puoi parlare, leggere e scrivere un linguaggio aggiuntivo a tua scelta    |
#### Bruciato 
| **Aumento dei Punteggi di Caratteristica.** | Cos+2 e For+1                                                                                                                                                                              |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Muscoloso.**                              | Ottieni competenza in Atletica e un'altra abilità a tua scelta.                                                                                                                            |
| **Addestramento nelle Armi.**               | Hai competenza a tua scelta con la lama lunga o la pistola automatica.                                                                                                                     |
| **Resiliente.**                             | Quando viaggi in condizioni di caldo o freddo estremo, sei in grado di resistere un'ora aggiuntiva per ogni bonus di costituzione prima di richiedere un tiro salvezza per l'esaurimento.  |

## Kesh

| Aumento punteggio caratteristico | Dex +2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Taglia                           | M                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Velocità                         | 9m                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Scurovisione                     | 18m                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Lingue                           | Comune, Keshian e un altro linguaggio a tua scelta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Alterazione Minore.**          | Ottieni l'uso del talento alter appearance.<br>Puoi usare questo talento una volta, dopo di che devi completare un riposo lungo prima di poterlo usare di nuovo.<br>Anche quando usi questa caratteristica, non sei in grado di cambiare il colore naturale nero degli occhi che è nativo di tutti i kesh.<br>Al 4° livello, ottieni un uso aggiuntivo di questa caratteristica e puoi estendere la durata per un'ora aggiuntiva.<br>Questo aumenta di un uso e di un'ora aggiuntiva di nuovo al 9° livello e al 14° livello.<br>Riguadagni tutti gli usi di questa caratteristica quando completi un riposo lungo. |
| **Fusione della Memoria.**       | Ottieni l'uso del potere shared vision.<br>Puoi usarlo una volta dopo di che devi completare un riposo lungo prima che possa essere usato di nuovo.<br>Carisma è la tua abilità di canalizzazione per questo potere quando usi questa caratteristica.                                                                                                                                                                                                                                                                                                                                                               |

### Archetipo

#### Nobile kesh

| **Aumento dei Punteggi di Caratteristica.** | Car +1                                                             |
| ------------------------------------------- | ------------------------------------------------------------------ |
| **Addestramento alla Sopravvivenza Kesh.**  | Hai competenza con la lama lunga e il bastone energetico.          |
| **Linguaggio Aggiuntivo.**                  | Puoi parlare, leggere e scrivere un linguaggio extra a tua scelta. |
#### KESH DELLE STELLE
| **Aumento dei Punteggi di Caratteristica.** | Int +1                                                                                                                                                      |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Scienza Spaziale.**                       | Puoi aggiungere il tuo bonus di competenza a qualsiasi prova di Intelligenza (Astrofisica), o raddoppiare il tuo bonus di competenza se sei già competente. |
| **Addestramento Membro dell'Equipaggio.**   | Hai competenza con uno strumento artigiano a tua scelta.                                                                                                    |
## Promethean

| Aumento punteggio caratteristico | Dex +2                                     |
| -------------------------------- | ------------------------------------------ |
| Taglia                           | M                                          |
| Velocità                         | 9m                                         |
| Scurovisione                     | 18m                                        |
| Lingue                           | Comune, e un altro linguaggio a tua scelta |
### Archetipo 

#### Aberrante
Nessun aumento 

#### Mezzaluna
| **Aumento dei Punteggi di Caratteristica:** | Int+1                                                                                                                  |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Pensiero Logico:**                        | Hai vantaggio sui tiri salvezza contro effetti che alterano la mente e allucinatori causati da tossine o poteri esper. |
| **Senso Acuto:**                            | Ottieni competenza nell'abilità Percezione.                                                                            |
#### Sangue di fuoco
| **Aumento dei Punteggi di Caratteristica:** | For +1                                                                                                                                                                                                                |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Resilienza:**                             | Hai vantaggio sui tiri salvezza contro veleno e malattie, e hai resistenza ai danni da veleno.                                                                                                                        |
| **Massimo Sforzo:**                         | Una volta per riposo lungo, puoi raddoppiare il tuo bonus di competenza a qualsiasi prova di abilità Atletica o Acrobazia. Ottieni un uso aggiuntivo di questa abilità al 5° livello, e di nuovo al 9° e 14° livello. |
## Androidi
| Aumento punteggio caratteristico | Int +2                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Taglia                           | M                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Velocità                         | 9m                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Costrutto Vivente.**           | Anche se sei stato costruito, sei una creatura vivente. Sei immune alle malattie. Non hai bisogno di mangiare o respirare, ma puoi ingerire cibi o bevande se lo desideri (spesso convertendoli in biocarburante). Invece di dormire, entri in uno stato inattivo per 4 ore al giorno durante le quali rimani cosciente dei dintorni. Dopo aver riposato in questo modo, ottieni gli stessi benefici che un umano ottiene da 8 ore di sonno. |
| Lingue                           | Comune, e ALOMU (il linguaggio binario universale delle macchine).                                                                                                                                                                                                                                                                                                                                                                           |
| **Resilienza Sintetica.**        | Hai vantaggio sui tiri salvezza contro il veleno e hai resistenza ai danni da veleno.                                                                                                                                                                                                                                                                                                                                                        |
| **Analisi Integrata.**           | Puoi interfacciarti rapidamente con la tecnologia e analizzare i dati. Ottieni competenza nell'abilità _Computers_ (Intelligenza) o _Investigazione_ (Intelligenza).                                                                                                                                                                                                                                                                         |
### Archetipo 
#### Unità logica

| **Aumento dei Punteggi di Caratteristica.** | Dex+1                                                                                                                                                                                                                                          |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Database Vasto.**                         | Hai accesso a banche dati storiche e culturali pre-caricate. Ottieni competenza in due: _Storia_, _Religione_.                                                                                                                                 |
| **Interfaccia Diretta.**                    | Puoi comunicare con macchine e computer complessi entro 9 metri da te senza bisogno di un terminale fisico, utilizzando una connessione wireless criptata. Questo ti permette di effettuare prove di _Computers_ a distanza e silenziosamente. |
#### Unità corazzata
| **Aumento dei Punteggi di Caratteristica.** | For+1                                                                                                                                                                                              |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Placcatura Integrata.**                   | Il tuo corpo ha strati protettivi incorporati. Ottieni un bonus di +1 alla Classe Armatura.                                                                                                        |
| **Struttura Rinforzata.**                   | Quando subisci un colpo critico, puoi usare la tua reazione per trasformarlo in un colpo normale. Puoi usare questa capacità una volta, e ne riguadagni l'uso dopo aver terminato un riposo lungo. |
## Talandri 
| Aumento punteggio caratteristico | Sag +2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Taglia                           | M                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Velocità                         | 9m                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Quattro Braccia.**             | Possiedi quattro braccia. Le tue braccia secondarie sono capaci quanto quelle primarie, ma la coordinazione mentale richiesta per usarle tutte simultaneamente in combattimento è immensa. Puoi interagire con un oggetto aggiuntivo o caratteristica dell'ambiente gratuitamente durante il tuo turno. Puoi impugnare armi o scudi nelle braccia secondarie, ma non puoi effettuare più attacchi di quanto consentito dalla tua azione di Attacco, né puoi beneficiare di più di uno scudo alla volta. Tuttavia, la versatilità ti permette di tenere oggetti utili (come torce, dispositivi o pozioni) pronti all'uso mentre le mani primarie sono occupate. |
| Lingue                           | Comune, e  Kasath (la lingua antica dei Talandri, complessa e ricca di sfumature gestuali)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Passo del Deserto.**           | La tua fisiologia è adatta a terreni difficili e climi aridi. Ignori il terreno difficile creato da macerie, sabbia o detriti naturali. Inoltre, hai bisogno della metà dell'acqua giornaliera rispetto alle altre specie medie per sopravvivere.                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Erudito della Idaris.**        | Cresciuto tra gli archivi della nave-mondo, hai un'educazione formale. Ottieni competenza in un'abilità a scelta tra _Storia_ (Intelligenza) o _Cultura_ (Intelligenza).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
### Archetipo 

#### Deriviscio 
| Aumento punteggio caratteristico | Dex+1                                                                                                                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Danza delle Lame.**            | Sei addestrato a muoverti agilmente in battaglia. Quando indossi un'armatura leggera o nessuna armatura, la tua velocità base di camminata aumenta di 1,5 metri (5 piedi). |
| **Parata Multipla.**             | Mentre impugni un'arma da mischia in almeno due delle tue mani, ottieni un bonus di +1 alla CA contro gli attacchi di opportunità.                                         |
#### Navigatore Stellare
| Aumento punteggio caratteristico | Int +1                                                                                                                                                                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Adattamento Zero-G.**          | Sei nato nello spazio. Non subisci svantaggio ai tiri per colpire o alle prove di abilità quando ti trovi in gravità zero. Inoltre, hai vantaggio sulle prove di Destrezza (Acrobazia) per manovrare in ambienti a gravità zero o bassa gravità. |
| **Tecnologia Ancestrale.**       | Hai familiarità con i sistemi antichi. Ottieni competenza nell'abilità _Meccanica_ (Saggezza) o nell'uso degli _Strumenti da Tecnico_.                                                                                                           |
## Pahtra 
| Aumento punteggio caratteristico | Dex +2                                                                                                                                                                                          |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Taglia                           | M                                                                                                                                                                                               |
| Velocità                         | 9m                                                                                                                                                                                              |
| **Scurovisione.**                | 18m                                                                                                                                                                                             |
| Lingue                           | Comune, e  Pahtra (una lingua melodica che include fusa e ringhi per trasmettere emozioni sottili).                                                                                             |
| **Sensi Felini.**                | Ottieni competenza nell'abilità _Percezione_.                                                                                                                                                   |
| **Armi Naturali.**               | Possiedi artigli retrattili che puoi usare in combattimento. I tuoi colpi senz'armi infliggono danni taglienti pari a 1d4 + il tuo modificatore di Forza, invece dei normali danni contundenti. |
| **Atterraggio Agile.**           | Hai resistenza ai danni da caduta e sei sempre considerato competente nelle prove di Destrezza (Acrobazia) per ridurre l'impatto di una caduta.                                                 |
### Archetipo 
| Aumento punteggio caratteristico | Cos +1                                                                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Passo Felpato.**               | Ottieni competenza nell'abilità _Furtività_.                                                                                        |
| **Scatto del Predatore.**        | Quando usi l'azione di Scatto (Dash), puoi muoverti attraverso il terreno difficile senza penalità di movimento per quel turno.<br> |
#### Cantore di guerra
| Aumento punteggio caratteristico | Car +1                                                                                                                                                               |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Voce Esper.**                  | Ottieni l'uso del talento _Sonic Burst_ (Esplosione Sonica) come talento Prime (a volontà). La tua caratteristica di canalizzazione per questo talento è il Carisma. |
| **Ispirazione Musicale.**        | Ottieni competenza nell'abilità _Intrattenere_ o in uno strumento musicale a tua scelta.<br>                                                                         |

## Vesk
| Aumento punteggio caratteristico | For +2                                                                                                                                                                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Taglia                           | M                                                                                                                                                                                                                                                                                           |
| Velocità                         | 9m                                                                                                                                                                                                                                                                                          |
| **Scurovisione.**                | 18m                                                                                                                                                                                                                                                                                         |
| Lingue                           | Comune, e   Vesk                                                                                                                                                                                                                                                                            |
| **Armatura Naturale.**           | Hai pelle dura e scaglie rinforzate. Quando non indossi armatura, la tua Classe Armatura è 13 + il tuo modificatore di Destrezza. Puoi usare la tua armatura naturale per determinare la tua CA se l'armatura che indossi ti lascerebbe con una CA inferiore. L'uso di uno scudo si applica |
| **Minaccioso.**                  | La tua stazza e il tuo aspetto sono intimidatori per natura. Ottieni competenza nell'abilità Intimidire.                                                                                                                                                                                    |
| **Armi Naturali.**               | Sei sempre armato. I tuoi artigli o la tua coda sono armi naturali, che puoi usare per effettuare colpi senz'armi. Se colpisci con essi, infliggi danni taglienti pari a 1d4 + il tuo modificatore di Forza, invece dei normali danni contundenti.                                          |
### Archetipo
#### Soldato d'assalto 
| Aumento punteggio caratteristico | Cos +1                                                                                                                                                                      |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Aggressivo.**                  | Come azione bonus, puoi muoverti fino alla tua velocità verso una creatura ostile che puoi vedere.                                                                          |
| **Corazzato.**                   | La tua pelle è ancora più spessa della media. Ottieni un bonus di +1 alla Classe Armatura quando usi la tua Armatura Naturale o quando indossi un'armatura pesante.<br><br> |
#### Stratega imperiale
| Aumento punteggio caratteristico | Sag +1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Impavido.**                    | Hai vantaggio sui tiri salvezza contro l'essere spaventato.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Ordine di Battaglia.**         | Hai familiarità con la storia militare e le tattiche. Ottieni competenza nell'abilità Storia (Intelligenza) o Intuizione (Saggezza). Inoltre, puoi usare la tua reazione per concedere vantaggio al tiro per colpire di un alleato che puoi vedere entro 9 metri da te, purché l'alleato stia attaccando un bersaglio che puoi vedere anche tu. Puoi usare questa capacità un numero di volte pari al tuo modificatore di Saggezza (minimo 1) e recuperi tutti gli usi dopo un riposo lungo.<br><br> |

## Ysoki
| Aumento punteggio caratteristico | Dex +2                                                                                                                                                                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Taglia                           | S                                                                                                                                                                                                                                                       |
| Velocità                         | 9m                                                                                                                                                                                                                                                      |
| **Scurovisione.**                | 18m                                                                                                                                                                                                                                                     |
| Lingue                           | Comune, e  Ysoki                                                                                                                                                                                                                                        |
| **Tasche Guanciali.**            | Possiedi delle tasche nelle guance che possono contenere oggetti fino a 0,03 metri cubi (1 piede cubo) di volume o fino a 2,5 kg di peso in totale.  Hai vantaggio sulle prove di Destrezza (Rapidità di Mano) per nascondere oggetti nelle tue guance. |
| **Grinta.**                      | Sei abituato a farti valere contro creature più grandi di te. Hai vantaggio sui tiri salvezza contro l'essere spaventato.                                                                                                                               |
### Archetipi
#### Ingegnere dei bassifondi
| Aumento punteggio caratteristico | Int +1                                                                                                                                                                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Manutentore Esperto.**         | Ottieni competenza nell'abilità _Meccanica_ (Saggezza) o _Computers_ (Intelligenza).                                                                                                                                                                                |
| **Strisciare.**                  | Puoi muoverti attraverso lo spazio di qualsiasi creatura che sia di una taglia più grande della tua. Inoltre, puoi infilarti in passaggi stretti larghi fino a 15 cm senza dover strizzarti (squeeze), mantenendo la tua velocità normale e senza subire svantaggi. |
#### Vagabondo stellare
| Aumento punteggio caratteristico | Car +1                                                                                                                                        |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Parlantina Sciolta.**          | Ottieni competenza nell'abilità _Persuasione_ o _Inganno_.                                                                                    |
| **Sensi Acuti.**                 | Ottieni competenza nell'abilità _Percezione_. I tuoi grandi orecchi e le tue vibrisse ti permettono di notare dettagli che sfuggono ad altri. |

