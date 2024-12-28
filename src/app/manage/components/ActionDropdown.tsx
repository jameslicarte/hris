'use client'
import { Button, Dropdown } from 'antd'
import { ItemType } from 'antd/es/menu/interface'
import React, { useCallback, useState } from 'react'
import { RightCircleOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { Prisma } from '@prisma/client'
import { deleteEmployee } from '../actions/actions'
import { useNotification } from '@/lib/context'

type Props = {
  employee: Prisma.EmployeeGetPayload<null>
}
const ActionDropdown = ({ employee }: Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const notification = useNotification()

  const handleDelete = useCallback(async () => {
    setIsLoading(true)
    await deleteEmployee(employee.id)
    setIsLoading(false)
    notification.notify({
      title: 'Status',
      message: `Employee ${employee.first_name} ${employee.last_name} deleted`,
    })
  }, [employee.first_name, employee.id, employee.last_name, notification])

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
      onClick: handleDelete,
    },
  ]

  return (
    <Dropdown menu={{ items }} placement="bottomLeft">
      <Button type="link" loading={isLoading}>
        <RightCircleOutlined />
      </Button>
    </Dropdown>
  )
}

export default ActionDropdown
