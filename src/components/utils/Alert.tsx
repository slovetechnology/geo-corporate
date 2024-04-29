
type StatusProps = 'info' | 'error' | 'success' | string
type Props = {
    status: StatusProps
    message: string
}
function Alert({status, message}: Props) {
  return (
    <div className={`fixed top-0 left-0 w-full text-white p-3 ${status === 'info' ? 'bg-blue-500' : status === 'error' ? 'bg-red-500' : 'bg-green-500'} tops`}>{message}</div>
  )
}

export default Alert