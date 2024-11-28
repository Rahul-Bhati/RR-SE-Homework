import React from 'react';
import { Check, Circle } from 'lucide-react';
import { FormStep } from '../types/kyc';

interface FormProgressProps {
  currentStep: FormStep;
}

const steps: { id: FormStep; label: string }[] = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'address', label: 'Address' },
  { id: 'identity', label: 'Identity' },
  { id: 'review', label: 'Review' },
];

export const FormProgress: React.FC<FormProgressProps> = ({ currentStep }) => {
  const getCurrentStepIndex = () => steps.findIndex(step => step.id === currentStep);

  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const isCompleted = index < getCurrentStepIndex();
          const isCurrent = step.id === currentStep;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </div>
                <span className="text-sm mt-2">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    index < getCurrentStepIndex() ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};