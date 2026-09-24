# finished.md — BlockFlow EDU (code-flowchart)

Archiv dokončených úkolů (nejnovější nahoře). Formát dle `MASTER-AGENTS.md` §14.

## 2026-09-24 — F0 (nezakomitováno)

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
