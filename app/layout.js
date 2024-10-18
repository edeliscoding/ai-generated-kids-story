import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import Navigation from "./components/Navigation";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/app/context/authContext";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-slate-100">
          <AuthProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <Navigation />
            {children}
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
