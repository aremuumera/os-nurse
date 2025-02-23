import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { allPaths } from '../../utils/path';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { UserSignin } from '../../redux/authFeature/authApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface SignInResponse {
  message: string;
  user: {
    name: string;
    email: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
}

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const { loading } = useAppSelector((state) => state?.auth);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const validateField = (name: keyof FormData, value: string | boolean): string | undefined => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        return undefined;
      
      case 'password':
        if (!value) return 'Password is required';
        return undefined;
      
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

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
      if (key !== 'rememberMe') { // Don't validate remember me checkbox
        const error = validateField(key, formData[key] as string);
        if (error) newErrors[key] = error;
      }
    });

    setTouched({
      email: true,
      password: true
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const resultAction = await dispatch(UserSignin({
          email: formData.email,
          password: formData.password
        }));
        
        if (resultAction.meta.requestStatus === 'fulfilled') {
          const response = resultAction.payload as SignInResponse;
          
          toast.success(
            <div className="flex flex-col">
              <p className="font-medium">{response.message}</p>
              <p className="text-sm mt-1">Welcome back, {response.user.name}!</p>
            </div>,
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );

          // Wait for toast to be visible before reloading
          setTimeout(() => {
            window.location.reload();
          }, 3000);

        } else {
          const errorMessage = (resultAction.payload as { message: string })?.message || 'Sign in failed. Please try again.';
          toast.error(errorMessage, {
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
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      <ToastContainer />
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-left">
            <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{' '}
              <a href={allPaths.auth.register} className="text-green-500 hover:text-green-600 font-medium">
                Sign up
              </a>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
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
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-primary-mainPink"
                />
              </div>
              <div className="ml-2 w-full flex items-center !justify-between">
                <label htmlFor="rememberMe" className="text-sm block text-gray-400">
                  Remember me
                </label>
                <a href={allPaths.auth.forgotPassword} className="text-sm block">forgot password?</a>
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className={`w-full flex justify-center py-3 px-8 border border-transparent rounded-full shadow-sm text-sm font-medium text-white ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary-mainPink hover:bg-primary-mainPink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-mainPink'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;