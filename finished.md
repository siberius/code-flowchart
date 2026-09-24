# finished.md — BlockFlow EDU (code-flowchart)

Archiv dokončených úkolů (nejnovější nahoře). Formát dle `MASTER-AGENTS.md` §14.

## 2026-09-24 — F1 (nezakomitováno)

- **F1: herní vrstva + data stupňů + pracovní plochy + vstup do mise** (`PLAN.md` §13, §16).
- **`Game` modul:** jméno (validace 1–30 znaků), XP, hodnost, hvězdy, certifikát;
  persistence `blockflow_v2_player` / `blockflow_v2_progress`; `completeLevel` +
  bonusy (`noHint +20 %`, `prvniPokus +15 %`, `efektivni +10 %` — jen pozitivně);
  `reset()`. Kumulativní XP roste jen při prvním splnění stupně.
- **`LEVELS`:** všech 6 stupňů z `PLAN.md` §16 (název, cíl ≤ 15 slov, bloky, `xpBase`,
  RVP, Kompas 4 stupně, testovací vektory) + `scaffold` (předpřipravené moduly).
- **Režimy:** KAMPAŇ / VOLNÝ (jablka) / PROFI — přepínání v hamburger menu
  (`setMode`), aktivní režim zvýrazněn, topbar tlačítko otevírá menu.
- **Plochy per level:** slot `lvl1…lvl6`, `free`, `profi`; klíče `blockflow_v2_ws_<slot>`,
  aktivní `blockflow_v2_active_ws`. Návrat k misi zachová rozdělanou práci.
- **Přepínač ploch v horní liště:** `KAMPAŇ · VOLNÝ · PROFI · SPACE 1–3` (aktivní
  zvýrazněn, `selectWorkspace`); hamburger menu už obsahuje jen MISE + NÁSTROJE.
- **SPACE 1–3:** prázdné plochy pro vlastní tvorbu (`space1…space3`).
- **Export/import ploch (JSON):** `⭳ WS` / `⭱ WS` — všechny plochy
  (`{app:'blockflow-workspaces', active, workspaces:{slot:stav}}`); IMPORT/EXPORT
  zůstává pro jednu plochu.
- **Vstup do mise:** klik v menu → `switchWorkspace('lvlN')` → vykreslí se scaffolding
  (`buildLevelScaffold`) → **level modal** s Typem, Cílem, „Co máš udělat", povolenými
  bloky, ověřením + tlačítko **Kompas** (Cíl/Háček/Postup).
- **Omezená paleta:** toolbar se filtruje podle `level.blocks` (`applyPalette`).
- **UI:** HUD operátora (jméno/hodnost/XP/hvězdy), sekce menu REŽIM/MISE/NÁSTROJE,
  jmenný modál (povinné jméno v KAMPAŇI), červené RESET s potvrzením.
- **Oprava:** zrušen plovoucí kampaňový panel, který překrýval hamburger menu.
- **Cheat pro testování:** `Ctrl+Alt+C` (s aktivním CapsLockem) v KAMPAŇI vyřeší
  level krok za krokem ze vzorového řešení (`SOLUTIONS` pro všech 6 stupňů):
  každý stisk přidá další blok/šipku; po dokončení další stisk vyčistí plochu.
  Slouží k rychlému otestování libovolného levelu a jeho simulace.
- **Testy:** `flow_game_tests.js` (58 OK) + `flow_smoke_tests.js` (44 OK, `App.init()`
  nad DOM mockem); `flow_test_utils.js` rozšířen o `Game`/`LEVELS`; persistence testy
  přepsány na slot-klíče v2.
- **Ověření:** syntax OK · flow_tests 21 · flow_game 58 · flow_storage 10 · flow_ui 6 ·
  flow_smoke 44 (celkem 139 kontrol). Verifikace F1 „3 mise → XP i certifikát" splněna.
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
