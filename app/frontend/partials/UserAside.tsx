import { LogoIcon } from "@/assets/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { AuthUser } from "@/interfaces/user"
import { cn } from "@/lib/utils"
import { Link, usePage } from "@inertiajs/react"
import { ChartNoAxesColumn, SettingsIcon, Rows3, UserCircle, LogOutIcon, BriefcaseBusinessIcon } from "lucide-react"

export default function UserAside({ auth }: AuthUser) {
	const { url } = usePage()
	const user = auth.user

	const links = [
		{ label: "Profile", icon: (<UserCircle size={16} />), path: `/@${user.username}` },
		{ label: "Work", icon: (<BriefcaseBusinessIcon size={16} />), path: `/work-experience` },
		{ label: "Projects", icon: (<Rows3 size={16} />), path: `/projects` },
		{ label: "Analytics", icon: (<ChartNoAxesColumn size={16} />), path: '/analytics' },
		{ label: "Settings", icon: (<SettingsIcon size={16} />), path: '/settings' },
	]

	return (
		<aside className="fixed h-16 top-0 left-0 py-6 h-screen px-6 z-2 justify-between flex flex-col transition" id="main-aside">
			<div className="flex flex-col gap-12">
				<LogoIcon fill="var(--primary)" />
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
				<DropdownMenu>
					<DropdownMenuTrigger className={"cursor-pointer"} nativeButton={false} render={
						<Avatar className={"ring-2 ring-transparent hover:ring-primary/20 transition"}>
							<AvatarImage src={user.avatar_url}></AvatarImage>
							<AvatarFallback>{user.full_name[0].toUpperCase()}</AvatarFallback>
						</Avatar>
					} />
					<DropdownMenuContent className={"w-48"}>
						<DropdownMenuGroup>
							<DropdownMenuItem nativeButton={false}>
								<Item size={"xs"} className="p-2 hover:!bg-transparent" render={<Link href={"/"}></Link>}>
									<ItemContent className="gap-0">
										<ItemTitle>{auth.user.full_name}</ItemTitle>
										<ItemDescription>{auth.user.email}</ItemDescription>
									</ItemContent>
								</Item>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator></DropdownMenuSeparator>
						<DropdownMenuItem nativeButton={false} render={<Link href={"/settings"} className="w-full" />}><SettingsIcon /> Settings</DropdownMenuItem>
						<DropdownMenuItem nativeButton={true} render={<Link href={"/logout"} method="delete" as={"button"} className="w-full" />}><LogOutIcon /> Sign out</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</aside>
	)
}