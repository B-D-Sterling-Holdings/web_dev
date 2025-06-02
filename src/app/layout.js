// src/app/layout.js
import '@/styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>B.D. Sterling</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
