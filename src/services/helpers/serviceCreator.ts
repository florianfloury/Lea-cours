import { RawAxiosRequestHeaders } from 'axios'

import { E_REQUEST_METHOD, ServiceHelpers } from 'src/services/ServicesHelpers'

export interface IServiceCreatorRequestParams {
  data?: { [key: string]: any }
  headers?: RawAxiosRequestHeaders
  params?: { [key: string]: any }
  parser?: Function
}

// Add abort controller to cancel request on demand and parse payload received if parser is provided
export const serviceCreator = <T>(
  method: E_REQUEST_METHOD,
  url: string,
  isAuth: boolean,
  requestParams?: IServiceCreatorRequestParams,
) => {
  const { parser, ...restRequestParams } = requestParams || {}
  const service = new ServiceHelpers(method, url)

  /*
    if (isAuth) {
      return {
        abort: () => (service.abortController ? service.abortController.abort() : null),
        callAPI: () => service.callAuth<T>(restRequestParams).then((res) => (parser && res.payload ? parser(res) : res)),
      }
    }
  */

  return {
    abort: () => (service.abortController ? service.abortController.abort() : null),
    callAPI: () => service.call<T>(restRequestParams).then((res) => (parser && res.payload ? parser(res) : res)),
  }
}
