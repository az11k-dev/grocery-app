import {createContext, useContext, useEffect, useState} from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem("cartItems");
        return storedCart ? JSON.parse(storedCart) : [];
    });


    useEffect(() => {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existing = prevItems.find(item => item.id === product.id);
            if (existing) {
                return prevItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prevItems, {...product, quantity: 1}];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems =>
            prevItems
                .map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    }

    const clearCart = () => {
        setCartItems([]);
    };
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider  value={{cartItems, addToCart, removeFromCart, clearCart, totalPrice}}>
            {children}
        </CartContext.Provider>
    )
}