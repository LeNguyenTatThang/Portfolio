import axios from "axios"

import { GITHUB } from "@/common/constants/github"

const GITHUB_USER_ENDPOINT = "https://api.github.com/graphql"

const GITHUB_USER_QUERY = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        colors
        totalContributions
        months {
          firstDay
          name
          totalWeeks
        }
        weeks {
          contributionDays {
            color
            contributionCount
            date
          }
          firstDay
        }
      }
    }
  }
}`

export const fetchGithubData = async (
  username: string,
  token?: string
) => {
  if (!token) {
    return {
      status: 401,
      data: {},
      message: "Missing GitHub token"
    }
  }

  try {
    const response = await axios.post(
      GITHUB_USER_ENDPOINT,
      {
        query: GITHUB_USER_QUERY,
        variables: { username }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return {
      status: response.status,
      data: response.data.data.user
    }
  } catch (error: any) {
    const status = error?.response?.status || 500

    return {
      status,
      data: {},
      message: "GitHub API error"
    }
  }
}


export const getGithubData = async () => {
  const { username, token } = GITHUB
  return await fetchGithubData(username, token)
}