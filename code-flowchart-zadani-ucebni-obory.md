# Code-flowchart: zadání úprav pro učební obory

Datum: 24. 9. 2026  
Stav: souhrn dohodnutých požadavků a návrh řešení; nejde o již provedenou implementaci.

## 1. Účel a rozsah

Upravit existující `code-flowchart.html` na přívětivou příběhovou výuku algoritmizace pro obory H a podpůrnou cestu pro E/J. Kategorie J je zahrnuta podle dohody, ačkoli nejde o obory s výučním listem. Gymnázia a maturitní odborné obory nejsou cílovou skupinou této verze.

- H: 8 misí, každá plánovaná na jednu vyučovací hodinu (45 minut).
- E/J: 6 misí s menším rozsahem, rovněž po 45 minutách.
- Jedna mise obsahuje několik krátkých činností nad stejným problémem, nikoli obrovský diagram.
- Nízká zátěž při ovládání, krátká zadání, postupná pomoc; zachovat skutečné rozhodování a přemýšlení žáka.
- Obsah držet v rozsahu algoritmizace, tvorby, testování a souvisejících základů provozu softwaru. Netvrdit, že aplikace sama pokrývá celou informatiku nebo celý RVP.
- Nad rámec povinné cesty pouze dobrovolná vlastní tvorba ve volných plochách a seznam námětů.
- Stávající použitelný editor, krokování, zobrazení proměnných, export/import a volné plochy zachovat a cíleně upravit.

Výuková cesta je návrhem realizace vybraných výstupů RVP, nikoli garancí jejich dosažení za osm hodin. Učitel ji zasadí do konkrétního ŠVP a podle práce třídy upraví podporu a čas.

## 2. Závazná pravidla podle posledního upřesnění uživatele

Tato pravidla mají přednost před staršími návrhy v konverzaci.

1. **Zadání je vždy v modalu, který se otevře po kliknutí na level v menu.** To platí pro nový, rozpracovaný i dokončený level.
2. **Kliknutí na level nesmí přemazat rozpracovanou práci.** Otevření zadání je odděleno od vytváření výchozího diagramu.
3. **Výchozí sestava se vytvoří pouze při prvním vstupu do dosud nezaloženého levelu nebo po výslovném restartu.** Prázdná plocha není sama o sobě důkazem, že level ještě nebyl založen.
4. **K zahájení znovu slouží tlačítko Restart.** Pouhé otevření menu, zavření modalu, přepnutí levelu nebo návrat do aplikace restart nevyvolá.
5. **Po splnění levelu aplikace sama nabídne uložení do JSON.** Nabídka je součástí výsledkového modalu.
6. **Nezavádět navrženou dvojici hlavních tlačítek „Uložit služební záznam“ a „Pokračovat ze souboru“.** Nepoužívat ani její dvouřádkové označení jako hlavní ovládání.
7. Zachovat možnost uložit i nedokončenou práci a načíst ji příště. Návrh: ponechat běžné položky `Export JSON` a `Import JSON` v nabídce souborových operací, nikoli jako výraznou novou dvojici tlačítek na ploše.
8. **Každý export JSON ukládá celou práci aplikace: všechny levely a všechny ostatní SPACE.** Rozsah exportu nezávisí na tom, zda žák právě pracuje v misi nebo ve volné ploše.
9. **Aplikace sama rozpozná aktivní režim, profil, level nebo SPACE a tento kontext uloží.** Žák nemusí volit zvláštní typ exportu pro mise.
10. **JSON obsahuje datum a čas posledního uložení a jméno hráče, pokud je zadal.** Nezadané jméno export neblokuje.

Starší návrh trvalého panelu se zadáním vedle plátna je nahrazen zadáním v modalu. Stručná provozní zpětná vazba u simulace je přípustná; celé zadání se do vedlejšího panelu nekopíruje.

## 3. Příběh a tón

**Servisní loď HEFAISTOS:** po elektromagnetické bouři je nutné obnovit řídicí postupy dílny, výroby a zásobování. Žák je palubní technik nebo strojník. Průvodcem je robot ŠROUB.

