import { Link } from 'react-router-dom'
import { FaUserShield } from 'react-icons/fa'

export default function AdminLoginButton() {
  return (
    <div className="fixed bottom-6 left-4 z-50 group">
      <Link to="/admin" title="Admin Login">
        <div className="relative flex items-center space-x-2">
          {/* Icon with animation */}
          <div className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-110">
            <FaUserShield className="text-xl animate-pulse group-hover:animate-none" />
          </div>

          {/* Hover Label */}
          <span className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Admin
          </span>
        </div>
      </Link>
    </div>
  )
}
