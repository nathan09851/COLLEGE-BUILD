import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Building2, ArrowRight, Users, BookOpen } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


export default async function DepartmentsPage() {
  const supabase = await createClient()
  
  const { data: departments } = await supabase
    .from('departments')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,19,29,0.15),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
        
        <div className="container-custom relative">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-secondary text-secondary uppercase tracking-widest font-bold px-4 py-1">
              Academics
            </Badge>
            <h1 className="headline-xl mb-8 leading-[1.1]">
              Academic <br />
              <span className="italic text-secondary">Departments.</span>
            </h1>
            <p className="text-xl text-slate-300 font-sans leading-relaxed">
              Discover our diverse academic divisions, where specialized knowledge meets 
              interdisciplinary innovation across all major disciplines.
            </p>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          {departments && departments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {departments.map((dept) => (
                <Link 
                  key={dept.id}
                  href={`/departments/${dept.slug}`}
                  className="group block"
                >
                  <Card className="overflow-hidden border-none bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 rounded-[32px]">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      {dept.photo_url ? (
                        <Image 
                          src={dept.photo_url} 
                          alt={dept.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                          <Building2 className="w-12 h-12 text-slate-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-secondary transition-colors">
                        {dept.name}
                      </h3>
                      
                      <p className="text-slate-600 font-sans leading-relaxed mb-8 line-clamp-3 text-sm">
                        {dept.short_description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                          <span className="flex items-center gap-1.5 group-hover:text-slate-600 transition-colors">
                            <Users className="w-3.5 h-3.5" />
                            Faculty
                          </span>
                          <span className="flex items-center gap-1.5 group-hover:text-slate-600 transition-colors">
                            <BookOpen className="w-3.5 h-3.5" />
                            Programs
                          </span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
              <Building2 className="w-16 h-16 text-slate-200 mx-auto mb-6" />
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">No Departments Found</h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                Our academic structure is currently being updated. Please check back 
                soon for a full list of departments.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
