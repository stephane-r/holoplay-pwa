import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from "../components/Layout"

const Home = () => {
    return(
        <Layout>
        <h1>Hello from next</h1>
        </Layout>
    )
}

export async function getStaticProps({ locale }: any) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common',])),
      },
    }
  }

export default Home;