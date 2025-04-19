import { NextRequest, NextResponse } from 'next/server';
import rateLimit from './services/api/rate_limit';
import { auth } from './services/authentication/admin_config';
import callHub from './services/api/call_hub';
//
export async function middleware(req: NextRequest) {

///----------------------------------------------------------------
// Check in case of subrequest
///----------------------------------------------------------------
const path = req.nextUrl.pathname;
let rateLimitResponse: NextResponse;
let response: NextResponse = NextResponse.next();
const database_url = process.env.NEXT_PUBLIC_databaseURL;
const database_2_url = process.env.NEXT_PUBLIC_FIREBASE_DeCav_databaseURL;
console.log('pathname', path);
console.log('database', database_2_url, 'database2', database_url);


// if(path.startsWith('/dashboard') || path.startsWith('/playbook') || path.startsWith('/read-playbook')) {
//   //Get the previous path
//     console.log('doing /path', path);
//     console.log('Headers:', Object.fromEntries(req.headers.entries()));
//     const headers=  Object.fromEntries(req.headers.entries());
//     const next_url = headers["next-url"];
//     console.log('next_url', next_url);

    
//     if(next_url == '/home'){
//       const url = req.nextUrl; // Access the full URL
//       const sessionId = url.searchParams.get('id');  
//       const response = await callHub("auth-middleware", {auth: true, sessionId: sessionId});
//   // const referrer = req.headers.get("referer");
//   // console.log('referrre', referrer);
  
//   // const referrerUrl = referrer ? new URL(referrer) : null;
//   // const referrerPAth = referrerUrl?.pathname;
//   // console.log('refpath', referrerPAth);
  
//   // console.log(`access to ${path} from referrer ${referrerPAth}`);
//   // if (referrerPAth === '/home'){
//   console.log('response at middleware', response);
  
//     if(response.status === 200){
//     return NextResponse.next();
//   } else {
//     return NextResponse.redirect(new URL('/', req.url));
//   }
//   } else {
//     return NextResponse.redirect(new URL('/', req.url));
//   }
// }
//
const header = req.headers;
const isSubRequest = header.get('x-middleware-subrequest');
if (isSubRequest) {
  const origin = header.get('origin') || header.get('referer');
  console.log('origin at middlewre', origin);
  
  const url = process.env.NEXT_PUBLIC_api_url;

  if (!origin || origin != url) {
    return NextResponse.json({ status: 403, error: 'Unauthorized request' });
  }
}
///----------------------------------------------------------------
///------ Check for any rate limits on other paths ----------------
///----------------------------------------------------------------
    //Apply rate Limit.
    rateLimitResponse = await rateLimit(req);
///----------------------------------------------------------------
///------ Add headers ----------------
///----------------------------------------------------------------
    response.headers.set(
      'Content-Security-Policy',
      `
      default-src 'self';
      script-src 'self';
      style-src 'self';
      img-src 'self';
      font-src 'self';
      connect-src 'self' ${database_url} ${database_2_url};
      object-src 'none';
      base-uri 'self';
      form-action 'self';            
      frame-ancestors 'self';
      upgrade-insecure-requests;
      block-all-mixed-content;
      `.replace(/\s{2,}/g, ' ').trim()
    );
    return response;
};

export const config = {
  matcher: ['/api/post', '/api/save', '/dashboard', '/playbook', '/read-playbook'],
};
