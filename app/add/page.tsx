import { useTranslations } from "next-intl"

import Container from "@/common/components/elements/Container"
import PageHeading from "@/common/components/elements/PageHeading"
import Add from "@/modules/add"
const AchievementsPage = () => {
    
    return (
        <Container data-aos="fade-up">
            <PageHeading title={("ADD PROJECT & BLOG")} description={("Create new project and blog")} />
            <Add />
        </Container>
    )
}

export default AchievementsPage