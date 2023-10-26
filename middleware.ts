import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerSession } from "next-auth/next"


export async function middleware(request: NextRequest) {
  /*
  if (request.nextUrl.pathname.startsWith('/api/checkout_sessions/cart')) {
    return NextResponse.rewrite(new URL('/login', request.url))
  }
 
  if (request.nextUrl.pathname.startsWith('/api/webhooks')) {
    return NextResponse.rewrite(new URL('/login', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/success')) {
    return NextResponse.rewrite(new URL('/login', request.url))
  }
 */
}
 