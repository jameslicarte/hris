import { z } from 'zod'

const nonNumberString = z
  .string()
  .refine((val) => val.trim() !== '' && !/^\d/.test(val), {
    message: 'String should not be empty or start with a number',
  })

const nonEmptyString = z.string().refine((val) => val.trim() !== '', {
  message: 'String should not be empty',
})

export const CreateEmployeePayloadSchema = z.object({
  first_name: nonNumberString,
  last_name: nonNumberString,
})

export const UpdateEmployeePayloadSchema = z.object({
  first_name: nonNumberString,
  last_name: nonNumberString,
})

export const DeleteEmployeePayloadSchema = z.object({
  employeeId: nonEmptyString,
})
