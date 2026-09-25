// F1 — smoke test UI: spustí App.init() a herní metody nad bohatým DOM mockem.
// Doplňuje jednotkové testy Game (flow_game_tests.js) o ověření propojení s UI.
// Od F1 (V2.2): slot plochy = id mise (m01..m08, e1..e6), profily H/E_J, jméno dobrovolné.
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
const code = match[1] + '\n;globalThis.__App = App; globalThis.__Game = Game; globalThis.__MISSIONS = MISSIONS;';
new vm.Script(code, { filename: 'code-flowchart.html:inline-script' }).runInContext(sandbox);

const App = sandbox.__App;
const Game = sandbox.__Game;
const MISSIONS = sandbox.__MISSIONS;
const missionById = sandbox.missionById;

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
check('8 misí H v menu', App.dom.menuMissions.children.length === 8, 'got ' + App.dom.menuMissions.children.length);
check('space1 má obsah (jablka)', App.blocks.length > 0, 'bloky=' + App.blocks.length);
check('jmenný modal se při startu neotevřel', !App.dom.nameModal.classList.contains('show'));

console.log('\n[jméno přes UI]');
App.dom.nameInput.value = '  Evička  ';
App.submitName();
check('jméno uloženo a ořezáno', Game.playerName === 'Evička');
check('modal zavřen', !App.dom.nameModal.classList.contains('show'));
check('HUD ukazuje jméno', App.dom.hudName.textContent === 'Evička');

console.log('\n[mise → XP/HUD]');
Game.completeLevel('m02', { noHint: true, firstTry: true, efficient: true });
App.updateGameUI();
check('HUD XP = 174', App.dom.hudXp.textContent === '174 XP', App.dom.hudXp.textContent);
check('HUD hvězdy = ★3', App.dom.hudStars.textContent === '★3', App.dom.hudStars.textContent);
check('HUD hodnost', App.dom.hudRank.textContent === 'Nováček u pásu', App.dom.hudRank.textContent);

console.log('\n[profily H / E_J přes UI]');
App.setProfile('H');
check('ikona H', App.dom.btnProfile.textContent === '⚙');
check('HUD role = HEFAISTOS H', App.dom.hudRole.textContent === 'HEFAISTOS H');
App.toggleProfile();
check('přepnuto na E_J', App.profile === 'E_J');
check('ikona E/J', App.dom.btnProfile.textContent === '🛠');
check('HUD role = HEFAISTOS E/J', App.dom.hudRole.textContent === 'HEFAISTOS E/J');
check('menu 6 misí E/J', App.dom.menuMissions.children.length === 6, 'got ' + App.dom.menuMissions.children.length);
check('profil persistován', sandbox.localStorage.getItem('blockflow_v3_profile') === 'E_J');
App.toggleProfile();
check('zpět na H (8 misí)', App.profile === 'H' && App.dom.menuMissions.children.length === 8);

console.log('\n[prázdné jméno = dobrovolné, pokračuje bez jména]');
App.openNameModal();
App.dom.nameInput.value = '   ';
Game.playerName = '';
App.submitName();
check('bez chybové zprávy', App.dom.nameError.textContent === '');
check('modal zavřen', !App.dom.nameModal.classList.contains('show'));
check('jméno = null (dobrovolné)', Game.playerName === null, String(Game.playerName));
check('HUD ukazuje pomlčku', App.dom.hudName.textContent === '—');

console.log('\n[modal mise — příběh a přesun bloků]');
Game.playerName = 'Evička';
App.enterCampaignLevel('m01');
check('modal mise otevřen', App.dom.levelModal.classList.contains('show'));
check('modal obsahuje příběh', App.dom.levelBody.innerHTML.includes('ŠROUB'), App.dom.levelBody.innerHTML.slice(0, 120));
check('modal vyzývá k přesunu bloků', App.dom.levelBody.innerHTML.includes('Přesuň') && App.dom.levelBody.innerHTML.includes('propoj'));
check('modal popisuje ověření bez AUTO-kontroly', !App.dom.levelBody.innerHTML.includes('AUTO-kontrola') && App.dom.levelBody.innerHTML.includes('Spusť program'));
App.closeLevelModal();

