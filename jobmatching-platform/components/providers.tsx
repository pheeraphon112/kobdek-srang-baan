"use client"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1a1a1a",
            color: "#f3f4f6",
            border: "1px solid #2a2a2a",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />
    </SessionProvider>
  )
}
