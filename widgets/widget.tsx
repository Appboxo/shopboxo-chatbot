import React, { createElement } from 'react'
import { MarkdownWidget } from './markdown'
import { LineChartWidget } from './line-chart'
import { CardWidget } from '@/widgets/card'
import { type IHTMLWidget, type AnyWidget } from '@/widgets/common'

const widgetMap = {
  'x-markdown': MarkdownWidget,
  'x-card': CardWidget,
  'x-line-chart': LineChartWidget,
}

export function Widget(data: AnyWidget) {
  const { type, props, children } = data
  const CustomWidget = widgetMap[
    type as keyof typeof widgetMap
  ] as React.ComponentType<IHTMLWidget>
  if (CustomWidget) {
    return (
      <CustomWidget type={type} props={props}>
        {children}
      </CustomWidget>
    )
  }

  return createElement(
    type,
    props,
    Array.isArray(children)
      ? children.map((item, key) => <Widget key={key} {...item} />)
      : children,
  )
}
