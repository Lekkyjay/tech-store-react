import { createContext, useEffect, useState } from "react"
import { linkData } from "./linkData"
import { socialData } from "./socialData"
// import { items } from "./productData"
import { client } from "./contentful"

export const ProductContext = createContext()

export const ProductContextProvider = ({ children }) => {  

  //initial State
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
    search: "",
    price: 0,
    min: 0,
    max: 0,
    company: "all",
    shipping: false
  })

  //updates initial state with imported data items, and some computed values
  useEffect(() => {
    // setProducts(items)
    
    //get items from contentful
    client
      .getEntries({
        content_type: "techStoreProducts"
      })
      .then(response => setProducts(response.items))
      .catch(console.error)
  }, [])


  const setProducts = products => {
    //transforms imported API data into a more friendly array of objects
    let storeProducts = products.map(item => {
      const { id } = item.sys
      const image = item.fields.image.fields.file.url
      const product = { id, ...item.fields, image }
      return product
    })
    
    //  featured products
    let featuredProducts = storeProducts.filter(item => item.featured === true)
    
    // get max price
    let maxPrice = Math.max(...storeProducts.map(item => item.price))
    
    // let storageCart = getStorageCart()
    
    setData(data => ({
      ...data, 
      storeProducts, 
      filteredProducts: storeProducts, 
      featuredProducts,
      cart: getStorageCart(),
      loading: false,
      price: maxPrice,
      max: maxPrice
    }))
  }

  //get cart from local storage
  const getStorageCart = () => {
    let cart
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    } else {
      cart = []
    }
    return cart
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
    setData(data => ({ ...data, cart: tempCart, cartOpen: true }))
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
    setData(data => ({
      ...data,
      cartItems: totals.cartItems,
      cartSubTotal: totals.subTotal,
      cartTax: totals.tax,
      cartTotal: totals.total
    }))
  }


//cb to addToCart function
  useEffect(() => {
    setTotals()  
    syncStorage()
  }, [data.cart])


//saves cart to local storage
  const syncStorage = () => {
    localStorage.setItem("cart", JSON.stringify(data.cart))
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
    let tempCart = [...data.cart]
    const cartItem = tempCart.find(item => item.id === id);
    cartItem.count++;
    cartItem.total = cartItem.count * cartItem.price;
    cartItem.total = parseFloat(cartItem.total.toFixed(2));
    setData({ ...data, cart: [...tempCart] })
  }

//decrement
  const decrement = id => {
    let tempCart = [...data.cart]
    const cartItem = tempCart.find(item => item.id === id)
    cartItem.count = cartItem.count - 1
    if (cartItem.count === 0) {
      removeItem(id);
    } else {
      cartItem.total = cartItem.count * cartItem.price;
      cartItem.total = parseFloat(cartItem.total.toFixed(2));
      setData({ ...data, cart: [...tempCart] })
    }
  }

//remove
  const removeItem = id => {
    let tempCart = [...data.cart]
    tempCart = tempCart.filter(item => item.id !== id);
    setData({ ...data, cart: [...tempCart] })
  }

//clear cart
  const clearCart = () => {
    setData({ ...data, cart: [] })
  }

//handle filtering
  const handleChange = event => {
    const name = event.target.name
    const value = event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setData({...data, [name]: value}) //the [name] key is computed so it needs to be in bracket.
  }


  useEffect(() => {
    sortData()
  }, [data.company, data.price, data.search, data.shipping])


  const sortData = () => {
    const { storeProducts, price, company, shipping, search } = data

    let tempPrice = parseInt(price) //converts price from string to integer

    let tempProducts = [...storeProducts];
    // filtering based on price
    tempProducts = tempProducts.filter(item => item.price <= tempPrice)
    // filtering based on company
    if (company !== "all") {
      tempProducts = tempProducts.filter(item => item.company === company)
    }
    if (shipping) {
      tempProducts = tempProducts.filter(item => item.freeShipping === true)
    }
    if (search.length > 0) {
      tempProducts = tempProducts.filter(item => {
        let tempSearch = search.toLowerCase();
        let tempTitle = item.title.toLowerCase().slice(0, search.length)
        if (tempSearch === tempTitle) {
          return item;
        }
      })
    }
    setData(data => ({...data, filteredProducts: tempProducts}))
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
    clearCart,
    handleChange
  }

  return (
    <ProductContext.Provider value={value}>
      { children }
    </ProductContext.Provider>
  )
}
