import { AppState } from 'src/shared/store'
import { IHomeState } from './homeReducer'

const homeState = (state: AppState): IHomeState => state.home
