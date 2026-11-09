# Verification / Ověření

2026-10-30

## English

The existing Node suites passed: inline JavaScript syntax, expression engine, mission checker, storage/import/export, game state, UI smoke checks and static mobile UI checks. Legacy UI checks were adjusted to recognize inline file-mode fallbacks selected at runtime instead of duplicate active manifest links.

Isolated Chromium checks covered all 14 mission briefings, help/about/author/sample/install dialogs, an English text scan, state-preserving language switching, literal user-authored code, an XML-escaped certificate name, translated SVG captions, JSON snapshot creation and restoration of the saved workspace after an offline reload. Exported diagrams retained their original code text and contained no Google Fonts import. Observed resource requests stayed on localhost or used embedded data.

Playwright WebKit 26.5 checks covered Czech/English/German browser languages, the saved manual preference, iOS installation instructions, standalone detection, and viewports 320/390/768 px plus landscape 844 × 390. Desktop was checked at 1440 px. Mobile toolbar buttons and installation dialogs fit within the viewport. Representative Chromium and WebKit screenshots were reviewed. The program remains directly openable as a local HTML file.

These are Linux browser-engine checks. Physical iPhone/Android installation, real operating-system icon refresh and device safe-area rendering were not verified. No claim is made that every browser, assistive technology or touch device has been tested. Original Czech program examples are preserved deliberately.

## Česky

Prošly původní Node sady: syntaxe, výrazy, kontrola misí, ukládání/import/export, herní stav, UI smoke a statické mobilní kontroly. Kontroly záložních ikon a manifestu nově odpovídají jejich výběru při spuštění z disku.

V Chromiu bylo ověřeno všech 14 zadání, dialogy, úplnost anglických textů, zachování diagramu při změně jazyka, doslovný uživatelský kód, bezpečné XML jména certifikátu, přeložené SVG popisky, JSON snímek a obnovení uložené práce offline. SVG zachovalo původní kód a neobsahovalo vzdálená písma. Sledované požadavky zůstaly na localhostu nebo použily vložená data.

WebKit 26.5 ověřil automatický jazyk pro české/anglické/německé nastavení, ruční volbu, návod iOS, spuštění z plochy a mobil/tablet 320/390/768 px i telefon na šířku 844 × 390. Desktop byl kontrolován při 1440 px. Ovládání horní lišty a instalační dialogy se vešly do obrazu. Reprezentativní snímky byly vizuálně zkontrolovány.

Fyzická instalace na iPhonu/Androidu ani aktualizace ikony v operačním systému nebyly ověřeny. Linuxový WebKit nenahrazuje Safari na skutečném zařízení. Původní české programové příklady zůstávají záměrně zachované.

## Translation completion / Doplnění překladu

2026-10-30: all 14 levels were opened with English block captions and notes, then switched to Czech and back. Raw block/arrow data remained equal. About and Author dialogs were checked explicitly, including short words without accented letters. A custom edited action retained its text. The existing Node suites passed.

Ve všech 14 levelech ověřeny anglické popisky a poznámky. Přepnutí jazyků zachovalo data bloků i šipek, vlastní upravený popisek zůstal doslovný. Výslovně zkontrolovány dialogy O programu/O autorovi a tlačítka bez diakritiky. Node sady prošly.

2026-10-30: Chromium and WebKit checks verified the exact introductory output text in English, consistent input/variable display aliases and identical raw block state after a language roundtrip. At 320/390/520/768/1024 px, all tool buttons were visible in the compact second row; the menu button was right-aligned on mobile. Existing Node suites passed.

Ověřen konkrétní výstup úvodního diagramu v angličtině, názvy vstupů a nezměněná zdrojová data. Chromium i WebKit potvrdily viditelný druhý řádek nástrojů při 320/390/520/768/1024 px a hamburger vpravo na mobilu.

## Top-left HUD badge and English intro diagram verification (2026-11-09)

Playwright E2E and Node suites confirmed the updated UI and English diagram:
- HUD badge resides at the top-left (`left: 14px; top: 64px; z-index: 90`), completely avoiding collision with view controls (`right: 12px; top: 108px; z-index: 110`) and side menu (`z-index: 95/250`).
- Responsive HUD layout scales down to a micro-pill (`0 XP ★0`) on mobile screens without obscuring canvas content.
- Introductory apple diagram in English renders native English identifiers (`name`, `color1`, `color2`, `found_color`, `score1`, `score2`, `step`) and proper English notes/outputs.
- Language switcher toggles cleanly between English and Czech apple schemes for unmodified default workspaces.
- Service Worker cache release bumped to `2026-11-09-v11`.

