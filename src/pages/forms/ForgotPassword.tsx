

import { useState } from 'react'
import FormPage from '/src/layouts/FormPage'
import { Form, Formik } from 'formik'
import Formbutton from '/src/components/utils/Formbutton'
import { useNavigate } from 'react-router-dom'
import Forminput from '/src/components/utils/Forminput'
import validator from 'validator'
import arrowleft from '/src/assets/images/arrowleft.svg'
import pswd from '/src/assets/images/pass.svg'
import Alert from '/src/components/utils/Alert'
import { Apis, ClientPostApi } from '/src/components/services/Api'

type FormProps = {
    email: string,
}
export default function ForgotPassword() {
    const navigate = useNavigate()
    const [msg, setMsg] = useState({ status: '', message: '' })
    const [loading, setLoading] = useState(false)
    const handleSubmission = async (values: FormProps) => {
        setLoading(true)
        try {
            const response = await ClientPostApi(Apis.send_email, values)
            if (!Object.keys(response).includes("error")) {
                setMsg({ status: "success", message: `${response.success}` })
                setTimeout(() => navigate('/confirm_email'), 2000)
            } else {
                setMsg({ status: "error", message: `${response.error}` })
            }
        } catch (error: any) {
            setMsg({ status: 'error', message: `${error.message}` })
        } finally {
            setLoading(false)
        }
    }
    const validateForm = (values: FormProps) => {
        const errors: any = {}
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!validator.isEmail(values.email)) {
            errors.email = 'Invalid email address'
        }
        return errors
    }
    return (
        <FormPage>
            <div className="w-full">
                {msg.message && <Alert status={msg.status} message={msg.message} />}
                <div className="mb-10">
                    <div className="flex items-center justify-center gap-5">
                        <img src={arrowleft} alt="GeoTravel" />
                        <div className="font-bold text-center text-2xl capitalize">forgot password</div>
                    </div>
                    <div className="w-fit mx-auto my-7"> <img src={pswd} alt="" className="" /> </div>
                    <div className="text-center w-3/5 mx-auto">Please enter your email address to receive a verification code</div>
                </div>
                <Formik
                    initialValues={{ email: '' }}
                    validate={validateForm}
                    onSubmit={handleSubmission}
                >
                    {(formik) => (
                        <Form>
                            <Forminput
                                placeholder='Contact Email'
                                name="email"
                                error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                            />
                            <Formbutton loading={loading} title="Send" type="submit" />
                        </Form>
                    )}
                </Formik>
            </div>
        </FormPage>
    )
}

