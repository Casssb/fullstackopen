import { CourseInterface } from "../App";

interface Props {
    course: CourseInterface
}

const Header = ({course}: Props) => {
  return <h1>{course.name}</h1>;
};

export default Header;
