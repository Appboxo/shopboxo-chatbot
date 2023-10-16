import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLatest } from 'react-use'
import { ChatList } from './chat-list'
import { Header } from './header'
import { cn } from '@/lib/utils'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useAppContext } from '@/lib/context'
import { type UserMessage, type IChatMessage } from '@/lib/types'

export type ChatProps = {
  messages: IChatMessage[]
}

const observeDelay = 50

export function Chat({ messages }: ChatProps) {
  const [input, setInput] = useState('')
  const { setLoading, chatControl } = useAppContext()
  const { ref, entry, inView } = useInView({
    delay: observeDelay,
    rootMargin: '0px 0px -150px 0px',
  })
  const latestInView = useLatest(inView)

  useEffect(() => {
    setTimeout(() => {
      if (!latestInView.current) {
        entry?.target.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        })
      }
      // use delay here, so we can get the right `latestInView` value
    }, observeDelay + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length])

  const sendToServer = async (msg: string): Promise<any> => {
    msg = msg.trim()

    const clientMsg: UserMessage = {
      type: 'chat_message',
      message: msg,
    }
    chatControl?.sendMessage(clientMsg)
    setLoading?.(true)
  }

  return (
    <div className="flex h-full flex-col overflow-auto">
      <Header />
      <main className="flex flex-1 flex-col px-3">
        <div className={cn('pb-[100px] pt-4')}>
          {messages.length > 1 ? (
            <>
              <ChatList messages={messages} />
              <div ref={ref} className="h-px w-px" />
            </>
          ) : (
            <EmptyScreen />
          )}
        </div>
        <ChatPanel input={input} setInput={setInput} onSubmit={sendToServer} />
      </main>
    </div>
  )
}
