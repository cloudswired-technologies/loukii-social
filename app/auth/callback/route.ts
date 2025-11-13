import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
    
    // Get user data to determine redirect
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const userType = user.user_metadata?.user_type;
      const email = user.email;
      
      // Redirect based on role
      if (email === "admin@loukii.com") {
        return NextResponse.redirect(new URL("/dashboard/admin", requestUrl.origin));
      } else if (userType === "advisor") {
        return NextResponse.redirect(new URL("/dashboard/advisor", requestUrl.origin));
      } else {
        return NextResponse.redirect(new URL("/dashboard/reviewer", requestUrl.origin));
      }
    }
  }

  // Fallback redirect
  return NextResponse.redirect(new URL("/", requestUrl.origin));
}
