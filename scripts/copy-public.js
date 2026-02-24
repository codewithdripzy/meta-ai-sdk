// Copy public directory to dist on build
const fs = require('fs');
const path = require('path');



// Always resolve from project root (cli), not from script location or cwd
const projectRoot = path.resolve(__dirname, '..');
const src = path.join(projectRoot, 'public');
const dest = path.join(projectRoot, 'dist', 'public');

// Ensure the source public folder exists, if not, create it
if (!fs.existsSync(src)) {
    fs.mkdirSync(src, { recursive: true });
    console.log('Created missing public/ directory.');
}

function copyRecursiveSync(src, dest) {
    if (fs.existsSync(src)) {
        if (fs.lstatSync(src).isDirectory()) {
            if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
            fs.readdirSync(src).forEach(child => {
                copyRecursiveSync(path.join(src, child), path.join(dest, child));
            });
        } else {
            fs.copyFileSync(src, dest);
        }
    }
}

copyRecursiveSync(src, dest);
console.log('Copied public/ to dist/public/');
