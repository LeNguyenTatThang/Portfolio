export const UMAMI_ACCOUNT = {
    username: "Lê Nguyễn Tất Thắng",
    api_key: process.env.UMAMI_API_KEY,
    base_url: "https://api.umami.is/v1/websites",
    endpoint: {
        page_views: "/pageviews",
        sessions: "/sessions/stats",
    },
    parameters: {
        startAt: 1717174800000,
        endAt: 1767190799000,
        unit: "month",
        timezone: "Asia/Ho_Chi_Minh",
    },
    is_active: true,
    websites: [
        {
            domain: "lenguyentatthang.site",
            website_id: process.env.UMAMI_WEBSITE_ID_SITE,
            umami_url:
                "https://us.umami.is/share/wg6XA2bPFWg8Qc7r/www.lenguyentatthang.site",
        },
        {
            domain: "lenguyentatthang",
            website_id: process.env.UMAMI_WEBSITE_ID_MYID,
            umami_url:
                "https://cloud.umami.is/share/YBbXz2wWG0lCgSLt/www.lenguyentatthang",
        }
    ]
}