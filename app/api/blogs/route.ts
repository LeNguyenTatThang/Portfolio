import { NextResponse } from "next/server"
import { getBlogsData, createBlog, saveImgBlog } from "@/services/blogs"
import { MDXFileBlog } from "@/services/mdx"

export const GET = async () => {
    try {
        const data = await getBlogsData()
        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData()

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const cover_image = formData.get("cover_image") as File
    const slug = formData.get("slug") as string
    const excerpt = formData.get("excerpt") as string
    const is_published = formData.get("is_published") as string
    const published_at = formData.get("published_at") as string
    const tags = JSON.parse(formData.get("tags") as string)
    
    let coverImagePath = null
    if (cover_image && cover_image.size > 0) {
      const upload = await saveImgBlog(cover_image)
      coverImagePath = upload?.path || null
    }

    await createBlog({ title, cover_image: coverImagePath, slug, excerpt, is_published, published_at, tags })
    MDXFileBlog(slug, content)
    
    return NextResponse.json({ message: "OK" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}