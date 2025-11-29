"use client"

import dynamic from "next/dynamic"
import { BiCollection as ProjectIcon, BiUser as AboutIcon } from "react-icons/bi"
import { PiChatTeardropDotsBold as ChatRoomIcon } from "react-icons/pi"
import { PiCertificate as AchievementIcon } from "react-icons/pi"
import { BENTO_DATA, BentoData } from "@/common/types/bentoData"

const AnimatedListProject = dynamic(() => import("@/modules/home/components/Bento/AnimatedListProject"), { ssr: false })
const StackImagesPersonal = dynamic(() => import("@/modules/home/components/Bento/StackImagesPersonal"), { ssr: false })
const MarqueeIcons = dynamic(() => import("@/modules/home/components/Bento/MarqueeIcons"), { ssr: false })
const AchievementFolder = dynamic(() => import("@/modules/home/components/Bento/AchievementFolder"), { ssr: false })
const TrueFocusService = dynamic(() => import("@/modules/home/components/Bento/TrueFocusService"), { ssr: false })
const ChatPreview = dynamic(() => import("@/modules/home/components/Bento/ChatPreview"), { ssr: false })

const size = 22

export interface BentoItemProps extends BentoData {
    icon?: React.ReactElement
    visual?: React.ReactElement
}

export const BENTO: BentoItemProps[] = BENTO_DATA.map((item) => {
    switch (item.id) {
        case 1:
            return { ...item, icon: <ProjectIcon size={size} />, visual: <AnimatedListProject /> }
        case 2:
            return { ...item, icon: <AboutIcon size={size} />, visual: <StackImagesPersonal /> }
        case 3:
            return { ...item, icon: undefined, visual: <MarqueeIcons /> }
        case 4:
            return { ...item, icon: <AchievementIcon size={size} />, visual: <AchievementFolder /> }
        case 5:
            return { ...item, icon: <ChatRoomIcon size={size} />, visual: <ChatPreview /> }
        case 6:
            return { ...item, icon: undefined, visual: <TrueFocusService /> }
        default:
            return item
    }
})
