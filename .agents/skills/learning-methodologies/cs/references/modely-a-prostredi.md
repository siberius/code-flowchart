# Modely, uvažování, rychlost a prostředí

Tuto referenci použij při doporučení modelu, jeho nastavení nebo způsobu načítání skillu. Didaktické zásady zůstávají společné. Níže uvedená nastavení jsou výchozí doporučení pro tuto práci, nikoli výsledky srovnávacího testu výrobců.

Dokumentace ověřena 2026-11-04. Názvy, dostupnost, volby i ceny se mění. Před použitím konkrétního názvu ověř nabídku uživatele a aktuální oficiální podklady. Netvrď, že jsi model či nastavení přepnul, pokud to neprovedl dostupný ovládací mechanismus.

## Nejprve vyber náročnost úkolu

Menší model použij pro ohraničenou úpravu s jasnými kritérii, střední pro běžný návrh a implementaci, silnější pro rozporné podklady, složitou simulaci nebo posouzení s významnými důsledky. Jde o kategorie práce, nikoli záruku schopností. Zachovej uživatelovu volbu, pokud kritéria splňuje.

Tabulka konkrétních názvů níže je **výchozí doporučení pro tento skill bez srovnávacího testu**, odvozené z dokumentace. Není změřeným pořadím modelů. Za ověřenou označ konfiguraci až po reprezentativních úlohách.

## Kdy zvýšit uvažování a kdy skončit

U jasného úkolu začni podporovanou výchozí úrovní nebo dříve úspěšným nastavením. U rozporných zdrojů či složitého modelu zvaž vyšší uvažování rovnou. Pokud výstup přehlédne výslovné omezení, odporuje vlastnímu hodnocení, selže ve smysluplné kontrole výpočtu nebo opakovaně vytváří neplatné úlohy, nejprve ověř dostupnost potřebných podkladů a reference. Chybějící vstup nebo nejasné kritérium naprav před změnou modelu.

Jestliže po jedné cílené opravě stále selhává stejné podstatné kritérium, doporuč podporovanou vyšší úroveň uvažování a kritérium znovu posuď. Pokud problém trvá, doporuč silnější dostupný model nebo nezávislou kontrolu podle dopadu. Neopakuj pokusy bez konce a nepřekračuj dohodnutý rozpočet. Chybějící zdroj, nedostupný nástroj či výpadek služby vyžaduje vyřešení závislosti nebo přiznání omezení; více uvažování nedodá chybějící důkaz. Nevyřešené chyby předej. Nastavení měň jen autorizovaným ovládáním prostředí.

Uvažování snižuj nebo menší model použij až po úspěšných relevantních kontrolách; uchovej doklady o kompromisu. Rychlost obsluhy posuzuj zvlášť: výchozí je standard, placené zrychlení potřebuje časové a cenové zdůvodnění a autorizaci.

## Udržuj doporučení aktuální

Konkrétní doporučení znovu ověř při změně modelu či verze klienta, chybějícím nastavení, změně dostupnosti u poskytovatele nebo rozporu dokumentace s pozorováním. Do té doby kombinaci označ jako neověřenou a použij kategorii úkolu a podporované výchozí volby prostředí. Neznámému modelu nevymýšlej ekvivalent nastavení. Specifické úpravy instrukcí pro poskytovatele přidávej až při opakovatelném selhání, které dokládá jejich potřebu; eviduj dotčenou verzi a po zániku důvodu úpravu odstraň.

## Vyber podle práce

| Práce | Výchozí volba OpenAI | Výchozí volba Claude | Výchozí volba Gemini |
|---|---|---|---|
| Drobná přesně vymezená úprava obsahu nebo kontrola strukturovaných úloh | GPT-6 Luna, High; snižuj až podle výsledků kontrol | Haiku 5.5, Medium | Gemini 3.5 Flash-Lite, Low, pokud jej prostředí nabízí |
| Návrh a realizace ohraničené výukové aktivity | GPT-6.1 Sol, výchozí úroveň nebo Medium | Sonnet 5.5, Medium pro dobře vymezenou práci agenta | Gemini 3.8 Flash, Medium |
| Náročný didaktický audit, rozporné zdroje, složitý model či architektura | GPT-6 Astra, Light/Low nebo Medium; zvýšit podle potřeby | Opus 5.5, Medium, podle potřeby High | Gemini 4 Argon, Medium, podle potřeby High |

