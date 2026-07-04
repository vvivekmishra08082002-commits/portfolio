import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || "default_secret_key_123456789",
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: "OTP Login",
      credentials: {
        phone: { label: "Phone Number", type: "text" },
        otp: { label: "OTP", type: "text" }
      },
      async authorize(credentials) {
        if (
          credentials?.phone === "8103791984" &&
          credentials?.otp === "9300623115"
        ) {
          return { id: "1", name: "Admin" };
        }
        return null;
      }
    })
  ],
});

export { handler as GET, handler as POST };
