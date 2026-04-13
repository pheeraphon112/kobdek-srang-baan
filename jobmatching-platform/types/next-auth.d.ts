import { Role } from "@prisma/client"
import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      role: Role
      pdpaConsent: boolean
      profileComplete: boolean
    }
  }

  interface User {
    role: Role
    pdpaConsent: boolean
    profileComplete: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: Role
    pdpaConsent: boolean
    profileComplete: boolean
  }
}
