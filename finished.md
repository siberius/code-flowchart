# finished.md — CodeFlowChart HEFAISTOS (code-flowchart)

Archiv dokončených úkolů (nejnovější nahoře). Formát dle `MASTER-AGENTS.md` §14.

## 2026-09-27 — Přepínač typu vstupu TEXT/ČÍSLO na bloku (nezakomitováno)

- **Oblast:** IO blok v `index.html` (render, engine, checker, persistence).
- **Změna:** vstupní blok má druhé skleněné kolečko vpravo dole (`.data-switch`):
  `Aa` (TEXT, fialová) ↔ `123` (ČÍSLO, azurová), přepíná `App.toggleDataType`
  (stejný vzor jako `toggleIOType`: toast + `saveState` + `noteCampaignEdit`).
  Nové pole `b.dataType`; staré uložené plochy se při renderu domigrují heuristikou
  (`dataType || inputExpect(label) || 'text'`), takže dosavadní validace podle popisku
  zůstává. Engine má prioritu `dataType`, modal přepíná `inputmode` (decimal/text),
  checker vrací chybu „očekává číslo, ve vektoru je text". Kopie `dataType` doplněna
  i do přenosu vzorových/cheat řešení (`def.dataType`).
- **Ověření:** inline `<script>` syntax OK (1/1); regex PASS (kolečko, toggle, priorita,
  inputmode, checker, kopie); plné Node testy nelze spustit (pre-existing ENOENT po
  přejmenování `code-flowchart.html → index.html`). Zbývá: hromadně nastavit
  `dataType:'number'` u číselných vstupů v MISSIONS/SAMPLES (fallback je zatím kryje).

## 2026-09-27 — Terminál se po úspěšném běhu pomalu stáhne + SVG šipka (nezakomitováno)

- **Oblast:** `#console-panel` v `index.html` (hlavička + `startSimulation`/`stopSimulation`).
- **Změna:** křížek `✖` a znak `▼` nahrazeny SVG šipkou (chevron); po úspěšném běhu
  (`lastSimStatus === 'success'`) se po 2,5 s lišta pomalu stáhne (`slow-dock`,
  přechod 1,4 s). Nový `dockTimer` se ruší při novém běhu, ručním zavření i přepnutí
  lišty, aby uživatele nepřekvapil.
- **Ověření:** inline `<script>` syntax OK (1/1); regex PASS (slow-dock, dockTimer,
  SVG šipka, křížek pryč, docked 46 px + toggle handler zachovány); plné Node testy
  nelze spustit (pre-existing ENOENT po přejmenování `code-flowchart.html → index.html`).

## 2026-09-27 — Diagram jablek o 20 % výš (nezakomitováno)

- **Oblast:** výchozí šablona SPACE 1 (`buildDefaultGameLoop` v `index.html`).
- **Změna:** `cy: 0 → -230` (≈20 % výšky diagramu ~1160 px); všechny bloky se posunou
  rovnoměrně o 230 px výš, relativní rozložení beze změny.
- **Ověření:** inline `<script>` syntax OK (1/1); žádné testy na souřadnice šablony
  neexistují; plné Node testy nelze spustit (pre-existing ENOENT po přejmenování
  `code-flowchart.html → index.html`).

## 2026-09-27 — Lišta modulů nad sbaleným terminálem na PC (nezakomitováno)

- **Oblast:** UI/CSS v `index.html` — sbalený `#console-panel` (46 px, `bottom:0`) překrýval
  středovou `#toolbar` (`bottom:20px`).
- **Oprava napodruhé (správně):** první pokus zvedl terminál (`bottom:96px`), ale kvůli
  `translateY(calc(100%-46px))` tím naopak zakryl ještě víc (0–142 px) — vráceno.
  Místo toho se na PC (`@media (hover:hover) and (pointer:fine) and (min-width:769px)`)
  zvedá **lišta modulů** na `bottom:62px` (46 px terminál + 16 px mezera); otevřený stav
  a mobil beze změny. `#toast` posunut na `bottom:142px`, aby ho lišta nezakrývala.
- **Ověření:** regex kontroly PASS (docked 46px + bottom:0 + toolbar 20px base + PC 62px
  zachovány); plné Node testy nelze spustit — repo po přejmenování
  `code-flowchart.html → index.html` nenačte `flow_*_tests.js` (pre-existing ENOENT).

## 2026-09-25 — Svod: víc cest → jeden KONEC (fan-out, ukázky s jedním koncem) (nezakomitováno)

- **Systémově osvětleno a schváleno (rozhodnutí zadavatele):** konců může být více (pro
  předčasné ukončení), ale výchozí vzor = **jeden KONEC, do kterého se sbíhá mnoho cest**.
  Jádro to dataově podporovalo už dříve (seznam `arrows` nemá unikátní index); chybělo
  jen vykreslení a vzor pro ukázky.
- **Motor — svod (fan-out):** `renderArrows` spočítá příchozí šipky na cíl+port
  (`into`/`used`) a `getPortPos(blockId, portName, fanIdx, fanCount)` rozloží konce po hraně
  portu (`(fanIdx − (fanCount−1)/2) · 14 px`); šipky se poslední chvíli rozejdou a nekryjí.
  Jediná změna je vizuální — běh, krokování i AUTO-kontrola sdílené beze změny.
- **Ukázky přepsány na jediný KONEC (+ poznámka SVOD):**
  - **Kalkulačka** — 27 bloků, 7 cest (6 větví + neznámý operátor) → jeden KONEC vpravo
    dole (x 880, y 1960) přes horní port (fan 7).
  - **Třídění odpadu** — 15 bloků, 5 cest (4 kontejnery + neznámý) → KONEC (880, 1060);
    „neznámý" přesunut do sloupce větví (460, 850).
  - **BMI** — 15 bloků, 4 cesty (podváha/norma/nadváha/obezita) → KONEC (780, 1100);
    „obezita" vlevo dole (0, 1050).
  - Ostatní ukázky (README-style SD prstem…) — beze změny, končí rovnou do KONCE.
- **Testy:** +3 v `flow_game_tests` (jediný `end` u calculator/waste/bmi; počet šipek
  do koncového bloku 7/5/4; keep stávající `blocks[last] === end`), **+1** v
  `flow_smoke_tests` (fan výpočet v `renderArrows` + poznámka SVOD v zdroji). Opraven
  indexový přešlap (SVOD note posunul `end` na index 26 → šipky na 26).
- **Ověření:** syntax OK · flow_tests 39 · flow_check 70 · flow_game 93 · flow_storage 55 ·
  flow_ui 6 · flow_smoke 214 (celkem **477** kontrol, 0 FAIL).

## 2026-09-25 — KONEC u větvených ukázek vyhozen do vlastního sloupce (nezakomitováno)

- **Kalkulačka, Třídění odpadu a BMI:** bloky `KONEC` už nevisí pod výstupem ve stejném
  sloupci jako bloky sousední větve (splývaly s nimi a křížily cesty), ale jsou **vysunuty
  vpravo do vlastního sloupce** (x 880 / 780 / 760) a **zarovnány na řádek výstupu**;
  šipka vede PRAVO z výstupu do KONEC (`[o,'right',e,'left']`), NE-návaznosti u podmínek
  zůstávají čistě svislé vlevo. Kalkulačka: rozestup větví 240 px (žádné prolínání `KONEC₁`
  s `VÝSLEDEK₂`), výchozí `Konec (neznámý operátor)` dole.
