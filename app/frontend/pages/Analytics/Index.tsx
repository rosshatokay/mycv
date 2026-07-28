import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Item, ItemDescription, ItemMedia } from "@/components/ui/item"
import { Select, SelectTrigger } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import BaseLayout from "@/layouts/BaseLayout"
import { DownloadIcon, InfoIcon } from "lucide-react"
import { Line, LineChart, XAxis } from "recharts"

const chartData = [
	{ month: "January", page_views: 0 },
	{ month: "February", page_views: 0 },
	{ month: "March", page_views: 0 },
	{ month: "April", page_views: 0 },
	{ month: "May", page_views: 0 },
	{ month: "June", page_views: 0 },
]

const chartConfig = {
	page_views: {
		label: "People",
		color: "#2563eb"
	}
} satisfies ChartConfig

export default function AnalyticsPage() {
	return (
		<>
			<div className="main-container py-16 flex flex-col gap-6">
				<Item variant={"muted"}>
					<ItemMedia variant={"icon"}><InfoIcon /></ItemMedia>
					<ItemDescription>This feature is not yet available. Check back again soon.</ItemDescription>
				</Item>
				<div>
					<div className="text-xl font-medium">Analytics</div>
					<div className="text-subtle">Key metrics about your profile page.</div>
				</div>
				<div className="flex gap-2">
					<Select>
						<SelectTrigger className={"rounded-full"}>Today</SelectTrigger>
					</Select>
					<Tooltip>
						<TooltipContent>Export as CSV</TooltipContent>
						<TooltipTrigger delay={0} render={<Button variant={"ghost"} size={"icon"}><DownloadIcon /></Button>} />
					</Tooltip>
				</div>
				<div className="flex gap-8">
					<div>
						<div className="text-sm text-subtle flex items-center gap-1">People <i className="block w-2 aspect-square rounded-full bg-[#2563eb]"></i></div>
						<div className="font-medium">N/A</div>
						<Badge variant={"secondary"} className="rounded-sm px-2 text-subtle">0%</Badge>
					</div>
					<div>
						<div className="text-sm text-subtle">Page views</div>
						<div className="font-medium">N/A</div>
						<Badge variant={"secondary"} className="rounded-sm px-2 text-subtle">0%</Badge>
					</div>
					<div>
						<div className="text-sm text-subtle">Bounced</div>
						<div className="font-medium">N/A</div>
						<Badge variant={"secondary"} className="rounded-sm px-2 text-subtle">0%</Badge>
					</div>
					<div>
						<div className="text-sm text-subtle">Avg. duration</div>
						<div className="font-medium">N/A</div>
						<Badge variant={"secondary"} className="rounded-sm px-2 text-subtle">0%</Badge>
					</div>
				</div>
				<div className="mt-4"></div>
				<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={true}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(e: string) => e.slice(0, 3)}
						/>
						<ChartTooltip content={<ChartTooltipContent nameKey="page_views" />} />
						<Line
							dataKey="page_views"
							type="monotone"
							stroke="var(--color-page_views)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</div>
		</>
	)
}
