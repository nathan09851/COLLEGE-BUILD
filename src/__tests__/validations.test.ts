import { applicationSchema, contactSchema, loginSchema, signupSchema } from '@/lib/validations'

describe('Application Form Validation', () => {
  const validApplication = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
    dateOfBirth: '1990-01-01',
    programInterest: 'Computer Science',
    startTerm: 'Fall 2026',
    previousEducation: 'Bachelor degree in Mathematics',
    institutionName: 'University of Example',
    gpa: '3.5',
    personalStatement: 'This is a valid personal statement that is at least 100 characters long to pass the validation requirements.',
  }

  it('validates a correct application', () => {
    const result = applicationSchema.parse(validApplication)
    expect(result.firstName).toBe('John')
    expect(result.lastName).toBe('Doe')
    expect(result.email).toBe('john@example.com')
    expect(result.programInterest).toBe('Computer Science')
  })

  it('fails with invalid email', () => {
    const invalid = { ...validApplication, email: 'invalid-email' }
    expect(() => applicationSchema.parse(invalid)).toThrow()
  })

  it('fails with short personal statement', () => {
    const invalid = { ...validApplication, personalStatement: 'Too short' }
    expect(() => applicationSchema.parse(invalid)).toThrow()
  })

  it('fails with invalid GPA', () => {
    const invalid = { ...validApplication, gpa: '5.0' }
    expect(() => applicationSchema.parse(invalid)).toThrow()
  })
})

describe('Contact Form Validation', () => {
  const validContact = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Test Subject',
    message: 'This is a test message that is at least 20 characters.',
  }

  it('validates a correct contact form', () => {
    const result = contactSchema.parse(validContact)
    expect(result.name).toBe('John Doe')
    expect(result.email).toBe('john@example.com')
    expect(result.subject).toBe('Test Subject')
  })

  it('fails with short message', () => {
    const invalid = { ...validContact, message: 'Too short' }
    expect(() => contactSchema.parse(invalid)).toThrow()
  })
})

describe('Login Form Validation', () => {
  const validLogin = {
    email: 'user@example.com',
    password: 'password123',
  }

  it('validates a correct login', () => {
    expect(loginSchema.parse(validLogin)).toEqual(validLogin)
  })

  it('fails with short password', () => {
    const invalid = { ...validLogin, password: 'short' }
    expect(() => loginSchema.parse(invalid)).toThrow()
  })
})

describe('Signup Form Validation', () => {
  const validSignup = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'Password123',
    confirmPassword: 'Password123',
  }

  it('validates a correct signup', () => {
    const result = signupSchema.parse(validSignup)
    expect(result.email).toBe('john@example.com')
    expect(result.firstName).toBe('John')
  })

  it('fails with mismatched passwords', () => {
    const invalid = { ...validSignup, confirmPassword: 'different' }
    expect(() => signupSchema.parse(invalid)).toThrow()
  })
})
