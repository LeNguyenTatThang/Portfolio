import InputField from '@/common/components/elements/InputField'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { STACKS } from "@/common/constants/stacks"

type DataProject = {
    title: string;
    slug: string;
    description: string;
    image?: string;
    stacks: string[];
    is_show: boolean;
    is_featured: boolean;
    link_demo?: string;
    link_github: string;
    content: string;
}

function AddProject() {
    const stacks = Object.keys(STACKS)

    const { register, handleSubmit, formState: { errors } } = useForm<DataProject>()

    const [project, setProject] = useState<DataProject[]>([])
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) setPreviewImage(URL.createObjectURL(file))
    }

    const generateExcerpt = (text: string, length = 160) => {
        const cleaned = text.replace(/\n+/g, " ").trim()
        if (cleaned.length <= length) return cleaned
        let snippet = cleaned.slice(0, length)
        const lastSpace = snippet.lastIndexOf(" ")
        if (lastSpace > -1) snippet = snippet.slice(0, lastSpace)
        return snippet + "..."
    }

    const handleAddProject = handleSubmit(async (data) => {

        const slug = data.title
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/đ/g, "d")
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")

        const excerpt = generateExcerpt(data.content)

        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("slug", slug)
        formData.append("description", excerpt)
        formData.append("content", data.content)
        formData.append("stacks", JSON.stringify(data.stacks || []))
        formData.append("is_show", String(true))
        formData.append("is_featured", String(true))

        if (data.link_demo) formData.append("link_demo", data.link_demo)
        formData.append("link_github", data.link_github)

        if ((data as any).image?.[0]) {
            formData.append("image", (data as any).image[0])
        }
        
        const res = await fetch("/api/projects", {
            method: "POST",
            body: formData,
            credentials: "include",
        })


        const result = await res.json()

        const newProject: DataProject = {
            title: data.title,
            slug,
            description: excerpt,
            image: result.path,
            stacks: data.stacks || [],
            is_show: true,
            is_featured: true,
            link_demo: data.link_demo,
            link_github: data.link_github,
            content: data.content
        }

        setProject(prev => [newProject, ...prev])
        setPreviewImage(null)
    })



    return (
        <form onSubmit={handleAddProject} className="flex flex-col gap-4 mb-6">

            <InputField
                name="title"
                rule={{ required: "Title is required" }}
                placeholder="Project Title"
                register={register}
                error={errors}
            />

            <input
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={handleImagePreview}
                className="w-full rounded-lg bg-neutral-50 p-2 outline outline-neutral-300 
                focus:outline-neutral-400 dark:bg-neutral-900 dark:outline-neutral-700"
            />

            {previewImage && (
                <img
                    src={previewImage}
                    alt="preview"
                    className="w-full max-h-64 object-cover rounded-lg border border-neutral-300 
                    dark:border-neutral-700"
                />
            )}

             <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("is_show")}
                        defaultChecked
                    />
                    Show Project
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("is_featured")}
                        defaultChecked
                    />
                    Featured
                </label>
            </div>

            <InputField
                name="link_demo"
                placeholder="Demo link (optional)"
                register={register}
                error={errors}
            />

            <InputField
                name="link_github"
                placeholder="GitHub link"
                rule={{ required: "GitHub link is required" }}
                register={register}
                error={errors}
            />

            <InputField
                name="content"
                rule={{ required: "Content is required" }}
                register={register}
                error={errors}
                isTextArea
            />

            <div className="grid grid-cols-5 gap-2">
                {stacks.map((stack) => (
                    <label key={stack} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            value={stack}
                            {...register("stacks")}
                        />
                        {stack}
                    </label>
                ))}
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Project
            </button>
        </form>
    )
}

export default AddProject