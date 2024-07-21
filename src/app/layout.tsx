import React, { useRef } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/state-management/StoreProvider";
import { makeStore, AppStore } from "@/state-management/store";
import NotificationManager from "@/utils/NotificationManager/NotificationManager";
import AuthProvider from "@/utils/AuthManager/AuthProvider.component";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Header from "@/components/Header/Header.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  console.log("layout session,", session);

  return (
    <React.StrictMode>
      <AuthProvider>
        <StoreProvider session={session}>
          <html lang="en">
            <body className={inter.className}>
              <Header />
              {children}

              <NotificationManager />
            </body>
          </html>
        </StoreProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
