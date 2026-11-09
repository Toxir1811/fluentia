'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Headphones,
  Home,
  Languages,
  LayoutDashboard,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Play,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Practice tests', icon: FileText },
  { label: 'My courses', icon: BookOpen },
  { label: 'AI writing lab', icon: BrainCircuit },
  { label: 'Results', icon: BarChart3 },
]

const schedule = [
  { day: 'MON', date: '12', title: 'IELTS Reading · Cambridge 18', time: '09:00 – 10:00', type: 'Test', color: 'blue' },
  { day: 'TUE', date: '13', title: 'Live speaking workshop', time: '18:30 – 19:30', type: 'Live class', color: 'purple' },
  { day: 'WED', date: '14', title: 'Essay feedback session', time: 'Anytime', type: 'AI lab', color: 'orange' },
]

function NavButton({ item, active, onClick }: { item: typeof navItems[number]; active: boolean; onClick: () => void }) {
  const Icon = item.icon
  return (
    <button className={`nav-item ${active ? 'nav-item-active' : ''}`} onClick={onClick}>
      <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
      <span>{item.label}</span>
      {item.label === 'AI writing lab' && <span className="new-pill">NEW</span>}
    </button>
  )
}

function WorkspaceScreen({ active, role }: { active: string; role: string }) {
  const [essay, setEssay] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [testStarted, setTestStarted] = useState(false)

  async function submitEssay(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    const response = await fetch('/api/essay-feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: 'Some people believe online education is replacing traditional classrooms. Discuss both views and give your opinion.', content: essay }) })
    const result = await response.json()
    setFeedback(response.ok ? `Estimated band ${result.submission?.band_score ?? '—'}. Your feedback is saved to your account.` : result.error)
    setSubmitting(false)
  }

  if (active === 'Practice tests') return <section className="workspace-screen"><div className="screen-heading"><div><p className="eyebrow">IELTS COMPUTER-DELIVERED PRACTICE</p><h2>Choose a section to begin.</h2><p className="subhead">Timed tests save your attempt and show explanations, transcripts, and your score when you finish.</p></div><span className="realtime-badge"><span /> Live content</span></div><div className="practice-grid">{[['Reading','60 min','40 questions','FileText'],['Listening','30 min','40 questions','Headphones'],['Writing','60 min','2 tasks','BrainCircuit'],['Speaking','14 min','3 parts','MessageCircle']].map(([title, time, questions, icon]) => <article className="practice-card" key={title}><div className="practice-icon">{icon === 'FileText' ? <FileText /> : icon === 'Headphones' ? <Headphones /> : icon === 'BrainCircuit' ? <BrainCircuit /> : <MessageCircle />}</div><span className="card-kicker">IELTS {title.toUpperCase()}</span><h3>{title} practice test</h3><p>{time} · {questions}</p><button className="dark-button" onClick={() => setTestStarted(true)}><Play size={15} fill="currentColor" /> {testStarted ? 'Test in progress' : 'Start test'}</button></article>)}</div>{testStarted && <div className="active-test"><div><span className="card-kicker">ACTIVE ATTEMPT</span><h3>Cambridge-style {role.toLowerCase()} practice</h3><p>Your timer and answers will be saved to Supabase when you submit.</p></div><button className="primary-button" onClick={() => setTestStarted(false)}>Resume test <ChevronRight size={15} /></button></div>}</section>
  if (active === 'AI writing lab') return <section className="workspace-screen"><div className="screen-heading"><div><p className="eyebrow">FLUENTPATH AI</p><h2>Improve your writing with evidence.</h2><p className="subhead">Submit an IELTS Task 2 response and get structured feedback saved to your student profile.</p></div><div className="ai-spark"><Sparkles size={19} /></div></div><form className="essay-lab" onSubmit={submitEssay}><label>Essay response<textarea required minLength={40} value={essay} onChange={(event) => setEssay(event.target.value)} placeholder="Write at least 40 characters here..." rows={12} /></label><div className="essay-actions"><span>{essay.length} characters</span><button className="primary-button" disabled={submitting}>{submitting ? 'Checking…' : 'Check my essay'}</button></div>{feedback && <div className="feedback-result"><CheckCircle2 size={18} /><span>{feedback}</span></div>}</form></section>
  if (active === 'My courses') return <section className="workspace-screen"><div className="screen-heading"><div><p className="eyebrow">MY LEARNING</p><h2>Courses from your instructors.</h2><p className="subhead">Published lessons appear here in real time as instructors release them.</p></div><BookOpen size={26} className="screen-icon" /></div><div className="empty-learning"><BookOpen size={24} /><h3>No published courses yet</h3><p>Your instructor workspace is ready. New lessons will appear here automatically.</p><Link href="/instructor" className="primary-button">Open instructor studio <ArrowUpRight size={15} /></Link></div></section>
  if (active === 'Messages') return <section className="workspace-screen"><div className="screen-heading"><div><p className="eyebrow">CONNECT</p><h2>Messages</h2><p className="subhead">Stay connected with instructors and parents in one secure place.</p></div><MessageCircle size={26} className="screen-icon" /></div><div className="empty-learning"><MessageCircle size={24} /><h3>Your inbox is clear</h3><p>When an instructor sends an update, it will appear here.</p></div></section>
  if (active === 'Results') return <section className="workspace-screen"><div className="screen-heading"><div><p className="eyebrow">YOUR PROGRESS</p><h2>Results that belong to you.</h2><p className="subhead">Every completed attempt will be stored securely and shown with explanations.</p></div><BarChart3 size={26} className="screen-icon" /></div><div className="empty-learning"><Trophy size={24} /><h3>No completed attempts yet</h3><p>Start a practice test and your score, explanations, and transcript will be saved here.</p><button className="primary-button" onClick={() => window.location.reload()}>Back to overview</button></div></section>
  return null
}

export default function Page() {
  const [active, setActive] = useState('Overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const [role, setRole] = useState('Student')
  const [today, setToday] = useState('')

  useEffect(() => {
    setToday(new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date()))
  }, [])

  return (
    <main className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark"><Languages size={19} /></div>
          <span className="brand-name">Fluent<span>path</span></span>
          <button className="mobile-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X size={20} /></button>
        </div>
        <div className="workspace-switcher">
          <div className="avatar avatar-navy">AS</div>
          <div><strong>Alex Smith</strong><span>Student workspace</span></div>
          <ChevronRight size={15} className="muted-icon" />
        </div>
        <div className="nav-label">LEARN</div>
        <nav>
          {navItems.map((item) => <NavButton key={item.label} item={item} active={active === item.label} onClick={() => { setActive(item.label); setMenuOpen(false) }} />)}
        </nav>
        <div className="nav-label nav-label-spaced">CONNECT</div>
        <nav>
          <button className="nav-item" onClick={() => { window.location.href = '/instructor' }}><Users size={18} /><span>My instructors</span><span className="nav-count">2</span></button>
          <button className={`nav-item ${active === 'Messages' ? 'nav-item-active' : ''}`} onClick={() => setActive('Messages')}><MessageCircle size={18} /><span>Messages</span><span className="nav-dot" /></button>
        </nav>
        <div className="sidebar-bottom">
          <div className="streak-card"><div className="streak-icon"><Zap size={16} fill="currentColor" /></div><div><strong>7 day streak</strong><span>Keep it going, Alex!</span></div></div>
          <button className="nav-item"><Settings2 size={18} /><span>Settings</span></button>
          <div className="sidebar-footer"><ShieldCheck size={14} /> Your progress is private</div>
        </div>
      </aside>

      <section className="main-content">
        <header className="topbar">
          <button className="mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={21} /></button>
          <div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><strong>{active}</strong></div>
          <div className="topbar-actions">
            <div className="role-switcher" role="group" aria-label="View as role">
              {['Student', 'Parent'].map((item) => <button key={item} className={role === item ? 'role-active' : ''} onClick={() => setRole(item)}>{item}</button>)}
            </div>
            <button className="icon-button" aria-label="Search"><Search size={18} /></button>
            <button className="icon-button notification" aria-label="Notifications"><span /> <Clock3 size={18} /></button>
            <Link href="/login" className="avatar avatar-small" aria-label="Open account">AS</Link>
          </div>
        </header>

        <div className="page-wrap">
          <div className="welcome-row">
            <div><p className="eyebrow">{role} dashboard · {today || 'Today'}</p><h1>Good morning, Alex <span className="wave">✦</span></h1><p className="subhead">A little progress each day adds up to big results.</p></div>
            <button className="primary-button" onClick={() => setActive('Practice tests')}><Play size={16} fill="currentColor" data-icon="inline-start" /> Start a practice test</button>
          </div>

          {active !== 'Overview' && <WorkspaceScreen active={active} role={role} />}
          <div className={active !== 'Overview' ? 'dashboard-hidden' : ''}>
          <div className="hero-grid">
            <section className="focus-card">
              <div className="focus-main"><div className="focus-kicker"><span className="live-indicator" /> YOUR NEXT MILESTONE</div><h2>IELTS 7.5 is within reach.</h2><p>You&apos;re strongest in Listening. Let&apos;s give Writing a little more attention this week.</p><button className="text-button" onClick={() => setActive('Results')}>View your learning plan <ArrowUpRight size={16} /></button></div>
              <div className="score-ring"><div><strong>6.8</strong><span>current band</span></div></div>
              </section>
          </div>
          </div>
        </div>
      </section>
    </main>
  )
}
