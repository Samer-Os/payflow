"use client";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useTranslation } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="pt-8 mt-14 bg-midnight_text relative overflow-hidden after:content-[''] after:absolute after:bg-[url('/images/footer/bgline.png')] after:bg-no-repeat after:w-52 after:h-24 after:right-0 after:top-28 xl:after:block after:hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 relative z-10">
        <div className="flex lg:items-center justify-between lg:flex-row flex-col border-b border-dark_border pb-8 sm:pb-14 mb-8 sm:mb-16 gap-6 lg:gap-0">
          <div className="flex sm:flex-nowrap flex-wrap gap-6">
            <div className="flex items-center text-foottext text-body">
              <Icon icon="weui:location-outlined" className="w-7 h-7 mr-3" />
              <div className="flex flex-col">
                <span>{t("footer.address")}</span>
                <span>{t("footer.country")}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-foottext">
              <Icon icon="majesticons:phone-retro-line" className="w-7 h-7" />
              <Link href="#" className="text-body hover:text-primary">
                <span> +44 20 7946 0958</span>
              </Link>
            </div>
            <div className="flex items-center text-foottext gap-2">
              <Icon icon="clarity:email-line" className="w-7 h-7" />
              <Link
                href="#"
                className="inline-flex items-center text-body hover:text-primary"
              >
                <span>hello@payflow.io</span>
              </Link>
            </div>
          </div>
          <div className="flex gap-4 mt-4 lg:mt-0">
            <Link href="#" aria-label="Facebook" className="text-muted hover:text-primary">
              <Icon icon="fe:facebook" width="32" height="32" />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-muted hover:text-primary">
              <Icon icon="fa6-brands:square-twitter" width="32" height="32" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-muted hover:text-primary">
              <Icon icon="fa6-brands:linkedin" width="32" height="32" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12 sm:mb-16 mb-8 pt-8 gap-4 relative before:content-[''] before:absolute before:w-20 before:h-20 before:bg-[url('/images/footer/bgcir.png')] before:bg-no-repeat before:-left-36 before:bottom-9 lg:before:block before:hidden">
          <div className="md:col-span-2 col-span-6 mb-4 md:mb-0">
            <h4 className="text-lead text-white dark:text-white mb-3">
              {t("footer.features")}
            </h4>
            <ul>
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="pb-3">
                  <Link href="#" className="text-foottext text-body hover:text-primary">
                    {t(`footer.links.${i}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 col-span-6 mb-4 md:mb-0">
            <h4 className="text-lead text-white dark:text-white mb-3">
              {t("footer.resources")}
            </h4>
            <ul>
              {[4, 5, 6, 7, 8].map((i) => (
                <li key={i} className="pb-3">
                  <Link href="#" className="text-foottext text-body hover:text-primary">
                    {t(`footer.links.${i}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 col-span-12 sm:col-span-6 mb-4 md:mb-0">
            <h4 className="text-lead text-white dark:text-white mb-3">
              {t("footer.platform")}
            </h4>
            <ul>
              {[9, 10, 11, 12, 13].map((i) => (
                <li key={i} className="pb-3">
                  <Link href="#" className="text-foottext text-body hover:text-primary">
                    {t(`footer.links.${i}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 col-span-12">
            <p className="text-lead text-white font-bold">{t("footer.signUpUpdates")}</p>
            <form className="mt-8">
              <div className="relative">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  type="email"
                  name="email"
                  id="footer-email"
                  placeholder={t("footer.emailPlaceholder")}
                  className="bg-search placeholder:text-foottext text-white! py-3 pl-5"
                />
                <Icon
                  icon="solar:plain-2-linear"
                  className="text-h4 text-foottext absolute right-5 top-4"
                />
              </div>
            </form>
            <p className="text-lead text-white font-bold py-12">{t("footer.getApp")}</p>
            <div className="flex">
              <a href="#" aria-label="Download on Google Play">
                <Image
                  src="/images/footer/play.png"
                  alt="Google Play"
                  width={135}
                  height={40}
                  loading="lazy"
                  className="h-9 sm:h-auto w-auto mr-5"
                />
              </a>
              <a href="#" aria-label="Download on App Store">
                <Image
                  src="/images/footer/store.png"
                  alt="App Store"
                  width={135}
                  height={40}
                  loading="lazy"
                  className="h-9 sm:h-auto w-auto"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center sm:flex-row flex-col justify-between py-10 mt-8">
          <p className="text-body text-foottext sm:mb-0 mb-4">
            {t("footer.copyright")}
          </p>
          <div className="flex gap-4">
            {[14, 15, 16].map((i) => (
              <div key={i}>
                <Link href="#" className="text-foottext hover:text-primary">
                  {t(`footer.links.${i}`)}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
