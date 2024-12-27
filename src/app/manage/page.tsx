import React from 'react'
import ClientTable from './components/ClientTable'
import prisma from '../../lib/db'
import { Row, Space } from 'antd'
import CreateEmployeeButton from './components/CreateEmployeeButton'

const Manage = async () => {
  const employees = await prisma.employee.findMany()

  return (
    <>
      <Row justify="end">
        <CreateEmployeeButton />
      </Row>
      <Space direction="vertical" style={{ width: '100%' }}>
        <ClientTable employees={employees} />
      </Space>
    </>
  )
}

export default Manage
