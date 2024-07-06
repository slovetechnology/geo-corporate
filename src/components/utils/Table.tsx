import { Link } from 'react-router-dom'

type Props = {
    keys: string[]
    values: string[]
    data: any
    title?: string
}

const Status = [
    { stat: 'paid', cl: 'text-[#57b014] bg-[#e9f8e9] rounded-lg tts py-1.5 px-4' },
    { stat: 'unpaid', cl: 'text-[#f5b334] bg-[#fff8df] rounded-lg tts py-1.5 px-4' },
]
function Table({ keys, values, data, title }: Props) {

    const Valued = (item: string, i: number) => {
        const split = item.split('|');
        if (split[1]) {
            // const stat = "unpaid"
            const stat = i % 2 === 0 ? "unpaid" : split[0]
            if (split[1] === 'status') {
                return <span className={Status.find((ele: any) => ele.stat === stat)?.cl}>{stat}</span>
                // return <span className={Status.find((ele: any) => ele.stat === stat)?.cl}>{stat}</span>
            }
        }
        return <span>{split[0]}</span>
    }
    return (
        <div className="overflow-x-auto p-5">
            <div className=' w-fit lg:w-full'>
                <div className="tablediv">
                   {title && <div className="w-11/12 mx-auto grid grid-cols-5 pb-5">
                        <div className="tts text-2xl col-span-4">{title}</div>
                        <div className="col-span-1">
                            <Link to="" className='text-primary underline capitalize'>view more</Link>
                        </div>
                    </div>}
                    <table>
                        <thead>
                            <tr>
                                {keys.map((ele: string, index: number) => (
                                    <th key={index}>{ele}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item: string, index: number) => (
                                <tr id={item} className='tr-extra' key={index}>
                                    {values.map((ele: string, i: number) => (
                                        <td key={i}>{Valued(ele, index)}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Table