import { createContext, useEffect, useState } from "react"
import { linkData } from "./linkData"
import { socialData } from "./socialData"
import { items } from "./productData"

export const ProductContext = createContext()

export const ProductContextProvider = ({ children }) => {
  const [data, setData] = useState({
    sidebarOpen: false,
    socialIcons: socialData,
    links: linkData,
    cartOpen: false,
    cart: [],
    cartItems: 50,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    storeProducts: [],
    filteredProducts: [],
    featuredProducts: [],
    singleProduct: {},
    loading: false,
  })

  useEffect(() => {
    setProducts(items)
  }, [])

  const setProducts = products => {
    let storeProducts = products.map(item => {
      const { id } = item.sys;
      const image = item.fields.image.fields.file.url;
      const product = { id, ...item.fields, image };
      return product;
    })
    
    //  featured products
    let featuredProducts = storeProducts.filter(item => item.featured === true)

    setData({
      ...data, 
      storeProducts, 
      filteredProducts: storeProducts, 
      featuredProducts,
      singleProduct: getStorageProduct,
      loading: false
    })
  }

  // get cart from local storage
  const getStorageCart = () => {
    return []
  }

  // get product from local storage
  const getStorageProduct = () => {
    return {}
  }

  const getTotals = () => {}

  const addTotals = () => {}
  
  // sync storage
  const syncStorage = () => {}

  //add to cart
  const addToCart = id => {
    console.log('add to cart:', id)
  }

  // set single product
  const setSingleProduct = id => {
    console.log('set single product:', id)
  }
  
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

  const value = {...data,handleSidebar,handleCart,openCart,closeCart,addToCart,setSingleProduct}

  return (
    <ProductContext.Provider value={value}>
      { children }
    </ProductContext.Provider>
  )
}