import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaHome, FaSignOutAlt, FaPlus } from 'react-icons/fa'

export default function AddEvent() {
  const [event, setEvent] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: ''
  })

  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/events/add', event)
      alert('✅ Event saved successfully!')
      setEvent({ name: '', date: '', time: '', location: '', description: '' })
    } catch (error) {
      console.error(error)
      alert('❌ Failed to save event.')
    }
  }

  const handleLogout = () => {
    alert('Logged out!')
    navigate('/')
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/add-event-bg.jpg')" }}
    >
      {/* Blur + overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0"></div>

      {/* Home Button */}
      <button
        className="absolute top-6 left-6 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition z-10"
        onClick={() => navigate('/')}
        title="Home"
      >
        <FaHome />
      </button>

      {/* Logout Button */}
      <button
        className="absolute top-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-md hover:bg-red-700 transition z-10"
        onClick={handleLogout}
        title="Logout"
      >
        <FaSignOutAlt />
      </button>

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl px-10 py-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6 flex items-center justify-center gap-2">
          <FaPlus /> Add New Event
        </h2>

        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Event Name"
            value={event.name}
            onChange={(e) => setEvent({ ...event, name: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="date"
            value={event.date}
            onChange={(e) => setEvent({ ...event, date: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="time"
            value={event.time}
            onChange={(e) => setEvent({ ...event, time: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            placeholder="Location"
            value={event.location}
            onChange={(e) => setEvent({ ...event, location: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <textarea
            rows="4"
            placeholder="Description"
            value={event.description}
            onChange={(e) => setEvent({ ...event, description: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          ></textarea>
        </div>

        <button
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          onClick={handleSubmit}
        >
          Submit Event
        </button>
      </div>
    </div>
  )
}
