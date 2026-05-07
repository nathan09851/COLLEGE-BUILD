import { z } from 'zod'

// Security: Input sanitization helper
const sanitizeString = (str: string) => {
  return str.trim().replace(/[<>]/g, '')
}

// Application form validation schema with enhanced security
export const applicationSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(sanitizeString),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(sanitizeString),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
  phone: z.string()
    .min(10, 'Please enter a valid phone number')
    .max(15, 'Phone number is too long')
    .regex(/^[\d\s\-+()]+$/, 'Invalid phone number format'),
  dateOfBirth: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date (YYYY-MM-DD)'),
  programInterest: z.string()
    .min(1, 'Please select a program')
    .max(100, 'Program name too long'),
  startTerm: z.string()
    .min(1, 'Please select a start term')
    .max(50, 'Term name too long'),
  previousEducation: z.string()
    .min(10, 'Please provide your education background')
    .max(1000, 'Education description must not exceed 1000 characters')
    .transform(sanitizeString),
  institutionName: z.string()
    .min(2, 'Please enter your institution name')
    .max(200, 'Institution name must not exceed 200 characters')
    .transform(sanitizeString),
  gpa: z.string()
    .regex(/^([0-3]\.\d{1,2}|4\.0?)$/, 'GPA must be between 0.0 and 4.0'),
  personalStatement: z.string()
    .min(100, 'Personal statement must be at least 100 characters')
    .max(5000, 'Personal statement must not exceed 5000 characters')
    .transform(sanitizeString),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>

// Contact form validation schema with security enhancements
export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(sanitizeString),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters'),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must not exceed 200 characters')
    .transform(sanitizeString),
  message: z.string()
    .min(20, 'Message must be at least 20 characters')
    .max(3000, 'Message must not exceed 3000 characters')
    .transform(sanitizeString),
})

export type ContactFormData = z.infer<typeof contactSchema>

// Login form validation schema with security
export const loginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must not exceed 128 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>

// Signup form validation schema with password strength
export const signupSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(sanitizeString),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(sanitizeString),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must not exceed 128 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type SignupFormData = z.infer<typeof signupSchema>

// ID validation for URLs
export const idSchema = z.string().uuid('Invalid ID format')

// Pagination params
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
})

export type PaginationParams = z.infer<typeof paginationSchema>
