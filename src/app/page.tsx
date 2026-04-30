import React from "react";
import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import Benefit from "@/components/Home/Benefit";
import Method from "@/components/Home/Method";
import Testimonials from "@/components/Home/Testimonials";
import Pricing from "@/components/Home/Pricing";
import FAQ from "@/components/Home/FAQ";

export const metadata: Metadata = {
  title: "Payflow — Payment Infrastructure for Developers",
  description:
    "Embed powerful payment APIs into your product. Build in days, launch in weeks.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Benefit />
      <Method />
      <Testimonials />
      <Pricing />
      <FAQ />
    </>
  );
}
