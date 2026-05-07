import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Quote, Users, Star, GraduationCap, Building2, Heart } from 'lucide-react'

export default async function TestimonialsPage() {
  const supabase = await createClient()
  
  // Fetch featured testimonials first
  const { data: featured } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('display_order', { ascending: true })

  // Fetch other testimonials
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', false)
    .order('created_at', { ascending: false })

  const allTestimonials = [...(featured || []), ...(testimonials || [])]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'student': return <GraduationCap className="w-4 h-4" />
      case 'alumni': return <Building2 className="w-4 h-4" />
      case 'parent': return <Heart className="w-4 h-4" />
      case 'industry': return <Building2 className="w-4 h-4" />
      default: return <Users className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'student': return 'bg-tertiary/10 text-tertiary'
      case 'alumni': return 'bg-primary/10 text-primary'
      case 'parent': return 'bg-secondary/10 text-secondary'
      case 'industry': return 'bg-primary/10 text-primary'
      default: return 'bg-primary/10 text-primary'
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <Link href="/" className="text-xl font-serif font-semibold tracking-tight inline-block mb-8">
            Xavier <span className="italic">College</span>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <Quote className="w-8 h-8" />
            <h1 className="headline-xl">Testimonials</h1>
          </div>
          <p className="text-lg text-white/70 max-w-2xl">
            Hear from our students, alumni, parents, and industry partners about their experiences with Xavier College.
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container-custom py-16">
        {allTestimonials && allTestimonials.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {allTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className={`card-minimal relative ${testimonial.is_featured ? 'md:col-span-2' : ''}`}
              >
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />

                <div className={`flex ${testimonial.is_featured ? 'md:flex-row' : 'flex-col'} gap-6`}>
                  {/* Photo */}
                  <div className={`${testimonial.is_featured ? 'md:w-1/4' : ''} flex-shrink-0`}>
                    <div className={`${testimonial.is_featured ? 'w-32 h-32' : 'w-20 h-20'} bg-primary/10 rounded-full flex items-center justify-center mx-auto`}>
                      {testimonial.photo_url ? (
                        <img 
                          src={testimonial.photo_url} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <Users className={`${testimonial.is_featured ? 'w-16 h-16' : 'w-10 h-10'} text-primary/40`} />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Type Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(testimonial.testimonial_type)}`}>
                        {getTypeIcon(testimonial.testimonial_type)}
                        {testimonial.testimonial_type.charAt(0).toUpperCase() + testimonial.testimonial_type.slice(1)}
                      </span>
                      {testimonial.is_featured && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded">
                          <Star className="w-3 h-3" />
                          FEATURED
                        </span>
                      )}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-lg text-primary/80 leading-relaxed mb-6 italic">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-serif font-medium text-lg">{testimonial.name}</p>
                        <p className="text-sm text-secondary">{testimonial.designation}</p>
                        {(testimonial.department || testimonial.batch_year) && (
                          <p className="text-sm text-primary/60 mt-1">
                            {testimonial.department && `${testimonial.department}`}
                            {testimonial.department && testimonial.batch_year && ' • '}
                            {testimonial.batch_year && `Batch ${testimonial.batch_year}`}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Quote className="w-16 h-16 text-primary/20 mx-auto mb-4" />
            <h3 className="text-xl font-serif mb-2">No Testimonials Yet</h3>
            <p className="text-primary/60">Testimonials will be added soon.</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="container-custom py-16">
        <div className="card-minimal text-center">
          <h2 className="text-2xl font-serif mb-4">Share Your Experience</h2>
          <p className="text-primary/70 mb-6 max-w-2xl mx-auto">
            Are you a student, alumnus, or parent? We would love to hear about your experience at Xavier College. 
            Your testimonial could inspire future students.
          </p>
          <Link href="/contact" className="btn-primary inline-block">
            Submit Your Testimonial
          </Link>
        </div>
      </div>
    </div>
  )
}
