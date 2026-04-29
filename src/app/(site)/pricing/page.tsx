import Pricing from "@/components/Home/Pricing";
import HeroSub from "@/components/SharedComponents/HeroSub";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pricing | Payflow",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/pricing", text: "Pricing" },
  ];
  return (
    <>
      <HeroSub
        title="Pricing"
        description="Transparent pricing built for startups and enterprises alike."
        breadcrumbLinks={breadcrumbLinks}
      />
      <Pricing />
    </>
  );
};

export default page;
