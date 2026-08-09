import { Head, Link } from "@inertiajs/react"
import { AuthUser } from "@/interfaces/user"
import { TemplateDataProps } from "@/components/templates/types"
import { useMemo } from "react"
import { getTemplate } from "@/components/templates"

interface TemplatePageProps extends TemplateDataProps {
	template: {
		template_id: string
		name: string
		preview_image_url: string,
	}
	auth: AuthUser['auth']
}

export default function ShowTemplate({
	template,
	auth,
	user,
	work_experiences,
	resume,
	projects,
	education,
	is_owner
}: TemplatePageProps) {
	const TemplateComponent = useMemo(() => getTemplate(template.template_id), [template.template_id])

	return (
		<>
			<Head>
				<title>{template.name}</title>
			</Head>
			<TemplateComponent data={{ auth, user, work_experiences, resume, projects, education, is_owner }} />
			{/* <div className="p-2 pt-0 h-screen flex flex-col">
				<div className="h-14 min-h-14 flex items-center justify-between">
					<div className="flex items-center gap-6">
						<Button variant={"ghost"} nativeButton={false} render={<Link href={"/"} />}>
							<LogoIconFull size={14} />
						</Button>
						{createBreadcrumbs(breadcrumbs)}
					</div>
					<div className="flex gap-1">
						<Button variant={"ghost"} size={"icon"}><MoreVerticalIcon /></Button>
						<Tooltip>
							<TooltipContent>Share</TooltipContent>
							<TooltipTrigger delay={0} render={<Button variant={"ghost"} size={"icon"}><ShareIcon /></Button>} />
						</Tooltip>
						<Button>Use for free</Button>
					</div>
				</div>
				<div className="bg-background ring ring-foreground/10 w-full h-full overflow-y-auto relative rounded-xl">
					<iframe src="/@rusty" className="w-full h-full"></iframe>
				</div>
			</div> */}
		</>
	)
}