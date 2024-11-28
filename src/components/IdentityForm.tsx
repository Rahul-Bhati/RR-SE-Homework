import React from 'react';
import { KYCFormData } from '../types/kyc';

interface IdentityFormProps {
  data: Partial<KYCFormData>;
  onChange: (field: keyof KYCFormData, value: string | File) => void;
  errors: Record<string, string>;
}

export const IdentityForm: React.FC<IdentityFormProps> = ({
  data,
  onChange,
  errors,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange('documentFile', file);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Tax ID</label>
        <input
          type="text"
          value={data.taxId || ''}
          onChange={(e) => onChange('taxId', e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        {errors.taxId && <p className="mt-1 text-sm text-red-600">{errors.taxId}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Document Type</label>
        <select
          value={data.documentType || ''}
          onChange={(e) => onChange('documentType', e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select document type</option>
          <option value="passport">Passport</option>
          <option value="driving_license">Driving License</option>
          <option value="national_id">National ID</option>
        </select>
        {errors.documentType && (
          <p className="mt-1 text-sm text-red-600">{errors.documentType}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Document</label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        {errors.documentFile && (
          <p className="mt-1 text-sm text-red-600">{errors.documentFile}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Employment Status</label>
        <select
          value={data.employmentStatus || ''}
          onChange={(e) => onChange('employmentStatus', e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select employment status</option>
          <option value="employed">Employed</option>
          <option value="self_employed">Self-Employed</option>
          <option value="unemployed">Unemployed</option>
          <option value="retired">Retired</option>
        </select>
        {errors.employmentStatus && (
          <p className="mt-1 text-sm text-red-600">{errors.employmentStatus}</p>
        )}
      </div>

      {data.employmentStatus && data.employmentStatus !== 'unemployed' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Employer</label>
            <input
              type="text"
              value={data.employer || ''}
              onChange={(e) => onChange('employer', e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            {errors.employer && (
              <p className="mt-1 text-sm text-red-600">{errors.employer}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Occupation</label>
            <input
              type="text"
              value={data.occupation || ''}
              onChange={(e) => onChange('occupation', e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            {errors.occupation && (
              <p className="mt-1 text-sm text-red-600">{errors.occupation}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
