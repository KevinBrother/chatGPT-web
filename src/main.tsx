import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import { BrowserRouter } from 'react-router-dom'
import Global from './components/Global'
import OpenAiLogo from './components/OpenAiLogo'

import '@/styles/global.less'
import '@/styles/markdown.less'
import '@/styles/highlight.less'
import ChatPage from './pages/chat'

/* ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Global>
      <React.Suspense
        fallback={
          <div
            style={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <OpenAiLogo rotate width="3em" height="3em" />
          </div>
        }
      >
        <App />
      </React.Suspense>
    </Global>
  </BrowserRouter>
) */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Global>
    <React.Suspense
      fallback={
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <OpenAiLogo rotate width="3em" height="3em" />
        </div>
      }
    >
      {/* <App /> */}
      <ChatPage />
    </React.Suspense>
  </Global>
)
