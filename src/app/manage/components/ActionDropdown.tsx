'use client'
import { Button, Dropdown } from 'antd'
import { ItemType } from 'antd/es/menu/interface'
import React, { useCallback, useState } from 'react'
import { RightCircleOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { Prisma } from '@prisma/client'
import { deleteEmployee } from '../actions/actions'
import { useNotification } from '@/lib/context'
import EditUserModal from './EditUserModal'

type Props = {
  employee: Prisma.EmployeeGetPayload<null>
}
const ActionDropdown = ({ employee }: Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const notification = useNotification()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleDelete = useCallback(async () => {
    setIsLoading(true)
    try {
      await deleteEmployee(employee.id)
      notification.notify({
        title: 'Status',
        message: `Employee ${employee.first_name} ${employee.last_name} deleted`,
      })
    } catch (error) {
      console.error(error)
      notification.notify({
        title: 'Error',
        message: `Failed to delete employee`,
      })
    } finally {
      setIsLoading(false)
    }
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
        setIsEditModalOpen(true)
      },
    },
    {
      key: 'delete',
      label: 'Delete',
      onClick: handleDelete,
    },
  ]

  return (
    <>
      <Dropdown menu={{ items }} placement="bottomLeft">
        <Button type="link" loading={isLoading}>
          <RightCircleOutlined />
        </Button>
      </Dropdown>
      <EditUserModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        employee={employee}
      />
    </>
  )
}

export default ActionDropdown
