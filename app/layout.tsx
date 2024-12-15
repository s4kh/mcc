import type { Metadata } from "next";
import localFont from "next/font/local";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Merchant Category Search',
  description: 'Find out how different card issuers categorize merchants in Canada.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReCaptchaProvider reCaptchaKey="6Lds-ZsqAAAAACHsGaoUOglCkFxzIl5Ts3Ztuoad">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="container mx-auto p-4">
              {children}
          </div>
        </body>
      </ReCaptchaProvider>
    </html>
  );
}
