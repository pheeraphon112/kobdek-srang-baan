"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { LogOut, User, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  function getDashboardHref() {
    if (!session?.user) return "/"
    switch (session.user.role) {
      case "ADMIN":
        return "/admin/dashboard"
      case "EMPLOYER":
        return "/employer/dashboard"
      default:
        return "/candidate/dashboard"
    }
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href={session ? getDashboardHref() : "/"}
          className="text-lg font-bold text-cyan-600"
        >
          JobMatching
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-4">
          {session ? (
            <>
              <span className="text-sm text-gray-500">
                {session.user.email}
              </span>
              <span className="text-xs px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded-full font-medium">
                {session.user.role}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="ออกจากระบบ"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/auth/register"
                className="text-sm bg-cyan-600 text-white px-4 py-2 rounded-xl hover:bg-cyan-700 transition-colors"
              >
                สมัครสมาชิก
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="sm:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-3">
          {session ? (
            <>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {session.user.email}
                </span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 text-sm text-red-500"
              >
                <LogOut className="h-4 w-4" />
                ออกจากระบบ
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="block text-sm text-gray-600"
                onClick={() => setMenuOpen(false)}
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/auth/register"
                className="block text-sm text-cyan-600 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                สมัครสมาชิก
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
