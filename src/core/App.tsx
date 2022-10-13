import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Routing } from 'src/core/Routing'
import { Header } from 'src/ui/components/header/Header'

import store from 'src/shared/store'

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header title={'Cours Léa'} />
        <Routing />
      </BrowserRouter>
    </Provider>
  )
}