- **Testy:** beze změny počtu (data jen přearanžována — stále 0 FAIL).
- **Ověření:** syntax OK · flow_tests 39 · flow_check 70 · flow_game 91 · flow_storage 55 ·
  flow_ui 6 · flow_smoke 213 (celkem **474** kontrol, 0 FAIL).

## 2026-09-25 — Čitelnost výběru ukázek a menu, schémata ukázek roztáhnuta (nezakomitováno)

- **Text ve výběru ukázek +10 %:** popisek (`hint`) 11 px → **12 px** a jasnější (`opacity 0.55 → 0.7`).
- **Menu zvětšeno a nataženo na mobil:** `#side-menu` šířka 260 → `min(320px, calc(100vw − 12px))`
  (na mobilu zabere skoro celou šířku); skrytí `left: calc(-100% − 12px)` se přizpůsobí libovolné šířce.
  Texty menu: `.menu-mission` a `.side-menu-link` 13 → **14 px**, `.menu-section-title` 13 → **14 px**,
  `.mm-tag` 11 → **12 px**; padding položek 30 → 26 px.
- **Schémata ukázek roztáhnuta do šíře (bez překryvů):** Kalkulačka, Třídění odpadu a BMI měly
  větve/sousledné „KONEC" moc blízko (překrývaly se panely). Roztaženo: vedlejší sloupec větví
  x 400/380/360 → **560/460/440**, poznámky → −440/−460, svislé rozestupy řádků 160–200 → **220–260**;
  start/branky přepočítány, indexy šipek beze změny (stále 0 FAIL).
- **Testy:** `flow_smoke_tests.js` 212 → **213** (+1: menu `min(320px, calc(100vw − 12px))`,
  velikosti 14 px, hint 12 px/0.7).
- **Ověření:** syntax OK · flow_tests 39 · flow_check 70 · flow_game 91 · flow_storage 55 ·
  flow_ui 6 · flow_smoke 213 (celkem **474** kontrol, 0 FAIL).

## 2026-09-25 — Ukázky napříč předměty (8 nových, s poznámkami) (nezakomitováno)

- **SAMPLES rozšířeny ze 4 na 12** — „read + remix" i pro jiné předměty (RVP H/E_J):
  - **Kalkulačka** (`calculator`, matematika) — vstup a, op (text), b; větvení pro + − × ÷ mocninu
    `a ** b` a odmocninu `Math.sqrt(a)`; výchozí větev „neznámý operátor".
  - **Pythagorova věta** (`pythagoras`, matematika) — `c = Math.sqrt(a * a + b * b)`.
  - **Složený úrok** (`interest`, ekonomika) — cyklus přes roky, zaokrouhlení na haléře.
  - **Čistá mzda** (`wage`, ekonomika) — pojistné 11 % + daň 15 %, `Math.round`.
  - **Spotřeba paliva** (`fuel`, ekologie) — litry = spotřeba × km ÷ 100, náklady.
  - **Třídění odpadu** (`waste`, ekologie) — kaskádové větvení textových podmínek.
  - **BMI** (`bmi`, zdravověda) — vzorec + vyhodnocení podváha/norma/nadváha/obezita.
  - **Měřítko mapy** (`scale`, zeměpis) — přepočet cm → km (1:25000).
- **Každá nová ukázka má přehledné POZNÁMKY** (bloky `note` po straně, bez šipek — tok
  nepřerušují) + popis `hint` do modalu. Trigonometrie (sin/cos/tg/cotg) záměrně NE — moc
  pro obory H/E_J; jádro by je přitom zvládlo beze změny.
- **Testy:** `flow_game_tests.js` 90 → **91** (12 ukázek, kalkulačka/√/úrok/odpad/BMI,
  poznámky ve všech nových ukázkách); `flow_smoke_tests.js` 210 → **212** (seznam 12 položek,
  zdroj: 12 id + `op == "soucet"` + `Math.sqrt`/`Math.round` s poznámkami).
- **Ověření:** syntax OK · flow_tests 39 · flow_check 70 · flow_game 91 · flow_storage 55 ·
  flow_ui 6 · flow_smoke 212 (celkem **473** kontrol, 0 FAIL).

## 2026-09-25 — Šedý text v modalech a menu zesvětlen o 20 % (nezakomitováno)

- **`--text-dim` `#64748b` → `#8390a2`** (o 20 % světlejší směrem k bílé). Pokrývá menu
  (odkazy, položky misí), modaly (O programu, nápověda, paleta, ukázky, export) i orientační
  texty konzole/labelů — tmavý podklad, lepší čitelnost.
- **Testy:** `flow_smoke_tests.js` → **210** (z 209): +1 (`--text-dim: #8390a2`, stará hodnota pryč).
- **Ověření:** syntax OK · flow_tests 39 · flow_check 70 · flow_game 90 · flow_storage 55 ·
  flow_ui 6 · flow_smoke 210 (celkem **471** kontrol, 0 FAIL).

## 2026-09-25 — Sklo průhlednější, nápověda zdůrazňuje Ctrl+K (nezakomitováno)

- **Nápověda:** položka `Ctrl+K` přeformulována a zvýrazněna —
  „Zobrazí paletu zkratek — spustitelné příkazy a seznam všech klávesových zkratek"
  (jantarově `#f59e0b`, aby vynikla mezi zkratkami).
- **Ještě průhlednější sklo:**
  - `#side-menu` gradient alfa 0.75/0.55 → **0.6/0.4**;
  - `.modal-box` alfa **0.35 → 0.28** (+ saturate, + `-webkit-`);
  - `#console-panel` (terminál) alfa **0.95 → 0.7**, blur 15 → 20 px (+ saturate, + `-webkit-`);
  - `.sim-prompt` (vstup v terminálu) alfa **0.95 → 0.75**, blur 12 → 18 px (+ `-webkit-`).
- **Testy:** `flow_smoke_tests.js` → **209** (z 208): +1 (modaly/terminál/prompt mají nové
  nižší alfa), upraven alfa regex menu (0.4) a nápověda (paletu zkratek).
- **Ověření:** syntax OK · flow_tests 39 · flow_check 70 · flow_game 90 · flow_storage 55 ·
  flow_ui 6 · flow_smoke 209 (celkem **470** kontrol, 0 FAIL).

## 2026-09-25 — Menu dostalo poloprůhledné sklo (glassmorphism) (nezakomitováno)

- **`#side-menu` je nyní skleněné, ne téměř plné:** pozadí = lineární gradient
  `rgba(15,18,26,0.75) → rgba(13,15,20,0.55)` místo plných `rgba(13,15,20,0.9)`;
  `backdrop-filter: blur(20px) saturate(140%)` (+ `-webkit-` pro Safari);
  vnitřní horní linka `inset 0 1px 0 rgba(255,255,255,0.06)` pro skleněný lesk,
  měkčí stín. Položky a sekce zůstaly průhledné (jen hover/current mají slabou akcentní fólii).
- **Testy:** `flow_smoke_tests.js` → **208** (z 207): +1 (menu obsahuje blur+saturate
  i nižší alfu 0.55, bez `-webkit-` a saturate test selže).
