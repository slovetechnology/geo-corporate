const Auth_urls = {
    sign_up: "auth/signup",
    sign_in: "auth/sessions",
    forgot_password: "auth/password-reset/request",
    reset_password: "auth/password-reset",
    confirm_email_code: "auth/confirm-email",
    invite_user: "auth/invitations",
  };
  
  const home_urls = {
    banner: `banners`,
    pages: `pages`
  };
  
  const trip_urls = {
    add_trip: "trips",
  }
  
  const addon_urls = {
    get_addons: "addons"
  }
  
  const package_urls = {
    all_packages: "packages",
    get_package: "packages",
    book_package: "bookings/packages",
    package_request: "package-requests"
  };
  
  const payment_urls = {
    initialize_payment: "payments/initialize-payment",
    verify_payment: "payments/verify-payment",
  };
  
  const invoice_urls = {
    get_invoice_details: "invoices",
  };
  const visa_urls = {
    get_price: "settings/prices"
  }
  const Flight_urls = {
    search_flight: "flights/search",
    multi_search_flight: "flights/multi-city/search",
    book_flight: "flights/book-flight",
    get_price: "flights/confirm-price",
    manage_booking: "flights/bookings",
    flight_deals: "deals/flights"
  };
  
  const admin_urls = {
    bookings: "flights/bookings?expand=invoice",
  };
  
  const enquiry_urls = {
    make_enquiry: "enquiries"
  }
  
  const newsletters_urls = {
    add_newsletter: "newsletter/subscriptions"
  }
  
  const generaldeals_urls = {
    all_deals: "deals",
    book_deal: "deals/general/bookings"
  }
  const blog_urls = {
    get_blogs: "blog/posts",
    post_comment: "blog/posts/comments",
  }
  
  const ApiRoutes = {
    auth: Auth_urls,
    home: home_urls,
    flights: Flight_urls,
    package: package_urls,
    payment: payment_urls,
    enquiry: enquiry_urls,
    invoice: invoice_urls,
    admin: admin_urls,
    trips: trip_urls,
    addons: addon_urls,
    visa: visa_urls,
    newsletters: newsletters_urls,
    generaldeals: generaldeals_urls,
    blogs: blog_urls
  };
  
  export default ApiRoutes;
  