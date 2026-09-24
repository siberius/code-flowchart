// F0 — testy persistence: saveWorkspace / loadWorkspace (round-trip, chybějící a vadná data).
const { loadApp, makeApp } = require('./flow_test_utils.js');

const { App, sandbox } = loadApp();

let pass = 0;
let fail = 0;
function check(name, cond, extra = '') {
    if (cond) { pass++; console.log(`  OK   ${name}`); }
    else { fail++; console.error(`  FAIL ${name}${extra ? ' -> ' + extra : ''}`); }
}

console.log('\n[saveWorkspace / loadWorkspace]');
const app = makeApp(App);
app.activeWorkspace = 0;
app.blocks = [{ id: 'b1', type: 'start', label: 'Start', x: 0, y: 0 }];
app.arrows = [{ id: 'a1', from: 'b1', fromPort: 'bottom', to: 'b2' }];
app.nextId = 5;
app.vx = 10;
app.vy = 20;
app.vscale = 1.5;
app.saveWorkspace(0);

check('uloží klíč pracovní plochy', sandbox.localStorage.getItem('blockflow_v1_1_ws_0') !== null);
check('uloží aktivní plochu', sandbox.localStorage.getItem('blockflow_v1_1_active_ws') === '0');

const app2 = makeApp(App);
app2.blocks = [];
app2.arrows = [];
app2.nextId = 1;
app2.vx = 0;
app2.vy = 0;
app2.vscale = 1;
const ok = app2.loadWorkspace(0);
check('load vrátí true', ok === true);
check('obnoví bloky', app2.blocks.length === 1 && app2.blocks[0].id === 'b1');
check('obnoví šipky', app2.arrows.length === 1 && app2.arrows[0].id === 'a1');
check('obnoví nextId', app2.nextId === 5);
check('obnoví view (vx/vscale)', app2.vx === 10 && app2.vscale === 1.5);

console.log('\n[okrajové stavy]');
check('chybějící plocha = false', makeApp(App).loadWorkspace(2) === false);

sandbox.localStorage.setItem('blockflow_v1_1_ws_3', '{toto není json');
const app3 = makeApp(App);
let threw = false;
let res;
const origError = console.error;
console.error = () => {};
try { res = app3.loadWorkspace(3); } catch (e) { threw = true; }
console.error = origError;
check('vadný JSON nevyhodí výjimku', threw === false);
check('vadný JSON = false', res === false);

console.log(`\nVýsledek: ${pass} OK, ${fail} FAIL`);
process.exitCode = fail ? 1 : 0;
