import useWebSocket, { type ReadyState } from 'react-use-websocket'
import {
  type SendJsonMessage,
  type JsonObject,
} from 'react-use-websocket/dist/lib/types'
import { useMemo } from 'react'
import { type IChatMessage } from '../types'
import { type AnyWidget } from '@/widgets/common'

export function useChat({
  apiHost,
  token,
}: {
  apiHost: string
  token: string
}): ChatControl {
  const socketUrl = `wss://${apiHost}/ws/seller-chatbot/`
  const websocketControl = useWebSocket<APIMessage | null>(socketUrl, {
    queryParams: {
      token,
    },
  })
  const {
    lastJsonMessage,
    sendJsonMessage: sendMessage,
    readyState,
  } = websocketControl
  const lastMessage = useMemo<IChatMessage | null>(() => {
    if (!lastJsonMessage) return null
    const { response, role } = lastJsonMessage
    const shared = {
      role,
      id: response?.message_id ?? Math.random().toString(),
      function_called: response?.function_called ?? false,
    }
    if (Array.isArray(response?.html_json)) {
      return {
        widgets: response?.html_json,
        ...shared,
      }
    }

    return {
      content: response?.message ?? lastJsonMessage.message,
      ...shared,
    }
  }, [lastJsonMessage])
  return {
    lastMessage,
    sendMessage,
    readyState,
  }
}

export interface ChatControl {
  lastMessage: IChatMessage | null
  sendMessage: SendJsonMessage
  readyState: ReadyState
}

export interface APIMessage extends JsonObject {
  response?: {
    html_json: AnyWidget[]
    message: string
    message_id: string
    function_called: boolean
  }
  message?: string
  role: 'system' | 'user' | 'assistant'
}
