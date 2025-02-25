

import AuthLayout from '../../layout/authLayout';
import EmailVerification from '../../components/auth/verifyEmail';


const VerifyEmailPage = () => {
  return (
    <div>
      <AuthLayout>
            <EmailVerification />
        </AuthLayout>
    </div>
  )
}

export default VerifyEmailPage
