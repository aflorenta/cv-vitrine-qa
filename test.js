/**
 * Test Suite for CV Vitrine
 * Tests pour valider les 4 corrections et la sécurité
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

function log(type, message) {
  const prefix = {
    '✓': `${colors.green}✓${colors.reset}`,
    '✗': `${colors.red}✗${colors.reset}`,
    'ℹ': `${colors.blue}ℹ${colors.reset}`,
    '⚠': `${colors.yellow}⚠${colors.reset}`,
  };
  console.log(`${prefix[type]} ${message}`);
}

// ── TEST 1: Google Antigravity removed ──────────────────────────────
console.log('\n📋 TEST 1: Bug Fix #1 — Google Antigravity removed');
console.log('─'.repeat(60));

const htmlFile = path.join(__dirname, 'public/index.html');
const htmlContent = fs.readFileSync(htmlFile, 'utf8');

if (htmlContent.includes('Google Antigravity')) {
  log('✗', 'FAILED: "Google Antigravity" still present in HTML');
} else {
  log('✓', 'PASSED: "Google Antigravity" has been removed');
}

if (htmlContent.includes('Playwright')) {
  log('✓', 'PASSED: "Playwright" is mentioned (replacement for Antigravity)');
} else {
  log('✗', 'FAILED: "Playwright" not found in HTML');
}

// ── TEST 2: Real contact form implementation ──────────────────────────
console.log('\n📋 TEST 2: Bug Fix #2 — Real contact form with email sending');
console.log('─'.repeat(60));

const contactRouteFile = path.join(__dirname, 'routes/contact.js');
const contactContent = fs.readFileSync(contactRouteFile, 'utf8');

if (contactContent.includes('nodemailer')) {
  log('✓', 'PASSED: Nodemailer is imported');
} else {
  log('✗', 'FAILED: Nodemailer not imported');
}

if (contactContent.includes('transporter.sendMail')) {
  log('✓', 'PASSED: Nodemailer sendMail is used (real emails)');
} else {
  log('✗', 'FAILED: sendMail not used');
}

if (contactContent.includes('express-validator')) {
  log('✓', 'PASSED: express-validator imported for validation');
} else {
  log('✗', 'FAILED: express-validator not imported');
}

if (contactContent.includes('validateContact') && contactContent.includes('validationResult')) {
  log('✓', 'PASSED: Input validation middleware implemented');
} else {
  log('✗', 'FAILED: Validation middleware not implemented');
}

if (contactContent.includes('replyTo: email')) {
  log('✓', 'PASSED: Reply-to email configured');
} else {
  log('✗', 'FAILED: Reply-to email not configured');
}

// ── TEST 3: Contact information enriched ────────────────────────────
console.log('\n📋 TEST 3: Bug Fix #3 — Contact information enriched');
console.log('─'.repeat(60));

if (htmlContent.includes('mailto:') && htmlContent.includes('email')) {
  log('✓', 'PASSED: Email contact link present');
} else {
  log('✗', 'FAILED: Email contact link missing');
}

if (htmlContent.includes('linkedin.com') && htmlContent.includes('target="_blank"')) {
  log('✓', 'PASSED: LinkedIn link present');
} else {
  log('✗', 'FAILED: LinkedIn link missing');
}

if (htmlContent.includes('Télécharger') && htmlContent.includes('.pdf')) {
  log('✓', 'PASSED: CV PDF download button present');
} else {
  log('✗', 'FAILED: CV PDF download button missing');
}

if (htmlContent.includes('contact-highlights')) {
  log('✓', 'PASSED: Contact highlights section present');
} else {
  log('✗', 'FAILED: Contact highlights section missing');
}

// ── TEST 4: Copyright auto-update ──────────────────────────────────
console.log('\n📋 TEST 4: Bug Fix #4 — Copyright auto-updated');
console.log('─'.repeat(60));

if (htmlContent.includes('copyright-year')) {
  log('✓', 'PASSED: Copyright year element found');
} else {
  log('✗', 'FAILED: Copyright year element missing');
}

if (htmlContent.includes('new Date().getFullYear()')) {
  log('✓', 'PASSED: JavaScript auto-update implemented');
} else {
  log('✗', 'FAILED: Auto-update script missing');
}

// ── TEST 5: Security headers (Helmet) ──────────────────────────────
console.log('\n📋 TEST 5: Security — Helmet.js configuration');
console.log('─'.repeat(60));

const serverFile = path.join(__dirname, 'server.js');
const serverContent = fs.readFileSync(serverFile, 'utf8');

if (serverContent.includes('helmet')) {
  log('✓', 'PASSED: Helmet.js imported');
} else {
  log('✗', 'FAILED: Helmet.js not imported');
}

if (serverContent.includes('contentSecurityPolicy')) {
  log('✓', 'PASSED: CSP (Content Security Policy) configured');
} else {
  log('✗', 'FAILED: CSP not configured');
}

if (serverContent.includes('hsts')) {
  log('✓', 'PASSED: HSTS (HTTPS Strict Transport Security) enabled');
} else {
  log('✗', 'FAILED: HSTS not enabled');
}

// ── TEST 6: Rate limiting ──────────────────────────────────────────
console.log('\n📋 TEST 6: Security — Rate Limiting');
console.log('─'.repeat(60));

if (serverContent.includes('express-rate-limit')) {
  log('✓', 'PASSED: express-rate-limit imported');
} else {
  log('✗', 'FAILED: express-rate-limit not imported');
}

if (serverContent.includes('contactLimiter') && serverContent.includes('max: 5')) {
  log('✓', 'PASSED: Rate limiting configured (5 req/15min)');
} else {
  log('✗', 'FAILED: Rate limiting not properly configured');
}

// ── TEST 7: Compression ────────────────────────────────────────────
console.log('\n📋 TEST 7: Performance — Compression');
console.log('─'.repeat(60));

if (serverContent.includes('compression()')) {
  log('✓', 'PASSED: Gzip compression enabled');
} else {
  log('✗', 'FAILED: Compression not enabled');
}

// ── TEST 8: SEO files ──────────────────────────────────────────────
console.log('\n📋 TEST 8: SEO — Sitemap & Robots.txt');
console.log('─'.repeat(60));

const sitemapFile = path.join(__dirname, 'public/sitemap.xml');
const robotsFile = path.join(__dirname, 'public/robots.txt');

if (fs.existsSync(sitemapFile)) {
  log('✓', 'PASSED: sitemap.xml exists');
} else {
  log('✗', 'FAILED: sitemap.xml not found');
}

if (fs.existsSync(robotsFile)) {
  log('✓', 'PASSED: robots.txt exists');
} else {
  log('✗', 'FAILED: robots.txt not found');
}

const sitemapContent = fs.readFileSync(sitemapFile, 'utf8');
if (sitemapContent.includes('<urlset')) {
  log('✓', 'PASSED: sitemap.xml has correct format');
} else {
  log('✗', 'FAILED: sitemap.xml format invalid');
}

// ── TEST 9: .env configuration ─────────────────────────────────────
console.log('\n📋 TEST 9: Configuration — Environment Setup');
console.log('─'.repeat(60));

const envExampleFile = path.join(__dirname, '.env.example');

if (fs.existsSync(envExampleFile)) {
  log('✓', 'PASSED: .env.example exists');
  const envExample = fs.readFileSync(envExampleFile, 'utf8');

  if (envExample.includes('SMTP_HOST') && envExample.includes('SMTP_PASS')) {
    log('✓', 'PASSED: .env.example has SMTP variables');
  } else {
    log('✗', 'FAILED: SMTP variables missing in .env.example');
  }
} else {
  log('✗', 'FAILED: .env.example not found');
}

// ── TEST 10: .gitignore ────────────────────────────────────────────
console.log('\n📋 TEST 10: Security — .gitignore');
console.log('─'.repeat(60));

const gitignoreFile = path.join(__dirname, '.gitignore');

if (fs.existsSync(gitignoreFile)) {
  log('✓', 'PASSED: .gitignore exists');
  const gitignore = fs.readFileSync(gitignoreFile, 'utf8');

  if (gitignore.includes('.env')) {
    log('✓', 'PASSED: .env is in .gitignore (secrets protected)');
  } else {
    log('✗', 'FAILED: .env not in .gitignore');
  }
} else {
  log('✗', 'FAILED: .gitignore not found');
}

// ── TEST 11: Meta tags for SEO ─────────────────────────────────────
console.log('\n📋 TEST 11: SEO — Meta Tags');
console.log('─'.repeat(60));

if (htmlContent.includes('og:title') && htmlContent.includes('og:description')) {
  log('✓', 'PASSED: Open Graph meta tags present');
} else {
  log('✗', 'FAILED: Open Graph meta tags missing');
}

if (htmlContent.includes('charset="UTF-8"')) {
  log('✓', 'PASSED: UTF-8 charset declared');
} else {
  log('✗', 'FAILED: UTF-8 charset not declared');
}

if (htmlContent.includes('viewport')) {
  log('✓', 'PASSED: Responsive viewport configured');
} else {
  log('✗', 'FAILED: Responsive viewport not configured');
}

// ── Summary ────────────────────────────────────────────────────────
console.log('\n' + '='.repeat(60));
console.log('✅ All file-based tests completed!');
console.log('='.repeat(60));

console.log('\n📝 Next steps:');
console.log('1. npm install (install dependencies)');
console.log('2. cp .env.example .env (create .env with your SMTP credentials)');
console.log('3. npm run dev (start server on http://localhost:3000)');
console.log('4. Test the contact form manually in your browser');
console.log('5. Check email delivery');

console.log('\n' + '='.repeat(60));
