import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function AdminContacts({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const supabase = await createClient()
  
  // Check if user is authenticated and is admin
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login?redirectTo=/admin/contacts')
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
  
  // Fetch contact submissions with filter
  let query = supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (statusFilter !== 'all') {
    query = query.eq('status', statusFilter)
  }
  
  const { data: contacts } = await query

  return (
    <div className="min-h-screen bg-surface">
      {/* Admin Header */}
      <div className="bg-primary text-white py-8">
        <div className="container-custom flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif font-semibold">Contact Submissions</h1>
            <p className="text-white/60">Manage inquiries and messages</p>
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
            <Link href="/admin/applications" className="py-4 label-caps text-primary/60 hover:text-primary border-b-2 border-transparent hover:border-primary/20">
              Applications
            </Link>
            <Link href="/admin/contacts" className="py-4 label-caps border-b-2 border-primary">
              Contact Forms
            </Link>
          </nav>
        </div>
      </div>

      {/* Filters */}
      <div className="container-custom py-8">
        <div className="flex gap-4 mb-8">
          <Link 
            href="/admin/contacts" 
            className={`px-4 py-2 rounded text-sm font-medium ${statusFilter === 'all' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}
          >
            All
          </Link>
          <Link 
            href="/admin/contacts?status=new" 
            className={`px-4 py-2 rounded text-sm font-medium ${statusFilter === 'new' ? 'bg-secondary text-white' : 'bg-secondary/10 text-secondary'}`}
          >
            New
          </Link>
          <Link 
            href="/admin/contacts?status=in_progress" 
            className={`px-4 py-2 rounded text-sm font-medium ${statusFilter === 'in_progress' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}
          >
            In Progress
          </Link>
          <Link 
            href="/admin/contacts?status=resolved" 
            className={`px-4 py-2 rounded text-sm font-medium ${statusFilter === 'resolved' ? 'bg-tertiary text-white' : 'bg-tertiary/10 text-tertiary'}`}
          >
            Resolved
          </Link>
        </div>

        {/* Contact List */}
        <div className="border-t border-primary/10">
          {contacts && contacts.length > 0 ? (
            contacts.map((contact) => (
              <div key={contact.id} className="ruled-list-item">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contact.status === 'new' ? 'bg-secondary/10 text-secondary' :
                        contact.status === 'in_progress' ? 'bg-primary/10 text-primary' :
                        contact.status === 'resolved' ? 'bg-tertiary/10 text-tertiary' :
                        'bg-error/10 text-error'
                      }`}>
                        {contact.status.replace('_', ' ')}
                      </span>
                      <span className="label-caps text-primary/60">
                        {format(new Date(contact.created_at), 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                    <h3 className="text-xl mb-2">{contact.subject}</h3>
                    <p className="text-primary/70 mb-2">
                      From: <strong>{contact.name}</strong> ({contact.email})
                    </p>
                    <p className="text-primary/60 line-clamp-2">{contact.message}</p>
                  </div>
                  <Link 
                    href={`/admin/contacts/${contact.id}`}
                    className="btn-secondary text-sm ml-4"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center">
              <p className="text-primary/60">No contact submissions found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
