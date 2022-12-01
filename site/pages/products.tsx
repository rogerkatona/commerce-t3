import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCardSmall } from '@components/product'
import Quote from "components/myComponents/quote";
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Hero from "@components/myComponents/hero";


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
  const { products} = await productsPromise
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

export default function Products({products,}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (

    <>
      <header className="bg-hero-services min-h-screen25vh max-h-screen25vh bg-cover bg-right bg-no-repeat">
        <Hero id={4}/>
      </header>
      <Quote id={2}/>
      {products.map((product: any, i: number) => (
        <div
          key={product.id}
          >
          <div>
            <ProductCardSmall
              product={product}
            />
          </div>
        </div>

      ))}

    </>
  )
}

Products.Layout = Layout
