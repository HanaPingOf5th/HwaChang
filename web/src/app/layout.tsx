import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HwaChang",
  description: "Digital Hanaro First Team Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
