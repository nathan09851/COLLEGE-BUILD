'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import { signupSchema, type SignupFormData } from '@/lib/validations'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function SignupPage() {
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    setError('')

    const supabase = createClient()
    
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          role: 'student',
        },
      },
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

    router.push('/apply')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-2xl font-serif font-semibold tracking-tight text-primary">
            Xavier <span className="italic">College</span>
          </Link>
          <h2 className="mt-6 text-3xl font-serif font-medium text-primary">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-primary/60">
            Already have an account?{' '}
            <Link href="/login" className="text-secondary hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="label-caps block mb-2">
                  First Name
                </Label>
                <Input
                  {...register('firstName')}
                  id="firstName"
                  type="text"
                  className="w-full"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-error">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName" className="label-caps block mb-2">
                  Last Name
                </Label>
                <Input
                  {...register('lastName')}
                  id="lastName"
                  type="text"
                  className="w-full"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-error">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="label-caps block mb-2">
                Email Address
              </Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                autoComplete="email"
                className="w-full"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="label-caps block mb-2">
                Password
              </Label>
              <Input
                {...register('password')}
                id="password"
                type="password"
                className="w-full"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-error">{errors.password.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="label-caps block mb-2">
                Confirm Password
              </Label>
              <Input
                {...register('confirmPassword')}
                id="confirmPassword"
                type="password"
                className="w-full"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-error">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary"
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <div className="text-center">
          <Link href="/" className="text-sm text-primary/60 hover:text-primary">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
