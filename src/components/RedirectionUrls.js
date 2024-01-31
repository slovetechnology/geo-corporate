import { onlinesitename } from "/src/services/Geoapi";



export const Redirect = [
    {
        title: 'Admin Invitation',
        tag: 'invitation',
        url: `${onlinesitename}invitation/`
    },
    {
        title: 'Package reserved',
        tag: 'package-reserved',
        url: `${onlinesitename}package-reserved/`
    },
    {
        title: 'Manage Booking',
        tag: 'manage-booking',
        url: `${onlinesitename}booking_reservation/`,
    },
    {
        title: 'Affiliate Payment Portal',
        tag: 'affiliate-payment',
        url: `${onlinesitename}affiliate/portal/verify-payment/`,
    },
    {
        title: 'Affiliate Confirmation',
        tag: 'affiliate-confirmation',
        url: `${onlinesitename}affiliate/confirmation/`
    },
    {
        title: 'Visa Processing Link',
        tag: 'visa-process',
        url: `${onlinesitename}visa_processed/`,
    },
    {
        title: 'Reset Password Link',
        tag: 'reset-password',
        url: `${onlinesitename}reset/`,
    },
]

