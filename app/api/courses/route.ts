import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('courses').select('id,title,description,level,cover_color,published,created_at,instructor_id').eq('published', true).order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: 'Unable to load courses' }, { status: 500 })
  return NextResponse.json({ courses: data })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Sign in required' }, { status: 401 })
  const body = await request.json()
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || !['instructor', 'admin'].includes(profile.role)) return NextResponse.json({ error: 'Instructor access required' }, { status: 403 })
  const { data, error } = await supabase.from('courses').insert({ instructor_id: user.id, title: body.title, description: body.description || '', level: body.level || 'Intermediate', cover_color: body.cover_color || 'blue', published: false }).select().single()
  if (error) return NextResponse.json({ error: 'Unable to create course' }, { status: 400 })
  return NextResponse.json({ course: data }, { status: 201 })
}
