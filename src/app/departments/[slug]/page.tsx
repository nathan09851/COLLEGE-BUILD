import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

import { notFound } from 'next/navigation'
import { Building2, Users, Mail, Target, Eye, Award, ArrowLeft, ArrowRight, GraduationCap, Bell, Calendar, Download } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

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

  const { data: faculty } = await supabase
    .from('faculty')
    .select('*')
    .eq('department', department.name)
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,19,29,0.15),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
        
        <div className="container-custom relative">
          <Link 
            href="/departments" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-all hover:-translate-x-1 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:text-secondary transition-colors" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Departments</span>
          </Link>
          
          <div className="max-w-4xl">
            <Badge variant="outline" className="mb-6 border-secondary text-secondary uppercase tracking-widest font-bold px-4 py-1">
              Department
            </Badge>
            <h1 className="headline-xl mb-8 leading-[1.1]">
              {department.name.split(' ').map((word: string, i: number) => (
                <span key={i} className={cn(i === 1 ? "italic text-secondary" : "")}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-xl text-slate-300 font-sans leading-relaxed">
              {department.short_description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24 bg-white relative">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-8 space-y-20">
              
              {/* About */}
              {department.full_description && (
                <div className="prose prose-slate prose-lg max-w-none">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-8 bg-secondary rounded-full" />
                    <h2 className="text-3xl font-serif font-bold text-slate-900 m-0">Academic Profile</h2>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-sans text-lg whitespace-pre-line">
                    {department.full_description}
                  </p>
                </div>
              )}

              {/* Vision & Mission Cards */}
              <div className="grid md:grid-cols-2 gap-8">
                {department.vision && (
                  <Card className="border-none bg-slate-50 p-8 rounded-[32px]">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                      <Eye className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-slate-900 mb-4">Our Vision</h3>
                    <p className="text-slate-600 font-sans leading-relaxed">{department.vision}</p>
                  </Card>
                )}
                
                {department.mission && (
                  <Card className="border-none bg-slate-900 p-8 rounded-[32px] text-white">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                      <Target className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-4 text-white">Our Mission</h3>
                    <p className="text-slate-300 font-sans leading-relaxed">{department.mission}</p>
                  </Card>
                )}
              </div>

              {/* Facilities & Achievements */}
              <div className="space-y-16">
                {department.facilities && (
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <Building2 className="w-6 h-6 text-secondary" /> Campus Facilities
                    </h3>
                    <p className="text-slate-600 leading-relaxed font-sans whitespace-pre-line bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                      {department.facilities}
                    </p>
                  </div>
                )}

                {department.achievements && (
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <Award className="w-6 h-6 text-secondary" /> Academic Milestones
                    </h3>
                    <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                      <p className="text-slate-600 leading-relaxed font-sans whitespace-pre-line">
                        {department.achievements}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Faculty List */}
              {faculty && faculty.length > 0 && (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-10 flex items-center gap-3">
                    <Users className="w-6 h-6 text-secondary" /> Faculty Members
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {faculty.map((member) => (
                      <Card key={member.id} className="group border-none bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 rounded-[24px]">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-5">
                            <Avatar className="w-16 h-16 border-2 border-white shadow-sm">
                              {member.photo_url ? (
                                <AvatarImage src={member.photo_url} className="object-cover" />
                              ) : (
                                <AvatarFallback className="bg-slate-200 font-bold text-slate-400">
                                  {member.first_name[0]}{member.last_name[0]}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div>
                              <h4 className="font-serif font-bold text-slate-900 group-hover:text-secondary transition-colors">{member.first_name} {member.last_name}</h4>
                              <p className="text-xs text-secondary font-bold uppercase tracking-widest mt-1">{member.designation}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <Link href="/faculty" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all group">
                      View Full Directory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                
                {/* HOD Profile */}
                {department.hod_name && (
                  <Card className="border-none bg-slate-950 text-white p-8 rounded-[40px] overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-8">Department Head</h3>
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="w-24 h-24 border-4 border-white/10 mb-6">
                        {department.hod_photo_url ? (
                          <AvatarImage src={department.hod_photo_url} className="object-cover" />
                        ) : (
                          <AvatarFallback className="bg-slate-800 text-slate-400 font-bold">HOD</AvatarFallback>
                        )}
                      </Avatar>
                      <p className="text-xl font-serif font-bold text-white mb-2">{department.hod_name}</p>
                      <p className="text-sm text-secondary font-medium mb-6">Head of Department</p>
                      
                      {department.hod_email && (
                        <a 
                          href={`mailto:${department.hod_email}`}
                          className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold transition-all"
                        >
                          <Mail className="w-4 h-4 text-secondary" /> Direct Email
                        </a>
                      )}
                    </div>
                  </Card>
                )}

                {/* Quick Resources */}
                <Card className="border-none bg-slate-50 p-8 rounded-[40px]">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Resources</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Announcements", href: "/notices", icon: <Bell className="w-4 h-4" /> },
                      { label: "Academic Calendar", href: "/academic-calendar", icon: <Calendar className="w-4 h-4" /> },
                      { label: "Course Downloads", href: "/downloads", icon: <Download className="w-4 h-4" /> },
                      { label: "Faculty Hub", href: "/faculty", icon: <GraduationCap className="w-4 h-4" /> }
                    ].map((link) => (
                      <Link 
                        key={link.label}
                        href={link.href}
                        className="flex items-center justify-between p-4 bg-white hover:bg-slate-900 hover:text-white rounded-2xl transition-all group shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-secondary group-hover:text-white transition-colors">{link.icon}</span>
                          <span className="text-sm font-bold">{link.label}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </Link>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
