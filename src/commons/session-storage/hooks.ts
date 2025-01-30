import { useCallback, useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';

const serializer = <T>(value: T): string => JSON.stringify(value)
const deserializer =
  <T>(value: string, initialValue: T | (() => T)): T => {
    if (value === 'undefined') {
      return undefined as unknown as T
    }

    const defaultValue =
      initialValue instanceof Function ? initialValue() : initialValue

    let parsed: unknown
    try {
      parsed = JSON.parse(value)
    } catch (error) {
      console.error('Error parsing JSON:', error)
      return defaultValue // Return initialValue if parsing fails
    }

    return parsed as T
  }

export const useSessionStorage = <T>(key: string, initialValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] => {
  const readValue = useCallback((): T => {
    const initialValueToUse =
      initialValue instanceof Function ? initialValue() : initialValue

    try {
      const raw = window.sessionStorage.getItem(key)
      return raw ? deserializer(raw, initialValue) : initialValueToUse
    } catch (error) {
      console.warn(`Error reading sessionStorage key “${key}”:`, error)
      return initialValueToUse
    }
  }, [initialValue, key])

  const [storedValue, setStoredValue] = useState(() => readValue())

  const setValue: Dispatch<SetStateAction<T>> = useCallback(value => {
    try {
      const newValue = value instanceof Function ? value(readValue()) : value

      window.sessionStorage.setItem(key, serializer(newValue))
      setStoredValue(newValue)
    } catch (error) {
      console.warn(`Error setting sessionStorage key “${key}”:`, error)
    }
  }, [readValue, key])

  useEffect(() => {
    setStoredValue(readValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return [storedValue, setValue]
}