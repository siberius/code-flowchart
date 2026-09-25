// F0/F1 — testy persistence: saveWorkspace / loadWorkspace (round-trip, chybějící a vadná data).
const { loadApp, makeApp } = require('./flow_test_utils.js');

const { App, sandbox } = loadApp();

let pass = 0;
let fail = 0;
function check(name, cond, extra = '') {
    if (cond) { pass++; console.log(`  OK   ${name}`); }
    else { fail++; console.error(`  FAIL ${name}${extra ? ' -> ' + extra : ''}`); }
}

console.log('\n[saveWorkspace / loadWorkspace — sloty]');
const app = makeApp(App);
app.activeWorkspace = 'space1';
app.blocks = [{ id: 'b1', type: 'start', label: 'Start', x: 0, y: 0 }];
app.arrows = [{ id: 'a1', from: 'b1', fromPort: 'bottom', to: 'b2' }];
app.nextId = 5;
app.vx = 10;
app.vy = 20;
app.vscale = 1.5;
app.saveWorkspace('space1');

check('uloží klíč plochy', sandbox.localStorage.getItem('blockflow_v3_ws_space1') !== null);
check('uloží aktivní plochu', sandbox.localStorage.getItem('blockflow_v3_active_ws') === 'space1');

const app2 = makeApp(App);
app2.blocks = [];
app2.arrows = [];
app2.nextId = 1;
app2.vx = 0;
app2.vy = 0;
app2.vscale = 1;
const ok = app2.loadWorkspace('space1');
check('load vrátí true', ok === true);
check('obnoví bloky', app2.blocks.length === 1 && app2.blocks[0].id === 'b1');
check('obnoví šipky', app2.arrows.length === 1 && app2.arrows[0].id === 'a1');
check('obnoví nextId', app2.nextId === 5);
check('obnoví view (vx/vscale)', app2.vx === 10 && app2.vscale === 1.5);

console.log('\n[okrajové stavy]');
check('chybějící plocha = false', makeApp(App).loadWorkspace('neexistuje') === false);

sandbox.localStorage.setItem('blockflow_v3_ws_bad', '{toto není json');
const app3 = makeApp(App);
let threw = false;
let res;
const origError = console.error;
console.error = () => {};
try { res = app3.loadWorkspace('bad'); } catch (e) { threw = true; }
console.error = origError;
check('vadný JSON nevyhodí výjimku', threw === false);
check('vadný JSON = false', res === false);

// ==== F4 (PLAN §7.10/§8.4): restart mise + export/import JSON = úplný snímek ====
const Game = sandbox.__Game;

console.log('\n[F4 restart mise — jen aktuální mise/profil, historie zůstává]');
sandbox.localStorage.clear();
const ar = makeApp(App);
ar.activeWorkspace = 'm01';
ar.blocks = [{ id: 'b1', type: 'process', label: 'žákova změna', x: 0, y: 0 }];
ar.arrows = [];
ar.saveWorkspace('m01');
ar.saveWorkspace('space2');
const wsBefore = sandbox.localStorage.getItem('blockflow_v3_ws_space2');
Game.levels = { m01: { status: 'done', stars: 3, bestXp: 145, tag: 'overeno', attempts: 1 } };
Game.setTag('m01', Game.TAGS.ZPROVOZNENO); // nesmí degradovat záznam
check('historie mise před restartem', Game.levels.m01.status === 'done' && Game.levels.m01.tag === 'overeno');

const restartOk = ar.restartMission('m01');
const m01ScaffoldCount = sandbox.__MISSIONS.H[0].scaffold.blocks.length;
check('restart vrátil true', restartOk === true);
check('aktivní plocha zůstala m01', ar.activeWorkspace === 'm01');
check('scaffold znovu postaven (bloky = scaffold)', ar.blocks.length === m01ScaffoldCount, 'bloky=' + ar.blocks.length);
check('scaffold bez spojů (žák staví znovu)', ar.arrows.length === 0);
check('pokus je nový → znovu neověřeno', ar.lastSimStatus === 'untested');
check('historie dokončení zůstává', Game.levels.m01.status === 'done', JSON.stringify(Game.levels.m01));
check('značka zůstává Ověřeno', Game.levels.m01.tag === 'overeno', Game.levels.m01.tag);
check('jiná plocha (space2) se restartu nedotkla', sandbox.localStorage.getItem('blockflow_v3_ws_space2') === wsBefore);

const ar2 = makeApp(App);
ar2.activeWorkspace = 'space2';
ar2.blocks = [{ id: 'b9', type: 'start', label: 'Start', x: 0, y: 0 }];
ar2.saveWorkspace('space2');
ar2.saveWorkspace('m02');
const m02Before = sandbox.localStorage.getItem('blockflow_v3_ws_m02');
ar2.restartMission('m01');
check('restart nečinné mise nepřepne plochu', ar2.activeWorkspace === 'space2');
check('restart nečinné mise nesahá na jinou misi', sandbox.localStorage.getItem('blockflow_v3_ws_m02') === m02Before);
check('restart mimo MISE = false', ar2.restartMission('space2') === false);

