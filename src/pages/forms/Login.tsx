import { useState } from 'react'
import FormPage from '/src/layouts/FormPage'
import { Form, Formik } from 'formik'
import Formbutton from '/src/components/utils/Formbutton'
import { Link, useNavigate } from 'react-router-dom'
import Forminput from '/src/components/utils/Forminput'
import validator from 'validator'
import { Apis, ClientPostApi } from '/src/components/services/Api'
import Alert from '/src/components/utils/Alert'
import Cookies from 'js-cookie'
import { MainToken, OrgID, UserID } from '/src/components/services/functions'

type FormProps = {
    email: string,
    password: string
}
function Login() {
    const navigate = useNavigate()
    const [msg, setMsg] = useState({ status: '', message: '' })
    const [loading, setLoading] = useState(false)
    const handleSubmission = async (values: FormProps) => {
        setLoading(true)
        try {
            const forms = {
                username: values.email,
                password: values.password
            }
            const response = await ClientPostApi(Apis.login, forms)
            if (response.status === 200) {
                Cookies.set(MainToken, response.data.tokens.access)
                Cookies.set(OrgID, response.data.tokens.organization_id)
                Cookies.set(UserID, response.data.tokens.user_id)
                setMsg({ status: "success", message: `${response.message}` })
                setTimeout(() => navigate('/board'), 2000)
            } else if(response.message.includes('OTP not validated!')) {
                navigate(`/request_otp?mail=${forms.username}`)
            }else {
                setMsg({ status: "error", message: `${response.message}, Void` })
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
        if (!values.password) {
            errors.password = 'Password is required';
        }
        return errors
    }
    return (
        <FormPage>
            <div className="w-full">
                {msg.message && <Alert status={msg.status} message={msg.message} />}
                <div className="font-extrabold text-center text-3xl capitalize mb-10">welcome back</div>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={validateForm}
                    onSubmit={handleSubmission}
                >
                    {(formik) => (
                        <Form>
                            <Forminput
                                placeholder='Email Address'
                                name="email"
                                error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                            />
                            <Forminput
                                name="password"
                                type="password"
                                placeholder='Password'
                                error={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 mb-10 mt-8">
                                <div>
                                    <label className='flex items-center gap-2 cursor-pointer'>
                                        <div className="w-4 h-4 rounded-full border border-slate-600"></div>
                                        <div className="">Remember Me</div>
                                    </label>
                                </div>
                                <div className="w-fit ml-auto">
                                    <Link to="/forgot_password" className=' underline'>Forgot Password</Link>
                                </div>
                            </div>
                            <Formbutton loading={loading} title="Login" type="submit" />
                            <div className="text-slate-500 font-light flex items-center mt-14 justify-center gap-3">Don't have an account? <Link to="/signup" className='text-black font-bold underline'>Signup</Link> </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </FormPage>
    )
}

export default Login