import { useEffect, useRef } from 'react'

export const useMount = (func) => useEffect(func, [])

export const useUpdate = (func, dependencies) => {
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      func()
    } else {
      isMounted.current = true
    }
  }, dependencies)
}
