# CodeFlowChart HEFAISTOS (code-flowchart) — výuková hra (algoritmizace, vývojové diagramy)

Výukový editor a simulátor vývojových diagramů v jediném `code-flowchart.html`
(SPA, žádný build) pro žáky 15–19 let (učební obory H + podpůrná cesta E/J).
Hra učí základní algoritmy zábavnou formou (servisní loď HEFAISTOS, robot ŠROUB).
Řídící dokument přestavby:
`PLAN.md` (verze 2.2 — analýza, návrh, obsah misí m01–m08 + variant E/J,
revize funkčnosti F0–F9).

## Nadřazená pravidla — POVINNÉ ČTENÍ
Žádná pravidla v tomto souboru NEJSOU náhradou za nadřazené dokumenty.
Před jakýmkoliv rozhodováním nebo první úpravou přečti:
1. `/home/lu/Dokumenty/aicoding/MASTER-AGENTS.md` — pracovní jádro aicoding
   (hranice, provedení, kontext/routování, git/verifikace/dokončení).
   Mapa projektů a operace: `governance/PROJECT-MAP.md` a `governance/PROJECT-OPERATIONS.md`.
2. `/home/lu/Dokumenty/aicoding/governance/REFLECT-AUDIT.md` — procesní audit,
   kterým se řídíme od 2026-09-06 (mód „reflect-audit").
Obsah nadřazených souborů je závazný a přebíjí tento soubor; při konfliktu
pravidel platí přísnější.

Pro vzdělávací obsah navíc: `md-skills/vzdelavaci-metodiky.md` (RVP/ŠVP, CZ).

## Projektová pravidla

### Architektura
- Celá hra v jediném `code-flowchart.html` (vanilla JS, inline CSS/UI).
  **Žádný module systém, žádný build, žádné závislosti** — hra musí fungovat
  čistě z lokálního `code-flowchart.html`.
- **Bez serveru a bez telemetrie** — žádné sbírání dat o žákovi; jediným
  výstupem je certifikát (odevzdávka), který si žák stahuje sám.
- Řádky citované v `PLAN.md` se průběžně posouvají — před každým zásahem
  ověřit aktuální čísla.

### Železná pravidla hry (z `PLAN.md`)
1. **SPA beze změny** — vše zůstává v jednom HTML souboru.
2. **Nic se neodstraňuje bez náhrady** — každý efekt/funkce zůstává stejně
   dobrý nebo lepší (`PLAN.md` §1.3); kód se nemění, dokud zadavatel neschválí fázi.
3. **Žák se vždy dobere k řešení sám** — Kompas (4 stupně) + Ladička;
   po neúspěšných pokusech smí dostat názornou ukázku (žádná tvrdá blokáda „nikdy neprozradit").
4. **Pouze pozitivní motivace** — nápověda nic nestojí, XP se nikdy neodečítá;
   značky **Zprovozněno → Ověřeno → Upraveno** odpovídají skutečné činnosti.
5. **Jeden vykonávací model** — animovaný běh = krokování = automatické testy;
   a **adiktivita = kognitivní přívětivost** (hra láká dokončit, nestresuje).

### Rozhodnutí zadavatele (závazná — `PLAN.md` §0 a §15)
- **Jeden HTML soubor**; learning mode (MISE) má **jméno dobrovolné** (1–30 znaků,
  `null` v exportu neblokuje); volný režim (SPACE 1 – jablka + SPACE 2–5) jméno nevyžaduje.
- **8 misí H (m01–m08) + 6 navazujících misí E/J (1–6 bez mezer, interní ID stabilní)**;
  každá mise ≤ 45 min po zaučení; 5–8 aktivních bloků, 2–3 testovací vektory, cíl ≤ 15 slov.
- **Restart mise (potvrzený)** jen pro aktuální misi/profil; kliknutí na level vždy otevře
  **modal zadání** a nikdy nepřepíše rozpracovanou práci; pokrok mezi hodinami se zachovává
  (localStorage + export JSON). **Expirace dat:** na PC se hodnoty po **90 minutách nečinnosti**
  automaticky vymažou; na mobilu/tabletu se nikdy nemažou automaticky — jen ručně červeným
  RESET (celkové vymazání).
- **Export JSON = úplný snímek** (všechny mise + všechny SPACE + aktivní kontext + jméno/`null`
  + `savedAt` datum/čas); po splnění mise nabídka stažení; opakovaný test nenásobí odměny ani nabídku.
- **Bez odznaků** — jen značky Zprovozněno/Ověřeno/Upraveno (+ volitelně XP/hvězdy/hodnost
  vázané na doložené dokončení); certifikát SVG **fakultativní** (jméno, datum, čas).
- Oba režimy simulace: ruční „žák = procesor" i AUTO-kontrola (skryté vektory) — **jeden engine**.
- **Profil H vs E_J:** přepnutí neoznačuje profil jako horší a **nepřepisuje práci**; nezávisle
  se mění pouze prezentace. **Bez NARRATIVES toggle** (dualita streamer/operator zrušena,
  `PLAN.md` §16). Program startuje na SPACE 1.

### Konvence a mantinely
- UI texty a komentáře v aplikaci jsou česky; kód, identifikátory a názvy
  funkcí anglicky.
- Přestavba se řídí fázemi F0→F9 z `PLAN.md` §13; kritéria §14 a rozhodnutí
  §0/§15 jsou závazná. Historické návrhy nepřebírat automaticky jako nový úkol.
- Před jakoukoliv změnou kódu musí být plán schválen; kód se nemění, dokud
  zadavatel neschválí příslušnou fázi.

## Spuštění / testy
- Hra běží offline přímo z `code-flowchart.html` (SPA, bez build kroku).
- **Revize funkčnosti (TACHI-style, `PLAN.md` §12) — zavedeno ve F0:**
  - `node syntax_check.js` — syntaxe inline `<script>` bloků.
  - `node flow_tests.js` — jádro: parser, VÝSTUP `{var}`, literály v uvozovkách, porty ANO/NE/TĚLO/KONEC,
    runaway smyčka, bezpečnost konzole/RAM, deklarace typu vstupu (text/číslo), aritmetika přes text = `CHYBA TYPU`.
  - `node flow_check_tests.js` (F2) — Checker: evaluátor podmínek, `runCheckVector` (události/`counts`/`requireLoop`/`maxOps`, vyčerpání zásoby vstupů, povinné dosažení KONCE, poznámka v toku), mapování literálů/var.
  - `node flow_storage_tests.js` (F4) — persistence (save/load workspace), migrace klíčů v1→v3,
    restart mise (jen aktuální mise, historie zůstává), export = úplný snímek (schemaVersion/savedAt/jméno‑null),
    import full/legacy/invalid (round-trip, neplatný soubor nepoškodí), okrajové stavy.
  - `node flow_ui_tests.js` — viewport, responzivní breakpoint, tablet porty bez hoveru.
  - `node flow_game_tests.js` (F1) — herní vrstva: `MISSIONS` data (8× H m01–m08 + 6× E_J e1–e6), jméno (dobrovolné), XP bonusy,
    značky Zprovozněno→Ověřeno→Upraveno, `completeLevel` + certifikát (bez zdvojení odměn), profily, persistence, restart mise, `SAMPLES`.
  - `node flow_smoke_tests.js` (F1/F4) — UI smoke: `App.init()` + HUD/mise/jméno/restart
    nad bohatým DOM mockem, 19 ploch (5× SPACE + 14 misí = sloty m01..e6), menu ukázek + `loadSample`,
    story v modalu mise, volitelné jméno (přeskočit), `onLevelSuccess` (značky do menu), herní confirm modal,
    F4 restart přes UI (potvrzený modal), nabídka stažení JSON (jen při prvním přechodu do dokončeného stavu),
    přehled importu (open/cancel, pendingImportSnapshot),
    UX: vstup do MISE přes jméno (MISE top + `pendingCampaign`), SVG ikony toolbaru bez emoji, validace vstupu číslo/text,
    start = SPACE 1 (obnova rozehraného levelu), expirace na PC (90 min nečinnosti, mobil nikdy), O autorovi/O programu/nápověda (zdroj HTML), MIT licence,
    ukázky v samostatném modalu (Alt+S, mimo menu, mimo hamburger), paleta (Ctrl+K, spustitelná s hledáním,
    20 příkazů = všechny zkratky kromě cheatu + Ctrl+Alt+H/I/A/J/O/W/M a Ctrl+Alt+1–5, plochy SPACE v jedné
    položce s rozbalením), výsledkový modal: SVG řešení s OVĚŘENO/testy/jméno + POKRAČOVAT → další mise.
  - Sdílený `flow_test_utils.js` (načtení `App` + `Game` + `MISSIONS` + `SAMPLES` z inline `<script>` v Node).
  - **Dev cheat:** `Ctrl+Alt+C` s aktivním CapsLockem v MISE vyřeší aktuální
    level krok za krokem ze vzorového řešení (per-mise `solution` v `MISSIONS`); jen pro testování.
  - Plánováno (F7/F9): plný browser matrix 1440/1024/390/320 px, `prefers-reduced-motion`,
    self-test misí m01–m08 pro oba profily (až vzniknou).
- Po každé změně ověřit přiměřeně riziku (MASTER „Git, verification and completion");
  dokončené úkoly eviduj v `finished.md` (formát dle MASTER completion + `governance/PROJECT-OPERATIONS.md` changelog).
