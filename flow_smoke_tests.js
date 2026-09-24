// F1 — smoke test UI: spustí App.init() a herní metody nad bohatým DOM mockem.
// Doplňuje jednotkové testy Game (flow_game_tests.js) o ověření propojení s UI.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const FILE = path.join(__dirname, 'code-flowchart.html');

const store = new Map();
const localStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
    clear: () => store.clear(),
};

const registry = new Map();
function el(id = '') {
    if (registry.has(id)) return registry.get(id);
    const e = {
        id,
        _cls: new Set(),
        style: {},
        children: [],
        value: '',
        clientWidth: 1200,
        clientHeight: 800,
        classList: {
            add: (c) => e._cls.add(c),
            remove: (c) => e._cls.delete(c),
            toggle: (c, on) => { if (on === undefined) { e._cls.has(c) ? e._cls.delete(c) : e._cls.add(c); } else if (on) e._cls.add(c); else e._cls.delete(c); },
            contains: (c) => e._cls.has(c),
        },
        appendChild(c) { e.children.push(c); return c; },
        removeChild(c) { e.children = e.children.filter(x => x !== c); },
        remove() {},
        addEventListener() {},
        removeEventListener() {},
        setAttribute() {},
        getAttribute() { return null; },
        querySelector() { return null; },
        querySelectorAll() { return []; },
        focus() {},
        contains() { return false; },
        set innerHTML(v) { e._html = v; if (v === '') e.children = []; },
        get innerHTML() { return e._html; },
        set textContent(v) { e._text = v; },
        get textContent() { return e._text; },
        getBoundingClientRect() { return { left: 0, top: 0, width: 100, height: 50, right: 100, bottom: 50 }; },
    };
    registry.set(id, e);
    return e;
}

const document = {
    getElementById: (id) => (id ? el(id) : null),
    querySelectorAll: () => [],
    querySelector: () => null,
    createElement: () => el('_' + Math.random()),
    createElementNS: () => el('_' + Math.random()),
    addEventListener() {},
    removeEventListener() {},
    body: el('body'),
    documentElement: el('html'),
    fullscreenElement: null,
};

const sandbox = {
    window: { addEventListener() {}, removeEventListener() {} },
    document,
    localStorage,
    setTimeout: (fn) => { try { fn(); } catch (e) { console.error('setTimeout err:', e.message); } return 0; },
    clearTimeout() {},
    setInterval: () => 0,
    clearInterval() {},
    console,
    navigator: {},
    requestAnimationFrame: (fn) => { try { fn(); } catch (e) { console.error('rAF err:', e.message); } return 0; },
    AudioContext: function () { return { createOscillator: () => ({ connect() {}, start() {}, stop() {}, frequency: {}, type: '' }), createGain: () => ({ connect() {}, gain: {} }), destination: {}, currentTime: 0, state: 'running', resume() {} }; },
    FileReader: function () {},
    Blob: function () {},
    URL: { createObjectURL: () => '', revokeObjectURL() {} },
};

const html = fs.readFileSync(FILE, 'utf8');
const match = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
vm.createContext(sandbox);
const code = match[1] + '\n;globalThis.__App = App; globalThis.__Game = Game; globalThis.__LEVELS = LEVELS;';
new vm.Script(code, { filename: 'code-flowchart.html:inline-script' }).runInContext(sandbox);

const App = sandbox.__App;
const Game = sandbox.__Game;
const LEVELS = sandbox.__LEVELS;

let pass = 0, fail = 0;
const check = (n, c, x = '') => { if (c) { pass++; console.log('  OK   ' + n); } else { fail++; console.error('  FAIL ' + n + (x ? ' -> ' + x : '')); } };

console.log('\n[App.init + F1 UI]');
try {
    App.init();
    check('init proběhl bez výjimky', true);
} catch (e) {
    check('init proběhl bez výjimky', false, e.stack);
}

check('výchozí plocha = space1 (jablka demo)', App.activeWorkspace === 'space1', App.activeWorkspace);
check('režim = space', App.modeOf(App.activeWorkspace) === 'space');
check('HUD skrytý (ne v MISE)', !App.dom.hud.classList.contains('show'));
check('6 mis v menu', App.dom.menuMissions.children.length === 6, 'got ' + App.dom.menuMissions.children.length);
check('space1 má obsah (jablka)', App.blocks.length > 0, 'bloky=' + App.blocks.length);
check('jmenný modal se při startu neotevřel', !App.dom.nameModal.classList.contains('show'));

console.log('\n[jméno přes UI]');
App.dom.nameInput.value = '  Evička  ';
App.submitName();
check('jméno uloženo a ořezáno', Game.playerName === 'Evička');
check('modal zavřen', !App.dom.nameModal.classList.contains('show'));
check('HUD ukazuje jméno', App.dom.hudName.textContent === 'Evička');

console.log('\n[prázdné jméno odmítnuto]');
Game.playerName = '';
App.dom.nameInput.value = '';
App.submitName();
check('chybová zpráva', App.dom.nameError.textContent.length > 0);
check('zůstal bez jména', Game.playerName === '');

console.log('\n[mise → XP/HUD]');
Game.playerName = 'Evička';
Game.completeLevel(2, { noHint: true, firstTry: true, efficient: true });
App.updateGameUI();
check('HUD XP = 174', App.dom.hudXp.textContent === '174 XP', App.dom.hudXp.textContent);
check('HUD hvězdy = ★3', App.dom.hudStars.textContent === '★3', App.dom.hudStars.textContent);
check('HUD hodnost', App.dom.hudRank.textContent === 'Nováček u pásu');

