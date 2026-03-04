const fs = require('fs');
const path = require('path');

const dir = __dirname;
const srcFile = path.join(dir, 'ui-src.html');
const outFile = path.join(dir, 'ui.html');
const assetsDir = path.join(dir, 'assets');

function svgsToArray(fileNames) {
  const uris = fileNames.map(name => {
    const buf = fs.readFileSync(path.join(assetsDir, name));
    return `'data:image/svg+xml;base64,${buf.toString('base64')}'`;
  });
  return `[\n    ${uris.join(',\n    ')},\n  ]`;
}

let html = fs.readFileSync(srcFile, 'utf-8');
html = html.replace('__CAT_SVG_DATA__', svgsToArray(['CAT1.svg', 'CAT2.svg', 'CAT3.svg', 'CAT4.svg']));
html = html.replace('__GREYCAT_SVG_DATA__', svgsToArray(['GREYCAT1.svg', 'GREYCAT2.svg', 'GREYCAT3.svg', 'GREYCAT4.svg']));

fs.writeFileSync(outFile, html, 'utf-8');
console.log(`Built ui.html (${(html.length / 1024).toFixed(1)} KB) from ui-src.html + assets/`);
