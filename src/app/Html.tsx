'use client';

import { useAppSelector } from "@/lib/hooks/hooks";
import { selectTheme } from "@/lib/features/themeSlice";

function Html({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const theme = useAppSelector(selectTheme);

  return (
    <html lang="en" className={theme}>
      <body>
        {children}
      </body>
    </html>
  );

}

export default Html;
