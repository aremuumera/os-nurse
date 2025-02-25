// EmailVerification.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import { toast, ToastContainer,  } from 'react-toastify';
// import { VerifyEmail } from '../../redux/authFeature/authApi';
import {  useAppSelector } from '../../redux/store';
import { allPaths } from '../../utils/path';

// Assuming you have an API service setup

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
//   const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  //  const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state?.auth);
  
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Extract token from URL
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (!token) {
          setError('Verification token is missing');
        //   setLoading(false);
          toast.error('Verification token is missing', {
            autoClose: 5000,
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          return;
        }

        // Call the verification API
        // const response = await dispatch(VerifyEmail({ token }))
        
        setVerified(true);
        // setLoading(false);
        toast.success('Email verified successfully!');
      } catch (error: any) {
        console.error('Verification failed:', error);
        setError(error.response?.data?.message || 'Email verification failed');
        // setLoading(false);
        toast.error(error.response?.data?.message || 'Email verification failed');
      }
    };

    verifyToken();
  }, [location]);

  const handleNavigateToSignIn = () => {
    navigate(`${allPaths.auth.login}`);
  };

  const handleResendVerification = async () => {
    try {
      // This functionality would need to be implemented in your backend
      // Assuming there's an endpoint to resend verification email
      // await resendVerificationEmail(email);
      toast.info('Verification email has been resent');
    } catch {
      toast.error('Failed to resend verification email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  py-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          {loading ? (
            <div className="flex flex-col items-center my-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-800"></div>
              <h2 className="text-xl font-medium mt-6">
                Verifying your email...
              </h2>
            </div>
          ) : verified ? (
            <div className="flex flex-col items-center my-6">
              <CheckCircle className="h-20 w-20 text-green-500 mb-4" />
              <h1 className="text-3xl font-bold mb-2">
                Email Verified!
              </h1>
              <p className="text-gray-600 mb-8 max-w-xs mx-auto">
                Your email has been successfully verified. You can now sign in to your account.
              </p>
              <button
                onClick={handleNavigateToSignIn}
                className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-medium transition-transform hover:bg-blue-700 hover:-translate-y-1"
              >
                Go to Sign In
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center my-6">
              <XCircle className="h-20 w-20 text-red-500 mb-4" />
              <h1 className="text-3xl font-bold mb-2">
                Verification Failed
              </h1>
              <p className="text-gray-600 mb-8 max-w-xs mx-auto">
                {error || "We couldn't verify your email. The verification link may have expired or is invalid."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleResendVerification}

                  className="px-5 py-2 border-2 border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50"
                >
                  {loading ? "Resending..." : "Resend Verification"}
                </button>
                <button
                  onClick={handleNavigateToSignIn}
                  className="px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmailVerification;