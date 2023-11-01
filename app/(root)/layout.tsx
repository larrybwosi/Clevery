import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'
import RightSidebar from '@/components/Sidebars/Right'
import '../globals.css' 
import { Bottombar, LeftSidebar, Topbar } from '@/components/shared'
import { QueryProvider } from '@/lib/react-query/QueryProvider'
import { ReduxProvider } from '@/lib/redux/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clevery',
  description: "Connect with friends",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReduxProvider>
      <QueryProvider>
          <html lang="en">
            <body className={inter.className} >
            <div className="w-full md:flex">
              <Topbar />
              <LeftSidebar />
                <section className="flex flex-1 h-full">
                    {children}
                </section>
                <Bottombar />
              </div>
              <Toaster/>
            </body>
          </html>
      </QueryProvider>
    </ReduxProvider>
  )
}
