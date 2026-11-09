# Changelog

## 2026-11-09 · Mobile toolbar scroll belt with gradient cues and compact speed control

- Compacted mobile toolbar (`#toolbar`) block buttons (reduced height, width, and typography) to fit comfortably on small screens while retaining touch target accessibility
- Added dynamic edge-fading gradient masks (`-webkit-mask-image`) and continuous cyan scrollbar to indicate horizontal scrollability and content continuation
- Compacted terminal speed control (`.sim-speed-trigger`) on mobile to a sleek 28px pill showing concise `1×` / `2×` / `MAX` labels without crowding the terminal bar
- Hidden auxiliary subtitle labels in terminal header on narrow screens to provide maximum clean space for simulation controls
- Upgraded offline Service Worker cache to `2026-11-09-v12`
- Česky: zmenšená a kompaktní tlačítka modulů v dolním panelu na mobilu, plynulé přechodové masky a indikátor posuvu napovídající možnost scrollování, miniaturizované tlačítko rychlosti na terminálu (1×/2×/MAX), SW cache v12

## 2026-11-09 · Top-left responsive HUD badge and authentic English intro diagram

- Redesigned HUD badge (XP, rank, stars, role) into a compact glassmorphism pill placed at the top-left corner under the toolbar (`left: 14px; z-index: 90`), eliminating all collisions with canvas view controls and the hamburger menu
- Responsive HUD layout: full inline pill on PC, micro-badge (`0 XP ★0`) on mobile
- Replaced mixed Czech variables in English intro apple diagram with authentic English identifiers (`name`, `color1`, `color2`, `found_color`, `score1`, `score2`, `step`, `Apple Harvest`, `Game Over`)
- Added automatic language synchronization for default SPACE 1 diagram when toggling language
- Upgraded offline Service Worker cache to `2026-11-09-v11`
- Česky: přesun a zmenšení HUD odznaku (XP, hodnost) do levého horního rohu bez kolizí s menu a tlačítky pohledu, plně anglický úvodní diagram s jablky v EN verzi, SW cache v11

## 2026-11-09 · Responsive auto-fit, mobile centering and diagram workspace centering

- Optimized introductory apples diagram (SPACE 1) loading on mobile: automatically centered and scaled to comfortably fit narrow screens with top/bottom toolbars
- Diagrams load centered both upon return to saved workspaces (on PC and mobile) and during level/mission loading
- Refined viewport calculations in `fitToScreen` taking into account mobile/desktop bar reserves, responsive padding, and accurate block dimension fallbacks
- Upgraded offline Service Worker cache to `2026-11-09-v10`
- Česky: centrování a optimální zmenšení úvodního schématu s jablky na mobilu, automatické vycentrování při návratu do uloženého schématu (PC i mobil) a při načítání misí, SW cache v10

## 2026-11-09 · Engine audit, runtime error isolation, array expressions and accessibility

- Isolated runtime errors in mission test checker so division by zero or invalid operations fail immediately without dirtying app state
- Added variable and expression evaluation to `array.push(...)` and supported `+=` element appending for arrays
- Extended `safeEval` with `Math.trunc` and safe `.length` access on arrays and strings
- Deduplicated `toNumber` and refined `isTouchDevice()` to preserve 90-minute inactivity session expiration on school touchscreen laptops
- Implemented WCAG 2.2 focus trap for active modal dialogs and added bilingual tolerance for test vector outputs
- Upgraded offline Service Worker cache to `2026-11-09-v9`
- Česky: izolace chyb v checkeru, výrazy v `push()`, `+=` pro pole, `Math.trunc`, `.length`, focus trap a SW cache v9


## 2026-10-30 · Output captions and compact toolbar

- Translated built-in output sentences, including the introductory apple example, with consistent variable display aliases
- Keep compact tools visible below the top bar on narrow screens and the mobile menu button on the right
- Česky: přeložené výstupy a zobrazovací názvy proměnných, druhý řádek nástrojů a hamburger vpravo

## 2026-10-30 · Translation completion

- Completed short menu/modal/button labels, including About, Author and mission actions
- Added display-only translations for built-in diagram captions and notes; editing a caption opts it out
- Česky: doplněné překlady menu, modalů, tlačítek a výchozích popisků diagramů, beze změny zdrojového programu

## 2026-10-30

- Czech/English interface, mission briefs, hints, diagnostics and certificate captions
- Automatic browser-language selection and a persistent manual switch without changing diagram data
- Offline PWA cache, corrected manifest selection, mobile Safari installation guide and dedicated platform icons
- Embedded fonts with preserved SIL OFL notices; SVG exports no longer request remote fonts
- Mobile toolbar controls remain visible on narrow displays
- Certificate names are escaped as XML and kept literal during translation

Česky: jazyky, instalace na plochu, offline písma, mobilní lišta, platformní ikony a dvojjazyčná dokumentace. Data diagramů a původní příklady zůstávají zachované.
