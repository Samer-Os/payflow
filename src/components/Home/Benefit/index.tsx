import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "@/components/icons";
import { BenefitImage } from "@/data/home";
import { getDictionary, type Language } from "@/context/dictionary";
import { Reveal, Stagger } from "@/components/Common/Reveal";

const Benefit = async () => {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value ?? "en") as Language;
  const dict = getDictionary(lang);
  const b = dict.benefit;
  const benefitItems = b.items as Record<string, string>;

  return (
    <section id="benefits" className="dark:bg-darkmode py-14 overflow-x-hidden scroll-mt-24">
      <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 mx-auto">
        <Stagger>
          <Reveal className="dark:bg-midnight_text bg-heroBg rounded-3xl md:py-20 py-10 2xl:px-20 sm:px-14 px-6">
            <div className="items-start mb-12">
              <h2 className="font-bold md:text-h2 sm:text-h3 text-h4 text-midnight_text dark:text-white">
                {b.title1}
                <span className="bg-border dark:bg-darkHeroBg rounded-lg text-primary max-w-max ml-2 px-2 pb-1">
                  {b.highlight}
                </span>
                <br />
                {b.title2}
              </h2>
            </div>

            <div className="grid grid-cols-12 items-center md:gap-12 sm:gap-8">
              <Reveal className="xl:col-span-6 col-span-12 sm:block hidden">
                <div className="xl:px-0 lg:px-20">
                  <Image
                    src="/images/benefit/benefit.webp"
                    alt="Benefit Dashboard"
                    width={435}
                    height={304}
                    loading="lazy"
                    sizes="(max-width: 1280px) 100vw, 50vw"
                    style={{ width: "100%", height: "100%" }}
                    className="rounded-xl drop-shadow-xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Reveal>

              <div className="xl:col-span-6 col-span-12">
                <Reveal>
                  <p className="sm:text-h4 text-lead text-midnight_text font-medium dark:text-white/90 mb-8">
                    {b.subtitle}
                  </p>
                </Reveal>

                <Stagger>
                  {BenefitImage.map((item, index) => (
                    <Reveal key={index} as="div" className="flex flex-row items-start gap-4 group">
                      <div className="bg-white dark:bg-search p-2 rounded-lg shadow-xs shrink-0 w-fit transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md">
                        <Image
                          src={item.image}
                          alt={item.alt || "Trusted brand"}
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      </div>
                      <p className="text-body text-muted dark:text-white/70 pt-1 leading-snug">
                        {benefitItems[index]}
                      </p>
                    </Reveal>
                  ))}
                </Stagger>

                <Reveal className="flex items-center lg:justify-start justify-center mt-12">
                  <Link
                    href="/signup"
                    className="text-body flex gap-3 items-center bg-primary text-white py-3 px-8 rounded-lg border border-primary hover:text-primary hover:bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {b.getStarted}
                    <ChevronRight width={13} height={13} />
                  </Link>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </Stagger>
      </div>
    </section>
  );
};

export default Benefit;
