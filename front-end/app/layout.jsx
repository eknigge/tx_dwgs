import React from 'react'
import './globals.css'
import { Poppins } from 'next/font/google'
import Header from './components/Header'

const poppins = Poppins({
  weight: ['400', '700'],
  styles: ['normal', 'bold'],
  subsets: ['latin']
})

export const metadata = {
  title: 'Snohomish PUD',
  description: 'Snohomish PUD Drawing Locator Tool'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
