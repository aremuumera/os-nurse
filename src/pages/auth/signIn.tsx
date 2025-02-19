
import AuthLayout from '../../layout/authLayout';
import SignInForm from '../../components/auth/signInComponent';

const SignIn = () => {
  return (
    <div>
      <div className="">
        <AuthLayout>
            <SignInForm />
        </AuthLayout>
    </div>
    </div>
  )
}

export default SignIn
