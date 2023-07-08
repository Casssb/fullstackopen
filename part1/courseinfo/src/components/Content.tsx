import { ContentInterface } from "../App"
import Part from "./Part"

interface Props{
    contentArray: ContentInterface[]
}

function Content({contentArray}: Props) {
  return (
    <>
    {contentArray.map(content => (
        <Part content={content}/>
    ))}
    </>
  )
}

export default Content