import { Head, Link } from "@inertiajs/react";
import { LockIcon, PaletteIcon, UserIcon } from "lucide-react";

const linkGroups = [
	{
		label: "Account",
		links: [
			{ label: "Profile", icon: (<UserIcon />), path: "/settings/profile", desc: "Edit your public profile page." },
			{ label: "Login & Security", icon: (<LockIcon />), path: "/settings/security", desc: "Change your login credentials." }
		]
	},
	{
		label: "Preferences",
		links: [
			// { label: "Notifications ", icon: (<BellIcon />), path: "/settings/notifications", desc: "Change your notification settings." },
			{ label: "Appearance ", icon: (<PaletteIcon />), path: "/settings/appearance", desc: "Customize the app's display theme." },
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
				<div className="text-xl font-medium">Settings & preferences</div>
				<div className="text-subtle">Customize app and account preferences.</div>
				<div className="mt-6"></div>
				<div className="flex flex-col gap-6">
					{linkGroups.map((group, index) => (
						<div key={index}>
							<div className="text-subtle mb-3">{group.label}</div>
							<div className="grid grid-cols-2 gap-4">
								{group.links.map((item, i) => (
									<Link href={item.path} key={i} className="w-full rounded-lg p-5 border border-outline hover:border-foreground transition">
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
