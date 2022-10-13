import { E_ICONS } from 'src/ui/components/Icons/constants'
import { ICONS } from 'src/ui/components/Icons/collection'
import { valueExist } from 'src/shared/helpers/objHelpers'

export type IconProps = {
  color?: string
  className?: string
  onClick?: (e) => void
  style?: { [key: string]: any }
}

type IconsProps = {
  icon: E_ICONS
} & IconProps

export const Icons = (props: IconsProps) => {
  const { icon, color, className, onClick } = props

  if (!valueExist(icon)) {
    return null
  }

  const Icon = ICONS[icon]

  return <Icon color={color} className={className} style={{ width: 'auto' }} onClick={onClick} />
}