- **Ověření:** syntax OK · flow_tests 39 · flow_check 70 · flow_game 90 · flow_storage 55 ·
  flow_ui 6 · flow_smoke 208 (celkem **468** kontrol, 0 FAIL).

## 2026-09-25 — Mise prezentované jako „1. název"…, puntík v textu ploch odstraněn (nezakomitováno)

- **Mise se už nejmenují „m01. Název" apod. — jen „1. název", „2. název", …**
  `App.missionNum(id)` vrací pořadové číslo mise v jejím vlastním profilu (H: m01→1…m08→8,
  E_J: e1→1…e6→6; neznámé id → 0). Použito v menu misí, titulku zadání mise a patičce SVG
  („mise 2. Vytiskni náhradní držák"). Interní id zůstává pro uložiště/export (stabilní klíče).
- **V textu ploch (MISE/SPACE 1–5) odstraněn nadbytečný puntík** — `ws-cell-dot`
  („perforace filmu") vyhozena z buněk pásu i z CSS; text je čistě „SPACE 1".
- **Testy:** `flow_smoke_tests.js` → **207** (z 205): +2 (titulek = „3. Vytiskni náhradní držák",
  `missionNum` m01→1/m02→2/e1→1/e6→6/m99→0, SVG obsahuje „mise 2. ", žádný `ws-cell-dot`
  a žádné `<span` za „SPACE 1").
- **Ověření:** syntax OK · flow_tests 39 · flow_check 70 · flow_game 90 · flow_storage 55 ·
  flow_ui 6 · flow_smoke 207 (celkem **467** kontrol, 0 FAIL).

## 2026-09-25 — Terminál = dokovací lišta (zasouvací dolů + samovysouvací) (nezakomitováno)

- **Sbalený terminál nechává viditelnou „lištu" 46 px** (`#console-panel` kolaps
  `translateY(calc(100% - 46px))` místo `translateY(100%)`): hlavička s názvem a šipkou
  ▼ (při otevření se otočí) zůstává ukotvená dole jako dok.
- **Klik na lištu = přepínač** (`App.toggleConsolePanel`): rozbalí/sbalí; klik na ovládací
  prvky (select rychlosti, „Další krok", obrázek ✖) se ignoruje (`stopPropagation`), ✖ dál
  zastavuje simulaci.
- **Klik na plochu mimo otevřený terminál → terminál se zasune dolů na lištu**:
  `pointerdown` na `#canvas-wrap` volá `App.dockConsole()` (jen když neběží simulace,
  při živém běhu zůstává stopa viditelná).
- **Spuštění simulace terminál vždy vysune** s trace + Visual RAM (`consolePanel.classList.add('open')`
  v `startSimulation` — terminál „s proměnnými").
- **Testy:** `flow_smoke_tests.js` → **205** (z 196): +9 (collapsed 46px v CSS, klikatelný
  přepínač, stopPropagation, pointerdown→dockConsole, spuštění otevírá, toggle vysune,
  dock zasune, select nepřepne).
- **Ověření:** syntax OK · flow_tests 39 · flow_check 70 · flow_game 90 · flow_storage 55 ·
  flow_ui 6 · flow_smoke 205 (celkem **465** kontrol, 0 FAIL).

## 2026-09-25 — O programu +20 % šířky, modaly zavíratelné Esc/klikem mimo, plochy = filmový pás v topbaru (nezakomitováno)

- **O programu na PC o 20 % širší:** `#about-modal .modal-box` → `width: min(655px, 97vw)`
  (546 → 655 px); mobil zůstává `min(420px, 90vw)`/`33vh` beze změny.
- **Informační modaly zavíratelné klávesou Esc a kliknutím mimo** (jinak „princip hry" to zakazuje):
  delegovaná obsluha `App.onModalBackdropClick` reaguje jen na klik na samotné pozadí
  (`e.target` = `.modal-overlay`) a jen u modalů s `data-dismiss` (help, o programu, o autorovi,
  paleta, ukázky, zadání mise, výsledky OVĚŘENO/dokončení, export SVG/JSON).
  Potvrzovací a editační modaly (edit, sim-*, clear/RESET/restart-confirm, jméno, import-review)
  `data-dismiss` NEMAJÍ → klik mimo je nezavře (vyžadují vědomý výběr); Esc dál ruší vše.
  Paleta/ukázky zavírá jejich vlastní metody (`closePalette` resetuje scope, `closeSamples`).
- **Plochy v topbaru = jedna „role" filmového pásu namísto 6 tlačítek:** `#ws-switch`
  s šipkami `‹ ›`, `#ws-film` (overflow hidden, okénko = 3× buňka) a `#ws-track` se 6 buňkami
  (MISE + SPACE 1–5); aktuální plocha je středem, animovaný posun `transform` s
  `transition cubic-bezier` (role se „přetočí"), sousední buňky vykukují, aktivní má tečku
  „perforace filmu" + zvýraznění; šipky na krajích se zamknou (`disabled`). Buňky zůstávají
  klikatelnými přepínači, zkratky `Ctrl+Alt+1–5` a paletová položka „Plochy" fungují dál.
- **Nové metody:** `wsStep(dir)`, `updateWsSwitch()` (+ konstanta `WS_ORDER`) — posun se čte ze
  skutečné šířky buňky (`getBoundingClientRect`), takže zůstává správný i na mobilu (50 px);
  `updateWorkspaceUI()` nově volá `updateWsSwitch()` místo cyklu `#ws-tabs .ws-tab`.
- **Testy:** `flow_smoke_tests.js` → **194** (z 182): +12 (šířka O programu 655 px, filmový pás:
  zdroj `ws-cell`×6 bez `ws-tab`, `wsStep(-1)` → space2, zámek šipek na kraji, posun
  `translateX(-200px)`, aktivní buňka; modaly: klik mimo zavře O programu / NEzavře RESET /
  klik do boxu nic, zdroj: 10× `data-dismiss` informačních, potvrzovací bez něj).
- **Ověření:** syntax OK · flow_tests 39 · flow_check 70 · flow_game 90 · flow_storage 55 ·
  flow_ui 6 · flow_smoke 194 (celkem **454** kontrol, 0 FAIL).

## 2026-09-25 — Paleta = přehled všech zkratek (bez cheatu), plochy souhrnně, menu bez odkazů na paletu/ukázky (nezakomitováno)

- **Paleta a Ukázky pryč z hamburger menu** (žádné „openPalette"/„openSamples" odkazy v NÁSTROJE).
- **Paleta (Ctrl+K) = plný přehled klávesových zkratek kromě cheatu** (20 příkazů), každý
  proveditelný: Zpět `Ctrl+Z`, Znovu `Ctrl+Y/Ctrl+Shift+Z`, Vybrat vše `Ctrl+A`,
  Smazat vybrané `Delete/Backspace`, Export SVG `Ctrl+S`, Paleta `Ctrl+K`, Ukázky `Alt+S`,
  Zaměřit `F`, Střed `Mezerník`, Přiblížit `+/−`, Zavřít `Esc`, RESET (bez zkratky).
- **Nové nekolizní zkratky rodiny `Ctrl+Alt+`** (bez konfliktů s prohlížečem v PWA):
  Nápověda `Ctrl+Alt+H`, O programu `Ctrl+Alt+I`, O autorovi `Ctrl+Alt+A`,
  Export JSON `Ctrl+Alt+J`, Import JSON `Ctrl+Alt+O`, Vymazat plochu `Ctrl+Alt+W`,
  MISE `Ctrl+Alt+M`, SPACE 1–5 `Ctrl+Alt+1…5` (nelze `Ctrl+1…5` — přepíná karty prohlížeče;
  `Ctrl+Alt+F1…` nejedou na čísla).
- **Plochy v paletě jediná položka** „Plochy · Ctrl+Alt+1–5" (`keepOpen`), Enter ji rozbalí na
  5 podpoložek + „‹ Zpět na přehled" (`paletteScope` main/spaces); plochy se v hlavním seznamu
  nikdy nevykreslují každá zvlášť.
- **Refaktoring klávesovnice pro testovatelnost:** vybrat vše → `selectAllBlocks()`,
  střed → `centerView()`; nové větve keydown pro `Ctrl+Alt+*`.
- **Nápověda:** sekce zkratek doplněna o `Ctrl+Alt+…` řadu a odkaz „vše v paletě Ctrl+K".
- **Testy:** `flow_smoke_tests.js` → **182** (z 173): +9 (20 příkazů palety, souhrn zkratek
  undo/redo/select/del/fit/zoom/esc/etc., plochy souhrnně – žádná položka `SPACE ` nahoře,
  menu bez openPalette/openSamples, Ctrl+Alt v keydown, rozbalení Ploch → 6 řádků + open,
  výběr SPACE 3, filtr export → 2).
- **Ověření:** syntax OK · flow_tests 39 · flow_check 70 · flow_game 90 · flow_storage 55 ·
  flow_ui 6 · flow_smoke 182 (celkem **442** kontrol, 0 FAIL).

## 2026-09-25 — Ukázky do modalu (Alt+S), paleta příkazů (Ctrl+K), RVP bez G, About +30 % šířky, POKRAČOVAT → další level (nezakomitováno)

- **Ukázky mimo hamburger menu:** sekce UKÁZKY se z `#side-menu` odstranila; nový samostatný
  modal **Výběr ukázky** (`#samples-modal`, 4 ukázky s popisem, `loadSample` beze změny chování),
  vyvolatelný **Alt+S** (`preventDefault`, nekoliduje se Ctrl+S/Ctrl+K/zoom/vstupem). Do menu
  přidán odkaz „Ukázky (Alt+S)". `renderSamples` plní `#samples-list`, žárovka 💡 → SVG.
- **Paleta (Ctrl+K, TACHI-style):** `#palette-modal` — hledací input (`onPaletteInput` filtruje),
  seznam 14 spustitelných příkazů se zkratkami (MISE, SPACE 1–5, Export SVG/JSON, Import,
  Vymazat plochu, Nápověda, O programu, O autorovi, RESET), ↑↓ + Enter (`paletteMove`/`paletteRun`/
  `paletteRunAt`), Esc zavře; zkratka `Ctrl+K` + odkaz v menu a v nápovědě.
- **RVP „G" je nekorektní → opraveno:** cíl jsou jen učební obory H + E/J (PLAN §0/§11),
  gymnázia NEJSOU cílem. O programu: „RVP G a SOŠ…" → „SOŠ — učebních oborů H a E/J
  (RVP SOV, neprogramátorské obory)". Nápověda: „Co si osvojíš (RVP G + SOŠ)" → „Co si osvojíš
  (SOŠ — obory H a E/J)". Testy hlídají nepřítomnost „RVP G"/„gymnáz".
- **O programu o 30 % širší na PC:** `#about-modal .modal-box` → `width: min(546px, 97vw)`;
  dotyková zařízení zůstávají `min(420px, 90vw)` (33vh přetrvává).
- **Výsledkový modal po úspěchu:**
  - nové tlačítko **SVG ŘEŠENÍ** (`result-svg-btn`) — vždy viditelné (i při opakovaném testu),
    stáhne `mXX-reseni.svg` přímo jedním klikem (žádný mezikrok); SVG = diagram + patička
    **OVĚŘENO · testy X/Y prošlo · mise — název · žák jméno · datum** (`buildSolvedSvg` →
    `getSvgContent(..., extraFooter)` rozšířen o 5. parametr a řádek v patičce);
  - **POKRAČOVAT = přejít přímo na další level** (`continueAfterLevel`): zavře výsledkový modal
    a otevře zadání další mise aktuálního profilu (`MISSIONS[profile]`); po poslední misi jen
    zavře + toast. Žák nemusí nic stahovat, aby mohl pokračovat.
  - STÁHNOUT JSON zůstává gated „první dokončení" (PLAN §8.4).
- **Nápověda:** zkratky Ctrl+K a Alt+S, ukázky „Alt+S", u hodnosti zmínka o stažení SVG.
- **Testy:** `flow_smoke_tests.js` → **173** (z 146): +27 (samples modal + Alt+S v keydown,
  paleta ≥13 příkazů/filtr/spuštění, výsledkový modal: SVG tlačítko, soubor m02-reseni.svg,
  OVĚŘENO + testy + jméno + datum, POKRAČOVAT m02→m03, poslední mise, RVP bez G, šířka 546px,
  Ctrl+K/Alt+S v nápovědě).
- **Ověření:** syntax OK · flow_tests 39 · flow_check 70 · flow_game 90 · flow_storage 55 ·
  flow_ui 6 · flow_smoke 173 (celkem **433** kontrol, 0 FAIL).

## 2026-09-25 — Start SPACE 1 + expirace na PC (90 min) + O programu/autorovi/MIT (nezakomitováno)

- **Start = explicitně SPACE 1:** `startupWorkspace()` — při startu se vždy načte SPACE 1;
  pokud je jako aktivní kontext uložený rozehraný level (MISE `m01..e6`), načte se příslušný
  level. Uložená plocha SPACE 2–5 se na novém startu ignoruje (resetuje na SPACE 1) a klíč
  aktivní plochy se přepíše na `space1`.
- **Expirace dat na PC (90 min):** `maybeExpirePcData(now)` — na nedotykovém zařízení
  (`isTouchDevice`: `navigator.maxTouchPoints` / `matchMedia('(pointer: coarse)')`) se při
  startu, když `blockflow_v3_last_active` je starší než `PC_SESSION_MS` (90 min), všechny
  uložené hodnoty vymažou (`clearAllAppData` — workspace klíče + hráč/profil/exporace) a hra
  začne znova; `noteLastActive()` se obnovuje i v autosave intervalu (3 s). Na mobilu/tabletu
  se **nikdy** automaticky nemažou — jen ručně červeným RESET.
- **O programu:** modal na PC roztažený (`max-height: 72vh`), na dotykových zařízeních zůstává
  kompaktní 33vh (`@media (hover: none), (pointer: coarse)`); odstraněno verzování
  („Verze jádra 1.5 / Codename CyberCanvas"); nově zvýrazněný blok **SPA (Single Page
  Application) — v jediném HTML souboru, MIT © 2026 Luděk Sušický**.
- **O autorovi:** bio „SŠ a VŠ učitel Informatiky — AI ve vzdělávání a vibecoding", pracovní
  odkazy barevně odlišené: Email (`mailto:` spustí poštovního klienta), X (@ludeksusicky),
  LinkedIn; licence MIT.
- **Licence v celé aplikaci sjednocena na MIT** (patička plátna, SVG export, O autorovi).
- **Nápověda:** nová sekce „Uložení a soukromí" (PC 90 min / mobil RESET, EXPORT/IMPORT)
  a „O aplikaci" (SPA, MIT).
- **Testy:** `flow_smoke_tests.js` +15 (start SPACE 1 vs obnova m02, expirace PC 90 min /
  mobil nikdy / čerstvé last_active, O programu bez verzování + SPA/MIT, autor mailto/X/LinkedIn,
  nápověda Uložení, patička i SVG = MIT, mobil 33vh).
- **Ověření:** syntax OK · flow_tests 39 · flow_check 70 · flow_game 90 · flow_storage 55 ·
  flow_ui 6 · flow_smoke 146 (celkem **406** kontrol, 0 FAIL).

## 2026-09-25 — UX balíček: ikonová tlačítka (SVG), jméno pro vstup do MISE, validace vstupu číslo/text (nezakomitováno)

- **Toolbar bez emoji/textu:** undo/redo = oblouková šipka v kroužku, IMPORT = šipka do
  zásobníku, EXPORT = šipka ze zásobníku, vymazat plochu = koš — vše SVG (stroke,
  `currentColor`, 24px viewBox), pouze ikony (`top-icon` 36px čtverec, ikona 18px, hover/disabled
  přes SVG). Tlačítko SVG exportu zůstává textové „SVG"; fullscreen `⛶ MAX` beze změny.
- **Klik na MISE nahoře vyžaduje jméno:** `selectWorkspace('campaign')` bez
  `Game.playerName` a bez `nameSkipped` otevře jmenný modal (`pendingCampaign=true`);
  po `submitName()` (jméno i „Zatím ne — bez jména") se vstoupí do MISE
  (`pendingCampaign=false`, `setMode('campaign')`); `doReset()` čistí `pendingCampaign`
  i `pendingLevel`. Vstup přes konkrétní misi v menu (gating `enterCampaignLevel`) beze změny.
- **Validace vstupu číslo vs text:** blok deklaruje typ — `n = vstup číslo` / `jmeno = vstup text`
  (též `zadej číslo`, `n = cislo`); bez deklarace = auto (zpětně kompatibilní). Číselný vstup
  odmítne text/čárku inline chybou a znovu se zeptá (čisté číslo, tečka). Nápověda uvnitř
  modalu (`#sim-input-hint`). Aritmetika přes text už není tichá: `++/--/+=/-=/*=//=/%`
  hlásí `[CHYBA TYPU]`, zastaví běh (`runtimeTypeError` → `lastSimStatus='error'`) místo
  tichého dosazení 0 (`parseVariable` → `requireNumber`/`toNumber`).
- **Rozměry modalů:** O programu = třetina obrazovky (`max-height: 33vh`, vnitřní scroll);
  Nápověda o 30 % širší a centrovaná (`width: min(1040px, 94vw)`); obecně `.modal-box`
  `margin:auto` + `max-height: calc(100vh − 48px)` + `overflow-y:auto` (mobil se posouvá).
- **Emoji v modalech → SVG:** help (📖)→kniha, about (ℹ️)→info, autor (👨💻)→uživatel,
  potvrzení (⚠️)→trojúhelník, level modal (▶/🧭/↻)→play/kompas/restart, výsledkový
  modal (⭳/▶)→download/play, import-review ⭳ odebráno, boční menu (📖/ℹ️/👨💻/🧹)→SVG.
  Nadpis nápovědy jen „Nápověda"; odstraněna help sekce „Témata (Streamer / Operátor)"
  a v O programu „dvě přepínatelná narativní témata" (PLAN §16); „6 herních stupňů" →
  „14 misí (8 H + 6 E/J)".
- **Start hry = SPACE 1:** `APPLES_SLOT = 'space1'` je výchozí plochou; konkrétní chování
  startu (výjimka rozehraný level + 90min expirace na PC) viz záznam výše.
- **Testy:** `flow_tests.js` +13 (deklarace typu vstupu, `[CHYBA TYPU]` pro `++`/`+=`,
  `toNumber`), `flow_smoke_tests.js` +20 (gating MISE přes `pendingCampaign`, SVG ikony
  podle zdroje HTML, absence starých emoji, validace vstupu číslo/text).
- **Ověření:** syntax OK · flow_tests 39 · flow_check 70 · flow_game 90 · flow_storage 55 ·
  flow_ui 6 · flow_smoke 131 (celkem **391** kontrol, 0 FAIL).

## 2026-09-25 — F4: restart mise + export/import JSON (úplný snímek) + migrace v1→v3 (nezakomitováno)

- **Restart mise** (`PLAN.md` §7.9, §7.10, §16): tlačítko **↻ RESTART MISE** v level
  modalu (`promptMissionRestart`, potvrzovací modal s textem „Vrátit tuto misi na začátek?
  Rozpracované řešení této mise bude nahrazeno."); `restartMission(id)` smaže **jen**
  `blockflow_v3_ws_<id>` aktuální mise, scaffold se postaví znovu (bloky bez spojů),
  pokus je nový (`levelFailed=false`, `lastSimStatus='untested'`) a řešení se znovu
  ověří (`runCheck(true)`); historie dokončení i značky (Zprovozněno/Ověřeno/Upraveno)
  zůstávají; jiné mise i SPACE plochy se restartu nedotýkají.
- **Export JSON = úplný snímek** (`buildSnapshot`): `schemaVersion: 3`, `contentVersion`,
  `savedAt` ISO 8601 + `savedTimeZone`, jméno nebo `null`, `activeContext`
  (mode/workspace/level), `missions`, `workspaces` (všechny sloty), `history.certificates`,
  `game.xp`; `saveProgress()` před exportem uloží poslední editaci; výchozí název
  `hefaistos-<profil>-postup-<datum>.json`; stahuje se jen vyžádáním (žádný auto-download).
- **Nabídka stažení po splnění mise:** `result-save-btn`/`result-offer-text` v výsledkovém
  modalu se ukáže **jen při prvním přechodu pokusu do dokončeného stavu** (`res.firstTime`);
  opakovaný úspěch nenabízí nic a nenásobí odměny (`completeLevel` tvoří certifikát a XP
  jen při `firstTime`).
- **Import JSON:** `parseImportData` rozliší full/legacy/invalid/diagram; `applySnapshot`
  nahrazuje až po potvrzení v novém `#import-review-modal` (⭳ NEJPRVE EXPORT / NAHRADIT /
  Zrušit), vrací počty obnovených ploch/misí, obnovuje jméno, profil, XP, certifikáty
  a aktivní kontext (aktivní level se znovu otevře zadáním, aktivní SPACE se otevře);
  neplatný soubor práci nepoškodí; starý v2 balík ploch (`{app:'blockflow-workspaces'}`)
  se načte jako diagramy s varováním.
- **Migrace klíčů v1→v3** (`migrateLegacyKeys`, volá se v `init()`): kopie
  `blockflow_v1_player/progress/profile/active`→v2/v3 a `blockflow_v1_ws_<slot>`→
  `blockflow_v3_ws_<slot>`, bezeztrátová, novější data mají přednost (přeskočí existující
  cíl); splňuje `PLAN.md` §7.9.
- **Robustnost pro headless testy:** guardy `fitToScreen` (null `canvasWrap`) a
  `renderArrows` (null `arrowsSvg`).
- **Testy:** `flow_storage_tests.js` +20 (F4 restart, snapshot, round-trip, invalid,
  legacy, migrace v1→v3), `flow_smoke_tests.js` +18 (F4 restart přes UI, nabídka stažení
  jen při prvním splnění, název exportu, přehled importu), `flow_test_utils.js` `makeApp`
  přidává override `toast`; sady `flow_game_tests.js` aktualizovány na certifikát bez
  zdvojení (90 OK).
- **Ověření:** syntax OK · flow_tests 26 · flow_check 70 · flow_game 90 · flow_storage 55 ·
  flow_ui 6 · flow_smoke 111 (celkem **358** kontrol, 0 FAIL).

## 2026-09-25 — F1: datový model m01–m08 + profily H/E_J, sloty misí, značky (nezakomitováno)

- **Migrace úplně dokončena:** zrušeny bloky `SCAFFOLDS`, `SOLUTIONS`, `NARRATIVES`
  a `DEFAULT_NARRATIVE` (−25 305 znaků); scaffolding, vzorová řešení i testy žijí
  inline v `MISSIONS` (`H: m01–m08`, `E_J: e1–e6`) s helperem `missionById`.
  Slot plochy = **id mise** (`CAMPAIGN_SLOTS`); `modeOf`/`currentLevel`/cheat/sber
  exportu přes stojné sloty. Zbývající odkaz `LEVELS` v kódu odstraněn.
- **Profily H/E_J místo NARRATIVES toggle:** `App.profile`, `setProfile`/`toggleProfile`
  (klíč `blockflow_v3_profile`, HUD role HEFAISTOS H/E_J, ikony ⚙/🛠). Přepnutí mění
  jen prezentaci menu, nikdy nepřepisuje práci a neoznačuje profil jako horší.
- **Jméno dobrovolné:** prázdné jméno → `null` (`isValidName` 0–30 znaků, `setPlayerName('')`),
  v exportu neblokuje; tlačítko „Zatím ne — bez jména“ (`submitName(true)` → `nameSkipped`).
- **Značky** Zprovozněno → Ověřeno → Upraveno (`Game.TAGS`, `setTag` jednosměrně):
  spuštění na KONEC → Zprovozněno, AUTO-kontrola → Ověřeno, úprava ověřené mise
  → Upraveno (`noteCampaignEdit` v addBlock/šipka/saveEdit/rotatePorts/toggleIOType/delete).
- **Oprava chyby:** `Game.completeLevel` přepisoval záznam úrovně a mazal zpětnou
  značku (`tag`) — nyní zachovává `...prev`.
- **Korekce dat misí:** m02 doplněno „požádat o zavření krytu“ + vektory dle trace;
  m06/e5 `krok <= n` → `krok < n` (shoda řešení s očekávaným výstupem `Doručeno: n`);
  m07 vektory = plný trace (načtení plánu jednou + `krok++`×n).
- **Testy přepsány na nový model:** `flow_check_tests.js` (MISSIONS, mix H+E_J, mise
  m08/e6 bez řešení/testů), `flow_game_tests.js` (8+6 misí, profily E_J persistence,
  jméno dobrovolné, značky), `flow_smoke_tests.js` (init, 19 ploch = 5×SPACE + 14 misí,
  profil přepnutí, přeskočení jména, cheat na m04), sdílený util exportuje `MISSIONS`.
- **Ověření:** syntax OK · flow_tests 26 · flow_check 70 · flow_game 90 · flow_storage 10 ·
  flow_ui 6 · flow_smoke 93 (celkem **295** kontrol, 0 FAIL).

## 2026-09-25 — F2: Checker v2 — skutečné události, jeden engine (nezakomitováno)

- **Checker (`App.runCheckVector`):** přidáno sledování **skutečných událostí běhu** —
  `execCounts` (kolikrát proběhla operace), `loopsRun` (alespoň jedno vykonání smyčky),
  `ops` (počet vykonaných operací) a `reachedEnd` (dosažení bloku KONEC). Vše vraceno
  ve výsledku vektoru.
- **Nová pole testovacích vektorů** (zpětně kompatibilní — staré vektory fungují beze změny):
  - `counts: {label: n}` — operace `label` musí proběhnout **přesně n×** (cyklus neprojde
    pouhým vypsáním očekávané věty bez provedení výrobní operace);
  - `requireLoop: true` — běh musí aspoň jednou projít smyčkou;
  - `maxOps: n` — limit efektivity (vykonané operace ≤ n, pro m07 efektivita = operace).
- **Oprava vyčerpání zásoby vstupů (m05):** při vyčerpání sekvence VSTUPů se dřív
  opakovala poslední hodnota → nyní konkrétní chyba „Došly testovací vstupy“ místo
  výroby dalších umělých hodnot.
- **Dosažení KONCE je povinné:** běh, který opustí tok bez návštěvy bloku `end`
  (např. šipka do prázdna), skončí chybou „Program nepřišel k bloku KONEC“.
- **Sjednocení sémantiky POZNÁMKY (ruční simulace = Checker):** ruční běh dřív
  `break`oval tok na bloku poznámky → nyní poznámku nepřeruší běh (loguje
  `[POZNÁMKA]` přes novou `.log-note` barvu konzole) a pokračuje dál; Checker už
  poznámku přeskočí a nevyvolává zacyklení — oba režimy dávají stejný výsledek
  (poznámka nemění algoritmus). Stejně jako operace volání se poznámka **nepočítá**
  do `ops` ani `trace`.
- **Testy:** `flow_check_tests.js` rozšířen o `[V2]` sekce: counts splněno/nesplněno,
  requireLoop (vypsání čísla bez smyčky selže), maxOps (efektivita), vyčerpání zásoby
  (stačí/vyčerpána), povinné dosažení KONCE, poznámka v toku (přeskočí se + nepočítá
  se do operací), hranice cyklu 0/1/více (`krok<=n` vs `krok<n`).
- **Ověření:** syntax OK · flow_tests 26 · flow_check 53 · flow_storage 10 · flow_ui 6 ·
  flow_game 73 · flow_smoke 85 (celkem **253** kontrol, 0 FAIL).

## 2026-09-25 — PLAN.md V2.2: integrace zadání učebních oborů (H/E_J)

- **Sloučeno** závazné zadání učebních oborů do `PLAN.md` (verze 2.2): RVP cíl
  **pouze H (8 misí m01–m08) + E/J (6 misí 1–6 bez mezer)**, gymnázia/maturitní obory mimo cíl.
- **§0** tabulka rozhodnutí, **§1** story HEFAISTOS (servisní loď + robot ŠROUB), **§2**
  architektura + `MissionState` (openMission/openAssignment/initializeMission/restartMission/
  saveProgress/exportProgress/importProgress), **§3** mise m01–m08 + schéma, **§4** vzor m04,
  **§5** Checker (události, jeden engine, VOLÁNÍ mimo povinnou cestu, efektivita = operace),
  **§6** Kompas/Ladička (názorná ukázka po neúspěchu povolena), **§7–§10** režimy/plochy,
  restart mise, export JSON úplný snímek, certifikát fakultativní, textová politika HEFAISTOS.
- **§11** RVP SOV H (příloha 2b) + E/J (příloha 1b) + podkladové odkazy; **§12.2** testovací sada
  aktualizovaná (flow_check, restart mise, profily, self-test m01–m08); **§13** fáze F1–F9 dle nové
  specifikace; **§14** DoD + **§14.1 všech 19 akceptačních scénářů** ze zadání; **§15** rozhodnutí
  (jméno dobrovolné, restart mise, auto-reset 3 h zrušen, bez NARRATIVES toggle, značky
  Zprovozněno/Ověřeno/Upraveno); **§16** kompletní obsah m01–m08 + varianty E/J + dobrovolná dílna.
- **Smazán** redundantní `code-flowchart-zadani-ucebni-obory.md` (obsah plně integrován do PLAN.md).
- **AGENTS.md** aktualizován na nové zadání (profily H/E_J, 8+6 misí, restart mise, bez 3 h
  auto-resetu, bez NARRATIVES toggle, klíče ploch v2/v3).
- Bez změny kódu hry — čeká na schválení plánu V2.2 a fází F3+.

## 2026-09-24 — F1: dokončení mise, modaly, příběh stupně, RVP SOŠ (nezakomitováno)

- **Dokončení mise → hvězdy:** úspěšný běh v MISE nyní volá `App.onLevelSuccess()` →
  `Game.completeLevel` (bonusy `noHint`/`firstTry`/`efficient` dle nápovědy a pokusů),
  aktualizuje HUD i menu (hvězdy se konečně načtou) a otevře výsledkový modal.
  Neúspěšný běh (`lastSimStatus === 'error'`) nastaví `levelFailed` (ruší `firstTry`).
  Sledováno `levelHintUsed` (Kompas) a `levelFailed`, reset při `enterCampaignLevel`.
- **Potvrzení v herním designu:** `window.confirm` nahrazen vlastním `#confirm-modal`
  (`App.openConfirm/closeConfirm/confirmYes`) — použito při přepisu plochy ukázkou.
- **Výsledkový modal mise:** `#level-result-modal` (hvězdy, XP, hodnost, celkem ★/XP).
- **Příběh stupně (`story`):** všechny stupně v obou tématech mají `story` („co budeš
  dělat") — zobrazí se v modalu mise jako „Co budeš dělat"; přidán i pokyn
  „Přesuň a propoj" (bloky jsou rozházené).
- **Text v modalech zvětšen o 50 %** (`.modal-box`, h3, p, labely, help-itemy, tlačítka).
- **RVP cíl upraven:** SOŠ = **neprogramátorské obory** (ne specializace ICT 18-20-M/01);
  §11/§11.1 přepsány, pole/funkce s návratem označeny jako mimo cíl.
- **Testy:** syntax OK · flow_tests 21 · flow_game 73 · flow_storage 10 · flow_ui 6 ·
  flow_smoke **85** (celkem **195**). Nové: `onLevelSuccess` + hvězdy v menu, `story`
  v modalu, herní confirm, dokončení správné mise (ne stale `activeLevel`).

### Audit integrity po úpravách (2026-09-24)

- `node syntax_check.js` OK; **všech 51 `getElementById` refů v `dom` existuje** v HTML,
  žádné duplicitní `id`; `<div>` tagy vyvážené (185/185), CSS závorky vyvážené (0),
  1 `<script>` blok, žádné `window.confirm` volání (jen v popiscích).
- **Nalezená a opravená poškození / vady:**
  1. `onLevelSuccess` používal `this.activeLevel` → při přímém přepnutí na jiný
     stupeň by se dokončila **špatná mise**. Opraveno na `currentLevel().id` + test.
  2. Modál mise slíboval „AUTO-kontrola na N skrytých vektorech", ale `Checker` je
     **F2 a neexistuje** — lhotivý text nahrazen skutečným („Spusť program tlačítkem
     ▶ — musí dojít do KONCE bez chyby") + regresní test.
  3. `#level-body`/`#level-kompas` neměly scroll → po zvětšení textu o 50 % se obsah
     mohl useknout. Doplněn `overflow-y: auto` a `max-height: 90vh` na modal.
  4. Zvětšené texty v tlačítkách (19 px) → riziko přetékaní úzkých modalů; doplněno
     `.btn-row { flex-wrap: wrap }` + `min-width: 0`.
  5. Testy rozbily pořadí smyčky (`activeWorkspace` ručně) → přesun na konec souboru,
     stav se obnovuje přes `switchWorkspace`.
- **Známé omezení F1:** úspěch = běh došel do KONCE bez chyby; **správnost výsledku
  proti testovacím vektorům zatím nekontroluje** (to je F2 `Checker`).

## 2026-09-24 — F1 UI + narativ (nezakomitováno)

- **Narativní témata (přepínatelná):** `NARRATIVES` = `streamer` (výchozí, Gen Alfa)
  a `operator` (původní sklad, pro obory E). Ikona v horním panelu (`🎮`/`🏭`,
  `toggleNarrative`) mění názvy stupňů, cíle, Kompas, texty bloků, hodnosti a HUD;
  algoritmus úloh (typy, porty, šipky) zůstává. Persistence `blockflow_v3_narrative`.
  `setNarrativeData()` aplikuje téma i při načtení (mimo `init`, bez DOM).
  Při přepnutí v MISE se level restartuje (jiné texty bloků).
- **Výchozí plocha = SPACE 1 (jablka demo):** `activeWorkspace` default `APPLES_SLOT`
  (dřív `lvl1`); program nezačíná na levelu.
- **Rebrand:** „BlockFlow" → **„CodeFlowChart"** (titulek, logo, terminál, nápověda,
  export filenames, SVG/patička, paste attribut `data-codeflowchart`). Interní klíče
  `blockflow_*` v localStorage ponechány (změna by zahodila data).
- **Menu — stejná velikost textu:** `.menu-section-title` i `.menu-mission` na 13 px.
- **Šipky:** hrot ve tvaru **ocásku vlajky** (výstřih 25°, `polygon 18 8, 1 0, 4.73 8,
  1 16`) a `markerUnits="userSpaceOnUse"` → **hrot se nezvětšuje** při hoveru/highlightu
  (dřív scaling dle `stroke-width`). Aplikováno i na SVG export (`#ah`).
- **Prázdné plochy (SPACE 2–5):** modul Start se po `fitToScreen` ukotví do **horní
  třetiny** (`vy` kotva `wrapH/3` při jediném bloku), ne na střed.
- **Ukázky (SAMPLES):** nová sekce **UKÁZKY** v menu — 4 hotové diagramy
  (Ahoj světe, Obsah kruhu, Součet 1..N, FizzBuzz 1..N) se načtou do plochy
  (`loadSample`/`buildSample`, přepis s potvrzením). Inspirace pro vlastní tvorbu.
- **Nápověda + O programu:** doplněny sekce Mise/hvězdy/hodnosti, Plochy a ukázky,
  Témata, „Co si osvojíš (RVP G + SOŠ ICT)"; About nově zmiňuje 6 stupňů, témata,
  ukázky a RVP pokrytí. Verze jádra 1.5.
- **Testy:** syntax OK · flow_tests 21 · flow_game 73 · flow_storage 10 · flow_ui 6 ·
  flow_smoke 69 (celkem 179 kontrol). Přidány testy přepnutí témat (data i UI),
  `SAMPLES` a načtení ukázky přes menu.

## 2026-09-24 — F1 (nezakomitováno)

- **F1: herní vrstva + data stupňů + pracovní plochy + vstup do mise** (`PLAN.md` §13, §16).
- **`Game` modul:** jméno (validace 1–30 znaků), XP, hodnost, hvězdy, certifikát;
  persistence `blockflow_v2_player` / `blockflow_v2_progress`; `completeLevel` +
  bonusy (`noHint +20 %`, `prvniPokus +15 %`, `efektivni +10 %` — jen pozitivně);
  `reset()`. Kumulativní XP roste jen při prvním splnění stupně.
- **`LEVELS`:** všech 6 stupňů z `PLAN.md` §16 (název, cíl ≤ 15 slov, bloky, `xpBase`,
  RVP, Kompas 4 stupně, testovací vektory) + `scaffold` (rozhozené nepropojené moduly).
- **Plochy per level:** slot `lvl1…lvl6`; klíče `blockflow_v3_ws_<slot>`,
  aktivní `blockflow_v3_active_ws`. Návrat k misi zachová rozdělanou práci.
  (Bump v2→v3 zahodil staré uložené stavy, které měly propojené šipky.)
- **Přepínač ploch v horní liště:** `MISE · SPACE 1–5` (aktivní zvýrazněn,
  `selectWorkspace`); hamburger menu už obsahuje jen MISE + NÁSTROJE.
- **SPACE 1** = jablka demo (bývalý VOLNÝ); **SPACE 2–5** = prázdné plochy
  pro vlastní tvorbu (bývalý PROFI + 3 nové).
- **Scaffolding v levelech:** **NEpropojené** moduly rozhozené po ploše (zamíchaná
  řídká 2D mřížka + jitter, ne pod sebou), spojení si žák vytváří sám.
- **Export/import (JSON):** jediná dvojice `⭳ EXPORT` / `⭱ IMPORT` uloží/načte
  **všechny plochy** (`{app:'blockflow-workspaces', active, workspaces:{slot:stav}}`);
  samostatné `WS` tlačítka zrušena jako nadbytečná.
- **Jméno:** modál se ptá až při prvním kliknutí na level v menu (ne při startu
  ani při přepnutí na MISE); po zadání se už neptá (až do RESETu).
- **Vstup do mise:** klik v menu → `switchWorkspace('lvlN')` → vykreslí se scaffolding
  (`buildLevelScaffold`) → **level modal** s Typem, Cílem, „Co máš udělat", povolenými
  bloky, ověřením + tlačítko **Kompas** (Cíl/Háček/Postup).
- **Omezená paleta:** toolbar se filtruje podle `level.blocks` (`applyPalette`).
- **UI:** HUD operátora (jméno/hodnost/XP/hvězdy), menu MISE/NÁSTROJE,
  jmenný modál (povinné jméno v MISE), červené RESET s potvrzením.
- **Oprava:** zrušen plovoucí kampaňový panel, který překrýval hamburger menu.
- **Oprava šipek:** `renderAll` plátno vždy překreslí čistě (žádné stale handlery
  při přepnutí plochy/levelu → šipky i tahání bloků se chovají stejně jako sample);
  cheat po každém kroku volá `fitToScreen()`.
- **Cheat pro testování:** `Ctrl+Alt+C` (s aktivním CapsLockem) v MISE vyřeší
  level krok za krokem ze vzorového řešení (`SOLUTIONS` pro všech 6 stupňů):
  každý stisk přidá další blok/šipku; po dokončení další stisk vyčistí plochu.
  Slouží k rychlému otestování libovolného levelu a jeho simulace.
- **Testy:** `flow_game_tests.js` (59 OK) + `flow_smoke_tests.js` (55 OK, `App.init()`
  nad DOM mockem); `flow_test_utils.js` rozšířen o `Game`/`LEVELS`; persistence testy
  přepsány na slot-klíče v3.
- **Doladění (playtest):**
  - **Rebrand:** „BlockFlow" → **„CodeFlowChart"** (titulek, logo, terminál, nápověda,
    export filenames, SVG/patička, paste attribut `data-codeflowchart`). Interní klíče
    `blockflow_*` v localStorage ponechány (změna by zahodila data).
  - **Menu — stejná velikost textu:** `.menu-section-title` i `.menu-mission` srovnány
    na 13 px (dřív 10/12/13 px).
  - **Stupeň 4 přepracován:** „Sběrač jablek 2.0" → **„Kontrola kvality"** — podmíněný
    cyklus `ok < 2` + počítadla (`ok`, `sken`), místo počítání dvou barev jablek.
    Aktualizováno `LEVELS[4]`, `SOLUTIONS[4]`, `SCAFFOLDS[4]`, `PLAN.md` §4/§16.4.
  - **Validace prázdného vstupu:** simulační VSTUP i editace bloku odmítnou prázdný
    text s inline chybou (dřív se prázdný vstup tiše uložil jako `""`).
  - **Efekt při spuštění ▶:** světelný scan + glow přes plátno (`#canvas-wrap.sim-boot`,
    respektuje `prefers-reduced-motion`).
  - **RESET** v menu i modálu přejmenován na „RESET" (bez „smazat vše").
- **Ověření:** syntax OK · flow_tests 21 · flow_game 59 · flow_storage 10 · flow_ui 6 ·
  flow_smoke 55 (celkem 151 kontrol). Verifikace F1 „3 mise → XP i certifikát" splněna.
- **Pozn.:** vlastní vyhodnocení misí (Checker/OVĚŘIT) = F2; doladění obsahu
  scaffoldingů = F5/F6; auto-reset 3 h = F4; SVG certifikát = F8.

## 2026-09-24 — F0 (commit `ec8c50d`)

- **F0: revize funkčnosti jádra** (TACHI-style audit + testovací sada) — `PLAN.md` §12.
- **Fix — VÝSTUP `{var}`:** složené závorky zůstávaly ve výstupu. Nový `App.replaceVars()`
  podporuje `{var}` i holé `var`, hodnotu vkládá funkcí (bezpečné i pro `$` ve hodnotě).
- **Fix — parser:** samostatný `var.push(...)` byl tiše přeskakován (řádek bez operátoru).
- **Fix — tiché chyby:** `catch(e){}` v `parseVariable` nyní hlásí `[CHYBA VÝRAZU]`.
- **Fix — bezpečnost (XSS):** konzole i Visual RAM přes `textContent` místo `innerHTML`;
  typový efekt konzole zrušen (okamžitý text, dle `PLAN.md` §7.5).
- **Fix — nekonečná smyčka:** detekce podle opakování stavu (blok + obsah RAM),
  ne podle 5000 průchodů; navíc celkový strop kroků (`MAX_TOTAL_STEPS`).
- **Fix — tablet:** porty trvale viditelné na dotykových zařízeních (`@media (hover: none)`).
- **Testy zavedeny:** `syntax_check.js`, `flow_tests.js`, `flow_storage_tests.js`,
  `flow_ui_tests.js`, sdílený `flow_test_utils.js`.
- **Ověření:** syntax 1/1 OK · `flow_tests` 21/21 OK · `flow_storage_tests` 10/10 OK ·
  `flow_ui_tests` 6/6 OK (celkem 37 kontrol). `code-flowchart.html` +74/−36 řádků.
