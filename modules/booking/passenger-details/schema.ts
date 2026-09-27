import { z } from 'zod';

export const passengerDetailsSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required.'),

  middleName: z.string().trim().default(''),

  lastName: z.string().trim().min(1, 'Last name is required.'),

  email: z.string().trim().email('Enter a valid email address.'),

  phone: z.string().trim().min(7, 'Enter a valid phone number.'),

  dateOfBirth: z.string().trim().min(1, 'Date of birth is required.'),

  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),

  nationality: z.string().trim().min(1, 'Nationality is required.'),

  passportNumber: z.string().trim().default(''),

  passportExpiry: z.string().trim().default(''),
});

export type PassengerDetailsSchema = z.infer<typeof passengerDetailsSchema>;
