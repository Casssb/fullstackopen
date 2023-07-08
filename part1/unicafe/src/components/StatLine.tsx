interface Props {
    description: string
    stat: number
}

const StatLine = ({description, stat}: Props) => {
  return (
    <tr>{description} {stat}</tr>
  )
}

export default StatLine