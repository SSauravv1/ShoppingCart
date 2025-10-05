import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Backend API URL (from .env file)
export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

/**
 * App Component
 * 
 * - Handles authentication state (token).
 * - Shows login page if not authenticated.
 * - Shows admin dashboard (Navbar, Sidebar, Pages) if authenticated.
 */
const App = () => {

  // State for JWT token (check localStorage for saved token on reload)
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

  // Whenever token changes → update localStorage
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      
      {/* Toast notification container */}
      <ToastContainer />

      {/* Conditional Rendering:
          If token is empty → show Login
          Else → show Admin Panel with Navbar + Sidebar + Pages */}
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          {/* Top Navigation Bar (with Logout) */}
          <Navbar setToken={setToken} />
          <hr />

          {/* Dashboard Layout */}
          <div className='flex w-full'>
            
            {/* Sidebar Navigation */}
            <Sidebar />

            {/* Main Content Area */}
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                {/* Add Product Page */}
                <Route path='/add' element={<Add token={token} />} />
                
                {/* List Products Page */}
                <Route path='/list' element={<List token={token} />} />
                
                {/* Orders Page */}
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
