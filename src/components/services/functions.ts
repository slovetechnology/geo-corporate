import toast from "react-hot-toast"
import airports from "/src/components/utils/airports.json"

export const MainToken = "gcrp"
export const OrgID = 'ogid'
export const UserID = "orguid"

export const NairaSign = '₦'

export const WebDateFormat = 'ddd MMM Do YYYY'

type AirportProps = {
    iata: string,
    city: string,
    name: string,
}

export const FlightcardUsers = {
  affiliate: 'AFFILIATE',
  home: 'home'
}


const toastOptions = {
  duration: 5000,
  className: 'text-sm'
}

export const AlertError = (val: string) => {
  toast.error(val, toastOptions)
}

export const AlertWarning = (val: string) => {
  toast(val, toastOptions)
}

export const GoodAlert = (val: string) => {
  toast.success(val, toastOptions)
}

export const FirebaseImage = (data: string) => {
  return `${decodeURI(`${data}?alt=media`)}`
}

// format normal airport details
export const formatAirport = (value: string) => {
  const data: AirportProps | undefined = airports.find(port => port.iata === value)
  if(data) return `${data.city} ${data.name} (${data.iata})`
};

// format normal airport details
export const formatAirportSubtitle = (value: string) => {
  const data = airports.find(port => port.iata === value)
  return `${data?.iata} ${data?.city}`
};

// format normal airport headers
export const formatAirportTitle = (value: string) => {
  const data: AirportProps | undefined = airports.find(port => port.iata === value)
  if(data) return `${data.city}`
};

// format airport by name
export const formatAirportName = (value: string) => {
  const data = airports.find(port => port.iata === value)
  if(data) return `${data.name}`
};


export const timeFormat = (time: any) => {
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
export const timeFormatBare = (time: any) => {
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



export const detectEmptyFields = (obj: string[]) => {
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

