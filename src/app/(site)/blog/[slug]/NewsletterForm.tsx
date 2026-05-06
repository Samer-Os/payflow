"use client";

export default function NewsletterForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
      <label htmlFor="blog-newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="blog-newsletter-email"
        type="email"
        name="email"
        placeholder="you@company.com"
        autoComplete="email"
        className="px-4 py-3 text-body dark:bg-search dark:text-white border border-border dark:border-dark_border rounded-lg focus:outline-none focus:border-primary dark:focus:border-primary"
      />
      <button
        type="submit"
        className="bg-primary text-white font-semibold text-body px-6 py-3 rounded-lg border border-primary hover:bg-transparent hover:text-primary transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Subscribe
      </button>
    </form>
  );
}
