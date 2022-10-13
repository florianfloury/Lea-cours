import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import homeRedux from '../redux/home'

const sagaMiddleware = createSagaMiddleware()

const reducers = {
  home: homeRedux.reducer,
}

const sagas = [homeRedux.sagas]

export function makeStore() {
  return configureStore({
    reducer: reducers,
    middleware: [sagaMiddleware],
  })
}

const store = makeStore()

sagas.forEach((saga) => sagaMiddleware.run(saga))

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store
