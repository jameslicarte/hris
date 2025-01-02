import prisma from '@/lib/db'
import { addEmployee, editEmployee, deleteEmployee } from '../actions'

jest.mock('@/lib/db', () => ({
  employee: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}))

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}))

describe('Employee Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('addEmployee', () => {
    it('creates a new employee', async () => {
      const details = { firstName: 'John', lastName: 'Doe' }

      const mockFn = prisma.employee.create as jest.Mock
      mockFn.mockResolvedValue(details)

      const res = await addEmployee(details)

      expect(res).toEqual({
        message: 'Employee created',
        record: details,
      })
    })

    it('should return invalid error if passed empty strings', async () => {
      const details = { firstName: '', lastName: '' }
      const res = await addEmployee(details)

      expect(res).toEqual({
        message: 'Invalid payload',
        record: details,
        error: {
          firstName: ['String should not be empty or start with a number'],
          lastName: ['String should not be empty or start with a number'],
        },
      })
    })

    it('should return invalid error if passed numbers at the start', async () => {
      const details = { firstName: '1 John', lastName: '2 Doe' }
      const res = await addEmployee(details)

      expect(res).toEqual({
        message: 'Invalid payload',
        record: details,
        error: {
          firstName: ['String should not be empty or start with a number'],
          lastName: ['String should not be empty or start with a number'],
        },
      })
    })
  })

  describe('editEmployee', () => {
    it('editEmployee updates an existing employee', async () => {
      const id = '1'
      const details = { firstName: 'Jane', lastName: 'Doe' }
      const res = await editEmployee(id, details)

      const mockFn = prisma.employee.create as jest.Mock
      mockFn.mockResolvedValue(details)

      expect(res).toEqual({
        message: 'Employee updated',
        record: { id, ...details },
      })
    })

    it('should return invalid error if passed empty strings', async () => {
      const id = '1'
      const details = { firstName: '', lastName: '' }
      const res = await editEmployee(id, details)

      expect(res).toEqual({
        message: 'Invalid payload',
        record: details,
        error: {
          firstName: ['String should not be empty or start with a number'],
          lastName: ['String should not be empty or start with a number'],
        },
      })
    })

    it('should return invalid error if passed numbers at the start', async () => {
      const id = '1'
      const details = { firstName: '1 John', lastName: '2 Doe' }
      const res = await editEmployee(id, details)

      expect(res).toEqual({
        message: 'Invalid payload',
        record: details,
        error: {
          firstName: ['String should not be empty or start with a number'],
          lastName: ['String should not be empty or start with a number'],
        },
      })
    })
  })

  describe('deleteEmployee', () => {
    it('deletes an employee', async () => {
      const employeeId = '1'
      const res = await deleteEmployee(employeeId)

      expect(res).toEqual({
        message: 'Employee deleted',
        record: employeeId,
      })
    })

    it('should return invalid error if passed empty strings', async () => {
      const employeeId = ''
      const res = await deleteEmployee(employeeId)

      expect(res).toEqual({
        message: 'Invalid payload',
        record: employeeId,
        error: {
          employeeId: ['String should not be empty'],
        },
      })
    })
  })
})
