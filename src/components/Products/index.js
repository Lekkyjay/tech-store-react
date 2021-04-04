import React, { useContext } from 'react'
import { ProductContext } from '../../context/context';
import Product from '../Product';
import Title from '../Title';
import ProductsFilter from './ProductsFilter';

const Products = () => {
  const { filteredProducts } = useContext(ProductContext)

  return (
    <section className="py-5">
      <div className="container">
        <Title center title="our products" />
        <ProductsFilter />
        <div className="row">
          <div className="col-10 mx-auto">
            <h6 className="text-title">
              total products : {filteredProducts.length}
            </h6>
          </div>
        </div>
        <div className="row py-5">
          {filteredProducts.length === 0 
          ? (
              <div className="col text-title text-center">
                sorry, no items matched your search
              </div>
            ) 
          : (
              filteredProducts.map(product => {
                return <Product key={product.id} product={product} />;
              })
            )
          }
        </div>
      </div>
    </section>
  )
}

export default Products