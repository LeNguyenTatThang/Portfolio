import { Metadata } from "next"
import { METADATA } from "@/common/constants/metadata"
import "highlight.js/styles/github-dark.css"
import { HiOutlineHeart, HiOutlineChatBubbleLeftRight } from "react-icons/hi2"
import { BlogItem } from "@/common/types/blog"
import { getBlogsDataBySlug } from "@/services/blogs"
import { loadMdxFiles } from "@/common/libs/mdxBlog"
import Container from "@/common/components/elements/Container"
import PageHeading from "@/common/components/elements/PageHeading"
import BlogDetail from "@/modules/blog/components/BlogDetail"
interface BlogDetailPageProps {
    params: Promise<{ slug: string }> 
}

export const generateMetadata = async ({
    params,
}: BlogDetailPageProps): Promise<Metadata> => {
  const { slug } = await params
    const blog = await getBlogDetail(slug)

    return {
        title: `${blog.title} ${METADATA.exTitle}`,
        description: blog.excerpt,
        openGraph: {
            images: blog.cover_image,
            url: `${METADATA.openGraph.url}/${slug}`,
            siteName: METADATA.openGraph.siteName,
            locale: METADATA.openGraph.locale,
            type: "article",
            authors: METADATA.creator,
        },
        keywords: blog.title,
        alternates: {
            canonical: `${process.env.DOMAIN}/blog/${slug}`,
        },
    }
}


const getBlogDetail = async (slug: string): Promise<BlogItem> => {
    const blogs = await getBlogsDataBySlug(slug)
    const contents = loadMdxFiles()
    const content = contents.find((item) => item.slug === slug)
    const response = { ...blogs, content: content?.content }
    const data = JSON.parse(JSON.stringify(response))

    return data
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const { slug } = await params
    const data = await getBlogDetail(slug)

    const PAGE_TITLE = data?.title
    const PAGE_DESCRIPTION = data?.excerpt

    return (
        <Container data-aos="fade-up">
            <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
            <BlogDetail {...data} />
        </Container>
    )
}

export default BlogDetailPage