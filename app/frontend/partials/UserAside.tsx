import { LogoIcon } from "@/assets/logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AuthUser } from "@/interfaces/user"
import { cn } from "@/lib/utils"
import { Link, usePage } from "@inertiajs/react"
import { ChartNoAxesColumn, SettingsIcon, Rows3, SunMoonIcon, UserCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function UserAside({ auth }: AuthUser) {
	const { url } = usePage()
	const user = auth.user
	const getNormalizedTheme = () => {
		if (window.Theme.getTheme() === "system") {
			const isSysDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

			return isSysDarkMode ? "dark" : "light"
		}

		return window.Theme.getTheme()
	}
	const [currentTheme, setCurrentTheme] = useState<string | null>(getNormalizedTheme())

	const nextTheme = () => {
		window.Theme.setTheme(getNormalizedTheme() === "light" ? "dark" : "light")
		setCurrentTheme(window.Theme.getTheme())
	}

	useEffect(() => {
		setCurrentTheme(getNormalizedTheme())
	})

	const links = [
		{ label: "Profile", icon: (<UserCircle size={16} />), path: `/@${user.username}` },
		{ label: "Projects", icon: (<Rows3 size={16} />), path: `/projects` },
		{ label: "Analytics", icon: (<ChartNoAxesColumn size={16} />), path: '/analytics' },
		{ label: "Settings", icon: (<SettingsIcon size={16} />), path: '/settings' },
	]

	return (
		<aside className="fixed h-16 top-0 left-0 py-6 h-screen px-6 justify-between flex flex-col transition" id="main-aside">
			<div className="flex flex-col gap-12">
				<LogoIcon />
				<div className="flex flex-col gap-2">
					{links.map(item => {
						const isActive = url === item.path

						return (
							<Link href={item.path} key={item.path} className={cn("flex items-center gap-2 transition", isActive ? 'text-foreground' : 'text-subtle opacity-70 hover:opacity-100 hover:text-foreground')}>
								{item.icon}
								<span>{item.label}</span>
							</Link>
						)
					})}
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Avatar>
					<AvatarFallback>{user.full_name[0].toUpperCase()}</AvatarFallback>
				</Avatar>
				<Tooltip>
					<TooltipTrigger
						delay={0}
						render={
							<Button
								variant={"ghost"}
								size={"icon-lg"}
								onClick={nextTheme}
							>
								<SunMoonIcon />
							</Button>}>
					</TooltipTrigger>
					<TooltipContent>{currentTheme === "light" ? "Dark mode" : "Light mode"}</TooltipContent>
				</Tooltip>
			</div>
		</aside>
	)
}