E2E ověření přes Playwright a Node sady potvrdilo úpravy rozhraní a anglického schématu:
- HUD odznak je umístěn vlevo nahoře (`left: 14px; top: 64px; z-index: 90`) bez jakýchkoliv kolizí s tlačítky pohledu vpravo či vysouvacím menu.
- Na mobilu se HUD responzivně sbalí do mikro-odznaku (`0 XP ★0`).
- Úvodní diagram s jablky má v angličtině nativní anglické proměnné (`name`, `color1`, `score1`, `step` atd.).
- Přepínání jazyků automaticky synchronizuje výchozí schéma SPACE 1 mezi češtinou a angličtinou.
- Verze cache Service Workeru povýšena na `2026-11-09-v11`.

## Engine audit, runtime error isolation, array expressions and accessibility (2026-11-09)

Playwright E2E verification confirmed optimal centering and scaling across devices:
- Intro apples diagram (SPACE 1) fits within the visible screen area on mobile (390×844 px) without overflow under top or bottom bars.
- Saved workspaces return centered on both PC (1440×900 px) and mobile.
- Mission scaffolds center and scale appropriately on mobile and desktop upon briefing modal close.
- All 7 Node test suites (222 checks) and Service Worker update tests passed cleanly with Service Worker cache release `2026-11-09-v10`.

E2E ověření přes Playwright potvrdilo správné centrování a měřítko:
- Úvodní schéma s jablky (SPACE 1) se na mobilu (390×844 px) automaticky optimálně zmenší a vycentruje v prostoru mezi horní a dolní lištou.
- Návrat do uložených schémat na PC i mobilu vycentruje diagram na střed.
- Zadání misí se po zavření zadávacího modalu načtou vycentrovaná a v optimálním měřítku.
- Všech 7 sad Node testů (222 testů) a ověření Service Workeru prošlo na verzi cache `2026-11-09-v10`.

Node suites passed (527 checks, 0 errors across 7 suites). All 14 built-in mission solutions passed both profiles. Runtime errors (such as division by zero or invalid operations in process blocks) during headless vector execution now trigger immediate vector failure without dirtying the global application state. Array expressions in `push()` evaluate dynamically and `+=` reliably appends elements. Mathematical evaluation supports `Math.trunc` and property `.length`. Accessible focus trapping cycles correctly in open modals. Chromium verified the Service Worker update flow to release `2026-11-09-v10` with offline activation.

Node sady prošly (527 testů, 0 chyb v 7 sadách). Všech 14 vestavěných misí prošlo v obou profilech. Běhové chyby (dělení nulou, neplatné operace) v procesních blocích při headless kontrole způsobí okamžité selhání vektoru bez znečištění stavu aplikace. Pole podporují výrazy v `push()` a připojování přes `+=`. Doplněn `Math.trunc` a `.length`. Modální okna mají uzamčený cyklus klávesy Tab (WCAG 2.2 AA). Chromium ověřilo aktualizaci Service Workeru na verzi `2026-11-09-v10` s offline přechodem.


Chromium and WebKit passed all 14 built-in mission solutions with the original test vectors. Source identifiers matched diagram code, editor fields, input labels and RAM. Checks covered unchanged source after a no-op caption edit and a language roundtrip, custom expressions, autosave without activity renewal, real pointer activity, desktop expiration, a stale second tab preserving a fresh session, unrelated storage keys, and mobile retention. Readable and whole-diagram views were checked at 320/390 px and landscape 844 × 390 after view transitions completed. Existing core, checker, storage, game, smoke and UI suites passed; speed-control and compact-toolbar regressions passed in Chromium.

A local Chromium test installed release A, detected release B, kept it waiting until Save and update, blocked updating during a run or an open edit dialog, and restored blocks, connections, name and camera. Another open tab received its own action without being forcibly reloaded. Release B then reloaded offline with a query parameter in the URL. This revision uses canonical source identifiers instead of the earlier display aliases. Physical phone installation remains unverified.

Chromium i WebKit ověřily všech 14 vzorových řešení, shodné identifikátory ve zdrojovém kódu a rozhraní, uložení popisku beze změny, přepnutí jazyků, skutečnou neaktivitu, expiraci na PC, ochranu čerstvé relace před starou kartou a zachování dat na mobilu. Kontroly nového rámování prošly včetně orientace na šířku. Skutečný přechod mezi dvěma verzemi PWA v Chromiu zachoval práci a fungoval následně offline i s parametry URL. Aktualizaci blokuje běžící simulace a otevřený editor. Fyzická instalace telefonu ověřena nebyla.
