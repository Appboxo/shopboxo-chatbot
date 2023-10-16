import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { type UseChatHelpers } from '@/lib/types'

export type ChatPanelProps = {
  onSubmit: (value: string) => Promise<void>
} & Pick<UseChatHelpers, 'input' | 'setInput'>

export function ChatPanel({ onSubmit, input, setInput }: ChatPanelProps) {
  return (
    <div className="from-muted/10 to-muted/30 absolute inset-x-0 bottom-0 bg-white bg-gradient-to-b from-10% to-50%">
      <ButtonScrollToBottom />
      <PromptForm input={input} setInput={setInput} onSubmit={onSubmit} />
    </div>
  )
}
