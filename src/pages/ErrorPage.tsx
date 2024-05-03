
import img from '/src/assets/images/Frame.svg'
import img1 from '/src/assets/images/ops.svg'

export default function ErrorPage() {
    return (
        <div className='flex items-center justify-center flex-col w-full h-screen gap-10 px-10'>
            <div className="w-full h-[50dvh]"
            style={{background: `url(${img})center/contain no-repeat`}}
            ></div>
            <img src={img1} alt="" className="w-auto h-14" />
            <div className="w-2/3 mb-10 text-center">We couldn’t find the page or file you were looking for</div>
        </div>
    )
}