Jde o doporučení autora skillu odvozená z podkladů výrobců. Neprokazují rovnocennost modelů ani lepší pedagogický úsudek jedné značky. Pokud zvolený model není dostupný, doporuč alternativu a sděl změnu; uživatelskou volbu bez autorizace neměň. Například u zavedeného postupu s Gemini 3.1 Pro lze zachovat tento model a jeho podporované nastavení. Tabulka nepředpovídá číselnou odezvu; tu ověř na reprezentativní úloze v daném prostředí.

Rozlišuj model, hloubku uvažování a případnou placenou rychlost obsluhy. Nižší úroveň uvažování může omezit objem práce modelu. Režim Fast je jiná volba a může zvýšit cenu. Flash je název modelové řady, nikoli univerzální přepínač rychlosti. Stejné názvy Low, Medium a High neznamenají stejný výkon ani odezvu u všech výrobců.

Začni standardní rychlostí. Placený Fast doporuč, pokud záleží na čekání a odpovídají tomu aktuální podmínky. Bez autorizace jej nezapínej a nenakupuj kapacitu. Průběžné zobrazování odpovědi nezaručuje dřívější dokončení. Posuzuj i čas kontroly a oprav výsledku.

## OpenAI a Codex

V prostředí podporujícím skilly a čtení souborů používej nativní balíček. V Codexu lze výslovně uvést `$learning-methodologies` nebo `$vzdelavaci-metodiky`. Běžný chat nemusí stejným způsobem prohledávat disk; předej mu dostupný samostatný Markdown.

Ověřený průvodce rozlišuje Sol pro rozsáhlejší práci, Lunu pro vymezené úkoly a Astru pro náročné postupy; pro začátek uvádí také Lunu High a Astru Light/Low. Codex rozlišuje hloubku uvažování a Fast. Dostupnost a spotřeba závisejí na účtu, modelu a klientovi. Ověř podporované volby; popisek v aplikaci nemusí být identifikátorem API.

Zadej výstup, rozsah, relevantní soubory a pozorovatelná kritéria. Žádej stručné zdůvodnění rozhodnutí a doklady, nikoli zveřejnění vnitřního řetězce uvažování. Z názvu modelu neodvozuj přístup k terminálu, souborům nebo prohlížeči.

