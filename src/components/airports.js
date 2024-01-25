import Airports from "./airports.json";

function _filter_by_any(name = "") {
  const valid_name =
    typeof name === "string" && name.trim().length > 0 ? name.trim() : false;
  const airports = Airports;
  if (valid_name) {
    const filteredAirpots = airports.filter((airport) => {
      return (
        airport.city.toLowerCase().startsWith(valid_name.toLowerCase()) ||
        airport.icao.toLowerCase().startsWith(valid_name.toLowerCase()) ||
        airport.name.toUpperCase().startsWith(valid_name.toUpperCase()) ||
        airport.country.toUpperCase().startsWith(valid_name.toUpperCase()) ||
        airport.iata.toUpperCase().startsWith(valid_name.toUpperCase())
      );
    });
    return filteredAirpots;
  }
}

function _filter_by_country(name = "") {
  const valid_name =
    typeof name === "string" && name.trim().length > 0 ? name.trim() : false;
  const airports = Airports;
  if (valid_name) {
    const filteredAirpots = airports.filter((airport) => {
      return airport.country.toLowerCase().startsWith(valid_name.toLowerCase());
    });
    return filteredAirpots;
  }
}

function _filter_by_city(name = "") {
  const valid_name =
    typeof name === "string" && name.trim().length > 0 ? name.trim() : false;
  const airports = Airports;
  if (valid_name) {
    const filteredAirpots = airports.filter((airport) => {
      return airport.city.toLowerCase().startsWith(valid_name.toLowerCase());
    });
    return filteredAirpots;
  }
}

function _filter_by_name(name = "") {
  const valid_name =
    typeof name === "string" && name.trim().length > 0 ? name.trim() : false;
  const airports = Airports;
  if (valid_name) {
    const filteredAirpots = airports.filter((airport) => {
      const _airport = airport.name.toLowerCase();
      return _airport.startsWith(valid_name.toLowerCase());
    });
    return filteredAirpots;
  }
}

function _filter_by_code(name = "") {
  const valid_name =
    typeof name === "string" && name.trim().length > 0 ? name.trim() : false;
  const airports = Airports;
  if (valid_name) {
    const filteredAirpots = airports.filter((airport) => {
      const _airport_code = airport.iata.toLowerCase();
      return _airport_code.startsWith(valid_name.toLowerCase());
    });
    return filteredAirpots;
  }
}

export const FilterByAny = _filter_by_any;

export const FilterByCountry = _filter_by_country;

export const FilterByCity = _filter_by_city;

export const FilterByName = _filter_by_name;

export const FilterByCode = _filter_by_code;
