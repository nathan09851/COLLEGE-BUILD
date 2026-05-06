'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateApplicationStatus(formData: FormData) {
  const id = formData.get('id') as string
  const status = formData.get('status') as string
  const notes = formData.get('notes') as string

  if (!id || !status) {
    throw new Error('Missing required fields')
  }

  const supabase = await createClient()
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  // Check if user is admin
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (profile?.role !== 'admin') {
    throw new Error('Unauthorized')
  }

  // Update application
  const { error } = await supabase
    .from('applications')
    .update({
      status,
      notes,
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath(`/admin/applications/${id}`)
  revalidatePath('/admin/applications')
  redirect(`/admin/applications/${id}`)
}
