/**
 * https://vitejs.dev/guide/features.html#disabling-css-injection-into-the-page
 * disable css injection into the page, so chatbot's css won't affect host site
 */
import { ToastContainer } from 'react-toastify'
import globalCss from '@/app/globals.css?inline'
import { Feedback } from '@/components/feedback'

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <main className="relative h-full w-full select-none overflow-hidden font-sans antialiased">
      <style>{globalCss}</style>
      {children}
      <Feedback />
      <ToastContainer />
    </main>
  )
}
