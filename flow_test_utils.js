// Sdílené načtení App z inline <script> v code-flowchart.html pro Node testy.
// Vytváří minimální mock DOM/localStorage a vrací App + sandbox (kvůli localStorage).
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const FILE = path.join(__dirname, 'code-flowchart.html');

function createLocalStorageMock() {
    const store = new Map();
    return {
        _store: store,
        getItem: (k) => (store.has(k) ? store.get(k) : null),
        setItem: (k, v) => { store.set(k, String(v)); },
        removeItem: (k) => { store.delete(k); },
        clear: () => { store.clear(); },
    };
}

function createElementMock() {
    return {
        style: {},
        classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
        children: [],
        appendChild(child) { this.children.push(child); },
        remove() {},
        set textContent(v) { this._text = v; },
        get textContent() { return this._text; },
        set innerHTML(v) { this._html = v; },
        get innerHTML() { return this._html; },
    };
}

function loadApp() {
    const html = fs.readFileSync(FILE, 'utf8');
    const match = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
    if (!match) throw new Error('inline <script> nenalezen v code-flowchart.html');

    const sandbox = {
        window: {},
        document: {
            getElementById: () => null,
            querySelectorAll: () => [],
            querySelector: () => null,
            createElement: createElementMock,
            addEventListener: () => {},
            body: createElementMock(),
        },
        localStorage: createLocalStorageMock(),
        setTimeout,
        clearTimeout,
        setInterval,
        clearInterval,
        console,
        navigator: {},
        requestAnimationFrame: (fn) => setTimeout(fn, 0),
    };
    vm.createContext(sandbox);

    const code = match[1] + '\n;globalThis.__App = App; globalThis.__Game = (typeof Game !== "undefined") ? Game : null; globalThis.__MISSIONS = (typeof MISSIONS !== "undefined") ? MISSIONS : null; globalThis.__SAMPLES = (typeof SAMPLES !== "undefined") ? SAMPLES : null;';
    new vm.Script(code, { filename: 'code-flowchart.html:inline-script' }).runInContext(sandbox);

    if (!sandbox.__App) throw new Error('App se nepodařilo načíst');
    return { App: sandbox.__App, Game: sandbox.__Game, MISSIONS: sandbox.__MISSIONS, SAMPLES: sandbox.__SAMPLES, sandbox };
}

// Izolovaná instance s potlačenými vedlejšími efekty (logy, RAM render).
function makeApp(App) {
    const app = Object.create(App);
    app.visualRAM = {};
    app._reCache = {};
    app.arrows = [];
    app.blocks = [];
    app.logs = [];
    app.logConsole = (msg, type = 'info') => { app.logs.push({ msg, type }); };
    app.toast = (msg) => { app.logs.push({ msg, type: 'toast' }); };
    app.updateRAM = () => {};
    return app;
}

module.exports = { loadApp, makeApp, FILE };
