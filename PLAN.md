# Plán přestavby: CodeFlowChart EDU → CodeFlowChart „Operátor déčku" (v2)

> **Verze plánu:** 2.1 (2026-09-24) · **Status:** obsah §16 čeká na revizi; implementace po schválení
> **Rozsah:** analýza + návrh přestavby (kód hry se NEMĚNÍ, dokud plán neschválíš)
> **Metodika:** REFLECT-AUDIT (evidence → hypotéza → návrh → schválení) + `vzdelavaci-metodiky.md` + TACHI best-practice pro revizi funkčnosti (evidence-driven testy, single-file SPA)

---

## 0. Rozhodnutí ze zadání (schválená východiska)

| Oblast | Volba |
|---|---|
| RVP cíl | **Gymnázium (RVP G „nová informatika") + SOŠ ostatní obory (ICT základ)** — minimum pro základní algoritmy |
| Věk / tón | 15–19, **Gen Z / casual**: max ~15 slov na obrazovku, ikony, humor, žádné „firemní" texty |
| Struktura | **Otevřené stupně (levely)** + volný režim; bez odeMýkací řetězce |
| Počet úrovní | **Minimum RVP — 6 otevřených stupňů** (ne 27) + volný režim (ukázka jablek) |
| Časový limit levelu | Žák po zaučení **vždy zvládne level ≤ 45 min** (levely 5–10 bloků, 2–3 testy) |
| Hraní / režimy | **Otevřené levely**; **po 3 hodinách aktivní hry se aplikace sama resetuje** (s odpočtem a varováním) |
| Learning mode | **Vyžaduje jméno žáka** (uloží se 1× na zařízení, povinné 1–30 znaků); certifikát s jménem, datem, časem, XP a hodností po každém stupni |
| Data (tablet/mobil i PC) | Pokrok v `localStorage` = „cache prohlížeče do vymazání"; **červené tlačítko RESET na všech zařízeních** (potvrzené modálem) pro kompletní výmaz kdykoli |
| Auto-reset 3 h | **Vymaže vše včetně jména** — po 03:00 čistý start, žák se znovu představí |
| Samostatnost žáka | **Kompas 4 stupně** (Cíl → Háček → Vzor → Postup) + **Ladička** (sókratické otázky); vzor až po 2 pokusech |
| Motivace | **Pouze pozitivní** — žádné penalizace (nápověda nic nestojí); jen XP bonusy za samostatnost a efektivitu |
| Hodnocení | **XP + hodnost + hvězdy + certifikát (SVG) po každém stupni** — certifikát = odevzdávka; **bez odznaků** |
| Simulace | **Oba režimy**: ruční „žák = procesor" (ANO/NE) **i** automatická kontrola (skrytý test vstupů) |
| Vizuál | Vyladit cyberpunk: **zachovat identitu i efekty**, zlepšit kontrast, čitelnost, cílové plochy, `prefers-reduced-motion` |
| Platforma | **Tablet + PC** responzivní; porty přístupné bez hoveru |
| Technika | **Jeden HTML soubor**, žádný build (GPL, SPA) |
| Revize funkčnosti | **TACHI-style F0**: evidence-driven audit algoritmů/procesů + testovací sada (viz §12) |

---

## 1. Vize a herní smyčka

### 1.1 Story (krátká, meme, sci-fi)
> „Jsi **operátor CodeFlowChart déčku 7** — přístroj, který protlačuje data továrnou. Továrna stávkuje.
> Napiš jí čistý algoritmus a dostaneš **certifikát směny**. Déčko se po 3 hodinách přepne do šumu — staň do té doby."

- Story vrstva NIkdy nesmí zahltit — 1 motto ve spodním pruhu, hlášky v Ladičce/nápovědě, ne v úkolech.

### 1.2 Core loop (adiktivní `one-more-try`, čistě pozitivní)

```
CÍL (1 věta, ≤ 15 slov) → SESTAV diagram (5–10 bloků) → SPUSTIT / OVĚŘIT
  ├─ PASS → XP + bonusy + CERTIFIKÁT ↓ + „DALŠÍ STUPEŇ →" (open)
  └─ FAIL → „Test 2: čekal jsem 8, máš 5." → Ladička 🐞 / Kompas ? (zdarma) → SPUSTIT ZNOVU ▶
```

- FAIL je výzva k opakování, **nikdy trest**. Nápověda nikdy nestojí XP — jen nesbíráš bonus „samostatné řešení".

### 1.3 Co se NEMAŽE (zadání „nic neubrat bez důvodu")

| Funkce | Opatření |
|---|---|
| Editor (bloky, tahání, šipky, snap 14 px, kolize) | beze změny |
| simulace + token + krokování + breakpointy + rychlost | zachovat; vyladit (§7) |
| Visual RAM + terminal/konzole | zachovat; RAM zvýrazňuje změny, protokol zkrácen (§7, §10) |
| Undo/redo, marquee, kopírovat/vložit (i Word/PPT), export JSON/SVG, WIPE | zachovat → přesun do „Profi/Učitel" (§7.9) |
| Audio (click/error/success/data-scan) | zachovat + level-up jingle, odznakový sting |
| Cyber-spark, glitch, neon, glass | zachovat; glitch pod `prefers-reduced-motion` |
| Výchozí hra „Sbírání jablek" | zachována ve **volném režimu (SPACE 1 = jablka demo)**; stupeň 4 byl na žádost zadavatele přepracován na „Kontrola kvality" (§16.4) |
| 3 pracovní plochy | reinterpretace: MISE + SPACE 1 (jablka) + SPACE 2–5 (prázdné) (§7.9) |

---

## 2. Dvouvrstvá architektura (uvnitř jednoho HTML)

**Vrstva 1 — Studio (`App`):** editor + simulace + linter + export (dnešní kód).
**Vrstva 2 — Hra (`Game`):** learning mode, jméno, stupně, XP/hodnost/odznaky, certifikáty, Kompas, Ladička, auto-kontrola, session hodiny (3 h).

Datové klíče `blockflow_v2_player` / `blockflow_v2_progress` a `blockflow_v3_ws_*` (plochy) v `localStorage` (migrace z `v1_1` bezeztrátová). Žádný server, žádný tracking.

```
Game        – stav hráče, jméno, XP, hodnost, odznaky, stav stupňů, session hodiny
Data        – 6 stupňů (mission objects) + RVP štítky + jablka demo
Checker     – auto-kontrola: evaluátor podmínek + tester vstupů/výstupů
Compass     – 4-stupňové nápovědy (zdarma, čistě pozitivní)
Laddicka    – sókratický debug asistent po FAIL
Cert        – certifikát SVG (jméno, datum, čas, XP, hodnost)
Session     – odpočet 3 h, varování, auto-reset, červené RESET
StudioBridge– napojení na App (sim, konzole, export)
```

---

## 3. Nutné minimum RVP — 6 otevřených stupňů

Všechny stupně jsou **otevřené** (žák si může hrát napřeskáčku). Každý stupeň je navržen na **≤ 45 min po zaučení**: 5–10 bloků, 2–3 testovací vektory, 1 řádek cíle, Kompas vždy po ruce.

| Stupeň | Název (Gen-Z) | Učivo | Bloky | Typ | Bloom | RVP štítek |
|---|---|---|---|---|---|---|
| **1** | „Průvodce skladem" | SEKvence, START/AKCE/KONEC, pořadí kroků | start, process, end, note | sestav | aplikace | zápis algoritmu diagramem |
| **2** | „Pokladna" | Proměnná, VSTUP a VÝSTUP dat | start, io, process, end | sestav | aplikace | data, vstup/výstup |
| **3** | „Vstupenka 15+" | Větvení PODMÍNKA (ANO/NE) + oprava | start, io, decision, process, end | sestav + oprav | aplikace→analýza | větvení, kontrola |
| **4** | „Kontrola kvality" | Podmíněný cyklus SMYČKA + počítadla | start, io, process, decision, loop, note, end | sestav | aplikace→analýza | cyklus, větvení |
| **5** | „Volání opraváře" | Podprogram VOLÁNÍ + dekompozice | start, process, call, end | cti + sestav | porozumění→aplikace | podprogram, dekompozice |
| **6** | „Záchrana serveru" | Boss: kombinace všeho + oprava + výběr efektivnější varianty | všechny | oprav + vyber + tvorba | analýza→hodnocení→tvorba | ověření, oprava, výběr |

**Detail stupně (schéma + příklad — každý stupeň se plní stejně autorsky):**

```js
{
  id: "s4_kvalita",
  nazev: "Kontrola kvality",
  cil: "Skenuj díly, dokud nemáš 2 dobré. Spočítej, kolik jsi jich prošel.",   // ≤ 15 slov
  typ: "sestav",
  bloky: ["start","io","process","decision","loop","note","end"],
  skaffold: { rozestavené: [start, ok=0/sken=0, smyčka ok<2, vstup stav, sken++, podmínka, ok++, výstup, konec, poznámka] }, // ZPD
  testy: [ { vstupy: { stavy: ["vadne","ok","ok"] }, vystup: "Dobré díly: 2 z 3." }, ... ],  // 2–3 vektory
  kompas: { cil:1v, hack:1v, vzor:1v, postup:≤1řádek+odkaz }, // zdarma
  refReseni: {...},
  maxCasMin: 45,
  bloom: "aplikace",
  xp: { zaklad: 200, bonus_noHint: 0.2, bonus_efektivni: 0.1, bonus_prvniPokus: 0.15 },
  rvp: ["G: použije podmíněný cyklus a větvení", "G: ověří správnost krokováním", "SOŠ-ICT: vstup → výstup"]
}
```

> **Obsah stupňů:** kompletní specifikace všech 6 stupňů je v **§16** (zadání, scaffolding, testv vektory, Kompas, vzor, XP). Stupeň 4 (§16.4) je vzorový příklad podmíněného cyklu.

---

## 4. Vzorová specifikace stupně: „Kontrola kvality" (stupeň 4)

**Přepracováno na žádost zadavatele** (původní „Sběrač jablek 2.0" byl příliš podobný volnému demu s jablky a málo zajímavý). Nově jde o **podmíněný cyklus s počítadlem a zastavovací podmínkou**. Kompletní specifikace je v **§16.4**. Volný režim (SPACE 1) si ukázku jablek zachovává.

- **Cíl:** „Skenuj díly, dokud nemáš 2 dobré. Spočítej, kolik jsi jich prošel."
- **Povolené bloky:** start, io, process, decision, loop, note, end.
- **Scaffolding:** START + AKCE `ok = 0`, `sken = 0` + SMYČKA `ok < 2` + VSTUP `stav` + AKCE `sken++` + PODMÍNKA `stav == "ok"` + AKCE `ok++` + VÝSTUP + KONEC + POZNÁMKA (nepropojené, rozhozené).
- **Testy (auto-kontrola):**
  ```
  Vektor A: stavy=[vadne, ok, ok]          → "Dobré díly: 2 z 3."
  Vektor B: stavy=[ok, ok]                 → "Dobré díly: 2 z 2."
  Vektor C: stavy=[vadne, vadne, ok, ok]   → "Dobré díly: 2 z 4."
  ```
- **Kompas (zdarma, 4 stupně, max 40 slov):** Cíl („Potřebuješ 2 dobré díly — smyčka se točí, dokud je nemáš.") → Háček („Kolikrát se smyčka opakuje? Záleží to na vstupech?") → Vzor („Smyčka ok<2 → vstup stav → sken++ → když stav==ok, ok++") → Postup („Skenuj každý díl, počítej dobré a skonči, až jich máš 2.").
- **XP:** základ 200; **bonusové** (jen pozitivní): bez nápovědy +20 %, první pokus +15 %, efektivní (počítadlo místo ručního vypisování) +10 %. Nápověda nic nestojí.

---

## 5. Auto-kontrola (Checker) — jádro ověření (RVP „ověří správnost")

1. **Evaluátor podmínek:** rozšířit `parseVariable` o vyhodnocení booleovských výrazů podmínek (`krok < 3`, `barva == pamatovana`). `=` vs `==` → Linter varuje (zůstává).
2. **Režim AUTO:** „OVĚŘIT" spustí diagram automaticky — podmínky se řeší samy, VSTUP z testovacího vektoru, VÝSTUP se zachytí.
3. **Tester:** porovná zachycené výstupy s očekávanými per vektor; první neshoda → konkrétní zpráva („Test 2: čekal jsem …, máš …").
4. **Slepé uličky / smyčky:** okamžitá červená značka na bloku.
5. **Ruční „žák = procesor" zůstává výchozí** pro krokování (učební režim); OVĚŘIT je vždy k dispozici.

---

## 6. Samostatnost žáka: Kompas + Ladička (žádné tresty)

### 6.1 Kompas (4 stupně, zdarma)
- „?" v misi; stupeň 1 vždy; další po (a) dalším FAILu nebo (b) 45 s bez pokroku.
- Stupeň 4 zobrazí vzorové řešení — **jinak se vzor odemkne po 2 pokusech + kompasu ≥ 2** (poslední záchrana, učitel nezasahuje).
- Nápovědy se mezi stupni „odbourávají" (scaffolding fading).

### 6.2 Ladička (po FAIL, sókratické otázky — Paul & Elder, vtipná)
1. „Který blok podle tebe vyrobil špatný výstup?" → žák kliká na blok.
2. „A co by ten blok měl udělat?"
3. „Co by se stalo, kdyby se otevřel 2×?"
- Po 2 špatných tipech zúží na 2 kandidáty — **nikdy neřekne řešení**. Žák sám objeví rozpor (elenchus).

### 6.3 Pravidla
- Vzorové řešení i nápovědy jsou zdarma; **XP bonusy jsou jediná motivace k samostatnosti** (pozitivní, žádný odečet).
- Učitel zasahuje jen kosmeticky; záznamem je certifikát.

---

## 7. UI/UX (vyladit cyberpunk, tablet-first)

### 7.1 Žákovský režim (learning / volný) vs Profi
- **Topbar žák:** logo | jméno (když learning mode) | CÍL | [Spustit] [Krokovat] [Ověřit] [Kompas?]
- **Skryto v „☰ → Profi"** (plně funkční): UNDO/REDO, WS, IMPORT/EXPORT, SVG, WIPE, rychlost, breakpointy, bloková nápověda.
- Vždy **1 velký CTA**; ostatní sekundární barvou.

### 7.2 Tablet-first
- Porty pro šipky **trvale viditelné** (bez hoveru); cílové plochy ≥ 44 px.
- Toolbar bloků na šířku (scrollable), uzamčené bloky „🔒 do stupně X" (progressivní zobrazení i přes otevřené stupně).
- Pinch zoom zůstává; breakpoint zóna ≥ 32 px.

### 7.3 Šipky ANO/NE
- Label na každé šipce podmínky/smyčky: „ANO" / „NE" / „TĚLO" / „KONEC" — čitelné i při křížení.

### 7.4 Stopa kroků (trace badges)
- Pořadová čísla 1, 2, 3… na blocích při běhu; u smyčky sčítání průchodů — žák vidí řád i počet opakování.

### 7.5 Protokol/konzole
- Skrytá, při běhu otevře **kompaktní** pruh (3 řádky + „více"). Typewriter zrušen (v AUTO okamžitý, v krokování klikaný).

### 7.6 Visual RAM
- Změna proměnné → buňka zabliká + delta šipka.

### 7.7 Minimapa / holo-nav
- Roh 120 px: živá miniatura diagramu, klik = vycentrování.

### 7.8 Výstupní modál
- Manuální „Zavřít (Enter)" + minimální držení.

### 7.9 Režimy a pracovní plochy
- **Přepínač ploch v horní liště:** `MISE · SPACE 1 · SPACE 2 · SPACE 3 · SPACE 4 · SPACE 5`.
  Aktivní plocha je zvýrazněná; klik přepne plochu (každá má vlastní stav).
- **MISE** (dříve „KAMPAŇ", interně `campaign`) — learning mode: 6 stupňů, jméno
  povinné, XP/certifikáty, 3h hodiny. Každý level má **vlastní plochu** (`lvl1…lvl6`)
  → návrat k misi zachová rozdělanou práci.
- **Jméno:** modál se ptá **až při prvním kliknutí na level v menu** (ne při startu
  ani při přepnutí na MISE); po zadání už se neptá (až do RESETu).
- **SPACE 1** — **jablka demo** + volný editor (bez jména, bez hodin).
- **SPACE 2–5** — prázdné plochy pro vlastní tvorbu (sloty `space2…space5`).
- **Mise** zůstávají v hamburger menu (MISE) — přepínač režimů už v menu není.
- **Vstup do mise:** klik na level → načte se **scaffolding** — moduly **NEpropojené**
  a **rozhozené po ploše** (zamíchané pozice v řídké 2D mřížce + jitter, ne pod sebou),
  aby pozice nenapovídaly řešení; spojení si žák vytváří sám + omezená paleta →
  **level modal** s podrobným zadáním (Typ, Cíl, „Co máš udělat", povolené bloky,
  ověření) + Kompas.
- **Klíče ploch (v3):** `blockflow_v3_ws_<slot>`, aktivní `blockflow_v3_active_ws`.
  Starší klíče se nenačítají (migrace = F4) — po změně scaffoldu se tak načte čistý stav.
- **Export/import (JSON):** jediná dvojice `⭳ EXPORT` / `⭱ IMPORT` uloží/načte
  **všechny plochy** (`{app:'blockflow-workspaces', active, workspaces:{slot:stav}}`);
  při importu jednoho schématu (`blocks`/`arrows`) se načte do aktuální plochy.
- **Cheat (jen pro vývoj/testování):** `Ctrl+Alt+C` s aktivním CapsLockem vyřeší
  aktuální level krok za krokem ze vzorového řešení; po dokončení další stisk vyčistí.

---

## 8. Režimy, data a čas (learning mode / reset / 45 min / 3 h)

### 8.1 Režimy
- **Learning mode (MISE, dříve KAMPAŇ)**: modál „Jak se jmenuješ, operátore?" se zobrazí **až při prvním kliknutí na level v menu** (ne při startu ani při přepnutí na MISE) — **jméno povinné** (1–30 znaků), uloží se na zařízení. Generuje se z něj certifikát. Po zadání už se neptá (až do RESETu).
- **Volný režim (SPACE 1 – jablka)**: bez jména, čistý editor + ukázka jablek, žádné XP.

### 8.2 Persistence (tablet/mobil i PC)
- Pokrok (jméno, XP, stupně, certifikáty v profilu) se ukládá do `localStorage` = **„cache prohlížeče do vymazání"** — přežije obnovení stránky.
- **Červené tlačítko RESET** v menu (s potvrzovacím modálem): kompletní výmaz (jméno, XP, pokrok). Na tabletu/mobilu je v dialogu upozornění: „Data zůstávají v prohlížeči, dokud nesmažeš (RESET)."

### 8.3 Auto-reset po 3 hodinách
- Od prvního kliknutí (aktivní hra) běží **session hodiny** (menší odpočet v menu „SMĚNA 02:40/03:00").
- **02:30** → toast: „Kontrola směny: za 30 min se déčko přepne do šumu. Stáhni si certifikáty."
- **03:00** → auto-reset: vymaže pokrok a vrátí se na úvod (nová směna → znovu jméno v learning mode). **Certifikáty si žák stahuje průběžně**, takže odevzdávka není ohrožena.

### 8.4 Level = ≤ 45 min (po zaučení)
- Návrhová konstanta: 5–10 bloků, 2–3 testy, 1 řádek cíle, Kompas vždy — vychází do 45 min i pro méně zkušené.
- `maxCasMin: 45` v datech stupně; delší než 45 min → Kompas nabídne víc (pozitivní push, bez trestu).

---

## 9. Certifikát (SVG — odevzdávka po každém stupni)

- Automaticky po splnění libovolného stupně (výrazněji u boss/stupně 6).
- **Obsah:** logo · „CERTIFIKÁT OPERÁTORA" · název stupně · **jméno žáka** (z learning mode) · **datum + čas** dokončení · **XP a hvězdy** · **hodnost** · razítko „CodeFlowChart EDU • RVP G + ICT základ" · GPL footer. **Bez odznaků.**
- Generátor = nový SVG builder (stávající export schémat zůstává).
- Šířka ~A4 na šířku, stahuje se „1 mířová" SVG; na tabletu i PC.

---

## 10. Textová politika (Gen Z) + konverzní slovník

| Pravidlo | Formulace |
|---|---|
| Cíl mise | ≤ 15 slov, meme tón |
| Konzole | max 10 slov na řádek |
| Kompas | ≤ 40 slov na misi |
| Chyby | „Test 2: čekal jsem 8, máš 5." |

Konverze starých hlášek (jádro zachovat, zkrátit):
- „Inicializace CodeFlowChart Engine v1.1…" → „Systém: on."
- „Alokuji paměťový rámec… / Zpracování vlákna… ÚSPĚCH" → „Volám funkci … → návrat ✓"
- „Slepá ulička. Signál nemá kam pokračovat…" → „Zaseknuto: odtud nikam nevede šipka."
- „Detekován nekonečný cyklus… Stack Overflow!" → „Nekonečná smyčka! Zastavuji."
- „Architekt zvolil větev: ANO" → „→ ANO"

---

## 11. Vztah k RVP G a SOŠ ICT (štítky → 6 stupňů)

| Dovednost | Stupeň | Štítek |
|---|---|---|
| Zápis algoritmu vývojovým diagramem | 1 | G ✓ / SOŠ ✓ |
| Proměnné, vstup a výstup | 2 | G ✓ / SOŠ ✓ |
| Větvení (podmínka) + kontrola | 3 | G ✓ |
| Cykly (fixní i podmíněný) | 4 | G ✓ |
| Podprogram, dekompozice | 5 | G ✓ |
| Ověření, oprava, výběr, tvorba | 6 | G ✓ („vybere vhodný algoritmus a zdůvodní") |
| Čtení a vysvětlení algoritmu | 5 (cti) | G ✓ |
| Modelování a simulace toku | 1–6 (token, RAM) | G ✓ / SOŠ ✓ |

> V PROFI: statická tabulka „stupeň ↔ RVP výstupy", žádný sběr dat o žákovi.

---

## 12. Revize funkčnosti algoritmů a procesů (TACHI-style F0)

**Před přestavbou** — evidence-driven audit dnešního jádra (jako audit TACHI: `syntax_check.js`, univerzální tester, self-test, browser matrix, security audit, `finished.md`):

### 12.1 Auditní okruhy (co se kontroluje a jak)

| Okruh | Konkrétní kontroly | Ověření |
|---|---|---|
| **Parser výrazů** | `parseVariable`: `=`, `+=`, `/=`, `%`, `++/--`, pole `.push`, závorky, diakritika, chybné výrazy | unit skript na sadu výrazů; chybný výraz NESMÍ být tichý |
| **VÝSTUP + `{var}`** | nahrazení proměnné bez zbytků `{}`; text+složené závorky; pole v textu | test „jablka" vektorů |
| **Rozhodování/smyčka** | port ANO/NE/TĚLO/KONEC, rotace portů, slepá ulička, nekonečná smyčka (detekce stavem, ne 5000 iterací) | 8 scénářů (kombinace portů) |
| **I/O** | VSTUP (jméno/`input(zadej)`/čistá var), VÝSTUP modál, rychlost, krokování | 6 scénářů |
| **Token animace / stopa kroků** | trasa, speed 1x/2x/MAX, abort | vizuální kontrola + hodinky |
| **Linter** | `=` v podmínce, poměr závorek, `+ =` apod. | 6 chyb + 6 čistých |
| **Undo/redo / historie** | 50 kroků, edge „index na konci" | 30-akční scénář |
| **Persistence** | migrace `v1_1`→`v2`, auto-save 3 s, WS přepínání | testy ukládání + restart |
| **Import/export** | JSON round-trip, SVG (s/v konzolí), clipboard Word/PPT | round-trip test + vizuál |
| **Bezpečnost** | XSS přes label/RAM/konzoli; escaping všech `innerHTML` | security test (typicky injekce do bloku a proměnné) |
| **Responzivita** | 1440 / 1024 / 390 / 320 px; porty bez hoveru; touch ≥44 px | browser matrix |
| **Accessibility** | kontrast `--text-dim`; `prefers-reduced-motion`; focus | kontrast měřit + reduced-motion walkthrough |

### 12.2 Testovací sada (plánovaná)
- `syntax_check.js` (jako TACHI) — kontrola složených závorek/funkcí HTML.
- `flow_tests.js` — simulace jádra: parser, tester vektorů jablek A/B/C, port scenáře, nekonečná smyčka, VÝSTUP `{var}`.
- `flow_storage_tests.js` — persistence, RESET, auto-reset 3 h (simulace času), migrace v1→v2.
- `flow_ui_tests.js` — matrix rozlišení, tablet porty, reduced-motion.
- Self-test všech 6 stupňů (každý stupeň projde svými vektory) + `finished.md` evidence.

### 12.3 Výstup revize
- `finished.md` (chronologický záznam oprav + ověření) — dle `MASTER-AGENTS.md` §14.

---

## 13. Fáze implementace (rozložení + verifikace)

| Fáze | Rozsah | Verifikace |
|---|---|---|
| **F0** | **Revize funkčnosti** (§12): bugfixy `{var}`, tichá chyba výrazu, XSS, typewriter, death-loop, `fitToScreen`, porty | testy §12.2; session PASS |
| **F1** | `Game` + jméno (learning mode) + `Data` (6 stupňů) + režimy a plochy per level + level modal + scaffolding loader + XP/hodnost (pozitivní) | 3 umělé mise dají XP i certifikát; vstup do mise vykreslí scaffolding |
| **F2** | `Checker` (evaluace + tester) — režim OVĚŘIT | vektory stupňů (i jablka A/B/C) projdou |
| **F3** | Kompas (zdarma) + Ladička + vzorové řešení gating | scénář „žák úplně ztracen → sám projde" |
| **F4** | `Session` (3 h odpočet, varování, auto-reset) + červené RESET + migrace v1→v2 | simulace času: reset při 03:00, RESET ručně |
| **F5** | Stupně 1–3 obsahu (zadání, testy, kompas) | každý stupeň projde svými vektory |
| **F6** | Stupně 4–6 + boss (auto-test + cti/vyber) | self-test všech 6 stupňů |
| **F7** | UI tablet: porty, šipky ANO/NE, stopa kroků, minimapa, topbar režimy | 768 i 1280 px |
| **F8** | Certifikát SVG (jméno, datum, čas, XP, hvězdy, hodnost) | design review + tisk |
| **F9** | Polishing: motion/reduced-motion, kontrast, Gen-Z copy; `finished.md` | full walkthrough kampaně |

Každá fáze končí **definovaným autotestem**, ne „to běží".

---

## 14. Kritéria úspěchu (Definition of Done)

1. Žák 15–19 **sám projde všech 6 stupňů** (bez zásahu učitele) — test: Kompas+Ladička stačí.
2. Každý stupeň → **certifikát SVG** se jménem, datem, časem, XP, hodnost.
3. Žák úroveň **≤ 45 min po zaučení**; stupně otevřené; **auto-reset po 3 h** funguje s varováním.
4. **Pouze pozitivní motivace** — nápověda nic nestojí, XP se nikdy neodečítá.
5. Nic ze dnešní funkčnosti nezmizelo (editor, simulace, exporty, undo/redo, jablka, 3 WS).
6. Texty ≤ 15 slov; „nečíst, klikat."
7. Plugin F0: testy green (syntax, jádro, úložiště, UI matrix, security).

---

## 15. Rozhodnuté volby (uzavřeno 2026-09-24)

1. **RESET na PC:** červené RESET je **všude** (i na PC), vedle auto-resetu 3 h. ✓
2. **Odznaky:** **ne** — jen XP + hvězdy + hodnost na certifikátu. ✓
3. **Jméno:** 1× na zařízení (learning mode), používá se na všech certifikátech; **jen na certifikát**, ne do žádného reportu. ✓
4. **Kompas:** nápověda nic nestojí, „bez nápovědy" je jen XP bonus (nikdy odečet). ✓
5. **Auto-reset:** smazat **vše včetně jména** → po 03:00 čistý start. ✓
6. **Obsah stupňů:** navrhnout **všech 6** (viz §16) k revizi. ✓

---

## 16. Kompletní obsah stupňů (k revizi)

> **Narativní témata (F1):** obsah §16.1–§16.6 níže je verze **`operator`** (původní
> sklad, pro obory E). **Výchozí téma je `streamer`** (Gen Alfa); obě sdílejí stejný
> algoritmus (typy bloků, porty, šipky, pořadí) — liší se jen texty. Přepíná se ikonou
> v horním panelu (`NARRATIVES`, `toggleNarrative`), persistence `blockflow_v3_narrative`.
> Názvy stupňů ve `streamer`: 1 První stream · 2 Donáty a subs · 3 Turnaj 15+ ·
> 4 Moderace chatu · 5 Zavolej moda · 6 Záchrana streamu; hodnosti: Nováček · Ranked hráč ·
> Speedrunner · Legenda serveru. Kompletní texty jsou v `NARRATIVES` v `code-flowchart.html`.

> Plná specifikace každého stupně stejným vzorem jako §4 — zadání, scaffolding, testovací vektory, Kompas, vzorové řešení (pseudodiagram) a XP. Syntaxe výrazů se finalizuje ve F2 podle evaluátoru (§5); zde je popisná/předpisová.

### 16.x Společná konvence (pro všechny stupně)

- **Typy bloků:** `start`, `process (AKCE)`, `io (VSTUP/VÝSTUP)`, `decision (PODMÍNKA)`, `loop (SMYČKA)`, `call (VOLÁNÍ)`, `note (POZNÁMKA)`, `end (KONEC)`.
- **Cíl:** vždy ≤ 15 slov; po zadání viditelný v topbaru.
- **Testy:** 2–3 vektory; v AUTO režimu se VSTUP plní sekvenčně z vektoru, VÝSTUP se porovná s `očekávané`.
- **Kompas:** 4 stupně, celkem ≤ 40 slov na misi (Cíl → Háček → Vzor → Postup). Vzor je blok „prohlédnout si hotové řešení".
- **XP:** `xp.zaklad` za splnění; **bonusy** (jen pozitivní): `noHint +20%` (bez otevřené nápovědy), `prvniPokus +15%` (PASS na 1. pokus), `efektivni +10%` (demonstrovatelně nejkratší validní řešení — od stejného počtu bloků jako referenční).
- **Hvězdy:** princip vyhodnocení z celkového XP na stupeň: 100–115 % → ★, >115–125 % → ★★, >125 % → ★★★.
- **Hodnost** (kumulativní napříč kampaní, vlastní tovární řada „déčka" — bez vazby na jiné hry): 0–449 XP „Nováček u pásu" · 450–899 „Pásový operátor" · 900–1399 „Mistr toku" · 1400+ „Legenda déčka".

---

### 16.1 Stupeň 1 — „Průvodce skladem" (sekvence)

**Typ:** sestav · **Bloom:** aplikace · **Učivo:** sekvence, pořadí kroků, START/AKCE/KONEC · **RVP:** zápis algoritmu diagramem.

- **Cíl:** „Veronika nezná sklad. Slož jí cestičku: 3 kroky v pořadí."
- **Povolené bloky:** start, process, note, end.
- **Scaffolding:** uprostřed START, pod ním KONEC, panel AKCE se 3 bloky navíc (smíchané pořadí) + 1 POZNÁMKA „Pořadí je důležité!".
- **Požadovaná akce:** spojit 3 AKCE ve správném pořadí: `Otevři bránu` → `Vezmi bednu` → `Zavři bránu`.
- **Test (1 vektor — ověřuje pořadí):**
  ```
  Vektor A: očekávaný sled = ["Otevři bránu","Vezmi bednu","Zavři bránu"]
            → PASS jen při přesném pořadí
  ```
- **Kompas (≤40 slov):** Cíl: „Technik potřebuje vidět cestičku od STARTU do KONCE." → Háček: „Můžeš odejít ze skladu, aniž bys zavřel bránu?" → Vzor: vzorový diagram (START → 3× AKCE → KONEC) → Postup: „Krok 2: spoj AKCE pod sebe ve správném sledu."
- **XP:** zaklad 100; bonusy dle §16.x.

---

### 16.2 Stupeň 2 — „Pokladna" (vstup, výstup, proměnná)

**Typ:** sestav · **Bloom:** aplikace · **Učivo:** proměnná, VSTUP/VÝSTUP · **RVP:** data, vstup/výstup.

- **Cíl:** „Načti cenu a kusy. Vypiš mezisoučet."
- **Povolené bloky:** start, io, process, note, end.
- **Scaffolding:** START + VSTUP `cena` + VSTUP `kusy` + VÝSTUP (prázdné pole + POZNÁMKA „mezisoučet = cena × kusy").
- **Úkoly:** (1) doplnit AKCE `mezisoucet = cena * kusy`, (2) VÝSTUP obsahuje `„Mezisoučet: {mezisoucet}"`.
- **Test (3 vektory):**
  ```
  Vektor A: cena=15, kusy=3  → "Mezisoučet: 45"
  Vektor B: cena=80, kusy=5  → "Mezisoučet: 400"
  Vektor C: cena=12.5, kusy=4→ "Mezisoučet: 50"   (desetinný vstup — ověření parseru)
  ```
- **Kompas:** Cíl: „Mezisoučet vzniká z dvojice čísel." → Háček: „Vyhodí pokladna výsledek sám od sebe?" → Vzor: vzorový diagram s AKCE i VÝSTUP → Postup: „Doplň AKCE mezi vstupy a výstup."
- **XP:** zaklad 120.

---

### 16.3 Stupeň 3 — „Vstupenka 15+" (větvení)

**Typ:** sestav + oprav · **Bloom:** aplikace → analýza · **Učivo:** větvení PODMÍNKA, kontrola · **RVP:** větvení, kontrola správnosti.

- **Cíl:** „Načti věk. ANO=pusť, NE=vykašli se."
- **Povolené bloky:** start, io, decision, process, note, end.
- **Scaffolding:** START + VSTUP `vek` + PODMÍNKA (prázdná) + dvě větve s VÝSTUPY (prohozené! → oprava) + POZNÁMKA „Podmínka: vek >= 15".
- **Zdrojový „bug":** VÝSTUP „Vstupenka NE" je na ANO větvi a naopak → žák musí podmínku/spojení opravit.
- **Test (3 vektory):**
  ```
  Vektor A: vek=18 → "Vstupenka ANO"
  Vektor B: vek=12 → "Vstupenka NE"
  Vektor C: vek=15 → "Vstupenka ANO"   (hraniční hodnota — RVP preciznost)
  ```
- **Kompas:** Cíl: „Přesně 15 let je ‚dost' — kde to rozseknem?" → Háček: „Co se stane, když je 15 přesně?" → Vzor: diagram s `vek >= 15` → Postup: „Sprav obě větve pod PODMÍNKOU."
- **XP:** zaklad 140.

---

### 16.4 Stupeň 4 — „Kontrola kvality" (podmíněný cyklus + počítadla) — **vzor §4, kompletní**

**Typ:** sestav · **Bloom:** aplikace → analýza · **Učivo:** cyklus s podmínkou, počítadla, větvení · **RVP:** cyklus (fixní i podmíněný), větvení.

- **Cíl:** „Skenuj díly, dokud nemáš 2 dobré. Spočítej, kolik jsi jich prošel."
- **Povolené bloky:** start, io, process, decision, loop, note, end.
- **Scaffolding:** START + AKCE `ok = 0`, `sken = 0` + SMYČKA `ok < 2` + VSTUP `stav` + AKCE `sken++` + PODMÍNKA `stav == "ok"` + AKCE `ok++` + VÝSTUP `„Dobré díly: {ok} z {sken}."` + KONEC + POZNÁMKA „Smyčka končí, až máš 2 dobré." (nepropojené, rozhozené).
- **Úkoly:** inicializuj počítadla; uvnitř smyčky načti `stav`, vždy zvyš `sken`, a když `stav == "ok"`, zvyš `ok`; po splnění `ok < 2` vypiš výsledek.
- **Test (3 vektory):**
  ```
  Vektor A: stavy=[vadne, ok, ok]          → "Dobré díly: 2 z 3."
  Vektor B: stavy=[ok, ok]                 → "Dobré díly: 2 z 2."
  Vektor C: stavy=[vadne, vadne, ok, ok]   → "Dobré díly: 2 z 4."
  ```
- **Pozn. k vektoru B:** smyčka proběhne jen 2× — ověřuje podmíněný cyklus (ne fixní počet).
- **Kompas:** Cíl: „Potřebuješ 2 dobré díly — smyčka se točí, dokud je nemáš." → Háček: „Kolikrát se smyčka opakuje? Záleží to na vstupech?" → Vzor: „Smyčka ok<2 → vstup stav → sken++ → když stav==ok, ok++" → Postup: „Skenuj každý díl, počítej dobré a skonči, až jich máš 2."
- **XP:** zaklad 200; bonus efektivni za použití počítadla a podmíněné smyčky místo ručního vypisování.

---

### 16.5 Stupeň 5 — „Volání opraváře" (podprogram / dekompozice)

**Typ:** cti + sestav · **Bloom:** porozumění → aplikace · **Učivo:** VOLÁNÍ, parametry, dekompozice · **RVP:** podprogram, dekompozice.

- **Cíl:** „Opravář je zavolán 3×. Zavolej ho správně."
- **Povolené bloky:** start, process, call, note, end.
- **Struktura:** definice podprogramu v POZNÁMCE („PODPROGRAM: oprav(dil) → vrátí: opraveno=1"), žák sestaví sekvenci 3× VOLÁNÍ s parametry `dil=A`, `dil=B`, `dil=C`.
- **Část „cti":** náčrt s 1 chybným VOLÁNÍM (chybný parametr) → žák ho najde a znovu zavolá správně.
- **Test (2 vektory — sled volání):**
  ```
  Vektor A: pořadí dílů [A, B, C] → PASS při sledu [oprav(A), oprav(B), oprav(C)]
  Vektor B: pořadí dílů [C, A, B] (a 1 chybné VOLÁNÍ v náčrtu) → PASS při [oprav(C), oprav(A), oprav(B)]
  ```
- **Kompas:** Cíl: „Opravář dělá totéž 3× — stačí jedno VOLÁNÍ s odlišným dílem." → Háček: „Co se stane, když zavoláš s díl=B?" → Vzor: vzorová sekvence VOLÁNÍ → Postup: „Místo ruční AKCE použij blok VOLÁNÍ s parametrem dílu."
- **XP:** zaklad 180.

---

### 16.6 Stupeň 6 — „Záchrana serveru" (boss: kombinace + oprav + vyber)

**Typ:** oprav + vyber + tvorba · **Bloom:** analýza → hodnocení → tvorba · **Učivo:** kombinace všeho, oprava, výběr efektivnější varianty · **RVP:** ověření, oprava, výběr, tvorba.

- **Cíl:** „Server padá. Oprav smyčku, vyber čistší tok."
- **Povolené bloky:** všechny.
- **Část 1 — „oprav":** diagram se 2 chybami: přehozené větve PODMÍNKY a smyčka končící o 1 dříve („krok < 3" místo „krok <= 3").
- **Část 2 — „vyber":** nabídka 2 variant téhož subproblému (smyčka vs. 3× kopie) → žák vybere efektivnější a krátce česky zdůvodní (textové pole, není hodnoceno XP).
- **Část 3 — „tvorba":** žák navrhne vlastní drobné řešení (1 blok AKCE) pro předem daný úkol.
- **Test (3 vektory)** přes plné schéma:
  ```
  Vektor A: [cervena, zluta, modra] → "OK: zpracováno 3"
  Vektor B: [cervena]               → "OK: zpracováno 1"   (hraniční — krok=1)
  Vektor C: [cervena, zluta, modra, zelena] → "OK: zpracováno 4"   (cyklus nesmí předčasně skončit)
  ```
- **Kompas (2 fáze — protože boss):** fáze 1 = oprava (Cíl → Háček → Postup), fáze 2 = výběr (Cíl = „Hledej, co se opakuje" → „Smyčka běží krok<=n" → vzor). Léčí pozitivně, nikdy neřekne „špatně si nevybral".
- **XP:** zaklad 300; bonusy dle §16.x.