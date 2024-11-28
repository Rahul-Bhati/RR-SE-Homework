import React from 'react';
import { KYCFormData } from '../types/kyc';

interface ReviewFormProps {
  data: Partial<KYCFormData>;
  onEdit: (step: string) => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ data, onEdit }) => {
  const renderSection = (title: string, fields: { label: string; value: string }[], step: string) => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <button
          onClick={() => onEdit(step)}
          className="text-blue-500 hover:text-blue-700 text-sm font-medium"
        >
          Edit
        </button>
      </div>
      <dl className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md shadow-sm">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 text-sm text-gray-900">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderSection(
        'Personal Information',
        [
          { label: 'First Name', value: data.firstName || '' },
          { label: 'Last Name', value: data.lastName || '' },
          { label: 'Date of Birth', value: data.dateOfBirth || '' },
          { label: 'Email', value: data.email || '' },
          { label: 'Phone', value: data.phone || '' },
        ],
        'personal'
      )}

      {renderSection(
        'Address Information',
        [
          { label: 'Street', value: data.street || '' },
          { label: 'City', value: data.city || '' },
          { label: 'State', value: data.state || '' },
          { label: 'Postal Code', value: data.postalCode || '' },
          { label: 'Country', value: data.country || '' },
        ],
        'address'
      )}

      {renderSection(
        'Identity Information',
        [
          { label: 'Tax ID', value: data.taxId || '' },
          { label: 'Document Type', value: data.documentType || '' },
          { label: 'Employment Status', value: data.employmentStatus || '' },
          { label: 'Employer', value: data.employer || '' },
          { label: 'Occupation', value: data.occupation || '' },
        ],
        'identity'
      )}
    </div>
  );
};
