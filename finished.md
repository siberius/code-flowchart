# finished.md — BlockFlow EDU (code-flowchart)

Archiv dokončených úkolů (nejnovější nahoře). Formát dle `MASTER-AGENTS.md` §14.

## 2026-09-24 — F1 (nezakomitováno)

- **F1: herní vrstva + data stupňů + pracovní plochy** (`PLAN.md` §13, §16).
- **`Game` modul:** jméno (validace 1–30 znaků), XP, hodnost, hvězdy, certifikát;
  persistence `blockflow_v2_player` / `blockflow_v2_progress`; `completeLevel` +
  bonusy (`noHint +20 %`, `prvniPokus +15 %`, `efektivni +10 %` — jen pozitivně);
  `reset()`. Kumulativní XP roste jen při prvním splnění stupně.
- **`LEVELS`:** všech 6 stupňů z `PLAN.md` §16 (název, cíl ≤ 15 slov, bloky, `xpBase`,
  RVP, Kompas 4 stupně, testovací vektory).
- **Pracovní plochy:** WS1 KAMPAŇ (learning mode), WS2 VOLNÝ (jablka demo, přemístěno
  z indexu 0 na 1), WS3 PROFI. Přepínač zobrazuje režim.
- **UI:** HUD operátora (jméno/hodnost/XP/hvězdy), kampaňový panel se 6 misemi,
  jmenný modál (povinné jméno v KAMPAŇI), červené RESET s potvrzením v menu.
- **Testy:** `flow_game_tests.js` (53 OK) + `flow_smoke_tests.js` (22 OK, `App.init()`
  nad DOM mockem); rozšířen `flow_test_utils.js` o `Game`/`LEVELS`.
- **Ověření:** syntax OK · flow_tests 21 · flow_game 53 · flow_storage 10 · flow_ui 6 ·
  flow_smoke 22 (celkem 112 kontrol). Verifikace F1 „3 mise → XP i certifikát" splněna.
- **Pozn.:** načtení scaffoldingu/testů do plátna = F5/F6; auto-reset 3 h = F4;
  SVG certifikát = F8.

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
