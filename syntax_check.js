const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const file = 'index.html';
const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;

let count = 0;
for (const match of content.matchAll(scriptRegex)) {
    if (!match[1].trim()) continue;
    try {
        new vm.Script(match[1], { filename: `${file}:inline-script-${count}` });
        console.log(`Script ${count} is OK`);
    } catch (error) {
        console.error(`Script ${count} ERROR: ${error.message}`);
        process.exitCode = 1;
    }
    count++;
}

if (!count) {
    console.error('ERROR: No inline scripts found');
    process.exitCode = 1;
}
