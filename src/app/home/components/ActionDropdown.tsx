'use client'
import { Button, Dropdown } from 'antd'
import { ItemType } from 'antd/es/menu/interface'
import React from 'react'

const ActionDropdown = () => {
  const items: ItemType[] = [
    {
      key: 'view',
      label: 'View',
      onClick: () => {
        window.alert('View TBC')
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
      key: 'delet',
      label: 'Delete',
      onClick: () => {
        window.alert('Delete TBC')
      },
    },
  ]

  return (
    <Dropdown menu={{ items }} placement="bottomLeft">
      <Button>V</Button>
    </Dropdown>
  )
}

export default ActionDropdown
