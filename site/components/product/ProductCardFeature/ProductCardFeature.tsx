import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import s from './ProductCardFeature.module.css'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'
import usePrice from '@framework/product/use-price'

import {Text} from "@components/ui";

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple'
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCardFeature: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  )

  return (
    <Link href={`/product/${product.slug}`}>
      <a className={rootClassName} aria-label={product.name}>
        {variant === 'slim' && (
          <>
            <div className={s.header}>
              <span>{product.name}</span>
            </div>
            {product?.images && (
              <div>
                <Image
                  quality="85"
                  src={product.images[0]?.url || placeholderImg}
                  alt={product.name || 'Product Image'}
                  height={320}
                  width={320}
                  layout="fixed"
                  {...imgProps}
                />
              </div>
            )}
          </>
        )}

        {variant === 'simple' && (
          <>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0]}
              />
            )}
            {!noNameTag && (
              <div className={s.header}>
                <h3 className={s.name}>
                  <span>{product.name}</span>
                </h3>
                <div className={s.price}>
                  {`${price} ${product.price?.currencyCode}`}
                </div>
              </div>
            )}
            <div className={s.imageContainer}>
              {product?.images && (
                <div>
                  <Image
                    alt={product.name || 'Product Image'}
                    className={s.productImage}
                    src={product.images[0]?.url || placeholderImg}
                    height={540}
                    width={540}
                    quality="85"
                    layout="responsive"
                    {...imgProps}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {variant === 'default' && (
          <>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0] as any}
              />
            )}
{/*            <ProductTag
              name={product.name}
              price={`${price} ${product.price?.currencyCode}`}
            />*/}
            <div className="flex bg-newGunmetal.800 md:flex-row-reverse flex-col md:pt-24 pt-0">
              <div className={s.imageContainer}>
                {product?.images && (
                  <div>
                    <Image
                      alt={product.name || 'Product Image'}
                      className={s.productImage}
                      src={product.images[0]?.url || placeholderImg}
                      height={1200}
                      width={1200}
                      quality="85"
                      {...imgProps}
                    />
                  </div>
                )}
              </div>
              <div className="md:pr-6 md:pl-0 px-6">
                <div className='text-gray-100'>
                  <Link href="/products">
                    <span className='hover:underline uppercase text-xs'>/ Products</span>
                  </Link>
                </div>

                <div className='font-bebasNeue text-5xl text-gray-300 pt-3'>
                  {product.name}
                </div>
                <div className={`font-bebasNeue text-xl text-gray-400 pb-6 ${+product.id === 165  ? 'hidden' : 'block'} `}>
                  {price}
                </div>
                <Text
                  className={`${+product.id === 165  ? 'pt-6' : 'pt-0'} `}
                  html={product.descriptionHtml || product.description}
                />
                <div className="flex flex-row">
                  <div className="pr-2">
                    <a
                      href={`/product/${product.slug}`}
                    >
                      <button className="hover:bg-newYellow-500 hover:text-newGray-700 text-xs text-newYellow-500 uppercase px-4 py-3 border border-rust-500 rounded-lg">
                        See Details
                      </button>
                    </a>
                  </div>
                  <div className="">
                    <Link href="/products">
                      <button className="hover:bg-newYellow-500 hover:text-newGray-700 text-xs text-newYellow-500 uppercase px-4 py-3 border border-rust-500 rounded-lg">
                        See All Products
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </a>
    </Link>
  )
}

export default ProductCardFeature
