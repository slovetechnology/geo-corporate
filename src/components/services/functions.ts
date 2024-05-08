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
