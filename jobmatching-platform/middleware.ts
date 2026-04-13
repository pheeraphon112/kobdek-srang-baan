import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth
    const { pathname } = req.nextUrl

    // ── Logged-in users on auth/landing pages → redirect to dashboard ──
    if ((pathname === "/" || pathname.startsWith("/auth")) && token) {
      return NextResponse.redirect(
        new URL(getDashboard(token.role as string), req.url)
      )
    }

    if (!token) return NextResponse.next()

    const role = token.role as string
    const pdpa = token.pdpaConsent as boolean

    // ── PDPA guard: no consent → force PDPA page ──
    if (!pdpa && pathname !== "/onboarding/pdpa") {
      return NextResponse.redirect(new URL("/onboarding/pdpa", req.url))
    }

    // ── Already completed PDPA? Don't let them revisit ──
    if (pdpa && pathname === "/onboarding/pdpa") {
      return NextResponse.redirect(new URL(getDashboard(role), req.url))
    }

    // ── Profile guard for CANDIDATE ──
    // Candidates without a profile must go to /candidate/profile/create
    // We check this via a custom header set by the JWT callback
    const profileComplete = token.profileComplete as boolean
    if (
      role === "CANDIDATE" &&
      pdpa &&
      !profileComplete &&
      pathname !== "/candidate/profile/create"
    ) {
      return NextResponse.redirect(
        new URL("/candidate/profile/create", req.url)
      )
    }

    // ── Role-based route guards ──
    if (pathname.startsWith("/candidate") && role !== "CANDIDATE" && role !== "ADMIN") {
      return NextResponse.redirect(new URL(getDashboard(role), req.url))
    }

    if (pathname.startsWith("/employer") && role !== "EMPLOYER" && role !== "ADMIN") {
      return NextResponse.redirect(new URL(getDashboard(role), req.url))
    }

    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL(getDashboard(role), req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        // Public routes (all /api/* excluded via matcher)
        if (pathname === "/" || pathname.startsWith("/auth")) {
          return true
        }
        return !!token
      },
    },
  }
)

function getDashboard(role: string): string {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard"
    case "EMPLOYER":
      return "/employer/dashboard"
    default:
      return "/candidate/dashboard"
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
}
