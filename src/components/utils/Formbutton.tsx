

type Props = {
    title: string,
    type: "submit" | "button"
    loading?: boolean
    onClick?: () => void
    active?: boolean
}
function Formbutton({title, type, loading, onClick, active=true}: Props) {
  return (
    <div className="mt-5">
        <button 
        onClick={onClick}
        disabled={!active ? true : loading ? true : false} 
        type={type} 
        className={`${!active ? 'bg-[#D9D9D9]' : loading ? 'bg-[#D9D9D9]' : 'btn'} w-full rounded-lg py-3 text-white font-bold flex items-center gap-2 justify-center relative`}>
        <span>{title}</span>
       {loading && <div className="sloader"></div>}
    </button>
    </div>
  )
}

export default Formbutton