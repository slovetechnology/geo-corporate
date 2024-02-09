
import { toast } from 'react-hot-toast'
import airports from "./airports.json";

export const USERID = 'ssid'
export const USERNAME = 'ssn'
export const MainToken = 'geo-main'
export const toastId = "toastId";
export const updateId = "toastId";


export const EditorModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image'],

    // [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],

    [{ 'size': ['small', false, 'large', 'huge'] }],
    // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],

  ],
}

export function formatNumberWithCommas(number) {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const formatStringWithCommas = (inputString) => {
  // Remove any existing commas and non-digit characters
  const cleanedString = inputString.replace(/[^\d]/g, '');

  // Reverse the string to make grouping easier
  const reversedString = cleanedString.split('').reverse().join('');

  // Create groups of three digits each
  const groups = [];
  for (let i = 0; i < reversedString.length; i += 3) {
    groups.push(reversedString.slice(i, i + 3));
  }

  // Join the groups with commas and reverse again to get the desired format
  const formattedString = groups.join(',').split('').reverse().join('');

  return formattedString;
}

export const formatStringWithoutCommas = (inputString) => {
  // Remove any existing commas
  const cleanedString = inputString.toString().replace(/[^\d]/g, '');
  // const cleanedString = inputString.replace(/,/g, '');

  // Reverse the string to make grouping easier
  const reversedString = cleanedString.split('').reverse().join('');

  // Create groups of three digits each
  const groups = [];
  for (let i = 0; i < reversedString.length; i += 3) {
    groups.push(reversedString.slice(i, i + 3));
  }

  // Join the groups without commas and reverse again to get the desired format
  const formattedString = groups.join('').split('').reverse().join('');

  return formattedString;
};

export const Months = ["All", "January", 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const convertKoboToNairaString = number => {
  const newNumber = number / 100;
  return formatNumberWithCommas(newNumber);
};

export const convertKoboToNaira = number => {
  const newNumber = number / 100;
  return newNumber;
};

export const converNairaToKobo = number => {
  const newNumber = number * 100;
  return newNumber;
};

export const convertNairaToKoboString = number => {
  const newNumber = number * 100;
  return formatNumberWithCommas(newNumber);
};

export const getDateAndTime = date => {
  return `${new Date(date).toLocaleDateString()},  ${new Date(date).toLocaleTimeString()}`;
};

const toastOptions = {
  duration: 5000,
  className: 'text-sm'
}

export const ErrorMessage = `Sorry, something went wrong on our side, we are currently trying to fix the issue.`

export const AlertError = val => {
  toast.error(val, toastOptions)
}

export const AlertWarning = val => {
  toast(val, toastOptions)
}

export const GoodAlert = val => {
  toast.success(val, toastOptions)
}

export const FirebaseImage = (data) => {
  return `${decodeURI(`${data}?alt=media`)}`
}

export const getDiscount = (price, discount) => {
  return (discount / 100) * price;
};

export const getFlightDealActiveness = deal => {
  return (
    new Date(deal.startDate).getTime() < Date.now() &&
    deal?.active &&
    new Date(deal.endDate).getTime() > Date.now()
  );
};
// copy to clipboard

export const copyFunc = (copyref, message) => {
  // Select the text field
  copyref.current.select();
  copyref.current.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyref.current.value);

  // Alert the copied text
  GoodAlert(!message ? "copied" : message);
};

export const timeFormat = (time) => {
  if (parseInt(time)) {
    const hours = Math.floor(time / 60);
    const hourText =
      hours === 1 ? `${hours || 0}h` : hours > 1 ? `${hours || 0}h` : "";
    const minutes = hours >= 1 ? Math.round(time % 60) : time;
    const minuteText =
      minutes === 1
        ? `${minutes || 0}m`
        : minutes > 1
          ? `${minutes || 0}m`
          : "";
    return `${hourText}, ${minuteText}`;
  }
};
export const timeFormatBare = (time) => {
  if (parseInt(time)) {
    const hours = Math.floor(time / 60);
    const hourText =
      hours === 1 ? `${hours}` : hours > 1 ? `${hours}` : "";
    const minutes = hours >= 1 ? Math.round(time % 60) : time;
    const minuteText =
      minutes === 1
        ? `${minutes}`
        : minutes > 1
          ? `${minutes}`
          : "";
    return `${hourText || 0}h, ${minuteText || 0}m`;
  }
};

export const PackageEnum = (num) => {
  if (num === 1) return "Singles Trip"
  if (num === 2) return "Couples Trip"
  if (num > 2) return `Trip for ${num}`
}

export const WebDateFormat = 'ddd MMM Do YYYYF'

// format normal airport details
export const formatAirport = (value) => {
  const data = airports.find(port => port.iata === value)
  return `${data.city} ${data.name} (${data.iata})`
};

// format normal airport details
export const formatAirportSubtitle = (value) => {
  const data = airports.find(port => port.iata === value)
  return `${data?.iata} ${data?.city}`
};

// format normal airport headers
export const formatAirportTitle = (value) => {
  const data = airports.find(port => port.iata === value)
  return `${data.city}`
};

// format airport by name
export const formatAirportName = (value) => {
  const data = airports.find(port => port.iata === value)
  return `${data.name}`
};

export const ResponsiveSettings = [
  {
    breakpoint: 1000,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 800,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
];

export const FilterMultiCityRefundables = (flight) => {
  const arr = []
  flight?.routes?.map(item => {
    item.segments?.map(ele => {
      arr.push(ele.refundable)
    })
  })
  const trueCount = arr.filter(value => value).length;
  const falseCount = arr.length - trueCount;

  if (trueCount > falseCount) {
    return `refundable`;
  } else if (falseCount > trueCount) {
    return `non-refundable`;
  } else {
    return undefined; // Handle the case when true and false counts are equal
  }
}

export const calcTotalMultiSegmentStops = (flight) => {
  let arr = []
  flight?.routes?.map((ele => {
    arr.push(ele.totalSegmentStops)
  }))
  const getMax = Math.max(...arr)
  return getMax
}

export const calcTotalOutboundDuration = (flight) => {
  let arr = []
  flight.outbound.map((data) => {
    return arr.push(data.duration + (typeof data.layover === 'number' ? data.layover : 0))
  })
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "number") {
      sum += arr[i];
    }
  }
  return timeFormatBare(sum)
}
export const convertTo12HourFormat = (time24) => {
  // Extract hours and minutes from the 24-hour time format
  var [hours, minutes] = time24.split(':');

  // Determine AM or PM
  var meridiem = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;
  const inHours = hours < 10 ? `0${hours}` : hours

  // Ensure single-digit minutes are displayed with a leading zero
  // minutes = minutes.length <= 1 ? '0' + minutes : minutes;
  minutes = minutes < 10 ? `0${minutes}` : minutes

  // Return the formatted 12-hour time
  return inHours + ':' + minutes + ' ' + meridiem;
}

