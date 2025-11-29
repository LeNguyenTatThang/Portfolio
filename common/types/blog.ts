export type BlogProps = {
    id: string
    slug: string
    title: string
    excerpt: string
    is_published: boolean
    published_at: string
    tags: string[]
}

export type BlogItem = {
    id?: string
    slug: string
    title: string
    excerpt?: string
    cover_image: string
    content?: string
    published_at: string
    is_published: boolean
    tags: string[]
}

export type BlogItemProps = {
    projects: BlogItem[]
}