import type {
  JsonObject,
  JsonPrimitive,
  JsonValue,
} from 'react-use-websocket/dist/lib/types'

export type AnyWidget =
  | IHTMLWidget
  | ICardWidget
  | IMarkdownWidget
  | ILineChartWidget

export interface IHTMLWidget extends JsonObject {
  // Any html tag or Widget name
  type: string
  // Must be JSON object, Any html attribute or Widget attribute
  props?: Record<string, JsonPrimitive | JsonValue>
  // Nested children Widget or text content(only for text tag like paragraph)
  children?: IHTMLWidget[] | string
}

export interface ICardWidget extends IHTMLWidget {
  type: 'x-card'
  props: {
    title: string
    descriptions: Array<{ label: string; content: string }>
    buttons: Array<{ content: string; href: string }>
  }
}

export interface ILineChartWidget extends IHTMLWidget {
  type: 'x-line-chart'
  props: {
    data: Array<Record<string, string | number>>
    descriptions: Array<{ label: string; content: string }>
    YAxis: {
      unit: string
    }
  }
}

export interface IMarkdownWidget extends IHTMLWidget {
  type: 'x-markdown'
  // Markdown content string
  children: string
}
