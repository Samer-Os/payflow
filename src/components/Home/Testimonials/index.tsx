"use client";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { useTranslation } from "@/context/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease } },
};

const testimonials = [
  { initials: "SM", color: "from-indigo-500 to-purple-600" },
  { initials: "MC", color: "from-pink-500 to-rose-500" },
  { initials: "PA", color: "from-amber-500 to-orange-600" },
];

const Testimonials = () => {
  const { t, dictionary } = useTranslation();
  const items = (dictionary as any).testimonials.items;

  return (
    <section id="testimonials" className="dark:bg-darkmode py-14 scroll-mt-24">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-caption font-semibold uppercase tracking-widest">
              {t("testimonials.demoBadge")}
            </span>
            <h2 className="dark:text-white text-midnight_text md:text-h1 sm:text-h2 text-h3 font-bold leading-tight">
              {t("testimonials.title1")}
              <span className="text-primary ml-2">{t("testimonials.highlight")}</span>
              <br />
              {t("testimonials.title2")}
            </h2>
            <p className="text-lead font-medium text-midnight_text/70 dark:text-white/70 mx-auto mt-6 lg:max-w-[50%] sm:max-w-[75%]">
              {t("testimonials.subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {testimonials.map((item, index) => {
              const data = items[index];
              return (
                <motion.figure
                  key={index}
                  variants={itemVariants}
                  className="relative bg-white dark:bg-midnight_text rounded-2xl p-8 border border-border/50 dark:border-dark_border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <Icon
                    icon="solar:quote-up-square-bold"
                    className="text-primary/20 absolute top-6 right-6"
                    width="40"
                    height="40"
                  />
                  <div
                    role="img"
                    aria-label="5 out of 5 stars"
                    className="flex items-center gap-1 mb-5 text-amber-400"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} icon="solar:star-bold" width="18" height="18" />
                    ))}
                  </div>
                  <blockquote className="text-body leading-relaxed text-midnight_text dark:text-white/90 flex-1">
                    &ldquo;{data.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-4 mt-8 pt-6 border-t border-border/50 dark:border-dark_border/50">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-body shrink-0`}
                      aria-hidden="true"
                    >
                      {item.initials}
                    </div>
                    <div>
                      <p className="font-bold text-midnight_text dark:text-white text-body">
                        {data.name}
                      </p>
                      <p className="text-body text-muted dark:text-white/60">
                        {data.role}
                      </p>
                    </div>
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
