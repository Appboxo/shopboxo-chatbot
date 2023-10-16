import remarkGfm from 'remark-gfm'
import { type IMarkdownWidget } from './common'
import { MemoizedReactMarkdown } from '@/components/markdown'

export function MarkdownWidget(props: IMarkdownWidget) {
  return (
    <MemoizedReactMarkdown
      className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
      remarkPlugins={[remarkGfm]}
      components={{
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>
        },
      }}
    >
      {props.children}
    </MemoizedReactMarkdown>
  )
}
