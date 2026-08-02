import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createBreadcrumbs } from "@/lib/utils";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function AppearanceSettingsPage() {
	const [currentTheme, setCurrentTheme] = useState<string | null>(window.Theme.getTheme())

	const setTheme = (theme: string) => {
		window.Theme.setTheme(theme)
		setCurrentTheme(window.Theme.getTheme())
	}

	useEffect(() => {
		setCurrentTheme(window.Theme.getTheme())
	})

	const items = [
		{ label: "Light", value: "light" },
		{ label: "Dark", value: "dark" },
		{ label: "System", value: "system" },
	]

	return (
		<>
			<Head>
				<title>Appearance</title>
			</Head>
			<div className="main-container py-16">
				{createBreadcrumbs([{ label: "Settings", path: "/settings" }, { label: "Appearance", path: "/settings/appearance" }])}
				<div className="font-medium text-xl mt-4">Appearance</div>
				<div className="text-subtle">Change app display theme.</div>
				<div className="mt-6">
					<Field>
						<FieldLabel>Theme</FieldLabel>
						<Select items={items} value={currentTheme} onValueChange={(v) => setTheme(v as string)}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{items.map(item => (
									<SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</Field>
				</div>
			</div>
		</>
	)
}