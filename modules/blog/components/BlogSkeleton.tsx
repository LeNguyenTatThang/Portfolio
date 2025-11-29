import SkeletonLoader from "@/common/components/elements/SkeletonLoader"
import Skeleton from "react-loading-skeleton"

const BlogSkeleton = () => {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700 
                    bg-gradient-to-b from-neutral-100 via-neutral-50 to-neutral-200 
                    dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-950 
                    p-6 animate-pulse">
      <div className="flex flex-col gap-y-3">
        <Skeleton height={24} width="80%" />
        <Skeleton height={16} width="95%" />
        <Skeleton height={16} width="90%" />
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <Skeleton height={14} width={80} />
        <div className="flex items-center gap-4">
          <Skeleton circle width={20} height={20} />
          <Skeleton circle width={20} height={20} />
          <Skeleton height={16} width={60} />
        </div>
      </div>
    </div>
  )
}

export default BlogSkeleton
