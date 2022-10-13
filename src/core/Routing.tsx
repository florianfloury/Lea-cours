import { Route, Routes } from 'react-router'

import { FourOhFour } from '../ui/views/404/404'

import { routes } from './routes'
import { ChildrenType } from 'src/shared/types'

const ProtectedRoute = (props: ChildrenType): JSX.Element => {
  const { children } = props
  const isAuth = true

  if (isAuth) {
    return children as JSX.Element
  }

  return <FourOhFour />
}

// use protected to add HOC
export const createRoute = () => {
  return Object.entries(routes).map(([key, route]) =>
    route.protected ? (
      <Route key={key} {...route} element={<ProtectedRoute>{route.element}</ProtectedRoute>} />
    ) : (
      <Route key={key} {...route} />
    ),
  )
}

export const Routing = () => {
  const routes = createRoute()

  return (
    <Routes>
      <Route path={'/'}>{routes}</Route>
      <Route path={'*'} element={<FourOhFour />} />
    </Routes>
  )
}
