'use client'

import { useTheme } from "next-themes"
import { ReactNode, useEffect, useState } from "react"
import { SkeletonTheme } from "react-loading-skeleton"

interface SkeletonLoaderProps {
    children: ReactNode
}

const SkeletonLoader = ({ children }: SkeletonLoaderProps) => {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) return null  

    const baseColor = resolvedTheme === "light" ? "#ebebeb" : "#202020"
    const highlightColor = resolvedTheme === "light" ? "#f5f5f5" : "#2e2e2e"

    return (
        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
            {children}
        </SkeletonTheme>
    )
}

export default SkeletonLoader
