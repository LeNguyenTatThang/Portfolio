import { NextResponse } from "next/server"
import { getBlogsDataBySlug } from "@/services/blogs"

export async function GET(req: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params

  try {
    const data = await getBlogsDataBySlug(slug)

    return NextResponse.json(data, { status: 200 })

  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}