import { useRef, type RefObject } from 'react'
import { requestSubmit } from '../utils'

export function useEnterSubmit(): {
  formRef: RefObject<HTMLFormElement>
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void
} {
  const formRef = useRef<HTMLFormElement>(null)

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      requestSubmit(formRef)
      event.preventDefault()
    }
  }

  return { formRef, onKeyDown: handleKeyDown }
}