- Příběh uvádět nejvýše několika krátkými větami; nevyžadovat čtení dlouhého lore.
- Přirozená čeština, lehký humor, bez povinného generačního slangu a zesměšňování chyb.
- CNC a 3D tiskárna jsou zjednodušené fiktivní simulace, nikoli návody k obsluze reálného zařízení.
- Po splnění mise se příslušné zařízení na lodi viditelně obnoví.
- Zachovat vhodnou technologickou/vesmírnou estetiku, ale omezit rušivé efekty; zvuk a zbytečné animace musí být vypnutelné.

Příklad tónu: „Náhradní držák máme. Tedy… jeho obrázek. Tiskárna čeká na tvůj postup.“

## 4. Herní a pedagogický princip

Žák má k dispozici kartičky na ploše nebo v přehledné zásobní oblasti. Rozhoduje, které použije, v jakém pořadí a kudy povedou větve. Některé kartičky mohou být navíc.

- Zpočátku pouze potřebné kartičky; později nejvýše jedna až dvě smysluplné alternativy.
- Alternativy představují běžnou chybnou úvahu, nikoli náhodný chyták.
- Kartičky rozmístit přehledně. Náhodný prostorový chaos nemá být zdrojem obtížnosti.
- Nové pojmy zavádět po jednom. Orientační velikost začátečnické úlohy je 5–8 aktivních bloků; složitější mise dostane částečně propojený základ.
- Žák postupně přechází od čtení a opravy k doplnění a krátké samostatné tvorbě.
- V profilu E/J používat výběry hodnot a operátorů, větší vizuální oporu a méně textové syntaxe.
- V profilu H postupně ubírat podporu, ne pouze zvětšovat počet bloků.
- Nevynucovat jediné rozložení ani jediné správné zapojení, pokud jiná varianta plní stejnou specifikaci.

### Metody z `vzdelavaci-metodiky.md`

| Metoda | Praktické provedení |
|---|---|
| Postupné ubírání podpory | Ukázka → oprava místa → doplnění → samostatná krátká úloha. |
| Bloomova gradace | Odhadni → spusť → vysvětli odchylku → oprav → uprav pro jinou situaci. |
| Naváděcí otázky | Nejprve otázka k chybě, poté místo, nakonec konkrétní krok. |
| Učení z chyby | Ukázat vstup, očekávaný a skutečný výsledek; okamžitá možnost opravy. |
| Přenos a opakování | Později zopakovat známý princip v jiném praktickém kontextu. |
| Formativní hodnocení | Uvést, co už funguje a co je další zvládnutelný krok. |
| Krátké vzájemné ověření | V závěru spolužák vyzkouší řešení a autor vysvětlí opravu. |

AI tutor není požadavkem. Nápovědy lze připravit předem podle typických chyb. Žák po neúspěšných pokusech smí dostat názornou ukázku; nezablokovat ho pravidlem „nikdy neprozradit řešení“.

## 5. Struktura jedné vyučovací hodiny

| Čas | Činnost |
|---|---|
| 0–5 min | Příběh, problém a požadovaný výsledek v modalu. |
| 5–10 min | Odhad dalšího kroku, výběr vstupu nebo potřebné kartičky. |
| 10–25 min | Stavba nebo úprava diagramu. |
| 25–35 min | Spuštění, krokování, testy a opravy. |
| 35–40 min | Malá změna zadání ve stejném kontextu. |
| 40–45 min | Krátké vysvětlení a uložení; při dokončení automatická nabídka exportu. |

Jde o časový plán učitele, nikoli o odpočet v aplikaci. Časová dotace se ověří pilotně ve třídě. Není nutné uměle prodlužovat práci rychlého žáka. Pomalý žák může pokračovat příště ze zachovaného stavu nebo JSON.

## 6. Přehled misí

| Stabilní ID | Mise | Princip | H | E/J |
|---|---|---|---|---|
| m01 | Probuď dílnu | Posloupnost, čtení a vysvětlení postupu | Ano | Ano |
| m02 | CNC odmítá pracovat | Větvení | Ano | Ano |
| m03 | Vytiskni náhradní držák | Vstup, výpočet, výstup | Ano | S oporou |
| m04 | Vyrob sadu spojek | Opakování podle počtu | Ano | Ano |
| m05 | Tři dobré kusy | Podmíněný cyklus a počítání | Ano | Vynechat |
| m06 | Skladový robot zabloudil | Ladění a výběr testu | Ano | Ano |
| m07 | Urychli výrobní linku | Porovnání a optimalizace | Ano | Vynechat |
| m08 | Vlastní servisní zakázka | Samostatná tvorba a předání | Ano | Menší rozsah |

