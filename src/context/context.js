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
    cartItems: 0,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    storeProducts: [],
    filteredProducts: [],
    featuredProducts: [],
    singleProduct: {},
    loading: false,
    // search: "",
    price: 0,
    // min: 0,
    max: 0,
    // company: "all",
    // shipping: false
  })

  useEffect(() => {
    setProducts(items)
  }, [])

  
  const setProducts = products => {
    //transforms the API data into a more friendly array of objects
    let storeProducts = products.map(item => {
      const { id } = item.sys;
      const image = item.fields.image.fields.file.url;
      const product = { id, ...item.fields, image };
      return product;
    })
    
    //  featured products
    let featuredProducts = storeProducts.filter(item => item.featured === true)

    // get max price
    let maxPrice = Math.max(...storeProducts.map(item => item.price));

    // const totals = getTotals()

    setData({
      ...data, 
      storeProducts, 
      filteredProducts: storeProducts, 
      featuredProducts,
      loading: false,
      price: maxPrice,
      max: maxPrice,
      // singleProduct: getStorageProduct,
      // cartItems: totals.cartItems,
      // cartSubTotal: totals.subTotal,
      // cartTax: totals.tax,
      // cartTotal: totals.total
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

  // const getTotals = () => {
  //   return new Promise((resolve, reject) => {
  //     let subTotal = 0;
  //     let cartItems = 0;
  //     data.cart.forEach(item => {
  //       subTotal += item.total;
  //       cartItems += item.count;
  //     });

  //     subTotal = parseFloat(subTotal.toFixed(2));
  //     let tax = subTotal * 0.2;
  //     tax = parseFloat(tax.toFixed(2));
  //     let total = subTotal + tax;
  //     total = parseFloat(total.toFixed(2));
  //     resolve({
  //       cartItems,
  //       subTotal,
  //       tax,
  //       total
  //     })
  //   })    
  // }

  // const getTotals = () => {
  //   let subTotal = 0;
  //   let cartItems = 0;
  //   data.cart.forEach(item => {
  //     subTotal += item.total;
  //     cartItems += item.count;
  //   });

  //   subTotal = parseFloat(subTotal.toFixed(2));
  //   let tax = subTotal * 0.2;
  //   tax = parseFloat(tax.toFixed(2));
  //   let total = subTotal + tax;
  //   total = parseFloat(total.toFixed(2));
  //   return {
  //     cartItems,
  //     subTotal,
  //     tax,
  //     total
  //   };
  // }

  const addTotals = () => {}
  
  // sync storage
  const syncStorage = () => {}

  //add to cart
  const addToCart = id => {
    console.log(data.cartItems)
    let tempCart = [...data.cart]
    let tempProducts = [...data.storeProducts]
    //check if item is already in the cart and returns the item
    let tempItem = tempCart.find(item => item.id === id)
    if (!tempItem) {
      tempItem = tempProducts.find(item => item.id === id)
      let total = tempItem.price
      let cartItem = { ...tempItem, count: 1, total }
      tempCart = [...tempCart, cartItem]
    } else {
      tempItem.count++;
      tempItem.total = tempItem.price * tempItem.count;
      tempItem.total = parseFloat(tempItem.total.toFixed(2));
    }

    // const totals = await getTotals()

    setData({
      ...data, 
      cart: tempCart, 
      cartOpen: true, 
      cartItems: data.cartItems + 1,
      // cartItems: totals.cartItems,
      // cartSubTotal: totals.subTotal,
      // cartTax: totals.tax,
      // cartTotal: totals.total
    })

    // this.setState(
    //   () => {
    //     return { cart: tempCart };
    //   },
    //   () => {
    //     this.addTotals();
    //     this.syncStorage();
    //     this.openCart();
    //   }
    // );
  }

  // useEffect(() => {
  //   addTotals()
  //   syncStorage()
  //   // openCart()     //this will cause infinite loop
  // }, [data])

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