import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis } from "recharts"

interface ChartDataItem {
  label: string
  users: number
}

interface UserChartProps {
  chartData: ChartDataItem[]
}

const chartConfig = {
  users: {
    label: "New Users",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function UserChart({ chartData }: UserChartProps) {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 12, right: 12 }}
      >
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={true}
          tickMargin={8}
          minTickGap={32}
        />
        <ChartTooltip content={<ChartTooltipContent nameKey="users" />} />
        <Line
          dataKey="users"
          type="monotone"
          stroke="var(--color-users)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}