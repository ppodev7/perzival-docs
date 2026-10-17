import type { Metadata } from "next"
import { JetBrains_Mono, Onest } from "next/font/google"
import "./globals.css"

const onest = Onest({ variable: "--font-onest", subsets: ["latin"] })
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Perzival",
  description: "Documentação a partir do que está na sua tela.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${onest.variable} ${jetbrains.variable} font-sans`}>{children}</body>
    </html>
  )
}
