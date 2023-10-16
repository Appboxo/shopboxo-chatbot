import { ChatMessage } from '@/components/chat-message'
import { useAppContext } from '@/lib/context'
import { type IChatMessage } from '@/lib/types'

export type ChatListProps = {
  messages: IChatMessage[]
}

export function ChatList({ messages }: ChatListProps) {
  const { loading } = useAppContext()
  if (messages.length === 0) {
    return null
  }

  return (
    <div className="relative">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} />
        </div>
      ))}
      {loading && (
        <ChatMessage
          placeholder
          message={{
            role: 'assistant',
            content: '',
            id: Math.random().toString(),
            function_called: false,
          }}
        />
      )}
    </div>
  )
}
