import axios, { AxiosRequestConfig } from 'axios'

import { BASE_HEADERS_SERVICES, BASE_URL_SERVICES } from './constants'

export enum E_REQUEST_METHOD {
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}
interface IAxiosError {
  status: number
  data: any
  message: string
}

interface IAxiosSuccess {
  status: number
  data: any
  headers: any
}

export interface IAxiosResponse<T> {
  headers?: any
  status: number
  error?: boolean
  errorMessage?: string
  payload?: T
}

const parseAxiosResponse = async (response: IAxiosSuccess) => {
  return {
    headers: response?.headers,
    status: response?.status,
    payload: response?.data,
  }
}

const parseAxiosError = async (err: IAxiosError) => {
  const error = await err

  const status = error?.status || 520 // unknown error code
  const errorMessage = `${status} : ${error?.message || 'Unknown error'}`

  return {
    status,
    error: true,
    errorMessage,
    payload: error?.data,
  }
}

/**
 * Stock url with abortController associated, we must create new ServiceHelpers object for each request,
 * Static don't get value updated after initialization
 * Two way to abort, we can use
 *  - ServiceHelper.instance.abortController or
 *  - Try to find url in ServiceHelpers.callOnProcess which is a singleton through app
 *  When using the second case, be careful because the request could already be removed from the singleton and lead to a null error
 */

export class ServiceHelpers {
  static callOnProcess = {}

  private instance
  url: string
  abortController: AbortController
  requestParams: AxiosRequestConfig

  constructor(method, url) {
    this.abortController = new AbortController()

    this.instance = axios.create({ signal: this.abortController.signal })
    this.instance.defaults.headers.common = {}
    this.url = url
    this.requestParams = {
      baseURL: BASE_URL_SERVICES,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        ...BASE_HEADERS_SERVICES,
      },
      method,
      url,
    }
  }

  private addCallToOnProcess = () => {
    ServiceHelpers.callOnProcess = { ...ServiceHelpers.callOnProcess, [this.url]: this.abortController }
  }
  private removeCallToOnProcess = () => {
    delete ServiceHelpers.callOnProcess[this.url]
    this.abortController = null
  }

  call<T>(requestParams): Promise<IAxiosResponse<T>> {
    const { params, data, headers } = requestParams
    this.addCallToOnProcess()

    this.requestParams = {
      ...this.requestParams,
      ...params,
      data,
      headers: { ...this.requestParams.headers, ...headers },
    }

    return this.instance(this.requestParams)
      .then((response) => Promise.resolve(parseAxiosResponse(response)))
      .catch((err) => Promise.resolve(parseAxiosError(err)))
      .finally(() => this.removeCallToOnProcess())
  }
}
