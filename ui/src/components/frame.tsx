import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface IframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  children: ReactNode
}

export default function Iframe({ children, ...props }: IframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (iframeRef.current?.contentDocument) {
      setMountNode(iframeRef.current.contentDocument.body)
    }
  }, [])

  return (
    <iframe ref={iframeRef} {...props}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}
