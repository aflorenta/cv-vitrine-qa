# CV Vitrine — Ingénieur Tests Senior

Application web complète pour présenter un CV de consultant QA avec formulaire de contact fonctionnel.

## 📋 Caractéristiques

- ✅ **Vitrine professionnelle** responsive et moderne
- ✅ **Formulaire de contact** fonctionnel avec envoi d'emails
- ✅ **Sécurité** : validation serveur, rate limiting, headers HTTP sécurisés
- ✅ **Performance** : compression gzip, assets statiques optimisés
- ✅ **SEO** : sitemap.xml, robots.txt, meta tags Open Graph
- ✅ **4 bugs de v0.1 corrigés** :
  - ✓ "Google Antigravity" remplacé par Playwright
  - ✓ Formulaire factice → vrai envoi email via Nodemailer
  - ✓ Section contact enrichie (email, LinkedIn, téléchargement CV)
  - ✓ Copyright © 2025 → © 2026 avec auto-update JS

## 🛠️ Stack Technique

| Couche | Technologie |
|--------|-------------|
| **Serveur** | Node.js + Express 4.x |
| **Emails** | Nodemailer |
| **Sécurité** | Helmet.js, express-rate-limit |
| **Validation** | express-validator |
| **Frontend** | HTML5/CSS3/Vanilla JS |
| **Hébergement** | Render.com / Railway / VPS OVH |

## 📁 Structure du Projet

```
cv-vitrine/
├── server.js                  # Serveur Express principal
├── routes/
│   └── contact.js             # Route POST /api/contact
├── public/
│   ├── index.html             # CV vitrine (HTML/CSS/JS)
│   ├── sitemap.xml            # Sitemap pour SEO
│   ├── robots.txt             # Directives robots
│   └── assets/
│       └── cv-fa-qa.pdf       # CV PDF téléchargeable
├── package.json               # Dépendances Node.js
├── .env.example               # Template variables d'environnement
├── .gitignore                 # Fichiers à ignorer dans Git
├── test.js                    # Suite de tests de validation
└── README.md                  # Ce fichier
```

## 🚀 Installation & Lancement

### Prérequis

- **Node.js** ≥ 18.0.0
- **npm** ou **yarn**

### Installation locale

```bash
# 1. Naviguer vers le répertoire du projet
cd cv-vitrine

# 2. Installer les dépendances
npm install

# 3. Copier .env.example → .env et configurer les variables
cp .env.example .env
# Éditer .env avec vos paramètres SMTP et email

# 4. Lancer le serveur en développement
npm run dev
# → Serveur disponible : http://localhost:3000

# 5. Lancer le serveur en production
npm start

# 6. Exécuter les tests de validation
npm test
```

## ⚙️ Configuration (Variables d'environnement)

Créez un fichier `.env` à la racine du projet :

```env
PORT=3000

# SMTP (exemple Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre.email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx   # App Password Google

# Email destinataire
CONTACT_RECIPIENT=votre.email@gmail.com

# Environment
NODE_ENV=development
```

### Configuration Gmail (Nodemailer)

1. Activer l'authentification à 2 facteurs : https://myaccount.google.com/security
2. Créer un "App Password" :
   - Aller à https://myaccount.google.com/apppasswords
   - Sélectionner "Autre (nom personnalisé)" → "CV Vitrine"
   - Copier le code généré (16 caractères) → `SMTP_PASS`

⚠️ **IMPORTANT** : Ne jamais utiliser votre vrai mot de passe Gmail. Utilisez uniquement l'App Password.

## 🧪 Tests

### Test du formulaire (manuel)

```bash
# Lancer le serveur en dev
npm run dev

# Ouvrir http://localhost:3000
# Remplir le formulaire et soumettre
# Vérifier la réception d'email
```

### Validation automatisée

```bash
# Exécuter la suite de tests
npm test
```

La suite de tests vérifie :
- ✓ Google Antigravity supprimé
- ✓ Real email sending via Nodemailer
- ✓ Contact information présent (email, LinkedIn, CV)
- ✓ Copyright auto-update
- ✓ Security headers (Helmet)
- ✓ Rate limiting configuré
- ✓ Compression gzip activée
- ✓ SEO files (sitemap, robots)

### Test de l'API (curl)

```bash
curl -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "type": "Automatisation tests",
    "message": "Ceci est un message de test pour vérifier le fonctionnement du formulaire."
  }'
```

## 🔒 Sécurité

### Mesures implémentées

- **Helmet.js** : Headers HTTP sécurisés (CSP, X-Frame-Options, HSTS, etc.)
- **express-validator** : Validation stricte des inputs
- **Rate Limiting** : 5 requêtes max par 15 minutes par IP
- **HTML escaping** : Prévention des injections XSS dans les emails
- **CORS** : Restriction automatique des origines
- **Compression** : Gzip des réponses
- **Env variables** : Les secrets ne sont jamais committes

## 🚀 Déploiement

### Option 1 : Render.com (Recommandé — Gratuit)

1. Créer un compte : https://render.com
2. New → Web Service → Connecter le repo GitHub
3. Configurer :
   - Build Command : `npm install`
   - Start Command : `node server.js`
   - Environment : Ajouter les variables `.env`
4. Deploy → Obtenir l'URL en ~3 min

### Option 2 : Railway.app (~5$/mois)

1. Créer un compte : https://railway.app
2. New Project → Deploy from GitHub
3. Configurer les variables d'environnement dans l'UI
4. Déploiement automatique à chaque push

## 📈 Évolutions futures (v2+)

- [ ] PDF auto-généré depuis le HTML (Puppeteer)
- [ ] Analytics (Plausible.io — RGPD-friendly)
- [ ] Blog/Articles (section contenu pour SEO long-terme)
- [ ] Calendly intégré (remplacer formulaire)
- [ ] Multi-langue (EN pour missions internationales)
- [ ] Tests Playwright E2E (cohérent avec le profil QA)

## 📜 Licence

Projet personnel — Utilisable à titre d'exemple.

---

**Version** : 1.0.0
**Créé** : Mars 2026
**Par** : F.A. — Ingénieur Tests Senior
