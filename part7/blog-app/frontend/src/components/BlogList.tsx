import { useUserValue } from '../UserContext';
import { iBlog } from '../services/blogs';
import BlogListElem from './BlogListElem';
import LogOut from './LogOut';
import NewBlogForm from './NewBlogForm';
import Togglable from './Togglable';

interface BlogListProps {
  blogList: iBlog[];
}

const BlogList = ({ blogList }: BlogListProps) => {
  const user = useUserValue();
  return (
    user && (
      <section className="flex flex-col items-center justify-center gap-1">
        <h3 className="p-1 font-semibold text-green-800">
          {user.name} logged in
        </h3>
        <Togglable action="new blog">
          <NewBlogForm />
        </Togglable>
        <LogOut />
        {blogList
          .sort((a: iBlog, b: iBlog) => b.likes! - a.likes!)
          .map((blog: iBlog) => (
            <BlogListElem key={blog.id} blog={blog} />
          ))}
      </section>
    )
  );
};

export default BlogList;
