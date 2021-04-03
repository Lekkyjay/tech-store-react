import React from 'react'
import CartIndex from '../components/Cart'
import Hero from '../components/Hero'
import cartBcg from '../images/storeBcg.jpeg';

const Cart = () => {
  return (
    <div>
      <Hero img={cartBcg} />
      <CartIndex />
    </div>
  )
}

export default Cart
