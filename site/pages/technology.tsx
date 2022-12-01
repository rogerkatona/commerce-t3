import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import Hero from "../components/myComponents/hero";
import Service from "../components/myComponents/service";
import Quote from "../components/myComponents/quote";
import Promo from "../components/myComponents/promo";

export async function getStaticProps({
                                       preview,
                                       locale,
                                       locales,
                                     }: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories },
  }
}

export default function Services() {
  const { data } = useCustomer()
  return (
    <Container className="bg-white">
      <header className="bg-hero-technology min-h-screen25vh max-h-screen25vh bg-cover bg-right bg-no-repeat">
        <Hero id={2}/>
      </header>
      <div className="text-center font-bebasNeue text-6xl text-gray-700 bg-gray-200 py-12">
        Patents
      </div>
      <Service type="technology" subtype="patent"/>
      <Quote id={3}/>
      <div className="text-center font-bebasNeue text-6xl text-gray-700 bg-gray-200 py-12">
        Technology
      </div>
      <Service type="technology" subtype="technology"/>
      <Promo id={1}/>
    </Container>
  )
}

Services.Layout = Layout
