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

## Source identifiers, sessions and updates (2026-10-30)

Chromium and WebKit passed all 14 built-in mission solutions with the original test vectors. Source identifiers matched diagram code, editor fields, input labels and RAM. Checks covered unchanged source after a no-op caption edit and a language roundtrip, custom expressions, autosave without activity renewal, real pointer activity, desktop expiration, a stale second tab preserving a fresh session, unrelated storage keys, and mobile retention. Readable and whole-diagram views were checked at 320/390 px and landscape 844 × 390 after view transitions completed. Existing core, checker, storage, game, smoke and UI suites passed; speed-control and compact-toolbar regressions passed in Chromium.

A local Chromium test installed release A, detected release B, kept it waiting until Save and update, blocked updating during a run or an open edit dialog, and restored blocks, connections, name and camera. Another open tab received its own action without being forcibly reloaded. Release B then reloaded offline with a query parameter in the URL. This revision uses canonical source identifiers instead of the earlier display aliases. Physical phone installation remains unverified.

Chromium i WebKit ověřily všech 14 vzorových řešení, shodné identifikátory ve zdrojovém kódu a rozhraní, uložení popisku beze změny, přepnutí jazyků, skutečnou neaktivitu, expiraci na PC, ochranu čerstvé relace před starou kartou a zachování dat na mobilu. Kontroly nového rámování prošly včetně orientace na šířku. Skutečný přechod mezi dvěma verzemi PWA v Chromiu zachoval práci a fungoval následně offline i s parametry URL. Aktualizaci blokuje běžící simulace a otevřený editor. Fyzická instalace telefonu ověřena nebyla.
