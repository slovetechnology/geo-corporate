import ErrorPage from "./pages/ErrorPage";
import AccountConfirmed from "./pages/forms/AccountConfirmed";
import ConfirmSignup from "./pages/forms/ConfirmSignup";
import ForgotPassword from "./pages/forms/ForgotPassword";
import Login from "./pages/forms/Login";
import RequestNewPassword from "./pages/forms/RequestNewPassword";
import Signup from "./pages/forms/Signup";
import SignupOtp from "./pages/forms/SignupOtp";
import ValidateSignupEmail from "./pages/forms/ValidateSignupEmail";
import SearchBookings from "./pages/user/Booking/SearchBookings";
import Dashboard from "./pages/user/Dashboard";
import Passengers from "./pages/user/Passengers";
import Transactions from "./pages/user/Transactions";

export const FormsRoutes = [
    {path: `/`, element: Login},
    {path: `/*`, element: ErrorPage},
    {path: `/signup`, element: Signup},
    {path: `/verify_email`, element: SignupOtp},
    {path: `/account_confirmed`, element: AccountConfirmed},
    {path: `/confirm_signup`, element: ConfirmSignup}, // for signup
    {path: `/confirm_email`, element: ConfirmSignup}, // for forgot password
    {path: `/forgot_password`, element: ForgotPassword},
    {path: `/update_account_password/:uuid/:token`, element: RequestNewPassword},
    {path: `/validate_signup/:key`, element: ValidateSignupEmail},
]

export const UserRoutes = [
    {path: "/board", element: Dashboard},
    {path: "/passengers", element: Passengers},
    {path: "/transactions", element: Transactions},
    {path: "/book-flight", element: SearchBookings},
]