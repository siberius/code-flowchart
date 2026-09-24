// F2: Checker — automatická kontrola diagramu proti skrytým testovacím vektorům.
// Jádro testuje samostatně (bez DOM); načte App z inline <script> jako ostatní sady.
const { loadApp, makeApp } = require('./flow_test_utils');

const { App, LEVELS, Game } = loadApp();

let pass = 0, fail = 0;
function check(name, cond, detail) {
    if (cond) { pass++; console.log('  OK   ' + name); }
    else { fail++; console.log('  FAIL ' + name + (detail !== undefined ? ' -> ' + detail : '')); }
}
function eq(name, got, want) { check(name, got === want, 'got ' + JSON.stringify(got) + ', want ' + JSON.stringify(want)); }

// Postaví diagram přesně podle vzorového řešení stupně.
function buildSolution(app, lvl) {
    app.blocks = []; app.arrows = []; app.nextId = 1;
    const sol = lvl.solution;
    const created = sol.blocks.map(def => {
        const b = app.addBlockSilent(def.type, def.label, def.x, def.y);
        if (def.ioType) b.ioType = def.ioType;
        if (def.yesPort) b.yesPort = def.yesPort;
        if (def.noPort) b.noPort = def.noPort;
        return b;
    });
    sol.arrows.forEach(a => {
        const from = created[a[0]], to = created[a[2]];
        if (from && to) app.addArrowSilent(from.id, a[1], to.id, a[3]);
    });
    return created;
}

function checkLevel(app, lvl) {
    app.activeWorkspace = 'lvl' + lvl.id;
    app.activeLevel = lvl.id;
    app.levelHintUsed = false;
    app.levelFailed = false;
    buildSolution(app, lvl);
    const res = app.runCheck(true);
    return res;
}

console.log('[F2 Checker — vzorová řešení procházejí všemi vektory]');
const app = makeApp(App);
Game.playerName = 'Evička';

LEVELS.forEach(lvl => {
    const res = checkLevel(app, lvl);
    const detail = res ? res.results.filter(r => !r.ok).map(r => 'T' + r.id + ': ' + r.message).join(' | ') : 'null';
    check('mise ' + lvl.id + ' (' + lvl.name + '): ' + (res ? res.passed + '/' + res.total : '?'),
        !!res && res.allOk, detail);
});

console.log('\n[operator temat — vzorová řešení procházejí]');
app.applyNarrative('operator');
LEVELS.forEach(lvl => {
    const res = checkLevel(app, lvl);
    const detail = res ? res.results.filter(r => !r.ok).map(r => 'T' + r.id + ': ' + r.message).join(' | ') : 'null';
    check('operator: mise ' + lvl.id + ' (' + lvl.name + '): ' + (res ? res.passed + '/' + res.total : '?'),
        !!res && res.allOk, detail);
});
app.applyNarrative('streamer');

console.log('\n[uveření hvězd po úspěšné kontrole]');
Game.levels = {}; Game.xp = 0;
app.levelHintUsed = false; app.levelFailed = false;
buildSolution(app, LEVELS[0]);
app.activeWorkspace = 'lvl1'; app.activeLevel = 1;
const okCheck = app.runCheck(true);
check('kontrola prošla', !!okCheck && okCheck.allOk);
check('mise 1 označena splněná', Game.isLevelDone(1));
check('hvězdy v záznamu = 3', Game.levels[1].stars === 3, Game.levels[1] && Game.levels[1].stars);
check('XP přičteno', Game.xp > 0, Game.xp);

console.log('\n[selhání: špatný výstup]');
Game.levels = {}; Game.xp = 0;
app.blocks = []; app.arrows = []; app.nextId = 1;
const s = app.addBlockSilent('start', 'Začátek', 0, 0);
const a = app.addBlockSilent('process', 'jmeno = "svete"', 0, 100);
const o = app.addBlockSilent('io', 'Ahoj, {jmeno}!', 0, 200); o.ioType = 'output';
const e = app.addBlockSilent('end', 'Konec', 0, 300);
app.addArrowSilent(s.id, 'bottom', a.id, 'top');
app.addArrowSilent(a.id, 'bottom', o.id, 'top');
app.addArrowSilent(o.id, 'bottom', e.id, 'top');
app.activeWorkspace = 'lvl1'; app.activeLevel = 1;
const bad = app.runCheck(true);
check('kontrola selhala', !!bad && !bad.allOk);
check('mise 1 nesplněna', !Game.isLevelDone(1));
check('chybová zpráva je konkrétní', !!bad && bad.results[0].message.indexOf('čekal jsem') !== -1,
    bad && bad.results[0].message);

