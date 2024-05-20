import { Outfit} from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {Toaster} from "sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Money Manager: Budget and Expense",
  description: "Money Management Simplified",
};

export default function RootLayout({ children }) {
  return (
      <ClerkProvider>
        <html lang="en">
        <body className={outfit.className}>
        <Toaster/>
        {children}
        </body>
        </html>
      </ClerkProvider>
  );
}
