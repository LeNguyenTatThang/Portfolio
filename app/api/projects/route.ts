import { NextResponse } from "next/server"
import { createProject, getProjectsData, saveImgProject } from "@/services/projects"
import { MDXFileProject } from "@/services/mdx"

export const GET = async () => {
    try {
        const data = await getProjectsData()
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
    const slug = formData.get("slug") as string
    const content = formData.get("content") as string
    const description = formData.get("description") as string
    const image = formData.get("image") as File
    const stacks = JSON.parse(formData.get("stacks") as string)
    const is_show = formData.get("is_show") as string
    const is_featured = formData.get("is_featured") as string
    const link_demo = formData.get("link_demo") as string
    const link_github = formData.get("link_github") as string
    
    let coverImagePath = null
    if (image && image.size > 0) {
      const upload = await saveImgProject(image)
      coverImagePath = upload?.path || null
    }

    await createProject({ title, image: coverImagePath, slug, description, stacks, is_show, is_featured, link_demo, link_github })
    MDXFileProject(slug, content)
    
    return NextResponse.json({ message: "OK" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}