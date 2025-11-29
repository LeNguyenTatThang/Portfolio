import { createClient } from "@/common/utils/server"

export const getProjectsData = async () => {
    const supabase = await createClient()
    const { data, error } = await supabase.from("projects").select()

    if (error) {
        console.error("Error fetching projects:", error)
        return []
    }

    if (!data || data.length === 0) return []

    const projects = data.map((item: any) => {
        const publicUrl = item.image
            ? supabase.storage.from("projects").getPublicUrl(item.image).data.publicUrl
            : "/images/no-image.png" 
        return { ...item, image: publicUrl }
    })

    return projects
}


export const getProjectsDataBySlug = async (slug: string) => {
    const supabase = await createClient()
    let { data } = await supabase.from("projects").select().eq("slug", slug).single()
    if(data.image) {
      const urlData = supabase
        .storage
        .from("projects")
        .getPublicUrl(data.image).data

      data.image = urlData?.publicUrl ?? null
    }

    return data
}

export const createProject = async(projectData: any) => {
  const supabase = await createClient()
  const {data, error} = await supabase
    .from("projects")
    .insert([projectData])
    .single()

  if (error) {
    console.error("Error fetching blog by slug:", error)
    return null
  }

  return data
}

export const saveImgProject = async (file: File) => {
  const supabase = await createClient()

  const ext = file.name.split(".").pop()
  const filePath = `projects/${crypto.randomUUID()}.${ext}`

  const buffer = Buffer.from(await file.arrayBuffer())

  const { data, error } = await supabase.storage
    .from("projects")
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