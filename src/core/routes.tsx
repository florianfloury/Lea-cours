import { RouteProps } from 'react-router'

import Home from '../ui/views/home'

import { URL_ROUTE } from '../shared/constants'

export type EnhancedRoute = RouteProps & { protected: boolean }

export const routes: { [key: string]: EnhancedRoute } = {
  home: { path: URL_ROUTE.HOME, element: <Home />, protected: false },
}