console.log('\n[dokončení mise → hvězdy do menu]');
Game.levels = {};
Game.xp = 0;
App.activeWorkspace = 'm01';
App.activeLevel = 'm01';
App.levelHintUsed = false;
App.levelFailed = false;
App.blocks = [];
App.onLevelSuccess();
check('mise m01 dokončena', Game.isLevelDone('m01'));
check('hvězdy = 3', Game.levels.m01.stars === 3, 'got ' + (Game.levels.m01 && Game.levels.m01.stars));
check('menu ukazuje ★★★ u mise m01', App.dom.menuMissions.children[0].innerHTML.includes('★★★'));
check('menu ukazuje značku Ověřeno', App.dom.menuMissions.children[0].innerHTML.includes('Ověřeno'));
check('HUD hvězdy = ★3', App.dom.hudStars.textContent === '★3', App.dom.hudStars.textContent);
check('výsledkový modal otevřen', App.dom.levelResultModal.classList.contains('show'));
App.closeLevelResult();
check('výsledkový modal zavřen', !App.dom.levelResultModal.classList.contains('show'));

console.log('\n[plochy SPACE 1–5]');
App.selectWorkspace('space1');
check('plocha space1', App.activeWorkspace === 'space1');
check('modeOf(space1) = space', App.modeOf('space1') === 'space');
check('SPACE 1 má jablka (bloky > 0)', App.blocks.length > 0, 'bloky=' + App.blocks.length);
check('HUD skrytý v SPACE', !App.dom.hud.classList.contains('show'));
App.selectWorkspace('space2');
check('space2 prázdná (jen Start)', App.blocks.length === 1 && App.blocks[0].type === 'start', 'bloky=' + App.blocks.length);
App.selectWorkspace('space3');
check('plocha space3', App.activeWorkspace === 'space3');
App.selectWorkspace('space4');
check('plocha space4', App.activeWorkspace === 'space4');
App.selectWorkspace('space5');
check('plocha space5', App.activeWorkspace === 'space5');
check('aktivní plocha persistována', sandbox.localStorage.getItem('blockflow_v3_active_ws') === 'space5');
App.selectWorkspace('campaign');
check('zpět do KAMPAŇě na poslední misi', App.activeWorkspace === 'm01', App.activeWorkspace);
check('HUD zpět viditelný', App.dom.hud.classList.contains('show'));

console.log('\n[registr ploch]');
const slots = App.workspaceSlots();
check('obsahuje space1-5 i m01/m08/e1/e6',
    ['space1', 'space2', 'space3', 'space4', 'space5', 'm01', 'm08', 'e1', 'e6'].every(s => slots.indexOf(s) !== -1));
check('celkem 19 ploch (5 × SPACE + 14 misí)', slots.length === 19, 'got ' + slots.length);

console.log('\n[vstup do mise → level modal]');
Game.playerName = 'Evička';
App.enterCampaignLevel('m03');
check('aktivní plocha = m03', App.activeWorkspace === 'm03');
check('level modal otevřen', App.dom.levelModal.classList.contains('show'));
check('titulek = m03. Vytiskni náhradní držák', App.dom.levelTitle.textContent === 'm03. Vytiskni náhradní držák', App.dom.levelTitle.textContent);
check('tělo obsahuje cíl', String(App.dom.levelBody.innerHTML).indexOf('spotřebu materiálu') !== -1);
check('kompas skrytý', App.dom.levelKompas.style.display === 'none');
App.toggleLevelKompas();
check('kompas zobrazen', App.dom.levelKompas.style.display === 'block');
App.closeLevelModal();
check('level modal zavřen', !App.dom.levelModal.classList.contains('show'));
check('scaffold m03 (bloky > 0)', App.blocks.length > 0, 'bloky=' + App.blocks.length);

