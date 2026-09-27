// F0 — statické UI kontroly (bez prohlížeče): viewport, responzivní breakpoint,
// tablet porty bez hoveru. Plný browser matrix (1440/1024/390/320) je plánován (F7).
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

let pass = 0;
let fail = 0;
function check(name, cond, extra = '') {
    if (cond) { pass++; console.log(`  OK   ${name}`); }
    else { fail++; console.error(`  FAIL ${name}${extra ? ' -> ' + extra : ''}`); }
}

console.log('\n[viewport a responzivita]');
check('viewport meta s width=device-width', /<meta[^>]*name=["']viewport["'][^>]*width=device-width/i.test(html));
check('responzivní breakpoint @media (max-width: 768px)', /@media\s*\(max-width:\s*768px\)/.test(html));

console.log('\n[tablet — porty bez hoveru]');
check('port má vlastní pravidlo', /\.port\s*\{/.test(html));
check('porty se zobrazují na hover/selected', /\.block:hover \.port,\s*\.block\.selected \.port/.test(html));
check('dotykové zařízení: @media (hover: none)', /@media\s*\(hover:\s*none\)/.test(html));
check('dotykové zařízení: porty trvale vidět', /@media\s*\(hover:\s*none\)\s*\{[^}]*\.block\s+\.port\s*\{[^}]*opacity:\s*1/.test(html));

console.log('\n[informativně — plánováno ve F7/F9]');
console.log(`  INFO prefers-reduced-motion: ${/@media\s*\(prefers-reduced-motion/.test(html) ? 'přítomno' : 'ZATÍM CHYBÍ (plán F9)'}`);
console.log(`  INFO počet @media bloků: ${(html.match(/@media/g) || []).length}`);

console.log(`\nVýsledek: ${pass} OK, ${fail} FAIL`);
process.exitCode = fail ? 1 : 0;
