import { ReadyState } from 'react-use-websocket'
import { ReactComponent as CloseIcon } from '@/assets/ic_close.svg'
import { useAppContext } from '@/lib/context'
import { isMobile } from '@/lib/utils'
import { MessageEventType } from '@/lib/types'

export function Header() {
  const { chatControl } = useAppContext()
  const ready = chatControl?.readyState === ReadyState.OPEN

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full shrink-0 items-center justify-center backdrop-blur-sm">
      <div className="flex items-center justify-end">
        {ready ? 'AI' : 'Connecting...'}
      </div>
      <MobileMenu />
    </header>
  )
}

export function MobileMenu() {
  const { onmessage } = useAppContext()
  if (!isMobile()) return null
  return (
    <div
      id="mobile-menu"
      className="absolute right-4 top-3 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2 py-0.5"
    >
      {/* <EllipsisHorizontalIcon /> */}
      {/* <span className="text-xs text-slate-200">|</span> */}
      <CloseIcon
        width={24}
        onClick={() => onmessage?.(new MessageEvent(MessageEventType.close))}
      />
    </div>
  )
}
