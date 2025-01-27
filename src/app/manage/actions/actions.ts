'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import {
  CreateEmployeePayloadSchema,
  DeleteEmployeePayloadSchema,
  UpdateEmployeePayloadSchema,
} from '../schemas/schemas'
import { CreateEmployeePayload, UpdateEmployeePayload } from '../schemas/types'

export const addEmployee = async (details: CreateEmployeePayload) => {
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
    data: details,
  })

  revalidatePath('/manage')
  return {
    message: 'Employee created',
    record: employee,
  }
}

export const editEmployee = async (
  id: string,
  details: UpdateEmployeePayload
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
    data: details,
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
