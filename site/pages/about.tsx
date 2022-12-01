import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import Hero from "../components/myComponents/hero";
import aboutItems from "../data/aboutItems";
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

export default function About() {
  const { data } = useCustomer()
  let filteredItem = aboutItems.filter(function (item){
    return item.isActive === 'true'
  });
  return (
    <Container className="bg-white">
      <div className="bg-hero-about min-h-screen40vh max-h-screen40vh bg-cover bg-right bg-no-repeat">
        <Hero id={3}/>
      </div>

      <section className="max-w-7xl mx-auto py-16">
        {filteredItem
          .map(filteredItem => (

            <div
              key={filteredItem.id}
              className={`flex flex-col pb-12 ${filteredItem.activeID % 2 === 0  ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>

              <div className=''>
                <img
                  src={filteredItem.src}
                  width={800}
                  alt={'FryTech'}
                />
              </div>

              <div className="lg:w-4/5 w-full">
                <div className='lg:text-3xl text-2xl text-gray-500 tracking-wide bg-gray-100 lg:p-12 p-4'>{filteredItem.callOut}</div>
                <p className="lg:p-12 p-4 pt-6 text-gray-700">{filteredItem.text}</p>
              </div>
            </div>

          ))}
      </section>

      <div className="bg-gray-050 -mt-12 ">
        <Promo id={0}/>
      </div>

    </Container>
  )
}

About.Layout = Layout
