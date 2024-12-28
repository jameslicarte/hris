import { Nullable } from '@/schemas/types'
import { createContext, useContext } from 'react'

export const NotificationContext = createContext<{
  notify: React.Dispatch<
    React.SetStateAction<
      Nullable<{
        message: string
        title: string
      }>
    >
  >
}>({
  notify: () => null,
})

export const useNotification = () => useContext(NotificationContext)
