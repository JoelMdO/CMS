import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation"; // For redirection
import { cookies } from "next/headers";
const logout = async () => {
    try {
    const router = useRouter();
    const auth = getAuth();
    await signOut(auth); // Firebase sign out

      // Clear the authentication cookies
    const cookieStore = await cookies();
    cookieStore.delete("token");
    cookieStore.delete("start");

    console.log("✅ User logged out");

      // Redirect to login page
    router.push("/");
    } catch (error) {
    console.error("❌ Logout failed:", error);
    }
};

export default logout()