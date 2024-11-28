export interface KYCFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;

  // Address Information
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;

  // Identity Verification
  taxId: string;
  documentType: 'passport' | 'driving_license' | 'national_id';
  documentFile: File | null;
  
  // Employment Information
  employmentStatus: string;
  employer: string;
  occupation: string;
}

export type FormStep = 'personal' | 'address' | 'identity' | 'review';

export interface FormError {
  field: string;
  message: string;
}