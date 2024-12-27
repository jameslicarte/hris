'use client'
import React, { useState } from 'react'
import CreateEmployeeModal, {
  CreateEmployeeFormValues,
} from './CreateEmployeeModal'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { addEmployee } from '../actions/actions'
import { useForm } from 'antd/es/form/Form'

const CreateEmployeeButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [form] = useForm()

  const handleOnSave = async (values: CreateEmployeeFormValues) => {
    await addEmployee(values)
    setIsOpen(false)
    form.resetFields()
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
