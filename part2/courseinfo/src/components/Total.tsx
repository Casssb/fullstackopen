interface Props{
    total: number
}

function Total({total}: Props) {
  return (
    <p>Number of exercises {total}</p>
  )
}

export default Total