V E/J zobrazovat šest navazujících levelů 1–6 bez mezer. Interní ID zůstávají stabilní. Profil neoznačovat před žákem jako horší nebo méně hodnotný. Přepnutí profilu nesmí přepsat práci jiného profilu.

### m01 — Probuď dílnu

**Příběh:** Dílna je potmě. ŠROUB zapnul baterku a považuje problém za vyřešený.

- Cíl: sestavit jednoznačné pořadí spuštění dílny.
- Kartičky: START, zapnutí napájení, diagnostika, aktivace pracoviště, KONEC.
- Žák určí nutnou návaznost a propojí tok. Simulace postupně obnovuje dílnu.
- Test: aktivace smí nastat až po úspěšném předchozím postupu; následně žák označí krok po diagnostice.
- Malá změna: vložit kontrolu spojení před aktivaci.
- H: opravit neurčitý pokyn „Počkej chvíli“ na přesný, vykonatelný pokyn.
- E/J: pouze potřebné kartičky, možnost přehrát první dva kroky.
- Rozsah: přibližně 5–6 bloků včetně START a KONEC.

### m02 — CNC odmítá pracovat

**Příběh:** Kontrolka hlásí otevřený kryt. ŠROUB navrhuje přelepit kontrolku. Technik obnoví správné rozhodování.

- Cíl: rozhodnout podle vstupu `krytZavren`.
- Tok: START → načti stav → podmínka → povolit výrobní simulaci / požádat o zavření krytu → KONEC.
- Testy: otevřený a zavřený kryt; před spuštěním žák odhadne větev.
- Malá změna: upravit stejný princip pro kontrolu přítomnosti materiálu; nespojovat hned obě podmínky.
- H: nabídnout jednu alternativní chybnou podmínku.
- E/J: správná podmínka je připravená, žák připojuje větve.
- Rozsah: přibližně 6 bloků.

### m03 — Vytiskni náhradní držák

**Příběh:** Při manévru proletěl klíč jídelnou. Posádka potřebuje držáky na nářadí.

- Cíl: z počtu výrobků vypočítat celkovou spotřebu materiálu.
- Model: jeden držák spotřebuje 20 g. Tok načte počet, vypočítá součin a zobrazí výsledek.
- Testy: 1, 3 a 5 držáků → 20, 60 a 100 g.
- Malá změna: jiný model potřebuje 30 g na kus.
- H: volí operaci a následně nahradí pevnou spotřebu vstupní hodnotou.
- E/J: skládá výraz pomocí polí „počet × spotřeba jednoho kusu“.
- Vizuální výstup: ukazatel materiálu a číselná hodnota s jednotkou.
- Nezařazovat teploty, nastavení sliceru a další nesouvisející parametry.
- Rozsah: přibližně 5–6 bloků.

### m04 — Vyrob sadu spojek

**Příběh:** Posádka potřebuje čtyři spojky. ŠROUB zkopíroval výrobní příkaz čtyřicetkrát „pro jistotu“.

- Cíl: nahradit opakované příkazy cyklem s počtem průchodů.
- Žák sestaví `OPAKUJ 4×` s jednou výrobní operací.
- Test: skutečně vzniknou právě čtyři spojky; nestačí vypsat číslo 4.
- Malá změna: objednávka šesti spojek.
- H: počet přichází ze vstupu; testovat 0, 1 a více kusů.
- E/J: počet se mění přímo v kartičce, bez ručního počítadla.
- Návrh zobrazení: cyklus s jasně ohraničeným tělem a automaticky vedenou návratovou vazbou. Neměnit princip editoru více, než je potřeba pro srozumitelnost.

### m05 — Tři dobré kusy (H)

**Příběh:** Linka funguje, ale některé spojky vypadají, jako by je žvýkal robot.

- Cíl: kontrolovat dodávku, dokud nejsou získány tři vyhovující kusy.
- Připravený základ: počítadlo dobrých kusů začíná na nule; dodávka postupně předává stav kusu.
- Žák doplní podmínku ukončení a rozhodnutí, kdy počítadlo zvýšit.
- Testy: všechny kusy dobré a smíšená dodávka. Předem uvést předpoklad, že testovací zásoba obsahuje dostatek dobrých kusů.
- Malá změna: požadavek na dva dobré kusy.
- Pouze jedno počítadlo; počítání všech kontrolovaných kusů není povinným rozšířením.
- Při vyčerpání testovací zásoby zobrazit srozumitelný stav, nevyrábět další vstupy opakováním poslední hodnoty.
- Větší diagram má částečně připravené propojení, aby nový princip nezanikl v práci s šipkami.

