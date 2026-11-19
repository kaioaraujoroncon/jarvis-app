// Copia o app web para www/ (pasta que o Capacitor empacota no iOS).
const fs = require('fs'), path = require('path');
const raiz = path.resolve(__dirname, '..', '..'), saida = path.join(raiz, 'www');
fs.rmSync(saida, { recursive: true, force: true }); fs.mkdirSync(saida, { recursive: true });
['index.html', 'logo.svg', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'badge-72.png', 'manifest.webmanifest'].forEach(f => fs.copyFileSync(path.join(raiz, f), path.join(saida, f)));
fs.cpSync(path.join(raiz, 'voz'), path.join(saida, 'voz'), { recursive: true });
// no app nativo não há service worker (os arquivos já vão dentro do app)
console.log('www/ pronto');
