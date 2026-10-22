import express from 'express'; import cors from 'cors'; import helmet from 'helmet'; import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
const app = express()
app.use(helmet()); app.use(express.json({ limit: '10kb' }))
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',') }))

const smtpReady = () => process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 5, standardHeaders: true, legacyHeaders: false,
  message: { ok: false, error: 'Too many messages. Try again in a few minutes.' }
})

app.get('/api/health', (_q, r) => r.json({ ok: true, emailConfigured: !!smtpReady() }))

app.post('/api/contact', limiter, async (req, res, next) => {
  try {
    const { name = '', email = '', subject = '', message = '', website = '' } = req.body || {}
    if (website) return res.json({ ok: true, delivered: false }) // honeypot: bots fill this hidden field
    const clean = s => String(s).trim()
    const d = { name: clean(name), email: clean(email), subject: clean(subject), message: clean(message) }
    const errors = {}
    if (d.name.length < 2 || d.name.length > 80) errors.name = 'Enter your name (2–80 characters).'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) || d.email.length > 120) errors.email = 'Enter a valid email address.'
    if (d.subject.length < 3 || d.subject.length > 120) errors.subject = 'Enter a subject (3–120 characters).'
    if (d.message.length < 10 || d.message.length > 2000) errors.message = 'Write a message (10–2000 characters).'
    if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors })

    if (!smtpReady()) {
      console.log('[contact:dev-mode, NOT emailed]', d)
      return res.status(202).json({ ok: true, delivered: false, note: 'Email is not configured on this server, so your message was not sent. Please email me directly.' })
    }
    const t = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: +process.env.SMTP_PORT || 587, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } })
    await t.sendMail({ from: process.env.SMTP_USER, to: process.env.CONTACT_TO, replyTo: d.email, subject: `[Portfolio] ${d.subject}`, text: `From: ${d.name} <${d.email}>\n\n${d.message}` })
    res.json({ ok: true, delivered: true })
  } catch (e) { next(e) }
})

app.use((_q, r) => r.status(404).json({ ok: false, error: 'Not found' }))
app.use((err, _q, res, _n) => { console.error(err); res.status(500).json({ ok: false, error: 'Something went wrong sending your message. Please email me directly.' }) })
export default app
