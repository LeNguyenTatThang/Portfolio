import { NextResponse } from "next/server"
import { getProjectsDataBySlug } from "@/services/projects"

export async function GET(req: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params

  try {
    const data = await getProjectsDataBySlug(slug)

    return NextResponse.json(data, { status: 200 })

  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}