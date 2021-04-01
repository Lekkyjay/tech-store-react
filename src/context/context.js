import { createContext, useState } from "react"
import { linkData } from "./linkData"
import { socialData } from "./socialData"

export const ProductContext = createContext()

export const ProductContextProvider = ({ children }) => {
  const [data, setData] = useState({
    sidebarOpen: false,
    cartOpen: false,
    cartItems: 50,
    cart: [],
    socialIcons: socialData,
    links: linkData
  })
  
  //handle sidebar
  const handleSidebar = () => {
    setData({...data, sidebarOpen: !data.sidebarOpen})
  }

  //handle cart
  const handleCart = () => {
    setData({...data, cartOpen: !data.cartOpen})
  }

  //open cart
  const openCart = () => {
    setData({...data, cartOpen: true})
  }

  //close cart
  const closeCart = () => {
    setData({...data, cartOpen: false})
  }  

  const value = {...data, handleSidebar, handleCart, openCart, closeCart}

  return (
    <ProductContext.Provider value={value}>
      { children }
    </ProductContext.Provider>
  )
}