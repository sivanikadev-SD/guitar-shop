const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const headerStart = indexHtml.indexOf('<header class="navbar" id="navbar">');
const headerEnd = indexHtml.indexOf('</header>') + '</header>'.length;
const headerContent = indexHtml.substring(headerStart, headerEnd);

const footerStart = indexHtml.indexOf('<footer class="footer">');
const footerEnd = indexHtml.indexOf('</footer>') + '</footer>'.length;
const footerContent = indexHtml.substring(footerStart, footerEnd);

const targetFiles = [
    'about.html',
    'services.html',
    'woods.html',
    'portfolio.html',
    'pricing.html',
    'contact.html',
    'home2.html'
];

targetFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace Header
    const hStart = content.indexOf('<header');
    const hEnd = content.indexOf('</header>') + '</header>'.length;
    if (hStart !== -1 && hEnd > hStart) {
        content = content.substring(0, hStart) + headerContent + content.substring(hEnd);
    }
    
    // Replace Footer
    const fStart = content.indexOf('<footer');
    const fEnd = content.indexOf('</footer>') + '</footer>'.length;
    if (fStart !== -1 && fEnd > fStart) {
        content = content.substring(0, fStart) + footerContent + content.substring(fEnd);
    }
    
    fs.writeFileSync(file, content);
});

console.log("Headers and footers synced!");
