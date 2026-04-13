import { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { candidateProfile: true },
        })

        if (!user) return null

        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          pdpaConsent: user.pdpaConsent,
          profileComplete: user.candidateProfile?.onboardingComplete ?? false,
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.pdpaConsent = user.pdpaConsent
        token.profileComplete = user.profileComplete
      }
      // Allow client-side session updates
      if (trigger === "update" && session) {
        if (session.pdpaConsent !== undefined) token.pdpaConsent = session.pdpaConsent
        if (session.profileComplete !== undefined) token.profileComplete = session.profileComplete
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role
        session.user.pdpaConsent = token.pdpaConsent as boolean
        session.user.profileComplete = token.profileComplete as boolean
      }
      return session
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
}
