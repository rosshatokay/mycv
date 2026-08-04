import { getTemplate } from "@/components/templates";
import { TemplateDataProps } from "@/components/templates/types";
import { Head } from "@inertiajs/react";
import { useMemo } from "react";

interface ShowPageProps extends TemplateDataProps {
	template_id: string
}

export default function Show({
	template_id,
	user,
	resume,
	education,
	projects,
	auth,
	work_experiences,
	is_owner
}: ShowPageProps) {
	const TemplateComponent = useMemo(() => getTemplate(template_id), [template_id])
	// const TemplateComponent = getTemplate(template_id)

	return (
		<>
			<Head>
				<title>{user.full_name || user.username}</title>
				<meta name="description" content={`Take a look at ${user.full_name || user.username}'s professional work page.`} />
				<meta name="robots" content="index, follow" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="highlight.cv" />
				<meta property="og:description" content={`Take a look at ${user.full_name || user.username}'s professional work page.`} />
				<meta property="og:image" content="https://highlight.cv/app-banner.png" />
				<meta property="og:url" content={`https://highlight.cv/@${user.username}`} />
				<link rel="canonical" href={`https://highlight.cv/@${user.username}`} />
			</Head>
			<TemplateComponent
				data={{ auth, user, resume, education, projects, work_experiences, is_owner }}
			/>
		</>
	)
}