import React, { useContext } from 'react'
import { ProductContext } from '../context/context'

const Home = () => {
  const str = useContext(ProductContext)

  console.log(str)
  
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

export default Home
