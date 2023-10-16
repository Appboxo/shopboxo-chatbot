import { useEffect, useState } from 'react'
import r2wc from '@r2wc/react-to-web-component'
import RootLayout from './layout'
import { Chat } from '@/components/chat'
import { AppContextProvider, type FeedbackMessage } from '@/lib/context'
import { type IChatMessage, MessageEventType } from '@/lib/types'
import { useChat } from '@/lib/hooks/use-chat'

type AppProps = {
  token: string
  'api-host': string
  avatar: string
  container?: ShadowRoot
  onmessage?: (event: MessageEvent) => void
}

export function ChatBot({
  token,
  'api-host': apiHost,
  avatar = '',
  onmessage,
  container,
}: AppProps) {
  const [messages, setMessages] = useState<IChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [feedbackMessage, setFeedbackMessage] =
    useState<FeedbackMessage | null>(null)
  const chatControl = useChat({ apiHost, token })
  const { lastMessage } = chatControl
  const host = container?.host

  useEffect(() => {
    if (lastMessage) {
      setMessages(prev => prev.concat(lastMessage))
    }

    if (lastMessage?.role === 'assistant') {
      setLoading(false)
    }
  }, [lastMessage])

  useEffect(() => {
    onmessage?.(
      new MessageEvent(MessageEventType.message, { data: lastMessage }),
    )
  }, [lastMessage, onmessage])

  useEffect(() => {
    // @ts-expect-error sbxChatBotController property
    host!.sbxChatBotController = chatControl
  }, [host, chatControl])

  return (
    <AppContextProvider
      value={{
        apiHost,
        token,
        avatar,
        chatControl,
        loading,
        setLoading,
        onmessage,
        feedbackMessage,
        setFeedbackMessage,
      }}
    >
      <RootLayout>
        <Chat messages={messages} />
      </RootLayout>
    </AppContextProvider>
  )
}

const ChatBotElement = r2wc<AppProps>(ChatBot, {
  props: {
    token: 'string',
    'api-host': 'string',
    avatar: 'string',
    onmessage: 'function',
  },
  shadow: 'closed',
})

customElements.define('sbx-chat-bot', ChatBotElement)

// @import url('https://fonts.googleapis.com/css2?family=Inter'); in css, DO NOT WORK
// see https://stackoverflow.com/questions/14676613/how-to-import-google-web-font-in-css-file
function loadFont() {
  const url = 'https://fonts.googleapis.com/css2?family=Inter'
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = url
  document.head.append(link)
}

loadFont()
