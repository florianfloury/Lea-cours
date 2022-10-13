import { useState } from 'react'

import { Button } from 'src/ui/components/button/Button'

import { CasesDispatch, CasesState } from './index'

import './home.scss'

type HomeProps = {} & CasesState & CasesDispatch

export const Home = (props: HomeProps) => {
  const {} = props
  const [chiffre, setChiffre] = useState(0)

  const handleOnClick = () => {
    setChiffre(chiffre + 1)
  }

  return (
    <section className={'home-wrapper'}>
      <p>{chiffre}</p>
      <Button label={'un button pour incrémenter'} onClick={handleOnClick} />
    </section>
  )
}
