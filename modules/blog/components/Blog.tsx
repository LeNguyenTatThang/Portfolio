"use client"

import useSWR from "swr"
import { motion } from "framer-motion"
import Breakline from "@/common/components/elements/Breakline"
import EmptyState from "@/common/components/elements/EmptyState"
import { fetcher } from "@/services/fetcher"
import { BlogProps } from "@/common/types/blog"
import BlogSkeleton from "./BlogSkeleton"
import BlogCard from "./BlogCard"

const Blog = () => {
    const { data, isLoading, error } = useSWR("/api/blogs", fetcher)

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-6">
                {[...Array(3)].map((_, i) => (
                    <BlogSkeleton key={i} />
                ))}
            </div>
        )
    }

    if (error) {
        return <EmptyState message="Error fetching blogs" />
    }

    const filteredBlogs: BlogProps[] = (data ?? []).sort(
        (a: BlogProps, b: BlogProps) =>
            new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )

    if (filteredBlogs.length === 0) {
        return <EmptyState message="No data" />
    }

    return (
        <>
            <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 gap-6 ">
                    {filteredBlogs.map((blog: BlogProps, index: number) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <BlogCard {...blog} />
                        </motion.div>
                    ))}
                </div>
            </div>
            <Breakline className="my-6" />
        </>
    )
}

export default Blog