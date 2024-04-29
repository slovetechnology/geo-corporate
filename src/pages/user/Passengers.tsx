
import React from 'react'
import Layout from '/src/layouts/Layout'
import Table from '/src/components/utils/Table'
import Header from '/src/components/components/Header'
import { SlMagnifier } from 'react-icons/sl'

const dataKeys = [
    "",
    "name",
    "amount",
    "origin",
    "airport",
    "date created",
    "origin",
    "airport",
    "date created",
    ".......",
]
const dataValues = [
    "name",
    "amount",
    "origin",
    "date created",
    "name",
    "amount",
    "origin",
    "date created",
    "view ticket",
]
function Passengers() {
    return (
        <Layout>
            <Header />
            <div className="grid grid-cols-2 w-11/12 mx-auto">
                <div className="">
                    <button className='btn capitalize h-[2.8rem] px-4 text-white rounded-lg font-medium'>add passenger</button>
                </div>
                <div className="">
                    <div className="rounded-full py-0 px-3 flex items-center bg-zinc-200 w-full lg:w-3/6 ml-auto">
                        <SlMagnifier />
                        <input type="text" className="input bg-transparent outline-none text-sm !border-none" placeholder='Search...' />
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <Table keys={dataKeys} values={dataValues} data={new Array(10).fill(0)} />
            </div>
        </Layout>
    )
}

export default Passengers