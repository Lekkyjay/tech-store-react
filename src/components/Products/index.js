import React, { useContext } from 'react'
import { ProductContext } from '../../context/context';
import Product from '../Product';
import Title from '../Title';

const Products = () => {
  const { filteredProducts } = useContext(ProductContext)

  return (
    <section className="py-5">
      <div className="container">
        {/* title */}
        <Title center title="our products" />
        {/* Product filter */}
        
        {/* total count */}
        <div className="row">
          <div className="col-10 mx-auto">
            <h6 className="text-title">
              total products : {filteredProducts.length}
            </h6>
          </div>
        </div>
        {/* products */}
        <div className="row py-5">
          {filteredProducts &&
            filteredProducts.map(product => {
              return <Product key={product.id} product={product} />;
            })
          }
        </div>
      </div>
    </section>
  )
}

export default Products
