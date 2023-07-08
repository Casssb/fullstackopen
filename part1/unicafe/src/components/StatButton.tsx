interface Props{
    feedback: string
    handleClick(feeback: string): void
}

const StatButton = ({feedback, handleClick}: Props) => {
  return (
    <button onClick={() => handleClick(feedback)}>{feedback}</button>
  )
}

export default StatButton