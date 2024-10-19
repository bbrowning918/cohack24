'use server';

import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'

export async function login(data: { email: string, password: string }) {
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { success: false }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}