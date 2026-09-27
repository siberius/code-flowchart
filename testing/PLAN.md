# Plán přestavby: CodeFlowChart EDU → CodeFlowChart HEFAISTOS (v2.2)

> **Verze plánu:** 2.2 (2026-09-24) · **Status:** integrováno se zadáním učebních oborů (H/E_J); implementace po schválení
> **Rozsah:** analýza + návrh přestavby (kód hry se NEMĚNÍ, dokud plán neschválíš)
> **Metodika:** REFLECT-AUDIT (evidence → hypotéza → návrh → schválení) + `vzdelavaci-metodiky.md` + TACHI best-practice pro revizi funkčnosti (evidence-driven testy, single-file SPA)
> **V2.2:** požadavky 24. 9. 2026 pro učební obory H (8 misí) a podpůrnou cestu E/J (6 misí) byly
> sloučeny do §0, §1–§3, §7–§16 (původní samostatný `code-flowchart-zadani-ucebni-obory.md` byl integrován).

---

## 0. Rozhodnutí ze zadání (schválená východiska)

| Oblast | Volba |
|---|---|---|
| RVP cíl | **Pouze učební obory H (8 misí) + podpůrná cesta E/J (6 misí)** (RVP SOV H příloha 2b, E/J příloha 1b); **gymnázia a maturitní odborné obory NEJSOU cílem** |
| Věk / tón | 15–19, přirozená čeština, lehký humor, **bez povinného generačního slangu** a zesměšňování chyb |
| Struktura | **8 misí H (m01–m08) + 6 misí E/J + volné SPACE**; otevřené, každá mise = jedna vyučovací hodina |
| Počet úrovní | **H: 8 misí; E/J: 6 navazujících misí (1–6, bez mezer, interní ID stabilní)** |
| Časový limit levelu | Žák po zaučení **vždy zvládne level ≤ 45 min** (5–8 aktivních bloků, 2–3 testy) |
| Hraní / režimy | **Otevřené mise**; pokrok mezi hodinami se zachovává (místní úložiště + JSON), žádný destruktivní auto-reset |
| Learning mode | **Jméno dobrovolné** (`null` v exportu neblokuje); export JSON úplný, po splnění mise nabídnut |
| Data (tablet/mobil i PC) | Pokrok v `localStorage` = „cache prohlížeče do vymazání"; **restart mise (potvrzený)** pouze pro aktuální misi/profil, třída zůstává |
| Auto-reset 3 h | **Nahrazeno**: pokrok misí se uchovává pro příští hodinu (§8.3); nedestruktivní režim |
| Samostatnost žáka | **Kompas 4 stupně** + **Ladička** (sókratické otázky); po neúspěšných pokusech **smí žák dostat názornou ukázku** — ÚKOL se neblokuje pravidlem „nikdy neprozradit řešení" (§4, §6) |
| Motivace | **Pouze pozitivní** — žádné penalizace (nápověda nic nestojí); značky **Zprovozněno → Ověřeno → Upraveno** |
| Hodnocení | **Certifikát fakultativní**, váže se na **doložené** dokončení (nenásobí se odměnami); značky dle §10 |
| Simulace | **Jeden vykonávací model**: animovaný běh = krokování = automatické testy (stejné sémantiky); ruční „žák = procesor" zůstává výchozí pro krokování |
| Vizuál | Estetika **servisní lodi HEFAISTOS** (vesmírná, omezené rušivé efekty; zvuk a zbytečné animace vypnutelné, `prefers-reduced-motion`) |
| Platforma | **Tablet + PC** responzivní; porty přístupné bez hoveru |
| Technika | **Jeden HTML soubor**, žádný build (GPL, SPA) |
| Revize funkčnosti | **TACHI-style F0**: evidence-driven audit algoritmů/procesů + testovací sada (viz §12) |

---

## 1. Vize a herní smyčka

### 1.1 Story (krátká, sci-fi, HEFAISTOS)
> **Servisní loď HEFAISTOS** — po elektromagnetické bouři je nutné obnovit řídicí postupy
> dílny, výroby a zásobování. Žák je **palubní technik / strojník**, průvodcem robot **ŠROUB**.

- Příběh uvádět nejvýše **několika krátkými větami**; nevyžadovat čtení dlouhého lore.
- Přirozená čeština, **lehký humor**, bez povinného generačního slangu a zesměšňování chyb.
- CNC a 3D tiskárna = **zjednodušené fiktivní simulace**, nikoli návody k obsluze reálného zařízení.
- Po splnění mise se příslušné **zařízení na lodi viditelně obnoví**.
- Příklad tónu: „Náhradní držák máme. Tedy… jeho obrázek. Tiskárna čeká na tvůj postup."

### 1.2 Core loop (adiktivní `one-more-try`, čistě pozitivní)

```
CÍL (1 věta, ≤ 15 slov) → SESTAV diagram → SPUSTIT / KROKOVAT / OVĚŘIT
  ├─ PASS → Značka „Zprovozněno" → „Ověřeno" → certifikát (fakultativně) → „DALŠÍ MISE →"
  └─ FAIL → „Test 2: čekal jsem 20 g, máš 100 g." → Ladička 🐞 / Kompas ? (zdarma) → SPUSTIT ZNOVU ▶
```

- FAIL je výzva k opakování, **nikdy trest**. Nápověda nikdy nestojí XP — jen nesbíráš bonus „samostatné řešení".
- Po neúspěšných pokusech **smí žák dostat názornou ukázku**; pravidlo „nikdy neprozradit řešení" se neaplikuje jako tvrdá blokáda (§4).

### 1.3 Co se NEMAŽE (zadání „nic neubrat bez důvodu")

| Funkce | Opatření |
|---|---|---|
| Editor (bloky, tahání, šipky, snap 14 px, kolize) | beze změny |
| simulace + token + krokování + breakpointy + rychlost | zachovat; sjednotit sémantiku s AUTO testy (§5, §9) |
| Visual RAM + terminal/konzole | zachovat; RAM zvýrazňuje změny, protokol zkrácen (§7, §10) |
| Undo/redo, marquee, kopírovat/vložit (i Word/PPT), export JSON/SVG, WIPE | zachovat → do Profi/Učitel (§7.9) |
| Audio (click/error/success/data-scan) | zachovat + vypínač zvuků (§3) |
| Cyber-spark, glitch, neon, glass | zachovat v odlehčené podobě; rušivé efekty vypnutelné; glitch pod `prefers-reduced-motion` |
| Výchozí hra „Sbírání jablek" | zachována ve **volném režimu (SPACE 1 = jablka demo)** |
| Pracovní plochy | reinterpretace: MISE + SPACE 1 (jablka) + SPACE 2–5 (prázdné) (§7.9) |
| Export JSON celého stavu | nová specifikace §8: úplný snapshot všech misí + všech SPACE |

---

## 2. Dvouvrstvá architektura (uvnitř jednoho HTML)

**Vrstva 1 — Studio (`App`):** editor + simulace + linter + export (dnešní kód).
**Vrstva 2 — Hra (`Game`):** learning mode, jméno (nepovinné), mise, značky/odměny, certifikáty, Kompas, Ladička, sledování času mise (≤ 45 min, nedestruktivní).

