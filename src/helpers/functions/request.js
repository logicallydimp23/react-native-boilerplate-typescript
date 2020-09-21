/* eslint-disable import/prefer-default-export */
import axios from "axios"

import Config from "react-native-config";

const request = axios.create({
  baseURL: Config.DEV === "yes" ? Config.DEV_API_URL : Config.API_URL,
  timeout: 15000,
  retry: 0,
})

request.interceptors.response.use(null, data => {
  if (data.response.config) {
    if (data.response.data) {
      if (data.response.status >= 200 && data.response.status < 500) {
        return Promise.resolve(data.response);
      }
    }
    if (data.response.retry < 2) {
      const config = {
        ...data.response.config,
        retry: data.response.retry + 1,
      }
      return request.request(config);
    }
  }
  return Promise.reject(data.response)
})

export default request;
