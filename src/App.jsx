import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import AddEvent from './pages/AddEvent'
import AdminLoginButton from './components/AdminLoginButton'

// Wrapper component to use location
function AppContent() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
 
      {isHome && <AdminLoginButton />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-event" element={<AddEvent />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