console.log('\n[F4 export = úplný snímek (schemaVersion, savedAt, jméno/null, mise, plochy)]');
sandbox.localStorage.clear();
const ae = makeApp(App);
ae.profile = 'H';
ae.activeWorkspace = 'm02';
Game.playerName = 'Pepa';
Game.xp = 255;
Game.levels = { m01: { status: 'done', stars: 2, bestXp: 135, tag: 'overeno', attempts: 2 } };
Game.certificates = [{ levelId: 'm01', date: '2026-09-25T10:00:00.000Z' }];
Game.save();
ae.saveWorkspace('m02');
ae.saveWorkspace('space3');
const snap = ae.buildSnapshot();
check('schemaVersion = 3', snap.schemaVersion === 3);
check('app = hefaistos-code-flowchart', snap.app === 'hefaistos-code-flowchart');
check('contentVersion vyplněna', typeof snap.contentVersion === 'string' && snap.contentVersion.length > 0);
check('savedAt je ISO 8601 datum', typeof snap.savedAt === 'string' && snap.savedAt.length > 0);
check('savedTimeZone vyplněna', typeof snap.savedTimeZone === 'string' && snap.savedTimeZone.length > 0);
check('jméno v snímku', snap.playerName === 'Pepa');
check('profil v snímku', snap.profile === 'H');
check('aktivní kontext (mise m02)', snap.activeContext.mode === 'campaign' && snap.activeContext.workspace === 'm02' && snap.activeContext.level === 'm02');
check('mise v snímku', snap.missions.m01 && snap.missions.m01.status === 'done');
check('plochy v snímku', snap.workspaces.m02 && snap.workspaces.space3);
check('historie certifikátů v snímku', snap.history.certificates.length === 1);
check('xp v snímku', snap.game.xp === 255);

console.log('\n[F4 migrace klíčů v1 → v3 (PLAN §7.9 — bezeztrátová, novější data mají přednost)]');
sandbox.localStorage.clear();
sandbox.localStorage.setItem('blockflow_v1_player', 'První');
sandbox.localStorage.setItem('blockflow_v1_ws_m03', JSON.stringify({ blocks: [], arrows: [] }));
const am = makeApp(App);
const moved = am.migrateLegacyKeys();
check('migrace přesunula v1 klíče', moved === 2, 'moved=' + moved);
check('player migrován na v2', sandbox.localStorage.getItem('blockflow_v2_player') === 'První');
check('plocha m03 migrována na v3', sandbox.localStorage.getItem('blockflow_v3_ws_m03') !== null);
sandbox.localStorage.setItem('blockflow_v1_player', 'Starší');
sandbox.localStorage.setItem('blockflow_v2_player', 'Novější');
const moved2 = am.migrateLegacyKeys();
check('novější data mají přednost', sandbox.localStorage.getItem('blockflow_v2_player') === 'Novější' && moved2 === 0);

console.log('\n[F4 export bez jména → null, savedAt se mění]');
const anon = makeApp(App);
Game.playerName = '';
Game.save();
const s1 = anon.buildSnapshot();
check('jméno = null', s1.playerName === null);
Game.playerName = null;
Game.save();
const t0 = Date.now(); while (Date.now() - t0 < 5) {}
const s2 = anon.buildSnapshot();
check('jméno i po defaultu = null', s2.playerName === null);
check('savedAt se aktualizuje (nový čas)', s2.savedAt !== s1.savedAt && s2.savedAt >= s1.savedAt);

console.log('\n[F4 import — round-trip: plochy, mise, jméno, profil, aktivní kontext]');
sandbox.localStorage.clear();
Game.playerName = null;
Game.reset();
const ai = makeApp(App);
ai.profile = 'E_J';
ai.activeWorkspace = 'space4';
Game.levels = { e1: { status: 'done', stars: 1, bestXp: 100, attempts: 1 } };
Game.xp = 100;
ai.saveWorkspace('space4');
const snapshot = ai.buildSnapshot();
check('snímek rozpoznán jako full', App.parseImportData(JSON.stringify(snapshot)).type === 'full');

sandbox.localStorage.clear();
Game.reset();
ai.activeWorkspace = 'space1';
const ai2 = makeApp(App);
const applied = ai2.applySnapshot(snapshot);
check('aplikováno (plochy obnoveny)', applied.workspaces === 1, JSON.stringify(applied));
check('obnoveny mise', applied.missions === 1, JSON.stringify(applied));
check('jméno obnoveno (null)', Game.playerName === null);
check('profily obnoven (E_J)', ai2.profile === 'E_J', ai2.profile);
check('obnoven aktivní kontext (space4)', ai2.activeWorkspace === 'space4', ai2.activeWorkspace);
check('plocha space4 obnovena', ai2.loadWorkspace('space4') === true);
check('mise e1 obnovena', Game.levels.e1 && Game.levels.e1.status === 'done');

console.log('\n[F4 import — po importu neplatný soubor nepoškodí práci]');
const beforeWs = sandbox.localStorage.getItem('blockflow_v3_ws_space4');
const beforeName = Game.playerName;
const badOutcome = ai2.parseImportData('{totálně nevalidní json');
check('neplatný soubor = invalid', badOutcome.type === 'invalid');
check('práce zůstala beze změny', sandbox.localStorage.getItem('blockflow_v3_ws_space4') === beforeWs);
check('jméno zůstalo', Game.playerName === beforeName);

console.log('\n[F4 import — starý formát ploch (legacy) načte diagramy s varováním, herní stav zůstává]');
const legacy = { app: 'blockflow-workspaces', version: 2, active: 'space5', workspaces: { space5: { blocks: [{ id: 'b1', type: 'start', label: 'Legacy', x: 0, y: 0 }], arrows: [] } } };
const legacyOutcome = ai2.parseImportData(JSON.stringify(legacy));
check('starý balík = legacy', legacyOutcome.type === 'legacy');
const n = ai2.applyLegacyWorkspaces(legacyOutcome.workspaces, legacyOutcome.active);
check('načteny legacy plochy', n === 1, 'n=' + n);
check('aktivní plocha = space5 (z legacy)', ai2.activeWorkspace === 'space5', ai2.activeWorkspace);

console.log(`\nVýsledek: ${pass} OK, ${fail} FAIL`);
process.exitCode = fail ? 1 : 0;
