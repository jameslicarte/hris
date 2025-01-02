'use server'

import { CreateEmployeeFormValues } from '@/app/manage/components/CreateEmployeeModal'
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import {
  CreateEmployeePayloadSchema,
  DeleteEmployeePayloadSchema,
  UpdateEmployeePayloadSchema,
} from '../schemas/schemas'

export const addEmployee = async (details: CreateEmployeeFormValues) => {
  const validatedFields = await CreateEmployeePayloadSchema.safeParseAsync(
    details
  )

  if (!validatedFields.success) {
    return {
      message: 'Invalid payload',
      record: details,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const employee = await prisma.employee.create({
    data: {
      first_name: details.firstName,
      last_name: details.lastName,
    },
  })

  revalidatePath('/manage')
  return {
    message: 'Employee created',
    record: employee,
  }
}

export const editEmployee = async (
  id: string,
  details: CreateEmployeeFormValues
) => {
  const validatedFields = await UpdateEmployeePayloadSchema.safeParseAsync(
    details
  )

  if (!validatedFields.success) {
    return {
      message: 'Invalid payload',
      record: details,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  await prisma.employee.update({
    where: { id },
    data: {
      first_name: details.firstName,
      last_name: details.lastName,
    },
  })
  revalidatePath('/manage')

  return {
    message: 'Employee updated',
    record: { id, ...details },
  }
}

export const deleteEmployee = async (employeeId: string) => {
  const validatedFields = await DeleteEmployeePayloadSchema.safeParseAsync({
    employeeId,
  })
  if (!validatedFields.success) {
    return {
      message: 'Invalid payload',
      record: employeeId,
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  await new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000)
  })

  await prisma.employee.delete({
    where: { id: employeeId },
  })

  revalidatePath('/manage')

  return {
    message: 'Employee deleted',
    record: validatedFields.data.employeeId,
  }
}
