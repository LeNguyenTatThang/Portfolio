import Link from "next/link"
import { MdArrowOutward as ArrowIcon } from "react-icons/md"
import { HiOutlineChatBubbleLeftRight, HiOutlineHeart } from "react-icons/hi2"
import { useLocale } from "next-intl"
import SpotlightCard from "@/common/components/elements/SpotlightCard"
import { BlogProps } from "@/common/types/blog"

const BlogCard = ({
  slug,
  title,
  excerpt,
  published_at,
  tags = []
}: BlogProps) => {
  const locale = useLocale()
  const formattedDate = new Date(published_at).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  })

  return (
    <SpotlightCard
      className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700 
                 bg-gradient-to-b from-neutral-100 via-neutral-50 to-neutral-200 
                 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-950 
                 p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="z-10 flex flex-col justify-between gap-y-3">
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 line-clamp-2">
          {title}
        </h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {excerpt}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-medium rounded-full
                           bg-yellow-100 text-blue-700 dark:bg-yellow-900/40 dark:text-yellow-300
                           border border-yellow-200 dark:border-yellow-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
        <span>{formattedDate}</span>

        <div className="flex items-center gap-4">
          <Link
            href={`/blog/${slug}`}
            target="_blank"
            className="group flex items-center gap-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-medium transition"
          >
            {locale === "en" ? "Read" : "Đọc"}
            <ArrowIcon
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </SpotlightCard>
  )
}

export default BlogCard