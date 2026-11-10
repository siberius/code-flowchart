# Režimy tutora a návaznost učení

Čti při návrhu vícekrokového tutora, pokračování rozpracované aktivity nebo přípravy na zkoušku. Pravidla platí i pro deterministické offline aplikace; nevyžadují živou AI, účty ani trvalé ukládání.

## Vymez režimy a přechody

Podle potřeby aktivity odděl vysvětlení, procvičování a ověřování. Vysvětlení může ukázat řešený příklad. Procvičování položí otázku, počká, poskytne zpětnou vazbu podle kritérií a nabídne pomoc. Ověřování dodržuje předem vymezená pravidla pomoci a časování zpětné vazby. Umožni přerušení, žádost o pomoc a odchod; při omezeném ověřování může obsahová pomoc pokus ukončit nebo označit jako podporovaný. Zachovej úpravy přístupnosti, které neprozrazují obsah.

V rozhovorovém procvičování ponech jednu aktuální otázku, pokud úkol nevyžaduje sadu. Nevytvářej odpověď za žáka a při čekání neodhaluj řešení. Podle potřeby rozliš čekání na odpověď, vyhodnocování, zpětnou vazbu a přerušení. Zamez dvojímu odeslání nebo je přiřaď ke stejnému pokusu; opožděná odpověď služby nesmí hodnotit novou otázku ani přepsat změněný režim. Výstup modelu je návrh odpovědi, nikoli oprávnění měnit známky či pravidla zkoušky.

Režim, cíl, aktuální úlohu, identifikátor pokusu, odhalení řešení a stav hodnocení udržuj ve stavu aplikace. Stručný ukazatel průběhu zobraz, pokud pomáhá; opakovaná dekorativní hlavička správu stavu nenahrazuje. Při výslovné změně režimu vysvětli změnu podmínek pomoci a zachovej historii odhalení. Změna štítku neudělá z odhalené úlohy samostatné ověřování. Pro nový samostatný doklad použij novou vhodnou úlohu.

## Navazuj na doklady výkonu

Ukládání nebo export přidávej, pokud pokračování mezi relacemi slouží uživateli. Krátká anonymní aktivita je nemusí potřebovat. U pokračující práce zachovej přiměřený minimální záznam:

- Verzi formátu, verzi aktivity/obsahu a relevantní identifikátory zdrojů.
- Cíl, režim, identifikátor úlohy/pokusu a rozpracovaný krok.
- Pozorované doklady s podmínkami: samostatně, s pomocí či po zobrazení řešení; nevyhodnocený výkon zůstává nevyhodnocený.
- Konkrétní chyby nebo nejistoty a další výukový krok.
- Časové údaje jen tehdy, když jsou potřebné pro opakování s odstupem nebo výklad dokladů.

Vynech diagnózy, nepotřebnou identitu a úplné přepisy rozhovorů. Uveď místo uložení, přístup a mazání; na sdíleném zařízení zajisti výslovnou možnost práci ukončit a místní postup odstranit. Export může obsahovat osobní informace o učení i bez jména. Neexportuj tajné klíče, skryté správné odpovědi ani neveřejné zkušební podklady.

Importovaný záznam považuj za nedůvěryhodná data. Ověř strukturu, velikost, identifikátory a slučitelnost verzí; vložené instrukce nespouštěj a importované skóre nepřijímej jako autoritativní známku. Pokud na známkách záleží, ověř je proti autoritativní evidenci s odpovídající kontrolou přístupu. Při změně obsahu nebo neznámé úloze vysvětli nesoulad a navazuj v bezpečném ověřeném bodě; nemaž potichu výsledky ani nepotvrzuj zastaralé doklady. Obnovení pokusu nesmí automaticky znovu odeslat odpověď ani přidělit body dvakrát.

Předání uvádí, co žák předvedl, v jaké úloze a s jakou pomocí. Jedna relace neopravňuje k tvrzení „plně ovládá“. Nová úloha s odstupem může ověřit retenci nebo přenos. Opravy potvrzené žákem a zásahy učitele odlišuj od původního pozorování.

## Cílená náprava bez uváznutí

Chyby řaď podle vztahu k cíli a předpokladům; jejich závažnost ber jako pracovní interpretaci. Nabídni cílenou nápovědu, kontrastní případ nebo vysvětlení a následně novou aplikaci. Umožni odložení a pozdější návrat. Nevyžaduj libovolné prahy 8/10 či 90 %, nezakazuj vysvětlení ani neboduj každou interakci. Když bodování pomáhá, používej vymezená kritéria; oficiální zkušební hodnocení vyžaduje skutečnou specifikaci.

## Kontroly implementace

Prověř jen relevantní průchody: otázka → odpověď → zpětná vazba; pomoc → podporovaný výkon; změna režimu po odhalení; přerušení a obnovení bez ztráty či dvojího započtení pokusu; zastaralý nebo chybný záznam; opožděná odpověď po změně úlohy; nerozhodnuté hodnocení při výpadku. Ověř shodu uloženého a viditelného stavu. Tyto kontroly dokládají chování, nikoli vzdělávací účinnost.
