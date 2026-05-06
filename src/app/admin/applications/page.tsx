import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function AdminApplications({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const supabase = await createClient()
  
  // Check if user is authenticated and is admin
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login?redirectTo=/admin/applications')
  }
  
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (profile?.role !== 'admin') {
    redirect('/')
  }

  const statusFilter = searchParams.status || 'all'
  
  // Fetch applications with filter
  let query = supabase
    .from('applications')
    .select('*')
    .order('submitted_at', { ascending: false })
  
  if (statusFilter !== 'all') {
    query = query.eq('status', statusFilter)
  }
  
  const { data: applications, error } = await query

  return (
    <div className="min-h-screen bg-surface">
      {/* Admin Header */}
      <div className="bg-primary text-white py-8">
        <div className="container-custom flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif font-semibold">Applications</h1>
            <p className="text-white/60">Manage admission applications</p>
          </div>
          <Link href="/admin" className="text-sm text-white/60 hover:text-white">
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-primary/10">
        <div className="container-custom">
          <nav className="flex gap-8">
            <Link href="/admin" className="py-4 label-caps text-primary/60 hover:text-primary border-b-2 border-transparent hover:border-primary/20">
              Dashboard
            </Link>
            <Link href="/admin/applications" className="py-4 label-caps border-b-2 border-primary">
              Applications
            </Link>
            <Link href="/admin/contacts" className="py-4 label-caps text-primary/60 hover:text-primary border-b-2 border-transparent hover:border-primary/20">
              Contact Forms
            </Link>
          </nav>
        </div>
      </div>

      {/* Filters */}
      <div className="container-custom py-8">
        <div className="flex gap-4 mb-8">
          <Link 
            href="/admin/applications" 
            className={`px-4 py-2 rounded text-sm font-medium ${statusFilter === 'all' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}
          >
            All
          </Link>
          <Link 
            href="/admin/applications?status=pending" 
            className={`px-4 py-2 rounded text-sm font-medium ${statusFilter === 'pending' ? 'bg-secondary text-white' : 'bg-secondary/10 text-secondary'}`}
          >
            Pending
          </Link>
          <Link 
            href="/admin/applications?status=reviewing" 
            className={`px-4 py-2 rounded text-sm font-medium ${statusFilter === 'reviewing' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}
          >
            Reviewing
          </Link>
          <Link 
            href="/admin/applications?status=accepted" 
            className={`px-4 py-2 rounded text-sm font-medium ${statusFilter === 'accepted' ? 'bg-tertiary text-white' : 'bg-tertiary/10 text-tertiary'}`}
          >
            Accepted
          </Link>
          <Link 
            href="/admin/applications?status=rejected" 
            className={`px-4 py-2 rounded text-sm font-medium ${statusFilter === 'rejected' ? 'bg-error text-white' : 'bg-error/10 text-error'}`}
          >
            Rejected
          </Link>
        </div>

        {/* Applications List */}
        <div className="border-t border-primary/10">
          {applications && applications.length > 0 ? (
            applications.map((app) => (
              <div key={app.id} className="ruled-list-item">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === 'pending' ? 'bg-secondary/10 text-secondary' :
                        app.status === 'reviewing' ? 'bg-primary/10 text-primary' :
                        app.status === 'accepted' ? 'bg-tertiary/10 text-tertiary' :
                        'bg-error/10 text-error'
                      }`}>
                        {app.status}
                      </span>
                      <span className="label-caps text-primary/60">
                        Submitted {format(new Date(app.submitted_at), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <h3 className="text-2xl mb-2">
                      {app.first_name} {app.last_name}
                    </h3>
                    <p className="text-primary/70 mb-4">
                      {app.program_interest} • {app.email}
                    </p>
                    <div className="flex gap-6 text-sm text-primary/60">
                      <span>GPA: {app.gpa}</span>
                      <span>Institution: {app.institution_name}</span>
                      <span>Start: {app.start_term}</span>
                    </div>
                  </div>
                  <Link 
                    href={`/admin/applications/${app.id}`}
                    className="btn-secondary text-sm"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center">
              <p className="text-primary/60">No applications found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
