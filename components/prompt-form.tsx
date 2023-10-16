import Textarea from 'react-textarea-autosize'
import { useMemo, useRef, type HtmlHTMLAttributes } from 'react'
import { ReadyState } from 'react-use-websocket'
import {
  Plus,
  TrendingUp,
  Edit2,
  Search,
  ChevronDown,
  ShoppingCart,
} from 'lucide-react'
import { useLocalStorage } from 'react-use'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { ReactComponent as ArrowUpIcon } from '@/assets/arrow-up.svg'
import { ReactComponent as LoaderIcon } from '@/assets/loader.svg'
import { useAppContext } from '@/lib/context'
import { type UseChatHelpers } from '@/lib/types'
import { requestSubmit } from '@/lib/utils'

interface ICommandItem {
  icon: React.ReactNode
  title: string
  group: 'product' | 'other'
}

const allCommands: ICommandItem[] = [
  {
    icon: <Plus className="mr-2 h-4 w-4" />,
    title: 'Create new product',
    group: 'product',
  },
  {
    icon: <Edit2 className="mr-2 h-4 w-4" />,
    title: 'Edit existing product',
    group: 'product',
  },
  {
    icon: <ShoppingCart className="mr-2 h-4 w-4" />,
    title: 'Check orders',
    group: 'other',
  },
  {
    icon: <TrendingUp className="mr-2 h-4 w-4" />,
    title: 'Check store analytics',
    group: 'other',
  },
]

export type PromptProps = {
  onSubmit: (value: string) => Promise<void>
} & Pick<UseChatHelpers, 'input' | 'setInput'>

export function PromptForm({ onSubmit, input, setInput }: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { loading, chatControl } = useAppContext()
  const canSend = chatControl?.readyState === ReadyState.OPEN && !loading
  const [open, setOpen] = useLocalStorage('sbx-quick-action-visible', true)
  const suggestions = allCommands.filter(item =>
    item.title.toLowerCase().includes(input.toLowerCase()),
  )
  const suggestionsVisible = open && suggestions.length > 0

  const showSuggestion = () => {
    setOpen(true)
  }

  const hideSuggestion = () => {
    setOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // preventDefault() before early return, to stop browser default submit behavior
    e.preventDefault()
    if (!canSend) {
      return
    }

    setInput('')
    /**
     * When user has clicked Search and there are no results. If user sends the input, it sends like normal input
     * When user has clicked Search and there is one result. If user sends the input, it will send the one result
     */
    await onSubmit(suggestions.length === 1 ? suggestions[0].title : input)
    inputRef.current?.focus()
    hideSuggestion()
  }

  const submitSuggestions = async (title: string) => {
    if (!canSend) {
      return
    }

    await onSubmit(title)
    inputRef.current?.focus()
    hideSuggestion()
  }

  return (
    <form
      ref={formRef}
      // `Textarea` height is too large, when we use `framer-motion` to animate whole chatbot
      //  give a fixed height to `Textarea` container, to fix it
      className="relative"
      onSubmit={handleSubmit}
    >
      {suggestionsVisible && (
        <SuggestionList commands={suggestions} onSubmit={submitSuggestions} />
      )}
      <div className="relative mx-3 my-2 flex items-center rounded-3xl border border-slate-200 py-2">
        <Textarea
          ref={inputRef}
          autoFocus
          tabIndex={0}
          rows={1}
          value={input}
          placeholder="Message"
          spellCheck={false}
          className="min-h-[24px] w-full resize-none bg-transparent pl-4 pr-12 focus-within:outline-none"
          onKeyDown={onKeyDown}
          onChange={e => {
            setInput(e.target.value)
          }}
        />
        <RightButton
          canSend={canSend}
          input={input}
          formRef={formRef}
          open={open}
          suggestions={suggestions}
          hideSuggestion={hideSuggestion}
          showSuggestion={showSuggestion}
        />
      </div>
    </form>
  )
}

function RightButton({
  canSend,
  input,
  formRef,
  suggestions,
  open,
  hideSuggestion,
  showSuggestion,
}: {
  canSend: boolean
  input: string
  formRef: React.RefObject<HTMLFormElement>
  suggestions: ICommandItem[]
  open?: boolean
  hideSuggestion: () => void
  showSuggestion: () => void
}) {
  const icon = useMemo(() => {
    if (!canSend) return <LoaderIcon className="m-1.5" width={16} />
    if (!input && !open) {
      return (
        <IconContainer onClick={showSuggestion}>
          <Search />
        </IconContainer>
      )
    }

    if (suggestions.length <= 1 || !open) {
      return (
        <ArrowUpIcon
          className="cursor-pointer"
          onClick={async () => requestSubmit(formRef)}
        />
      )
    }

    return (
      <IconContainer onClick={hideSuggestion}>
        <ChevronDown />
      </IconContainer>
    )
  }, [
    canSend,
    input,
    formRef,
    open,
    suggestions,
    hideSuggestion,
    showSuggestion,
  ])
  return <div className="absolute right-2 top-1">{icon}</div>
}

function IconContainer({
  children,
  ...rest
}: HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 p-1.5"
      {...rest}
    >
      {children}
    </div>
  )
}

function SuggestionList({
  commands,
  onSubmit,
}: {
  commands: ICommandItem[]
  onSubmit: (value: string) => Promise<void>
}) {
  const products = commands.filter(c => c.group === 'product')
  const others = commands.filter(c => c.group === 'other')
  const showDivider = products.length > 0 && others.length > 0
  return (
    <div className="flex max-h-56 flex-col gap-5 overflow-y-auto border border-slate-200 py-3">
      <p className="px-3 text-sm font-semibold">Explore</p>
      {products.map(command => (
        <CommandItem
          key={command.title}
          command={command}
          onSubmit={onSubmit}
        />
      ))}
      {showDivider && <div className="h-px w-full border border-slate-100" />}
      {others.map(command => (
        <CommandItem
          key={command.title}
          command={command}
          onSubmit={onSubmit}
        />
      ))}
    </div>
  )
}

function CommandItem({
  command,
  onSubmit,
}: {
  command: ICommandItem
  onSubmit: (value: string) => Promise<void>
}) {
  return (
    <div
      className="flex items-center px-3"
      onClick={async () => onSubmit(command.title)}
    >
      {command.icon}
      <span>{command.title}</span>
    </div>
  )
}
