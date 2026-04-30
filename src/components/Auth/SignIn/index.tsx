"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import toast, { Toaster } from "react-hot-toast";
import SocialButtons from "../SocialButtons";
import AuthDialogContext from "@/app/context/AuthDialogContext";
import { useTranslation } from "@/context/LanguageContext";

type Props = {
  /** Optional callback to close the parent dialog after successful sign in. */
  signInOpen?: (open: boolean) => void;
  /** Hides the heading when rendered inside an already-titled container. */
  compact?: boolean;
};

const SignIn = ({ signInOpen, compact = false }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const authDialog = useContext(AuthDialogContext);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error);
      toast.error(result.error);
      authDialog?.setIsFailedDialogOpen(true);
      setTimeout(() => authDialog?.setIsFailedDialogOpen(false), 1100);
      return;
    }

    if (result?.status === 200) {
      authDialog?.setIsSuccessDialogOpen(true);
      setTimeout(() => authDialog?.setIsSuccessDialogOpen(false), 1100);
      setTimeout(() => signInOpen?.(false), 1200);
    }
  };

  return (
    <div className="text-left">
      {!compact && (
        <div className="mb-8 text-center">
          <h2 className="text-h2 font-bold text-midnight_text dark:text-white mb-2">
            {t("auth.signin.title")}
          </h2>
          <p className="text-body text-muted dark:text-white/70">
            {t("auth.signin.subtitle")}
          </p>
        </div>
      )}

      <SocialButtons mode="signin" />

      <div className="relative my-6 flex items-center" aria-hidden="true">
        <div className="flex-1 h-px bg-border dark:bg-dark_border" />
        <span className="px-3 text-caption font-medium text-muted dark:text-white/50 uppercase tracking-widest">
          {t("auth.common.or")}
        </span>
        <div className="flex-1 h-px bg-border dark:bg-dark_border" />
      </div>

      <Toaster />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="signin-username"
            className="block text-caption font-semibold text-midnight_text dark:text-white mb-1.5"
          >
            {t("auth.signin.usernameLabel")}
          </label>
          <div className="relative">
            <Icon
              icon="solar:user-linear"
              width="20"
              height="20"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted dark:text-white/50 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="signin-username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t("auth.signin.usernamePlaceholder")}
              className="w-full rounded-lg border border-border dark:border-dark_border bg-white dark:bg-darkmode pl-11 pr-4 py-3 text-body text-midnight_text dark:text-white placeholder:text-muted/60 dark:placeholder:text-white/30 transition-colors focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="signin-password"
              className="block text-caption font-semibold text-midnight_text dark:text-white"
            >
              {t("auth.signin.passwordLabel")}
            </label>
            <Link
              href="#"
              className="text-caption font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            >
              {t("auth.signin.forgotPassword")}
            </Link>
          </div>
          <div className="relative">
            <Icon
              icon="solar:lock-password-linear"
              width="20"
              height="20"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted dark:text-white/50 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="signin-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("auth.signin.passwordPlaceholder")}
              className="w-full rounded-lg border border-border dark:border-dark_border bg-white dark:bg-darkmode pl-11 pr-11 py-3 text-body text-midnight_text dark:text-white placeholder:text-muted/60 dark:placeholder:text-white/30 transition-colors focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? t("auth.common.hidePassword") : t("auth.common.showPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted dark:text-white/50 hover:text-primary p-1 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Icon
                icon={showPassword ? "solar:eye-closed-linear" : "solar:eye-linear"}
                width="20"
                height="20"
              />
            </button>
          </div>
        </div>

        {error && (
          <p className="text-caption text-danger" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-white font-semibold py-3 text-body transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {loading ? (
            <>
              <Icon icon="svg-spinners:ring-resize" width="20" height="20" />
              <span>{t("auth.signin.submitting")}</span>
            </>
          ) : (
            <>
              <span>{t("auth.signin.submit")}</span>
              <Icon icon="solar:arrow-right-linear" width="20" height="20" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-body text-muted dark:text-white/70 mt-6">
        {t("auth.signin.noAccount")}{" "}
        <Link
          href="/signup"
          className="font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
        >
          {t("auth.signin.signUpLink")}
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
