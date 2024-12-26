import React from 'react'
import prisma from '../lib/db'
import ClientTable from './components/ClientTable'

const TestDashboard = async () => {
  const employees = await prisma.employee.findMany()

  return (
    <>
      <ClientTable employees={employees} />
    </>
  )
}

export default TestDashboard
