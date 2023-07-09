import { PartInterface } from "../App"

interface Props {
    part: PartInterface
}

export default function Part({part}: Props) {
  return (
    <p key={part.id}>{part.name} {part.exercises}</p>
  )
}