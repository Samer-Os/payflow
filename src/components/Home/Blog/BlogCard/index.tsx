import React from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const { title, coverImage, type, date, slug } = blog;
  return (
    <Link href={`/blog/${slug}`} aria-label="blog cover" className="group">
      <div className="overflow-hidden rounded-lg shrink-0 mb-6">
        <Image
          src={coverImage!}
          alt={title ?? "Blog post cover"}
          className="transition group-hover:scale-125"
          width={190}
          height={163}
          sizes="(max-width: 640px) 100vw, 50vw"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="-mb-10">
        <p className="text-lead text-midnight_text dark:text-white">{type}</p>
        <div className="my-4">
          <p className="text-h4 font-medium text-midnight_text dark:text-white group-hover:text-primary">
            {title}
          </p>
        </div>
        <p className="text-body font-medium text-muted leading-loose mb-0">
          {date ? format(new Date(date), "MMM dd, yyyy") : ""}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
