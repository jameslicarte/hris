import { Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { Employee } from '@prisma/client'
import { editEmployee } from '../actions/actions'
import { useNotification } from '@/lib/context'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  employee: Employee
}

type EmployeeForm = {
  first_name: string
  last_name: string
}

const EditUserModal = ({ isOpen, setIsOpen, employee }: Props) => {
  const [form] = useForm<EmployeeForm>()
  const notification = useNotification()
  const [isLoading, setIsLoading] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleSave = async (values: EmployeeForm) => {
    setIsLoading(true)
    try {
      await editEmployee(employee.id, values)
      notification.notify({
        title: 'Status',
        message: `Employee ${employee.first_name} ${employee.last_name} deleted`,
      })
      closeModal()
    } catch (error) {
      console.error(error)
      notification.notify({
        title: 'Error',
        message: `Failed to edit employee`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Edit employee"
      open={isOpen}
      okText="Save"
      onOk={() => form.submit()}
      onCancel={closeModal}
      maskClosable={false}
      loading={isLoading}
    >
      <Form<EmployeeForm>
        form={form}
        initialValues={{
          first_name: employee.first_name,
          last_name: employee.last_name,
        }}
        onFinish={handleSave}
      >
        <Form.Item label={'First name'} name={'first_name'}>
          <Input />
        </Form.Item>
        <Form.Item label="Last name" name={'last_name'}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditUserModal
