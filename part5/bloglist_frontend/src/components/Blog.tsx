import { iBlog } from "../services/blogs"


interface BlogProps {
    blog: iBlog
}

const Blog = ({blog}: BlogProps) => {
  return (
    <>
    <div>{blog.title}</div>
    <h4>{blog.author}</h4>
    <h4>{blog.id}</h4>
    <h4>{blog.likes}</h4>
    <h4>{blog.url}</h4>
    </>
  )
}

export default Blog