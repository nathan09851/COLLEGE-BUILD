import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // Check if user is authenticated and is admin
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login?redirectTo=/admin')
  }
  
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (profile?.role !== 'admin') {
    redirect('/')
  }

  // Fetch statistics
  const { count: applicationsCount } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })

  const { count: pendingCount } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  const { count: contactCount } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true })

  const { count: newContactCount } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new')

  return (
    <div className="min-h-screen bg-surface">
      {/* Admin Header */}
      <div className="bg-primary text-white py-8">
        <div className="container-custom flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif font-semibold">Admin Dashboard</h1>
            <p className="text-white/60">Xavier College Administration</p>
          </div>
          <Link href="/" className="text-sm text-white/60 hover:text-white">
            ← Back to Site
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-primary/10">
        <div className="container-custom">
          <nav className="flex gap-8">
            <Link href="/admin" className="py-4 label-caps border-b-2 border-primary">
              Dashboard
            </Link>
            <Link href="/admin/applications" className="py-4 label-caps text-primary/60 hover:text-primary border-b-2 border-transparent hover:border-primary/20">
              Applications
            </Link>
            <Link href="/admin/contacts" className="py-4 label-caps text-primary/60 hover:text-primary border-b-2 border-transparent hover:border-primary/20">
              Contact Forms
            </Link>
          </nav>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="container-custom py-12">
        <h2 className="text-xl font-serif mb-8">Overview</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="card-minimal">
            <span className="label-caps text-primary/60 mb-2 block">Total Applications</span>
            <p className="text-4xl font-serif text-primary">{applicationsCount || 0}</p>
          </div>
          
          <div className="card-minimal">
            <span className="label-caps text-secondary mb-2 block">Pending Review</span>
            <p className="text-4xl font-serif text-secondary">{pendingCount || 0}</p>
          </div>
          
          <div className="card-minimal">
            <span className="label-caps text-primary/60 mb-2 block">Contact Messages</span>
            <p className="text-4xl font-serif text-primary">{contactCount || 0}</p>
          </div>
          
          <div className="card-minimal">
            <span className="label-caps text-secondary mb-2 block">New Messages</span>
            <p className="text-4xl font-serif text-secondary">{newContactCount || 0}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-serif mb-8 mt-16">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/admin/applications" className="card-minimal group">
            <div className="flex justify-between items-start">
              <div>
                <span className="label-caps text-secondary mb-4 block">Manage</span>
                <h3 className="text-2xl mb-2 group-hover:italic transition-all">Review Applications</h3>
                <p className="text-primary/70">View and process admission applications</p>
              </div>
              <span className="text-2xl text-primary/30 group-hover:text-primary transition-colors">&rarr;</span>
            </div>
          </Link>

          <Link href="/admin/contacts" className="card-minimal group">
            <div className="flex justify-between items-start">
              <div>
                <span className="label-caps text-secondary mb-4 block">Manage</span>
                <h3 className="text-2xl mb-2 group-hover:italic transition-all">Contact Submissions</h3>
                <p className="text-primary/70">Respond to inquiries and messages</p>
              </div>
              <span className="text-2xl text-primary/30 group-hover:text-primary transition-colors">&rarr;</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
