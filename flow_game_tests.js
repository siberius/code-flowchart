// F1 — testy herní vrstvy: MISSIONS data (H m01–m08 + E_J e1–e6), profily, jméno
// (dobrovolné), XP bonusy, hvězdy, hodnosti, značky, completeLevel + certifikát,
// persistence, reset.
const { loadApp } = require('./flow_test_utils.js');

const { App, Game, MISSIONS, SAMPLES, sandbox } = loadApp();

let pass = 0;
let fail = 0;
function check(name, cond, extra = '') {
    if (cond) { pass++; console.log(`  OK   ${name}`); }
    else { fail++; console.error(`  FAIL ${name}${extra ? ' -> ' + extra : ''}`); }
}
function eq(name, actual, expected) {
    check(name, actual === expected, `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}
function allMissions() { return MISSIONS.H.concat(MISSIONS.E_J); }

function makeGame() {
    const g = Object.create(Game);
    g.playerName = '';
    g.xp = 0;
    g.levels = {};
    g.certificates = [];
    return g;
}

console.log('\n[MISSIONS — data: 8 misí H + 6 misí E/J]');
eq('H = 8 misí', MISSIONS.H.length, 8);
eq('E_J = 6 misí', MISSIONS.E_J.length, 6);
eq('H id (m01..m08)', MISSIONS.H.map(m => m.id).join(','), 'm01,m02,m03,m04,m05,m06,m07,m08');
eq('E_J id (e1..e6)', MISSIONS.E_J.map(m => m.id).join(','), 'e1,e2,e3,e4,e5,e6');
check('každá mise má název, cíl, xpBase', allMissions().every(l => l.id && l.name && l.goal && l.xpBase > 0));
check('cíl ≤ 15 slov', allMissions().every(l => l.goal.trim().split(/\s+/).length <= 15),
    allMissions().map(l => l.goal.trim().split(/\s+/).length).join(','));
check('Kompas má 4 stupně', allMissions().every(l => l.kompas && l.kompas.cil && l.kompas.hacek && l.kompas.vzor && l.kompas.postup));
check('každá mise má scaffolding (bloky s typem/labelem)',
    allMissions().every(l => l.scaffold && Array.isArray(l.scaffold.blocks) && l.scaffold.blocks.length > 0
        && l.scaffold.blocks.every(b => b.type && b.label)));
check('scaffold je bez spojů (žák zapojuje sám)', allMissions().every(l => !l.scaffold.arrows || l.scaffold.arrows.length === 0));
check('vzorové řešení: každá mise kromě m08/e6 (doplní se F5/F6)',
    allMissions().every(l => (l.id === 'm08' || l.id === 'e6')
        ? l.solution === null && l.tests.length === 0
        : l.solution && Array.isArray(l.solution.blocks) && l.solution.blocks.length > 0));
check('řešení má šipky s platnými indexy', allMissions().filter(l => l.solution).every(l =>
    (l.solution.arrows || []).length > 0 && l.solution.arrows.every(a =>
        Array.isArray(a) && a.length === 4 && a[0] >= 0 && a[0] < l.solution.blocks.length && a[2] >= 0 && a[2] < l.solution.blocks.length)));

console.log('\n[testovací vektory — informativní, cíl 2–3 na misi (m08/e6: 0, F5/F6)]');
allMissions().forEach(l => eq('mise ' + l.id + ' vektorů', l.tests.length, l.tests.length));

console.log('\n[SAMPLES — ukázkové diagramy]');
check('alespoň 3 ukázky', SAMPLES.length >= 3, 'got ' + SAMPLES.length);
check('ukázky mají id/název/bloky', SAMPLES.every(s => s.id && s.name && Array.isArray(s.blocks) && s.blocks.length > 0));
check('ukázky začínají Startem a končí Koncem',
    SAMPLES.every(s => s.blocks[0].type === 'start' && s.blocks[s.blocks.length - 1].type === 'end'));
check('ukázky mají platné šipky', SAMPLES.every(s => (s.arrows || []).length > 0 && s.arrows.every(a =>
    Array.isArray(a) && a.length === 4 && a[0] >= 0 && a[0] < s.blocks.length && a[2] >= 0 && a[2] < s.blocks.length)));
check('ukázky mají bloky s pozicí', SAMPLES.every(s => s.blocks.every(b => b.type && b.label && typeof b.x === 'number' && typeof b.y === 'number')));

console.log('\n[jméno — dobrovolné, 0–30 znaků (prázdné → null)]');
const g1 = makeGame();
eq('platné jméno', g1.setPlayerName('Eda'), true);
eq('uloží ořezané jméno', g1.playerName, 'Eda');
eq('prázdné = dobrovolné (null)', makeGame().setPlayerName('   '), true);
const gOpt = makeGame();
gOpt.setPlayerName('  ');
eq('playerName nastaveno na null', gOpt.playerName, null);
eq('31 znaků odmítnuto', makeGame().setPlayerName('x'.repeat(31)), false);
eq('30 znaků přijato', makeGame().setPlayerName('x'.repeat(30)), true);

console.log('\n[XP bonusy — jen pozitivní]');
eq('základ bez bonusu', Game.bonusXp(100, {}), 100);
eq('noHint +20 %', Game.bonusXp(100, { noHint: true }), 120);
eq('noHint + prvniPokus', Game.bonusXp(100, { noHint: true, firstTry: true }), 135);
eq('všechny bonusy (100 → 145)', Game.bonusXp(100, { noHint: true, firstTry: true, efficient: true }), 145);
eq('XP nikdy < základ', Game.bonusXp(200, {}), 200);

console.log('\n[hvězdy — hranice 115 / 125 %]');
eq('100 % = ★', Game.starsFor(100, 100), 1);
eq('115 % = ★', Game.starsFor(115, 100), 1);
eq('116 % = ★★', Game.starsFor(116, 100), 2);
eq('125 % = ★★', Game.starsFor(125, 100), 2);
eq('126 % = ★★★', Game.starsFor(126, 100), 3);
eq('145 % = ★★★', Game.starsFor(145, 100), 3);

console.log('\n[hodnosti — prahy (společné pro oba profily)]');
eq('0 = Nováček u pásu', Game.rankFor(0), 'Nováček u pásu');
eq('449 = Nováček u pásu', Game.rankFor(449), 'Nováček u pásu');
eq('450 = Pásový operátor', Game.rankFor(450), 'Pásový operátor');
eq('899 = Pásový operátor', Game.rankFor(899), 'Pásový operátor');
eq('900 = Mistr toku', Game.rankFor(900), 'Mistr toku');
eq('1399 = Mistr toku', Game.rankFor(1399), 'Mistr toku');
eq('1400 = Legenda déčka', Game.rankFor(1400), 'Legenda déčka');

console.log('\n[profily H / E_J — mění se jen prezentace, ne přepisuje práci]');
eq('výchozí profil = H', App.profile, 'H');
App.setProfile('E_J');
eq('přepnuto na E_J', App.profile, 'E_J');
eq('menu staví z E_J (6 misí)', MISSIONS[App.profile].length, 6);
eq('profil persistován', sandbox.localStorage.getItem('blockflow_v3_profile'), 'E_J');
App.setProfile('H');
eq('zpět na H (8 misí)', MISSIONS[App.profile].length, 8);
App.setProfile('neexistuje');
eq('neznámý profil → H', App.profile, 'H');

console.log('\n[3 mise → XP i certifikát]');
sandbox.localStorage.clear();
const g3 = makeGame();
g3.setPlayerName('Testik');
const r1 = g3.completeLevel('m01', { noHint: true, firstTry: true });
eq('m01 XP (100 + 35 %)', r1.xp, 135);
eq('m01 hvězdy', r1.stars, 3);
eq('m01 poprvé', r1.firstTime, true);
const r2 = g3.completeLevel('m02', {});
eq('m02 XP = základ', r2.xp, 120);
const r3 = g3.completeLevel('m03', { noHint: true });
eq('m03 XP (130 + 20 %)', r3.xp, 156);
eq('kumulativní XP', g3.xp, 135 + 120 + 156);
eq('počet certifikátů', g3.certificates.length, 3);
const cert = r3.certificate;
check('certifikát má jméno', cert.playerName === 'Testik');
check('certifikát má misi', cert.levelId === 'm03' && cert.levelName === 'Vytiskni náhradní držák');
check('certifikát má datum', typeof cert.date === 'string' && cert.date.length > 0);
check('certifikát má XP/hvězdy/hodnost', cert.xp === 156 && cert.stars === 2 && typeof cert.rank === 'string');
eq('isLevelDone(m01)', g3.isLevelDone('m01'), true);
eq('isLevelDone(m08) zatím ne', g3.isLevelDone('m08'), false);

console.log('\n[značky — jednosměrné povýšení, přežijí completeLevel]');
const g4 = makeGame();
g4.setTag('m01', Game.TAGS.ZPROVOZNENO);
eq('Zprovozněno nastaveno', g4.tagFor('m01'), 'zprovozneno');
g4.completeLevel('m01', {});
eq('značka přežila completeLevel', g4.tagFor('m01'), 'zprovozneno');
g4.setTag('m01', Game.TAGS.OVERENO);
eq('Ověřeno povyšuje', g4.tagFor('m01'), 'overeno');
g4.setTag('m01', Game.TAGS.ZPROVOZNENO);
eq('Zprovozněno nedegraduje', g4.tagFor('m01'), 'overeno');
g4.setTag('m01', Game.TAGS.UPRAVENO);
eq('Upraveno povyšuje', g4.tagFor('m01'), 'upraveno');
eq('neznámá mise → null', g4.tagFor('m99'), null);

console.log('\n[opakované splnění nepřidává XP znovu]');
const before = g3.xp;
g3.completeLevel('m01', {});
eq('XP beze změny', g3.xp, before);
eq('certifikát přesto vznikl', g3.certificates.length, 4);

console.log('\n[persistence — save/load round-trip]');
const gLoad = makeGame();
gLoad.load();
eq('jméno přežilo', gLoad.playerName, 'Testik');
eq('XP přežilo', gLoad.xp, before);
eq('mise přežily', gLoad.levels.m01.status, 'done');
eq('certifikáty přežily', gLoad.certificates.length, 4);

console.log('\n[reset — smaže vše]');
gLoad.reset();
eq('jméno smazáno', gLoad.playerName, '');
eq('XP smazáno', gLoad.xp, 0);
eq('mise smazány', Object.keys(gLoad.levels).length, 0);
eq('certifikáty smazány', gLoad.certificates.length, 0);
const gAfterReset = makeGame();
gAfterReset.load();
eq('localStorage po resetu prázdný', gAfterReset.playerName, '');

console.log(`\nVýsledek: ${pass} OK, ${fail} FAIL`);
process.exit(fail === 0 ? 0 : 1);