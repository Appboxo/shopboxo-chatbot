import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7,
) // 7-character random string

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const response = await fetch(input, init)

  if (!response.ok) {
    const json = await response.json()
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number
      }
      error.status = response.status
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }

  return response.json() as Promise<JSON>
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function isMobile() {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent,
  )
}

export const copyToClipboard = async (value: string) => {
  if (typeof window === 'undefined' || !navigator.clipboard?.writeText) {
    return
  }

  if (!value) {
    return
  }

  await navigator.clipboard.writeText(value)
}

export function showSuccessToast(message: string) {
  return toast.success(message, {
    position: 'bottom-center',
    autoClose: 3000,
  })
}

// https://stackoverflow.com/questions/70698969/javascript-alternative-for-requestsubmit-since-safari-does-not-support-it
export function requestSubmit(formRef: React.RefObject<HTMLFormElement>) {
  if (formRef.current?.requestSubmit) {
    formRef.current?.requestSubmit()
  } else {
    formRef.current?.dispatchEvent(new SubmitEvent('submit'))
  }
}