### m06 — Skladový robot zabloudil

**Příběh:** Robot tvrdí, že doručil zásilku, ale stále stojí u regálu.

- Cíl: najít jednu chybu krokováním a ověřit opravu.
- Žák dostane krátký hotový program s chybnou mezí cyklu nebo jinou jedinou cílenou chybou.
- Odhadne správný výsledek → krokuje → označí odchylku → opraví → znovu otestuje.
- H: vybere vstup, který chybu odhalí, například jednu bednu.
- E/J: dostane konkrétní vstup a dvě možnosti opravy.
- Malá změna: ověření pro jiný počet beden.
- Hlášení lze sestavit z nabídek: „Mělo se stát… / Stalo se… / Opravil jsem…“.

### m07 — Urychli výrobní linku (H)

**Příběh:** Obě linky vyrábějí správně, ale jedna stále znovu načítá stejný plán.

- Cíl: porovnat dva funkční algoritmy a odstranit zbytečné opakování.
- A: načtení neměnného výrobního plánu uvnitř cyklu. B: načtení jednou před cyklem.
- Zadání výslovně uvádí, že plán je pro celou zakázku stejný.
- Žák spustí obě varianty pro 1 a 5 kusů, porovná počet vykonaných operací a zdůvodní volbu.
- Následně sám přesune načtení plánu před cyklus.
- Malá změna: pokud má každý kus jiný plán, rozhodne, zda stejná úprava zůstává správná.
- Počet bloků není měřítkem výpočetní efektivity. Nezavádět formální teorii složitosti.

### m08 — Vlastní servisní zakázka

**Příběh:** Kapitán předává poslední zakázku. Tentokrát k ní není hotový diagram.

Volba jedné zakázky:

| Zakázka | Princip |
|---|---|
| Balíčky pro posádku | Opakovat balení podle zadaného počtu. |
| Kontrola náhradních dílů | Rozhodnout podle rozměrové meze. |
| Materiál pro tisk | Vypočítat spotřebu podle počtu výrobků. |

- H: určit vstup a výstup, vybrat kartičky, sestavit tok a navrhnout alespoň dva vhodné testy.
- E/J: START a KONEC připravené, úzký výběr kartiček a postupné vedení; přesto zachovat vlastní rozhodnutí žáka.
- Spolužák řešení vyzkouší; autor doplní stručný návod, autorství a jednoduché podmínky sdílení.
- U H navázat na uloženou opravenou verzi a stručně rozlišit spuštění webového programu, instalaci a aktualizaci. Bez samostatné dlouhé teorie.
- Samostatná tvorba podle omezeného zadání patří do povinné cesty. Neomezená vlastní dílna zůstává dobrovolná.

## 7. Zadání a návrat do rozpracované mise

### Obsah modalu zadání

- Název a číslo mise.
- Krátký příběh.
- Jeden hlavní cíl a konkrétní očekávaný výsledek.
- Stručné kroky aktuální fáze; další podrobnosti postupně odkrývat.
- Informace, zda lze některé kartičky ponechat nepoužité.
- Přístup k odstupňované nápovědě.
- Hlavní akce: `Začít` u nové mise, `Pokračovat` u rozpracované; u dokončené lze použít `Otevřít řešení`.

Modal při každém kliknutí na level ukáže zadání i informaci o aktuálním postupu. Jeho otevření ani zavření nemění bloky, propojení, vstupy, fázi, historii pomoci ani záznam dokončení. Pro opětovné přečtení zadání stačí znovu kliknout na stejný level v menu.

### Doporučený stavový postup

1. Před přepnutím uložit aktuální práci.
2. Vyhledat stav podle profilu a stabilního ID mise.
3. Existující stav načíst beze změny; chybějící stav vytvořit jednou z výchozího zadání.
4. Otevřít modal zadání.
5. Po potvrzení zobrazit stejnou pracovní plochu.

