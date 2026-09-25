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
check('menu = semiprůhledné sklo (blur + saturate + nižší alfa)', /\-webkit-backdrop-filter\s*:\s*blur\(20px\)\s*saturate\(140%\)/.test(html) && /rgba\(13,\s*15,\s*20,\s*0\.4\)/.test(html) && /rgba\(15,\s*18,\s*26,\s*0\.6\)/.test(html) && /backdrop-filter\s*:\s*blur\(20px\)\s*saturate\(140%\)/.test(html), 'menu bez skla');
check('šedý text zesvětlen o 20 % (#64748b → #8390a2)', html.includes('--text-dim: #8390a2') && !html.includes('--text-dim: #64748b'));
check('modaly, terminál i prompt průhlednější než dřív', /\.modal-box\s*\{[^}]*rgba\(30,\s*34,\s*48,\s*0\.28\)/.test(html) && /#console-panel\s*\{[^}]*rgba\(13,\s*15,\s*20,\s*0\.7\)[\s\S]*?backdrop-filter: blur\(20px\)/.test(html) && /\.sim-prompt\s*\{[^}]*rgba\(13,\s*15,\s*20,\s*0\.75\)/.test(html), 'sklo bez úprav');

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
check('titulek = 3. Vytiskni náhradní držák (bez m03)', App.dom.levelTitle.textContent === '3. Vytiskni náhradní držák', App.dom.levelTitle.textContent);
check('pořadí misí: m01→1, m02→2, e1→1, e6→6, m99→0', App.missionNum('m01') === 1 && App.missionNum('m02') === 2 && App.missionNum('e1') === 1 && App.missionNum('e6') === 6 && App.missionNum('m99') === 0);
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

console.log('\n[ukázky v samostatném modalu Alt+S]');
App.openSamples();
check('modal ukázek otevřen', App.dom.samplesModal.classList.contains('show'));
check('seznam ukázek naplněn (12 ukázek)', App.dom.menuSamples.children.length === 12, 'got ' + App.dom.menuSamples.children.length);
App.closeSamples();
check('modal ukázek zavřen', !App.dom.samplesModal.classList.contains('show'));
check('Alt+S je v keydown handleru', /e\.altKey && !e\.ctrlKey && e\.key\.toLowerCase\(\)\s*===\s*'s'/.test(html));
check('ukázky nejsou v hamburger menu', !html.includes('menu-samples') && !html.includes('>UKÁZKY<'));
App.loadSample('hello');
check('ukázka načtena do plochy', App.blocks.length === 4, 'bloky=' + App.blocks.length);
check('ukázka má šipky', App.arrows.length === 3, 'šipky=' + App.arrows.length);
check('ukázka začíná Startem', App.blocks[0].type === 'start');
check('ukázka má výstupní blok', App.blocks.some(b => b.type === 'io' && b.ioType === 'output'));
check('zdroj: 12 ukázek včetně předmětů s poznámkami', 
    (html.match(/id: '(hello|circle|sum|fizzbuzz|calculator|pythagoras|interest|wage|fuel|waste|bmi|scale)'/g) || []).length === 12 &&
    html.includes("type: 'note'", undefined) && /op == \"soucet\"/.test(html));
check('zdroj: ukázky z předmětů používají Math.sqrt / Math.round', /Math\.sqrt\(a\)/.test(html) && /Math\.round\(hruba/.test(html));

console.log('\n[paleta Ctrl+K — spustitelná, s hledáním, souhrnné zkratky]');
const haveShortcut = k => App.paletteCommands().some(c => c.shortcut.indexOf(k) !== -1);
check('paleta má 20 příkazů (všechny zkratky kromě cheatu)', App.paletteCommands().length === 20, 'got ' + App.paletteCommands().length);
App.openPalette();
check('paleta otevřena', App.dom.paletteModal.classList.contains('show'));
check('paleta naplněna (20 řádků)', App.dom.paletteList.children.length === 20, 'got ' + App.dom.paletteList.children.length);
check('Ctrl+K je v keydown handleru', /e\.ctrlKey && e\.key\.toLowerCase\(\)\s*===\s*'k'/.test(html));
check('zkratky: undo + redo', haveShortcut('Ctrl+Z') && haveShortcut('Ctrl+Shift+Z'));
check('zkratky: select all + delete', haveShortcut('Ctrl+A') && haveShortcut('Delete'));
check('zkratky: fit + centrum + zoom + esc', haveShortcut('F') && haveShortcut('Mezerník') && haveShortcut('+ / −') && haveShortcut('Esc'));
check('zkratky: paleta + ukázky + nápověda', haveShortcut('Ctrl+K') && haveShortcut('Alt+S') && haveShortcut('Ctrl+Alt+H'));
check('zkratky: o programu + o autorovi', haveShortcut('Ctrl+Alt+I') && haveShortcut('Ctrl+Alt+A'));
check('zkratky: json/import/wipe/mise/plochy', haveShortcut('Ctrl+Alt+J') && haveShortcut('Ctrl+Alt+O') && haveShortcut('Ctrl+Alt+W') && haveShortcut('Ctrl+Alt+M') && haveShortcut('Ctrl+Alt+1–5'));
check('plochy jsou souhrnně v jedné položce', App.paletteCommands().some(c => c.label === 'Plochy') && !App.paletteCommands().some(c => c.label.indexOf('SPACE ') === 0));
check('paleta a ukázky nejsou v hamburger menu', !html.includes('onclick="App.openPalette()"') && !html.includes('onclick="App.openSamples()"'));
check('Ctrl+Alt kombinace jsou v keydown handleru', /e\.ctrlKey && e\.altKey/.test(html) && /k === '1'/.test(html) && /switchWorkspace\('space5'\)/.test(html));
App.onPaletteInput('plochy');
check('filtr zúží seznam na položku Plochy', App.dom.paletteList.children.length === 1, 'got ' + App.dom.paletteList.children.length);
App.paletteRun();
check('Enter na Plochy rozbalí 5 ploch (+ Zpět)', App.paletteScope === 'spaces' && App.dom.paletteList.children.length === 6 && App.dom.paletteModal.classList.contains('show'), 'got ' + App.dom.paletteList.children.length);
App.paletteRunAt(3);
check('výběr SPACE 3 → plocha space3', App.activeWorkspace === 'space3' && !App.dom.paletteModal.classList.contains('show'), App.activeWorkspace);
App.openPalette();
App.onPaletteInput('export');
check('filtr export → 2 položky (SVG + JSON)', App.dom.paletteList.children.length === 2, 'got ' + App.dom.paletteList.children.length);
App.closePalette();
check('paleta zavřená Esc/closePalette', !App.dom.paletteModal.classList.contains('show'));

console.log('\n[přepínač ploch = filmový pás (jedna role, ne každá plocha zvlášť)]');
const trackEl = el('ws-track');
['campaign', 'space1', 'space2', 'space3', 'space4', 'space5'].forEach(ws => {
    const c = el('ws-cell-' + ws);
    c.className = 'ws-cell';
    c.setAttribute('data-ws', ws);
    trackEl.appendChild(c);
});
const wsPrevBtn = el('ws-prev');
const wsNextBtn = el('ws-next');
check('zdroj: plochy jsou v jedné roli #ws-track (6 buněk)', (html.match(/class="ws-cell"/g) || []).length === 6 && html.includes('id="ws-track"'));
check('zdroj: už žádná tlačítka ws-tab jednotlivě', !html.includes('class="ws-tab"') && html.includes('onclick="App.wsStep(1)"'));
check('zdroj: za MISE/SPACE už žádný puntík', !html.includes('ws-cell-dot') && !html.includes('SPACE 1<span'));
App.activeWorkspace = 'space3';
App.updateWsSwitch();
check('film posunul střed na SPACE 3 (hlavně aktuální)', trackEl.style.transform === 'translateX(-300px)', trackEl.style.transform);
check('film označil aktivní buňku (SPACE 3)', trackEl.children[3]._cls.has('active'));
check('neaktivní buňky jsou potlačené (opacity)', html.includes('.ws-cell:not(.active) { opacity: 0.35; }'));
check('znaky uvolněné (letter-spacing 2px)', html.includes('letter-spacing: 2px'));
check('šipky uprostřed povolené', wsPrevBtn.disabled === false && wsNextBtn.disabled === false);
App.wsStep(-1);
check('wsStep(-1) přehrál roli → space2', App.activeWorkspace === 'space2', App.activeWorkspace);
App.activeWorkspace = 'campaign';
App.updateWsSwitch();
check('šipka ‹ na kraji role zamčená (MISE)', wsPrevBtn.disabled === true && wsNextBtn.disabled === false);

console.log('\n[modaly: Esc zavírá, klik mimo jen informační (princip hry = potvrzení zůstává)]');
const mkCls = (init) => { const s = new Set(init || []); return { add: c => s.add(c), remove: c => s.delete(c), toggle: (c, on) => { if (on === undefined) { s.has(c) ? s.delete(c) : s.add(c); } else if (on) s.add(c); else s.delete(c); }, contains: c => s.has(c) }; };
const aboutOv = { id: 'about-modal', classList: mkCls(['modal-overlay', 'show']), hasAttribute: a => a === 'data-dismiss' };
App.onModalBackdropClick({ target: aboutOv });
check('klik mimo zavře O programu', !aboutOv.classList.contains('show'));
const resetOv = { id: 'reset-confirm-modal', classList: mkCls(['modal-overlay', 'show']), hasAttribute: () => false };
App.onModalBackdropClick({ target: resetOv });
check('klik mimo NEzavře potvrzení RESETu (princip hry)', resetOv.classList.contains('show'));
const modalBox = { classList: mkCls(['modal-box']), hasAttribute: () => true };
App.onModalBackdropClick({ target: modalBox });
check('klik dovnitř modal-boxu nic nezavře', modalBox.classList.contains('modal-box'));
const dismissed = ['svg-export-modal', 'json-export-modal', 'check-result-modal', 'level-result-modal', 'level-modal', 'help-modal', 'palette-modal', 'samples-modal', 'about-modal', 'author-modal'];
const confined = ['edit-modal', 'sim-input-modal', 'sim-decision-modal', 'sim-output-modal', 'clear-confirm-modal', 'name-modal', 'reset-confirm-modal', 'confirm-modal', 'import-review-modal'];
check('source: 10 informačních modalů má data-dismiss', dismissed.every(id => new RegExp('id="' + id + '" class="modal-overlay"[^>]*data-dismiss').test(html)));
check('source: potvrzovací/editační modaly data-dismiss NEMAJÍ', confined.every(id => !new RegExp('id="' + id + '" class="modal-overlay"[^>]*data-dismiss').test(html)));

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

console.log('\n[F4 restart mise přes UI — potvrzený modal, obnova jen aktuální mise]');
Game.playerName = 'Operátor';
App.switchWorkspace('m01');
App.buildWorkspaceDefault('m01');
App.saveWorkspace('m01');
const m02WsBeforeRestart = localStorage.getItem('blockflow_v3_ws_m02');
Game.levels = { m01: { status: 'done', stars: 3, bestXp: 145, tag: 'overeno', attempts: 1 } };
Game.setTag('m01', Game.TAGS.ZPROVOZNENO);
const wsM01Before = localStorage.getItem('blockflow_v3_ws_m01');
check('plocha m01 připravena (scaffold)', App.blocks.length === 7, 'bloky=' + App.blocks.length);
App.promptMissionRestart();
check('restart otevřel potvrzení', App.dom.confirmModal.classList.contains('show'));
check('potvrzení má text §7.10', String(App.dom.confirmText.innerHTML).indexOf('Vrátit tuto misi na začátek') !== -1);
App.closeConfirm();
check('zrušený restart nic nezměnil', localStorage.getItem('blockflow_v3_ws_m01') === wsM01Before);
check('zrušený restart nesmazal plochu m01', App.blocks.length > 0, 'bloky=' + App.blocks.length);
App.promptMissionRestart();
App.confirmYes();
check('potvrzený restart obnovil scaffold m01', App.blocks.length === 7 && App.arrows.length === 0, 'bloky=' + App.blocks.length + ' šipky=' + App.arrows.length);
check('jiná mise se restartu nedotkla', localStorage.getItem('blockflow_v3_ws_m02') === m02WsBeforeRestart);
check('historie mise zůstává', Game.isLevelDone('m01') && Game.levels.m01.tag === 'overeno');
check('jmený modal se při restartu neotevřel', !App.dom.nameModal.classList.contains('show'));

console.log('\n[F4 nabídka stažení JSON — jen při přechodu do dokončeného stavu]');
Game.reset();
Game.playerName = 'Operátor';
App.switchWorkspace('m03');
App.activeWorkspace = 'm03';
App.activeLevel = 'm03';
App.levelHintUsed = false;
App.levelFailed = false;
Game.levels = {};
Game.certificates = [];
Game.xp = 0;
App.blocks = [];
App.onLevelSuccess();
check('výsledkový modal otevřen', App.dom.levelResultModal.classList.contains('show'));
check('první splnění ukazuje nabídku stažení', App.dom.resultSaveBtn.style.display === 'block' && App.dom.resultOfferText.style.display === 'block');
check('další úspěšný test nabídku neotevře', (App.onLevelSuccess(), App.dom.resultSaveBtn.style.display === 'none' && App.dom.resultOfferText.style.display === 'none'));
App.closeLevelResult();

console.log('\n[výsledkový modal — SVG řešení (s testováním + jméno), POKRAČOVAT → další level]');
Game.reset();
Game.playerName = 'Pavla';
App.setProfile('H');
Game.levels = {};
Game.xp = 0;
App.activeWorkspace = 'm02';
App.activeLevel = 'm02';
App.levelHintUsed = false;
App.levelFailed = false;
App.blocks = [App.addBlockSilent('start', 'Start', 0, 0)];
App.lastCheck = { passed: 3, total: 3 };
App.onLevelSuccess();
check('SVG tlačítko viditelné po úspěchu', App.dom.resultSvgBtn.style.display === 'block');
check('SVG tlačítko v HTML', html.includes('id="result-svg-btn"'));
check('soubor řešení = m02-reseni.svg', App.solvedSvgFilename() === 'm02-reseni.svg', App.solvedSvgFilename());
const solved = App.buildSolvedSvg();
check('SVG řešení obsahuje OVĚŘENO', solved !== null && String(solved).includes('OVĚŘENO'));
check('SVG řešení obsahuje testy i jméno žáka', solved !== null && String(solved).includes('testy 3/3') && String(solved).includes('Pavla'));
check('SVG řešení obsahuje misi i datum', solved !== null && String(solved).includes('mise 2. ') && String(solved).match(/\d{1,2}\.\s?\d{1,2}\.\s?\d{4}/));
App.continueAfterLevel();
check('POKRAČOVAT zavřel výsledkový modal', !App.dom.levelResultModal.classList.contains('show'));
check('POKRAČOVAT otevřel zadání další mise m03', App.dom.levelModal.classList.contains('show') && App.activeWorkspace === 'm03', App.activeWorkspace);
App.closeLevelModal();
App.switchWorkspace('m08');
App.activeLevel = 'm08';
Game.completeLevel('m08', { noHint: true, firstTry: true, efficient: false });
App.dom.levelResultModal.classList.add('show');
App.continueAfterLevel();
check('poslední mise profilu: jen zavře, žádný level modal', !App.dom.levelModal.classList.contains('show') && !App.dom.levelResultModal.classList.contains('show'));

console.log('\n[F4 export/import JSON — názvy souborů a přehled importu]');
App.setProfile('H');
check('doporučený název začíná hefaistos-H-postup-', App.suggestedSnapshotName().startsWith('hefaistos-H-postup-'));
check('doporučený název končí .json', App.suggestedSnapshotName().endsWith('.json'));
App.openImportReview({ workspaces: { m01: {}, space2: {} }, missions: { m01: { status: 'done' } } });
check('přehled importu otevřen', document.getElementById('import-review-modal').classList.contains('show'));
check('přehled má počet ploch', String(document.getElementById('import-review-text').innerHTML).indexOf('2 ploch') !== -1);
App.cancelImportReview();
check('přehled importu zavřen', !document.getElementById('import-review-modal').classList.contains('show'));
check('pendingImportSnapshot zrušen', App.pendingImportSnapshot === null);

console.log('\n[UX vstup do MISE vyžaduje jméno — top button campaign]');
Game.setPlayerName('');
App.nameSkipped = false;
App.pendingCampaign = false;
App.pendingLevel = null;
App.lastCampaignSlot = 'm01';
App.switchWorkspace('space1');
App.selectWorkspace('campaign');
check('bez jména se neotevřela MISE', App.modeOf(App.activeWorkspace) === 'space', App.activeWorkspace);
check('bez jména se otevřel jmenný modal', App.dom.nameModal.classList.contains('show'));
check('pendingCampaign nastaven', App.pendingCampaign === true);
App.dom.nameInput.value = 'Testík';
App.submitName();
check('po jméně modal zavřen', !App.dom.nameModal.classList.contains('show'));
check('po jméně vstup do campaign', App.modeOf(App.activeWorkspace) === 'campaign' && App.activeWorkspace === 'm01');
check('pendingCampaign vyprázdněn', App.pendingCampaign === false);
Game.setPlayerName('');
App.nameSkipped = true;
App.pendingCampaign = false;
App.lastCampaignSlot = 'm01';
App.selectWorkspace('campaign');
check('přeskočené jméno = rovnou do misí', App.modeOf(App.activeWorkspace) === 'campaign' && !App.dom.nameModal.classList.contains('show'));

console.log('\n[UX ikonová tlačítka toolbaru — SVG místo textu/emoji]');
const svgBtn = (id) => html.includes('<button class="top-btn top-icon" id="' + id + '"') && new RegExp('id="' + id + '"[^>]*><svg ').test(html);
check('undo je SVG ikona', svgBtn('btn-undo'));
check('redo je SVG ikona', svgBtn('btn-redo'));
check('import je SVG ikona', svgBtn('btn-import'));
check('export je SVG ikona', svgBtn('btn-export'));
check('wipe je SVG ikona', svgBtn('btn-wipe'));
const emojiGone = ['\u{1F4D6}', '\u{2139}', '\u{1F9ED}', '\u{1F9F9}', '\u{2B73}', '\u{2B71}', '\u{1F3AE}', '\u{1F3ED}', '\u{21A4}', '\u{21A6}'];
const stillPresent = emojiGone.filter(e => html.includes(e));
check('v modalech/toolbaru nejsou staré emoji ikony', stillPresent.length === 0, stillPresent.map(e => '[' + e + ']').join(' '));
check('texty modálů bez Streamer/Operátor', !html.includes('Nápověda — CodeFlowChart') && !html.includes('Streamer / Operátor'));
check('O programu zmiňuje 14 misí', html.includes('14 misí') && html.includes('8 pro profil H + 6 pro E/J'));
check('help nadpis je jen Nápověda', html.includes('<h3><svg') && !html.includes('Nápověda — CodeFlowChart'));

console.log('\n[UX validace vstupu — číslo vs text]');
App.pendingInputType = 'number';
App.dom.simInputError.style.display = 'none';
App.dom.simInputField.value = 'abc';
let inputRejected = false;
const savedFn = App.resolveInputFn;
App.resolveInputFn = () => { inputRejected = true; };
App.resolveInputPrompt();
check('text do číselného vstupu se neodešle', inputRejected === false);
check('zobrazí se chyba typu', App.dom.simInputError.style.display === 'block' && String(App.dom.simInputError.textContent).indexOf('očekává se číslo') !== -1);
App.dom.simInputField.value = '12,5';
App.resolveInputPrompt();
check('čárka v číselném vstupu se odmítne', inputRejected === false);
App.dom.simInputField.value = '12.5';
App.resolveInputPrompt();
check('tečka v číselném vstupu projde', inputRejected === true);
App.resolveInputFn = savedFn;
App.pendingInputType = null;

console.log('\n[UX start = SPACE 1, rozehraný level se obnoví]');
store.set('blockflow_v3_active_ws', 'space4');
check('uložená space4 se při startu ignoruje → SPACE 1', App.startupWorkspace() === 'space1' && store.get('blockflow_v3_active_ws') === 'space1', App.startupWorkspace());
store.set('blockflow_v3_active_ws', 'm02');
check('rozehraná m02 se obnoví', App.startupWorkspace() === 'm02');
store.set('blockflow_v3_active_ws', 'space1');

console.log('\n[UX expirace dat — PC 90 min, mobil nikdy]');
store.set('blockflow_v3_player', 'Kdo');
store.set('blockflow_v3_ws_m01', '{}');
store.set('blockflow_v3_last_active', String(Date.now() - 100 * 60 * 1000));
check('PC: starší než 90 min → vymazáno', App.maybeExpirePcData(Date.now()) === true && store.get('blockflow_v3_player') === undefined && store.get('blockflow_v3_last_active') === undefined);
store.set('blockflow_v3_player', 'Kdo');
store.set('blockflow_v3_last_active', String(Date.now() - 100 * 60 * 1000));
sandbox.navigator.maxTouchPoints = 5;
check('mobil: starší než 90 min → NEMAŽE se', App.maybeExpirePcData(Date.now()) === false && store.get('blockflow_v3_player') === 'Kdo');
store.set('blockflow_v3_player', 'Nova');
store.set('blockflow_v3_last_active', String(Date.now() - 1000));
sandbox.navigator.maxTouchPoints = 0;
check('PC: čerstvý last_active → nemaže', App.maybeExpirePcData(Date.now()) === false && store.get('blockflow_v3_player') === 'Nova');
App.noteLastActive();

console.log('\n[terminál = dokovací lišta (zasouvací + vysouvací)]');
check('zdroj: sbalený terminál nechává viditelnou lištu 46 px', /#console-panel\s*\{[^}]*transform:\s*translateY\(calc\(100% - 46px\)\)/.test(html));
check('zdroj: lišta je klikatelný přepínač', html.includes('onclick="App.toggleConsolePanel(event)"'));
check('zdroj: ovládací prvky v liště nepřepínají (stopPropagation)', html.includes('event.stopPropagation()'));
check('zdroj: klik na plochu zavírá terminál (pointerdown → dockConsole)', /canvasWrap\.addEventListener\('pointerdown'[\s\S]{0,140}dockConsole\(\)/.test(html));
check('zdroj: spuštění simulace otevře terminál', /consolePanel\.classList\.add\('open'\)/.test(html));
const consPanel = App.dom.consolePanel;
App.dockConsole();
check('výchozí terminál sbalený (lišta)', !consPanel.classList.contains('open'));
App.toggleConsolePanel(null);
check('klik na lištu vysune terminál', consPanel.classList.contains('open'));
App.dockConsole();
check('klik na plochu zasune terminál dolů na lištu', !consPanel.classList.contains('open'));
App.toggleConsolePanel(null);
App.toggleConsolePanel({ target: { closest: () => ({ tagName: 'SELECT' }) } });
check('klik na select lištu nepřepne', consPanel.classList.contains('open'));
App.dockConsole();

console.log('\n[UX O programu / O autorovi / nápověda — zdroj HTML]');
check('O programu bez verzování', !html.includes('Verze jádra') && !html.includes('Codename: CyberCanvas'));
check('O programu bez gymnázií (RVP G není cíl)', !html.includes('RVP G') && !html.includes('gymnáz'));
check('O programu pokrývá SOŠ obory H a E/J', html.includes('SOŠ') && html.includes('obory H a E/J'));
check('help nadpis „Co si osvojíš" bez RVP G', !html.includes('Co si osvojíš (RVP G + SOŠ)') && html.includes('Co si osvojíš (SOŠ'));
check('O programu uvádí SPA + MIT', html.includes('SINGLE PAGE APPLICATION') && html.includes('MIT © 2026 Luděk Sušický'));
check('O programu má na PC šířku 655 px (o 20 % širší)', /#about-modal \.modal-box\s*\{[^}]*width:\s*min\(655px,\s*97vw\)/.test(html));
check('autor má fungující mailto (spustí klienta)', html.includes('href="mailto:ludek.susicky@gmail.com"') && html.includes('ludek.susicky@gmail.com'));
check('autor má X', html.includes('https://x.com/ludeksusicky'));
check('autor má LinkedIn', html.includes('https://www.linkedin.com/in/ludek-susicky/'));
check('autor je SŠ a VŠ učitel Informatiky', html.includes('SŠ a VŠ učitel Informatiky'));
check('nápověda má O aplikaci + 90 minut', html.includes('O aplikaci') && html.includes('90 minutách nečinnosti') && html.includes('MIT © 2026'));
check('nápověda uvádí Ctrl+K (zobrazení palety zkratek) i Alt+S', html.includes('Ctrl + K') && html.includes('paletu zkratek') && html.includes('Alt + S'));
check('patička plátna je MIT', /id="copyright-footer"[\s\S]{0,80}MIT © 2026/.test(html));
check('SVG export = MIT', html.includes('MIT © 2026 Luděk Sušický | CodeFlowChart EDU'));
check('mobil: O programu zůstává 33vh', /@media\s*\(hover:\s*none\),\s*\(pointer:\s*coarse\)\s*\{\s*#about-modal\s*\.modal-box\s*\{\s*max-height:\s*33vh/.test(html));

console.log(`\nVýsledek: ${pass} OK, ${fail} FAIL`);
process.exit(fail === 0 ? 0 : 1);