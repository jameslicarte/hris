import { z } from 'zod'

export const DeleteEmployeePayloadSchema = z.object({
  employeeId: z.string(),
})
