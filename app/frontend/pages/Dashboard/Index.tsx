import { Field } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AuthUser } from "@/interfaces/user"
import BaseLayout from "@/layouts/BaseLayout"
import { usePage } from "@inertiajs/react"

const items = [
	{ label: "Today", value: "today" },
	{ label: "Last 7 days", value: "weekly" },
]

export default function DashIndexPage() {
	const { auth }: AuthUser = usePage().props as any

	return (
		<div className="main-container">
			<Select items={items} defaultValue={"today"} onValueChange={(e) => console.log(e)}>
				<SelectTrigger className={"rounded-full px-4"}>
					<SelectValue />
				</SelectTrigger>
				<SelectContent alignItemWithTrigger={false} align="start">
					<SelectGroup>
						{items.map((item) => (
							<SelectItem key={item.value} value={item.value}>
								{item.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}

DashIndexPage.layout = (page: React.ReactNode) => <BaseLayout>{page}</BaseLayout>