import FormPage from '/src/layouts/FormPage'
import { Form, Formik } from 'formik'
import Formbutton from '/src/components/utils/Formbutton'
import { Link, useNavigate } from 'react-router-dom'
import Forminput from '/src/components/utils/Forminput'
import validator from 'validator'
import arrowleft from '/src/assets/images/arrowleft.svg'
import { useState } from 'react'
import Alert from '/src/components/utils/Alert'
import { Apis, ClientPostApi } from '/src/components/services/Api'

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
    const [msg, setMsg] = useState({status: '', message: ''})
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
        setMsg({...msg, message: ''})
        try {
            response = await ClientPostApi(Apis.signup, formdata)
            if (response.status === 201) {
                navigate('/verify_email')
            } else {
                console.log(response.error.error)
                setMsg({status: 'error', message: `${response?.data?.message || response.error.error}`})
            }
        } catch (error: any) {
            setMsg({status: 'error', message: `${error.response.data.message}`})
        }finally {
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
        if(!values.phone) {
            errors.phone = 'Primary phone number is required';
        }
        if(!dailcode) {
            errors.phone = 'Country dail code is required';
        }
        if(!values.first_name) {
            errors.first_name = 'Contact first name is required';
        }
        if(!values.last_name) {
            errors.last_name = 'Contact last name is required';
        }
        if(!values.organization_name) {
            errors.organization_name = 'Organization name is required';
        }
        if(!values.address) {
            errors.address = 'official address is required';
        }
        return errors
    }
    return (
        <FormPage>
            {msg.message && <Alert status={msg.status} message={msg.message} /> }
            <div className="w-full">
                <div className="flex items-center justify-center gap-5 mb-7">
                    <img src={arrowleft} alt="GeoTravel" />
                <div className="font-bold text-center text-2xl capitalize">create account</div>
                </div>
                <Formik
                    initialValues={{ organization_name: '', first_name: '', last_name: '', address: '', email: '', phone: ''}}
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
                            {/* <div className="relative">
                            <Forminput 
                            name="password"
                            type="password"
                            placeholder='Password' 
                            error={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                            />
                            <div className="absolute top-4 right-3 text-xl text-slate-400 cursor-pointer">
                                <SlExclamation />
                            </div>
                            </div>
                            <Forminput 
                            type='password'
                            name="confirm_password"
                            placeholder='Confirm Password' 
                            error={formik.touched.confirm_password && formik.errors.confirm_password ? formik.errors.confirm_password : ''}
                            /> */}
                            <Formbutton loading={loading} title="Create Account" type="submit" />
                            <div className="text-slate-500 font-light flex items-center mt-5 justify-center gap-3">Already have an account? <Link to="/login" className='text-black font-bold underline'>Login</Link> </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </FormPage>
    )
}

