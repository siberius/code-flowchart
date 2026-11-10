# AI při používání vzdělávací aplikace

Tuto referenci použij pouze tehdy, když hotová aplikace během používání volá AI službu. AI použitá k napsání kódu nebo přípravě obsahu zkontrolovaného učitelem takový provoz nevyžaduje. Offline aktivitě připojení nepřidávej, pokud je nevyžaduje vzdělávací cíl. Nevnucuj konkrétní model.

## Vymezená výuková role

Urči povolené činnosti modelu, zkontrolované podklady či zdroje a postup při chybějících důkazech. Kde záleží na věcné správnosti, vymez schválené materiály a zachovej jejich původ. Nevytvářej zdánlivě věrohodné citace. Připusť nejistotu a opravu. Z krátkého rozhovoru nevyvozuj diagnózy ani sebejisté soudy o schopnostech žáka.

Pomoc přizpůsob aktivitě. Procvičování může využívat naváděcí otázky, odstupňované nápovědy, řešené příklady i přímé vysvětlení na požádání nebo tehdy, když další otázky nepomáhají. Při zkoušení se pomoc řídí pravidly učitele. Nezaváděj nekonečné sokratovské dotazování ani všeobecný zákaz sdělit řešení. Žák musí mít možnost požádat o pomoc, skončit nebo zapojit učitele.

Rozhraní s živou AI navrhuj tak, aby bránilo bezmyšlenkovitému kopírování výstupů (kognitivnímu offloadingu). Před převzetím vygenerovaného postupu nebo odpovědi vyžaduj krátkou regulační akci žáka: vymezení vlastního záměru před dotazem, zastavení nad výstupem (kognitivní pauzu), zhodnocení úplnosti či správnosti a vědomou volbu dalšího kroku (pokračovat, ověřit, přeformulovat dotaz, nebo výstup nepoužít).

Pro zpětnou vazbu a otevřené odpovědi používej výslovná hodnoticí kritéria. Před použitím porovnej hodnocení modelu s příklady posouzenými učitelem. Závažná rozhodnutí o klasifikaci, zařazení žáka nebo kázeňských opatřeních vyžadují odpovědnou lidskou kontrolu; jediná odpověď modelu nesmí rozhodovat sama. Zaznamenej nejistotu a umožni učiteli hodnocení opravit.

## Minimum žákovských dat

Popiš vstupy odesílané poskytovateli, uchovávání dat, přístupová oprávnění a mazání. Sbírej jen údaje potřebné pro aktivitu. Automaticky nepřidávej účty, skutečná jména, trvalé profily ani ukládání rozhovorů. Kde stačí anonymní nebo pseudonymní označení aktivity, použij je; pseudonym sám anonymitu nezaručuje.

Před nasazením nezletilým ověř s odpovědnou školou věkovou skupinu, školní pravidla a dohodnutý postup, aktuální podmínky a nastavení poskytovatele i příslušné místní požadavky. Nevymýšlej univerzální věkovou hranici souhlasu ani obecně platné právní pravidlo. Nakládání s daty vysvětli učitelům a žákům přiměřeným jazykem.

## Ochrana v architektuře

Vyžaduje-li služba tajné přístupové klíče, uchovávej je v chráněné serverové části. Nikdy je nevkládej do kódu prohlížeče. Oprávnění, limity požadavků a přístup k nástrojům vynucuj mimo prompt. Vstupy žáků, načtené dokumenty i odpovědi modelu považuj za nedůvěryhodná data.

Odděl instrukce od vloženého obsahu, omez nástroje a cílová místa komunikace, ověřuj strukturované odpovědi a bezpečně vykresluj obsah. Zabraň přímému spouštění generovaného textu jako kódu nebo privilegované operace. Pokyn modelu, aby ignoroval podvržené instrukce, není bezpečnostní záruka. Implementovanou architekturu nech posoudit odpovídajícím bezpečnostním postupem.

## Cena, výpadky a pokračování práce

Stanov rozpočet, limity relace, časové limity a možnost zrušení požadavku. Během čekání zobraz srozumitelný stav. Ošetři výpadek školní Wi-Fi, nedostupný model, chybný formát odpovědi a vyčerpanou kvótu bez ztráty práce žáka. Opakování požadavků musí být bezpečné a omezené.

Navrhni přiměřenou náhradu: zkontrolované nápovědy, statické úlohy, uložený postup nebo pomoc učitele. Nedostupnou zpětnou vazbu označ; nevymýšlej ji. Počítej s různými školními zařízeními a omezeným připojením. Záložní průchod sám o sobě není důvodem přidat další backend.

Před použitím ve třídě projdi hlavní aktivitu, chybnou odpověď, žádost o pomoc, nejisté hodnocení a selhání služby. Uveď zbývající omezení a rozsah kontroly učitelem.
