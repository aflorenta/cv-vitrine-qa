# Deployment Guide — CV Vitrine

Guide complet pour déployer l'application en production.

## 🔧 Prérequis

- Node.js ≥ 18.0.0
- Git (pour versionning)
- Compte sur une plateforme d'hébergement (Render, Railway, OVH)
- Configuration SMTP (Gmail App Password ou Brevo)

## 📝 Étapes de préparation

### 1. Préparer l'application

```bash
# S'assurer que tout est testé localement
npm test
npm run dev
# → Vérifier que le formulaire fonctionne et envoie des emails

# Arrêter le serveur de développement
Ctrl+C
```

### 2. Créer un commit Git initial

```bash
git add .
git commit -m "feat: CV Vitrine v1.0.0 - Complete working application

- Express server with Helmet security headers
- Working contact form with email sending via Nodemailer
- Rate limiting (5 requests/15min)
- Input validation with express-validator
- Responsive HTML/CSS design
- SEO files (sitemap.xml, robots.txt)
- All 4 bugs from v0.1 fixed:
  1. Google Antigravity removed, replaced with Playwright
  2. Real email sending implemented
  3. Contact information enriched
  4. Copyright year auto-updated

Ready for production deployment."

git tag v1.0.0
```

### 3. Configurer les variables de production

Vérifiez que toutes les variables d'environnement sont prêtes :

