import type { Metadata, Viewport } from "next";
import { Public_Sans, Carter_One } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Menu, NotebookText, TableProperties } from "lucide-react";
import HiddenButton from "@/components/HiddenButton";

const carterOne = Carter_One({
  weight: "400", // Default weight for Carter One
  subsets: ["latin"],
  variable: "--font-carter-one", // Define a CSS variable
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});

const APP_NAME = "PWA App";
const APP_DEFAULT_TITLE = "My Awesome PWA App";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
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

export const viewport: Viewport = {
  themeColor: "#2C2A2A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${carterOne.variable} ${publicSans.variable} antialiased bg-[#2C2A2A] text-black h-screen px-3`}
      >
        <nav className="navbar text-tresLight font-publicSans px-0">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">
              <Menu />
            </Link>
          </div>
          <HiddenButton>
            <div className="flex-1 flex-col">
              <p className="font-carterOne text-tresYellow text-base">
                TRES AMIGOS
              </p>
              <p className="flex justify-center items-center text-xl gap-1 font-bold">
                <NotebookText height={20} width={20} />
                WorkLog
              </p>
            </div>
          </HiddenButton>

          <div className="flex-1 flex-row-reverse">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link className="btn btn-ghost" href="/entries">
                  <TableProperties />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
