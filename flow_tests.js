// F0 — testy jádra: parser výrazů, VÝSTUP {var}, bezpečnost, runaway, porty.
const { loadApp, makeApp } = require('./flow_test_utils.js');

const { App } = loadApp();
const app = makeApp(App);

let pass = 0;
let fail = 0;
function check(name, cond, extra = '') {
    if (cond) { pass++; console.log(`  OK   ${name}`); }
    else { fail++; console.error(`  FAIL ${name}${extra ? ' -> ' + extra : ''}`); }
}
function eq(name, actual, expected) {
    check(name, actual === expected, `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

console.log('\n[parser výrazů]');
app.visualRAM = {};
app.parseVariable('cena = 15');
app.parseVariable('kusy = 3');
app.parseVariable('mezisoucet = cena * kusy');
eq('násobení proměnných', app.visualRAM.mezisoucet, 45);

app.visualRAM = {};
app.parseVariable('c = 12.5');
app.parseVariable('k = 4');
app.parseVariable('m = c * k');
eq('desetinná čísla', app.visualRAM.m, 50);

app.visualRAM = { pocet1: 0 };
app.parseVariable('pocet1 = pocet1 + 1');
app.parseVariable('pocet1++');
app.parseVariable('pocet1 += 2');
eq('počítadlo =/++/+=', app.visualRAM.pocet1, 4);

app.visualRAM = {};
app.parseVariable('seznam.push("a")');
app.parseVariable('seznam.push(2)');
check('push do pole', Array.isArray(app.visualRAM.seznam) && app.visualRAM.seznam.length === 2);

app.visualRAM = {};
app.parseVariable('barvy = ["cervena", "modra"]');
check('pole literálem', Array.isArray(app.visualRAM.barvy) && app.visualRAM.barvy[1] === 'modra');

console.log('\n[VÝSTUP — náhrada proměnných]');
app.visualRAM = { skore: 5 };
eq('složené závorky {var}', app.replaceVars('Máš {skore} bodů.'), 'Máš 5 bodů.');
eq('holé var', app.replaceVars('Máš skore bodů.'), 'Máš 5 bodů.');
check('nezůstávají závorky', !app.replaceVars('{skore}').includes('{'));

app.visualRAM = { skore: 5, skore1: 9 };
eq('hranice názvů skore/skore1', app.replaceVars('{skore} {skore1}'), '5 9');

app.visualRAM = { v: 'a$&b' };
eq('znak $ ve hodnotě', app.replaceVars('[{v}]'), '[a$&b]');

app.visualRAM = { jmeno: '"Eda"' };
eq('string z VSTUPu bez uvozovek', app.replaceVars('Díky {jmeno}!'), 'Díky Eda!');

console.log('\n[literály v uvozovkách nejsou proměnné]');
app.visualRAM = { ok: 2, stav: 'ok' };
eq('replaceVars: literál "ok" zůstává', app.replaceVars('Stav: "ok" / {stav}'), 'Stav: "ok" / ok');
app.visualRAM = { ok: 2 };
app.parseVariable('x = 1');
eq('parser: přiřazení do x', app.visualRAM.x, 1);
app.visualRAM = { ok: 2 };
app.parseVariable('s = "ok"');
eq('parser: literál v uvozovkách se neexpanduje', app.visualRAM.s, 'ok');
app.visualRAM = { ok: 2, stav: 'ok' };
eq('podmínka se vyhodnotí správně', app.evalCondition('stav == "ok"', app.visualRAM), true);
app.visualRAM = { ok: 0, stav: 'vadne' };
eq('podmínka s jiným stavem', app.evalCondition('stav == "ok"', app.visualRAM), false);

console.log('\n[tichá chyba výrazu]');
app.visualRAM = {};
app.logs = [];
app.parseVariable('x = (');
check('chybný výraz se zaloguje', app.logs.some((l) => l.msg.includes('CHYBA VÝRAZU')), JSON.stringify(app.logs));

console.log('\n[vstup — deklarace typu (text vs číslo)]');
eq('n = vstup číslo -> number', app.inputExpect('n = vstup číslo'), 'number');
eq('n = vstup number -> number', app.inputExpect('n = input number'), 'number');
eq('jmeno = vstup text -> text', app.inputExpect('jmeno = vstup text'), 'text');
eq('n = cislo -> number', app.inputExpect('n = cislo'), 'number');
eq('barevná var cislo = null', app.inputExpect('cislo'), null);
eq('vek bez typu -> null', app.inputExpect('vek'), null);
eq('zadej číslo -> number', app.inputExpect('zadej čislo'), 'number');

console.log('\n[aritmetika přes text = CHYBA TYPU]');
app.visualRAM = { pocet: '"abc"' };
app.runtimeTypeError = false;
app.parseVariable('pocet++');
check('inkrement textu hlásí typ chybu', app.runtimeTypeError === true);
eq('inkrement textu -> 1', app.visualRAM.pocet, 1);
app.visualRAM = { skore: '"deset"' };
app.runtimeTypeError = false;
app.parseVariable('skore += 5');
check('+= přes text hlásí typ chybu', app.runtimeTypeError === true);
eq('+= přes text -> 5', app.visualRAM.skore, 5);
app.visualRAM = { skore: '"deset"' };
check('toNumber text hlásí typ chybu', app.toNumber('deset', 'Hodnota', 'test') === 0 && app.runtimeTypeError === true);
app.visualRAM = { n: 5 };
app.parseVariable('n += 2');
eq('+= čísel nadále funguje', app.visualRAM.n, 7);

console.log('\n[nekonečná smyčka — stavová detekce]');
const counts = {};
for (let i = 0; i < 201; i++) App.nextStateCount(counts, 'k');
check('runaway po 201 opakování stavu', App.isRunaway(counts, 'k', 10) === true);
const fresh = {};
App.nextStateCount(fresh, 'k');
check('jednorázový stav není runaway', App.isRunaway(fresh, 'k', 10) === false);
check('runaway podle celkových kroků', App.isRunaway({}, 'k', App.MAX_TOTAL_STEPS + 1) === true);

console.log('\n[porty ANO/NE/TĚLO/KONEC]');
const arrows = [
    { from: 'd1', fromPort: 'right', to: 'a' },
    { from: 'd1', fromPort: 'bottom', to: 'b' },
    { from: 'x', fromPort: 'bottom', to: 'z' },
];
const decision = { id: 'd1', type: 'decision', yesPort: 'right', noPort: 'bottom' };
eq('větev ANO', App.pickNextArrow(decision, true, arrows).to, 'a');
eq('větev NE', App.pickNextArrow(decision, false, arrows).to, 'b');
check('slepá ulička = null', App.pickNextArrow({ id: 'd1', type: 'decision', yesPort: 'left', noPort: 'top' }, true, arrows) === null);
const loop = { id: 'd1', type: 'loop', yesPort: 'right', noPort: 'bottom' };
eq('smyčka TĚLO', App.pickNextArrow(loop, true, arrows).to, 'a');
eq('smyčka KONEC', App.pickNextArrow(loop, false, arrows).to, 'b');
eq('proces = první šipka', App.pickNextArrow({ id: 'd1', type: 'process' }, null, arrows).to, 'a');

console.log(`\nVýsledek: ${pass} OK, ${fail} FAIL`);
process.exitCode = fail ? 1 : 0;
