import { ReactComponent as BotIcon } from '@/assets/bot_icon.svg'

export function EmptyScreen() {
  return (
    <div>
      <BotIcon width={64} height={64} />
      <div className="mt-8 text-xl font-semibold leading-7 text-slate-900">
        Hi, I am your AI-powered Assistant
      </div>
      <div className="mt-2 text-sm font-normal leading-tight text-slate-900">
        Currently, my functions are a bit limited, but I am a fast learner. How
        can I help you?
      </div>
    </div>
  )
}
