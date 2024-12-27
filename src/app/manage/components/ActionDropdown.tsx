'use client'
import { Button, Dropdown } from 'antd'
import { ItemType } from 'antd/es/menu/interface'
import React from 'react'
import { RightCircleOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { Prisma } from '@prisma/client'

type Props = {
  employee: Prisma.EmployeeGetPayload<null>
}
const ActionDropdown = ({ employee }: Props) => {
  const router = useRouter()

  const items: ItemType[] = [
    {
      key: 'view',
      label: 'View',
      onClick: () => {
        router.push(`/manage/${employee.id}`)
      },
    },
    {
      key: 'edit',
      label: 'Edit',
      onClick: () => {
        window.alert('Edit TBC')
      },
    },
    {
      key: 'delete',
      label: 'Delete',
      onClick: () => {
        window.alert('Delete TBC')
      },
    },
  ]

  return (
    <Dropdown menu={{ items }} placement="bottomLeft">
      <Button type="link">
        <RightCircleOutlined />
      </Button>
    </Dropdown>
  )
}

export default ActionDropdown
