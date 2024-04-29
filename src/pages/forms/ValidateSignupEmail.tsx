
import { useState } from 'react'
import FormPage from '/src/layouts/FormPage'
import { Form, Formik } from 'formik'
import Formbutton from '/src/components/utils/Formbutton'
import { useNavigate, useParams } from 'react-router-dom'
import Forminput from '/src/components/utils/Forminput'
import arrowleft from '/src/assets/images/arrowleft.svg'
import pswd from '/src/assets/images/pass.svg'
import { Apis, ClientPostApi } from '/src/components/services/Api'
import Alert from '/src/components/utils/Alert'

type FormProps = {
    confirm_password: string,
    password: string
}

export default function ValidateSignupEmail() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [msg, setMsg] = useState({ status: '', message: '' })
    const {key}: any = useParams()

    const handleSubmission = async (values: FormProps) => {
        const forms = {
            key,
            password: values.password,
        }
        setLoading(true)
        try {
            const response = await ClientPostApi(Apis.validate_signup_email, forms)
            console.log(response)
            if(response.status === 200) {
                setMsg({status:'success', message: response.message})
                setTimeout(() => navigate('/login'), 2000)
            }
        } catch (error: any) {
            setMsg({status: 'error', message: `${error.message}`})
        }finally {
            setLoading(false)
        }
    }
    const validateForm = (values: FormProps) => {
        const errors: any = {}
        if (!values.password) {
            errors.password = 'Password is required';
        }
        if (!values.confirm_password) {
            errors.confirm_password = 'Confirm Password is required';
        }
        if (values.confirm_password && values.confirm_password !== values.password) {
            errors.confirm_password = 'Password(s) mismatched';
        }
        return errors
    }
    return (
        <FormPage>
            <div className="w-full">
{msg.message && <Alert status={msg.status} message={msg.message} /> }
                <div className="mb-10">
                    <div className="flex items-center justify-center gap-5">
                        <img src={arrowleft} alt="GeoTravel" />
                        <div className="font-bold text-center text-2xl capitalize">Setup password</div>
                    </div>
                    <div className="w-fit mx-auto my-7"> <img src={pswd} alt="" className="" /> </div>
                    <div className="text-center w-3/5 mx-auto">Setup a password on your account.</div>
                </div>
                <Formik
                    initialValues={{ password: '', confirm_password: '' }}
                    validate={validateForm}
                    onSubmit={handleSubmission}
                >
                    {(formik) => (
                        <Form>
                            <Forminput 
                            placeholder='New Password' 
                            name="password"
                            type="password"
                            error={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                            />
                            <Forminput 
                            placeholder='Confirm Password' 
                            name="confirm_password"
                            type="password"
                            error={formik.touched.confirm_password && formik.errors.confirm_password ? formik.errors.confirm_password : ''}
                            />
                            <Formbutton loading={loading} title="Save" type="submit" />
                        </Form>
                    )}
                </Formik>
            </div>
        </FormPage>
    )
}