console.log('\n[plochy SPACE 1–5]');
App.selectWorkspace('space1');
check('plocha space1', App.activeWorkspace === 'space1');
check('modeOf(space1) = space', App.modeOf('space1') === 'space');
check('SPACE 1 má jablka (bloky > 0)', App.blocks.length > 0, 'bloky=' + App.blocks.length);
check('HUD skrytý v SPACE', !App.dom.hud.classList.contains('show'));
App.selectWorkspace('space2');
check('space2 prázdná (jen Start)', App.blocks.length === 1, 'bloky=' + App.blocks.length);
App.selectWorkspace('space3');
check('plocha space3', App.activeWorkspace === 'space3');
App.selectWorkspace('space4');
check('plocha space4', App.activeWorkspace === 'space4');
App.selectWorkspace('space5');
check('plocha space5', App.activeWorkspace === 'space5');
check('aktivní plocha persistována', sandbox.localStorage.getItem('blockflow_v3_active_ws') === 'space5');
App.selectWorkspace('campaign');
check('zpět do KAMPAŇě na poslední level', App.activeWorkspace === 'lvl1', App.activeWorkspace);
check('HUD zpět viditelný', App.dom.hud.classList.contains('show'));

console.log('\n[registr ploch]');
const slots = App.workspaceSlots();
check('obsahuje space1-5 i lvl1-6',
    ['space1', 'space2', 'space3', 'space4', 'space5', 'lvl1', 'lvl6'].every(s => slots.indexOf(s) !== -1));
check('celkem 11 ploch (5 + 6)', slots.length === 11, 'got ' + slots.length);

console.log('\n[vstup do mise → level modal]');
App.enterCampaignLevel(3);
check('aktivní plocha = lvl3', App.activeWorkspace === 'lvl3');
check('level modal otevřen', App.dom.levelModal.classList.contains('show'));
check('titulek = 3. Vstupenka 15+', App.dom.levelTitle.textContent === '3. Vstupenka 15+', App.dom.levelTitle.textContent);
check('tělo obsahuje cíl', String(App.dom.levelBody.innerHTML).indexOf('Načti věk') !== -1);
check('kompas skrytý', App.dom.levelKompas.style.display === 'none');
App.toggleLevelKompas();
check('kompas zobrazen', App.dom.levelKompas.style.display === 'block');
App.closeLevelModal();
check('level modal zavřen', !App.dom.levelModal.classList.contains('show'));
check('scaffold levelu 3 (bloky > 0)', App.blocks.length > 0, 'bloky=' + App.blocks.length);

console.log('\n[RESET]');
App.doReset();
check('jméno smazáno', Game.playerName === '');
check('XP smazáno', Game.xp === 0);
check('jmenný modal se neotevřel (ptá se až u levelu)', !App.dom.nameModal.classList.contains('show'));

console.log('\n[jméno se ptá až při kliknutí na level]');
App.enterCampaignLevel(1);
check('klik na level otevřel jmenný modal', App.dom.nameModal.classList.contains('show'));
check('čeká na level 1', App.pendingLevel === 1);
App.dom.nameInput.value = 'Operátor';
App.submitName();
check('jméno uloženo', Game.playerName === 'Operátor');
check('rovnou vstoupil do levelu 1', App.activeWorkspace === 'lvl1', App.activeWorkspace);
check('level modal otevřen', App.dom.levelModal.classList.contains('show'));

console.log('\n[cheat Ctrl+Alt+C — krok za krokem]');
App.switchWorkspace('lvl4');
const sol = LEVELS.find(l => l.id === 4).solution;
const total = sol.blocks.length + sol.arrows.length;
App.cheatStep = 0;
for (let i = 1; i <= total; i++) {
    App.cheatSolveStep();
    if (i === 1) check('1. krok = 1 blok, 0 šipek', App.blocks.length === 1 && App.arrows.length === 0,
        'bloky=' + App.blocks.length + ' šipky=' + App.arrows.length);
}
check('plné řešení = všechny bloky', App.blocks.length === sol.blocks.length, App.blocks.length + '/' + sol.blocks.length);
check('plné řešení = všechny šipky', App.arrows.length === sol.arrows.length, App.arrows.length + '/' + sol.arrows.length);
App.cheatSolveStep();
check('další stisk resetuje na prázdno', App.blocks.length === 0 && App.arrows.length === 0);
check('cheatStep vynulován', App.cheatStep === 0);

console.log('\n[validace prázdného vstupu]');
App.switchWorkspace('space2');
App.blocks = []; App.arrows = [];
const eb = App.addBlockSilent('process', 'Původní', 0, 0);
App.openEdit(eb.id);
App.dom.editInput.value = '   ';
App.saveEdit();
check('prázdný text bloku se neuloží', App.blocks.find(x => x.id === eb.id).label === 'Původní');
check('u editace se zobrazí chyba', App.dom.editError.style.display === 'block');
App.dom.editInput.value = 'Nový text';
App.saveEdit();
check('platný text bloku se uloží', App.blocks.find(x => x.id === eb.id).label === 'Nový text');

let inputResolved = false;
App.resolveInputFn = () => { inputResolved = true; };
App.dom.simInputField.value = '';
App.resolveInputPrompt();
check('prázdný vstup se neodešle', inputResolved === false);
check('u vstupu se zobrazí chyba', App.dom.simInputError.style.display === 'block');
App.dom.simInputField.value = '7';
App.resolveInputPrompt();
check('platný vstup se odešle', inputResolved === true);

console.log(`\nVýsledek: ${pass} OK, ${fail} FAIL`);
process.exit(fail === 0 ? 0 : 1);
