'use client'
import React, { useState } from 'react'
import CreateEmployeeModal, {
  CreateEmployeeFormValues,
} from './CreateEmployeeModal'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { addEmployee } from '../actions/actions'
import { useForm } from 'antd/es/form/Form'
import { useNotification } from '@/lib/context'

const CreateEmployeeButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [form] = useForm()
  const notification = useNotification()

  const handleOnSave = async (values: CreateEmployeeFormValues) => {
    await addEmployee(values)
    setIsOpen(false)
    form.resetFields()
    notification.notify({
      title: 'Status',
      message: `Employee ${values.firstName} ${values.lastName} created`,
    })
  }

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsOpen(true)}
      >
        Create employee
      </Button>
      <CreateEmployeeModal
        form={form}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSave={handleOnSave}
      />
    </>
  )
}

export default CreateEmployeeButton
