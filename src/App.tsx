import React, { useState } from 'react';
import { FormProgress } from './components/FormProgress';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { AddressForm } from './components/AddressForm';
import { IdentityForm } from './components/IdentityForm';
import { ReviewForm } from './components/ReviewForm';
import { KYCFormData, FormStep } from './types/kyc';
import { personalInfoSchema, addressSchema, identitySchema } from './utils/validation';

function App() {
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');
  const [formData, setFormData] = useState<Partial<KYCFormData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof KYCFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep = async () => {
    try {
      switch (currentStep) {
        case 'personal':
          await personalInfoSchema.parseAsync(formData);
          break;
        case 'address':
          await addressSchema.parseAsync(formData);
          break;
        case 'identity':
          await identitySchema.parseAsync(formData);
          break;
        default:
          return true;
      }
      return true;
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      error.errors.forEach((err: any) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleNext = async () => {
    if (await validateStep()) {
      switch (currentStep) {
        case 'personal':
          setCurrentStep('address');
          break;
        case 'address':
          setCurrentStep('identity');
          break;
        case 'identity':
          setCurrentStep('review');
          break;
      }
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'address':
        setCurrentStep('personal');
        break;
      case 'identity':
        setCurrentStep('address');
        break;
      case 'review':
        setCurrentStep('identity');
        break;
    }
  };

  const handleSubmit = async () => {
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
  };

  const renderForm = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={formData}
            onChange={handleChange}
            errors={errors}
          />
        );
      case 'address':
        return (
          <AddressForm
            data={formData}
            onChange={handleChange}
            errors={errors}
          />
        );
      case 'identity':
        return (
          <IdentityForm
            data={formData}
            onChange={handleChange}
            errors={errors}
          />
        );
      case 'review':
        return (
          <ReviewForm
            data={formData}
            onEdit={setCurrentStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Account Verification (KYC)
          </h1>
          
          <FormProgress currentStep={currentStep} />
          
          <div className="mt-8">{renderForm()}</div>
          
          <div className="mt-8 flex justify-between">
            {currentStep !== 'personal' && (
              <button
                onClick={handleBack}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back
              </button>
            )}
            
            {currentStep === 'review' ? (
              <button
                onClick={handleSubmit}
                className="ml-auto bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="ml-auto bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;