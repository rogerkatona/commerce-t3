import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import s from './ProductCardSmall.module.css'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'
import usePrice from '@framework/product/use-price'
import {Rating, Text} from "@components/ui";

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple'
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCardSmall: FC<Props> = ({
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
    <div>
      <div className={rootClassName} aria-label={product.name}>
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
            <div className={`${+product.id % 2 === 0  ? 'bg-newGunmetal.800' : 'bg-newGunmetal.600'} `}>
            <div className={`flex max-w-7xl mx-auto md:py-24 flex-col md:pt-24 py-12 ${+product.id % 2 === 0  ? 'bg-newGunmetal.800 lg:flex-row' : 'bg-newGunmetal.600 lg:flex-row-reverse'}`}>
              <div className={s.imageContainer}>
                {product?.images && (
                  <div>
                    <Image
                      alt={product.name || 'Product Image'}
                      src={product.images[0]?.url || placeholderImg}
                      height={1300}
                      width={1750}
                      {...imgProps}
                    />
                  </div>
                )}
              </div>
                <div className={`p-6 pt-3 md:py-0 ${+product.id % 2 === 0  ? 'lg:pl-12' : 'lg:pr-12'} `}>
                  <div className='font-bebasNeue text-4xl text-gray-300'>
                    {product.name}
                  </div>
                  <div className={`font-bebasNeue text-xl text-gray-400 pb-6 ${+product.id === 165  ? 'hidden' : 'block'} `}>
                    {price}
                  </div>
                  <Text
                    className={`${+product.id === 165  ? 'pt-6' : 'pt-0'} `}
                    html={product.descriptionHtml || product.description}
                  />
                  <Rating value={4} />
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
                  </div>
                </div>

            </div>
            </div>
          </>
        )}
      </div>
    </div>

  )
}

export default ProductCardSmall
