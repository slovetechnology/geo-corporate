
import FormPage from '/src/layouts/FormPage'
import mail from '/src/assets/images/mail.svg'
export default function ConfirmSignup() {
    return (
        <FormPage>
            <div className="w-full">

                <div className="">
                    <div className="flex items-center justify-center gap-5">
                        <div className="tts text-center text-3xl capitalize">check your email</div>
                    </div>
                    <div className="w-fit mx-auto my-7"> <img src={mail} alt="" className="w-44 h-auto" /> </div>
                    <div className="text-center w-[17.5625rem] mx-auto">We have sent an email. Check your email to reset your password.</div>
                </div>
            </div>
        </FormPage>
    )
}

