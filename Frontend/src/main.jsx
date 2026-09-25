
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from "./context/authContext";
import UserProvider from './context/UserContext.jsx';
import ShopContextProvider from './context/ShopContext.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <ShopContextProvider>
        <App />
        </ShopContextProvider>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
)
