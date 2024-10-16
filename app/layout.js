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
import { AuthContextProvider } from "./context/authContext";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <AuthContextProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <Navigation />
            {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
            {children}
          </AuthContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
