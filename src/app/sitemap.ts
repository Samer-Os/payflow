import type { MetadataRoute } from "next";
import { getPostSlugs } from "@/utils/markdown";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://samer-os-payflow.netlify.app";

const STATIC_ROUTES = [
  "",
  "/pricing",
  "/services",
  "/contact",
  "/documentation",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = getPostSlugs().map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    return {
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [...staticEntries, ...blogEntries];
}
