import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Home/Hero";

const Benefit = dynamic(() => import("@/components/Home/Benefit"));
const Method = dynamic(() => import("@/components/Home/Method"));
const Testimonials = dynamic(() => import("@/components/Home/Testimonials"));
const Pricing = dynamic(() => import("@/components/Home/Pricing"));
const FAQ = dynamic(() => import("@/components/Home/FAQ"));

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
