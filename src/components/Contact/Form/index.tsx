"use client";
import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type FormState = {
  name: string;
  email: string;
  company: string;
  inquiry: string;
  message: string;
};

const ContactForm = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    inquiry: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    toast.success("Message sent! We'll be in touch within 1 business day.");
    setForm({ name: "", email: "", company: "", inquiry: "", message: "" });
  };

  const inputClass =
    "w-full text-body px-4 py-2.5 rounded-lg border border-border dark:border-dark_border dark:text-white dark:bg-transparent transition-all duration-300 focus:border-primary dark:focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30";

  return (
    <section className="dark:bg-darkmode pb-24">
      <Toaster />
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-8 items-start">
          <div className="col-span-6">
            <h2 className="text-h2 font-bold mb-3 dark:text-white">
              Talk to our team
            </h2>
            <p className="text-body text-muted dark:text-white/70 mb-9">
              Tell us about your use case and we&apos;ll get back to you within one
              business day.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="sm:flex gap-3">
                <div className="flex-1">
                  <label htmlFor="contact-name" className="block text-caption font-semibold text-midnight_text dark:text-white mb-1.5">
                    Full name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className={inputClass}
                  />
                </div>
                <div className="flex-1 mt-4 sm:mt-0">
                  <label htmlFor="contact-email" className="block text-caption font-semibold text-midnight_text dark:text-white mb-1.5">
                    Work email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-company" className="block text-caption font-semibold text-midnight_text dark:text-white mb-1.5">
                  Company
                </label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-inquiry" className="block text-caption font-semibold text-midnight_text dark:text-white mb-1.5">
                  What are you looking for?
                </label>
                <select
                  id="contact-inquiry"
                  name="inquiry"
                  required
                  value={form.inquiry}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select a topic</option>
                  <option value="api-demo">API demo / sandbox access</option>
                  <option value="pricing">Pricing &amp; plans</option>
                  <option value="integration">Integration support</option>
                  <option value="enterprise">Enterprise contract</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-caption font-semibold text-midnight_text dark:text-white mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your payment volume, stack, or anything else that's helpful…"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-primary text-white font-semibold text-body px-8 py-3 rounded-lg border border-primary hover:bg-transparent hover:text-primary transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {loading ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>

          <div className="col-span-6 mt-8 md:mt-0">
            <Image
              src="/images/contact-page/contact.jpg"
              alt="Payflow team working on payment infrastructure"
              width={1300}
              height={867}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ width: "100%", height: "auto" }}
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
