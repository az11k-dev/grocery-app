import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {NotificationProvider} from "./components/specific/NotificationProvider.jsx";
import {UserProvider} from "./context/UserContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NotificationProvider>
            <UserProvider>
                <App  />
            </UserProvider>
        </NotificationProvider>
    </StrictMode>,
)
