// import React from 'react';
import SignUpForm from '../../components/auth/signUpComponent';
import AuthLayout from '../../layout/authLayout';

const SignUp = () => {

  return (
    <div className="">
        <AuthLayout>
            <SignUpForm />
        </AuthLayout>
    </div>
  );
};

export default SignUp;