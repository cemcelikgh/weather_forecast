import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";

export const metadata: Metadata = {
  title: 'Hava Tahmini',
  icons: {
    icon: '/cloud-sun-rain-solid.svg',
  },
};

function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  );
}

export default RootLayout;
