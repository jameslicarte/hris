'use client'
import { Form, Input, Modal } from 'antd'
import { FormInstance } from 'antd/es/form/Form'
import FormItem from 'antd/es/form/FormItem'
import React from 'react'

export type CreateEmployeeFormValues = {
  first_name: string
  last_name: string
}

type Props = {
  form: FormInstance
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onSave: (details: CreateEmployeeFormValues) => void
}

const CreateEmployeeModal = ({ form, isOpen, setIsOpen, onSave }: Props) => {
  const handleClose = () => {
    form.resetFields()
    setIsOpen(false)
  }

  return (
    <Modal
      title="Add Employee"
      open={isOpen}
      onClose={handleClose}
      onCancel={handleClose}
      onOk={() => form.submit()}
      maskClosable={false}
    >
      <Form form={form} onFinish={onSave}>
        <FormItem label="First Name" name="first_name">
          <Input />
        </FormItem>
        <FormItem label="Last Name" name="last_name">
          <Input />
        </FormItem>
      </Form>
    </Modal>
  )
}

export default CreateEmployeeModal