export const calcTotalInboundDuration = (flight) => {
  let arr = []
  flight.inbound.map((data) => {
    return arr.push(data.duration + (typeof data.layover === 'number' ? data.layover : 0))
  })
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "number") {
      sum += arr[i];
    }
  }
  return timeFormatBare(sum)
}

export const Trips = [
  {
    title: 'all',
    name: 'All'
  },
  {
    title: 'private',
    name: 'private trips'
  },
  {
    title: 'group',
    name: 'group trips'
  }
]

export const TurnStringToDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
export const getRandomElementsFromArray = (array, numElements) => {
  if (numElements >= array.length) {
    return array.slice(); // Return a copy of the whole array
  }

  const shuffledArray = array.slice(); // Create a copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }

  return shuffledArray.slice(0, numElements);
}

export const BackToTop = (top = 0) => {
  return document.querySelector('.mainbody').scrollTo({
    top: top,
    behavior: 'smooth'
  });
}

export const MainRoles = [
  "flights",
  "packages",
  "visa",
  "deals",
  "affiliates",
  "corporates",
  "blog",
  "marketting",
  "contact",
]


export const CountSubStringInString = (main_str, sub_str) => {
  main_str += '';
  sub_str += '';

  if (sub_str.length <= 0) {
    return main_str.length + 1;
  }

  const subStr = sub_str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return (main_str.match(new RegExp(subStr, 'gi')) || []).length;
}

export const NairaSign = '₦'

export const detectEmptyFields = (obj) => {
  const emptyFields = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'string' && value.trim() === '') {
        emptyFields.push(key);
      }
    }
  }
  return emptyFields;
}


export const CalculateDealAtDiscount = (price, discount, discountType) => {
  let sum;
  if(discountType === 'PERCENTAGE') {
    sum = parseInt(price * discount / 100)
  }
  return NairaSign+sum?.toLocaleString()
}
