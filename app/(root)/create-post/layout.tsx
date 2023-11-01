export const metadata = {
    title: 'Clevery-create a new post',
    description: 'All the websites content',
  }
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }
  