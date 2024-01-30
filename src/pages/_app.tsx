import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from 'next/font/local'

const myFont = localFont({ src: '../fonts/victorian_art_magic_remains-webfont.woff' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>)
}
