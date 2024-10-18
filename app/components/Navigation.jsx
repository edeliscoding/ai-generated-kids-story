// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { UserButton, useAuth } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Menu } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useContext, useState } from "react";
// import { AuthContext } from "../context/authContext";
// import Credits from "./Credits";

// export default function Navigation() {
//   const { isSignedIn } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   const NavItems = () => (
//     <>
//       <NavigationMenuItem>
//         <Link href="/" legacyBehavior passHref>
//           <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//             Home
//           </NavigationMenuLink>
//         </Link>
//       </NavigationMenuItem>
//       <NavigationMenuItem>
//         <Link href="/create-story" legacyBehavior passHref>
//           <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//             Create Story
//           </NavigationMenuLink>
//         </Link>
//       </NavigationMenuItem>
//       <NavigationMenuItem>
//         <Link href="/explore-stories" legacyBehavior passHref>
//           <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//             Explore Stories
//           </NavigationMenuLink>
//         </Link>
//       </NavigationMenuItem>
//       <NavigationMenuItem>
//         <Link href="/contact-us" legacyBehavior passHref>
//           <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//             Contact Us
//           </NavigationMenuLink>
//         </Link>
//       </NavigationMenuItem>
//     </>
//   );

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto flex h-14 items-center">
//         <div className="mr-4  items-center hidden md:block">
//           <Link href="/" className="mr-6 flex items-center space-x-2">
//             <Image
//               src="/childrenstorylogo.webp"
//               width={32}
//               height={32}
//               alt="children story logo"
//             />
//             <span className="hidden font-bold sm:inline-block">
//               Kids Story Imagined
//             </span>
//           </Link>
//         </div>
//         <div className="hidden md:flex">
//           <NavigationMenu>
//             <NavigationMenuList>
//               <NavItems />
//             </NavigationMenuList>
//           </NavigationMenu>
//         </div>
//         <div className="flex flex-1 items-center justify-end space-x-2">
//           <div className="w-full flex-1 md:w-auto md:flex-none">
//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild>
//                 <Button variant="outline" size="icon" className="md:hidden">
//                   <Menu className="h-5 w-5" />
//                   <span className="sr-only">Toggle navigation menu</span>
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="left">
//                 <nav className="flex flex-col space-y-4">
//                   <NavItems />
//                 </nav>
//               </SheetContent>
//             </Sheet>
//           </div>
//           {isSignedIn && <Credits />}
//           <nav className="flex items-center gap-4">
//             {isSignedIn ? (
//               <Button asChild>
//                 <Link href="/dashboard">Dashboard</Link>
//               </Button>
//             ) : (
//               <Button asChild>
//                 <Link href="/dashboard">Get Started</Link>
//               </Button>
//             )}
//             <UserButton />
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }
"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Credits from "./Credits";

export default function Navigation() {
  const { isSignedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const NavItems = () => (
    <>
      <NavigationMenuItem>
        <Link href="/" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Home
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/create-story" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Create Story
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/explore-stories" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Explore Stories
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/contact-us" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Contact Us
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex first-line:items-center space-x-2">
            <Image
              src="/childrenstorylogo.webp"
              width={32}
              height={32}
              alt="children story logo"
              className="hidden md:block"
            />
            <span className="hidden font-bold sm:inline-block">
              Kids Story Imagined
            </span>
          </Link>
        </div>
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavItems />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center space-x-4">
          {isSignedIn && <Credits />}
          <nav className="flex items-center gap-4">
            {isSignedIn ? (
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
            )}
            <UserButton />
          </nav>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-6">
                <Link
                  href="/"
                  className="text-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/create-story"
                  className="text-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Create Story
                </Link>
                <Link
                  href="/explore-stories"
                  className="text-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Explore Stories
                </Link>
                <Link
                  href="/contact-us"
                  className="text-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
