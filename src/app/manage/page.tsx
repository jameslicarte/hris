import React from 'react'
import ClientTable from '../home/components/ClientTable'
import prisma from '../lib/db'

const Manage = async () => {
  const employees = await prisma.employee.findMany()

  return <ClientTable employees={employees} />
}

export default Manage
