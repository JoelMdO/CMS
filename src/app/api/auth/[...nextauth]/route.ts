import "server-only";
import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/nextauth/auth";
//

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
