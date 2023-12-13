import axios, { AxiosInstance } from 'axios'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.BACKEND_URL,
      timeout: 10000
    })
  }
}

const http = new Http().instance

export default http