> **V2.2:** dvouvrstvá architektura zůstává; místo „stupňů" modelujeme **profily a mise** (§3):
> `profileId` (`H` / `E_J`) × `missionId` (`m01`–`m08`). Přidává se centrální stav mise:
> `openMission`, `openAssignment`, `initializeMission`, `restartMission`, `saveProgress`,
> `exportProgress`, `importProgress` — oddělené operace, `openAssignment` nikdy nezapisuje
> výchozí bloky ani neresetuje pokus (§7.9, §12).

Datové klíče `blockflow_v2_player` / `blockflow_v2_progress` a `blockflow_v3_ws_*` (plochy) v `localStorage` (migrace z `v1_1` bezeztrátová). Žádný server, žádný tracking.

```
Game          – stav hráče, jméno (nepovinné), značky/XP, hodnost, stav misí, čas mise (≤ 45 min)
Data          – profily H / E_J + mise m01–m08 (mission objects, testy, scaffolding) + jablka demo
MissionState  – openMission / openAssignment / initializeMission / restartMission / saveProgress / exportProgress / importProgress
Checker       – auto-kontrola: evaluátor podmínek + tester událostí a výsledků (jeden engine jako simulace)
Compass       – 4-stupňové nápovědy (zdarma, čistě pozitivní)
Laddicka      – sókratický debug asistent po FAIL
Cert          – certifikát SVG (jméno, datum, čas) — fakultativní, k doloženému dokončení
Session       – sledování času na misi (≤ 45 min), nedestruktivní přepínání, bez auto-resetu
StudioBridge  – napojení na App (sim, konzole, export)
```

---

## 3. Nutné minimum RVP — profily H / E_J

Mise jsou **otevřené** (žák může pracovat napřeskáčku, mise se nemusí odemykat řetězcem).
Každá mise je navržena na **1 vyučovací hodinu (≤ 45 min po zaučení)**: 5–8 aktivních bloků,
2–3 testovací vektory, 1 řádek cíle, Kompas vždy po ruce.

| ID | Mise (HEFAISTOS) | Princip | H | E/J |
|---|---|---|---|---|
| **m01** | Probuď dílnu | Posloupnost, čtení a vysvětlení postupu | Ano | Ano |
| **m02** | CNC odmítá pracovat | Větvení | Ano | Ano |
| **m03** | Vytiskni náhradní držák | Vstup, výpočet, výstup | Ano | S oporou |
| **m04** | Vyrob sadu spojek | Opakování podle počtu | Ano | Ano |
| **m05** | Tři dobré kusy | Podmíněný cyklus a počítání | Ano | — (vynechat) |
| **m06** | Skladový robot zabloudil | Ladění a výběr testu | Ano | Ano |
| **m07** | Urychli výrobní linku | Porovnání a optimalizace | Ano | — (vynechat) |
| **m08** | Vlastní servisní zakázka | Samostatná tvorba a předání | Ano | Menší rozsah |

- V E/J se zobrazují **šest navazujících levelů 1–6 bez mezer**; interní ID zůstávají stabilní.
- Profil se před žákem **neoznačuje jako horší**; přepnutí profilu nesmí přepsat práci jiného profilu.

**Detail mise (schéma + příklad — každá mise se plní stejně autorsky):**

```js
{
  id: "m04_sady_spojek",
  profileId: "H",                       // nebo "E_J"
  nazev: "Vyrob sadu spojek",
  cil: "Vyrob 4 spojky cyklem OPAKUJ.", // ≤ 15 slov
  typ: "sestav",
  bloky: ["start","io","process","loop","end"],
  skaffold: { /* rozestavené kartičky, nepropojené; v E/J částečně propojený základ */ },
  testy: [ { vstupy: {...}, vystup: "4 spojky" }, ... ],  // 2–3 vektory; ověřují skutečné události
  kompas: { cil:1v, hack:1v, vzor:1v, postup:≤1řádek+odkaz }, // zdarma; ukázka po neúspěchu povolena
  refReseni: {...},
  maxCasMin: 45,
  bloom: "aplikace",
  opory: "E_J: výběry hodnot/operátorů, větší vizuální opora, méně textové syntaxe",
  rvp: ["H: zápis algoritmu diagramem", "H: větvení a cykly", "E/J: vstup → výstup"]
}
```

> **Obsah misí:** kompletní specifikace m01–m08 vč. variant E/J je v **§16**. Stupeň s podmíněným
> cyklem a počítadly odpovídá v novém členění misi **m05 „Tři dobré kusy"** (viz §16 m05).

---

## 4. Vzorová mise: „Vyrob sadu spojek" (m04)

Vzor je přepracovanou specifikací bývalého stupně „Kontrola kvality" — nyní v podobě m04 (opakování)
a m05 (podmíněný cyklus s počítadly). Kompletní specifikace všech misí je v **§16**. Volný režim
(SPACE 1) si ukázku jablek zachovává.

- **Cíl:** „Vyrob 4 spojky. Zkopírovaný příkaz nahraď cyklem OPAKUJ."
- **Povolené bloky:** start, io, process, loop, note, end.
- **Scaffolding:** START + AKCE + SMYČKA `OPAKUJ 4×` s jasně ohraničeným tělem + jedna výrobní operace uvnitř + VÝSTUP + KONEC + POZNÁMKA (nepropojené, rozhozené; v E/J částečně propojený základ).
- **Testy (auto-kontrola — ověřuje skutečné provedení výrobních operací, ne jen text):**
  ```
  H:   počet = 4  → vzniknou právě 4 spojky
  H:   počet = 0  → 0 spojek (žádný průchod)
  H:   počet = 6  → 6 spojek (malá změna) — a osvědčuje opakovatelnost
  E/J: OPAKUJ 4×, počet přímo v kartičce
  ```
- **Kompas (zdarma, 4 stupně, max 40 slov):** Cíl („Potřebuješ 4 spojky — cyklus je dělá za tebe.") → Háček („Kolikrát by ses opakoval ručně?") → Vzor („Zkopírované příkazy nahraď jedním OPAKUJ 4×") → Postup („Vlož výrobní operaci do těla cyklu.").
- **Motivace:** značky **Zprovozněno → Ověřeno → Upraveno**; žádné penalizace, nápověda nic nestojí, ukázka po neúspěchu povolena.

---

## 5. Auto-kontrola (Checker) — jádro ověření

