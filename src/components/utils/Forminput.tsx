import { Field } from 'formik'
import DailcodeOptions from './DailcodeOptions'
import { ApiCountries } from './ApiCountries'

type Props = {
    type?: string
    placeholder: string
    error: string,
    setup?: any
    name: string
    dailcode?: string
}
export default function Forminput({ type = "text", placeholder, name, error, setup, dailcode }: Props) {
    const firstCode = ApiCountries.find((ele) => ele.dial_code === dailcode)
    const singleforms: string[] = ['password', 'text', 'email']
    if (singleforms.includes(type)) return (
        <div className='relative mb-5'>
            <Field type={type} name={name} placeholder={placeholder} className={`border w-full transition-all p-3.5 rounded-md outline-none ${error ? 'border-red-600' : 'border-[#eaeaea]'}`} />
            {error && <div className={`text-red-500 text-sm absolute left-0`}>{error}</div>}
        </div>
    )
    return (
        <div className="grid grid-cols-7 gap-3 relative">
            <div className="col-span-2">
                <DailcodeOptions
                    setup={setup}
                    defaultValue={firstCode?.dial_code}
                    title="--Select--"
                />
            </div>
            <div className="col-span-5">
                <div className='relative mb-5'>
                    <Field type={'number'} name={name} placeholder={placeholder} className={`border w-full transition-all p-3.5 rounded-md outline-none ${error ? 'border-red-600' : 'border-[#eaeaea]'}`} />
                    {error && <div className={`text-red-500 text-sm absolute left-0`}>{error}</div>}
                </div>
            </div>
        </div>
    )
}

