import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { updateApplicationStatus } from './actions'

export default async function ApplicationDetail({
  params,
}: {
  params: { id: string }
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

  // Fetch application
  const { data: application, error } = await supabase
    .from('applications')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !application) {
    redirect('/admin/applications')
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Admin Header */}
      <div className="bg-primary text-white py-8">
        <div className="container-custom flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif font-semibold">Application Review</h1>
            <p className="text-white/60">Review and update application status</p>
          </div>
          <Link href="/admin/applications" className="text-sm text-white/60 hover:text-white">
            ← Back to Applications
          </Link>
        </div>
      </div>

      {/* Application Details */}
      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Status Banner */}
            <div className={`p-4 rounded ${
              application.status === 'pending' ? 'bg-secondary/10 border border-secondary/20' :
              application.status === 'reviewing' ? 'bg-primary/10 border border-primary/20' :
              application.status === 'accepted' ? 'bg-tertiary/10 border border-tertiary/20' :
              'bg-error/10 border border-error/20'
            }`}>
              <div className="flex justify-between items-center">
                <div>
                  <span className="label-caps text-primary/60">Current Status</span>
                  <p className="text-xl font-medium capitalize">{application.status}</p>
                </div>
                <span className="text-sm text-primary/60">
                  Submitted {format(new Date(application.submitted_at), 'MMM d, yyyy')}
                </span>
              </div>
            </div>

            {/* Applicant Information */}
            <section className="card-minimal">
              <h2 className="text-xl font-serif mb-6">Applicant Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <span className="label-caps text-primary/60 block mb-1">Full Name</span>
                  <p className="text-lg">{application.first_name} {application.last_name}</p>
                </div>
                <div>
                  <span className="label-caps text-primary/60 block mb-1">Email</span>
                  <p className="text-lg">{application.email}</p>
                </div>
                <div>
                  <span className="label-caps text-primary/60 block mb-1">Phone</span>
                  <p className="text-lg">{application.phone}</p>
                </div>
                <div>
                  <span className="label-caps text-primary/60 block mb-1">Date of Birth</span>
                  <p className="text-lg">{application.date_of_birth ? format(new Date(application.date_of_birth), 'MMM d, yyyy') : 'N/A'}</p>
                </div>
              </div>
            </section>

            {/* Program Information */}
            <section className="card-minimal">
              <h2 className="text-xl font-serif mb-6">Program Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <span className="label-caps text-primary/60 block mb-1">Program of Interest</span>
                  <p className="text-lg">{application.program_interest}</p>
                </div>
                <div>
                  <span className="label-caps text-primary/60 block mb-1">Intended Start</span>
                  <p className="text-lg">{application.start_term}</p>
                </div>
              </div>
            </section>

            {/* Education Background */}
            <section className="card-minimal">
              <h2 className="text-xl font-serif mb-6">Education Background</h2>
              <div className="space-y-4">
                <div>
                  <span className="label-caps text-primary/60 block mb-1">Previous Institution</span>
                  <p className="text-lg">{application.institution_name}</p>
                </div>
                <div>
                  <span className="label-caps text-primary/60 block mb-1">GPA</span>
                  <p className="text-lg">{application.gpa}</p>
                </div>
                <div>
                  <span className="label-caps text-primary/60 block mb-1">Previous Education</span>
                  <p className="text-primary/80 whitespace-pre-wrap">{application.previous_education}</p>
                </div>
              </div>
            </section>

            {/* Personal Statement */}
            <section className="card-minimal">
              <h2 className="text-xl font-serif mb-6">Personal Statement</h2>
              <p className="text-primary/80 whitespace-pre-wrap leading-relaxed">
                {application.personal_statement}
              </p>
            </section>
          </div>

          {/* Sidebar - Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="card-minimal">
                <h3 className="text-lg font-serif mb-4">Update Status</h3>
                <form action={updateApplicationStatus} className="space-y-4">
                  <input type="hidden" name="id" value={application.id} />
                  
                  <div>
                    <label className="label-caps block mb-2">New Status</label>
                    <select 
                      name="status" 
                      className="w-full px-3 py-2 border border-primary/20 rounded-md"
                      defaultValue={application.status}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="label-caps block mb-2">Notes</label>
                    <textarea 
                      name="notes"
                      rows={4}
                      className="w-full px-3 py-2 border border-primary/20 rounded-md"
                      placeholder="Add internal notes..."
                      defaultValue={application.notes || ''}
                    />
                  </div>

                  <button type="submit" className="w-full btn-primary">
                    Update Application
                  </button>
                </form>
              </div>

              <div className="card-minimal">
                <h3 className="text-lg font-serif mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a 
                    href={`mailto:${application.email}`}
                    className="block w-full text-center py-3 border border-primary/20 rounded hover:bg-primary/5 transition-colors"
                  >
                    Email Applicant
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
