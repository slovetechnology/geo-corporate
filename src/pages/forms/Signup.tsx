import FormPage from '/src/layouts/FormPage'
import { Form, Formik } from 'formik'
import Formbutton from '/src/components/utils/Formbutton'
import { Link, useNavigate } from 'react-router-dom'
import Forminput from '/src/components/utils/Forminput'
import validator from 'validator'
import { useState } from 'react'
import Alert from '/src/components/utils/Alert'
import { Apis, ClientPostApi } from '/src/components/services/Api'
import arrowimg from '/src/assets/images/arrowleft.svg'

type FormProps = {
    email: string,
    organization_name: string
    first_name: string
    last_name: string
    phone: string
    address: string
}
export default function Signup() {
    const [dailcode, setDailcode] = useState('')
    const [msg, setMsg] = useState({ status: '', message: '' })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const setup = (val: any) => {
        setDailcode(val.dial_code)
    }
    const handleSubmission = async (values: FormProps) => {
        const formdata = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: `${dailcode}${values.phone}`,
            address: values.address,
            organization_name: values.organization_name
        }
        let response: any;
        setLoading(true)
        setMsg({ ...msg, message: '' })
        try {
            response = await ClientPostApi(Apis.signup, formdata)
            if (response.status === 201) {
                navigate(`/verify_email?v=${values.email}`)
            } else {
                setMsg({ status: 'error', message: `${response?.data?.message || response.error.error}` })
            }
        } catch (error: any) {
            setMsg({ status: 'error', message: `${error.response.data.message}` })
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
        if (!values.phone) {
            errors.phone = 'Primary phone number is required';
        }
        if (!dailcode) {
            errors.phone = 'Country dail code is required';
        }
        if (!values.first_name) {
            errors.first_name = 'Contact first name is required';
        }
        if (!values.last_name) {
            errors.last_name = 'Contact last name is required';
        }
        if (!values.organization_name) {
            errors.organization_name = 'Organization name is required';
        }
        if (!values.address) {
            errors.address = 'official address is required';
        }
        return errors
    }
    return (
        <FormPage>
            {msg.message && <Alert status={msg.status} message={msg.message} />}
            <div className="w-full">
                <div className="flex items-center justify-center gap-5 mb-7">
                    <Link to="/"><img src={arrowimg} className='' alt="GeoTravel" /></Link>
                    <div className="tts text-center text-2xl capitalize">create account</div>
                </div>
                <Formik
                    initialValues={{ organization_name: '', first_name: '', last_name: '', address: '', email: '', phone: '' }}
                    validate={validateForm}
                    onSubmit={handleSubmission}
                >
                    {(formik) => (
                        <Form>
                            <Forminput
                                placeholder='Organization'
                                name="organization_name"
                                error={formik.touched.organization_name && formik.errors.organization_name ? formik.errors.organization_name : ''}
                            />
                            <Forminput
                                placeholder='First Name'
                                name="first_name"
                                error={formik.touched.first_name && formik.errors.first_name ? formik.errors.first_name : ''}
                            />
                            <Forminput
                                placeholder='Last Name'
                                name="last_name"
                                error={formik.touched.last_name && formik.errors.last_name ? formik.errors.last_name : ''}
                            />
                            <Forminput
                                placeholder='Work Email'
                                name="email"
                                error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                            />
                            <Forminput
                                placeholder='Phone Number'
                                name="phone"
                                type="phone"
                                dailcode={dailcode}
                                setup={setup}
                                error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
                            />
                            <Forminput
                                placeholder='Office Address'
                                name="address"
                                error={formik.touched.address && formik.errors.address ? formik.errors.address : ''}
                            />
                            <Formbutton loading={loading} title="Create Account" type="submit" 
                            active={(
                                !formik.values.organization_name || !formik.values.first_name || !formik.values.last_name || !formik.values.address || !formik.values.email || !formik.values.phone
                            ) ? false : true}
                            />
                            <div className="text-slate-500 font-light flex items-center mt-5 justify-center gap-3">Already have an account? <Link to="/" className='text-black tts underline'>Login</Link> </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </FormPage>
    )
}

