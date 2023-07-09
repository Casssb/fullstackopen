import { PartInterface } from "../App"
import Part from "./Part"

interface Props{
    parts: PartInterface[]
}

function Content({parts}: Props) {
  return (
    <>
    {parts.map(content => (
        <Part key={content.id} part={content}/>
    ))}
    </>
  )
}

export default Content