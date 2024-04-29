

type Props = {
    title: string,
    type: "submit" | "button"
    loading: boolean
}
function Formbutton({title, type, loading}: Props) {
  return (
    <div className="mt-5">
        <button disabled={loading ? true : false} type={type} className={`${loading ? 'bg-slate-400' : 'btn'} w-full rounded-lg py-3 text-white font-bold flex items-center gap-2 justify-center relative`}>
        <span>{title}</span>
       {loading && <div className="sloader"></div>}
    </button>
    </div>
  )
}

export default Formbutton