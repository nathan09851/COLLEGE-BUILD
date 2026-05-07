'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ContactPage() {
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true)
    setError('')

    const supabase = createClient()

    const { error: submitError } = await supabase.from('contact_submissions').insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    })

    if (submitError) {
      setError(submitError.message)
      setIsLoading(false)
      return
    }

    setSuccess(true)
    setIsLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-surface">
        <div className="container-custom py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-tertiary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="headline-lg mb-4">Message Sent</h1>
            <p className="text-lg text-primary/70 mb-8">
              Thank you for contacting Xavier College. We have received your message and will respond within 24-48 hours.
            </p>
            <Link href="/" className="btn-primary inline-block">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-primary text-white py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="headline-xl mb-4">Contact Us</h1>
            <p className="text-lg text-white/70">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg">
              {error && (
                <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded mb-8">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="label-caps block mb-2">
                    Your Name *
                  </Label>
                  <Input {...register('name')} id="name" className="w-full" />
                  {errors.name && <p className="mt-1 text-sm text-error">{errors.name.message}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="label-caps block mb-2">
                    Email Address *
                  </Label>
                  <Input {...register('email')} id="email" type="email" className="w-full" />
                  {errors.email && <p className="mt-1 text-sm text-error">{errors.email.message}</p>}
                </div>

                <div>
                  <Label htmlFor="subject" className="label-caps block mb-2">
                    Subject *
                  </Label>
                  <Input {...register('subject')} id="subject" className="w-full" />
                  {errors.subject && <p className="mt-1 text-sm text-error">{errors.subject.message}</p>}
                </div>

                <div>
                  <Label htmlFor="message" className="label-caps block mb-2">
                    Message *
                  </Label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={6}
                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="How can we help you?"
                  />
                  {errors.message && <p className="mt-1 text-sm text-error">{errors.message.message}</p>}
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={isLoading} className="btn-primary">
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                  <Link href="/" className="btn-secondary inline-block">
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <span className="label-caps text-primary/60 block mb-2">Address</span>
                  <p className="text-lg">123 Academic Way<br />Cambridge, MA 02138</p>
                </div>
                <div>
                  <span className="label-caps text-primary/60 block mb-2">Phone</span>
                  <p className="text-lg">+1 (555) 012-3456</p>
                </div>
                <div>
                  <span className="label-caps text-primary/60 block mb-2">Email</span>
                  <p className="text-lg">admissions@xavier.edu</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif mb-6">Office Hours</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-primary/60">Monday - Friday</span>
                  <span>8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/60">Saturday</span>
                  <span>9:00 AM - 1:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/60">Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
