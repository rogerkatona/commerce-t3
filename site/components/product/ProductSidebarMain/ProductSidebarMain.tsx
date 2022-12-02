import s from './ProductSidebarMain.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import usePrice from "@framework/product/use-price";

interface ProductSidebarProps {
  product: Product
  className?: string
}

const ProductSidebarMain: FC<ProductSidebarProps> = ({ product, className }) => {
  const addItem = useAddItem()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)

  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      setSidebarView('CART_VIEW')
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <div className='font-bebasNeue text-5xl text-gray-300 pt-6 lg:pl-0 pl-6'>
        {product.name}
      </div>
      <div className={`font-bebasNeue text-xl text-gray-400 pb-6  lg:pl-0  pl-6 ${+product.id === 165  ? 'hidden' : 'block'} `}>
        {`${price} ${product.price?.currencyCode}`}
      </div>
      <Text
        className="py-3 w-full max-w-xl lg:pl-0  pl-6"
        html={product.descriptionHtml || product.description}
      />
      <div className="flex flex-row justify-between items-center lg:pl-0  pl-6">
        <Rating value={4} />
        <div className="text-accent-6 pr-1 font-medium text-sm">36 reviews</div>
      </div>
      <div className={`${+product.id === 165  ? 'hidden' : 'block'} `}>
        {process.env.COMMERCE_CART_ENABLED && (
          <Button
            aria-label="Add to Cart"
            type="button"
            className={s.button}
            onClick={addToCart}
            loading={loading}
            disabled={variant?.availableForSale === false}
          >
            {variant?.availableForSale === false
              ? 'Not Available'
              : 'Add To Cart'}
          </Button>
        )}
      </div>
{/*      <div className="mt-6">
        <Collapse title="Care">
          This is a limited edition production run. Printing starts when the
          drop ends.
        </Collapse>
        <Collapse title="Details">
          This is a limited edition production run. Printing starts when the
          drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
          to COVID-19.
        </Collapse>
      </div>*/}
    </div>
  )
}

export default ProductSidebarMain
