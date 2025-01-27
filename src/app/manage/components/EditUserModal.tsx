import { Modal } from 'antd'
import React from 'react'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const EditUserModal = ({ isOpen, setIsOpen }: Props) => {
  const closeModal = () => {
    setIsOpen(false)
  }

  const handleSave = () => {
    closeModal()
  }

  return (
    <Modal
      title="Edit user"
      open={isOpen}
      okText="Save"
      onOk={handleSave}
      onCancel={closeModal}
      maskClosable={false}
    >
      {/* content */}
    </Modal>
  )
}

export default EditUserModal
