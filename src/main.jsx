import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {NotificationProvider} from "./components/specific/NotificationProvider.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NotificationProvider>
            <App/>
        </NotificationProvider>
    </StrictMode>,
)
