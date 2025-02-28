import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({subsets:['latin']})
export const metadata = {
  title: "AI Career Coach",
  description: "AI Career Coach is a platform that helps you find the best AI jobs and guides you to become a successful AI professional.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme:dark,
    }}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} `}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <footer className="bg-slate-700 text-center py-6">
              <div className="container mx-auto px-4 text-gray-200">
                <p>Made by Darshan K</p>
              </div>
            </footer>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
