import '../styles/globals.css'
import Layout from '../Components/Layout/Layout'
import Main_Header from '../Components/Layout/Main_Header'

function MyApp({ Component, pageProps }) {
  return <Layout>
  <Main_Header/>
  <Component {...pageProps} /></Layout>
}

export default MyApp
