import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { GraduationCap, Award, BookOpen, Quote, Sparkles } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default async function PrincipalMessagePage() {
  const supabase = await createClient()
  
  const { data: message } = await supabase
    .from('principal_message')
    .select('*')
    .eq('is_active', true)
    .single()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,19,29,0.15),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
        
        <div className="container-custom relative">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-secondary text-secondary uppercase tracking-widest font-bold px-4 py-1">
              Leadership
            </Badge>
            <h1 className="headline-xl mb-8 leading-[1.1]">
              Principal&apos;s <br />
              <span className="italic text-secondary">Perspective.</span>
            </h1>
            <p className="text-xl text-slate-300 font-sans leading-relaxed">
              Words of wisdom, guidance, and the vision for academic excellence 
              at Xavier College from our esteemed Principal.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white relative">
        <div className="container-custom">
          {message ? (
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              
              {/* Principal Portrait Sidebar */}
              <div className="lg:col-span-4 lg:sticky lg:top-32">
                <Card className="border-none bg-slate-50 p-6 rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/50">
                  <div className="aspect-[4/5] relative rounded-[32px] overflow-hidden mb-8 border-4 border-white shadow-inner">
                    {message.photo_url ? (
                      <Image 
                        src={message.photo_url} 
                        alt={message.principal_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                        <GraduationCap className="w-20 h-20 text-slate-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="px-4 pb-4">
                    <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2 leading-tight">
                      {message.principal_name}
                    </h2>
                    <p className="text-secondary font-serif italic text-lg mb-8">
                      {message.principal_designation}
                    </p>
                    
                    {message.qualifications && (
                      <div className="pt-8 border-t border-slate-200">
                        <div className="flex items-center gap-3 mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                          <Award className="w-4 h-4 text-secondary" /> Academic Background
                        </div>
                        <p className="text-sm text-slate-600 font-sans leading-relaxed">
                          {message.qualifications}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Message Content */}
              <div className="lg:col-span-8">
                <div className="relative">
                  <Quote className="absolute -top-12 -left-12 w-24 h-24 text-slate-50 -z-10" />
                  
                  <div className="flex items-center gap-4 mb-10">
                    <Sparkles className="w-6 h-6 text-secondary" />
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                      {message.message_title}
                    </h2>
                  </div>
                  
                  <div className="prose prose-slate prose-xl max-w-none">
                    <div className="text-slate-600 leading-[1.8] font-sans whitespace-pre-line space-y-8">
                      {message.message_content}
                    </div>
                  </div>

                  <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-start">
                    <div className="w-24 h-px bg-secondary mb-6" />
                    <p className="text-xl font-serif font-bold text-slate-900 mb-1">With Best Wishes,</p>
                    <p className="text-lg font-serif italic text-secondary">{message.principal_name}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-32 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
              <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-6" />
              <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">Perspective Pending</h3>
              <p className="text-slate-500 max-w-sm mx-auto text-lg">
                The Principal&apos;s perspective is currently being updated for the new academic season. 
                Please check back shortly.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
