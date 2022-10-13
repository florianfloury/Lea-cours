import React from 'react'

import { useRouter } from 'src/shared/hooks/useRouting'
import { URL_PATH } from 'src/shared/constants'

import './header.scss'

type HeaderProps = {
  title: string
}

export const Header = (props: HeaderProps) => {
  const { title } = props
  const { replace } = useRouter()

  return (
    <header id={'header'}>
      <h1 className={'header-title'} onClick={() => replace(URL_PATH.HOME)}>
        {title}
      </h1>
    </header>
  )
}
