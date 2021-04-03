import { createContext, useEffect, useState } from "react"
import { linkData } from "./linkData"
import { socialData } from "./socialData"
import { items } from "./productData"

export const ProductContext = createContext()

export const ProductContextProvider = ({ children }) => {

  //get cart from local storage
  const getStorageCart = () => {
    let cart
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      console.log('cart:', cart)
    } else {
      cart = []
    }
    return cart
  }

  //initial State
  const [data, setData] = useState({
    sidebarOpen: false,
    socialIcons: socialData,
    links: linkData,
    cartOpen: false,
    cart: getStorageCart(),
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
    myflag: true
  })


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
    
    // let storageCart = getStorageCart()
    
    setData({
      ...data, 
      storeProducts, 
      filteredProducts: storeProducts, 
      featuredProducts,
      cart: getStorageCart(),
      loading: false,
      price: maxPrice,
      max: maxPrice,
    })
    console.log('setProducts ran:', data)
  }

  const addToCart = id => {
    let tempCart = [...data.cart]
    let tempProducts = [...data.storeProducts]
    //checks if product is already in cart and returns the product if yes
    let tempItem = tempCart.find(item => item.id === id)    //tempItem === tempProduct
    if (!tempItem) {
      tempItem = tempProducts.find(item => item.id === id)
      let total = tempItem.price
      let cartItem = { ...tempItem, count: 1, total } //adds two new props to product: count,total
      tempCart = [...tempCart, cartItem]
    } else {
      //tempItem is a product already in cart
      tempItem.count++;
      tempItem.total = tempItem.price * tempItem.count;
      tempItem.total = parseFloat(tempItem.total.toFixed(2));
    }
    setData({ ...data, cart: tempCart, cartOpen: true })
  }


  const getTotals = () => {
    let subTotal = 0;
    let cartItems = 0;
    data.cart.forEach(item => {
      subTotal += item.total;
      cartItems += item.count;
    });
    
    subTotal = parseFloat(subTotal.toFixed(2));
    let tax = subTotal * 0.2;
    tax = parseFloat(tax.toFixed(2));
    let total = subTotal + tax;
    total = parseFloat(total.toFixed(2));
    return {
      cartItems,
      subTotal,
      tax,
      total
    };
  }

//used cart to calculate totals. see above!
  const setTotals = () => {
    const totals = getTotals()
    setData({
      ...data,
      cartItems: totals.cartItems,
      cartSubTotal: totals.subTotal,
      cartTax: totals.tax,
      cartTotal: totals.total
    })
  }
 

//this runs 1x and at everytime cart changes
//its basically a cb to addToCart function
  useEffect(() => {
    setTotals()   //sets state
    syncStorage() //stores state in localStorage
  }, [data.cart])


  useEffect(() => {
    setProducts(items)
  }, [])


//save cart to local storage
  const syncStorage = () => {
    localStorage.setItem("cart", JSON.stringify(data.cart))
    console.log('syncstorage')
  }

// get product from local storage
  // const getStorageProduct = () => {
  //   return localStorage.getItem("singleProduct")
  //     ? JSON.parse(localStorage.getItem("singleProduct"))
  //     : {};
  // }

//set single product
  const setSingleProduct = id => {
    let product = data.storeProducts.find(item => item.id === id)
    // localStorage.setItem("singleProduct", JSON.stringify(product))
    setData({
      ...data,
      singleProduct: { ...product },
      loading: false
    });
    console.log('singleProduct:', data.singleProduct)
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


/***************  cart functionality   *********************/
// increment
  const increment = id => {
    console.log(id)
    // let tempCart = [...this.state.cart];
    // const cartItem = tempCart.find(item => item.id === id);
    // cartItem.count++;
    // cartItem.total = cartItem.count * cartItem.price;
    // cartItem.total = parseFloat(cartItem.total.toFixed(2));
    // this.setState(
    //   () => {
    //     return {
    //       cart: [...tempCart]
    //     };
    //   },
    //   () => {
    //     this.addTotals();
    //     this.syncStorage();
    //   }
    // );
  };

//decrement
  const decrement = id => {
    console.log(id)
  }

//remove
  const removeItem = id => {
    console.log(id)
  }

//clear cart
  const clearCart = id => {
    console.log('Cart cleared!')
  }

  const value = {
    ...data,
    handleSidebar,
    handleCart,
    openCart,
    closeCart,
    addToCart,
    setSingleProduct,
    increment,
    decrement,
    removeItem,
    clearCart
  }

  return (
    <ProductContext.Provider value={value}>
      { children }
    </ProductContext.Provider>
  )
}
