import { homeReducer } from './homeReducer'
import { homeActions } from './homeActions'
import { homeSagas } from './homeSagas'

export default {
  reducer: homeReducer,
  actions: homeActions,
  sagas: homeSagas,
}
