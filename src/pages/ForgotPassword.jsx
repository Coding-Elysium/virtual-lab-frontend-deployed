import React from 'react'
import DashboardHeader from '../components/Header/DashboardHeader'
import ChangePassTable from '../components/Table/ChangePassTable'

const ForgotPassword = () => {
  return (
    <section className="flex flex-col gap-6">
      <section>
        <DashboardHeader title="Forgot Password Request" />
      </section>
      <ChangePassTable/>
    </section>
  )
}

export default ForgotPassword