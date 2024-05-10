import { useState } from "react";
import ModalLayout from "/src/components/components/ModalLayout";
import Formbutton from "/src/components/utils/Formbutton";
import { Apis, AuthPostApi } from "/src/components/services/Api";
import Cookies from "js-cookie";
import { OrgID } from "/src/components/services/functions";
import toast from "react-hot-toast";

type Props = {
    closeView: () => void
    image: {
        img: string
        file: string
    }
}
export default function UploadDocument({ closeView, image }: Props) {
    const [loading, setLoading] = useState(false)

    const handleUpload = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const formdata = new FormData()
        formdata.append('file', image.file)
        formdata.append('name', "SLA REPORT")
        formdata.append('is_approved', "false")
        formdata.append('organization', `${Cookies.get(OrgID)}`)
        try {
            const response = await AuthPostApi(Apis.upload_document, formdata)
            console.log(response)
        } catch (error: any) {
            toast.error(`${error.message}`)
        }finally {
            setLoading(false)
        }
    }
    return (
        <ModalLayout closeView={closeView}>
            <form onSubmit={handleUpload} className="">
                <div className="h-[70vh] w-full rounded-lg border border-dashed border-primary relative">
                    <div className="absolute top-0 left-0 w-full h-full"></div>
                    <iframe
                        allowFullScreen={true}
                        title="PDF Preview"
                        src={image.img}
                        className="h-full w-full rounded-lg object-contain"
                    />
                </div>
                    <div className="mt-5 grid grid-cols-3">
                        <div className=""></div>
                        <div className=""></div>
                        <Formbutton 
                        title="Upload"
                        loading={loading}
                        type="submit"
                        />
                    </div>
            </form>
        </ModalLayout>
    )
}
