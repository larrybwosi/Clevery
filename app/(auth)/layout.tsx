import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import '../globals.css' 
import { QueryProvider } from '@/lib/react-query/QueryProvider'
import AuthLayout from '@/components/_auth/AuthLayout'
import { ReduxProvider } from '@/lib/redux/Provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'authentication',
  description: "Welcome back",
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
              <AuthLayout>
                    {children}
              </AuthLayout>
              <Toaster/>
            </body>
          </html>
      </QueryProvider>
    </ReduxProvider>
  )
}
