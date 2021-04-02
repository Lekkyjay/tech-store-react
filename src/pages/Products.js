import React from 'react'
import Hero from '../components/Hero'
import Products from '../components/Products'
import productsBcg from '../images/productsBcg.jpeg'

const ProductsPage = () => {
  return (
    <div>
      <Hero img={productsBcg} />
      <Products />
    </div>
  )
}

export default ProductsPage
