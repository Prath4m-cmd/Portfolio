import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, Download, Sun, Moon, Menu, X, ArrowUp, ExternalLink } from 'lucide-react'
import { profile, about, skills, projects, experience, education, achievements } from './data/content.js'

const NAV = [['home', 'Home'], ['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['experience', 'Experience'], ['contact', 'Contact']]
const API = import.meta.env.VITE_API_URL || ''

function useActive() {
  const [a, setA] = useState('home')
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setA(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  return a
}

function Header({ active, theme, setTheme }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav">
      <a href="#home" className="logo">prathmesh<span>.</span>dev</a>
      <nav className={open ? 'links open' : 'links'} aria-label="Primary">
        {NAV.map(([id, l]) => <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} onClick={() => setOpen(false)}>{l}</a>)}
        <a className="btn small" href={profile.resume} download><Download size={15} /> Resume</a>
      </nav>
      <button className="icon" aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
      <button className="icon menu" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
    </header>
  )
}

const STAGES = [['ingest', 'load + clean data'], ['features', 'engineer + encode'], ['train', 'RandomizedSearchCV'], ['evaluate', 'MAE · RMSE · R² · F1']]
function Hero() {
  return (
    <section id="home" className="hero">
      <div>
        <p className="muted">{profile.name}</p>
        <h1>{profile.headline}</h1>
        <p className="lead">{profile.intro}</p>
        <div className="row">
          <a className="btn" href="#projects">View projects</a>
          <a className="btn ghost" href={profile.resume} download>Download resume</a>
        </div>
        <div className="row social">
          <a href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer"><Github /></a>
          <a href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email"><Mail /></a>
        </div>
      </div>
      <pre className="pipe" aria-label="Machine learning pipeline stages used in my projects">
        <code>{'pipeline.run()\n'}{STAGES.map(([s, d], i) => <span key={s} style={{ '--i': i }}>{`  ✓ ${s.padEnd(9)} ${d}\n`}</span>)}</code>
      </pre>
    </section>
  )
}

const Sec = ({ id, title, children }) => <section id={id} className="sec"><h2>{title}</h2>{children}</section>

function Projects() {
  const [sel, setSel] = useState(null)
  return (
    <Sec id="projects" title="Projects">
      <div className="grid">
        {projects.map(p => (
          <article key={p.id} className="card">
            <p className="muted">{p.tag}</p>
            <h3>{p.name}</h3>
            <p>{p.problem}</p>
            <div className="chips">{p.stack.map(s => <span key={s}>{s}</span>)}</div>
            <div className="row">
              <button className="btn small ghost" onClick={() => setSel(p)}>Details</button>
              <a className="btn small ghost" href={p.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
            </div>
          </article>
        ))}
      </div>
      {sel && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={sel.name} onClick={() => setSel(null)}>
          <div className="card" onClick={e => e.stopPropagation()}>
            <button className="icon close" aria-label="Close" onClick={() => setSel(null)} autoFocus><X /></button>
            <h3>{sel.name}</h3><p className="muted">{sel.tag}</p><p>{sel.problem}</p>
            <ul>{sel.features.map(f => <li key={f}>{f}</li>)}</ul>
            <div className="chips">{sel.stack.map(s => <span key={s}>{s}</span>)}</div>
            <a className="btn small" href={sel.github} target="_blank" rel="noreferrer">View on GitHub <ExternalLink size={14} /></a>
          </div>
        </div>
      )}
    </Sec>
  )
}

function Contact() {
  const [st, setSt] = useState({ s: 'idle' })
  async function submit(e) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.target))
    setSt({ s: 'sending' })
    try {
      const r = await fetch(`${API}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) })
      const j = await r.json()
      if (r.ok && j.delivered) { setSt({ s: 'ok' }); e.target.reset() }
      else if (r.ok) setSt({ s: 'err', msg: j.note })
      else setSt({ s: 'err', msg: j.errors ? Object.values(j.errors).join(' ') : j.error })
    } catch { setSt({ s: 'err', msg: 'Could not reach the server. Please email me directly.' }) }
  }
  return (
    <Sec id="contact" title="Contact">
      <p className="lead">I'm looking for internship and fresher roles in AI/ML and software engineering. Write to me at <a href={`mailto:${profile.email}`}>{profile.email}</a> or use the form.</p>
      <form onSubmit={submit} className="form" noValidate>
        <label>Name<input name="name" required autoComplete="name" /></label>
        <label>Email<input name="email" type="email" required autoComplete="email" /></label>
        <label className="full">Subject<input name="subject" required /></label>
        <label className="full">Message<textarea name="message" rows="5" required /></label>
        <input name="website" tabIndex="-1" autoComplete="off" className="hp" aria-hidden="true" />
        <button className="btn" disabled={st.s === 'sending'}>{st.s === 'sending' ? 'Sending…' : 'Send message'}</button>
        <p role="status" className={st.s === 'err' ? 'err' : 'okmsg'}>{st.s === 'ok' && 'Message sent. I will reply by email.'}{st.s === 'err' && st.msg}</p>
      </form>
    </Sec>
  )
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const active = useActive()
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('theme', theme) }, [theme])
  return (
    <>
      <Header active={active} theme={theme} setTheme={setTheme} />
      <main>
        <Hero />
        <Sec id="about" title="About">{about.map(t => <p key={t} className="lead">{t}</p>)}</Sec>
        <Sec id="skills" title="Skills"><div className="grid">{skills.map(([g, items]) => <div key={g} className="card"><h3>{g}</h3><div className="chips">{items.map(i => <span key={i}>{i}</span>)}</div></div>)}</div></Sec>
        <Projects />
        <Sec id="experience" title="Experience, education and achievements">
          {experience.map(x => <div key={x.org} className="item"><b>{x.role}, {x.org}</b><span className="muted">{x.where} · {x.when}</span><ul>{x.points.map(p => <li key={p}>{p}</li>)}</ul></div>)}
          <h3>Education</h3>
          {education.map(x => <div key={x.name} className="item"><b>{x.name}</b><span className="muted">{x.what} · {x.when}</span></div>)}
          <h3>Achievements</h3>
          <div className="grid">{achievements.map(a => <div key={a.title} className="card"><b>{a.title}</b><p className="muted">{a.where}</p><p>{a.note}</p></div>)}</div>
        </Sec>
        <Contact />
      </main>
      <footer className="foot"><span>© {new Date().getFullYear()} {profile.name}</span><span className="row"><a href={profile.github}>GitHub</a><a href={profile.linkedin}>LinkedIn</a><a href="#home" aria-label="Back to top"><ArrowUp size={16} /></a></span></footer>
    </>
  )
}
