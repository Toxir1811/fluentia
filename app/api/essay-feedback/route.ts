import { generateObject } from 'ai'
import { z } from 'zod'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const feedbackSchema = z.object({ bandScore: z.number().min(0).max(9), summary: z.string(), strengths: z.array(z.string()), improvements: z.array(z.string()), correctedExcerpt: z.string() })

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Sign in required' }, { status: 401 })
  const { prompt, content } = await request.json()
  if (typeof prompt !== 'string' || typeof content !== 'string' || content.trim().length < 40) return NextResponse.json({ error: 'Please submit at least 40 characters.' }, { status: 400 })
  try {
    const { object } = await generateObject({ model: 'openai/gpt-4o-mini', schema: feedbackSchema, prompt: `You are an IELTS writing examiner. Evaluate the essay against the prompt. Return an estimated band score and practical feedback. Prompt: ${prompt}\nEssay: ${content}` })
    const { data, error } = await supabase.from('essay_submissions').insert({ student_id: user.id, prompt, content, feedback: object, band_score: object.bandScore, status: 'reviewed' }).select().single()
    if (error) return NextResponse.json({ error: 'Feedback was generated but could not be saved.' }, { status: 500 })
    return NextResponse.json({ submission: data })
  } catch { return NextResponse.json({ error: 'Essay feedback is temporarily unavailable.' }, { status: 503 }) }
}
