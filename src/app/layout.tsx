import type { Metadata, Viewport } from "next";
import { Public_Sans, Carter_One } from "next/font/google";
import "./globals.css";
import TopBar from "@/shared/components/TopBar/TopBar";
import TopBarSide from "@/shared/components/TopBar/Subcomponents/TopBarSide";
import TopBarMid from "@/shared/components/TopBar/Subcomponents/TopBarMid";
import Logo from "@/shared/components/Logo";
import { Toaster } from "react-hot-toast";

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
        className={`${carterOne.variable} ${publicSans.variable} antialiased bg-white text-black font-publicSans h-dvh w-dvw flex flex-col overflow-hidden`}
      >
        <TopBar>
          <TopBarSide />
          <TopBarMid>
            <Logo
              style={{
                textShadow:
                  "2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black, 0px 2px 0px black, 2px 0px 0px black, 0px -2px 0px black, -2px 0px 0px black",
              }}
              className="text-[18px] md:text-[26px]"
            />
          </TopBarMid>
          <TopBarSide />
        </TopBar>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
