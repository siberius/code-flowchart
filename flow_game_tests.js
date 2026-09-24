// F1 — testy herní vrstvy: LEVELS data, jméno, XP bonusy, hvězdy, hodnosti,
// completeLevel + certifikát, persistence, reset.
const { loadApp } = require('./flow_test_utils.js');

const { App, Game, LEVELS, SAMPLES, sandbox } = loadApp();

let pass = 0;
let fail = 0;
function check(name, cond, extra = '') {
    if (cond) { pass++; console.log(`  OK   ${name}`); }
    else { fail++; console.error(`  FAIL ${name}${extra ? ' -> ' + extra : ''}`); }
}
function eq(name, actual, expected) {
    check(name, actual === expected, `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

function makeGame() {
    const g = Object.create(Game);
    g.playerName = '';
    g.xp = 0;
    g.levels = {};
    g.certificates = [];
    return g;
}

console.log('\n[LEVELS — data 6 stupňů]');
eq('počet stupňů = 6', LEVELS.length, 6);
check('id 1..6', LEVELS.every((l, i) => l.id === i + 1));
check('každý má název, cíl, xpBase', LEVELS.every(l => l.name && l.goal && l.xpBase > 0));
check('cíl ≤ 15 slov', LEVELS.every(l => l.goal.trim().split(/\s+/).length <= 15),
    LEVELS.map(l => l.goal.trim().split(/\s+/).length).join(','));
check('Kompas má 4 stupně', LEVELS.every(l => l.kompas && l.kompas.cil && l.kompas.hacek && l.kompas.vzor && l.kompas.postup));
check('1–3 testovací vektory', LEVELS.every(l => l.tests.length >= 1 && l.tests.length <= 3),
    LEVELS.map(l => l.tests.length).join(','));
check('každý stupeň má scaffolding', LEVELS.every(l => l.scaffold && Array.isArray(l.scaffold.blocks) && l.scaffold.blocks.length > 0));
check('scaffold bloky mají typ/label', LEVELS.every(l => l.scaffold.blocks.every(b => b.type && b.label)));
check('scaffold je bez spojů (žák zapojuje sám)', LEVELS.every(l => !l.scaffold.arrows || l.scaffold.arrows.length === 0));
check('každý stupeň má vzorové řešení (cheat)', LEVELS.every(l => l.solution && Array.isArray(l.solution.blocks) && l.solution.blocks.length > 0));
check('řešení má šipky s platnými indexy', LEVELS.every(l => (l.solution.arrows || []).length > 0 && l.solution.arrows.every(a =>
    Array.isArray(a) && a.length === 4 && a[0] >= 0 && a[0] < l.solution.blocks.length && a[2] >= 0 && a[2] < l.solution.blocks.length)));
check('level 4 (streamer) = „Moderace chatu"', LEVELS.find(l => l.id === 4).name === 'Moderace chatu');

console.log('\n[SAMPLES — ukázkové diagramy]');
check('alespoň 3 ukázky', SAMPLES.length >= 3, 'got ' + SAMPLES.length);
check('ukázky mají id/název/bloky', SAMPLES.every(s => s.id && s.name && Array.isArray(s.blocks) && s.blocks.length > 0));
check('ukázky začínají Startem a končí Koncem',
    SAMPLES.every(s => s.blocks[0].type === 'start' && s.blocks[s.blocks.length - 1].type === 'end'));
check('ukázky mají platné šipky', SAMPLES.every(s => (s.arrows || []).length > 0 && s.arrows.every(a =>
    Array.isArray(a) && a.length === 4 && a[0] >= 0 && a[0] < s.blocks.length && a[2] >= 0 && a[2] < s.blocks.length)));
check('ukázky mají bloky s pozicí', SAMPLES.every(s => s.blocks.every(b => b.type && b.label && typeof b.x === 'number' && typeof b.y === 'number')));

console.log('\n[jméno — validace 1–30 znaků]');
const g1 = makeGame();
eq('platné jméno', g1.setPlayerName('Eda'), true);
eq('uloží ořezané jméno', g1.playerName, 'Eda');
check('prázdné odmítnuto', makeGame().setPlayerName('   ') === false);
check('31 znaků odmítnuto', makeGame().setPlayerName('x'.repeat(31)) === false);
check('30 znaků přijato', makeGame().setPlayerName('x'.repeat(30)) === true);

console.log('\n[XP bonusy — jen pozitivní]');
eq('základ bez bonusu', Game.bonusXp(100, {}), 100);
eq('noHint +20 %', Game.bonusXp(100, { noHint: true }), 120);
eq('noHint + prvniPokus', Game.bonusXp(100, { noHint: true, firstTry: true }), 135);
eq('všechny bonusy (100 → 145)', Game.bonusXp(100, { noHint: true, firstTry: true, efficient: true }), 145);
check('XP nikdy < základ', Game.bonusXp(200, {}) === 200);

console.log('\n[hvězdy — hranice 115 / 125 %]');
eq('100 % = ★', Game.starsFor(100, 100), 1);
eq('115 % = ★', Game.starsFor(115, 100), 1);
eq('116 % = ★★', Game.starsFor(116, 100), 2);
eq('125 % = ★★', Game.starsFor(125, 100), 2);
eq('126 % = ★★★', Game.starsFor(126, 100), 3);
eq('145 % = ★★★', Game.starsFor(145, 100), 3);

console.log('\n[hodnosti — prahy, téma streamer (výchozí)]');
eq('0 = Nováček', Game.rankFor(0), 'Nováček');
eq('449 = Nováček', Game.rankFor(449), 'Nováček');
eq('450 = Ranked hráč', Game.rankFor(450), 'Ranked hráč');
eq('899 = Ranked hráč', Game.rankFor(899), 'Ranked hráč');
eq('900 = Speedrunner', Game.rankFor(900), 'Speedrunner');
eq('1399 = Speedrunner', Game.rankFor(1399), 'Speedrunner');
eq('1400 = Legenda serveru', Game.rankFor(1400), 'Legenda serveru');

console.log('\n[narativní témata — přepnutí]');
check('výchozí téma = streamer', App.narrative === 'streamer');
App.applyNarrative('operator');
eq('operátor: level 4 = Kontrola kvality', LEVELS.find(l => l.id === 4).name, 'Kontrola kvality');
eq('operátor: level 3 = Vstupenka 15+', LEVELS.find(l => l.id === 3).name, 'Vstupenka 15+');
eq('operátor: hodnost 0', Game.rankFor(0), 'Nováček u pásu');
eq('operátor: text bloku', LEVELS.find(l => l.id === 2).scaffold.blocks[1].label, 'cena');
App.applyNarrative('streamer');
eq('zpět streamer: level 4', LEVELS.find(l => l.id === 4).name, 'Moderace chatu');
eq('zpět streamer: hodnost 0', Game.rankFor(0), 'Nováček');
eq('zpět streamer: text bloku', LEVELS.find(l => l.id === 2).scaffold.blocks[1].label, 'cenaSub');
eq('téma persistováno', sandbox.localStorage.getItem('blockflow_v3_narrative'), 'streamer');

console.log('\n[3 mise → XP i certifikát]');
sandbox.localStorage.clear();
const g3 = makeGame();
g3.setPlayerName('Testik');
const r1 = g3.completeLevel(1, { noHint: true, firstTry: true });
eq('mise 1 XP (100 + 35 %)', r1.xp, 135);
eq('mise 1 hvězdy', r1.stars, 3);
eq('mise 1 poprvé', r1.firstTime, true);
const r2 = g3.completeLevel(2, {});
eq('mise 2 XP = základ', r2.xp, 120);
const r3 = g3.completeLevel(3, { noHint: true });
eq('mise 3 XP (140 + 20 %)', r3.xp, 168);
eq('kumulativní XP', g3.xp, 135 + 120 + 168);
eq('počet certifikátů', g3.certificates.length, 3);
const cert = r3.certificate;
check('certifikát má jméno', cert.playerName === 'Testik');
check('certifikát má stupeň', cert.levelId === 3 && cert.levelName === 'Turnaj 15+');
check('certifikát má datum', typeof cert.date === 'string' && cert.date.length > 0);
check('certifikát má XP/hvězdy/hodnost', cert.xp === 168 && cert.stars === 2 && typeof cert.rank === 'string');
eq('isLevelDone(1)', g3.isLevelDone(1), true);
eq('isLevelDone(6) zatím ne', g3.isLevelDone(6), false);

console.log('\n[opakované splnění nepřidává XP znovu]');
const before = g3.xp;
g3.completeLevel(1, {});
eq('XP beze změny', g3.xp, before);
eq('certifikát přesto vznikl', g3.certificates.length, 4);

console.log('\n[persistence — save/load round-trip]');
const gLoad = makeGame();
gLoad.load();
eq('jméno přežilo', gLoad.playerName, 'Testik');
eq('XP přežilo', gLoad.xp, before);
eq('stupně přežily', gLoad.levels[1].status, 'done');
eq('certifikáty přežily', gLoad.certificates.length, 4);

console.log('\n[reset — smaže vše]');
gLoad.reset();
eq('jméno smazáno', gLoad.playerName, '');
eq('XP smazáno', gLoad.xp, 0);
eq('stupně smazány', Object.keys(gLoad.levels).length, 0);
eq('certifikáty smazány', gLoad.certificates.length, 0);
const gAfterReset = makeGame();
gAfterReset.load();
eq('localStorage po resetu prázdný', gAfterReset.playerName, '');

console.log(`\nVýsledek: ${pass} OK, ${fail} FAIL`);
process.exit(fail === 0 ? 0 : 1);