Při běžící simulaci přepnutí bezpečně zastaví běh a zachová editovaný diagram. Přepnutí příběhu nebo vzhledu mění pouze prezentaci, nikoli uložený algoritmus. U nového scénáře nelze záměnu popisků provádět způsobem, který rozbije identitu příkazů a testů.

### Restart

- Restart je samostatná výslovná akce pro aktuální misi a profil.
- Návrh: potvrzení „Vrátit tuto misi na začátek? Rozpracované řešení této mise bude nahrazeno.“
- Zrušení potvrzení nic nezmění.
- Potvrzení obnoví původní kartičky, propojení a fázi pouze dané mise; ostatní mise zůstanou zachované.
- Návrh: historické dosažené dokončení ponechat, aktuální pokus označit jako nový; aktuální řešení se musí znovu ověřit.
- Samostatné celkové vymazání postupu, pokud již existuje, nesmí být zaměněno s restartem levelu.

## 8. Ukládání, nabídka po dokončení a import JSON

### Automatické ukládání rozpracované práce

Lokálně uchovávat stav po změnách s krátkým zpožděním a před přepnutím mise. Uchovávat poslední skutečně editovaný diagram, nikoli pouze výchozí šablonu. Automatické ukládání v prohlížeči není náhradou přenositelného JSON. Pokud místní ukládání selže, zobrazit stručnou informaci a umožnit export.

### Nabídka po splnění

Po dokončení povinných částí levelu a úspěšném ověření otevřít výsledkový modal:

> Mise splněna. Chceš si uložit postup pro příští hodinu?

- Primární akce: **Stáhnout JSON**.
- Sekundární akce: **Teď ne**; poté lze pokračovat ve hře.
- Export nabídnout, nespouštět automatické stahování bez kliknutí.
- Stahovat jeden soubor s celou prací aplikace: všechny stavy levelů i všechny ostatní SPACE. Platí stejně pro nabídku po splnění a ruční export z menu.
- Pouhé opakování stejných úspěšných testů nesmí znovu a znovu otevírat nabídku ani násobit odměny. Nabídka se váže na přechod aktuálního pokusu do dokončeného stavu.
- Úspěšný dílčí test není automaticky splněním celého levelu, pokud zbývá povinná úprava či ověření.

### Uložení před dokončením

Ponechat nenápadnou možnost `Export JSON` v menu souborových operací. Je nutná pro konec vyučování u rozpracované mise. Nezavádět odmítnutá výrazná tlačítka ani povinné vyplňování jména před každým exportem.

### Obsah souboru

- Export je úplný snímek aplikace, nikoli výběr aktuálního diagramu. Zahrnuje i neaktivní, rozpracované, dokončené a uživatelem vyprázdněné plochy.
- Verze formátu a verze obsahu misí.
- Automaticky rozpoznaný aktivní režim (`level` nebo `space`), profil, stabilní ID mise/SPACE a fáze. U režimu SPACE nezaměňovat poslední navštívenou misi za právě aktivní plochu.
- Stavy již navštívených misí, bloky, propojení a nastavení.
- Použité vstupy, odpovědi, nápovědy a aktuální výsledky testování.
- Odděleně historický postup a platnost ověření právě uloženého řešení.
- Jméno/přezdívka hráče, pokud je zadal; jinak hodnota `null`. Nevyžadovat jméno ani další osobní údaje kvůli ukládání.
- Datum i čas posledního uložení snímku. Při každém exportu aktualizovat časovou značku až po zachycení aktuální rozpracované plochy do společného stavu.
- Všechny ostatní SPACE včetně jejich obsahu, propojení, nastavení a pozice/zvětšení pohledu. Neomezovat export na kampaň a nevynechat prázdné plochy, které žák již upravoval.

### Metadata a obnova kontextu

Doporučená pole: `schemaVersion`, `savedAt`, `savedTimeZone`, `playerName`, `activeContext`, `missions`, `spaces`. `savedAt` je jedna autoritativní časová značka ve formátu ISO 8601 (například `2026-09-24T18:42:15.000Z`), ze které lze zobrazit datum i čas. `savedTimeZone` zachytí časové pásmo pro srozumitelné zobrazení. Tím se předejde nesouladu samostatného data a času.

