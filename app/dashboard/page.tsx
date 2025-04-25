import { DashboardStats } from '@/src/components/dash/Overview'
import React from 'react'

const DashBoard = () => {
  return (
    <div className='dark:bg-primary-900'>
      <div className="mb-8">
          <h1 className="text-2xl font-bold dark:text-gray-100 text-gray-800">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Welcome , Admin</p>
          <DashboardStats/>
        </div>
     </div>
  )
}

export default DashBoard