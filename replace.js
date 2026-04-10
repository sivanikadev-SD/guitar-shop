const fs = require('fs'); 
const files = fs.readdirSync('.').filter(f => f.endsWith('.html')); 
files.forEach(file => { 
    let content = fs.readFileSync(file, 'utf8'); 
    content = content.replace(/>Artisan Guitars<\/a>/g, '><i class="ph-fill ph-guitar"></i> Artisan Guitars</a>'); 
    fs.writeFileSync(file, content); 
}); 
console.log('Logos Added!');
