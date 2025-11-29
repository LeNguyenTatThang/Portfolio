import { NextResponse, NextRequest } from "next/server"
import { getBlogsDataBySlug } from "@/services/blogs"

export const GET = async (req: NextRequest, context: { params: { slug: string } }) => {
  try {
    const { slug } = context.params
    const data = await getBlogsDataBySlug(slug)

    return NextResponse.json(data, { status: 200 })
  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}