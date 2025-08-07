import React from 'react';
import { useAnimation } from './ui/useAnimation';
import { useApi } from './hooks/useApi';

export interface AuthFormProps {
  formState: boolean;
  setFormState?: () => void;
}


const AuthForm: React.FC<AuthFormProps> = ({ formState, setFormState }) => {
  const {content, handleToggle, isTransitioning} = useAnimation({formState, setFormState});

  const {handleChange, handleSubmit} = useApi({formState});

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="relative w-full md:w-sm">
        {/* Background card with consistent size */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm">

          {/* Content container with smooth transitions */}
          <div
            className={`transition-all duration-300 ease-out transform ${isTransitioning
              ? 'opacity-0 translate-y-4 scale-95'
              : 'opacity-100 translate-y-0 scale-100'
              }`}
          >
            {/* Header with staggered animation */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 transition-all duration-300">
                {content.title}
              </h1>
              <p className="text-gray-600 transition-all duration-300 delay-75">
                {content.heading}
              </p>
            </div>

            {/* Form with animated fields */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {content.fields.map((field, index) => (
                <div
                  key={field}
                  className="transition-all duration-300 ease-out"
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  <input
                    onChange={handleChange}
                    id={field}
                    type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 
                             focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent
                             focus:bg-white transition-all duration-200 ease-out
                             placeholder:text-gray-400 text-gray-700"
                    required
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={isTransitioning}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 
                         hover:from-green-600 hover:to-green-700 
                         disabled:from-gray-400 disabled:to-gray-500
                         text-white font-semibold py-3 rounded-lg 
                         transition-all duration-200 ease-out
                         transform hover:translate-y-[-2px] hover:shadow-lg
                         active:translate-y-0 active:shadow-md
                         disabled:hover:translate-y-0 disabled:hover:shadow-none
                         disabled:cursor-not-allowed"
              >
                <span className="inline-block transition-transform duration-150">
                  {content.button}
                </span>
              </button>
            </form>

            {/* Animated divider */}
            <div className="flex items-center gap-4 py-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <span className="text-sm text-gray-500 font-medium px-2">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Toggle form link with hover effects */}
            <div className="text-center">
              <span className="text-gray-600 text-sm">
                {content.bottomText}{' '}
              </span>
              <button
                onClick={handleToggle}
                disabled={isTransitioning}
                className="text-green-600 hover:text-green-700 font-semibold text-sm
                         hover:underline decoration-2 underline-offset-2
                         transition-all duration-150 ease-out
                         disabled:opacity-50 disabled:cursor-not-allowed
                         disabled:hover:no-underline disabled:hover:text-green-600"
              >
                {content.bottomButton}
              </button>
            </div>
          </div>
        </div>

        {/* Subtle loading indicator */}
        {isTransitioning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;