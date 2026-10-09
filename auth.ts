import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Microsoft from "next-auth/providers/microsoft-entra-id";
import Apple from "next-auth/providers/apple";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Microsoft({
      clientId: process.env.MICROSOFT_ENTRA_ID,
      clientSecret: process.env.MICROSOFT_ENTRA_SECRET,
      tenantId: process.env.MICROSOFT_ENTRA_TENANT_ID,
    }),
    Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/",
    error: "/auth-error",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || "";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Only allow redirects to same origin
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl + "/dashboard";
    },
  },
});
