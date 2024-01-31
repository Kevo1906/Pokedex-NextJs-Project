import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from 'next/font/local'
import Layout from "./components/Layout";

const myFont = localFont({ src: '../fonts/victorian_art_magic_remains-webfont.woff' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={myFont.className}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </main>)
}
