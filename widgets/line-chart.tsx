import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { type ILineChartWidget } from './common'
import { Card, Descriptions } from './card'

const yDataKeys = Array.from({ length: 5 })
  .fill(true)
  .map((_, index) => {
    return `y${index + 1}`
  })

export function LineChartWidget({
  props: { data, descriptions, YAxis: YAxisProps },
}: ILineChartWidget) {
  return (
    <Card>
      <div className="mb-2" style={{ width: '100%', height: 160 }}>
        <ResponsiveContainer>
          <LineChart className="w-full" data={data} margin={{ left: -10 }}>
            <CartesianGrid strokeDasharray={1} />
            <XAxis
              dataKey="x"
              type="category"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tickFormatter={formatNumber}
              {...YAxisProps}
            />
            <Tooltip />
            {yDataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                strokeWidth={2}
                dataKey={key}
                stroke={getLineColor(index)}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Descriptions descriptions={descriptions} />
    </Card>
  )
}

function formatNumber(num: any): any {
  if (typeof num !== 'number') return num
  const format = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  })
  return format.format(num)
}

const lineColors = ['#8FA9FE', '#2256FF', '#143C7D', '#FFA000']

function getLineColor(index: number) {
  return lineColors[index] ?? randomHsl()
}

function randomHsl() {
  return 'hsla(' + Math.random() * 360 + ', 100%, 50%, 1)'
}
