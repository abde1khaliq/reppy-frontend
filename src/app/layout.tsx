import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AppProviders } from "./providers";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reppy – Train Smarter, Together",
  icons: {
    icon: "/reppyLogoNew.png",
  },
  description:
    "Reppy is the modular fitness hub where progress meets community. Visualize workouts, gamify your goals, and stay motivated with co-op training.",
  keywords: [
    "Reppy",
    "fitness platform",
    "modular workouts",
    "progress visualization",
    "gamified training",
    "co-op fitness",
    "community health",
    "dashboard tracking",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.variable}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
