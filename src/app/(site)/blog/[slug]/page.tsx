import { getAllPosts, getPostBySlug } from "@/utils/markdown";
import NewsletterForm from "./NewsletterForm";
import markdownToHtml from "@/utils/markdownToHtml";
import { format } from "date-fns";
import Image from "next/image";

type RouteParams = { slug: string };
type RouteProps = { params: Promise<RouteParams> };

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://samer-os-payflow.netlify.app";

export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);
  return posts.map((post) => ({ slug: post.slug ?? "" }));
}

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug, ["title", "excerpt", "coverImage"]);

  if (!post.title) {
    return {
      title: "Post not found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: post.title,
    description: post.excerpt ?? "",
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${slug}`,
      title: post.title,
      description: post.excerpt ?? "",
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? "",
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPost({ params }: RouteProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug, [
    "title",
    "author",
    "authorImage",
    "content",
    "coverImage",
    "date",
    "excerpt",
  ]);

  const content = await markdownToHtml(post.content ?? "");
  const formattedDate = post.date
    ? format(new Date(post.date), "dd MMM yyyy")
    : "";

  return (
    <>
      <section className="relative pt-44 pb-12 dark:bg-darkmode">
        <div className="absolute inset-0 bg-heroBg dark:bg-search rounded-b-[80px] -z-10" />
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">
            <div className="md:col-span-8">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 mb-6">
                <span className="text-body text-midnight_text dark:text-white font-medium sm:pr-7 sm:border-r border-muted/30 dark:border-white/30">
                  {formattedDate}
                </span>
                <span className="text-body text-midnight_text dark:text-white font-medium sm:pl-7">
                  By {post.author ?? "Payflow Team"}
                </span>
              </div>
              <h1 className="text-[2rem] md:text-[2.5rem] leading-tight font-bold dark:text-white">
                {post.title}
              </h1>
            </div>

            {post.authorImage && (
              <div className="md:col-span-4 flex items-center gap-4">
                <Image
                  src={post.authorImage}
                  alt={`${post.author ?? "Author"} profile photo`}
                  width={80}
                  height={80}
                  className="rounded-full w-16 h-16 object-cover shrink-0"
                />
                <div>
                  <p className="font-bold text-midnight_text dark:text-white">
                    {post.author ?? "Payflow Team"}
                  </p>
                  <p className="text-body text-muted dark:text-white/60">Author</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pb-16 pt-12 dark:bg-darkmode">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto px-4">
          {post.coverImage && (
            <div className="mb-12 rounded-3xl overflow-hidden aspect-video">
              <Image
                src={post.coverImage}
                alt={`Cover image for: ${post.title}`}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          )}

          <div className="flex flex-wrap -mx-4">
            <article className="w-full px-4 lg:w-8/12">
              <div
                className="blog-details markdown xl:pr-10 dark:text-white/90"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </article>

            <aside className="w-full px-4 lg:w-4/12 mt-10 lg:mt-0">
              <div className="rounded-2xl border border-border dark:border-dark_border bg-white dark:bg-dark_b shadow-sm overflow-hidden">
                <div className="px-8 py-10 border-b border-border dark:border-dark_border">
                  <h2 className="text-h4 font-bold dark:text-white mb-4">
                    Share this post
                  </h2>
                  <div className="flex flex-col gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title ?? "")}&url=${encodeURIComponent(`${SITE_URL}/blog/${slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Twitter / X"
                      className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-lg text-body font-medium hover:bg-black/80 transition-colors"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.858L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      Share on X
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_URL}/blog/${slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                      className="flex items-center gap-3 bg-[#0A66C2] text-white px-5 py-3 rounded-lg text-body font-medium hover:bg-[#0A66C2]/90 transition-colors"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      Share on LinkedIn
                    </a>
                  </div>
                </div>

                <div className="px-8 py-10">
                  <h2 className="text-h4 font-bold dark:text-white mb-2">
                    Stay in the loop
                  </h2>
                  <p className="text-body text-muted dark:text-white/60 mb-4">
                    Get the latest posts delivered straight to your inbox.
                  </p>
                  <NewsletterForm />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
