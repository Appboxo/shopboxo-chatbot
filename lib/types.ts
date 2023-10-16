import { type JsonObject } from 'react-use-websocket/dist/lib/types'
import { type AnyWidget } from '@/widgets/common'

export interface IChatMessage extends JsonObject {
  id: string
  function_called: boolean
  content?: string
  widgets?: AnyWidget[]
  role: 'system' | 'user' | 'assistant'
}

export interface UseChatHelpers {
  /** The current value of the input */
  input: string
  /** SetState-powered method to update the input value */
  setInput: React.Dispatch<React.SetStateAction<string>>
}

export interface UserMessage extends JsonObject {
  type: 'chat_message'
  message: string
}

export enum MessageEventType {
  close = 'close',
  message = 'message',
}
