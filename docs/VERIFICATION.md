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