1. **Evaluátor podmínek:** rozšířit `parseVariable` o vyhodnocení booleovských výrazů podmínek (`krok < 3`, `krytZavren == true`). `=` vs `==` → Linter varuje (zůstává).
2. **Režim AUTO:** „OVĚŘIT" spustí diagram automaticky — podmínky se řeší samy, VSTUP z testovacího vektoru, VÝSTUP se zachytí.
3. **Tester ověřuje skutečné události a výsledky zpracování**, nejen shodu textu: schod dosahuje konce, připojení nutných větví, provedení cyklu N×, platnost vstupů; první neshoda → konkrétní zpráva („Test 2: čekal jsem 20 g, máš 100 g.").
4. **Jeden vykonávací model** pro animovaný běh, krokování i automatické testy (stejné sémantiky, poznámky nemění výsledek). Slepé uličky / smyčky: okamžitá červená značka na bloku + **limit běhu** chránící aplikaci.
5. **Ruční „žák = procesor" zůstává výchozí** pro krokování (učební režim); OVĚŘIT je vždy k dispozici.
6. **Více správných algoritmů:** hodnocení přijímá ekvivalentní řešení; případné omezení konstrukce je v zadání (např. „Použij opakování").
7. **VOLÁNÍ do povinné cesty učebních oborů nezařazujeme**; symbolická simulace se neprezentuje jako skutečný podprogram (zůstává jen ve volných plochách).
8. **Efektivita = vykonané operace na datech** (m07), nikoli počet bloků; poznámky nejsou operace.
9. **Po editaci** se aktuální ověření zneplatní (značka „Upraveno"); historický dosažený pokrok zůstává odděleně.

---

## 6. Samostatnost žáka: Kompas + Ladička (žádné tresty)

### 6.1 Kompas (4 stupně, zdarma)
- „?" v misi; stupeň 1 vždy; další po (a) dalším FAILu nebo (b) 45 s bez pokroku.
- Stupeň 4 zobrazí vzorové/řešení nebo názornou ukázku — **po neúspěšných pokusech žák smí ukázku dostat**; tvrdé pravidlo „nikdy neprozradit řešení" se nepoužívá jako blokáda (§4).
- Nápovědy se mezi misemi „odbourávají" (scaffolding fading). Nápovědy lze připravit předem podle typických chyb.

### 6.2 Ladička (po FAIL, sókratické otázky — Paul & Elder, vtipná)
1. „Který blok podle tebe vyrobil špatný výstup?" → žák kliká na blok.
2. „A co by ten blok měl udělat?"
3. „Co by se stalo, kdyby se otevřel 2×?"
- Po 2 špatných tipech zúží na 2 kandidáty — **vede k samostatnému objevení rozporu**; po neúspěchu smí nabídnout názornou ukázku.

### 6.3 Pravidla
- Vzorové řešení i nápovědy jsou zdarma; **značky a odměny jsou jediná motivace k samostatnosti** (pozitivní, žádný odečet).
- Učitel zasahuje jen kosmeticky; záznamem je značka „Ověřeno" (a případně certifikát).
- Metody dle `vzdelavaci-metodiky.md`: postupné ubírání podpory, Bloomova gradace (odhadni → spusť → vysvětli → oprav → uprav), naváděcí otázky (nejprve k chybě, poté místo, pak krok), učení z chyby (vstup, očekávaný vs skutečný výsledek), přenos a opakování, formativní hodnocení, krátké vzájemné ověření.

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

### 7.9 Režimy a pracovní plochy (mise + SPACE)
- **Přepínač ploch v horní liště:** `MISE · SPACE 1 · SPACE 2 · SPACE 3 · SPACE 4 · SPACE 5`.
  Aktivní plocha je zvýrazněná; klik přepne plochu (každá má vlastní stav).
- **MISE** — learning mode: **profily H / E_J**, mise `m01…m08`, jméno **dobrovolné**,
  značky Ověřeno, certifikát fakultativně. Přepnutí profilu **nepřepisuje práci** druhého profilu.
- **Jméno:** volitelné; kdo nezadá, v exportu je `null` a export probíhá bez dotazu.
- **SPACE 1** — **jablka demo** + volný editor (bez jména).
- **SPACE 2–5** — prázdné plochy pro vlastní tvorbu (sloty `space2…space5`) + **dobrovolná dílna** s kartičkami (§11).
- **Vstup do mise (klik na level):** vždy otevře **modál zadání** (název, příběh, cíl, fáze, nápověda, postupné odkrývání). **Kliknutí nesmí přemazat rozpracovanou práci**:
  - *nová mise:* jednorázově se vytvoří výchozí sestava kartiček z neměnné definice;
  - *rozpracovaná/dokončená:* načte se uložený stav beze změny; výchozí sestava se nevytváří znovu;
  - *restart* je samostatná výslovná akce (§7.10).
- **Změny v modalu** (otevření/zavření/přepnutí mise/obnovení stránky) **nikdy nemění bloky, propojení, vstupy, fázi, historii pomoci ani záznam dokončení**.
- **Klíče ploch:** hráč/pokrok `blockflow_v2_player`/`blockflow_v2_progress`, plochy `blockflow_v3_ws_<slot>` (mise i SPACE), aktivní `blockflow_v3_active_ws`. Migrace v1→v2/v3 = F4. Po změně scaffoldu se načte čistý stav jen pro nově založené mise.
- **Export/import (JSON):** jediná dvojice „Export JSON" / „Import JSON" v menu souborových operací (žádná výrazná dvojice tlačítek na ploše). **Export = úplný snapshot celé aplikace** — všechny mise, všechny SPACE, aktivní kontext, jméno (`null`), datum+čas (`savedAt` ISO 8601 + `savedTimeZone`), verze formátu, historie a platnost ověření (podrobnosti §8).
- **Cheat (jen pro vývoj/testování):** `Ctrl+Alt+C` s aktivním CapsLockem krok za krokem ze vzorového řešení; další stisk vyčistí.

### 7.10 Restart mise
- Restart je **samostatná výslovná akce** pro aktuální misi a profil (ne přepnutí/zavření/obnovení).
- Potvrzení: „Vrátit tuto misi na začátek? Rozpracované řešení této mise bude nahrazeno."
- Zrušení nic nezmění; potvrzení obnoví **pouze danou misi/profil** (kartičky, propojení, fáze).
- Historické dosažené dokončení zůstává; aktuální pokus se označí jako nový a musí se znovu ověřit.
- **Celkové vymazání postupu** (pokud existuje) je jiná, samostatná akce — nezaměňovat s restartem levelu.

---

## 8. Režimy, data, ukládání a čas (mise / 45 min / export JSON)

### 8.1 Režimy
- **Learning mode (MISE)**: profile H nebo E/J; jméno **dobrovolné** (1–30 znaků, uloží se na zařízení; kdo nezadá, pracuje s `null`). Z jména se generuje certifikát (fakultativně). Modál jména se nabídne před zahájením, vyžadování není.
- **Volný režim (SPACE 1 – jablka + SPACE 2–5)**: bez jména, čistý editor + ukázka jablek, dobrovolná dílna s kartičkami (§11).

### 8.2 Persistence (tablet/mobil i PC)
- Pokrok (profily, mise, značky, certifikáty, SPACE) se ukládá do `localStorage` = „cache prohlížeče do vymazání" — přežije obnovení stránky.
- **Automatické ukládání:** po změnách s krátkým zpožděním + **vždy před přepnutím mise**; ukládá se **poslední skutečně editovaný diagram**, ne jen výchozí šablona. Pokud místní uložení selže, zobrazí se stručná informace a umožní se export.
- **Restart mise** je lokalizovaný (§7.10); případné celkové vymazání je samostatná potvrzená akce.

### 8.3 Čas a pokrok napříč hodinami
- Mise je navržena na **1 vyučovací hodinu (≤ 45 min)**; aplikace neudržuje destruktivní 3h směnu.
- **Pokrok se mezi hodinami zachovává** (localStorage + přenosný JSON), takže pomalý žák pokračuje příští hodinu; rychlý žák není nucen práci uměle prodlužovat.
- Možný nenápadný údaj času/deníku, není-li rušivý; bez trestání a bez povinné denní série.

### 8.4 Export JSON (úplný snímek) a nabídka po splnění
- **Obsah exportu:** všechny mise (stavy, bloky, propojení, vstupy, odpovědi, nápovědy, výsledky testů), **všechny SPACE vč. prázdných uživatelem upravených**, aktivní režim (`level`/`space`), profil, stabilní ID, fáze; odděleně historie a platnost ověření aktuálního řešení; jméno nebo `null`; `savedAt` + `savedTimeZone`; verze formátu a verze obsahu misí.
- **Metadata:** `schemaVersion`, `savedAt` (jedna autoritativní ISO 8601 časová značka), `savedTimeZone`, `playerName`, `activeContext` (režim, ID plochy, profil/mise/fáze), `missions`, `spaces`. Navržený název: `hefaistos-H-postup-2026-09-24.json`.
- **Nabídka po splnění** (výsledkový modal): „Mise splněna. Chceš si uložit postup pro příští hodinu?" → primární **Stáhnout JSON**, sekundární **Teď ne** (lze pokračovat). Stahování se nespouští automaticky.
- **Opakovaný úspěšný test nesmí znovu otevírat nabídku ani násobit odměny** — nabídka se váže na přechod aktuálního pokusu do dokončeného stavu. Úspěšný dílčí test není automaticky splněním celé mise, pokud zbývá povinná úprava či ověření.
- **Před dokončením:** nenápadné „Export JSON" v menu souborových operací (konec hodiny u rozpracované mise); žádné povinné vyplňování jména.
- **Import:** nejprve validace v dočasném stavu (neplatný soubor nemění práci); při střetu s existující prací přehled + výslovné potvrzení nahrazení + možnost předběžného exportu. Po importu se obnoví celá práce i aktivní kontext (aktivní level → otevřít zadání; aktivní SPACE → otevřít právě tento SPACE). Import neresetuje `savedAt` na aktuální čas. Starší exporty editoru lze načíst jako diagram s upozorněním.
- **Hodnotit výsledek a události,** nikoli jen přesnou shodu výstupního textu; z `completed` se neodvozuje prokázaná správnost — při odevzdání se testy znovu spustí.

### 8.5 Mise = ≤ 45 min (po zaučení)
- Návrhová konstanta: 5–8 aktivních bloků, 2–3 testy, 1 řádek cíle, Kompas vždy — vychází do 45 min i pro méně zkušené.
- `maxCasMin: 45` v datech mise; delší než 45 min → Kompas nabídne víc (pozitivní push, bez trestu).
- Struktura hodiny (učební plán, nikoli odpočet v aplikaci): 0–5 min příběh+zadání v modalu, 5–10 odhad/volba kartiček, 10–25 stavba/úprava, 25–35 spuštění/krokování/opravy, 35–40 malá změna zadání, 40–45 vysvětlení + uložení (při dokončení nabídka exportu).

---

## 9. Certifikát (SVG — fakultativní, k doloženému dokončení)

- Po splnění **povinných částí mise a úspěšném ověření** se nabídne certifikát (výrazněji u m08).
- **Obsah:** logo · „CERTIFIKÁT SERVISNÍHO TECHNIKA" · název mise · **jméno žáka** (pokud je zadáno) · **datum + čas** dokončení · značky Zprovozněno–Ověřeno · razítko „CodeFlowChart HEFAISTOS • obory H a E/J" · GPL footer. **Bez odznaků; certifikát potvrzuje absolvované mise, nikoli automaticky splnění celého RVP.**
- **Motivace (§10):** značky **Zprovozněno → Ověřeno → Upraveno**; XP/hvězdy/hodnost (pokud zůstanou) se vážou na doložené dokončení; nápověda ani víc pokusů nesnižuje hodnocení.
- Generátor = nový SVG builder (stávající export schémat zůstává).
- Šířka ~A4 na šířku, stahuje se SVG; na tabletu i PC.

---

## 10. Textová politika (HEFAISTOS) + konverzní slovník

Tón služby HEFAISTOS: přirozená čeština, lehký humor, **bez povinného generačního slangu**,
bez zesměšňování chyb; CNC a 3D tiskárna jsou zjednodušené fiktivní simulace.

| Pravidlo | Formulace |
|---|---|
| Cíl mise | ≤ 15 slov, „oprav díl", „zprovozni dílnu" |
| Konzole | max 10 slov na řádek |
| Kompas | ≤ 40 slov na misi |
| Chyby | „Test 2: čekal jsem 20 g, máš 100 g." |
| Restart | „Vrátit tuto misi na začátek? Rozpracované řešení této mise bude nahrazeno." |
| Export po splnění | „Mise splněna. Chceš si uložit postup pro příští hodinu?" |

Konverze starých hlášek (jádro zachovat, zkrátit, odlehčit od „déčka"/operátora):
- „Inicializace CodeFlowChart Engine v1.1…" → „Systém: on."
- „Alokuji paměťový rámec… / Zpracování vlákna… ÚSPĚCH" → „Volám funkci … → návrat ✓"
- „Slepá ulička. Signál nemá kam pokračovat…" → „Zaseknuto: odtud nikam nevede šipka."
- „Detekován nekonečný cyklus… Stack Overflow!" → „Nekonečná smyčka! Zastavuji."
- „Architekt zvolil větev: ANO" → „→ ANO"

---

## 11. Vztah k RVP — obory H a E/J (mise m01–m08)

Cílem jsou **učební obory H (strojírenství, elektro, stavební aj. — příloha 2b)** a
**podpůrná cesta E/J (příloha 1b)**; výuková cesta je **návrhem realizace vybraných výstupů
RVP, nikoli jejich garancí** (finalizaci vazby na ŠVP ověřuje učitel).

| Dovednost | Mise | H | E/J |
|---|---|---|---|
| Zápis algoritmu vývojovým diagramem | m01 | ✓ | ✓ |
| Posloupnost, čtení a vysvětlení postupu | m01 | ✓ | ✓ |
| Větvení (podmínka) + kontrola | m02 | ✓ | ✓ |
| Vstup, výpočet, výstup | m03 | ✓ | s oporou |
| Opakování podle počtu (fixní cyklus) | m04 | ✓ | ✓ |
| Podmíněný cyklus + počítadla | m05 | ✓ | — |
| Ladění a výběr testu | m06 | ✓ | ✓ |
| Porovnání a efektivita (operace, ne bloky) | m07 | ✓ | — |
| Samostatná tvorba + předání | m08 | ✓ | menší rozsah |
| Modelování a simulace toku | m01–m08 (token, RAM) | ✓ | ✓ |

> V PROFI: statická tabulka „mise ↔ RVP výstupy", žádný sběr dat o žákovi.

### 11.1 RVP audit (2026-09-24) — pokrytí a mezery

**Cíl:** RVP SOV pro učební obory **H (příloha 2b — ICT v novém pojetí)** + **E/J (příloha 1b)**.
NE cílí na gymnázia, maturitní odborné obory ani specializaci ICT (18-20-M/01).

**Pokryto dobře (jádro pro obory H/E_J):** algoritmus jako posloupnost kroků; vývojový
diagram; proměnné + vstup/výstup; větvení; cykly (fixní `OPAKUJ` i podmíněný `OPAKUJ DOKUD` s počítadlem);
čtení a vysvětlení cizího diagramu; ověření a oprava; samostatná tvorba (m08 + volné plochy).

**Pokryto částečně / k doplnění:**

| Oblast RVP | Stav | Doporučení |
|---|---|---|
| Logické hodnoty a složené podmínky (`&&`, `||`, `!`) | evaluátor umí, v misích se cíleně netrénuje | jen jako volitelná rozšíření; nezatěžovat povinnou cestu |
| Datové typy (číslo vs. text) | implicitně v úlohách | samostatná ukázka s textem/číslem |
| Ladění (debug) | Ladička plánovaná | m06 = „testuje a ladí" (hlavní náplň) |
| Formativní sebehodnocení | značky Zprovozněno/Ověřeno/Upraveno | reflexe volitelně v certifikátu (F8) |
| Podprogram / funkce s návratem, pole/seznamy | nepokryto | **mimo povinnou cestu** (VOLÁNÍ nevykonává tělo); jen volně |

**Závěr:** pro obory H a E/J je pokrytí vybraných RVP výstupů **dostatečné**
(jádro algoritmizace bez specializačního programování). Ukázky (`SAMPLES`) slouží jako
„read + remix" (Bloom: porozumění → aplikace), m08 + volné plochy jako tvorba (Bloom: tvorba).

**Podkladové odkazy:**
- [RVP SOV – nové pojetí ICT, H, příloha 2b](https://digitalizace.rvp.cz/files/priloha-2b-ict-sov-h.pdf)
- [RVP SOV – nové pojetí ICT, E/J, příloha 1b](https://digitalizace.rvp.cz/files/priloha-1b-ict-sov-e-j.pdf)
- [NPI: změny informatického vzdělávání v SOV](https://digitalizace.rvp.cz/sov/co-se-meni)
- Pedagogická opora: `md-skills/vzdelavaci-metodiky.md` (selektivně použito dle zadání).

Konkrétní mise, počty hodin, příběh a technické řešení jsou navrženou pedagogickou realizací,
nikoli doslovnými požadavky RVP; při konečném zařazení učitel ověří vazbu na konkrétní obor a ŠVP.

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
| **Persistence** | migrace `v1_1`→`v2`→`v3`, auto-save, přepínání mise/plochy, restart mise, export/import JSON (úplný snímek) | testy ukládání + restart + JSON round-trip |
| **Import/export** | JSON round-trip, SVG (s/v konzolí), clipboard Word/PPT | round-trip test + vizuál |
| **Bezpečnost** | XSS přes label/RAM/konzoli; escaping všech `innerHTML` | security test (typicky injekce do bloku a proměnné) |
| **Responzivita** | 1440 / 1024 / 390 / 320 px; porty bez hoveru; touch ≥44 px | browser matrix |
| **Accessibility** | kontrast `--text-dim`; `prefers-reduced-motion`; focus | kontrast měřit + reduced-motion walkthrough |

### 12.2 Testovací sada (plánovaná)
- `syntax_check.js` (jako TACHI) — kontrola složených závorek/funkcí HTML.
- `flow_tests.js` — simulace jádra: parser, tester vektorů jablek A/B/C, port scenáře, nekonečná smyčka (detekce stavem), VÝSTUP `{var}`, literály v uvozovkách.
- `flow_check_tests.js` — Checker: evaluátor podmínek, `runCheckVector` (události, slepá ulička, zacyklení, výstup/trace), `mapOutsideStrings` (literály vs proměnné); v2: `counts` (operace N×), `requireLoop`, `maxOps` (efektivita), vyčerpání zásoby vstupů, povinné dosažení KONCE, poznámka v toku.
- `flow_storage_tests.js` — persistence, save/load ploch, migrace v1→v3, okrajové stavy.
- `flow_game_tests.js` — herní vrstva: profily H / E_J, jméno (dobrovolné), značky, mise `m01–m08`, `completeLevel` + certifikát, persistence, restart mise, `SAMPLES`.
- `flow_smoke_tests.js` — UI smoke: `App.init()` + HUD/mise/jméno/restart, menu ukázek + `loadSample`, `story` v modalu mise, `onLevelSuccess` (značky do menu), herní confirm modal.
- `flow_ui_tests.js` — matrix rozlišení, tablet porty, reduced-motion.
- Self-test mise m01–m08 pro oba profily (každá mise projde svými vektory; m04 nesmí projít pouhým vypsáním očekávané věty bez provedení operací) + `finished.md` evidence.

### 12.3 Výstup revize
- `finished.md` (chronologický záznam oprav + ověření) — dle `MASTER-AGENTS.md` §14.

---

## 13. Fáze implementace (rozložení + verifikace)

| Fáze | Rozsah | Verifikace |
|---|---|---|
| **F0** | **Revize funkčnosti** (§12): bugfixy `{var}`, tichá chyba výrazu, XSS, typewriter, death-loop, `fitToScreen`, porty | testy §12.2; session PASS |
| **F1** | `Game` + jméno (volitelné) + `Data` (profily H/E_J + mise m01–m08) + `MissionState` a režimy/plochy + modál zadání + scaffolding loader + značky (pozitivní) | vstup do mise vykreslí modál + scaffolding; otevření/zavření modalu nemění práci |
| **F2** | `Checker` (evaluace + tester + sjednocený engine, litál v uvozovkách) — režim OVĚŘIT | vektory m01–m08 (i jablka A/B/C) projdou; m04 neprojde bez provedení cyklu |
| **F3** | Kompas (zdarma) + Ladička + názorná ukázka po neúspěchu (ne tvrdá blokáda) | scénář „žák ztracen → po ukázce sám pokračuje a dokončí" |
| **F4** | `MissionState` + restart mise (potvrzený) + auto-save + export/import JSON (úplný snímek) | akceptační scénáře §14 (kliknutí nic nepřepíše, restart jen mise, JSON round-trip vč. SPACE) |
| **F5** | Mise m01–m04 obsahu (zadání, testy, kompas; E/J varianty m03 s oporou) | každá mise projde svými vektory v obou profilech |
| **F6** | Mise m05–m08 (H) + podpůrné varianty E/J (m06, m08 menší rozsah) | self-test všech misí obou profilů |
| **F7** | UI tablet: porty, šipky ANO/NE, stopa kroků, minimapa, topbar režimy | 768 i 1280 px |
| **F8** | Certifikát SVG (jméno fakultativně, datum, čas, značky) + poslední motivace určité odměny zabraň multiplikaci | design review + tisk; opakovaný test nedá druhou odměnu |
| **F9** | Polishing: motion/reduced-motion, kontrast, HEFAISTOS copy; `finished.md` | full walkthrough m01–m08 pro H i E/J |

Každá fáze končí **definovaným autotestem**, ne „to běží".

---

## 14. Kritéria úspěchu (Definition of Done)

1. **H** zobrazuje **8 misí (m01–m08)**, **E/J** **6 navazujících misí (1–6, bez mezer)**; interní ID stabilní.
2. Kliknutí na libovolný level **vždy otevře modal zadání**; otevření/zavření modalu, přepnutí mise, obnovení stránky ani změna profilu **nezničí práci** (žák přesune blok, změní hodnotu a propojení → po návratu vše zůstane).
3. **Výchozí sestava se vytvoří jen při prvním vstupu** do dosud nezaložené mise nebo po restartu; i úmyslně vyprázdněná plocha zůstane prázdná.
4. **Restart** je potvrzená akce jen pro aktuální misi/profil; zrušený restart nic nezmění.
5. Po splnění mise se **nabídne stažení JSON** (volba „Teď ne" umožní pokračovat); opakovaný úspěšný test **nenásobí odměny ani nabídku**.
6. **Export JSON je úplný snímek celé aplikace** (všechny mise + všechny SPACE + aktivní kontext + jméno/`null` + datum a čas `savedAt`); import validuje, nepoškozuje práci a nahrazuje jen s výslovným potvrzením.
7. **Cyklová mise neprojde pouhým vypsáním očekávané věty** bez provedení výrobních operací; krokování a automatické ověření dávají pro stejné vstupy **stejné výsledky** (jeden engine).
8. **Více správných algoritmů projde** (pokud respektují omezení v zadání); nápověda ani víc pokusů **nesnižuje hodnocení**.
9. Žák mise **≤ 45 min po zaučení**; pokrok přežije obnovení i přepnutí profilu/plochy.
10. Pouze pozitivní motivace; značky **Zprovozněno → Ověřeno → Upraveno** odpovídají skutečné činnosti.
11. Nic ze dnešní funkčnosti nezmizelo (editor, simulace, exporty, undo/redo, jablka, SPACE).
12. Texty ≤ 15 slov; „nečíst, klikat."
13. Plugin F0: testy green (syntax, jádro, checker, úložiště, hra, smoke, UI matrix, security).

### 14.1 Akceptační scénáře (v plném znění ze zadání)

1. H zobrazuje 8 misí, E/J 6 souvisle očíslovaných misí.
2. Kliknutí na libovolný level vždy otevře modal zadání.
3. Žák přesune blok, změní hodnotu a propojení; po opětovném otevření stejného levelu vše zůstane zachované.
4. Přepnutí do jiného levelu a zpět, obnovení stránky i změna příběhu nezničí práci.
5. I úmyslně vyprázdněná plocha zůstane po návratu prázdná; šablona se nevytvoří znovu podle počtu bloků.
6. Zrušený restart nic nezmění. Potvrzený restart obnoví pouze aktuální misi a profil.
7. Po splnění celého levelu se nabídne stažení JSON. Volba „Teď ne" umožní pokračovat.
8. Opakovaný úspěšný test bez změny stavu nevyvolá další exportní modal ani další odměnu.
9. Rozpracovaný level lze exportovat z menu a po importu na jiném počítači obnovit včetně fáze a propojení.
10. Neplatný nebo nekompatibilní JSON nepoškodí aktuální práci; nahrazení existující práce validním importem je výslovné.
11. Cyklová úloha neprojde pouhým vypsáním očekávané věty bez provedení výrobních operací.
12. Krokování a automatické ověření dávají pro stejné vstupy stejné výsledky.
13. Alternativní správné řešení projde, pokud dodržuje uvedená omezení.
14. Použití nápovědy ani více pokusů nesnižuje dosažitelné hodnocení.
15. V pilotní hodině žák zvládne ovládání bez dlouhého výkladu; čas tráví řešením postupu, nikoli hledáním bloků nebo opravami syntaxe.
16. Žák upraví dva levely a dvě různé SPACE, potom exportuje z levelu: po importu jsou všechny čtyři úpravy zachované a aktivní je správný level.
17. Stejný úplný export provedený ze SPACE zachová levely i ostatní SPACE a po importu otevře původně aktivní SPACE.
18. Export obsahuje poslední editaci bez nutnosti předem přepnout plochu, jméno hráče nebo `null` a platné datum i čas uložení.
19. Druhý export aktualizuje `savedAt`; samotný import původní čas uložení nezmění. Uložení bez jména funguje bez dodatečného dotazu.

---

## 15. Rozhodnuté volby (uzavřeno 2026-09-24, doplněno V2.2)

1. **Restart mise:** restart je **potvrzená akce jen pro aktuální misi/profil**; historie dokončení zůstává, aktuální pokus se označí jako nový a znovu ověří. ✓
2. **Odznaky:** **ne** — jen značky Zprovozněno/Ověřeno/Upraveno (+ volitelně XP/hvězdy/hodnost na certifikátu vázané na doložené dokončení). ✓
3. **Jméno:** **dobrovolné** (1–30 znaků, 1× na zařízení); v exportu `null`, export nikdy neblokuje. ✓
4. **Kompas:** nápověda nic nestojí, „bez nápovědy" je jen bonus (nikdy odečet); po neúspěchu smí přijít názorná ukázka. ✓
5. **Auto-reset 3h:** **zrušeno** — pokrok misí se uchovává pro příští hodinu (localStorage + JSON); žádná destruktivní směna. ✓
6. **Obsah misí:** ⑄ **m01–m08 (H) + 6 misí E/J** (viz §16), bez povinného VOLÁNÍ/podprogramu. ✓
7. **Profil H vs E_J:** rozdílný obsah a opory (E_J: menší rozsah, výběry hodnot/operátorů, více vizuální opory); přepnutí profilu nepřepisuje práci. ✓
8. **Export JSON:** jedna nenápadná položka v menu; po splnění nabídka stažení v modalu; **bez** výrazné dvojice tlačítek na ploše. ✓

---

## 16. Kompletní obsah misí (m01–m08 + varianty E/J)

> **Příběhové téma (V2.2):** jednotný příběh **HEFAISTOS** (servisní loď, robot ŠROUB) pro oba profily;
> profily se liší **obsahem a oporami** (H vs E_J), nikoli jen texty. Původní duality `streamer`/`operator`
> (NARRATIVES, toggleNarrative) se **ruší**; mění se jen prezentační texty, algoritmus úloh zůstává.
> **Změna prezentace nesmí přepisovat uživatelskou práci** — přepnutí profilu načte stav bez přepisu.
>
> **Pole `story`:** každá mise má `story` — větu „co budeš dělat" (např. „Probudíš dílnu…", „Potřebuješ
> náhradní držák…"). Zobrazuje se v modalu zadání pod „Co budeš dělat"; modal dále uvádí, jaké kartičky
> lze ponechat nepoužité. Texty modalu zvětšeny o 50 % (`.modal-box`).

> Plná specifikace každé mise stejným vzorem jako §4 — zadání, scaffolding, testovací vektory, Kompas,
> vzorové řešení (pseudodiagram) a opory E/J. Syntaxe výrazů se finalizuje ve F2 podle evaluátoru (§5).

### 16.x Společná konvence (pro všechny mise)

- **Typy bloků:** `start`, `process (AKCE)`, `io (VSTUP/VÝSTUP)`, `decision (PODMÍNKA)`, `loop (SMYČKA)`, `call (VOLÁNÍ)`, `note (POZNÁMKA)`, `end (KONEC)`. VOLÁNÍ jen ve volných plochách, ne v povinné cestě.
- **Cíl:** vždy ≤ 15 slov; po zadání viditelný v topbaru.
- **Testy:** 2–3 vektory na misi; ověřují **skutečné události a výsledky zpracování**, ne jen přesný text.
- **Kompas:** 4 stupně, celkem ≤ 40 slov (Cíl → Háček → Vzor → Postup); po neúspěchu smí místo vzoru přijít názorná ukázka.
- **Motivace:** značky **Zprovozněno → Ověřeno → Upraveno**; volitelné XP/hvězdy/hodnost vázané na doložené dokončení; nápověda ani víc pokusů nesnižuje hodnocení.
- **Opora E/J:** výběry hodnot/operátorů, větší vizuální opora, méně textové syntaxe; výchozí částečně propojený základ u větších diagramů.
- **Restart:** vždy přes „Restart" tlačítko s potvrzením — nepřepisuje jiné mise; po restartu se znovu ověří aktuální řešení.

---

### m01 — Probuď dílnu

**Typ:** sestav · **Bloom:** aplikace · **Učivo:** posloupnost, pořadí kroků, čtení postupu · **Profil:** H i E/J.

**Příběh:** Dílna je potmě. ŠROUB zapnul baterku a považuje problém za vyřešený.

- **Cíl:** „Sestav jednoznačné pořadí spuštění dílny." (≤ 15 slov)
- **Povolené bloky:** start, process, io, note, end.
- **Scaffolding:** kartičky START, „zapnout napájení", „diagnostika", „aktivace pracoviště", KONEC (rozhozené, propojení nesmí napovídat).
- **Požadovaná akce:** určit nutnou návaznost a propojit tok; simulace postupně obnovuje dílnu.
- **Test:** aktivace smí nastat až po úspěšném předchozím postupu; žák poté označí krok po diagnostice.
- **Malá změna:** vložit kontrolu spojení před aktivaci.
- **H:** opravit neurčitý pokyn „Počkej chvíli" na přesný, vykonatelný pokyn.
- **E/J:** jen potřebné kartičky + možnost přehrát první dva kroky.
- **Rozsah:** ~5–6 bloků včetně START a KONEC.
- **Kompas:** Cíl: „Dílna se spouští v pevném sledu." → Háček: „Může se aktivovat pracoviště dřív než napájení?" → Vzor: START → zapnutí napájení → diagnostika → aktivace → KONEC → Postup: „Propoj kroky tak, aby každý navazoval na předchozí."

---

### m02 — CNC odmítá pracovat

**Typ:** sestav + oprav · **Bloom:** aplikace → analýza · **Učivo:** větvení PODMÍNKA, kontrola · **Profil:** H i E/J.

**Příběh:** Kontrolka hlásí otevřený kryt. ŠROUB navrhuje přelepit kontrolku. Technik obnoví správné rozhodování.

- **Cíl:** „Rozhodni podle vstupu `krytZavren`." (≤ 15 slov)
- **Povolené bloky:** start, io, decision, process, note, end.
- **Scaffolding:** START → načti stav → podmínka → povolit výrobní simulaci / požádat o zavření krytu → KONEC.
- **Testy:** otevřený a zavřený kryt; před spuštěním žák odhadne větev (hraniční chování `true`/`false`).
- **Malá změna:** upravit stejný princip pro kontrolu přítomnosti materiálu; nespojovat hned obě podmínky.
- **H:** nabídnout jednu alternativní chybnou podmínku (žák vybere správnou).
- **E/J:** správná podmínka je připravená, žák připojuje větve.
- **Rozsah:** ~6 bloků.
- **Kompas:** Cíl: „Kryt zavřený = výroba, otevřený = zastavit." → Háček: „Co se stane s výrobou, když kryt dojde dovnitř?" → Vzor: podmínka `krytZavren == true` → ANO = výroba, NE = výzva → Postup: „Propoj větev ANO a NE pod PODMÍNKOU."

---

### m03 — Vytiskni náhradní držák

**Typ:** sestav · **Bloom:** aplikace · **Učivo:** proměnná, VSTUP, výpočet, VÝSTUP · **Profil:** H i E/J (s oporou).

**Příběh:** Při manévru proletěl klíč jídelnou. Posádka potřebuje držáky na nářadí.

- **Cíl:** „Z počtu výrobků vypočítej spotřebu materiálu." (≤ 15 slov)
- **Model:** jeden držák spotřebuje 20 g; tok načte počet, vypočítá součin a zobrazí výsledek.
- **Povolené bloky:** start, io, process, note, end.
- **Testy:** 1, 3 a 5 držáků → 20, 60 a 100 g (vč. desetinného/okrajového vstupu).
- **Malá změna:** jiný model potřebuje 30 g na kus.
- **H:** žák volí operaci a následně nahradí pevnou spotřebu vstupní hodnotou.
- **E/J:** žák skládá výraz pomocí polí „počet × spotřeba jednoho kusu".
- **Vizuální výstup:** ukazatel materiálu a číselná hodnota s jednotkou.
- **Nezařazovat** teploty, nastavení sliceru ani další nesouvisející parametry.
- **Rozsah:** ~5–6 bloků.
- **Kompas:** Cíl: „Spotřeba roste s počtem kusů." → Háček: „Použiješ sčítání, nebo násobení?" → Vzor: AKCE `spotreba = pocet * 20` + VÝSTUP → Postup: „Načti počet, vynásob a vypiš s jednotkou."

---

### m04 — Vyrob sadu spojek

**Typ:** sestav · **Bloom:** aplikace → analýza · **Učivo:** fixní cyklus (OPAKUJ), tělo cyklu · **Profil:** H i E/J.

**Příběh:** Posádka potřebuje čtyři spojky. ŠROUB zkopíroval výrobní příkaz čtyřicetkrát „pro jistotu".

- **Cíl:** „Nahraď opakované příkazy cyklem s počtem." (≤ 15 slov)
- **Povolené bloky:** start, process, loop (SMYČKA), note, end.
- **Scaffolding:** cyklus `OPAKUJ 4×` s jednou výrobní operací v těle; tělo cyklu jasně ohraničené, návratová vazba automaticky vedená.
- **Test:** skutečně vzniknou právě čtyři spojky; **nestačí vypsat číslo 4** — ověření počítá vykonanou výrobní operaci. Dále otestovat 0 a 1 průchod.
- **Malá změna:** objednávka šesti spojek.
- **H:** počet přichází ze vstupu; testovat 0, 1 a více kusů.
- **E/J:** počet se mění přímo v kartičce, bez ručního počítadla.
- **Návrh zobrazení:** neměnit princip editoru více, než je potřeba pro srozumitelnost.
- **Kompas:** Cíl: „Čtyři spojky = čtyřikrát stejná výroba." → Háček: „Kolikrát bych psal příkaz ručně?" → Vzor: `OPAKUJ 4× → vyrob spojku` → Postup: „Umísti výrobu do těla cyklu a nastav počet."

---

### m05 — Tři dobré kusy

**Typ:** sestav · **Bloom:** aplikace → analýza · **Učivo:** podmíněný cyklus s počítadlem, větvení uvnitř cyklu · **Profil:** H (E/J vynechat).

**Příběh:** Linka funguje, ale některé spojky vypadají, jako by je žvýkal robot.

- **Cíl:** „Kontroluj dodávku, dokud nejsou 3 dobré kusy." (≤ 15 slov)
- **Povolené bloky:** start, io, process, decision, loop, note, end.
- **Scaffolding:** připravený základ — počítadlo dobrých kusů `dobrych = 0`; dodávka postupně předává stav kusu (`stav == "ok"` jinak nevyhovuje). **Větší diagram má částečně připravené propojení**, aby nový princip nezanikl v práci s šipkami.
- **Žák doplní:** podmínku ukončení cyklu (`dobrych < 3`) a rozhodnutí, kdy počítadlo zvýšit.
- **Testy:** všechny kusy dobré a smíšená dodávka. **Předem uvést předpoklad,** že testovací zásoba obsahuje dostatek dobrých kusů; při vyčerpání zásoby zobrazit srozumitelný stav (opakování poslední hodnoty zakázáno).
- **Malá změna:** požadavek na dva dobré kusy.
- **Pouze jedno počítadlo** (počítání všech kontrolovaných kusů není povinné).
- **Kompas:** Cíl: „Potřebuješ 3 dobré — točíš, dokud je nemáš." → Háček: „Kolikrát poběží smyčka? Záleží na vstupech?" → Postup: „Ukonči cyklus, až `dobrych == 3`, a zřejmě zvyš počítadlo jen u dobrého kusu."

---

### m06 — Skladový robot zabloudil

**Typ:** oprav + ladění · **Bloom:** analýza → hodnocení → aplikace · **Učivo:** ladění (Ladička), krokování, ověření opravy · **Profil:** H i E/J.

**Příběh:** Robot tvrdí, že doručil zásilku, ale stále stojí u regálu.

- **Cíl:** „Najdi jednu chybu krokováním a ověř opravu." (≤ 15 slov)
- **Postup:** krátký hotový program chybí nebo má chybnou mez cyklu (jedna cílená chyba) → žák odhadne správný výsledek → krokuje → označí odchylku → opraví → znovu otestuje.
- **H:** žák vybere vstup, který chybu odhalí (např. jedna bedna).
- **E/J:** dostane konkrétní vstup a dvě možnosti opravy.
- **Hlášení:** sestavit z nabídek „Mělo se stát… / Stalo se… / Opravil jsem…".
- **Malá změna:** ověření pro jiný počet beden.
- **Kompas:** Cíl: „Nejdřív uhádni, pak ověř, pak najdi rozdíl." → Háček: „Který vstup odhalí chybnou mez?" → Postup: „Přečti program, spusť krok za krokem a označ, kde se liší od odhadu."

---

### m07 — Urychli výrobní linku

**Typ:** vyber + oprav + zdůvodni · **Bloom:** hodnocení → aplikace · **Učivo:** porovnání algoritmů, efektivita = vykonané operace · **Profil:** H (E/J vynechat).

**Příběh:** Obě linky vyrábějí správně, ale jedna stále znovu načítá stejný plán.

- **Cíl:** „Porovnej dva algoritmy a odstraň zbytečné opakování." (≤ 15 slov)
- **Varianty:** A — načtení neměnného plánu uvnitř cyklu; B — načtení jednou před cyklem. Zadání výslovně uvádí, že plán je pro celou zakázku stejný.
- **Postup:** žák spustí obě varianty pro 1 a 5 kusů, porovná **počet vykonaných operací na stejných datech** a zdůvodní volbu; poté přesune načtení plánu před cyklus.
- **Malá změna:** pokud má každý kus jiný plán, žák rozhodne, zda stejná úprava zůstává správná.
- **Počet bloků není měřítko efektivity** — poznámky nejsou operace; nezavádět formální teorii složitosti.
- **Kompas:** Cíl: „Stejná zakázka, méně zbytečné práce." → Háček: „Kolikrát se plán čte v variantě A pro 5 kusů?" → Postup: „Přesuň načtení plánu mimo cyklus a porovnej spočtené operace."

---

### m08 — Vlastní servisní zakázka

**Typ:** tvorba + cti · **Bloom:** tvorba → hodnocení · **Učivo:** samostatný návrh, testy, předání · **Profil:** H (plná), E/J (menší rozsah).

**Příběh:** Kapitán předává poslední zakázku. Tentokrát k ní není hotový diagram.

**Volba jedné zakázky:**

| Zakázka | Princip |
|---|---|
| Balíčky pro posádku | Opakovat balení podle zadaného počtu. |
| Kontrola náhradních dílů | Rozhodnout podle rozměrové meze. |
| Materiál pro tisk | Vypočítat spotřebu podle počtu výrobků. |

- **H:** určit vstup a výstup, vybrat kartičky, sestavit tok a navrhnout **alespoň dva vhodné testy**.
- **E/J:** START a KONEC připravené, úzký výběr kartiček, postupné vedení — přesto zachovat vlastní rozhodnutí žáka.
- **Předání:** spolužák řešení vyzkouší; autor doplní stručný návod, autorství a jednoduché podmínky sdílení.
- **H:** navázat na uloženou opravenou verzi a stručně rozlišit spuštění webového programu, instalaci a aktualizaci (bez dlouhé teorie).
- **Samostatná tvorba podle omezeného zadání patří do povinné cesty**; neomezená dílna zůstává dobrovolná.
- **Kompas:** Cíl: „Nakresli řešení své zakázky a otestuj ho." → Háček: „Co je vstup a co výstup?" → Vzor: vzorové dílčí schéma (základní tok) → Postup: „Vyber zakázku, urči vstup/výstup, sestav a navrhni 2 testy."

---

### E/J — Varianty podpůrné cesty (mise 1–6 bez mezer)

Podpůrná cesta E/J má **6 souvisle očíslovaných misí (1–6)** — odpovídá m01, m02, m03, m04, m06, m08 z tabulky §3 (m05 a m07 v E/J nejsou). Číslování E/J **navazuje bez mezer** (mise 1–6, interně stabilní značení); algoritmus zůstává, rozdíl tvoří **opory**:

- **m01/m02 (E/J 1–2):** stejné jako H — jen potřebné kartičky, možnost přehrát kroky; u m02 je správná podmínka připravená a žák připojuje větve.
- **m03 (E/J 3):** skládání výrazu pomocí polí „počet × spotřeba"; výchozí částečně propojený základ.
- **m04 (E/J 4):** počet průchodů se mění přímo v kartičce (bez ručního počítadla).
- **m06 (E/J 5):** konkrétní vstup + dvě možnosti opravy + hlášení z nabídek.
- **m08 (E/J 6):** menší rozsah — START/KONEC připravené, úzký výběr kartiček, postupné vedení; vlastní rozhodnutí žáka zůstává.

> E/J zobrazení: výběry hodnot/operátorů, větší vizuální opora, méně textové syntaxe; v 16.x platí pro oba profily.

### Dobrovolná dílna (kartičky s cílem, bez hotového řešení)

Volné plochy + kartičky s cílem a příklady vstupů/výstupů (bez předem hotového řešení):

- Balení výbavy pro zadaný počet členů posádky.
- Kontrola dílu podle zvolené délkové meze.
- Výpočet spotřeby materiálu nebo ceny zakázky.
- Třídění dobrých a vadných kusů.
- Zastavení výroby po dosažení požadovaného počtu výrobků.
- Úprava již vyřešené mise pro jiný stroj či zakázku.

**Nenutit žáka k obsahu nad rámec povinné cesty**; dílna nesmí nahrazovat povinnou m08.

### Pořadí realizace obsahu (doplňuje §13)

1. Opravit kontrolní mechanismus, vzory a shodu režimů běhu (F2).
2. Zavést bezpečné stavy misí, neinvazivní modal zadání a restart (F1/F4).
3. Upravit automatické ukládání, export/import a nabídku JSON po dokončení (F4).
4. Připravit a ověřit **m01–m04 jako společný základ** (F5).
5. Doplnit **m05–m08 a podpůrné varianty E/J** (F6).
6. Navázat motivaci a výsledky na skutečné činnosti žáka (F8).
7. Pilotně ověřit časovou dotaci a srozumitelnost; podporu upravit bez neodůvodněného přidávání obsahu (F9).