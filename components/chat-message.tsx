import { ClipboardIcon } from 'lucide-react'
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import {
  HandThumbDownIcon as HandThumbDownIconSolid,
  HandThumbUpIcon as HandThumbUpIconSolid,
} from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { cn, copyToClipboard, showSuccessToast } from '@/lib/utils'
import { IconUser } from '@/components/ui/icons'
import { ReactComponent as BotIcon } from '@/assets/bot_icon.svg'
import { useAppContext } from '@/lib/context'
import { type IChatMessage } from '@/lib/types'
import { Widget } from '@/widgets/widget'
import { MarkdownWidget } from '@/widgets/markdown'
import loadingGif from '@/assets/loading.gif'

export type ChatMessageProps = {
  message: IChatMessage
  placeholder?: boolean
}

export function ChatMessage({
  message,
  placeholder = false,
  ...props
}: ChatMessageProps) {
  const { avatar } = useAppContext()
  const [vote, setVote] = useState(0)
  const { setFeedbackMessage } = useAppContext()
  const { content, role, widgets = [], function_called } = message
  const showFeedback = role === 'assistant' && function_called

  const userIcon = avatar ? <img src={avatar} /> : <IconUser />
  const messageNode =
    widgets.length > 0 ? (
      <>
        {widgets.map((item, index) => {
          return <Widget key={index} {...item} />
        })}
      </>
    ) : (
      <MarkdownWidget type="x-markdown">{content ?? ''}</MarkdownWidget>
    )

  const copyMessage = async () => {
    const markdownString = widgets?.find(item => item.type === 'x-markdown')
      ?.children as string
    const text = markdownString ?? content ?? ''
    try {
      await copyToClipboard(text)
      showSuccessToast('Copied')
    } catch {
      toast.error('Failed to copy')
    }
  }

  const voteUp = () => {
    setVote(1)
    setFeedbackMessage?.({
      ...message,
      feedback_type: 'positive',
    })
  }

  const voteDown = () => {
    setVote(-1)
    setFeedbackMessage?.({
      ...message,
      feedback_type: 'negative',
    })
  }

  return (
    <div className={cn('relative mb-7 flex items-start')} {...props}>
      <div
        className={cn(
          'flex h-5 w-5 shrink-0 overflow-hidden rounded-full',
          role === 'user' ? 'bg-background' : 'text-primary-foreground',
        )}
      >
        {role === 'user' ? (
          userIcon
        ) : (
          // Resizing SVG in html https://stackoverflow.com/questions/3120739/resizing-svg-in-html
          <BotIcon />
        )}
      </div>
      <div className="chat-message ml-4 flex-1 overflow-hidden">
        {placeholder ? (
          <img className="-m-2 w-12" src={loadingGif} />
        ) : (
          messageNode
        )}
        {showFeedback && (
          <div className="mt-5 flex h-7 items-start justify-start  gap-4">
            <ClipboardIcon
              className="shrink-0"
              size={20}
              onClick={copyMessage}
            />
            <Divider />
            {vote === 0 && (
              <>
                <HandThumbUpIcon className="w-5 shrink-0" onClick={voteUp} />
                <Divider />
                <HandThumbDownIcon
                  className="w-5 shrink-0"
                  onClick={voteDown}
                />
              </>
            )}
            {vote === 1 && <HandThumbUpIconSolid className="w-5 shrink-0" />}
            {vote === -1 && <HandThumbDownIconSolid className="w-5 shrink-0" />}
          </div>
        )}
      </div>
    </div>
  )
}

function Divider() {
  return <div className="w h-5 origin-top-left border border-slate-200" />
}
