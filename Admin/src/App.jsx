import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Lists from './pages/Lists'
import Add from './pages/Add'
import Login from './pages/Login'
import Orders from './pages/Orders'
import { useContext } from 'react'
import { AdminContext } from './context/AdminContext'

function App() {
    const { admin } = useContext(AdminContext)

    return (
        <Routes>
            <Route
                path="/login"
                element={!admin ? <Login /> : <Navigate to="/" />}
            />

            <Route
                path="/"
                element={admin ? <Home /> : <Navigate to="/login" />}
            />

            <Route
                path="/lists"
                element={admin ? <Lists /> : <Navigate to="/login" />}
            />

            <Route
                path="/add"
                element={admin ? <Add /> : <Navigate to="/login" />}
            />

            <Route
                path="/orders"
                element={admin ? <Orders /> : <Navigate to="/login" />}
            />
        </Routes>
    )
}

export default App