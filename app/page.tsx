'use client'

import { useState } from 'react'
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

export default function Page() {
  const [active, setActive] = useState('Overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const [role, setRole] = useState('Student')

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
          <button className="nav-item"><Users size={18} /><span>My instructors</span><span className="nav-count">2</span></button>
          <button className="nav-item"><MessageCircle size={18} /><span>Messages</span><span className="nav-dot" /></button>
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
            <div className="avatar avatar-small">AS</div>
          </div>
        </header>

        <div className="page-wrap">
          <div className="welcome-row">
            <div><p className="eyebrow">{role} dashboard · Monday, May 12</p><h1>Good morning, Alex <span className="wave">✦</span></h1><p className="subhead">A little progress each day adds up to big results.</p></div>
            <button className="primary-button" onClick={() => setActive('Practice tests')}><Play size={16} fill="currentColor" data-icon="inline-start" /> Start a practice test</button>
          </div>

          <div className="hero-grid">
            <section className="focus-card">
              <div className="focus-main"><div className="focus-kicker"><span className="live-indicator" /> YOUR NEXT MILESTONE</div><h2>IELTS 7.5 is within reach.</h2><p>You&apos;re strongest in Listening. Let&apos;s give Writing a little more attention this week.</p><button className="text-button" onClick={() => setActive('Results')}>View your learning plan <ArrowUpRight size={16} /></button></div>
              <div className="score-ring"><div><strong>6.8</strong><span>current band</span></div></div>
            </section>
            <section className="progress-card"><div className="section-heading"><div><span className="card-kicker">WEEKLY ACTIVITY</span><h3>Nice rhythm, Alex.</h3></div><MoreHorizontal size={19} className="muted-icon" /></div><div className="activity-bars"><div className="bar-item"><span style={{ height: '62%' }} /><small>MON</small></div><div className="bar-item"><span style={{ height: '88%' }} /><small>TUE</small></div><div className="bar-item"><span style={{ height: '44%' }} /><small>WED</small></div><div className="bar-item"><span style={{ height: '76%' }} /><small>THU</small></div><div className="bar-item"><span style={{ height: '95%' }} /><small>FRI</small></div><div className="bar-item"><span style={{ height: '25%' }} /><small>SAT</small></div><div className="bar-item"><span className="bar-empty" /><small>SUN</small></div></div><div className="activity-meta"><span><strong>4h 20m</strong> this week</span><span className="positive"><ArrowUpRight size={13} /> 18% vs last week</span></div></section>
          </div>

          <div className="content-grid">
            <div className="main-column">
              <div className="section-heading section-heading-space"><div><span className="card-kicker">KEEP LEARNING</span><h3>Pick up where you left off</h3></div><button className="link-button" onClick={() => setActive('My courses')}>See all <ChevronRight size={15} /></button></div>
              <div className="course-grid">
                <article className="course-card course-blue"><div className="course-icon"><Headphones size={21} /></div><span className="course-tag">LISTENING · 42 MIN LEFT</span><h4>Understanding fast speakers</h4><div className="course-progress"><span style={{ width: '68%' }} /></div><div className="course-footer"><span>68% complete</span><button aria-label="Continue listening"><Play size={14} fill="currentColor" /></button></div></article>
                <article className="course-card course-lilac"><div className="course-icon"><FileText size={21} /></div><span className="course-tag">WRITING · 1H 15M LEFT</span><h4>Task 2: Opinion essays</h4><div className="course-progress"><span style={{ width: '34%' }} /></div><div className="course-footer"><span>34% complete</span><button aria-label="Continue writing"><Play size={14} fill="currentColor" /></button></div></article>
              </div>

              <div className="section-heading section-heading-space results-heading"><div><span className="card-kicker">RECENT RESULTS</span><h3>See how you&apos;re growing</h3></div><button className="link-button" onClick={() => setActive('Results')}>All results <ChevronRight size={15} /></button></div>
              <div className="results-table"><div className="result-row result-header"><span>Practice</span><span>Score</span><span>Change</span><span>Completed</span><span /></div><div className="result-row"><div className="test-name"><div className="result-icon result-green"><Headphones size={16} /></div><span>Listening · Section 3</span></div><strong>7.5</strong><span className="positive">+0.5</span><span>Yesterday</span><button aria-label="View result"><ChevronRight size={16} /></button></div><div className="result-row"><div className="test-name"><div className="result-icon result-blue"><FileText size={16} /></div><span>Reading · Passage 2</span></div><strong>7.0</strong><span className="positive">+0.5</span><span>May 9, 2025</span><button aria-label="View result"><ChevronRight size={16} /></button></div><div className="result-row"><div className="test-name"><div className="result-icon result-orange"><BrainCircuit size={16} /></div><span>Writing · Task 2</span></div><strong>6.0</strong><span className="neutral">—</span><span>May 6, 2025</span><button aria-label="View result"><ChevronRight size={16} /></button></div></div>
            </div>

            <aside className="right-column">
              <section className="schedule-card"><div className="section-heading"><div><span className="card-kicker">YOUR SCHEDULE</span><h3>Coming up</h3></div><button className="icon-button small"><MoreHorizontal size={17} /></button></div><div className="schedule-list">{schedule.map((item) => <div className="schedule-item" key={item.title}><div className={`date-block date-${item.color}`}><small>{item.day}</small><strong>{item.date}</strong></div><div className="schedule-details"><strong>{item.title}</strong><span>{item.time} <i>·</i> {item.type}</span></div></div>)}</div><button className="full-link">Open calendar <ArrowUpRight size={15} /></button></section>
              <section className="ai-card"><div className="ai-spark"><Sparkles size={19} /></div><span className="card-kicker">FLUENTPATH AI</span><h3>Your writing coach is ready.</h3><p>Get instant feedback on grammar, vocabulary, coherence, and your estimated band score.</p><button className="dark-button" onClick={() => setActive('AI writing lab')}>Open writing lab <ArrowUpRight size={15} /></button></section>
              <section className="tip-card"><div className="tip-top"><Target size={19} /><span>DAILY INSIGHT</span></div><p>In Listening Part 3, read the questions before the audio starts. It helps you predict the conversation.</p><button className="tip-link">Read more <ArrowUpRight size={14} /></button></section>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
