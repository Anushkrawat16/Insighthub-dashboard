import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";

const buildCredentialsAuth = () =>
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Please provide both email and password.");
      }

      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
      });

      if (!user || !user.passwordHash) {
        throw new Error("Invalid credentials");
      }

      const isValid = await bcrypt.compare(
        credentials.password,
        user.passwordHash
      );

      if (!isValid) {
        throw new Error("Invalid credentials");
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    },
  });

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    buildCredentialsAuth(),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "USER";
        token.id = user.id;
      } else {
        const existing = await prisma.user.findUnique({
          where: { email: token.email },
          select: { role: true, id: true },
        });
        token.role = existing?.role || "USER";
        token.id = existing?.id || token.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id || token.sub;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export const auth = () => getServerSession(authOptions);

export { handler as GET, handler as POST };

