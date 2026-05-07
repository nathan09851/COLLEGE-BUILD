'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import { applicationSchema, type ApplicationFormData } from '@/lib/validations'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const programs = [
  'Theoretical Physics',
  'Modern Philosophy',
  'Architectural Design',
  'Computer Science',
  'Mathematics',
  'English Literature',
  'History',
  'Economics',
  'Political Science',
  'Biology',
  'Chemistry',
  'Psychology',
]

const terms = [
  'Fall 2026',
  'Spring 2027',
  'Fall 2027',
  'Spring 2028',
]

export default function ApplyPage() {
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  })

  const onSubmit = async (data: ApplicationFormData) => {
    setIsLoading(true)
    setError('')

    const supabase = createClient()
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      setError('You must be logged in to submit an application')
      setIsLoading(false)
      return
    }

    const { error: submitError } = await supabase.from('applications').insert({
      user_id: user.id,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      date_of_birth: data.dateOfBirth,
      program_interest: data.programInterest,
      start_term: data.startTerm,
      previous_education: data.previousEducation,
      institution_name: data.institutionName,
      gpa: parseFloat(data.gpa),
      personal_statement: data.personalStatement,
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
            <h1 className="headline-lg mb-4">Application Submitted</h1>
            <p className="text-lg text-primary/70 mb-8">
              Thank you for applying to Xavier College. We have received your application and will review it shortly.
              You will receive a confirmation email within 24 hours.
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
          <h1 className="headline-xl mb-4">Admissions Application</h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Complete the form below to begin your journey toward academic excellence.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="container-custom py-16">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl">
          {error && (
            <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded mb-8">
              {error}
            </div>
          )}

          {/* Personal Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif mb-6 pb-4 border-b border-primary/10">
              Personal Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="label-caps block mb-2">
                  First Name *
                </Label>
                <Input {...register('firstName')} id="firstName" className="w-full" />
                {errors.firstName && <p className="mt-1 text-sm text-error">{errors.firstName.message}</p>}
              </div>

              <div>
                <Label htmlFor="lastName" className="label-caps block mb-2">
                  Last Name *
                </Label>
                <Input {...register('lastName')} id="lastName" className="w-full" />
                {errors.lastName && <p className="mt-1 text-sm text-error">{errors.lastName.message}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="label-caps block mb-2">
                  Email Address *
                </Label>
                <Input {...register('email')} id="email" type="email" className="w-full" />
                {errors.email && <p className="mt-1 text-sm text-error">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="phone" className="label-caps block mb-2">
                  Phone Number *
                </Label>
                <Input {...register('phone')} id="phone" type="tel" className="w-full" />
                {errors.phone && <p className="mt-1 text-sm text-error">{errors.phone.message}</p>}
              </div>

              <div>
                <Label htmlFor="dateOfBirth" className="label-caps block mb-2">
                  Date of Birth *
                </Label>
                <Input {...register('dateOfBirth')} id="dateOfBirth" type="date" className="w-full" />
                {errors.dateOfBirth && <p className="mt-1 text-sm text-error">{errors.dateOfBirth.message}</p>}
              </div>
            </div>
          </section>

          {/* Program Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif mb-6 pb-4 border-b border-primary/10">
              Program Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="programInterest" className="label-caps block mb-2">
                  Program of Interest *
                </Label>
                <select
                  {...register('programInterest')}
                  id="programInterest"
                  className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select a program</option>
                  {programs.map((program) => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
                {errors.programInterest && <p className="mt-1 text-sm text-error">{errors.programInterest.message}</p>}
              </div>

              <div>
                <Label htmlFor="startTerm" className="label-caps block mb-2">
                  Intended Start Term *
                </Label>
                <select
                  {...register('startTerm')}
                  id="startTerm"
                  className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select a term</option>
                  {terms.map((term) => (
                    <option key={term} value={term}>{term}</option>
                  ))}
                </select>
                {errors.startTerm && <p className="mt-1 text-sm text-error">{errors.startTerm.message}</p>}
              </div>
            </div>
          </section>

          {/* Education Background */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif mb-6 pb-4 border-b border-primary/10">
              Education Background
            </h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="institutionName" className="label-caps block mb-2">
                  Previous Institution *
                </Label>
                <Input {...register('institutionName')} id="institutionName" className="w-full" />
                {errors.institutionName && <p className="mt-1 text-sm text-error">{errors.institutionName.message}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="previousEducation" className="label-caps block mb-2">
                    Previous Education *
                  </Label>
                  <textarea
                    {...register('previousEducation')}
                    id="previousEducation"
                    rows={4}
                    className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Describe your previous education..."
                  />
                  {errors.previousEducation && <p className="mt-1 text-sm text-error">{errors.previousEducation.message}</p>}
                </div>

                <div>
                  <Label htmlFor="gpa" className="label-caps block mb-2">
                    GPA (0.0 - 4.0) *
                  </Label>
                  <Input {...register('gpa')} id="gpa" type="text" placeholder="3.5" className="w-full" />
                  {errors.gpa && <p className="mt-1 text-sm text-error">{errors.gpa.message}</p>}
                </div>
              </div>
            </div>
          </section>

          {/* Personal Statement */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif mb-6 pb-4 border-b border-primary/10">
              Personal Statement
            </h2>
            <div>
              <Label htmlFor="personalStatement" className="label-caps block mb-2">
                Why do you want to attend Xavier College? *
              </Label>
              <textarea
                {...register('personalStatement')}
                id="personalStatement"
                rows={8}
                className="w-full px-3 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Write your personal statement (minimum 100 characters)..."
              />
              {errors.personalStatement && <p className="mt-1 text-sm text-error">{errors.personalStatement.message}</p>}
            </div>
          </section>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </Button>
            <Link href="/" className="btn-secondary inline-block">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
