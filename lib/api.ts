import { toast } from 'react-toastify'
import { type FeedbackMessage, useAppContext } from './context'
import { showSuccessToast } from './utils'

async function request<T>(url: string, config: RequestInit) {
  try {
    const response = await fetch(url, config)
    const json: T = await response.json()
    if (response.ok) {
      return json
    }

    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw json
  } catch (error) {
    toast.error('Something went wrong!')
    throw error
  }
}

export function useMutation(url: string, config: RequestInit) {
  const { token, apiHost } = useAppContext()
  const mutate = async () => {
    return request(`https://${apiHost}${url}`, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...config.headers,
      },
    })
  }

  return {
    mutate,
  }
}

export function useFeedback({
  uuid,
  feedback,
  feedback_type,
}: {
  uuid: string
  feedback: string
  feedback_type: FeedbackMessage['feedback_type']
}) {
  const { setFeedbackMessage } = useAppContext()
  const { mutate: _mutate } = useMutation(
    `/api/v1/chatgpt/chat-messages/${uuid}/feedback/`,
    {
      method: 'POST',
      body: JSON.stringify({
        feedback,
        feedback_type,
      }),
    },
  )

  function mutate() {
    _mutate().then(() => {
      setFeedbackMessage?.(null)
      showSuccessToast('Feedback sent!')
    })
  }

  return {
    mutate,
  }
}
