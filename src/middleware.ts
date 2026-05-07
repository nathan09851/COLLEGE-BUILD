import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse } from 'next/server'

// Rate limiting store (in-memory, reset on deploy)
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 100 // requests per minute per IP

function rateLimitCheck(ip) {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW
  
  // Clean old entries
  for (const [key, timestamp] of rateLimitMap.entries()) {
    if (timestamp < windowStart) {
      rateLimitMap.delete(key)
    }
  }
  
  // Count requests in current window
  const requestCount = Array.from(rateLimitMap.entries()).filter(
    ([key]) => key.startsWith(ip) && rateLimitMap.get(key) > windowStart
  ).length
  
  if (requestCount >= MAX_REQUESTS) {
    return false
  }
  
  rateLimitMap.set(`${ip}-${now}`, now)
  return true
}

export async function middleware(request) {
  // Get client IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  
  // Rate limiting check for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (!rateLimitCheck(ip)) {
      return new NextResponse(
        JSON.stringify({ error: 'Rate limit exceeded' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
          },
        }
      )
    }
  }
  
  // Get the response from session update
  const response = await updateSession(request)
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // Add CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_SITE_URL || '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }
  
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
