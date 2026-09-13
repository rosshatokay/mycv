import { LogoIcon } from "@/assets/logo"
import { AdminHeaderProvider, useAdminHeader } from "@/components/contexts/AdminHeaderContext"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Link, usePage } from "@inertiajs/react"
import { ActivityIcon, HouseIcon, UsersIcon } from "lucide-react"
import { PropsWithChildren, useState } from "react"

interface NavLink {
	path: string
	label: string
	icon: (size: number) => React.ReactNode
}

const navLinks: NavLink[] = [
	{
		path: '/admins',
		label: "Home",
		icon: (size = 20) => <HouseIcon size={size} />
	},
	{
		path: '/admins/users',
		label: "Users",
		icon: (size = 20) => <UsersIcon size={size} />
	},
	{
		path: '/admins/activities',
		label: "Activities",
		icon: (size = 20) => <ActivityIcon size={size} />
	}
]

function AdminLayoutContent({ children }: PropsWithChildren) {
	const { url } = usePage()
	const { headerContent } = useAdminHeader()
	const [activeLink, setActiveLink] = useState<NavLink | null>(() => navLinks.filter(li => li.path === url.split('?')[0])[0])

	return (
		<div className="grid md:grid-cols-[64px_1fr] grid-cols-1 w-full h-screen overflow-hidden">
			<aside className="min-w-[64px] w-[64px] h-screen overflow-y-auto hidden md:flex flex-col gap-10 py-4 justify-between items-center">
				<div className="flex flex-col items-center h-full">
					<div className="mb-6">
						<LogoIcon size={24} />
					</div>
					<div className="flex flex-col h-full items-center">
						<div className="flex flex-col">
							{navLinks.map(l => {
								const isActive = url.split('?')[0] === l.path

								return (
									<Tooltip key={l.path} >
										<TooltipTrigger delay={0} render={
											<Button
												nativeButton={false}
												size={"icon-lg"}
												variant={isActive ? "secondary" : "ghost"}
												render={
													<Link href={l.path} />}>{l.icon(24)}</Button>
										}
										/>
										<TooltipContent side="right">{l.label}</TooltipContent>
									</Tooltip>
								)
							})}
						</div>
						<div className="mt-auto">
							{/* <TopProfileMenu user={auth.user} /> */}
							s
						</div>
					</div>
				</div>
			</aside>
			<main className="w-full h-full overflow-hidden p-2 pt-1 flex flex-col">
				<div className="w-full h-full bg-white/70 dark:bg-white/4 rounded-lg border flex flex-col">
					<div className="min-h-12 h-12 flex items-center px-4 justify-between">
						<div className="flex items-center text-sm gap-2">
							<div className="text-subtle">
								{activeLink?.icon(16)}
							</div>
							<span>{activeLink?.label}</span>
						</div>
						{headerContent}
					</div>
					<div className="overflow-y-auto py-8">
						{children}
					</div>
				</div>
			</main>
		</div>
	)
}

export default function AdminLayout({ children }: PropsWithChildren) {
	return (
		<AdminHeaderProvider>
			<AdminLayoutContent>{children}</AdminLayoutContent>
		</AdminHeaderProvider>
	)
}