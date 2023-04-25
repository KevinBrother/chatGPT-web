import React, { useMemo } from 'react'
import { joinTrim } from '@/utils'
import styles from './index.module.less'
import OpenAiLogo from '../OpenAiLogo'
import { Space, Popconfirm } from 'antd'

import MarkdownIt from 'markdown-it'
import mdKatex from '@traptitech/markdown-it-katex'
import mila from 'markdown-it-link-attributes'
import hljs from 'highlight.js'
import { DeleteOutlined } from '@ant-design/icons'

function ChatMessage({
  position,
  content,
  status,
  time,
  onDelChatMessage
}: {
  position: 'left' | 'right'
  content?: string
  status: 'pass' | 'loading' | 'error' | string
  time: string
  onDelChatMessage?: () => void
}) {
  function highlightBlock(str: string, lang?: string) {
    return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">复制代码</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`
  }

  const mdi = new MarkdownIt({
    html: true,
    linkify: true,
    highlight(code, language) {
      const validLang = !!(language && hljs.getLanguage(language))
      if (validLang) {
        const lang = language ?? ''
        return highlightBlock(hljs.highlight(code, { language: lang }).value, lang)
      }
      return highlightBlock(hljs.highlightAuto(code).value, '')
    }
  })

  mdi.use(mila, { attrs: { target: '_blank', rel: 'noopener' } })
  mdi.use(mdKatex, { blockClass: 'katex-block', errorColor: ' #cc0000' })

  const text = useMemo(() => {
    const value = content || ''
    return mdi.render(value)
  }, [content])

  function chatAvatar({ icon, style }: { icon: string, style?: React.CSSProperties }) {
    return (
      <Space direction="vertical" style={{ textAlign: 'center', ...style }}>
        <img
          className={styles.chatMessage_avatar}
          src={icon}
          alt=""
        />
        {status === 'error' && (
          <Popconfirm
            title="删除此条消息"
            description="此条消息为发送失败消息，是否要删除?"
            onConfirm={() => {
              onDelChatMessage?.();
            }}
            onCancel={() => {
              // === 无操作 ===
            }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: 'red' }} />
          </Popconfirm>
        )}
      </Space>
    )
  }

  return (
    <div
      className={styles.chatMessage}
      style={{
        justifyContent: position === 'right' ? 'flex-end' : 'flex-start'
      }}
    >
      {position === 'left' && chatAvatar({ style: { marginRight: 8 }, icon: 'https://cdn.jsdelivr.net/gh/duogongneng/testuitc/svg-1681898659579.svg' })}
      <div className={styles.chatMessage_content}>
        <span
          className={styles.chatMessage_content_time}
          style={{
            textAlign: position === 'right' ? 'right' : 'left'
          }}
        >
          {time}
        </span>
        <div
          className={joinTrim([
            styles.chatMessage_content_text,
            position === 'right' ? styles.right : styles.left
          ])}
        >
          {status === 'loading' ? (
            <OpenAiLogo rotate />
          ) : (
            <div
              className={'markdown-body'}
              dangerouslySetInnerHTML={{
                __html: text
              }}
            />
          )}
        </div>
      </div>
      {position === 'right' && chatAvatar({ style: { marginLeft: 8 }, icon: 'https://cdn.jsdelivr.net/gh/duogongneng/testuitc/1682426702646avatarf3db669b024fad66-1930929abe2847093.png' })}
    </div>
  )
}

export default ChatMessage
