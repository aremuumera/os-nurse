

import AuthLayout from '../../layout/authLayout';
import PasswordResetFlow from '../../components/auth/verifyCode';


const VerifyCode = () => {
  return (
    <div>
      <AuthLayout>
            <PasswordResetFlow />
        </AuthLayout>
    </div>
  )
}

export default VerifyCode
