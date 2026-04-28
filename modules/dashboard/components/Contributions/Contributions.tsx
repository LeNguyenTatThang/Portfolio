"use client"

import Link from "next/link"
import useSWR from "swr"
import { BsGithub as GithubIcon } from "react-icons/bs"
import { useTranslations } from "next-intl"

import Overview from "./Overview"
import Calendar from "./Calendar"

import SectionHeading from "@/common/components/elements/SectionHeading"
import SectionSubHeading from "@/common/components/elements/SectionSubHeading"
import ContributionsSkeleton from "./ContributionsSkeleton"
import EmptyState from "@/common/components/elements/EmptyState"
import { GITHUB } from "@/common/constants/github"
import { fetcher } from "@/services/fetcher"

interface ContributionsProps {
    endpoint: string
}

const Contributions = ({ endpoint }: ContributionsProps) => {
    const { data, isLoading, error } = useSWR(endpoint, fetcher)
    const originalContributionCalendar =
        data?.contributionsCollection?.contributionCalendar
    let contributionCalendar = originalContributionCalendar
    if (originalContributionCalendar) {
        const theme = ["#dbeafe", "#60a5fa", "#2563eb", "#1e3a8a"]
        const colorMap = new Map(
            originalContributionCalendar.colors?.map((c: string, i: number) => [
                c,
                theme[i]
            ])
        )
        contributionCalendar = {
            ...originalContributionCalendar,
            colors: theme,
            weeks: originalContributionCalendar.weeks.map((week: any) => ({
                ...week,
                contributionDays: week.contributionDays.map((day: any) => ({
                    ...day,
                    color: colorMap.get(day.color) || day.color
                }))
            }))
        }
    }

    const { githubUrl, isActive } = GITHUB

    const t = useTranslations("DashboardPage")

    if (!isActive) return null

    return (
        <section className="space-y-2">
            <SectionHeading title={t("github.title")} icon={<GithubIcon className="text-green-600" />} className="text-blue-600" />
            <SectionSubHeading>
                <p>{t("github.sub_title")}</p>
                <Link
                    href={githubUrl}
                    target="_blank"
                    className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-400"
                >
                    @{GITHUB.username}
                </Link>
            </SectionSubHeading>

            {error ? (
                <EmptyState message={t("error")} />
            ) : isLoading ? (
                <ContributionsSkeleton />
            ) : (
                <div className="space-y-3">
                    <Overview data={contributionCalendar} />
                    <Calendar data={contributionCalendar} />
                </div>
            )}
        </section>
    )
}

export default Contributions