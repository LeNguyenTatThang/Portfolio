"use client"

import React, { useState } from "react"
import { ProjectItem } from "@/common/types/projects"
import { useSession } from "next-auth/react"
import AddBlog from "./AddBlog"
import AddProject from "./AddProject"

const Add = () => {
    const { data: session, status } = useSession()
    
    if(status === "loading") return <div>Loading...</div>

    const userEmail = session?.user?.email ?? null
    const authorEmail = process.env.NEXT_PUBLIC_AUTHOR_EMAIL

    if(userEmail !== authorEmail) return <div>Access denied</div>

    const [activeTab, setActiveTab] = useState<"blog" | "project">("blog")

    const [projects, setProjects] = useState<ProjectItem[]>([])
    const [projectName, setProjectName] = useState("")
    const [isFeatured, setIsFeatured] = useState(false)

    const newProject: ProjectItem = {
        id: Date.now(),
        title: projectName,
        slug: projectName.toLowerCase().replace(/\s+/g, "-"), 
        description: "",  
        image: "",        
        stacks: [],    
        is_show: true,
        is_featured: isFeatured,
        link_demo: null,   
        link_github: null, 
        content: null    
    }

    const handleAddProject = (e: React.FormEvent) => {
        e.preventDefault()
        setProjects((prev) => [newProject, ...prev])
        setProjectName("")
        setIsFeatured(false)
    }

    return (
        <div className="p-6">
        <div className="flex border-b mb-6">
            <button
            onClick={() => setActiveTab("blog")}
            className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
                activeTab === "blog" ? "border-blue-500 text-blue-500" : "border-transparent"
            }`}
            >
            Add Blog
            </button>
            <button
            onClick={() => setActiveTab("project")}
            className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
                activeTab === "project" ? "border-green-500 text-green-500" : "border-transparent"
            }`}
            >
            Add Project
            </button>
        </div>

        {activeTab === "blog" && (
            <AddBlog />
        )}

        {activeTab === "project" && (
            <AddProject />
        )}
        </div>
    )
}

export default Add