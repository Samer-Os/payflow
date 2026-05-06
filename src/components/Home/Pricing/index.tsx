import { cookies } from "next/headers";
import { getDictionary, type Language } from "@/context/LanguageContext";
import PricingClient from "./Client";

const Pricing = async () => {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value ?? "en") as Language;
  const dict = getDictionary(lang);
  return <PricingClient dict={dict.pricing} />;
};

export default Pricing;
