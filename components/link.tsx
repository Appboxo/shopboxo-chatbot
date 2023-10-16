import { type AnchorHTMLAttributes } from 'react'

export function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  // eslint-disable-next-line react/jsx-no-target-blank
  return <a {...props}>{props.children}</a>
}
