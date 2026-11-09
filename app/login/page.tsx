'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2, LockKeyhole } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [role, setRole] = useState('student')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setMessage('')
    const supabase = createClient()
    const redirect = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`
    const result = mode === 'sign-in'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirect, data: { display_name: displayName, role } } })
    if (result.error) setMessage(mode === 'sign-in' ? 'Invalid email or password.' : result.error.message.includes('confirm') ? 'Check your email to confirm your account.' : 'Could not create your account. Please check the details.')
    else if (mode === 'sign-up') setMessage('Account created. Check your email to confirm access.')
    else window.location.href = '/'
    setLoading(false)
  }

  return <main className="auth-shell"><div className="auth-card"><Link href="/" className="auth-back"><ArrowLeft size={15} /> Back to Fluentpath</Link><div className="auth-mark"><LockKeyhole size={19} /></div><p className="eyebrow">FLUENTPATH ACCOUNT</p><h1>{mode === 'sign-in' ? 'Welcome back.' : 'Start your learning path.'}</h1><p className="subhead">{mode === 'sign-in' ? 'Sign in to continue your progress.' : 'Create a secure account for your learning journey.'}</p><form onSubmit={submit} className="auth-form">{mode === 'sign-up' && <label>Your name<input required value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Alex Smith" /></label>}<label>Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label><label>Password<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" /></label>{mode === 'sign-up' && <label>I am joining as<select value={role} onChange={(event) => setRole(event.target.value)}><option value="student">Student</option><option value="parent">Parent</option><option value="instructor">Instructor</option></select></label>}<button className="primary-button auth-submit" disabled={loading}>{loading && <Loader2 className="spin" size={15} />}{mode === 'sign-in' ? 'Sign in' : 'Create account'}</button>{message && <p className="form-message">{message}</p>}</form><button className="auth-switch" onClick={() => setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')}>{mode === 'sign-in' ? 'Need an account? Create one' : 'Already have an account? Sign in'}</button></div></main>
}
