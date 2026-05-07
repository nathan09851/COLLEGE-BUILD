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

  const { count: noticesCount } = await supabase
    .from('notices')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  const { count: facultyCount } = await supabase
    .from('faculty')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  const { count: departmentsCount } = await supabase
    .from('departments')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  const { count: eventsCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('is_public', true)

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
          <nav className="flex flex-wrap gap-4">
            <Link href="/admin" className="py-4 label-caps border-b-2 border-primary">
              Dashboard
            </Link>
            <Link href="/admin/applications" className="py-4 label-caps text-primary/60 hover:text-primary border-b-2 border-transparent hover:border-primary/20">
              Applications
            </Link>
            <Link href="/admin/contacts" className="py-4 label-caps text-primary/60 hover:text-primary border-b-2 border-transparent hover:border-primary/20">
              Contacts
            </Link>
            <Link href="/admin/notices" className="py-4 label-caps text-primary/60 hover:text-primary border-b-2 border-transparent hover:border-primary/20">
              Notices
            </Link>
            <Link href="/admin/faculty" className="py-4 label-caps text-primary/60 hover:text-primary border-b-2 border-transparent hover:border-primary/20">
              Faculty
            </Link>
            <Link href="/admin/departments" className="py-4 label-caps text-primary/60 hover:text-primary border-b-2 border-transparent hover:border-primary/20">
              Departments
            </Link>
            <Link href="/admin/events" className="py-4 label-caps text-primary/60 hover:text-primary border-b-2 border-transparent hover:border-primary/20">
              Events
            </Link>
            <Link href="/admin/gallery" className="py-4 label-caps text-primary/60 hover:text-primary border-b-2 border-transparent hover:border-primary/20">
              Gallery
            </Link>
            <Link href="/admin/downloads" className="py-4 label-caps text-primary/60 hover:text-primary border-b-2 border-transparent hover:border-primary/20">
              Downloads
            </Link>
            <Link href="/admin/testimonials" className="py-4 label-caps text-primary/60 hover:text-primary border-b-2 border-transparent hover:border-primary/20">
              Testimonials
            </Link>
          </nav>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="container-custom py-12">
        <h2 className="text-xl font-serif mb-8">Overview</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="card-minimal">
            <span className="label-caps text-primary/60 mb-2 block">Applications</span>
            <p className="text-4xl font-serif text-primary">{applicationsCount || 0}</p>
            <p className="text-sm text-secondary mt-1">{pendingCount || 0} pending</p>
          </div>
          
          <div className="card-minimal">
            <span className="label-caps text-primary/60 mb-2 block">Contact Messages</span>
            <p className="text-4xl font-serif text-primary">{contactCount || 0}</p>
            <p className="text-sm text-secondary mt-1">{newContactCount || 0} new</p>
          </div>
          
          <div className="card-minimal">
            <span className="label-caps text-primary/60 mb-2 block">Active Notices</span>
            <p className="text-4xl font-serif text-primary">{noticesCount || 0}</p>
          </div>
          
          <div className="card-minimal">
            <span className="label-caps text-primary/60 mb-2 block">Faculty</span>
            <p className="text-4xl font-serif text-primary">{facultyCount || 0}</p>
          </div>
          
          <div className="card-minimal">
            <span className="label-caps text-primary/60 mb-2 block">Departments</span>
            <p className="text-4xl font-serif text-primary">{departmentsCount || 0}</p>
          </div>
          
          <div className="card-minimal">
            <span className="label-caps text-primary/60 mb-2 block">Upcoming Events</span>
            <p className="text-4xl font-serif text-primary">{eventsCount || 0}</p>
          </div>
        </div>

        {/* Content Management */}
        <h2 className="text-xl font-serif mb-8 mt-16">Content Management</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/applications" className="card-minimal group">
            <div className="flex justify-between items-start">
              <div>
                <span className="label-caps text-secondary mb-4 block">Manage</span>
                <h3 className="text-xl mb-2 group-hover:italic transition-all">Applications</h3>
                <p className="text-primary/70 text-sm">Review admission applications</p>
              </div>
              <span className="text-2xl text-primary/30 group-hover:text-primary transition-colors">&rarr;</span>
            </div>
          </Link>

          <Link href="/admin/contacts" className="card-minimal group">
            <div className="flex justify-between items-start">
              <div>
                <span className="label-caps text-secondary mb-4 block">Manage</span>
                <h3 className="text-xl mb-2 group-hover:italic transition-all">Contacts</h3>
                <p className="text-primary/70 text-sm">Respond to inquiries</p>
              </div>
              <span className="text-2xl text-primary/30 group-hover:text-primary transition-colors">&rarr;</span>
            </div>
          </Link>

          <Link href="/admin/notices" className="card-minimal group">
            <div className="flex justify-between items-start">
              <div>
                <span className="label-caps text-secondary mb-4 block">Manage</span>
                <h3 className="text-xl mb-2 group-hover:italic transition-all">Notices</h3>
                <p className="text-primary/70 text-sm">Post announcements</p>
              </div>
              <span className="text-2xl text-primary/30 group-hover:text-primary transition-colors">&rarr;</span>
            </div>
          </Link>

          <Link href="/admin/faculty" className="card-minimal group">
            <div className="flex justify-between items-start">
              <div>
                <span className="label-caps text-secondary mb-4 block">Manage</span>
                <h3 className="text-xl mb-2 group-hover:italic transition-all">Faculty</h3>
                <p className="text-primary/70 text-sm">Update faculty directory</p>
              </div>
              <span className="text-2xl text-primary/30 group-hover:text-primary transition-colors">&rarr;</span>
            </div>
          </Link>

          <Link href="/admin/departments" className="card-minimal group">
            <div className="flex justify-between items-start">
              <div>
                <span className="label-caps text-secondary mb-4 block">Manage</span>
                <h3 className="text-xl mb-2 group-hover:italic transition-all">Departments</h3>
                <p className="text-primary/70 text-sm">Edit department pages</p>
              </div>
              <span className="text-2xl text-primary/30 group-hover:text-primary transition-colors">&rarr;</span>
            </div>
          </Link>

          <Link href="/admin/events" className="card-minimal group">
            <div className="flex justify-between items-start">
              <div>
                <span className="label-caps text-secondary mb-4 block">Manage</span>
                <h3 className="text-xl mb-2 group-hover:italic transition-all">Events</h3>
                <p className="text-primary/70 text-sm">Update academic calendar</p>
              </div>
              <span className="text-2xl text-primary/30 group-hover:text-primary transition-colors">&rarr;</span>
            </div>
          </Link>

          <Link href="/admin/gallery" className="card-minimal group">
            <div className="flex justify-between items-start">
              <div>
                <span className="label-caps text-secondary mb-4 block">Manage</span>
                <h3 className="text-xl mb-2 group-hover:italic transition-all">Gallery</h3>
                <p className="text-primary/70 text-sm">Upload photos</p>
              </div>
              <span className="text-2xl text-primary/30 group-hover:text-primary transition-colors">&rarr;</span>
            </div>
          </Link>

          <Link href="/admin/downloads" className="card-minimal group">
            <div className="flex justify-between items-start">
              <div>
                <span className="label-caps text-secondary mb-4 block">Manage</span>
                <h3 className="text-xl mb-2 group-hover:italic transition-all">Downloads</h3>
                <p className="text-primary/70 text-sm">Manage documents</p>
              </div>
              <span className="text-2xl text-primary/30 group-hover:text-primary transition-colors">&rarr;</span>
            </div>
          </Link>

          <Link href="/admin/testimonials" className="card-minimal group">
            <div className="flex justify-between items-start">
              <div>
                <span className="label-caps text-secondary mb-4 block">Manage</span>
                <h3 className="text-xl mb-2 group-hover:italic transition-all">Testimonials</h3>
                <p className="text-primary/70 text-sm">Add success stories</p>
              </div>
              <span className="text-2xl text-primary/30 group-hover:text-primary transition-colors">&rarr;</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
