import React from 'react';
import { XCircle } from 'lucide-react';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  icon?: any;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

const FormField = ({
  name,
  label,
  type = 'text',
  required = false,
  icon: Icon,
  value,
  onChange,
  error,
  placeholder
}: FormFieldProps) => {
  const isEmpty = !value || value.trim() === '';

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon className={`w-4 h-4 ${error ? 'text-red-400' : 'text-gray-400'}`} />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`
            w-full border rounded-lg px-3 py-3 text-sm transition-all
            focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'}
          `}
          placeholder={placeholder || label}
        />
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <XCircle className="w-4 h-4 text-red-400" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
      {required && isEmpty && !error && (
        <p className="text-gray-500 text-xs">Ce champ est requis</p>
      )}
    </div>
  );
};

export default FormField;
