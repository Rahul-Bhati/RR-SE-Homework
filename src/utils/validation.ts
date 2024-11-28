import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number'),
});

export const addressSchema = z.object({
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().min(5, 'Valid postal code is required'),
  country: z.string().min(2, 'Country is required'),
});

export const identitySchema = z.object({
  taxId: z.string().min(9, 'Valid tax ID is required'),
  documentType: z.enum(['passport', 'driving_license', 'national_id']),
  documentFile: z.instanceof(File).nullable(),
  employmentStatus: z.string().min(2, 'Employment status is required'),
  employer: z.string().min(2, 'Employer name is required'),
  occupation: z.string().min(2, 'Occupation is required'),
});