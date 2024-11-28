import React, { useState, lazy, Suspense } from 'react';
import { FormProgress } from './components/FormProgress';
import { KYCFormData, FormStep } from './types/kyc';
import { personalInfoSchema, addressSchema, identitySchema } from './utils/validation';
import { PersonalInfoFormSkeleton } from './components/PersonalInfoForm';

const PersonalInfoForm = lazy(() => import('./components/PersonalInfoForm').then(module => ({ default: module.PersonalInfoForm })));
const AddressForm = lazy(() => import('./components/AddressForm').then(module => ({ default: module.AddressForm })));
const IdentityForm = lazy(() => import('./components/IdentityForm').then(module => ({ default: module.IdentityForm })));
const ReviewForm = lazy(() => import('./components/ReviewForm').then(module => ({ default: module.ReviewForm })));

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
          await personalInfoSchema.pick({ [currentStep]: true }).parseAsync(formData);
          break;
        case 'address':
          await addressSchema.pick({ [currentStep]: true }).parseAsync(formData);
          break;
        case 'identity':
          await identitySchema.pick({ [currentStep]: true }).parseAsync(formData);
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

          <Suspense fallback={<PersonalInfoFormSkeleton />}>
            <div className="mt-8">{renderForm()}</div>
          </Suspense>

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
