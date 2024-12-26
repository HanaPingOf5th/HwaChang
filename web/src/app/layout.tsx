import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import { cn } from "./utils/style";
import { ConsultingRoomStoreProvider } from "./stores/consulting-room.provider";

const globalFont = localFont({
  src: './PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});


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
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/event-source-polyfill/0.0.9/eventsource.min.js"></script>
      </head>
      <body className={cn(globalFont.variable, 'font-pretendard')}>
        <ConsultingRoomStoreProvider>
          {children}
        </ConsultingRoomStoreProvider>
      </body>
    </html>
  );
}
