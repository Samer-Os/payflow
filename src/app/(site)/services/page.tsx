import HeroSub from "@/components/SharedComponents/HeroSub";
import Payment from "@/components/Home/Payment";
import Benefit from "@/components/Home/Benefit";
import Spend from "@/components/Home/Spend";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Services | Payflow",
};

const Services = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/services", text: "Services" },
  ];
  return (
    <>
      <HeroSub
        title="Services"
        description="Explore the full suite of payment tools that power modern fintech products."
        breadcrumbLinks={breadcrumbLinks}
      />
      <Payment />
      <Benefit />
      <Spend />
    </>
  );
};

export default Services;
