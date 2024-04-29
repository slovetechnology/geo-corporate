import React from "react"
import brand from '/src/assets/images/brand.svg'

type Props = {
    children: React.ReactNode
}
export default function FormPage({ children }: Props) {
    return (
        <div className="h-screen overflow-x-hidden overflow-y-auto w-full bgs">
            <div className="w-11/12 mx-auto py-3">
                <img src={brand} alt="" className="w-24 h-auto" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="hidden lg:block">
                    <div className="pls w-full h-[90dvh]"></div>
                </div>
                <div className="pb-10">
                    <div className="rounded-xl bg-white h-[40rem] w-11/12 px-10 py-14 max-w-xl mx-auto">
                        <div className="flex items-center justify-center w-full flex-col h-full">
                        {children}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

