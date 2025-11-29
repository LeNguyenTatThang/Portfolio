import { NextResponse } from "next/server"
import { getMonkeytypeData } from "@/services/monkeytype"

export const GET = async () => {
    try {
        const response = await getMonkeytypeData()

        return NextResponse.json(response.data, { status: 200 })
    } catch (error: any) {
        console.error(
            error.response?.data || error.message || error
        )
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
