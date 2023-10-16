import type React from 'react'
import { createContext, useContext } from 'react'
import { type ChatControl } from './hooks/use-chat'
import { type IChatMessage } from './types'

export interface FeedbackMessage extends IChatMessage {
  feedback_type: 'positive' | 'negative'
}

const appContext = createContext<{
  avatar: string
  apiHost: string
  token?: string
  chatControl?: ChatControl
  onmessage?: (event: MessageEvent) => void
  loading: boolean
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  feedbackMessage?: FeedbackMessage | null
  setFeedbackMessage?: React.Dispatch<
    React.SetStateAction<FeedbackMessage | null>
  >
}>({
  avatar: '',
  loading: false,
  apiHost: 'api.shopboxo.io',
})

export const AppContextProvider = appContext.Provider

export const useAppContext = () => useContext(appContext)
