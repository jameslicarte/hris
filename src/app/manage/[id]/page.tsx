import prisma from '@/lib/db'
import { Card, Descriptions } from 'antd'
import { DescriptionsItemType } from 'antd/es/descriptions'
import React from 'react'

const ManageDetails = async ({ params }: { params: { id: string } }) => {
  const employee = await prisma.employee.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!employee) {
    return <Card title="User details">User not found</Card>
  }

  const items: DescriptionsItemType[] = [
    {
      key: 'first_name',
      label: 'First name',
      children: employee.first_name,
    },
    {
      key: 'last_name',
      label: 'Last name',
      children: employee.last_name,
    },
    {
      key: 'createdAt',
      label: 'Created at',
      children: employee.createdAt.toDateString(),
    },
  ]

  return (
    <Card title="User details">
      <Descriptions layout="vertical" items={items} />
    </Card>
  )
}

export default ManageDetails
