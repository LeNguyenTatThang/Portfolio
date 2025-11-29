import { BlogItem } from '@/common/types/blog'
import MDXComponent from "@/common/components/elements/MDXComponent"

const BlogDetail = ({
  title,
  excerpt,
  cover_image,
  content,
  tags,
  published_at
}:BlogItem) => {
  return (
    <article className="mx-auto px-4 pt-24 md:py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
          {title}
        </h1>
        <p className="text-sm text-neutral-500">
          {new Date(published_at).toLocaleDateString("vi-VN")} · Lê Nguyễn Tất Thắng
        </p>
      </header>

      <img
        src={cover_image}
        alt={title}
        className="w-full rounded-xl mb-10 shadow-md"
      />

      {content ? (
                <div className="mt-5 space-y-6 leading-[1.8] dark:text-neutral-300">
                    <MDXComponent>{content}</MDXComponent>
                </div>
            ) : null}
    </article>
  )
}

export default BlogDetail