import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Envy</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
