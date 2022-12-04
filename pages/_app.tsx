import { Montserrat } from '@next/font/google'
import { AppProps } from 'next/app'
import '../styles/globals.css'
const custom_font = Montserrat({
  subsets: ['latin'],
})
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --custom-font: ${custom_font.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />;
    </>
  )
}
export default MyApp
