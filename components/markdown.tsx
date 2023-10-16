import { type FC, memo } from 'react'
import ReactMarkdown, { type Options } from 'react-markdown'

export const MemoizedReactMarkdown: FC<Options> = memo(
  ReactMarkdown,
  (previousProps, nextProps) =>
    previousProps.children === nextProps.children &&
    previousProps.className === nextProps.className,
)
