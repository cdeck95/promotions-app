"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Rush2WagerLogo from "@/public/main_logo_fullsize.png";
import Link from "next/link";
import {
  CircleUser,
  Fullscreen,
  LogOut,
  Settings,
  Settings2,
  MessageCircleQuestion,
  MoveUpRight,
  Search,
  Bell,
  ClipboardPenLine,
  LineChart,
  Users,
  BadgeDollarSign,
  BadgePlus,
  BellRing,
  Home,
  Menu,
  ScrollText,
  Medal,
  NotebookText,
  ShieldCheck,
  CalendarSearch,
  CalendarPlus,
  LayoutDashboard,
  CirclePlus,
  Settings2Icon,
  HandCoins,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { DialogTrigger } from "@/components/ui/dialog";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@radix-ui/react-label";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { DashboardIcon } from "@radix-ui/react-icons";

interface KindeUser {
  family_name: string;
  given_name: string;
  picture: string;
  email: string;
  id: string;
}

function MenuHeader() {
  const {
    isLoading,
    isAuthenticated,
    user,
    accessToken,
    getAccessToken,
    getToken,
    getOrganization,
    getUserOrganizations,
  } = useKindeBrowserClient();

  // console.log("isAuthenticated: ", isAuthenticated);
  // console.log("user: ", user);
  const aTok = getAccessToken();

  console.log(accessToken, aTok);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      //console.log("width: ", width);
      setIsMobile(width <= 1080);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { theme } = useTheme();

  const pathname = usePathname();

  const [showErrorMessage, setShowErrorMessage] = useState(true);
  const [errorMessage, setErrorMessage] = useState("Testing");

  const { toast } = useToast();
  const orgCode = getOrganization() as unknown as string;
  // // console.log("orgCode at root: ", orgCode);
  const orgCodes = getUserOrganizations() as unknown as string[];
  // // console.log("orgCodes at root: ", orgCodes);

  const [systemTheme, setSystemTheme] = useState("light"); // Default to light theme

  // Step 1: Declare a state variable for the logo
  const [logo, setLogo] = useState(Rush2WagerLogo);

  // useEffect(() => {
  //   // Existing logic to determine if the system theme is dark
  //   if (typeof window !== "undefined") {
  //     if (
  //       window.matchMedia &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches
  //     ) {
  //       setSystemTheme("dark");
  //     } else {
  //       setSystemTheme("light");
  //     }
  //   }

  //   // Step 2 & 3: Move the logo determination logic into the useEffect
  //   const currentLogo =
  //     theme === "system"
  //       ? systemTheme === "dark"
  //         ? DRNDarkLogo
  //         : DRNLightLogo
  //       : theme === "dark"
  //       ? DRNDarkLogo
  //       : DRNLightLogo;

  //   // Update the logo state
  //   setLogo(currentLogo);
  // }, [theme, systemTheme]);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);

  useEffect(() => {
    if (!user || !accessToken) return;

    console.log("user: ", user);
    console.log("accessToken: ", accessToken);

    if (!accessToken.roles) {
      console.log("No roles found in accessToken");
      return;
    }

    const isAdmin = accessToken.roles.some(
      (role) => role.key === "promos-admin"
    );

    console.log("isAdmin: ", isAdmin);

    const isReadOnly = accessToken.roles.some((role) => role.key === "member");

    setIsAdmin(isAdmin);
    setIsReadOnly(isReadOnly);
  }, [user, isAuthenticated, accessToken]);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col overflow-auto">
          <div className="flex h-14 items-center border-b px-1 mr-2 lg:h-[60px] lg:px-6 pb-2 gap-2">
            <div className="flex items-center gap-2 font-semibold tracking-tight">
              <Image
                src={logo}
                width={0}
                height={0}
                alt="Rush 2 Wager"
                style={{ width: "auto", height: "auto", maxHeight: "50px" }}
              />
            </div>
          </div>
          <nav className="grid gap-2 text-lg font-medium">
            <DialogTrigger asChild>
              <Button
                asChild
                variant={pathname === "/" ? "secondary" : "ghost"}
                className="w-full justify-start flex gap-2 my-1"
              >
                <Link
                  href="/"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <NotebookText className="h-4 w-4" />
                  Promos
                </Link>
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button
                asChild
                variant={pathname === "/pricing" ? "secondary" : "ghost"}
                className="w-full justify-start flex gap-2 my-1"
              >
                <Link
                  href="/pricing"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <HandCoins className="h-4 w-4" />
                  Pricing
                </Link>
              </Button>
            </DialogTrigger>
            {isAuthenticated && (isAdmin || isReadOnly) && (
              <>
                <h2 className="my-4 px-4 text-lg font-semibold tracking-tight">
                  Admin Tools
                </h2>
                {isAdmin && (
                  <DialogTrigger asChild>
                    <Button
                      asChild
                      variant={
                        pathname === "/admin/add-promo" ? "secondary" : "ghost"
                      }
                      className="w-full justify-start flex gap-2 my-1"
                    >
                      <Link
                        href="/admin/add-promo"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                      >
                        <CirclePlus className="h-4 w-4" />
                        Add Promo
                      </Link>
                    </Button>
                  </DialogTrigger>
                )}
                {isAuthenticated && (isAdmin || isReadOnly) && (
                  <DialogTrigger asChild>
                    <Button
                      asChild
                      variant={
                        pathname === "/admin/settings" ? "secondary" : "ghost"
                      }
                      className="w-full justify-start flex gap-2 my-1"
                    >
                      <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                      >
                        <Settings2Icon className="h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                  </DialogTrigger>
                )}
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <ModeToggle />
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              {isLoading ? (
                <Skeleton className="h-8 w-8 rounded-full" />
              ) : (
                <Avatar>
                  <AvatarImage
                    src={user?.picture || ""}
                    alt="profile picture"
                  />
                  <AvatarFallback>
                    {user?.given_name?.slice(0, 1)}
                    {user?.family_name?.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              )}

              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem>
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-lg px-1 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="https://www.rush2wager.com/"
                className="flex items-center gap-3 rounded-lg px-1 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <MessageCircleQuestion className="h-4 w-4" />
                Support
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            {isAuthenticated ? (
              <DropdownMenuItem>
                <LogoutLink className="flex flex-row gap-3 items-center text-red-700 rounded-lg px-1 py-2 ">
                  <LogOut className="h-4 w-4" />
                  Log out
                </LogoutLink>
              </DropdownMenuItem>
            ) : (
              <></>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-4">
          <LoginLink>
            <Button
              variant="link"
              size="icon"
              className="w-full justify-start flex gap-2 my-1 p-2"
            >
              Login
            </Button>
          </LoginLink>
          <RegisterLink>
            <Button
              variant="default"
              size="icon"
              className="w-full justify-start flex gap-2 my-1 p-2"
            >
              Sign up
            </Button>
          </RegisterLink>
        </div>
      )}
    </header>
  );
}
export default MenuHeader;
