import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { allPaths } from '../../utils/path';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import {  UserSignup } from '../../redux/authFeature/authApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ServerResponse {
  message: string;
  user: {
    name: string;
    email: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
}

interface FormData {
  name: string;
  email: string;
  password: string;
  agreeToTerms?: boolean;
  password_confirmation?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  agreeToTerms?: string;
  password_confirmation?: string;
}

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state?.auth);

  const validateField = (name: keyof FormData, value: string | boolean): string | undefined => {
    switch (name) {
      case 'name':
        if (!value) return 'Name is required';
        if (typeof value === 'string' && value.length < 2) return 'Name must be at least 2 characters';
        if (typeof value === 'string' && value.length > 50) return 'Name must be less than 50 characters';
        return undefined;
      
      case 'email':
        if (!value) return 'Email is required';
        if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        return undefined;
      
      case 'password':
        if (!value) return 'Password is required';
        if (typeof value === 'string') {
          if (value.length < 8) return 'Password must be at least 8 characters';
          if (!/\d/.test(value)) return 'Password must contain at least one number';
          if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
          if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
        }
        return undefined;
      
      case 'agreeToTerms':
        if (!value) return 'You must agree to the Terms of Use and Privacy Policy';
        return undefined;
      
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: newValue
    }));
    if (name === 'password') {
      setFormData((prev: FormData) => ({
        ...prev,
        password_confirmation: newValue as string
      }));
    }

    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name as keyof FormData, newValue)
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    setErrors(prev => ({
      ...prev,
      [name]: validateField(name as keyof FormData, fieldValue)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
      const error = validateField(key, formData[key] as string | boolean);
      if (error) newErrors[key] = error;
    });

    setTouched({
      name: true,
      email: true,
      password: true,
      agreeToTerms: true
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const resultAction = await dispatch(UserSignup({
          ...formData,
          password_confirmation: formData.password_confirmation || ''
        }));
        
        if (UserSignup.fulfilled.match(resultAction)) {
          const response = resultAction.payload as ServerResponse;
          toast(
            <div className="">
              <p className="font-medium">{response.message}</p>
            </div>,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              type: "success"
            }
          );
          // setTimeout(() => {
          //   window.location.reload();
          //   navigate(`${allPaths.auth.verifyCode}`);
          // }, 2000);
          
        } else if (UserSignup.rejected.match(resultAction)) {
          toast.error((resultAction.payload as any)?.message || 'Registration failed. Please try again.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (err: any) {
        toast.error(err?.message || 'An unexpected error occurred. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      <ToastContainer />
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-left">
            <h1 className="text-3xl font-semibold text-gray-900">Sign up</h1>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <a href={allPaths.auth.login} className="text-green-500 hover:text-green-600 font-medium">
                Sign in
              </a>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full rounded-md border ${
                  errors.name && touched.name ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-primary-mainPink focus:outline-none focus:ring-1 focus:ring-primary-mainPink`}
                placeholder="John Doe"
              />
              {errors.name && touched.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full rounded-md border ${
                  errors.email && touched.email ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-primary-mainPink focus:outline-none focus:ring-1 focus:ring-primary-mainPink`}
                placeholder="Email@gmail.com"
              />
              {errors.email && touched.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`block w-full rounded-md border ${
                    errors.password && touched.password ? 'border-red-300' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-primary-mainPink focus:outline-none focus:ring-1 focus:ring-primary-mainPink`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-primary-mainPink ${
                    errors.agreeToTerms && touched.agreeToTerms ? 'border-red-300' : ''
                  }`}
                />
              </div>
              <div className="ml-3">
                <label htmlFor="agreeToTerms" className="text-sm text-gray-500">
                  I agree with{' '}
                  <a href="#" className="text-gray-900">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-gray-900">
                    Terms of Use
                  </a>
                </label>
              </div>
            </div>
            {errors.agreeToTerms && touched.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
            )}

            <div>
              <button
                disabled={isSubmitting || loading}
                type="submit"
                className={`w-full flex justify-center py-3 px-8 border border-transparent rounded-full shadow-sm text-sm font-medium text-white
                  ${isSubmitting || loading 
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-mainPink hover:bg-primary-mainPink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-mainPink'
                  }`}
              >
                {isSubmitting || loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;