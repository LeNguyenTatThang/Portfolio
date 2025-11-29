import { NextResponse, NextRequest } from "next/server"
import { getBlogsDataBySlug } from "@/services/blogs"

export const GET = async (
    req: NextRequest,
    { params }: { params: { slug: string } }
) => {
    try {
        const { slug } = params
        const data = await getBlogsDataBySlug(slug)
        
        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}