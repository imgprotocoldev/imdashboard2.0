import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign In to IMG Protocol Dashboard"
        description="IMG Protocol authentication with email, Google, and Twitter login"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
