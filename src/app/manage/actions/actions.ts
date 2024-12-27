'use server'

import { CreateEmployeeFormValues } from '@/app/manage/components/CreateEmployeeModal'
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'

export const addEmployee = async (details: CreateEmployeeFormValues) => {
  await prisma.employee.create({
    data: {
      first_name: details.firstName,
      last_name: details.lastName,
    },
  })

  revalidatePath('/manage')
}

export const editEmployee = async (
  id: string,
  details: CreateEmployeeFormValues
) => {
  await prisma.employee.update({
    where: { id },
    data: {
      first_name: details.firstName,
      last_name: details.lastName,
    },
  })
  revalidatePath('/manage')
}

export const deleteEmployee = async (id: string) => {
  await prisma.employee.delete({
    where: { id },
  })
  revalidatePath('/manage')
}
