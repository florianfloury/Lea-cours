import styles from './textInput.module.scss'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import { Icons } from 'src/ui/components/Icons/Icons'
import { E_ICONS } from 'src/ui/components/Icons/constants'
import { COLORS } from 'src/shared/styles/colors'

type TextInputProps = {
  label?: string
  type?: 'password'
  value: string | number
  className?: string
  rightIcon?: E_ICONS
  disabled?: boolean
  multiple?: boolean
  withError?: boolean
  error?: boolean
  errorMessage?: string
  onChange: (newValue: string) => void
}

export const TextInput = (props: TextInputProps) => {
  const { label, type, value, className, rightIcon, disabled, multiple, withError, error, errorMessage, onChange } = props
  const inputRef = useRef<any>(null)
  const [inputFocus, setInputFocus] = useState<boolean>(false)

  const handleTextInputClick = (e) => {
    if (disabled) {
      return
    }
    inputRef.current.focus()
  }

  const handleChange = (e) => {
    const value = e.target.value

    onChange(value)
  }

  const textInputWrapperClass = classNames(styles.textInputWrapper, { [styles.textInputNoLabel]: !!!label }, className)
  const labelClass = classNames(styles.label, {
    [styles.labelOnTop]: inputFocus || !!value,
  })
  const inputClass = classNames(styles.textInput, {
    [styles.inputValueFocused]: inputFocus,
    [styles.inputValueDisabled]: !!disabled,
    [styles.inputValueError]: !!withError && !!error,
  })

  return (
    <div className={textInputWrapperClass} onClick={handleTextInputClick}>
      <div className={inputClass}>
        {multiple ? (
          <textarea
            ref={inputRef}
            value={value || ''}
            disabled={!!disabled}
            onChange={handleChange}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
          />
        ) : (
          <input
            ref={inputRef}
            type={type}
            value={value || ''}
            disabled={!!disabled}
            onChange={handleChange}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
          />
        )}
        <p className={labelClass}>{label}</p>
        {(rightIcon || !!disabled) && (
          <Icons
            className={styles.searchIcon}
            icon={rightIcon || E_ICONS.LOCK}
            color={!!disabled ? COLORS.GRAY['500'] : null}
          />
        )}
      </div>
      {withError && (
        <div className={styles.errorMessage} style={{ opacity: errorMessage ? 1 : 0 }}>
          {error && errorMessage && <Icons icon={E_ICONS.INFO} color={COLORS.RED['500']} />}
          {error && errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    </div>
  )
}
