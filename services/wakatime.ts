import axios from "axios"
import { WAKATIME_ACCOUNT } from "@/common/constants/wakatime"

const { api_key, base_url, all_time_endpoint, stats_endpoint } = WAKATIME_ACCOUNT

const getEncodedKey = () => Buffer.from(api_key).toString("base64")

export const getReadStats = async () => {
    const encodedKey = getEncodedKey()
    const url = `${base_url}${stats_endpoint}/last_7_days`

    try {
        const response = await axios.get(url, {
            headers: { Authorization: `Basic ${encodedKey}` },
            timeout: 10000
        })

        const status = response.status;
        if (status >= 400) return { status, data: [] }

        const getData = response.data
        return {
            status,
            data: {
                start_date: getData?.data?.start,
                end_date: getData?.data?.end,
                last_update: getData?.data?.modified_at,
                best_day: getData?.data?.best_day,
                human_readable_daily_average:
                    getData?.data?.human_readable_daily_average_including_other_language,
                human_readable_total:
                    getData?.data?.human_readable_total_including_other_language,
                languages: getData?.data?.languages?.slice(0, 6),
                editors: getData?.data?.editors,
            }
        }
    } catch (error: any) {
        throw error
    }
}

export const getAllTimeSinceToday = async () => {
    const encodedKey = getEncodedKey()
    const url = `${base_url}${all_time_endpoint}`

    try {
        const response = await axios.get(url, {
            headers: { Authorization: `Basic ${encodedKey}` },
            timeout: 10000
        })

        const status = response.status
        if (status >= 400) return { status, data: {} }
        const getData = response.data

        return {
            status,
            data: {
                text: getData?.data?.text,
                total_seconds: getData?.data?.total_seconds
            }
        }
    } catch (error: any) {
        throw error
    }
}