

import axios from "axios";
import Cookies from 'js-cookie'
import { TokenName } from "../components/functions";

export let webUrl;
if (window.location.origin.includes('gowithgeo.com')) {
  webUrl = `https://prod.geotravel.travelcham.com`
} else {
  webUrl = `https://sandbox.geotravel.travelcham.com`
}

// const webUrl = ` https://sandbox.geotravel.travelcham.com`;

const _apiRequest = async (type, url, data = {}, options) => {
  // Set options
  if (!options) {
    options = { headers: null, showMsg: true };
  }

  // const  = !window.location.origin.includes('https://gowithgeo.com') ? `https://sandbox.geotravel.travelcham.com/${url}` :  ` https://prod.geotravel.travelcham.com/${url}`;

  let endpoint_url;
  if (window.location.origin.includes('gowithgeo.com')) {
    endpoint_url = `https://prod.geotravel.travelcham.com/${url}`
  } else {
    endpoint_url = `https://sandbox.geotravel.travelcham.com/${url}`
  }
  // const endpoint_url = ` https://sandbox.geotravel.travelcham.com/${url}`;
  let service;
  let config;

  //@TODO add token
  switch (type.toLowerCase()) {
    case "get":
      let queryString = objectToQueryString(data);
      // Append querystring to url
      let queryUrl = endpoint_url + queryString;
      // make request
      service = axios.get(queryUrl, config); // no need for data as the data is already in the queryString
      break;

    case "post":
      // Make request
      service = axios.post(endpoint_url, data, config);
      break;

    case "put":
      // Make request
      service = axios.put(endpoint_url, data, config);
      break;

    case "delete":
      service = axios.get(endpoint_url + objectToQueryString(data), config); // no need for data as the data is already in the queryString
      break;

    case "patch":
      service = axios.patch(endpoint_url, data, config);
      break;

    default:
      break;
  }

  // Running axios
  try {
    const response = await service;
    return response;
  } catch (error) {
    return error.response;
  }
};

// Convert data object to queryString
function objectToQueryString(obj = {}) {
  // if there is a valid data object
  if (Object.keys(obj).length > 0) {
    let str = [];
    Object.keys(obj).map(name => {
      return str.push(`${encodeURIComponent(name)}=${encodeURIComponent(obj[name])}`);
    });
    return str.join("&");
  } else {
    // return empty string
    return "";
  }
}

// Main Container
const HttpServices = {
  get(url, data = {}, options) {
    return _apiRequest("get", url, data, { ...options });
  },

  post(url, data = {}, options) {
    return _apiRequest("post", url, data, { ...options });
  },

  put(url, data = {}, options) {
    return _apiRequest("put", url, data, { ...options });
  },

  delete(url, data = {}, options) {
    return _apiRequest("delete", url, data, { ...options });
  },

  patch(url, data = {}, options) {
    return _apiRequest("post", url, data, { ...options });
  },
};

export const fetchUrl = async urlSubPath => {
  const webToken = Cookies.get(TokenName)

  const response = await fetch(`${webUrl}/${urlSubPath}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${webToken}`,
    },
  });
  if (!response.ok) {
    const data = await response.json();
    if (!data.success) {
      throw Error(data.message);
    }
    throw Error("Something went wrong");
  }
  const data = await response.json();
  if (!data.success) {
    throw Error(data.message);
  }

  return data.data;
}
export const postUrl = async (urlSubPath, bodyData, method) => {
  const webToken = Cookies.get(TokenName)

  const response = await fetch(`${webUrl}/${urlSubPath}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${webToken}`,
    },
    method: method || "POST",
    body: JSON.stringify(bodyData),
  });

  if (!response.ok) {
    const data = await response.json();
    if (!data.success) {
      throw Error(data.message);
    }
    throw Error("Something went wrong");
  }
  const data = await response.json();
  if (!data.success) {
    throw Error(data.message);
  }

  return data.data;
};
export const deleteUrl = async urlSubPath => {
  const webToken = Cookies.get(TokenName)

  const response = await fetch(`${webUrl}/${urlSubPath}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${webToken}`,
    },
    method: "DELETE",
  });

  if (!response.ok) {
    return await response.json();
  }
  const data = await response.json();
  if (!data.success) {
    return data;
  }

  return data;
};

export const postFormData = async (urlSubPath, bodyData, method) => {
  const webToken = Cookies.get(TokenName)

  const response = await fetch(`${webUrl}/${urlSubPath}`, {
    headers: {
      authorization: `Bearer ${webToken}`,
    },
    method: method || "POST",
    body: bodyData,
  });

  if (!response.ok) {
    const data = await response.json();
    if (!data.success) {
      throw Error(data.message);
    }
    throw Error("Something went wrong");
  }
  const data = await response.json();
  if (!data.success) {
    throw Error(data.message);
  }

  return data.data;
};

export default HttpServices
