import { ContentInterface } from "../App"

interface Props {
    content: ContentInterface
}

export default function Part({content}: Props) {
  return (
    <p key={content.part}>{content.part} {content.exercise}</p>
  )
}