import { z } from 'zod'

// Application form validation schema
export const applicationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date (YYYY-MM-DD)'),
  programInterest: z.string().min(1, 'Please select a program'),
  startTerm: z.string().min(1, 'Please select a start term'),
  previousEducation: z.string().min(10, 'Please provide your education background'),
  institutionName: z.string().min(2, 'Please enter your institution name'),
  gpa: z.string().regex(/^\d(\.\d{1,2})?$/, 'GPA must be between 0.0 and 4.0'),
  personalStatement: z.string().min(100, 'Personal statement must be at least 100 characters'),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

export type ContactFormData = z.infer<typeof contactSchema>

// Login form validation schema
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>

// Signup form validation schema
export const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type SignupFormData = z.infer<typeof signupSchema>
