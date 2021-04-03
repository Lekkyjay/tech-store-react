import React, { useContext } from 'react'
import { ProductContext } from '../../context/context'
import CartItem from './CartItem'

const CartList = () => {
  const { cart, increment, decrement, removeItem } = useContext(ProductContext)

  return (
    <div className="container-fluid">
      {/* row */}
      <div className="row">
        <div className="col">
          {(cart.length === 0) 
            ? (
                <h1 className="text-title text-center my-4">
                  your cart is currently empty
                </h1>
              )
            : (
                <div>
                  {cart.map(item => (
                    <CartItem
                      key={item.id}
                      cartItem={item}
                      increment={increment}
                      decrement={decrement}
                      removeItem={removeItem}
                    />
                  ))}
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default CartList
