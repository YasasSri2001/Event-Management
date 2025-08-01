import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserShield } from 'react-icons/fa'

export default function AdminLogin() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (user === 'admin' && pass === '1234') {
      navigate('/dashboard')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/admin-bg.jpg')" }} // place your image here
    >
      {/* Soft blur overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0"></div>

      {/* Login Box */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-6 flex items-center justify-center gap-2">
            <FaUserShield className="text-blue-600" /> Admin Login
          </h2>

          <input
            className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            className="w-full px-4 py-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