- `PORT` : 3000 (ou le port fourni par l'hébergeur)
- `SMTP_HOST` : smtp.gmail.com ou smtp-relay.brevo.com
- `SMTP_PORT` : 587
- `SMTP_USER` : votre email
- `SMTP_PASS` : App Password (JAMAIS le vrai mot de passe)
- `CONTACT_RECIPIENT` : email où recevoir les messages
- `NODE_ENV` : production

## 🚀 Option 1 : Déployer sur Render.com (RECOMMANDÉ)

Render.com offre un free tier sans besoin de carte bancaire.

### Étapes

1. **Créer un compte**
   - Aller sur https://render.com
   - S'inscrire avec GitHub

2. **Connecter le repository**
   - Dashboard → New+ → Web Service
   - Sélectionner "GitHub"
   - Autoriser Render à accéder à vos repositories
   - Sélectionner le repository `cv-vitrine`

3. **Configurer le service**
   - **Name** : cv-vitrine
   - **Branch** : main (ou votre branche par défaut)
   - **Build Command** : `npm install`
   - **Start Command** : `node server.js`
   - **Plan** : Free (gratuit, ~3s de cold start après 15 min inactivité)

4. **Ajouter les variables d'environnement**
   - Environment → Add Environment Variables
   - Ajouter chaque variable du `.env` :
     ```
     PORT=3000
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_USER=votre.email@gmail.com
     SMTP_PASS=xxxx xxxx xxxx xxxx
     CONTACT_RECIPIENT=votre.email@gmail.com
     NODE_ENV=production
     ```

5. **Déployer**
   - Cliquer sur "Deploy"
   - Attendre le déploiement (~3 min)
   - Récupérer l'URL : `https://cv-vitrine-xxxxx.onrender.com`

6. **Configurer le domaine personnalisé (optionnel)**
   - Settings → Custom Domain
   - Ajouter votre domaine (ex. `floal-qa.fr`)
   - Suivre les instructions pour configurer le DNS

### Inconvénients du Free Tier

- Cold start : ~3-5 secondes après 15 minutes d'inactivité
- CPU/mémoire limités (acceptable pour un CV vitrine)
- Solution : upgrade à Railway (~5$/mois) pour éviter le cold start

---

## 🚀 Option 2 : Déployer sur Railway.app (~5$/mois)

Railway offre une meilleure expérience que Render free tier.

### Étapes

1. **Créer un compte**
   - Aller sur https://railway.app
   - S'inscrire avec GitHub

2. **Créer un nouveau projet**
   - Dashboard → New Project
   - Deploy from GitHub
   - Autoriser Railway à accéder à vos repositories
   - Sélectionner le repository

3. **Configuration automatique**
   - Railway détecte automatiquement Node.js
   - Crée une variable `PORT` automatiquement

4. **Ajouter les variables d'environnement**
   - Project → Variables
   - Ajouter les variables SMTP et autres

5. **Déploiement**
   - Automatique à chaque push sur main
   - URL : `https://<project-name>.up.railway.app`

### Avantages de Railway

- Pas de cold start
- Interface simple et intuitive
- Support du custom domain
- Logs et monitoring intégrés

---

## 🚀 Option 3 : Déployer sur VPS OVH (3€/mois)

Pour un contrôle complet et une meilleure performance.

### Prérequis

- VPS Ubuntu 22.04 minimum
- SSH access

### Étapes

1. **SSH sur le serveur**
   ```bash
   ssh root@your-vps-ip
   ```

2. **Installer les dépendances**
   ```bash
   # Update system
   apt update && apt upgrade -y

   # Installer Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install nodejs npm -y

   # Vérifier l'installation
   node --version  # v18.x.x ou +
   npm --version   # 9.x.x ou +
   ```

3. **Cloner le project**
   ```bash
   cd /var/www
   git clone https://github.com/YOUR-USERNAME/cv-vitrine.git
   cd cv-vitrine
   ```

4. **Installer les dépendances Node**
   ```bash
   npm install --production
   ```

5. **Créer le fichier .env**
   ```bash
   nano .env
   # Ajouter les variables :
   # PORT=3000
   # SMTP_HOST=smtp.gmail.com
   # etc.

   # Ctrl+O → Enter → Ctrl+X (sauvegarder dans nano)
   ```

6. **Installer PM2 (gestionnaire de processus)**
   ```bash
   npm install -g pm2

   # Démarrer l'application
   pm2 start server.js --name "cv-vitrine"

   # Lancer au démarrage du serveur
   pm2 startup
   pm2 save
   ```

7. **Configurer Nginx (reverse proxy)**
   ```bash
   apt install nginx -y
   ```

   Créer le fichier de configuration :
   ```bash
   nano /etc/nginx/sites-available/cv-vitrine
   ```

   Ajouter :
   ```nginx
   server {
       listen 80;
       server_name votre-domaine.fr;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Activer le site :
   ```bash
   ln -s /etc/nginx/sites-available/cv-vitrine /etc/nginx/sites-enabled/
   nginx -t  # vérifier la syntax
   systemctl restart nginx
   ```

8. **Configurer HTTPS avec Let's Encrypt**
   ```bash
   apt install certbot python3-certbot-nginx -y
   certbot --nginx -d votre-domaine.fr

   # Renouvellement automatique
   systemctl enable certbot.timer
   ```

9. **Vérifier le déploiement**
   ```bash
   pm2 logs cv-vitrine  # voir les logs
   curl http://localhost:3000  # vérifier localement
   ```

---

## ✅ Checklist post-déploiement

Après le déploiement, vérifier :

- [ ] Site accessible depuis l'URL (avec HTTPS si domaine perso)
- [ ] Formulaire de contact visible et fonctionnel
- [ ] Email de test reçu (vérifier spam)
- [ ] Copyright année courante affichée
- [ ] Tous les liens (email, LinkedIn, PDF) fonctionnels
- [ ] Liens CSS/JS ne retournent pas 404
- [ ] Performance acceptable (~2s chargement)
- [ ] Rate limiting fonctionne (6 requêtes rapides → bloquée)
- [ ] SEO : sitemap.xml accessible
- [ ] HTTPS actif et certificat valide

### Test rapide

```bash
# Via votre domaine ou l'URL Render/Railway
curl https://votre-domaine-ou-url.com
# Doit retourner le HTML

curl https://votre-domaine-ou-url.com/sitemap.xml
# Doit retourner le sitemap

curl -X POST https://votre-domaine-ou-url.com/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@test.fr","type":"Test","message":"Test message"}'
# Doit retourner : {"success":true, "message":"..."}
```

---

## 🔐 Sécurité

### Avant d'aller en production

- [ ] `.env` JAMAIS commité (vérifier `.gitignore`)
- [ ] SMTP_PASS est un App Password, pas le vrai mot de passe
- [ ] HTTPS activé (certificat Let's Encrypt ou autre)
- [ ] Helmet.js headers présents
- [ ] Rate limiting actif
- [ ] CORS configuré
- [ ] Pas de console.log() sensibles en production

### Monitoring

En production, surveiller :

- **Uptime** : Render/Railway/Uptime Robot
- **Erreurs** : Logs applicatifs, Sentry (optionnel)
- **Performance** : response time, memory usage
- **Emails** : vérifier que les emails arrivent (pas en spam)

---

## 🚨 Troubleshooting

### "Email not received"

1. Vérifier SMTP_HOST/SMTP_PASS/SMTP_USER
2. Vérifier que CONTACT_RECIPIENT est correct
3. Vérifier les logs (Gmail : "Less secure app access", etc.)
4. Essayer Brevo à la place de Gmail

### "Cold start trop long" (Render)

→ Upgrade vers Railway (~5$/mois) ou OVH VPS

### "CORS errors"

→ Helmet.js déjà configuré. Vérifier que les headers ne sont pas trop restrictifs.

### "Form submit → network error"

1. Vérifier la URL du formulaire (route `/api/contact`)
2. Vérifier le Content-Type header
3. Vérifier les logs serveur

---

## 📈 Maintenance

### Mises à jour dépendances

```bash
# Localement
npm outdated  # voir les packages outdated
npm update    # mettre à jour
npm audit     # vérifier les vulnérabilités

# Commit et push
git commit -m "chore: update dependencies"
git push
# Redéploiement automatique sur Render/Railway
```

### Logs et monitoring

- **Render** : Logs tab dans le dashboard
- **Railway** : Deployments → Logs
- **OVH** : `pm2 logs cv-vitrine`

---

**Version** : 1.0.0
**Dernière mise à jour** : Mars 2026
