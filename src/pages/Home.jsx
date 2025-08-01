import { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    axios.get('http://localhost:5000/api/events/all')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  const getEventsForDate = (date) => {
    const d = new Date(date).toISOString().split('T')[0];
    return events.filter(ev => ev.Date && ev.Date.split('T')[0] === d);
  };

  const tileContent = ({ date, view }) => {
    const matching = getEventsForDate(date);
    if (view === 'month' && matching.length > 0) {
      return <div className="text-xs text-blue-600 font-semibold mt-1">📌 {matching.length}</div>;
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/bg.jpg')" }} // Ensure this image exists in your public folder
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-xl z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-blue-900 drop-shadow-md">
            Thispane Kanda Primary School
          </h1>
          <p className="mt-2 text-lg text-gray-700">Empowering students through celebration & knowledge</p>
        </header>

        {/* Calendar Section */}
        <div className="max-w-5xl w-full bg-white/80 rounded-2xl shadow-xl p-8 border backdrop-blur-lg">
          <h2 className="text-2xl font-bold mb-4 text-blue-800 text-center">📅 Event Calendar</h2>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            {/* Calendar */}
            <div className="w-full lg:w-[45%]">
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                tileContent={tileContent}
                className="rounded-xl p-4 border shadow"
              />
            </div>

            {/* Event Details */}
            <div className="w-full lg:w-[50%]">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Events on {selectedDate.toDateString()}
              </h3>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {Array.isArray(events) && getEventsForDate(selectedDate).map((event, index) => (
                  <div key={index} className="bg-blue-100 p-4 rounded-xl shadow hover:shadow-md transition">
                    <h4 className="font-bold text-blue-900 text-lg">{event.Name}</h4>
                    <p className="text-sm text-gray-700">🕒 {event.Time} | 📍 {event.Location}</p>
                    <p className="text-sm text-gray-600 mt-1">📝 {event.Description}</p>
                  </div>
                ))}
                {Array.isArray(events) && getEventsForDate(selectedDate).length === 0 && (
                  <p className="text-gray-500 italic">No events scheduled.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600 text-sm">
          Thispane Kanda primary school | © 2025
        </footer>
      </div>
    </div>
  );
}
