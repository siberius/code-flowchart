# CodeFlowChart 

Výukový editor a simulátor vývojových diagramů v jediném souboru `index.html`.
Žák staví diagram z bloků, krokuje běh programu, sleduje proměnné ve Visual RAM
a ověřuje řešení automatickými testy. Hra provází servisní lodí HEFAISTOS
a robotem ŠROUB.

- **Cílová skupina:** učební obory H a podpůrná cesta E/J (15–19 let), úvodní
  algoritmizace (RVP SOV). Gymnázia a maturitní IT obory nejsou cílem.
- **Bez instalace, bez serveru, bez sběru dat.** Jediným výstupem je certifikát
  a export postupu (JSON), který si žák stahuje sám.
- **Repozitář:** https://github.com/siberius/code-flowchart

## Spuštění

Hra je jediný HTML soubor, nepotřebuje build ani závislosti:

1. Stáhni nebo naklonuj repozitář.
2. Otevři `index.html` v prohlížeči (dvojklik stačí, funguje i offline).

## Obsah hry

- **MISE** — 14 misí: 8 pro profil H (m01–m08) + 6 pro podpůrnou cestu E/J.
  Témata: posloupnost, větvení, vstup → výpočet → výstup, cykly, ladění,
  efektivita a vlastní tvorba. Každá mise je na jednu vyučovací hodinu.
- **SPACE 1–5** — volné plochy pro vlastní tvorbu (SPACE 1 obsahuje ukázku
  „Sbírání jablek").
- **Kompas a Ladička** — nápověda nic nestojí, hodnocení se nikdy nesnižuje.
  Značky postupu: Zprovozněno → Ověřeno → Upraveno.
- **Certifikát (SVG)** — fakultativní potvrzení dokončené mise se jménem,
  datem a časem.

## Uložení a soukromí

- Pokrok se ukládá do `localStorage` prohlížeče — přežije obnovení stránky
  i přepnutí mezi hodinami.
- Na PC se data po **90 minutách nečinnosti** automaticky vymažou, na mobilu
  a tabletu se mažou jen ručně červeným RESET.
- **Export JSON** = úplný snímek celé práce (všechny mise + všechny plochy).
  Po splnění mise se nabídne stažení, rozpracovanou práci lze vyvést z menu.
  Jméno je dobrovolné — kdo ho nezadá, má v exportu `null`.

## Klávesové zkratky (výběr)

| Zkratka | Akce |
|---|---|
| `Ctrl+K` | Paleta příkazů (přehled všech zkratek) |
| `Alt+S` | Výběr ukázky |
| `Ctrl+Alt+H` / `Ctrl+Alt+I` / `Ctrl+Alt+A` | Nápověda / O programu / O autorovi |
| `Ctrl+Alt+J` / `Ctrl+Alt+O` | Export / import JSON |
| `Ctrl+Alt+M` / `Ctrl+Alt+1–5` | Plocha MISE / SPACE 1–5 |
| `Ctrl+Z` / `Ctrl+Y` | Zpět / Znovu |
| `Ctrl+S` | Export SVG |
| `Esc` | Zavřít dialog |

## Vývoj

Celá aplikace je vanilla JS a CSS přímo v `index.html` — žádný module systém,
žádný build, žádné závislosti. Podrobný plán přestavby je v `PLAN.md`.
Repozitář obsahuje záměrně jen aplikaci a dokumenty; vývojové testy zůstávají
mimo veřejný repozitář.

## Licence

MIT © 2026 Luděk Sušický — viz soubor `LICENSE`.
Dílo můžeš svobodně používat, upravovat i šířit včetně školní výuky.

## Autor

**Luděk Sušický** — učitel informatiky na SŠ a VŠ (AI ve vzdělávání, vibecoding).
Kontakt: ludek.susicky@gmail.com · X: [@ludeksusicky](https://x.com/ludeksusicky) ·
LinkedIn: [ludek-susicky](https://www.linkedin.com/in/ludek-susicky/)
