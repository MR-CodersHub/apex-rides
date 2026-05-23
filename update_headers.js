const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const templateFile = path.join(pagesDir, 'login-register.html');

const templateContent = fs.readFileSync(templateFile, 'utf8');

const headerRegex = /<!-- GLOBAL GLOBAL NAVIGATION HEADER -->[\s\S]*?<\/header>/i;
const footerRegex = /<!-- GLOBAL TERMINAL SYSTEM FOOTER -->[\s\S]*?<\/footer>/i;

const headerMatch = templateContent.match(headerRegex);
const footerMatch = templateContent.match(footerRegex);

if (!headerMatch || !footerMatch) {
  console.error("Could not find header or footer in template.");
  process.exit(1);
}

const newHeader = headerMatch[0];
const newFooter = footerMatch[0];

const files = fs.readdirSync(pagesDir);

for (const file of files) {
  if (file.endsWith('.html') && file !== 'login-register.html') {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace header (along with previous comment if it exists)
    content = content.replace(/(<!--[\s\S]*?-->\s*)?<header[\s\S]*?<\/header>/i, newHeader);
    
    // Replace footer (along with previous comment if it exists)
    content = content.replace(/(<!--[\s\S]*?-->\s*)?<footer[\s\S]*?<\/footer>/i, newFooter);
    
    // Insert main.js if not present
    if (!content.includes('main.js')) {
      content = content.replace(/assets\/js\/theme\.js"><\/script>/i, 'assets/js/theme.js"></script>\n  <script src="../assets/js/main.js" defer></script>');
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
console.log("Done.");
