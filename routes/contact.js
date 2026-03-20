const express = require('express');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// ── SMTP Transporter Configuration ───────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,     // e.g., smtp.gmail.com
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,                    // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,    // App Password for Gmail (not actual password)
  },
});

// ── Input Validation Middleware ──────────────────────────────────────
const validateContact = [
  body('name')
    .trim()
    .notEmpty().withMessage('Nom requis')
    .isLength({ min: 2, max: 100 }).withMessage('Nom invalide'),
  body('email')
    .isEmail().withMessage('Email invalide')
    .normalizeEmail(),
  body('type')
    .trim()
    .notEmpty().withMessage('Type de mission requis'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 }).withMessage('Message entre 10 et 2000 caractères'),
];

// ── POST /api/contact ────────────────────────────────────────────────
router.post('/', validateContact, async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
    });
  }

  const { name, email, type, message } = req.body;

  try {
    // Email 1: Notification to site owner
    await transporter.sendMail({
      from: `"CV Vitrine" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECIPIENT,
      subject: `[Mission QA] ${type} — ${name}`,
      html: `
        <h2>Nouvelle proposition de mission</h2>
        <p><strong>De :</strong> ${escapeHtml(name)}</p>
        <p><strong>Email :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Type de mission :</strong> ${escapeHtml(type)}</p>
        <p><strong>Message :</strong></p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 16px; margin: 16px 0;">
          ${escapeHtml(message).replace(/\n/g, '<br>')}
        </blockquote>
        <hr>
        <p><em>Email envoyé depuis le formulaire de contact du CV vitrine.</em></p>
      `,
      replyTo: email,
    });

    // Email 2: Confirmation to the requester
    await transporter.sendMail({
      from: `"F.A. — Ingénieur Tests" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Votre demande de mission a bien été reçue',
      text: `Bonjour ${name},

J'ai bien reçu votre message concernant une mission en "${type}".
Je vous réponds sous 24 heures ouvrées.

Cordialement,
F.A.
Ingénieur Tests Senior
Consultant QA`,
    });

    res.json({
      success: true,
      message: 'Message envoyé avec succès. Réponse sous 24h ouvrées.'
    });
  } catch (err) {
    console.error('[Contact] Email error:', err.message);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'envoi. Réessayez dans quelques minutes.'
    });
  }
});

// ── Health check endpoint (optional) ─────────────────────────────────
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ── Helper: Escape HTML to prevent XSS ───────────────────────────────
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

module.exports = router;