- `activeContext` obsahuje režim, ID aktivní plochy a příslušný profil/misi/fázi. Při obnově SPACE může aplikace navíc uchovat poslední navštívenou misi pro pozdější návrat.
- `missions` a `spaces` obsahují všechny dosavadní stavy, nikoli pouze aktivní záznam.
- Před serializací vždy synchronizovat aktuální editaci z plátna do příslušného stavu, aby export neztratil poslední přesun, text nebo spojení.
- Import sám nepřepisuje datum posledního uložení na aktuální čas. Nová hodnota vzniká při dalším uložení/exportu. Čas importu lze evidovat zvlášť, není však povinný.
- Časová značka pochází z hodin zařízení a není ověřeným důkazem času odevzdání.
- Aplikace nemůže potvrdit skutečné dokončení zápisu souboru na disk v běžném prohlížeči; čas označuje vytvoření uloženého snímku pro export.

Návrh názvu: `hefaistos-H-postup-2026-09-24.json`.

### Import

- Dostupný přes standardní položku `Import JSON` v menu.
- Nejprve validovat formát a kompatibilitu v dočasném stavu. Neplatný soubor nesmí změnit rozpracovanou práci.
- Při střetu s existující prací nabídnout srozumitelný přehled a výslovné potvrzení nahrazení; umožnit předtím export současného stavu. Import není skrytý restart.
- Po úspěšném importu obnovit celou práci a aktivní kontext. Pokud byl aktivní level, obnovit příslušný profil a misi a otevřít její zadání v modalu. Pokud byl aktivní SPACE, otevřít právě tento SPACE. Import nesmí vytvářet výchozí plochy přes již obnovené stavy.
- Z uloženého `completed` nebo bodů neodvozovat prokázanou správnost. Při ověřování/odevzdání znovu spustit testy.
- Pokud jsou podporovány starší exporty editoru, načíst je jako diagram s odpovídajícím upozorněním; nevymýšlet chybějící důkazy splnění.

## 9. Správnost interpretu a hodnocení

Před rozšiřováním obsahu opravit zjištěné slabiny současné aplikace:

| Zjištění z předchozího posouzení | Požadované řešení |
|---|---|
| Původní poslední mise uzná očekávaný text i bez provedení cyklu. | Ověřovat skutečné události a výsledky zpracování. U mise na opakování ověřit i použití a vykonání tohoto principu. |
| Vzor od nuly s podmínkou `krok <= n` provede o jeden průchod navíc. | Opravit hranice a otestovat 0, 1 a více průchodů. |
| VOLÁNÍ jen zaznamenává popisek, nevykonává tělo podprogramu. | Do povinné cesty učebních oborů nezařazovat; neprezentovat symbolickou simulaci jako skutečný podprogram. |
| Efektivita se odvozuje od počtu bloků. | Pro m07 měřit vykonané operace na stejných datech. Poznámky nejsou operace. |
| Poznámka v toku se v simulaci a automatickém testu chová různě. | Sjednotit sémantiku obou režimů; poznámka nemá měnit výsledek algoritmu. |
| Přepnutí příběhu obnovuje výchozí misi. | Změna prezentace nesmí přepisovat uživatelskou práci. |

Další požadavky:

- Jeden společný vykonávací model pro animovaný běh, krokování a automatické testy.
- Kontrolovat dosažení konce, připojení nutných větví a chyby vstupů; chránit aplikaci limitem běhu.
- Hodnotit význam výsledku a události, nikoli pouze přesnou shodu výstupního textu s předlohou.
- Po editaci zneplatnit aktuální ověření, historický dosažený pokrok ponechat odděleně.
- Přijímat více správných algoritmů. Případné omezení konstrukce uvést v zadání, například „Použij opakování“.
- U známé chyby ukázat konkrétní vstup a rozdíl očekávaného/skutečného chování.
- Výpočty a podmínky řešit omezeným validovaným jazykem nebo strukturovanými poli; importované popisky nevykonávat jako libovolný JavaScript a nevkládat je jako neověřené HTML.

## 10. Motivace a hodnocení

- Zachovat viditelný pokrok a obnovovaná zařízení lodi.
- Značky: **Zprovozněno – Ověřeno – Upraveno**. Musí odpovídat skutečně dokončené činnosti, ne jen otevření obrazovky.
- Odstranit znevýhodnění za nápovědu nebo více pokusů. Chyba patří k učení.
- Nepřidávat časový tlak, trestání ztrátou postupu, povinné denní série ani nekonečné sbírání bodů.
- Pokud zůstanou XP/hvězdy/certifikát, navázat je na doložené dokončení a zabránit násobení odměn opakovaným testem.
- Certifikát může potvrzovat absolvované mise, nikoli automaticky splnění celého RVP.
- Třídní žebříček, účty, cloudové profily, multiplayer a AI chat nejsou součástí zadání.

