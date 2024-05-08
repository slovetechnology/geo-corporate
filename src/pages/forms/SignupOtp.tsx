

import FormPage from '/src/layouts/FormPage'
import arrowleft from '/src/assets/images/arrowleft.svg'
import mail from '/src/assets/images/mail.svg'
import Otpform from '/src/components/utils/Otpform'
import Formbutton from '/src/components/utils/Formbutton'
import React, { useState } from 'react'
import Alert from '/src/components/utils/Alert'
import pswd from '/src/assets/images/pass.svg'
import { Form, Formik } from 'formik'
import Forminput from '/src/components/utils/Forminput'
import { Apis, ClientPostApi } from '/src/components/services/Api'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SlExclamation } from 'react-icons/sl'
import { Popover } from 'antd';


type FormProps = {
    confirm_password: string,
    password: string
}

export default function SignupOtp() {
    const [search,] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [pinParts, setPinParts] = useState(['', '', '', '', '', '']);
    const [screen, setScreen] = useState(2)
    const [msg, setMsg] = useState({ status: '', message: '' })
    const navigate = useNavigate()
    const [sendtext, setSendtext] = useState('Resend Code')

    const ResendOTPCode = async () => {
        const email = search.get('v')
        if (!email) return setMsg({ status: 'error', message: `Invalid Email address assigned` })
        setSendtext('Resending code, hold on....')
        const forms = {
            email
        }
        try {
            const response = await ClientPostApi(Apis.resend_signup_email_otp, forms)
            if (response.status === 200)
                setSendtext('Code sent, check your Email..')
            setTimeout(() => {
                setSendtext('Resend Code')
            }, 4000);
        } catch (error: any) {
            setSendtext(`Sending code failed`)
            setTimeout(() => {
                setSendtext('Resend Code')
            }, 4000);
            return setMsg({ status: 'error', message: `${error.message}` })
        } finally {
            //
        }
    }


    const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let err: string = "";
        pinParts.map(ele => {
            if (ele === '') err = 'provide a valid otp code'
        })
        if (err) return setMsg({ status: 'error', message: `${err}` })
        setMsg({ ...msg, message: '' })
        setScreen(2)
    }

    const handleSubmit = async (values: FormProps) => {
        const forms = {
            otp: pinParts.join(''),
            password: values.password,
        }
        setLoading(true)
        try {
            const response = await ClientPostApi(Apis.validate_signup_email_otp, forms)
            if (response.status === 200) {
                setMsg({ status: 'success', message: response.message })
                setTimeout(() => navigate('/login'), 2000)
            } else {
                setMsg({ status: 'error', message: response.message })
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

        if (!values.confirm_password) {
            errors.confirm_password = 'Confirm Password is required';
        }
        if (values.confirm_password && values.confirm_password !== values.password) {
            errors.confirm_password = 'Password(s) mismatched';
        }
        return errors
    }

    const content = (
        <div>
            <div className="flex items-center gap-2 pb-2"> <div className="w-2 h-2 btn rounded-full"></div> Password must be up to 12 characters </div>
            <div className="flex items-center gap-2 pb-2"> <div className="w-2 h-2 btn rounded-full"></div> Password must contain a capital letter </div>
            <div className="flex items-center gap-2 pb-2"> <div className="w-2 h-2 btn rounded-full"></div> Password must contain an alphabet </div>
            <div className="flex items-center gap-2 pb-2"> <div className="w-2 h-2 btn rounded-full"></div> Password must contain a number </div>
            <div className="flex items-center gap-2 pb-2"> <div className="w-2 h-2 btn rounded-full"></div> Password must contain a special character </div>
        </div>
    )

    return (
        <FormPage>
            {msg.message && <Alert status={msg.status} message={msg.message} />}
            {screen === 1 && <div className="w-full">

                <form onSubmit={handleSubmission} className="">
                    <div className="flex items-center justify-center gap-5 mb-7">
                        {/* <img src={arrowleft} alt="GeoTravel" /> */}
                        <div className="font-bold text-center text-2xl capitalize">Enter Verification Code</div>
                    </div>
                    <div className="w-fit mx-auto my-7"> <img src={mail} alt="" className="w-[3.8rem] h-auto" /> </div>
                    <div className="text-center w-3/5 mx-auto font-light mb-10">Thank you for creating an account. Please enter the code sent to your email</div>
                    <Otpform
                        pinParts={pinParts}
                        setPinParts={setPinParts}
                    />
                    <div className="text-slate-400 flex items-center justify-center gap-2 my-10">Didn’t receive a code?
                        <button
                            disabled={sendtext === 'Resend Code' ? false : true}
                            type="button"
                            onClick={ResendOTPCode}
                            className="underline text-black">{sendtext}</button> </div>
                    <div className="">
                        <Formbutton type="submit" title="Next" loading={loading} />
                    </div>
                </form>
            </div>}
            {screen === 2 && <div className='w-full'>

                <div className="mb-10">
                    <div className="flex items-center justify-center gap-5">
                        <img onClick={() => setScreen(1)} src={arrowleft} alt="GeoTravel" className='cursor-pointer' />
                        <div className="font-bold text-center text-2xl capitalize">create new password</div>
                    </div>
                    <div className="w-fit mx-auto my-7"> <img src={pswd} alt="" className="" /> </div>
                    <div className="text-center w-3/5 mx-auto">Your new password must be different from previously used password.</div>
                </div>
                <Formik
                    initialValues={{ password: '', confirm_password: '' }}
                    validate={validateForm}
                    onSubmit={handleSubmit}
                >
                    {(formik) => (
                        <Form>
                            <div className="relative">
                                <Forminput
                                    placeholder='New Password'
                                    name="password"
                                    type="password"
                                    error={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                                />
                                <button type="button" className='absolute top-5 right-3'>
                                    <Popover content={content} title="Password Requirements" trigger="click">
                                        <SlExclamation />
                                    </Popover>
                                </button>
                            </div>
                            <Forminput
                                placeholder='Confirm Password'
                                name="confirm_password"
                                type="password"
                                error={formik.touched.confirm_password && formik.errors.confirm_password ? formik.errors.confirm_password : ''}
                            />
                            <Formbutton loading={loading} title="Verifiy Account" type="submit" />
                        </Form>
                    )}
                </Formik>
            </div>}
        </FormPage>
    )
}

