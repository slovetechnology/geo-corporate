
import { useState } from 'react'
import FormPage from '/src/layouts/FormPage'
import { Form, Formik } from 'formik'
import Formbutton from '/src/components/utils/Formbutton'
import { useNavigate, useParams } from 'react-router-dom'
import Forminput from '/src/components/utils/Forminput'
import arrowleft from '/src/assets/images/arrowleft.svg'
import pswd from '/src/assets/images/pass.svg'
import { Apis, ClientPatchApi } from '/src/components/services/Api'
import Alert from '/src/components/utils/Alert'

type FormProps = {
    confirm_password: string,
    password: string
}
export default function RequestNewPassword() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [msg, setMsg] = useState({ status: '', message: '' })
    const { uuid, token }: any = useParams()

    const handleSubmission = async (values: FormProps) => {
        const forms = {
            uidb64: uuid,
            token: token,
            password: values.password,
        }
        setLoading(true)
        try {
            const response = await ClientPatchApi(Apis.reset_password, forms)
            if (response.success) {
                setMsg({ status: 'success', message: response.message })
                setTimeout(() => navigate('/account_confirmed'), 2000)
            }
        } catch (error: any) {
            setMsg({ status: 'error', message: `${error.message}` })
        } finally {
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
        if (values.password && values.password.length <= 12) {
            errors.password = 'Password must be at least 12 characters';
        }
        if (values.password && !values.password.match(/[A-Z]/)) {
            errors.password = 'Password must contain a capital letter';
        }
        if (values.password && !values.password.match(/[a-z]/)) {
            errors.password = 'Password must contain an alphabet';
        }
        if (values.password && !values.password.match(/[0-9]/)) {
            errors.password = 'Password must contain a number';
        }
        if (values.password && !values.password.match(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/)) {
            errors.password = 'Password must contain a special character';
        }
        if (values.confirm_password && values.confirm_password !== values.password) {
            errors.confirm_password = 'Password(s) mismatched';
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
                        <div className="font-bold text-center text-2xl capitalize">create new password</div>
                    </div>
                    <div className="w-fit mx-auto my-7"> <img src={pswd} alt="" className="" /> </div>
                    <div className="text-center w-3/5 mx-auto">Your new password must be different from previously used password.</div>
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

