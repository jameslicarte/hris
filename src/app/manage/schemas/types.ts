import { z } from 'zod'
import {
  CreateEmployeePayloadSchema,
  UpdateEmployeePayloadSchema,
} from './schemas'

export type CreateEmployeePayload = z.infer<typeof CreateEmployeePayloadSchema>
export type UpdateEmployeePayload = z.infer<typeof UpdateEmployeePayloadSchema>