## 11. Dobrovolná vlastní dílna

Ponechat volné pracovní plochy. Přidat několik kartiček s cílem a příklady vstupů/výstupů, bez předem hotového řešení:

- Balení výbavy pro zadaný počet členů posádky.
- Kontrola dílu podle zvolené délkové meze.
- Výpočet spotřeby materiálu nebo ceny zakázky.
- Třídění dobrých a vadných kusů.
- Zastavení výroby po dosažení požadovaného počtu výrobků.
- Úprava již vyřešené mise pro jiný stroj či jinou zakázku.

Nenutit žáka k obsahu nad rámec povinné cesty. Dobrovolná dílna nesmí nahrazovat povinnou malou samostatnou úlohu m08.

## 12. Technický návrh uspořádání

- Oddělit definice misí a testů od uložené práce žáka.
- Stav indexovat minimálně dvojicí `profileId + missionId`.
- Oddělit operace `openMission`, `openAssignment`, `initializeMission`, `restartMission`, `saveProgress`, `exportProgress`, `importProgress`.
- `openAssignment` nesmí zapisovat výchozí bloky ani resetovat příznaky pokusu.
- Výchozí definice držet neměnné a při inicializaci kopírovat.
- Stabilní typy a ID příkazů oddělit od jejich příběhových popisků.
- Rozlišit stav nové/rozpracované/dokončené mise od výsledku posledního běhu a od právě otevřeného modalu.
- Nevytvářet backend pro funkce, které lze spolehlivě realizovat lokálně.
- Implementaci rozdělit na opravu běhu a ukládání, nové mise a následně prezentační úpravy.

## 13. Akceptační scénáře

1. H zobrazuje 8 misí, E/J 6 souvisle očíslovaných misí.
2. Kliknutí na libovolný level vždy otevře modal zadání.
3. Žák přesune blok, změní hodnotu a propojení; po opětovném otevření stejného levelu vše zůstane zachované.
4. Přepnutí do jiného levelu a zpět, obnovení stránky i změna příběhu nezničí práci.
5. I úmyslně vyprázdněná plocha zůstane po návratu prázdná; šablona se nevytvoří znovu podle počtu bloků.
6. Zrušený restart nic nezmění. Potvrzený restart obnoví pouze aktuální misi a profil.
7. Po splnění celého levelu se nabídne stažení JSON. Volba „Teď ne“ umožní pokračovat.
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

## 14. Pořadí realizace

1. Opravit kontrolní mechanismus, vzory a shodu režimů běhu.
2. Zavést bezpečné stavy misí, neinvazivní modal zadání a restart.
3. Upravit automatické ukládání, export/import a nabídku JSON po dokončení.
4. Připravit a ověřit m01–m04 jako společný základ.
5. Doplnit m05–m08 a podpůrné varianty E/J.
6. Navázat motivaci a výsledky na skutečné činnosti žáka.
7. Pilotně ověřit časovou dotaci a srozumitelnost; upravit podporu bez neodůvodněného přidávání obsahu.

## 15. Podklady a kurikulární opora

- Přiložený `code-flowchart.html`: výchozí aplikace a předchozí ověření kontrolního mechanismu.
- Přiložený `vzdelavaci-metodiky.md`: pedagogické principy, selektivně použité podle tohoto zadání.
- [RVP SOV – nové pojetí ICT, H, příloha 2b](https://digitalizace.rvp.cz/files/priloha-2b-ict-sov-h.pdf).
- [RVP SOV – nové pojetí ICT, E/J, příloha 1b](https://digitalizace.rvp.cz/files/priloha-1b-ict-sov-e-j.pdf).
- [NPI: změny informatického vzdělávání v SOV](https://digitalizace.rvp.cz/sov/co-se-meni).

Podklady byly probrány v předchozím posouzení v této konverzaci. Konkrétní mise, počty hodin, příběh a technické řešení jsou navrženou pedagogickou realizací, nikoli doslovnými požadavky RVP. Při konečném zařazení učitel ověří vazbu na konkrétní obor a ŠVP.
