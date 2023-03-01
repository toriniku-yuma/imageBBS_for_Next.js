import '../styles/thread.css'
import '../styles/globals.css'
import "../styles/emission.css"
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }:AppProps) {
  return <Component {...pageProps} />
}

export default MyApp