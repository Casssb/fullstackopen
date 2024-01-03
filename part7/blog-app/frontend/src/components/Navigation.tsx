import { Link } from "react-router-dom"

const Navigation = () => {
  return (
    <nav>
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
    </nav>
  )
}

export default Navigation