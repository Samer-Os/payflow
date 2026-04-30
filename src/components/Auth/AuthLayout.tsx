import Logo from "@/components/Layout/Header/Logo";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden px-4 py-16 sm:py-24">
      {/* Background gradient blobs */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-heroBg dark:bg-darkmode"
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-pink-400/20 blur-3xl -z-10"
      />

      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <div className="rounded-2xl border border-border/60 dark:border-dark_border/60 bg-white dark:bg-midnight_text shadow-xl shadow-primary/5 p-6 sm:p-8">
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