Zdroje: [modely](https://learn.chatgpt.com/docs/models), [rychlost](https://learn.chatgpt.com/docs/agent-configuration/speed), [skilly](https://developers.openai.com/plugins/concepts/skills).

## Claude a Claude Code

Claude Code podporuje balíčky `SKILL.md` s doprovodnými soubory. Po objevení skillu lze použít `/learning-methodologies` nebo `/vzdelavaci-metodiky`. U jiného klienta Claude ověř jeho mechanismus, případně předej samostatnou verzi. Do společných metadat nepřidávej výhradně claudeovské hooky, shellové substituce ani přepnutí modelu.

Dokumentace pro agentní práci Sonnetu 5.5 doporučuje Medium u dobře vymezených úloh a vyšší úroveň u těžších. Opus 5.5 má výchozí Medium; starší generace a různá prostředí se liší. Úroveň effort a režim thinking nejsou totožné parametry. Nepřenášej kombinace voleb mezi verzemi bez ověření. Claude Fast je samostatná funkce s omezenou podporou modelů a vyšší cenou.

Odděl úkol, podklady a očekávaný výsledek. Uveď prostor pro rozhodování a požadované doklady. Příklad přidej tam, kde řeší nejasnost. Neopakuj celé jádro v každém zadání a nevyžaduj dlouhý záznam vnitřních úvah. Jde o způsob přenositelného zadání, nikoli tvrzení o zvláštní psychologii modelu.

Zdroje: [skilly](https://code.claude.com/docs/en/skills), [modely](https://platform.claude.com/docs/en/models/overview), [effort](https://platform.claude.com/docs/en/build-with-claude/effort), [Fast](https://platform.claude.com/docs/en/build-with-claude/fast-mode).

## Gemini a Gemini CLI

Gemini CLI hledá skilly v podporovaných složkách včetně aliasu `.agents/skills`. Objevení ověř příkazem `/skills list`, podle potřeby obnov pomocí `/skills reload`. Důvěryhodnost projektu a potvrzení aktivace řídí klient; neobcházej je. V AI Studiu nebo jiném chatu předej samostatný soubor, pokud nativní mechanismus není dostupný.

Ověřená dokumentace uvádí Low, Medium a High pro Gemini 4 Argon a Gemini 3.8 Flash. Jiné verze mají jiné výchozí úrovně a nabídky. Použij volby skutečného modelu a prostředí; nekopíruj doslova parametr OpenAI či Claude. Náhledový a stabilní identifikátor nejsou zaměnitelné.

Pro `gemini-3.1-pro-preview` ověřená tabulka API uvádí Low, Medium a High, výchozí je High. Pro tento endpoint doporučuji vyzkoušet Medium u běžného návrhu a High u náročného auditu, pokud klient dané volby nabízí. Samotný popisek Gemini 3.1 Pro nedokládá použitý endpoint a dostupné ovládání.

Instrukce formuluj přímo, s cílem, omezeními a požadovanými doklady. Předej dostupné podklady; napsaná cesta v chatu sama nezpřístupní soubor. Při implementaci aplikace s Gemini API zachovej potřebný stav komunikace s nástroji podle aktuální dokumentace. Tento skill API vrstvu nezavádí a neopravňuje k jejímu přidání.

Zdroje: [modely](https://ai.google.dev/gemini-api/docs/models), [uvažování](https://ai.google.dev/gemini-api/docs/thinking), [skilly Gemini CLI](https://geminicli.com/docs/cli/tutorials/skills-getting-started/).

## Přenositelnost a doložené ověření

Používej prostá společná metadata `name` a `description` a běžný Markdown. Další metadata popisují verzi; bezpečnost neopírej o parametr, který jiné prostředí nemusí podporovat. Souborový agent dostane celý balíček s relativními referencemi, běžný chat úplnou samostatnou verzi. Obě jazykové varianty nenačítej automaticky současně. Po ztrátě kontextu obnov podstatný rozsah a rozpracovanou práci místo předpokladu, že je každý klient uchová.

Emoji může nést význam, ale nemá být jedinou instrukcí nebo označením priority. Zachovej výslovný text. Výzkum [významu emoji](https://arxiv.org/abs/2409.10760) a [kontextové nejednoznačnosti](https://arxiv.org/abs/2511.07193) neprokazuje přínos dekorování tohoto skillu pro dodržování pravidel. Takovou změnu nejprve ověř na konkrétních modelech a úlohách.

Za otestovanou označ kombinaci modelu a prostředí až po ověření načtení, přístupu k potřebné referenci, reprezentativního výstupu a důležitých hranic. Zaznamenej přesný model nebo viditelný popisek, klienta a verzi, jazyk, uvažování, rychlost, nástroje, datum, výstupy a chyby. Rozlišuj kompatibilitu podle dokumentace a pozorovaný průchod. Výsledek jednoho modelu nepřenášej na celou značku.

Srovnávej stejná zadání a podklady podle stejných vzdělávacích kritérií. Zařaď známý kontext, pomoc s cestou dál, alternativní správnou odpověď, nedoložené kurikulum, hranici výpočtu a dat a relevantní selhání nástroje. Snižuj uvažování nebo velikost modelu, jen pokud podstatné kontroly dál procházejí. Nedostupného poskytovatele označ jako neotestovaného, výsledky nevymýšlej.
