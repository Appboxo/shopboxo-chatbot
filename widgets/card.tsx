import { type ReactNode, type PropsWithChildren, useMemo } from 'react'
import { type ICardWidget } from './common'
import { Button } from '@/components/ui/button'

export function CardWidget({ props }: ICardWidget) {
  const { buttons, descriptions, title } = props
  const footer = useMemo(() => {
    if (!buttons?.length) return null
    return (
      <>
        {buttons.map((btn, index) =>
          btn.href ? (
            <a key={index} href={btn.href} target="_blank" rel="noreferrer">
              <Button>{btn.content}</Button>
            </a>
          ) : (
            <Button key={index}>{btn.content}</Button>
          ),
        )}
      </>
    )
  }, [buttons])

  return (
    <Card footer={footer}>
      <h4 className="text-sm font-medium leading-tight text-black">{title}</h4>
      <Descriptions descriptions={descriptions} />
    </Card>
  )
}

export function Descriptions({
  descriptions,
}: {
  descriptions: Array<{ label: string; content: string }>
}) {
  return (
    <main className="flex w-full flex-col items-start justify-start gap-2">
      {descriptions.map((desc, index) => (
        <div key={index} className="flex w-full justify-between gap-3">
          <div className="text-sm font-normal leading-tight text-slate-500">
            {desc.label}
          </div>
          <div className="text-right text-sm font-normal leading-tight text-slate-900">
            {desc.content}
          </div>
        </div>
      ))}
    </main>
  )
}

export function Card({
  children,
  footer,
}: PropsWithChildren<{ footer?: ReactNode }>) {
  return (
    <div className="shadow-card mt-10 flex w-full flex-col items-start justify-start rounded-lg border border-slate-200 bg-white">
      <main className="flex w-full flex-col items-start justify-start gap-2 px-4 py-3">
        {children}
      </main>
      {footer && (
        <footer className="mt-3 flex w-full flex-row flex-wrap items-start justify-start gap-3 border-t border-solid border-gray-300 px-4 py-3">
          {footer}
        </footer>
      )}
    </div>
  )
}
