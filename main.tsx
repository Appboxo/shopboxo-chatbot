import React from 'react'
import { createRoot } from 'react-dom/client'
import { ChatBot } from './app/app'

createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <ChatBot
      api-host="api-staging.shopboxo.io"
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzNDY3ODMyLCJpYXQiOjE2OTA4NzU4MzIsImp0aSI6IjZmZDY3ODY2YjQ1NzQyZTBhNzZjMzQ3MjlmYmQ0Yzc3IiwidXNlcl9pZCI6MTUzNTE1fQ.M-ZfJdHyA466pHpwRzq1QN_5qiGzop-BZIzZRT8wTa8"
      avatar="https://shopboxo-media.s3.amazonaws.com/media/shopify/icons/icon_Up6tsvm.png"
    />
  </React.StrictMode>,
)
