import { createClient } from "@/common/utils/server"

export const getBlogsData = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blogs")
    .select()
    .eq("is_published", true)
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching blogs:", error)
    return []
  }

  return data
}

export const getBlogsDataBySlug = async (slug: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blogs")
    .select()
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching blog by slug:", error)
    return null
  }

   if (data.cover_image) {
    const urlData = supabase
      .storage
      .from("blogs")
      .getPublicUrl(data.cover_image).data

    data.cover_image = urlData?.publicUrl ?? null
  }

  return data
}

export const createBlog = async(blogData: any) => {
  const supabase = await createClient()
  console.log(blogData)
  const {data, error} = await supabase
    .from("blogs")
    .insert([blogData])
    .single()

  if (error) {
    console.error("Error fetching blog by slug:", error)
    return null
  }

  return data
}

export const saveImgBlog = async (file: File) => {
  const supabase = await createClient()

  const ext = file.name.split(".").pop()
  const filePath = `blogs/${crypto.randomUUID()}.${ext}`

  const buffer = Buffer.from(await file.arrayBuffer())

  const { data, error } = await supabase.storage
    .from("blogs")
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false 
    })

  if (error) {
    console.error("Error uploading image:", error)
    return null
  }

  return data
}