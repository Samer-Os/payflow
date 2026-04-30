import SignUp from "@/components/Auth/SignUp";
import AuthLayout from "@/components/Auth/AuthLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Payflow",
  description: "Create your Payflow account and start building in days.",
};

const SignupPage = () => (
  <AuthLayout>
    <SignUp />
  </AuthLayout>
);

export default SignupPage;
