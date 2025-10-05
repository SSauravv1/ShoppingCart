import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

/**
 * Login Component
 * 
 * - Renders an admin login form.
 * - Handles authentication by calling backend API.
 * - Stores the JWT token using setToken (prop from parent).
 */
const Login = ({ setToken }) => {

  // State variables for email and password inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  /**
   * Handles form submission
   * - Prevents default form behavior
   * - Sends POST request to backend for admin login
   * - On success: saves token using setToken
   * - On failure: shows error toast
   */
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()  // stop page reload
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password })

      if (response.data.success) {
        // If login is successful → save token
        setToken(response.data.token)
      } else {
        // Show backend error message in toast
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error) // Log unexpected errors
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      {/* Card Container */}
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        
        {/* Title */}
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>

        {/* Login Form */}
        <form onSubmit={onSubmitHandler}>

          {/* Email Field */}
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type="email"
              placeholder='your@email.com'
              required
            />
          </div>

          {/* Password Field */}
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type="password"
              placeholder='Enter your password'
              required
            />
          </div>

          {/* Submit Button */}
          <button
            className='mt-2 w-full px-4 py-2 rounded-md text-white bg-black'
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
