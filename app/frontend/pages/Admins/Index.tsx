import QuerySelect from "@/components/partials/QuerySelect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPercentChange, simpleTimeFormat } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { UserChart } from "./partials/UsersChart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type PeriodStat = {
	current: number
	previous: number
}

type Activity = {
	name: string
	avatar_url: string | ""
	created_at: Date
	action: "signed_up" | "updated_resume"
}

interface Props {
	stats: {
		users: PeriodStat
		active_resumes: PeriodStat
	}
	activities: Activity[]
	chart_data: any
	current_filters: Record<string, string>
}

const formatAction = (action: Activity['action']) => {
	switch (action) {
		case "signed_up": return "created an account"
		case "updated_resume": return "updated their resume"
	}
}

export default function AdminsStatsIndexPage({ current_filters, stats, chart_data, activities }: Props) {
	const periods = [
		{ label: "Today", value: "today" },
		{ label: "Last 7 days", value: "last_7_days" },
		{ label: "This month", value: "this_month" },
	]

	const usersPercentDiff = getPercentChange(stats.users.previous, stats.users.current)
	const activeResPercentDiff = getPercentChange(stats.active_resumes.previous, stats.active_resumes.current)

	return (
		<Fragment>
			<div className="main-container flex flex-col gap-6">
				<div className="flex items-center justify-between">
					<QuerySelect endpoint="/admins" defaultValue={current_filters.period} items={periods} paramKey="period" />
					<Button size={"icon"} variant={"ghost"}><DownloadIcon /></Button>
				</div>
				<div className="flex gap-8">
					<div>
						<div className="text-sm text-subtle flex items-center gap-1">Users <i className="block w-2 aspect-square rounded-full bg-[#6c9aff]"></i></div>
						<div className="font-medium">{stats.users.current}</div>
						<Badge variant={usersPercentDiff < 0 ? "destructive" : "secondary"} className="rounded-sm px-2 text-subtle">{usersPercentDiff}%</Badge>
					</div>
					<div>
						<div className="text-sm text-subtle">Active</div>
						<div className="font-medium">{stats.active_resumes.current}</div>
						<Badge variant={activeResPercentDiff < 0 ? "destructive" : "secondary"} className="rounded-sm px-2 text-subtle">{activeResPercentDiff}%</Badge>
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
				<UserChart chartData={chart_data} />
				<div className="mt-6">
					<h1 className="mb-4 font-medium">Recent activity</h1>
					<div className="flex flex-col gap-4">
						{activities.map((item, index) => (
							<div key={index} className="flex items-center gap-3">
								<Avatar>
									<AvatarImage src={item.avatar_url} />
									<AvatarFallback>{item.name[0]}</AvatarFallback>
								</Avatar>
								<div className="flex justify-between items-center w-full">
									<p className="text-[15px]">
										<span>{item.name} </span>
										<span className="text-subtle">{formatAction(item.action)}</span>
									</p>
									<p className="text-sm text-subtle">{simpleTimeFormat(item.created_at.toString(), { timeAgoForToday: true })}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Fragment>
	)
}