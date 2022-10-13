import { E_REQUEST_METHOD } from '../ServicesHelpers'
import { serviceCreator } from 'src/services/helpers/serviceCreator'
import { API_ENDPOINT } from 'src/services/constants'

export const homeServices = {
  getAllPlant: () => serviceCreator(E_REQUEST_METHOD.GET, API_ENDPOINT.HOME.ALL_PLANT, false),
}
