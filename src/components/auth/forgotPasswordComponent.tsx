import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { UserForgotPassword } from '../../redux/authFeature/authApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { allPaths } from '../../utils/path';

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

const ForgotPasswordForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state?.auth);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name as keyof FormData, value)
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    setErrors(prev => ({
      ...prev,
      [name]: validateField(name as keyof FormData, value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setTouched({ email: true });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const resultAction = await dispatch(UserForgotPassword({ email: formData.email }));
        
        if (UserForgotPassword.fulfilled.match(resultAction)) {
          toast(
            <div>
              <p className="font-medium text-black">{(resultAction.payload as { message: string }).message}</p>
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
          
          setTimeout(() => {
            navigate(allPaths.auth.login);
          }, 2000);
          
        } else if (UserForgotPassword.rejected.match(resultAction)) {
          toast.error((resultAction.payload as any)?.message || 'Failed to send reset link. Please try again.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (err: unknown) {
        toast.error((err as { message: string })?.message || 'An unexpected error occurred. Please try again.', {
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
            <h1 className="text-3xl font-semibold text-gray-900">Reset Password</h1>
            <p className="mt-2 text-sm text-gray-600">
              Forgot your password? No worries, submit password reset. It will be sent to your email.
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
                disabled={isSubmitting || loading}
                className={`mt-1 block w-full rounded-md border ${
                  errors.email && touched.email ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-primary-mainPink focus:outline-none focus:ring-1 focus:ring-primary-mainPink ${
                  (isSubmitting || loading) ? 'bg-gray-100' : ''
                }`}
                placeholder="Email@gmail.com"
              />
              {errors.email && touched.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className={`w-full flex justify-center py-3 px-8 border border-transparent rounded-full shadow-sm text-sm font-medium text-white
                  ${isSubmitting || loading 
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-mainPink hover:bg-primary-mainPink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-mainPink'
                  }`}
              >
                {isSubmitting || loading ? 'Sending...' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;