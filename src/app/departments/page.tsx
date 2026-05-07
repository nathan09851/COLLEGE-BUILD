import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Building2, ArrowRight, Users, BookOpen } from 'lucide-react'

export default async function DepartmentsPage() {
  const supabase = await createClient()
  
  const { data: departments } = await supabase
    .from('departments')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-primary text-white py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <Building2 className="w-8 h-8" />
              <h1 className="headline-xl">Academic Departments</h1>
            </div>
            <p className="text-lg text-white/70">
              Explore our diverse range of departments offering quality education and research opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="container-custom py-16">
        {departments && departments.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <Link 
                key={dept.id}
                href={`/departments/${dept.slug}`}
                className="card-minimal group hover:border-primary/30 transition-all"
              >
                <div className="aspect-video bg-primary/5 rounded mb-6 flex items-center justify-center overflow-hidden">
                  {dept.photo_url ? (
                    <img 
                      src={dept.photo_url} 
                      alt={dept.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-12 h-12 text-primary/20" />
                  )}
                </div>
                
                <h3 className="text-xl font-serif mb-3 group-hover:text-secondary transition-colors">
                  {dept.name}
                </h3>
                
                <p className="text-primary/70 mb-6 line-clamp-3">
                  {dept.short_description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                  <div className="flex items-center gap-4 text-sm text-primary/60">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Faculty
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      Programs
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary/40 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-primary/20 mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">No Departments Available</h3>
            <p className="text-primary/60">Department information will be updated soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
