# finished.md — CodeFlowChart HEFAISTOS (code-flowchart)

Archiv dokončených úkolů (nejnovější nahoře). Formát dle `MASTER-AGENTS.md` §14.

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
