import React, { useState } from 'react'
import DashboardHeader from '../components/Header/DashboardHeader'
import SearchField from '../components/TextField/SearchField'
import CardStudentPass from '../components/CardStatus/CardStudentPass'
import CardAdminPass from '../components/CardStatus/CardAdminPass'

const ForgotPassword = () => {
  const [view, setView] = useState('student') // default to student

  return (
    <section className="flex flex-col gap-6">
      <section>
        <DashboardHeader title="Forgot Password Request" />
      </section>

      {/* Search + Toggle */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Field */}
        <div className="w-full sm:w-auto">
          <SearchField
            onchange={(e) => {
              // setSearch(e.target.value);
              // setVisibleCount(10);
            }}
          />
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-2 justify-center sm:justify-end">
          <button
            className={`px-4 py-2 rounded-lg transition w-full ${
              view === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setView('student')}
          >
            Students
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition w-full ${
              view === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setView('admin')}
          >
            Admin
          </button>
        </div>
      </section>


      {view === 'admin' ? (
        <section className="grid w-full gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 items-stretch">
          <CardAdminPass />
        </section>
      ) : (
        <section className="grid w-full gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 items-stretch">
          <CardStudentPass />
        </section>
      )}
    </section>
  )
}

export default ForgotPassword
