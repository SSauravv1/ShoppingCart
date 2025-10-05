// Import createContext hook from React for creating a context
import { createContext, useEffect, useState } from "react";

// Import products data from assets (assuming it's an array/object of products)
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

// Create a new Context object for the shop
// This will allow us to share data (products, currency, etc.) across components
export const ShopContext = createContext();

// Context Provider Component
// It wraps around child components and provides them access to shared values
const ShopContextProvider = (props) => {
  // Define global values that should be accessible to all components
  const currency = "$"; // Default currency symbol
  const delivery_fee = 10; // Fixed delivery fee (in currency unit)
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search,setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems,setCartItems] = useState({});
  const [products,setProducts] = useState([])
  const[token,setToken] = useState("")
  const navigate = useNavigate()

  const addToCart = async(itemId,size) =>{

    if (!size) {
      toast.error('Select Product Size');
      return;
    }

      let cartData = structuredClone(cartItems);

      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        }
        else{
          cartData[itemId][size] = 1;
        }
      }
      else{
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
    }
  setCartItems(cartData)

  if (token) {
    try {

      // await axios.post(backendUrl + 'api.cart/add',{itemId,size},{headers:{token}})
      await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

}

  const getCartCount = () => {
    let totalCount = 0;
    for(const items in cartItems){
      for(const item in cartItems[items]){
        try {
          if (cartItems[items][item] >0) {
            totalCount += cartItems[items][item]
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    return totalCount;
  }


useEffect(()=>{
  console.log(cartItems);
},[cartItems])

const updateQuantity = async (itemId,size,quantity) =>{
  
  let cartData = structuredClone(cartItems);

  cartData[itemId][size] = quantity;

  setCartItems(cartData);

  if(token){
    try {
      await axios.post(backendUrl + '/api/cart/update', {itemId,size,quantity}, {headers:{token}})
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
}

const getCartAmount = () =>{
  let totalAmount = 0;
  for(const items in cartItems){
    let itemInfo = products.find((product)=>product._id===items)
    for(const item in cartItems[items]){
      try {
        if (cartItems[items][item]>0) {
          totalAmount+=itemInfo.price * cartItems[items][item]
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  }
  return totalAmount;
}

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if(response.data.success){
      setProducts(response.data.products)
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
      if (response.data.success) {
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    getProductsData()
  },[])

  useEffect(() => {
  if (!token && localStorage.getItem('token')) {
    setToken(localStorage.getItem('token'));
    getUserCart(localStorage.getItem('token'));
  }
}, []);
//   useEffect(() => {
//   const savedToken = localStorage.getItem('token');
//   if (savedToken) {
//     setToken(savedToken);
//     getUserCart(savedToken); // ✅ pass the actual token
//   }
// }, []);


  // The value object contains all the shared data
  const value = {
    products, // List of products (imported from assets)
    currency, // Currency symbol
    delivery_fee, // Delivery fee
    search,setSearch,showSearch,setShowSearch,
    cartItems,setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,getCartAmount,
    navigate,
    backendUrl,
    setToken,token
  };

  // Return the Provider component
  // `props.children` means all child components wrapped inside this provider
  // will get access to the `value` object via ShopContext
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

// Export the Provider so it can be used in App.jsx or other root components
export default ShopContextProvider;
