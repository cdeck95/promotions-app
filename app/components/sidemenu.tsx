"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BadgeDollarSign,
  BadgePlus,
  Bell,
  BellRing,
  CalendarPlus,
  CalendarSearch,
  CirclePlus,
  Currency,
  HandCoins,
  Home,
  LayoutDashboard,
  LineChart,
  Medal,
  NotebookText,
  Package2,
  ScrollText,
  Settings,
  Settings2Icon,
  SettingsIcon,
  ShieldCheck,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { use, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
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
import { useTheme } from "next-themes";
import Rush2WagerLogo from "@/public/main_logo_fullsize.png";
import { KindeOrganization } from "../interfaces/KindeOrganization";
import { KindeOrganizations } from "../interfaces/KindeOrganizations";
import { DashboardIcon } from "@radix-ui/react-icons";
import { access } from "fs";
import { isArgumentsObject } from "util/types";

interface ExtendedUser {
  id: string;
  email: string | null;
  given_name: string | null;
  family_name: string | null;
  picture: string | null;
  roles: string[];
}

function SideMenu() {
  const pathname = usePathname();
  // // console.log("pathname: ", pathname);

  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

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

  const [showErrorMessage, setShowErrorMessage] = useState(true);
  const [errorMessage, setErrorMessage] = useState("Testing");

  const {
    getOrganization,
    getUserOrganizations,
    isAuthenticated,
    user,
    accessToken,
  } = useKindeBrowserClient();

  const { toast } = useToast();
  const orgCode = getOrganization() as KindeOrganization;
  // console.log("orgCode at root: ", orgCode);
  const orgCodes = getUserOrganizations() as unknown as KindeOrganizations[];
  // console.log("orgCodes at root: ", orgCodes);

  // console.log("isAuthenticated: ", isAuthenticated);
  // console.log("user: ", user);
  // console.log("accessToken: ", accessToken);

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

  return (
    <div className="hidden border-r bg-muted/40 md:block md:w-3/7 lg:w-1/5">
      <div className="flex max-h-screen flex-col gap-2 ">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
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
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
            {isAuthenticated && (isAdmin || isReadOnly) && (
              <>
                <h2 className="my-4 px-4 text-lg font-semibold tracking-tight">
                  Admin Tools
                </h2>
                {isAdmin && (
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
                )}
                {isAuthenticated && (isAdmin || isReadOnly) && (
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
                )}
                {isAuthenticated && (isAdmin || isReadOnly) && (
                  <Button
                    asChild
                    variant={
                      pathname === "/admin/settings-2" ? "secondary" : "ghost"
                    }
                    className="w-full justify-start flex gap-2 my-1"
                  >
                    <Link
                      href="/admin/settings-2"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <SettingsIcon className="h-4 w-4" />
                      Settings (new)
                    </Link>
                  </Button>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
