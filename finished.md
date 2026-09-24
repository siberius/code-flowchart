# finished.md — CodeFlowChart EDU (code-flowchart)

Archiv dokončených úkolů (nejnovější nahoře). Formát dle `MASTER-AGENTS.md` §14.

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
- **Testy:** syntax OK · flow_tests 21 · flow_game 68 · flow_storage 10 · flow_ui 6 ·
  flow_smoke 64 (celkem 169 kontrol). Přidány testy přepnutí témat (data i UI).

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
