"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@iconify/react";
import toast, { Toaster } from "react-hot-toast";
import SocialButtons from "../SocialButtons";
import { useTranslation } from "@/context/LanguageContext";

type Props = {
  /** Hides the heading when rendered inside an already-titled container. */
  compact?: boolean;
};

const SignUp = ({ compact = false }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) throw new Error(t("auth.signup.errorGeneric"));
      toast.success(t("auth.signup.successToast"));
      setTimeout(() => router.push("/signin"), 800);
    } catch (err) {
      const msg = err instanceof Error ? err.message : t("auth.signup.errorFallback");
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = (() => {
    if (!password) return null;
    if (password.length < 8)
      return { label: t("auth.signup.strengthShort"), level: 1, color: "bg-danger" };
    if (password.length < 12 || !/\d/.test(password))
      return { label: t("auth.signup.strengthOkay"), level: 2, color: "bg-amber-400" };
    return { label: t("auth.signup.strengthStrong"), level: 3, color: "bg-green" };
  })();

  return (
    <div className="text-left">
      {!compact && (
        <div className="mb-8 text-center">
          <h2 className="text-h2 font-bold text-midnight_text dark:text-white mb-2">
            {t("auth.signup.title")}
          </h2>
          <p className="text-body text-muted dark:text-white/70">
            {t("auth.signup.subtitle")}
          </p>
        </div>
      )}

      <SocialButtons mode="signup" />

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
            htmlFor="signup-name"
            className="block text-caption font-semibold text-midnight_text dark:text-white mb-1.5"
          >
            {t("auth.signup.nameLabel")}
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
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("auth.signup.namePlaceholder")}
              className="w-full rounded-lg border border-border dark:border-dark_border bg-white dark:bg-darkmode pl-11 pr-4 py-3 text-body text-midnight_text dark:text-white placeholder:text-muted/60 dark:placeholder:text-white/30 transition-colors focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="block text-caption font-semibold text-midnight_text dark:text-white mb-1.5"
          >
            {t("auth.signup.emailLabel")}
          </label>
          <div className="relative">
            <Icon
              icon="solar:letter-linear"
              width="20"
              height="20"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted dark:text-white/50 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.signup.emailPlaceholder")}
              className="w-full rounded-lg border border-border dark:border-dark_border bg-white dark:bg-darkmode pl-11 pr-4 py-3 text-body text-midnight_text dark:text-white placeholder:text-muted/60 dark:placeholder:text-white/30 transition-colors focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="block text-caption font-semibold text-midnight_text dark:text-white mb-1.5"
          >
            {t("auth.signup.passwordLabel")}
          </label>
          <div className="relative">
            <Icon
              icon="solar:lock-password-linear"
              width="20"
              height="20"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted dark:text-white/50 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("auth.signup.passwordPlaceholder")}
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
          {passwordStrength && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1 bg-border dark:bg-dark_border rounded-full overflow-hidden">
                <div
                  className={`h-full ${passwordStrength.color} transition-all`}
                  style={{
                    width:
                      passwordStrength.level === 1
                        ? "33%"
                        : passwordStrength.level === 2
                          ? "66%"
                          : "100%",
                  }}
                />
              </div>
              <span className="text-caption text-muted dark:text-white/60">
                {passwordStrength.label}
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-white font-semibold py-3 text-body transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {loading ? (
            <>
              <Icon icon="svg-spinners:ring-resize" width="20" height="20" />
              <span>{t("auth.signup.submitting")}</span>
            </>
          ) : (
            <>
              <span>{t("auth.signup.submit")}</span>
              <Icon icon="solar:arrow-right-linear" width="20" height="20" />
            </>
          )}
        </button>

        <p className="text-caption text-muted dark:text-white/60 text-center">
          {t("auth.signup.termsPrefix")}{" "}
          <Link href="#" className="text-primary hover:underline">
            {t("auth.signup.termsLink")}
          </Link>{" "}
          {t("auth.signup.termsMiddle")}{" "}
          <Link href="#" className="text-primary hover:underline">
            {t("auth.signup.privacyLink")}
          </Link>
          {t("auth.signup.termsSuffix")}
        </p>
      </form>

      <p className="text-center text-body text-muted dark:text-white/70 mt-6">
        {t("auth.signup.haveAccount")}{" "}
        <Link
          href="/signin"
          className="font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
        >
          {t("auth.signup.signInLink")}
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
