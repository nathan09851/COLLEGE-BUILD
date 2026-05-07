import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Users, Search, Mail, GraduationCap, Filter } from 'lucide-react'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function FacultyPage({ searchParams }: PageProps) {
  const params = await searchParams
  const supabase = await createClient()
  
  const search = typeof params.search === 'string' ? params.search : ''
  const departmentFilter = typeof params.department === 'string' ? params.department : ''
  const designationFilter = typeof params.designation === 'string' ? params.designation : ''
  
  // Fetch all departments for filter
  const { data: departments } = await supabase
    .from('departments')
    .select('name')
    .eq('is_active', true)
    .order('name')

  // Fetch all designations for filter
  const { data: designations } = await supabase
    .from('faculty')
    .select('designation')
    .eq('is_active', true)
    
  const uniqueDesignations = designations 
    ? [...new Set(designations.map(d => d.designation))]
    : []
  
  // Build query
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
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <Link href="/" className="text-xl font-serif font-semibold tracking-tight inline-block mb-8">
            Xavier <span className="italic">College</span>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <Users className="w-8 h-8" />
            <h1 className="headline-xl">Faculty Directory</h1>
          </div>
          <p className="text-lg text-white/70 max-w-2xl">
            Meet our distinguished faculty members who bring expertise and dedication to academic excellence.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-primary/10">
        <div className="container-custom py-6">
          <form className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
              <input
                type="text"
                name="search"
                placeholder="Search by name or specialization..."
                defaultValue={search}
                className="w-full pl-10 pr-4 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
              <select
                name="department"
                defaultValue={departmentFilter}
                className="pl-10 pr-8 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              >
                <option value="">All Departments</option>
                {departments?.map((dept) => (
                  <option key={dept.name} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>

            {/* Designation Filter */}
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
              <select
                name="designation"
                defaultValue={designationFilter}
                className="pl-10 pr-8 py-3 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              >
                <option value="">All Designations</option>
                {uniqueDesignations.map((desig) => (
                  <option key={desig} value={desig}>{desig}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-primary">
              Filter
            </button>

            {(search || departmentFilter || designationFilter) && (
              <Link href="/faculty" className="btn-secondary">
                Clear
              </Link>
            )}
          </form>
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="container-custom py-16">
        {faculty && faculty.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((member) => (
              <div key={member.id} className="card-minimal">
                <div className="flex flex-col items-center text-center">
                  {/* Photo */}
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    {member.photo_url ? (
                      <img 
                        src={member.photo_url} 
                        alt={`${member.first_name} ${member.last_name}`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Users className="w-12 h-12 text-primary/40" />
                    )}
                  </div>

                  {/* Info */}
                  <h3 className="text-xl font-serif mb-1">
                    {member.first_name} {member.last_name}
                  </h3>
                  <p className="text-secondary text-sm mb-2">{member.designation}</p>
                  <p className="text-primary/60 text-sm mb-4">{member.department}</p>

                  {/* Specialization */}
                  {member.specialization && (
                    <p className="text-sm text-primary/70 mb-4 line-clamp-2">
                      {member.specialization}
                    </p>
                  )}

                  {/* Education */}
                  {member.education && (
                    <p className="text-xs text-primary/50 mb-4">
                      {member.education}
                    </p>
                  )}

                  {/* Contact */}
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-2 text-sm text-secondary hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      Contact
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-primary/20 mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">No Faculty Found</h3>
            <p className="text-primary/60">
              {search || departmentFilter || designationFilter 
                ? 'Try adjusting your search criteria.' 
                : 'Faculty information will be updated soon.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
