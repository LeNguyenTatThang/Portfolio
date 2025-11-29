import InputField from '@/common/components/elements/InputField'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { STACKS } from "@/common/constants/stacks"
import { BlogItem } from '@/common/types/blog'

function AddBlog() {
    const stacks = Object.keys(STACKS)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const [blogs, setBlogs] = useState<BlogItem[]>([])
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

    const handleAddBlog = handleSubmit(async (data) => {

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
        formData.append("excerpt", excerpt)
        formData.append("content", data.content)
        const published_at = new Date().toISOString().slice(0, 19).replace("T", " ")
        formData.append("published_at", published_at)
        formData.append("is_published", "true")
        formData.append("tags", JSON.stringify(data.stacks || []))
        if (data.cover_image?.[0]) formData.append("cover_image", data.cover_image[0])

        const res = await fetch("/api/blogs", {
            method: "POST",
            body: formData
        })

        const result = await res.json()

        const newBlog: BlogItem = {
            slug,
            title: data.title,
            excerpt,
            cover_image: result.cover_image || "", 
            content: data.content,
            published_at,
            is_published: true,
            tags: data.stacks || [],
        }
        setBlogs(prev => [newBlog, ...prev])
        setPreviewImage(null)
    })


    return (
        <form onSubmit={handleAddBlog} className="flex flex-col gap-4 mb-6">
            <InputField 
                name="title" 
                rule={{ required: true }} 
                placeholder="Blog Title" 
                register={register} 
                error={errors} 
            /> 

            <input 
                type="file" 
                accept="image/*"
                {...register("cover_image")}
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

            <InputField
                name="content"
                rule={{ required: true }}
                register={register}
                error={errors}
                isTextArea
            />

            <div className="grid grid-cols-5 gap-2">
                {stacks.map((stack) => (
                    <div key={stack} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            value={stack}
                            {...register("stacks")}
                        />
                        <label>{stack}</label>
                    </div>
                ))}
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Blog
            </button>
        </form>
    )
}

export default AddBlog
