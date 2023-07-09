import { CourseInterface } from "../App"
import Content from "./Content"
import Header from "./Header"
import Total from "./Total"

interface Props {
    course: CourseInterface
}

const Course = ({course}: Props) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total total={course.parts.reduce((acc, c) => acc + c.exercises, 0)} />
    </div>
  )
}

export default Course