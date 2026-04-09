'use client';

import { useSelector } from "react-redux";
import { selectTheme } from "@/lib/features/themeSlice";
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

function Html({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const theme = useSelector(selectTheme);

  return (
    <html lang="en" className={theme}>
      <body className={geistSans.variable}>
        {children}
      </body>
    </html>
  );
}

export default Html;
