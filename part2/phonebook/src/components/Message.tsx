interface Props {
    isSuccess: boolean,
    errorMsg: string
}

const Message = ({isSuccess, errorMsg}: Props) => {
  return (
    <div className={isSuccess ? 'success' : 'error'}>
        <p>{errorMsg}</p>
    </div>
  )
}

export default Message