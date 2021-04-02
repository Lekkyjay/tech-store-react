import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../../context/context'
import Product from '../Product'
import Title from '../Title'

const Featured = () => {
  const { featuredProducts } = useContext(ProductContext)

  return (
    <section className="py-5">
      <div className="container">
        {/* title */}
        <Title title="featured products" center="true" />
        {/* products */}
        <div className="row my-5">
          {featuredProducts.map(product => (
                <Product key={product.id} product={product} />
            )
          )}
        </div>
        <div className="row mt-5">
          <div className="col text-center">
            <Link to="/products" className="main-link">
              our products
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Featured
