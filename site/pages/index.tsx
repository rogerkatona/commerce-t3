import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCardFeature } from '@components/product'
import HeroIndex from "components/myComponents/hero_index"
import Features from "components/myComponents/features";
import Quote from "components/myComponents/quote";
import Promo from "components/myComponents/promo";
import Banner from "components/myComponents/banner";
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'


export async function getStaticProps({
                                       preview,
                                       locale,
                                       locales,
                                     }: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({products,}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <HeroIndex/>
      <Banner  featured="true" type="banner"/>
      {products.slice(0, 1).map((product: any, i: number) => (
        <div
          key={product.id}
          className="bg-newGunmetal.800">
          <div className='max-w-7xl mx-auto md:pb-24 pb-12 md:pt-0 pt-12'>
            <ProductCardFeature
              product={product}
            />
          </div>
        </div>
      ))}
      <Quote id={0}/>
      <Features  featured="true" type="technology"/>
      <Promo id={0} />
      <Features  featured="true" type="service"/>
      <Promo id={1}/>




    </>
  )
}

Home.Layout = Layout
