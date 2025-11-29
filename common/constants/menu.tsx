import {
    HiOutlineHome as HomeIcon,
    HiOutlineUser as AboutIcon,
    HiOutlineRectangleStack as ProjectIcon,
    HiOutlineSquares2X2 as DashboardIcon,
    HiOutlineEnvelope as ContactIcon,
    HiOutlineBookOpen as BlogIcon,
    HiOutlineChatBubbleLeftRight as ChatRoomIcon,
    HiOutlineTrophy as AchievementIcon
} from "react-icons/hi2"

import { MenuProps } from "../types/menu"

const sizeIcon = "1.5em"
export const MENU: MenuProps[] = [
    {
        title: "Home",
        href: "/",
        icon: <HomeIcon size={sizeIcon} />,
        isShow: true,
        isExternal: true,
        eventName: "Go to Home Page"
    },
    {
        title: "About Me",
        href: "/about",
        icon: <AboutIcon size={sizeIcon} />
    },
    {
        title: "Projects",
        href: "/projects",
        icon: <ProjectIcon size={sizeIcon} />
    },
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: <DashboardIcon size={sizeIcon} />
    },
    {
        title: "Achievements",
        href: "/achievements",
        icon: <AchievementIcon size={sizeIcon} />
    },
    {
        title: "Contact",
        href: "/contact",
        icon: <ContactIcon size={sizeIcon} />
    },
    {
        title: "Chat Room",
        href: "/chat",
        icon: <ChatRoomIcon size={sizeIcon} />
    },
    {
        title: "Blog",
        href: "/blog",
        icon: <BlogIcon size={sizeIcon} />
    }
]
