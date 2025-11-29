export interface BentoData {
    id: number
    title: string
    description?: string
    label?: string
    href?: string
    colSpan?: number
    className?: string
    isShow: boolean
}

export const BENTO_DATA: BentoData[] = [
    { id: 1, title: "Projects Showcase", isShow: true },
    { id: 2, title: "About Me", isShow: true },
    { id: 3, title: "Skills & Tools", isShow: true },
    { id: 4, title: "Achievements", isShow: true },
    { id: 5, title: "Chat Room", isShow: true },
    { id: 6, title: "Services", isShow: true },
]
