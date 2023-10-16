import { useTransition, animated } from '@react-spring/web'
import { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { useAppContext } from '@/lib/context'
import { useFeedback } from '@/lib/api'

export function Feedback() {
  const { feedbackMessage, setFeedbackMessage } = useAppContext()
  const open = Boolean(feedbackMessage)
  const [feedback, setFeedback] = useState('')
  const { mutate } = useFeedback({
    uuid: feedbackMessage?.id ?? '',
    feedback,
    feedback_type: feedbackMessage?.feedback_type ?? 'positive',
  })

  const hideFeedback = () => setFeedbackMessage?.(null)
  const dialogTransitions = useTransition(open, {
    from: { bottom: '-320px' },
    enter: { bottom: '0px' },
    leave: { bottom: '-320px' },
  })
  const maskTransitions = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return dialogTransitions((styles, open) => {
    if (!open) return null
    return (
      <>
        {maskTransitions((styles, open) => {
          if (!open) return null
          return (
            <animated.div
              className="absolute inset-0 rounded-t-lg bg-black/25"
              style={styles}
              onClick={hideFeedback}
            />
          )
        })}
        <animated.div
          className="absolute bottom-0 flex h-80 w-full flex-col items-center justify-start rounded-t-2xl border border-slate-100 bg-white px-4 shadow"
          style={styles}
        >
          <div className="py-2.5" onClick={hideFeedback}>
            <hr className="w-14 border-2 border-solid border-t-slate-200" />
          </div>
          <div className="mt-5 inline-flex flex-col items-start justify-start self-stretch">
            <h2 className="self-stretch text-lg font-semibold leading-7 text-slate-900">
              Share feedback with Shopboxo
            </h2>
            <div className="mt-2 self-stretch text-sm leading-tight text-slate-500">
              Your feedback helps us improve the bot.
            </div>
            <Textarea
              value={feedback}
              className="mt-8 resize-none rounded-md text-sm leading-tight"
              placeholder="What do you like about the response? (optional)"
              onChange={e => setFeedback(e.target.value)}
            />
            <Button className="mt-2 w-full" size="lg" onClick={mutate}>
              Submit feedback
            </Button>
          </div>
        </animated.div>
      </>
    )
  })
}