console.log('\n[selhání: slepá ulička]');
app.blocks = []; app.arrows = []; app.nextId = 1;
const s2 = app.addBlockSilent('start', 'Začátek', 0, 0);
const a2 = app.addBlockSilent('process', 'Otevři bránu', 0, 100);
app.addArrowSilent(s2.id, 'bottom', a2.id, 'top');
app.activeWorkspace = 'lvl1'; app.activeLevel = 1;
const dead = app.runCheck(true);
check('kontrola selhala', !!dead && !dead.allOk);
check('zpráva o slepé uličce', !!dead && dead.results[0].message.indexOf('Slepá ulička') !== -1,
    dead && dead.results[0].message);
check('označen blok s chybou', !!dead && !!dead.results[0].errorBlock);

console.log('\n[selhání: zacyklení]');
app.blocks = []; app.arrows = []; app.nextId = 1;
const s3 = app.addBlockSilent('start', 'Začátek', 0, 0);
const init = app.addBlockSilent('process', 'y = 1', 0, 100);
const l3 = app.addBlockSilent('loop', 'y < 3', 0, 200); l3.yesPort = 'bottom'; l3.noPort = 'right';
const p3 = app.addBlockSilent('process', 'z = 1', 0, 300);
app.addArrowSilent(s3.id, 'bottom', init.id, 'top');
app.addArrowSilent(init.id, 'bottom', l3.id, 'top');
app.addArrowSilent(l3.id, 'bottom', p3.id, 'top');
app.addArrowSilent(p3.id, 'bottom', l3.id, 'left');
app.activeWorkspace = 'lvl1'; app.activeLevel = 1;
const loop = app.runCheck(true);
check('kontrola selhala (zacyklení)', !!loop && !loop.allOk);
check('zpráva o zacyklení', !!loop && loop.results[0].message.indexOf('Zacyklení') !== -1,
    loop && loop.results[0].message);

console.log('\n[evalCondition]');
const ram = { vek: 18, stav: 'ok', n: 4, krok: 4 };
eq('18 >= 15', app.evalCondition('vek >= 15', ram), true);
eq('12 >= 15', app.evalCondition('vek >= 15', { vek: 12 }), false);
eq('stav == "ok"', app.evalCondition('stav == "ok"', ram), true);
eq('stav != "ok"', app.evalCondition('stav != "ok"', ram), false);
eq('krok <= n', app.evalCondition('krok <= n', ram), true);
eq('krok < n', app.evalCondition('krok < n', ram), false);
eq('složená podmínka &&', app.evalCondition('vek >= 15 && stav == "ok"', ram), true);
eq('složená podmínka ||', app.evalCondition('vek < 15 || stav == "ok"', ram), true);
eq('nevyhodnotitelná podmínka → null', app.evalCondition('vek >=', ram), null);
check('neznámá proměnná je chyba, ne pád', app.evalCondition('chybVar > 1', {}) === null);

console.log('\n[canonOutput]');
eq('normalizuje bílé znaky', app.canonOutput('  Ahoj   světe  '), 'Ahoj světe');
eq('zaokrouhlí plovoucí plochu', app.canonOutput('Výsledek: 0.30000000000000004'), 'Výsledek: 0.3');
eq('nuluje prázdné', app.canonOutput(null), '');

console.log('\n[runCheck mimo MISE]');
app.activeWorkspace = 'space2';
eq('mimo MISE vrací null', app.runCheck(true), null);

console.log(`\nVýsledek: ${pass} OK, ${fail} FAIL`);
process.exit(fail === 0 ? 0 : 1);
