# Použití a instalace

## Kdy skill použít

Při tvorbě vzdělávací aplikace, podstatné změně její výuky nebo pedagogické revizi. Pro změnu barvy tlačítka či běžnou technickou opravu bez dopadu na výuku jej nenačítej. Agent převezme dostupné informace a zeptá se jen na významné neznámé.

## Instalace přes skills.sh CLI

Doporučený a nejrychlejší způsob instalace pro více než 20 AI prostředí (Claude Code, Cursor, Codex, Antigravity, OpenCode, Cline aj.) je pomocí nástroje `skills`:

```bash
# Instalace české varianty do aktuálního projektu
npx skills add siberius/learning-methodologies --skill vzdelavaci-metodiky --full-depth

# Globální instalace pro všechny projekty
npx skills add siberius/learning-methodologies --skill vzdelavaci-metodiky --full-depth -g

# Cílení na konkrétního agenta (např. Claude Code)
npx skills add siberius/learning-methodologies --skill vzdelavaci-metodiky --full-depth -a claude-code
```

## Nativní balíček

Udržuj `SKILL.md` a celou složku `references/` pohromadě v balíčku `vzdelavaci-metodiky`. Instaluj podle podporovaného mechanismu klienta a ověř jeho nabídku skillů. Samotné uložení Markdownu na disk nezaručuje objevení nebo použití.

U klientů se společnou složkou může cesta vypadat takto:

```text
~/.agents/skills/vzdelavaci-metodiky/
  SKILL.md
  references/
  LICENSE
```

Claude Code běžně používá `~/.claude/skills/`. Při místní integraci zachovej stávající uživatelské soubory a nejprve zkontroluj konflikty. V bance mohou být registrace odkazy na udržovaný zdroj. Není potřeba kopírovat všechny metodiky do každého projektu.

## Samostatný Markdown

Předej agentovi `vzdelavaci-metodiky.md` a výslovně požádej o jeho použití. Soubor obsahuje i podrobné reference a úplné licenční oznámení, nevyžaduje sousední soubory. Agent však musí umět pracovat s textovými instrukcemi a mít nástroje a oprávnění potřebné pro skutečný úkol.

## Načítej podle potřeby

| Úkol | Reference |
|---|---|
| Nejasná pomoc, alternativní odpověď či kurikulární tvrzení | `references/priklady-rozhodovani.md` |
| Režimy tutora, pokračování učení a předání stavu | `references/stav-tutora.md` |
| Proč metoda odpovídá cíli a jak mění aplikaci | `references/didakticke-zduvodneni.md` |
| Volba nebo provedení metody, nápovědy a postup | `references/metody.md` |
| Rubrika, bodování, adaptivita a doklady učení | `references/hodnoceni.md` |
| Experiment, model nebo hraní rolí | `references/simulace.md` |
| AI služba v hotové aplikaci | `references/ai-provoz.md` |
| Konkrétní česká škola, RVP/ŠVP či zkouška | `references/ceske-skolstvi.md` |
| Model, uvažování, rychlost nebo přizpůsobení klientovi | `references/modely-a-prostredi.md` |

U nativní verze nenačítej vše předem. Sdílená demonstrace nemusí získat individuální účty a offline kvíz nemusí získat chatbot. Jednoduchý úkol také nevyžaduje více agentů.

## Udržuj obě jazykové varianty

České jádro a reference jsou v `cs/`, anglické v kořeni projektu. Česká verze je metodickou adaptací anglického základu; kurikulární reference a české formáty odpovědí jsou její doplnění. Při společné metodické opravě zkontroluj dopad ve všech čtyřech variantách, ale nepřenášej automaticky české RVP do mezinárodní verze. Nelze ověřit shodu pouhou shodou počtu oddílů.

V místním autorském checkoutu spusť z kořene projektu:

```sh
python3 testing/build_portable.py --edition all
python3 testing/build_portable.py --edition all --check
python3 testing/check_package.py
```

Generátor a ověřovací nástroje jsou místní vývojové soubory v ignorované složce `testing/`. Hotové distribuce jejich spuštění nevyžadují. Ruční změny generovaného souboru budou při dalším sestavení nahrazeny.

Zachovej ID `vzdelavaci-metodiky`, autora, licenci a vztah k anglické verzi. Jméno komerčního modelu neurčuje instalační postup. Při změně registrace ověř čitelnost referencí a následně objevení v klientovi; existující chat může mít nabídku z předchozího načtení.

## Co znamená ověření

Kontrola metadat, odkazů a exportu prověřuje balíček. Zkušební průchod prověřuje konkrétní chování agenta. Kontrola aplikace a práce se žáky zjišťují další skutečnosti. Výsledky vykazuj zvlášť a nepřeváděj je na nepodložené tvrzení o účinnosti.

Pro porovnání konfigurací použij zveřejněný [protokol osmi úloh](OVERENI-MODELU.md). Hodnoticí kritéria nepředávej testovanému modelu. Sada je připravená, dosud neprovedená; dřívější průzkumné průchody nedokládají spolehlivost napříč poskytovateli. První výstupy a opravy vykazuj odděleně.

Nejprve vybírej podle náročnosti úkolu. Pokud podstatné kritérium selhává i po cílené opravě, postupuj podle pravidel zvýšení uvažování a ukončení pokusů v referenci modelů. Chybějící zdroje nebo nástroje vyšší uvažování nenahradí. Výchozí je standardní rychlost služby; placené zrychlení je samostatná autorizovaná volba.

Ruská verze je v `ru/` (ID `metodiki-obucheniya`), španělská v `es/` (ID `metodologias-de-aprendizaje`). Pro samostatný export použij `--edition ru` nebo `--edition es`. Překlad sám neznamená ověřený soulad s kurikulem konkrétní země. Podle úkolu zvol jednu jazykovou verzi.
