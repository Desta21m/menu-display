// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('\n==== MIDDLEWARE TRIGGERED ====');
  console.log('URL:', request.url);
  console.log('Headers:', Object.fromEntries(request.headers.entries()));

  const url = request.nextUrl.clone();
  const subdomain = request.headers.get('x-subdomain')?.toLowerCase();

  console.log('Middleware running for:', request.url);
  console.log('Detected subdomain:', subdomain);

  if (!subdomain || subdomain === 'menumaya') {
    return NextResponse.next();
  }

  // ✅ rewrite to /[subdomain]/original-path
  url.pathname = `/${subdomain}${url.pathname}`;
  console.log('Rewriting to:', url.pathname);

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
