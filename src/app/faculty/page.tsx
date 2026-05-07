import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Users, Search, Mail, GraduationCap, Filter, ArrowRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function FacultyPage({ searchParams }: PageProps) {
  const params = await searchParams
  const supabase = await createClient()
  
  const search = typeof params.search === 'string' ? params.search : ''
  const departmentFilter = typeof params.department === 'string' ? params.department : ''
  const designationFilter = typeof params.designation === 'string' ? params.designation : ''
  
  const { data: departments } = await supabase
    .from('departments')
    .select('name')
    .eq('is_active', true)
    .order('name')

  const { data: designations } = await supabase
    .from('faculty')
    .select('designation')
    .eq('is_active', true)
    
  const uniqueDesignations = designations 
    ? [...new Set(designations.map(d => d.designation))]
    : []
  
  let query = supabase
    .from('faculty')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .order('last_name', { ascending: true })

  if (search) {
    query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,specialization.ilike.%${search}%`)
  }

  if (departmentFilter) {
    query = query.eq('department', departmentFilter)
  }

  if (designationFilter) {
    query = query.eq('designation', designationFilter)
  }

  const { data: faculty } = await query

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,19,29,0.15),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
        
        <div className="container-custom relative">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-secondary text-secondary uppercase tracking-widest font-bold px-4 py-1">
              Faculty
            </Badge>
            <h1 className="headline-xl mb-8 leading-[1.1]">
              Distinguished <br />
              <span className="italic text-secondary">Academic Leadership.</span>
            </h1>
            <p className="text-xl text-slate-300 font-sans leading-relaxed">
              Our faculty members are scholars, researchers, and dedicated mentors 
              shaping the future of academic excellence at Xavier College.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="relative -mt-12 z-10">
        <div className="container-custom">
          <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100">
            <form className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="search"
                  placeholder="Search by name or specialization..."
                  defaultValue={search}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/20 font-sans text-slate-900"
                />
              </div>

              <div className="md:col-span-3 relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  name="department"
                  defaultValue={departmentFilter}
                  className="w-full pl-12 pr-8 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/20 font-sans text-slate-900 appearance-none"
                >
                  <option value="">All Departments</option>
                  {departments?.map((dept) => (
                    <option key={dept.name} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  name="designation"
                  defaultValue={designationFilter}
                  className="w-full pl-12 pr-8 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/20 font-sans text-slate-900 appearance-none"
                >
                  <option value="">All Ranks</option>
                  {uniqueDesignations.map((desig) => (
                    <option key={desig} value={desig}>{desig}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 flex gap-2">
                <button type="submit" className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest text-[10px] rounded-2xl transition-all">
                  Apply
                </button>
                {(search || departmentFilter || designationFilter) && (
                  <Link href="/faculty" className="w-12 h-12 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all text-slate-600">
                    <span className="sr-only">Clear filters</span>
                    <Filter className="w-4 h-4 rotate-180" />
                  </Link>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          {faculty && faculty.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {faculty.map((member) => (
                <Card key={member.id} className="group overflow-hidden border-none bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 rounded-3xl">
                  <CardContent className="p-10">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-8">
                        <div className="absolute inset-0 bg-secondary/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500" />
                        <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                          {member.photo_url ? (
                            <AvatarImage src={member.photo_url} alt={`${member.first_name} ${member.last_name}`} className="object-cover" />
                          ) : (
                            <AvatarFallback className="bg-slate-200 text-2xl font-bold text-slate-400">
                              {member.first_name[0]}{member.last_name[0]}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </div>

                      <Badge variant="outline" className="mb-4 border-slate-200 text-slate-500 text-[10px] uppercase font-black tracking-widest px-3">
                        {member.department}
                      </Badge>
                      
                      <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2 group-hover:text-secondary transition-colors leading-tight">
                        {member.first_name} {member.last_name}
                      </h3>
                      <p className="text-secondary font-serif italic text-base mb-6">{member.designation}</p>

                      <div className="w-12 h-px bg-slate-200 mb-6 group-hover:w-full transition-all duration-500" />

                      {member.specialization && (
                        <p className="text-sm text-slate-600 font-sans leading-relaxed mb-6 line-clamp-3">
                          {member.specialization}
                        </p>
                      )}

                      {member.email && (
                        <a 
                          href={`mailto:${member.email}`}
                          className="mt-auto flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-all hover:gap-3"
                        >
                          <Mail className="w-4 h-4" /> Send Message <ArrowRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <Users className="w-16 h-16 text-slate-200 mx-auto mb-6" />
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">No Scholars Found</h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                We couldn't find any faculty members matching your current criteria. 
                Please try adjusting your filters or clearing them.
              </p>
              <Link href="/faculty" className="mt-8 inline-block text-secondary font-bold uppercase tracking-widest text-xs border-b-2 border-secondary pb-1">
                View All Faculty
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
