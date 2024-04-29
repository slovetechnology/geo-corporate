import { useAtom } from "jotai";
import Table from "/src/components/utils/Table";
import Layout from "/src/layouts/Layout";
import { Company } from "/src/layouts/layoutStore";

const dataKeys = [
    "",
    "name",
    "amount",
    "origin",
    "airport",
    "date created",
    "name",
    "amount",
    "origin",
    "airport",
    "date created",
    ".......",
]
const dataValues = [
    "name",
    "amount",
    "origin",
    "paid|status",
    "date created",
    "name",
    "amount",
    "origin",
    "paid|status",
    "date created",
    "view ticket",
]

export default function Dashboard() {
    const [comp, ] = useAtom(Company)
    return (
        <Layout>
            <div className="font-extrabold text-[2.85rem]">Hello, {comp?.organization_name}</div>
            <div className="text-zinc-500">Welcome back!</div>
            <div className="mt-20">
            <Table keys={dataKeys} values={dataValues} data={new Array(10).fill(0)} title="Recent Transactions" />
            </div>
        </Layout>
    )
}


