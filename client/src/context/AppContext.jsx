import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from '../asset/assets'
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [product, setProduct] = useState([])

    const [cartItems, setCartItems] = useState([]);

    //fetch all products
    const fetchProducts = async () => {
        setProduct(dummyProducts)
    }

    //add products to cart
    const addToCart = () => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }

    //update cart item quantity
    const updateCartItem = (itemId,quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    //remove product from cart
    const removeFromCart = (itemId) =>

    useEffect(() => {
        fetchProducts()
    }, [])

    const value = { navigate, user, setUser, setSeller, isSeller, showUserLogin, setShowUserLogin, product, currency ,updateCartItem};

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};


export const useAppContext = () => {
    return useContext(AppContext);
}