import SignIn from "@/components/Auth/SignIn";
import AuthLayout from "@/components/Auth/AuthLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Payflow",
  description: "Sign in to your Payflow account.",
};

const SigninPage = () => (
  <AuthLayout>
    <SignIn />
  </AuthLayout>
);

export default SigninPage;
