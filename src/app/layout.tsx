import type { Metadata, Viewport } from "next";
import { Public_Sans, Carter_One } from "next/font/google";
import "./globals.css";
import TopBar from "@/shared/components/TopBar/TopBar";
import TopBarSide from "@/shared/components/TopBar/Subcomponents/TopBarSide";
import TopBarMid from "@/shared/components/TopBar/Subcomponents/TopBarMid";
import Logo from "@/shared/components/Logo";
import { Toaster } from "react-hot-toast";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import DatePickerProvider from "@/shared/providers/DatePickerProvider";
import MountTestCommands from "@/lib/test/MountTestCommands";
import ModalContext from "@/shared/providers/ModalContext/ModalContext";
import Modals from "@/components/Modals/Modals";

const carterOne = Carter_One({
  weight: "400", // Default weight for Carter One
  subsets: ["latin"],
  variable: "--font-carter-one", // Define a CSS variable
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});

const APP_NAME = "Worklog";
const APP_DEFAULT_TITLE = "Worklog";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "A Progressive Web App built with Next.js";

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
  themeColor: "#FFFFFF",
  userScalable: false,
};

const versionNumber = "1.0.0";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir="ltr">
      <body
        className={`${carterOne.variable} ${publicSans.variable} antialiased bg-white text-black font-publicSans h-dvh w-dvw flex flex-col overflow-hidden items-center`}
      >
        <DatePickerProvider>
          <NuqsAdapter>
            <MountTestCommands />
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
              <TopBarSide className="flex">
                <p className="pt-2 mx-auto text-xs opacity-45">
                  {versionNumber}
                </p>
              </TopBarSide>
            </TopBar>
            <Toaster position="top-right" />
            <NextIntlClientProvider>
              <ModalContext>
                <Modals />
                {children}
              </ModalContext>
            </NextIntlClientProvider>
          </NuqsAdapter>
        </DatePickerProvider>
      </body>
    </html>
  );
}
