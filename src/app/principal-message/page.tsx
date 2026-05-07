import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { GraduationCap, Award, BookOpen } from 'lucide-react'

export default async function PrincipalMessagePage() {
  const supabase = await createClient()
  
  const { data: message } = await supabase
    .from('principal_message')
    .select('*')
    .eq('is_active', true)
    .single()

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-primary text-white py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="headline-xl mb-4">Principal's Message</h1>
            <p className="text-lg text-white/70">
              Words of wisdom and guidance from our esteemed Principal.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16">
        {message ? (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Principal Info Card */}
            <div className="lg:col-span-1">
              <div className="card-minimal sticky top-8">
                <div className="aspect-[3/4] bg-primary/10 rounded-lg mb-6 flex items-center justify-center">
                  {message.photo_url ? (
                    <img 
                      src={message.photo_url} 
                      alt={message.principal_name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-16 h-16 text-primary/40" />
                    </div>
                  )}
                </div>
                
                <h2 className="text-2xl font-serif mb-2">{message.principal_name}</h2>
                <p className="text-secondary font-medium mb-4">{message.principal_designation}</p>
                
                {message.qualifications && (
                  <div className="pt-4 border-t border-primary/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-primary/60" />
                      <span className="label-caps text-primary/60">Qualifications</span>
                    </div>
                    <p className="text-sm text-primary/70">{message.qualifications}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Message Content */}
            <div className="lg:col-span-2">
              <div className="card-minimal">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-primary/10">
                  <BookOpen className="w-6 h-6 text-secondary" />
                  <h2 className="text-3xl font-serif">{message.message_title}</h2>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-primary/80 leading-relaxed whitespace-pre-line text-lg">
                    {message.message_content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-primary/20 mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">Message Coming Soon</h3>
            <p className="text-primary/60">The Principal's message will be updated shortly.</p>
          </div>
        )}
      </div>
    </div>
  )
}
