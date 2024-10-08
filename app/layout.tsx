import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import MenuHeader from "./components/menuheader";
import SideMenu from "./components/sidemenu";
import { Toaster } from "@/components/ui/toaster";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";
import QueryClientProvider from './providers/query-client-provider';


const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Rush 2 Wager | Promotions App";
const APP_DEFAULT_TITLE = "Rush 2 Wager | Promotions App";
const APP_TITLE_TEMPLATE = "%s - Promotions App";
const APP_DESCRIPTION = "The best sportsbook promotions in one place!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  generator: "Next.js",
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "webicon.png" },
    { rel: "icon", url: "webicon.png" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

const { getAccessToken, getUser } = getKindeServerSession();
const accessToken = await getAccessToken();
const user = await getUser();

console.log("Access Token: ", accessToken);
console.log("User: ", user);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider>
          <Toaster />
          <div className="flex row-auto w-full h-full">
            <SideMenu />
            <div className="w-full">
              <MenuHeader />
              <main className="p-0 main-overflow">
                <ScrollArea className="w-full h-full">
                  <Suspense>{children}</Suspense>
                </ScrollArea>
              </main>
            </div>
          </div>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
