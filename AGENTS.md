# BlockFlow EDU (code-flowchart) — výuková hra (algoritmizace, vývojové diagramy)

Výukový editor a simulátor vývojových diagramů v jediném `code-flowchart.html`
(SPA, žádný build) pro žáky 15–19 let. Hra učí základní algoritmy zábavnou
formou (cyberpunková linka „Operátor déčku"). Řídící dokument přestavby:
`PLAN.md` (verze 2.1 — analýza, návrh, obsah 6 stupňů, revize funkčnosti F0–F9).

## Nadřazená pravidla — POVINNÉ ČTENÍ
Žádná pravidla v tomto souboru NEJSOU náhradou za nadřazené dokumenty.
Před jakýmkoliv rozhodováním nebo první úpravou přečti:
1. `/home/lu/Dokumenty/aicoding/MASTER-AGENTS.md` — centrální dashboard
   (mapa projektů, seznam hlavních MD souborů, globální pravidla).
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
   dobrý nebo lepší (`PLAN.md` §1.3).
3. **Žák se vždy dobere k řešení sám** — Kompas (4 stupně) + Ladička;
   vzor až po 2 pokusech, bez zásahu učitele.
4. **Pouze pozitivní motivace** — nápověda nic nestojí, XP se nikdy neodečítá.
5. **Adiktivita = kognitivní přívětivost** — hra láká dokončit, nestresuje.

### Rozhodnutí zadavatele (závazná — `PLAN.md` §0 a §15)
- **Jeden HTML soubor**; learning mode vyžaduje jméno žáka (uložené 1× na
  zařízení, 1–30 znaků); volný režim (ukázka jablek) jméno nevyžaduje.
- **6 otevřených stupňů** (nutné minimum RVP G + SOŠ ICT), level ≤ 45 min
  po zaučení; 5–10 bloků, 2–3 testovací vektory, cíl ≤ 15 slov.
- **Po 3 h aktivní hry auto-reset** (smaže vše včetně jména, s varováním
  v 02:30); **červené RESET** (potvrzené) dostupné všude i na PC.
- **Bez odznaků** — jen XP + hvězdy + hodnost; certifikát SVG po každém stupni
  (jméno, datum, čas, XP, hvězdy, hodnost).
- Oba režimy simulace: ruční „žák = procesor" i AUTO-kontrola (skryté vektory).

### Konvence a mantinely
- UI texty a komentáře v aplikaci jsou česky; kód, identifikátory a názvy
  funkcí anglicky.
- Přestavba se řídí fázemi F0→F9 z `PLAN.md` §13; kritéria §14 a rozhodnutí
  §0/§15 jsou závazná. Historické návrhy nepřebírat automaticky jako nový úkol.
- Před jakoukoliv změnou kódu musí být plán schválen; kód se nemění, dokud
  zadavatel neschválí příslušnou fázi.

## Spuštění / testy
- Hra běží offline přímo z `code-flowchart.html` (SPA, bez build kroku).
- **Revize funkčnosti (TACHI-style, `PLAN.md` §12.2) — plánováno, zavádí se ve F0:**
  - `node syntax_check.js` — syntaxe inline `<script>` bloků.
  - `node flow_tests.js` — jádro: parser, tester vektorů, porty ANO/NE/TĚLO/KONEC,
    smyčky, VÝSTUP `{var}`.
  - `node flow_storage_tests.js` — persistence, RESET, auto-reset 3 h, migrace v1→v2.
  - `node flow_ui_tests.js` — responzivita (1440/1024/390/320 px), tablet porty,
    `prefers-reduced-motion`.
  - Self-test všech 6 stupňů (každý projde svými vektory).
- Po každé změně ověřit přiměřeně riziku (MASTER §17); dokončené úkoly eviduj
  v `finished.md` (vytvoř při prvním dokončeném úkolu, formát dle MASTER §14).
