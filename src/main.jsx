import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {NotificationProvider} from "./context/NotificationProvider.jsx";
import {UserProvider} from "./context/UserContext.jsx";
import {CartProvider} from "./context/CartContext.jsx";
import {FilterProvider} from "./context/FilterContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NotificationProvider>
            <UserProvider>
                <FilterProvider>
                    <CartProvider>
                        <App  />
                    </CartProvider>
                </FilterProvider>
            </UserProvider>
        </NotificationProvider>
    </StrictMode>,
)
