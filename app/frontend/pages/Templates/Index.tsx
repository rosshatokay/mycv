import { LogoIconFull } from "@/assets/logoFull";
import { Button } from "@/components/ui/button";
import { Breadcrumb, createBreadcrumbs } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import StaticHeader from "../Static/StaticHeader";

export default function TemplatesPage() {
	const breadcrumbs: Breadcrumb[] = [
		{ label: "Templates", path: "/" },
	]

	return (
		<div className="p-2 pt-0">
			<StaticHeader />
			{/* <div className="h-14 flex items-center justify-between">
				<div className="flex items-center gap-6">
					<Button variant={"ghost"} nativeButton={false} render={<Link href={"/"} />}>
						<LogoIconFull size={14} />
					</Button>
					{createBreadcrumbs(breadcrumbs)}
				</div>
			</div> */}
			<div className="tex-center py-16 flex-center">
				<h1 className="sm:text-4xl text-[24px] sm:max-w-[500px] max-w-[400px] leading-[1.15] text-center">Explore clean and minimalist resume templates</h1>
			</div>
		</div>
	)
}