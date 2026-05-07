import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Building2, Users, Mail, Target, Eye, Award, ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DepartmentDetailPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: department } = await supabase
    .from('departments')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!department) {
    notFound()
  }

  // Fetch faculty for this department
  const { data: faculty } = await supabase
    .from('faculty')
    .select('*')
    .eq('department', department.name)
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <Link 
            href="/departments" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Departments</span>
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <Building2 className="w-10 h-10" />
            <h1 className="headline-xl">{department.name}</h1>
          </div>
          
          <p className="text-lg text-white/70 max-w-3xl">
            {department.short_description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            {department.full_description && (
              <section className="card-minimal">
                <h2 className="text-2xl font-serif mb-6 flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-secondary" />
                  About the Department
                </h2>
                <p className="text-primary/80 leading-relaxed whitespace-pre-line">
                  {department.full_description}
                </p>
              </section>
            )}

            {/* Vision & Mission */}
            <div className="grid md:grid-cols-2 gap-6">
              {department.vision && (
                <section className="card-minimal">
                  <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-secondary" />
                    Vision
                  </h3>
                  <p className="text-primary/70">{department.vision}</p>
                </section>
              )}
              
              {department.mission && (
                <section className="card-minimal">
                  <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-secondary" />
                    Mission
                  </h3>
                  <p className="text-primary/70">{department.mission}</p>
                </section>
              )}
            </div>

            {/* Facilities */}
            {department.facilities && (
              <section className="card-minimal">
                <h2 className="text-2xl font-serif mb-6">Facilities</h2>
                <p className="text-primary/80 leading-relaxed whitespace-pre-line">
                  {department.facilities}
                </p>
              </section>
            )}

            {/* Achievements */}
            {department.achievements && (
              <section className="card-minimal">
                <h2 className="text-2xl font-serif mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6 text-secondary" />
                  Achievements
                </h2>
                <p className="text-primary/80 leading-relaxed whitespace-pre-line">
                  {department.achievements}
                </p>
              </section>
            )}

            {/* Faculty Section */}
            {faculty && faculty.length > 0 && (
              <section>
                <h2 className="text-2xl font-serif mb-8 flex items-center gap-3">
                  <Users className="w-6 h-6 text-secondary" />
                  Faculty Members
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {faculty.map((member) => (
                    <div key={member.id} className="card-minimal">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          {member.photo_url ? (
                            <img 
                              src={member.photo_url} 
                              alt={`${member.first_name} ${member.last_name}`}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <Users className="w-8 h-8 text-primary/40" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{member.first_name} {member.last_name}</h4>
                          <p className="text-sm text-secondary">{member.designation}</p>
                          {member.specialization && (
                            <p className="text-sm text-primary/60 mt-1 line-clamp-2">
                              {member.specialization}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* HOD Card */}
              {department.hod_name && (
                <div className="card-minimal">
                  <h3 className="text-lg font-serif mb-4">Head of Department</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      {department.hod_photo_url ? (
                        <img 
                          src={department.hod_photo_url} 
                          alt={department.hod_name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <Users className="w-8 h-8 text-primary/40" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{department.hod_name}</p>
                      <p className="text-sm text-primary/60">HOD</p>
                    </div>
                  </div>
                  {department.hod_email && (
                    <a 
                      href={`mailto:${department.hod_email}`}
                      className="inline-flex items-center gap-2 text-sm text-secondary hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      {department.hod_email}
                    </a>
                  )}
                </div>
              )}

              {/* Quick Links */}
              <div className="card-minimal">
                <h3 className="text-lg font-serif mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/notices" className="text-primary/70 hover:text-secondary transition-colors">
                      Department Notices
                    </Link>
                  </li>
                  <li>
                    <Link href="/academic-calendar" className="text-primary/70 hover:text-secondary transition-colors">
                      Academic Calendar
                    </Link>
                  </li>
                  <li>
                    <Link href="/downloads" className="text-primary/70 hover:text-secondary transition-colors">
                      Syllabus & Downloads
                    </Link>
                  </li>
                  <li>
                    <Link href="/faculty" className="text-primary/70 hover:text-secondary transition-colors">
                      Faculty Directory
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
