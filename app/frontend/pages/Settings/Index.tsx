import BaseLayout from "@/layouts/BaseLayout";
import { Head, Link } from "@inertiajs/react";
import { BellIcon, LockIcon, PaletteIcon, UserIcon } from "lucide-react";

const linkGroups = [
	{
		label: "Account",
		links: [
			{ label: "Profile", icon: (<UserIcon />), path: "/settings/profile", desc: "Edit your public profile page." },
			{ label: "Login & Security", icon: (<LockIcon />), path: "/settings/profile", desc: "Change your login credentials." }
		]
	},
	{
		label: "Preferences",
		links: [
			{ label: "Notifications ", icon: (<BellIcon />), path: "/settings/notifications", desc: "Change your notification settings." },
			{ label: "Appearance ", icon: (<PaletteIcon />), path: "/settings/display", desc: "Customize the app's display theme." },
		]
	}
]

export default function SettingsIndexPage() {
	return (
		<>
			<Head>
				<title>Settings & preferences</title>
			</Head>
			<div className="main-container py-16">
				<div className="text-2xl font-medium">Settings & preferences</div>
				<div className="text-subtle">Customize app and account preferences.</div>
				<div className="mt-8"></div>
				<div className="flex flex-col gap-8">
					{linkGroups.map((group, index) => (
						<div key={index}>
							<div className="text-subtle mb-4">{group.label}</div>
							<div className="grid grid-cols-2 gap-4">
								{group.links.map(item => (
									<Link href={item.path} key={item.path} className="w-full rounded-lg p-5 border border-outline hover:border-foreground transition">
										<div className="mb-5">
											{item.icon}
										</div>
										<div className="mb-1">{item.label}</div>
										<div className="text-subtle text-sm">{item.desc}</div>
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}
