import { cookies } from "next/headers";
import { ChevronDown } from "@/components/icons";
import { getDictionary, type Language } from "@/context/dictionary";
import { Reveal, Stagger } from "@/components/Common/Reveal";

const FAQ = async () => {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value ?? "en") as Language;
  const dict = getDictionary(lang);
  const f = dict.faq;
  const items = f.items as Record<string, { q: string; a: string }>;
  const itemKeys = Object.keys(items);

  return (
    <section id="faq" className="dark:bg-darkmode py-14 scroll-mt-24">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <Stagger>
          <Reveal className="text-center mb-12">
            <h2 className="dark:text-white text-midnight_text md:text-h1 sm:text-h2 text-h3 font-bold leading-tight">
              {f.title1}
              <span className="text-primary ml-2">{f.highlight}</span>
            </h2>
            <p className="text-lead font-medium text-midnight_text/70 dark:text-white/70 mx-auto mt-6 lg:max-w-[50%] sm:max-w-[75%]">
              {f.subtitle}
            </p>
          </Reveal>

          <div className="max-w-3xl mx-auto space-y-3">
            {itemKeys.map((key) => {
              const item = items[key];
              return (
                <Reveal key={key} as="details" className="group bg-white dark:bg-midnight_text rounded-xl border border-border/50 dark:border-dark_border/50 overflow-hidden hover:border-primary/40 dark:hover:border-primary/40 transition-colors">
                  <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer list-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-xl">
                    <span className="text-body sm:text-lead font-semibold text-midnight_text dark:text-white">
                      {item.q}
                    </span>
                    <ChevronDown
                      className="text-primary shrink-0 transition-transform duration-300 group-open:rotate-180"
                      width={22}
                      height={22}
                    />
                  </summary>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 text-body leading-relaxed text-muted dark:text-white/70">
                    {item.a}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Stagger>
      </div>
    </section>
  );
};

export default FAQ;
