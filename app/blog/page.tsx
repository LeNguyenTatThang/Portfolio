import { Metadata } from "next"
import { useTranslations } from "next-intl"

import Container from "@/common/components/elements/Container"
import PageHeading from "@/common/components/elements/PageHeading"
import Blog from "@/modules/blog"
import { METADATA } from "@/common/constants/metadata"

export const metadata: Metadata = {
    title: `Blog ${METADATA.exTitle}`,
    description: `Blog ${METADATA.creator}`,
    alternates: {
        canonical: `${process.env.DOMAIN}/blog`
    }
}

const BlogPage = () => {
    const t = useTranslations("BlogPage")

    return (
        <Container data-aos="fade-up">
            <PageHeading title={t("title")} description={t("description")} />
            <Blog />
        </Container>
    )
}

export default BlogPage