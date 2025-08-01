import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaCalendarAlt,
  FaPlusCircle,
  FaClock,
  FaList,
  FaEdit,
  FaTrashAlt
} from 'react-icons/fa'
import axios from 'axios'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    todayEvents: 0,
    nextEvent: null
  })
  const [events, setEvents] = useState([])
  const [showEvents, setShowEvents] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/events/stats')
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err))
  }, [])

  const loadEvents = () => {
    axios
      .get('http://localhost:5000/api/events/all')
      .then((res) => {
        setEvents(res.data)
        setShowEvents(true)
      })
      .catch((err) => console.error(err))
  }

  const deleteEvent = (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return
    axios
      .delete(`http://localhost:5000/api/events/delete/${id}`)
      .then(() => {
        alert('Deleted!')
        loadEvents()
      })
      .catch(() => alert('Delete failed'))
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/dashboard-bg.jpg')" }}
    >
      {/* Overlay with blur effect */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0"></div>

      {/* Main Dashboard Content */}
      <div className="relative z-10 py-12 px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-green-800 flex items-center justify-center gap-3">
            <FaCalendarAlt className="text-green-600" />
            Admin Dashboard
          </h2>
          <p className="text-gray-600 text-md mt-1">Manage your school events with ease</p>
        </div>

        {/* Dashboard Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <div
            onClick={loadEvents}
            className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition cursor-pointer"
          >
            <FaList className="text-3xl text-green-500" />
            <div>
              <h4 className="text-lg font-semibold">Total Events</h4>
              <p className="text-gray-600">{stats.totalEvents}</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition">
            <FaClock className="text-3xl text-blue-500" />
            <div>
              <h4 className="text-lg font-semibold">Upcoming Today</h4>
              <p className="text-gray-600">{stats.todayEvents} Event(s)</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition">
            <FaCalendarAlt className="text-3xl text-purple-500" />
            <div>
              <h4 className="text-lg font-semibold">Next Event</h4>
              <p className="text-gray-600">
                {stats.nextEvent
                  ? new Date(stats.nextEvent.Date).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Add New Event Button */}
        <div className="text-center mb-10">
          <Link to="/add-event">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full text-lg font-medium shadow flex items-center gap-2 mx-auto">
              <FaPlusCircle />
              Add New Event
            </button>
          </Link>
        </div>

        {/* Event Table Display */}
        {showEvents && (
          <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-lg rounded-lg shadow-xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-center text-blue-800">
              📋 All Events
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="p-3">Event</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Time</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((ev) => (
                    <tr key={ev.Id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{ev.Name}</td>
                      <td className="p-3">{new Date(ev.Date).toLocaleDateString()}</td>
                      <td className="p-3">{ev.Time}</td>
                      <td className="p-3">{ev.Location}</td>
                      <td className="p-3 flex gap-3">
                        <button className="text-blue-600 hover:text-blue-800">
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => deleteEvent(ev.Id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
