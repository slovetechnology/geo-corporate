
import FormPage from '/src/layouts/FormPage'
// import { Form, Formik } from 'formik'
// import Formbutton from '/src/components/utils/Formbutton'
// import { Link } from 'react-router-dom'
// import Forminput from '/src/components/utils/Forminput'
// import validator from 'validator'
// import arrowleft from '/src/assets/images/arrowleft.svg'
import mail from '/src/assets/images/mail.svg'
// import Otpform from '/src/components/utils/Otpform'

// type FormProps = {
//     email: string,
//     password: string
// }
export default function ConfirmSignup() {
    // const setup = (val: any) => {
    //     //
    // }
    // const handleSubmission = (values: FormProps) => {
    //     //
    // }
    // const validateForm = (values: FormProps) => {
    //     const errors: any = {}
    //     if (!values.email) {
    //         errors.email = "Email is required";
    //     } else if (!validator.isEmail(values.email)) {
    //         errors.email = 'Invalid email address'
    //     }
    //     if (!values.password) {
    //         errors.password = 'Password is required';
    //     }
    //     return errors
    // }
    return (
        <FormPage>
            <div className="w-full">

                <div className="">
                    <div className="flex items-center justify-center gap-5">
                        <div className="font-extrabold text-center text-3xl capitalize">check your email</div>
                    </div>
                    <div className="w-fit mx-auto my-7"> <img src={mail} alt="" className="w-44 h-auto" /> </div>
                    <div className="text-center w-3/5 mx-auto">We have sent you an email. Check your mail to verify your account.</div>
                </div>
            </div>
        </FormPage>
    )
}

