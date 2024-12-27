'use client'
import { Table } from 'antd'
import React from 'react'
import ActionDropdown from './ActionDropdown'
import { Prisma } from '@prisma/client'

type Props = {
  employees: Prisma.EmployeeGetPayload<null>[]
}

const ClientTable = ({ employees }: Props) => {
  return (
    <Table
      dataSource={employees}
      columns={[
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'First name',
          dataIndex: 'first_name',
          key: 'first_name',
        },
        {
          title: 'Last name',
          dataIndex: 'last_name',
          key: 'last_name',
        },
        {
          title: 'actions',
          key: 'actions',
          render: (_, record) => <ActionDropdown employee={record} />,
        },
      ]}
      rowKey="id"
    />
  )
}

export default ClientTable
