import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "@/components/icons";
import { getDictionary, type Language } from "@/context/dictionary";
import { Reveal, Stagger } from "@/components/Common/Reveal";

const cards = [
  { img: "/images/method/card.webp", alt: "credit cards" },
  { img: "/images/method/method1.webp", alt: "banking app" },
  { img: "/images/method/method3.webp", alt: "payments app" },
  { img: "/images/method/method2.webp", alt: "partner rewards dashboard" },
];

const Method = async () => {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value ?? "en") as Language;
  const dict = getDictionary(lang);
  const m = dict.method;
  const methodCards = m.cards as Record<
    string,
    { title: string; details: string }
  >;

  return (
    <section className="dark:bg-darkmode overflow-hidden py-14">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <Stagger>
          <Reveal className="dark:bg-midnight_text bg-heroBg rounded-3xl py-16 lg:px-20 sm:px-10 px-5">
            <div className="text-center">
              <h2 className="md:text-h2 sm:text-h3 text-h4 text-midnight_text font-bold mb-5 dark:text-white lg:max-w-full sm:max-w-[75%] mx-auto leading-tight">
                {m.title1}
                <span className="text-primary max-w-max ml-2 mr-2">
                  {m.highlight}
                </span>
                {m.title2}
              </h2>
              <p className="font-medium xl:max-w-[45%] lg:max-w-[50%] md:max-w-[75%] text-body mx-auto text-muted dark:text-white/70">
                {m.subtitle}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {cards.map((card, index) => (
                <Reveal
                  key={index}
                  as="div"
                  className="bg-white dark:bg-search rounded-3xl overflow-hidden shadow-md flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 dark:border dark:border-white/5 dark:hover:border-white/10 group"
                >
                  <div className="w-full h-56 overflow-hidden">
                    <Image
                      src={card.img}
                      alt={card.alt}
                      width={500}
                      height={375}
                      loading="lazy"
                      sizes="(max-width: 640px) calc(100vw - 80px), (max-width: 1024px) calc(50vw - 56px), calc(25vw - 54px)"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-8">
                    <h3 className="md:text-h4 text-h4 font-bold mb-4 dark:text-white text-midnight_text">
                      {methodCards[index]?.title}
                    </h3>
                    <p className="text-muted dark:text-white/70 text-body mb-8 leading-relaxed flex-1">
                      {methodCards[index]?.details}
                    </p>
                    <Link
                      href="/signup"
                      className="text-body flex w-fit gap-2 items-center hover:text-primary/80 transition-colors font-medium text-primary mt-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
                    >
                      {m.getStarted}
                      <ChevronRight width={18} height={18} />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </Stagger>
      </div>
    </section>
  );
};

export default Method;