console.log('\n[RESET]');
App.doReset();
check('jméno smazáno', Game.playerName === '');
check('XP smazáno', Game.xp === 0);
check('jmenný modal se neotevřel (ptá se až u levelu)', !App.dom.nameModal.classList.contains('show'));

console.log('\n[jméno se ptá až při kliknutí na level — zadání i přeskočení]');
App.enterCampaignLevel('m01');
check('klik na level otevřel jmenný modal', App.dom.nameModal.classList.contains('show'));
check('čeká na misi m01', App.pendingLevel === 'm01');
App.dom.nameInput.value = 'Operátor';
App.submitName();
check('jméno uloženo', Game.playerName === 'Operátor');
check('rovnou vstoupil do mise m01', App.activeWorkspace === 'm01', App.activeWorkspace);
check('level modal otevřen', App.dom.levelModal.classList.contains('show'));
App.closeLevelModal();

console.log('\n[bez jména — Zatím ne → pokračuje do mise]');
App.doReset();
App.enterCampaignLevel('m02');
check('jmenný modal znovu otevřen', App.dom.nameModal.classList.contains('show'));
App.submitName(true);
check('bez jména (null)', Game.playerName === null, String(Game.playerName));
check('nameSkipped = true', App.nameSkipped === true);
check('rovnou vstoupil do mise m02', App.activeWorkspace === 'm02', App.activeWorkspace);
check('level modal otevřen', App.dom.levelModal.classList.contains('show'));
App.closeLevelModal();
check('přepnutí do mise se už jména neptá', (App.enterCampaignLevel('m03'), !App.dom.nameModal.classList.contains('show') && App.activeWorkspace === 'm03'));

console.log('\n[cheat Ctrl+Alt+C — krok za krokem]');
App.switchWorkspace('m04');
const sol = missionById('m04').solution;
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

console.log('\n[ukázky v menu]');
App.renderSamples();
check('menu ukázek naplněno', App.dom.menuSamples.children.length >= 3, 'got ' + App.dom.menuSamples.children.length);
App.loadSample('hello');
check('ukázka načtena do plochy', App.blocks.length === 4, 'bloky=' + App.blocks.length);
check('ukázka má šipky', App.arrows.length === 3, 'šipky=' + App.arrows.length);
check('ukázka začíná Startem', App.blocks[0].type === 'start');
check('ukázka má výstupní blok', App.blocks.some(b => b.type === 'io' && b.ioType === 'output'));

console.log('\n[potvrzení v herním designu]');
let confirmed = false;
App.openConfirm({ title: 'Test', text: 'Opravdu?', onConfirm: () => { confirmed = true; } });
check('confirm modal otevřen', App.dom.confirmModal.classList.contains('show'));
App.confirmYes();
check('confirm callback proběhl', confirmed === true);
check('confirm modal zavřen', !App.dom.confirmModal.classList.contains('show'));
App.openConfirm({ title: 'Test', text: 'Opravdu?', onConfirm: () => { confirmed = false; } });
App.closeConfirm();
check('zrušení confirm neprovede callback', confirmed === true);

console.log('\n[dokončení = správná mise, ne stale activeLevel]');
Game.levels = {};
Game.xp = 0;
App.switchWorkspace('m03');
App.activeLevel = 'm01';
App.levelHintUsed = false;
App.levelFailed = false;
App.onLevelSuccess();
check('dokončena mise m03 (podle plochy)', Game.isLevelDone('m03'), 'levels=' + JSON.stringify(Object.keys(Game.levels)));
check('mise m01 dokončena nebyla', !Game.isLevelDone('m01'));
App.closeLevelResult();

console.log(`\nVýsledek: ${pass} OK, ${fail} FAIL`);
process.exit(fail === 0 ? 0 : 1);