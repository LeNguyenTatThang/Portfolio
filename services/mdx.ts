import fs from "fs"
import path from "path"

export const MDXFileBlog = (slug: string, content: string) => {
  const dir = path.join(process.cwd(), "contents", "blogs") 
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  const filePath = path.join(dir, `${slug}.mdx`)
  fs.writeFileSync(filePath, content)
}

export const MDXFileProject = (slug: string, content: string) => {
  const dir = path.join(process.cwd(), "contents", "projects") 
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  const filePath = path.join(dir, `${slug}.mdx`)
  fs.writeFileSync(filePath, content)
}