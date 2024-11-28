import React from 'react';
import { KYCFormData } from '../types/kyc';

interface AddressFormProps {
  data: Partial<KYCFormData>;
  onChange: (field: keyof KYCFormData, value: string) => void;
  errors: Record<string, string>;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  data,
  onChange,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Street Address</label>
        <input
          type="text"
          value={data.street || ''}
          onChange={(e) => onChange('street', e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street}</p>}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            value={data.city || ''}
            onChange={(e) => onChange('city', e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            value={data.state || ''}
            onChange={(e) => onChange('state', e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Postal Code</label>
          <input
            type="text"
            value={data.postalCode || ''}
            onChange={(e) => onChange('postalCode', e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <select
            value={data.country || ''}
            onChange={(e) => onChange('country', e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country}</p>
          )}
        </div>
      </div>
    </div>
  );
};
