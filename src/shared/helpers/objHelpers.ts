import { REGEX } from '../constants'

export const valueExist = (value): boolean => {
  return value !== undefined && value !== null
}

export const deepMergeObj = (obj1?: object, obj2?: object) => {
  if (!valueExist(obj1) && !valueExist(obj2)) {
    return null
  } else if (!valueExist(obj2)) {
    return obj1
  } else if (!valueExist(obj1)) {
    return obj2
  }
  const obj1IsObj = typeof obj1 === 'object'
  const obj2IsObj = typeof obj2 === 'object'
  const obj1IsArray = Array.isArray(obj1)
  const obj2IsArray = Array.isArray(obj2)

  if (obj1IsArray || obj2IsArray) {
    //parcourir et changer au bon endroit entre obj1 et obj2 si pas dispo dans l'un on prend l'autre
    return obj2
  }
  if (obj1IsObj && obj2IsObj) {
    const obj1Completed = Object.entries(obj1).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: valueExist(obj2[key]) ? deepMergeObj(obj1[key], obj2[key]) : value,
      }
    }, {})

    //Pas besoin de tout refaire on cherche juste a obtenir les champs manquant de obj1
    const obj2Completed = Object.entries(obj2).reduce((acc, [key, value]) => {
      return valueExist(obj1[key]) ? acc : { ...acc, [key]: value }
    }, {})

    return { ...obj1Completed, ...obj2Completed }
  } else {
    return obj2
  }
}

export const getPropsByKeyPath = (obj, keyPath) => {
  if (!keyPath || !obj) {
    console.log('Warning translation missing, key could be wrong')
    return null
  }

  const splitPath = keyPath.split('.')
  const isLast = splitPath.length === 1
  const currentKey = splitPath[0]
  const currentKeyIsArray = currentKey.match(/(\[[0-9]*])/)
  const nextKeyPath = keyPath.substring(keyPath.indexOf('.') + 1)

  if (currentKeyIsArray) {
    const key = currentKey.substring(0, currentKey.indexOf('['))
    const index = Number.parseInt(currentKey.substring(currentKey.indexOf('[') + 1, currentKey.indexOf(']')), 10)

    return obj[key] && obj[key][index] ? (isLast ? obj[key][index] : getPropsByKeyPath(obj[key][index], nextKeyPath)) : null
  } else {
    return obj[currentKey] ? (isLast ? obj[currentKey] : getPropsByKeyPath(obj[currentKey], nextKeyPath)) : null
  }
}

// Not tested yet
export const isKeyMap = (str: string) => {
  const trimString = str.trim()

  return trimString.indexOf('.') !== -1
}

export const keyMapWValueToObj = (keyMap, value) => {
  const indexOfSep = keyMap.indexOf('.')
  const firstKey = keyMap.substring(0, indexOfSep)
  const restKey = keyMap.substring(indexOfSep + 1)

  if (isKeyMap(keyMap)) {
    return {
      [firstKey]: keyMapWValueToObj(restKey, value),
    }
  } else {
    if (typeof value === 'object') {
      return {
        [keyMap]: convertMixKeyMapAndObjToObj(value),
      }
    } else {
      return {
        [keyMap]: value,
      }
    }
  }
}

export const convertMixKeyMapAndObjToObj = (obj?: object) => {
  if (!obj) {
    return null
  }

  return Object.entries(obj).reduce((acc, [keyMap, value]) => {
    const objParsed = keyMapWValueToObj(keyMap, value)

    return deepMergeObj(acc, objParsed)
  }, {})
}

export const parseStringToObj = (str: string) => {
  const splitStringByProperties = str
    .substring(1, str.length - 1)
    .trim()
    .split(',')

  const convertToObj = splitStringByProperties.reduce((acc, curr) => {
    const [key, value] = curr.split(':')
    if (value) {
      const valueTrim = value.trim()
      const stringValue = valueTrim.match(REGEX.STRING)
      const cleanValue = stringValue ? valueTrim.substring(1, valueTrim.length - 1) : valueTrim

      const canBeParseToNumber = Number.parseInt(cleanValue, 10)

      if (curr.length) {
        return {
          ...acc,
          [key]: canBeParseToNumber || cleanValue,
        }
      }
    }
    return acc
  }, {})

  if (typeof convertToObj === 'object') {
    return convertToObj
  } else {
    // thrown error ?
    return null
  }
}

export const flatArrays = (array: any[]) => {
  return array.reduce((acc, curr) => {
    if (Array.isArray(curr)) {
      return [...acc, ...flatArrays(curr)]
    } else {
      return [...acc, curr]
    }
  }, [])
}

export const replaceInArray = (array, index, newItem) => {
  return array.map((item, arrayIndex) => (arrayIndex === index ? newItem : item))
}

export const objToBase64 = (obj) => {
  return new Buffer(JSON.stringify(obj)).toString('base64')
}

export const base64ToObj = (base64: string) => {
  try {
    return JSON.parse(new Buffer(base64, 'base64').toString('utf-8'))
  } catch (e) {
    console.error('Error while formatting base64 to object, probably wrong struct')
  }
}

// Map an object and return an object type
export const iterateObj = <T>(obj: T, parsingValueFn: (value) => any): T => {
  if (!obj) {
    return {} as T
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    const newValue = parsingValueFn(value)

    if (valueExist(newValue)) {
      return { ...acc, [key]: newValue }
    } else {
      return acc
    }
  }, {}) as T
}
