import cn from 'clsx'
import Image from 'next/image'
import s from './ProductViewMain.module.css'
import { FC } from 'react'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import { ProductSliderMain } from '@components/product'
import { Container, Text } from '@components/ui'
import { SEO } from '@components/common'
import ProductSidebarMain from '../ProductSidebarMain'

interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
}

const ProductViewMain: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  return (
    <>
      <div className="bg-gray-50">
        <div className="flex flex-col justify-center max-w-7xl mx-auto lg:px-0  px-6 py-12">
          <div className="font-bebasNeue md:text-4xl text-3xl uppercase text-gray-700">
            Are you considering a custom design for your gun?
          </div>
          <div className="text-gray-600 lg:w-3/4 w-full">Work with a Fry Tech master painter to customize your gun parts and create a masterpiece of your own. Whether it’s a single color or blended, layered shades that you are after, Fry Tech will come up with a custom design that exceeds your vision.</div>

        </div>

      </div>
      <Container className="mx-auto max-w-7xl" clean>
        <div className={cn(s.root, 'fit')}>
          <div className={cn(s.main, 'fit')}>
{/*            <ProductTag
              name={product.name}
              price={`${price} ${product.price?.currencyCode}`}
              fontSize={32}
            />*/}
            <div className={s.sliderContainer}>
              <ProductSliderMain key={product.id}>
                {product.images.map((image, i) => (
                  <div key={image.url} className={s.imageContainer}>
                    <Image
                      className={s.img}
                      src={image.url!}
                      alt={image.alt || 'Product Image'}
                      width={750}
                      height={750}
                      priority={i === 0}
                      quality="85"
                    />
                  </div>
                ))}
              </ProductSliderMain>
            </div>
          </div>

          <ProductSidebarMain
            key={product.id}
            product={product}
            className={s.sidebar}
          />
        </div>
{/*        <hr className="mt-7 border-accent-2" />
        <section className="py-12 px-6 mb-10">
          <Text variant="sectionHeading">Related Products</Text>
          <div className={s.relatedProductsGrid}>
            {relatedProducts.map((p) => (
              <div
                key={p.path}
                className="animated fadeIn bg-accent-0 border border-accent-2"
              >
                <ProductCard
                  noNameTag
                  product={p}
                  key={p.path}
                  variant="simple"
                  className="animated fadeIn"
                  imgProps={{
                    width: 300,
                    height: 300,
                  }}
                />
              </div>
            ))}
          </div>
        </section>*/}
      </Container>
      <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: '800',
              height: '600',
              alt: product.name,
            },
          ],
        }}
      />
    </>
  )
}

export default ProductViewMain
