import classNames from 'classnames'

import {Icons} from 'src/ui/components/Icons/Icons'

import {valueExist} from 'src/shared/helpers/objHelpers'

import {E_ICONS} from 'src/ui/components/Icons/constants'

import './button.scss'

export enum EButtonType {
  NEUTRAL = 'neutral',
  VALID = 'valid',
  ABORT = 'abort'
}

export interface IButton {
  type?: EButtonType
  label: string
  href?: string
  rel?: 'noreferrer noopener'
  target?: string
  classname?: string
  onClick?: () => void
  leftIcon?: E_ICONS
  disabled?: boolean
  isEdge?: boolean
  isLoading?: boolean
}

export const Button = (props: IButton) => {
  const { type = EButtonType.NEUTRAL, label, href, rel, target, classname, leftIcon, disabled, isEdge = false, isLoading, onClick } = props

  const buttonClass = classNames('button', {
    [type]: !!type,
    [classname]: !!classname,
    edge: isEdge,
    disabled: !!disabled,
    withLeftIcon: !!valueExist(leftIcon),
    'is-loading': isLoading,
  })

  const handleOnClick = (e) => {
    e.stopPropagation()

    if (onClick) {
      onClick()
    }
  }

  if (href) {
    return (
      <a href={href} rel={rel} target={target} className={buttonClass} onClick={handleOnClick}>
        {valueExist(leftIcon) && <Icons icon={leftIcon} />}
        <span>{label}</span>
      </a>
    )
  }

  return (
    <button className={buttonClass} onClick={handleOnClick}>
      {valueExist(leftIcon) && <Icons icon={leftIcon} />}
      <span>{label}</span>
      {isLoading && <div className={'button-loader'} />}
    </button>
  )
}
