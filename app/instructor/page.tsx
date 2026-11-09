'use client'

import { FormEvent, useEffect, useState } from 'react'
import { BookOpen, CheckCircle2, FilePlus2, LayoutDashboard, Loader2, Plus, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function InstructorPage() {
  const supabase = createClient()
  const [courses, setCourses] = useState<{ id: string; title: string; description: string; level: string; published: boolean }[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [level, setLevel] = useState('Intermediate')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let active = true
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setMessage('Sign in as an instructor to manage content.'); setLoading(false); return }
      const { data } = await supabase.from('courses').select('id,title,description,level,published').eq('instructor_id', user.id).order('created_at', { ascending: false })
      if (active) { setCourses(data || []); setLoading(false) }
    }
    load()
    const channel = supabase.channel('instructor-courses').on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, load).subscribe()
    return () => { active = false; supabase.removeChannel(channel) }
  }, [])

  async function createCourse(event: FormEvent) {
    event.preventDefault(); setSaving(true); setMessage('')
    const response = await fetch('/api/courses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, description, level }) })
    const result = await response.json()
    if (!response.ok) setMessage(result.error || 'Could not create course.')
    else { setCourses((current) => [result.course, ...current]); setTitle(''); setDescription(''); setMessage('Draft saved securely.') }
    setSaving(false)
  }

  return <main className="instructor-shell"><aside className="instructor-nav"><div className="brand-row"><div className="brand-mark"><Sparkles size={18} /></div><span className="brand-name">Fluent<span>path</span></span></div><div className="instructor-label">INSTRUCTOR STUDIO</div><a className="instructor-link instructor-link-active"><LayoutDashboard size={17} /> Overview</a><a className="instructor-link"><BookOpen size={17} /> Courses & lessons</a><a className="instructor-link"><FilePlus2 size={17} /> Test builder</a><a className="instructor-link"><Users size={17} /> Learners</a><div className="instructor-footer"><ShieldCheck size={15} /> Publishing is protected by role-based access.</div></aside><section className="instructor-main"><header className="instructor-header"><div><p className="eyebrow">INSTRUCTOR STUDIO</p><h1>Build learning that matters.</h1><p className="subhead">Create, publish, and improve every piece of content from one place.</p></div><button className="primary-button"><Plus size={16} /> New content</button></header><div className="instructor-stats"><div><span>Published courses</span><strong>{courses.filter((course) => course.published).length}</strong></div><div><span>Total drafts</span><strong>{courses.filter((course) => !course.published).length}</strong></div><div><span>Active learners</span><strong>—</strong></div><div><span>Average completion</span><strong>—</strong></div></div><div className="studio-grid"><form className="creator-card" onSubmit={createCourse}><div className="card-kicker">CREATE COURSE</div><h2>Start with a clear path.</h2><p>Draft a course now, add lessons and tests next, then publish when it is ready for your learners.</p><label>Course title<input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. IELTS Writing: Band 7+" /></label><label>Description<textarea required value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What will learners achieve?" rows={4} /></label><label>Level<select value={level} onChange={(event) => setLevel(event.target.value)}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label><button className="dark-button" disabled={saving}>{saving ? <Loader2 className="spin" size={15} /> : <FilePlus2 size={15} />}{saving ? 'Saving…' : 'Save course draft'}</button>{message && <p className="form-message">{message}</p>}</form><section className="content-card"><div className="section-heading"><div><div className="card-kicker">YOUR CONTENT</div><h2>Courses & drafts</h2></div><span className="realtime-badge"><span /> Live</span></div>{loading ? <p className="empty-copy">Loading your workspace…</p> : courses.length === 0 ? <div className="empty-state"><BookOpen size={21} /><strong>Your studio is ready.</strong><span>Create your first course to start adding lessons.</span></div> : <div className="course-list">{courses.map((course) => <article className="studio-course" key={course.id}><div className="studio-course-icon"><BookOpen size={18} /></div><div><strong>{course.title}</strong><span>{course.level} · {course.published ? 'Published' : 'Draft'}</span></div><button aria-label={`Open ${course.title}`}><FilePlus2 size={16} /></button></article>)}</div>}<div className="quality-note"><CheckCircle2 size={17} /><div><strong>Publishing checklist</strong><span>Every course can include reading, listening, speaking, writing, and explanations.</span></div></div></section></div></section></main>
}
