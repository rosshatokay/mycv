import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Project } from "@/interfaces/project";
import ProjectItem from "@/partials/ProjectItem";
import { Head, Link } from "@inertiajs/react";
import { FolderPlusIcon, PlusIcon } from "lucide-react";

interface PageProps {
	projects: Project[]
}

export default function ProjectsPage(props: PageProps) {
	return (
		<>
			<Head>
				<title>Projects | highlight.cv</title>
			</Head>
			<div className="main-container py-16">
				<div className="text-xl font-medium">Projects</div>
				<div className="text-subtle">Showcase your projects on your profile.</div>
				{props.projects && (
					<div className="mt-6">{props.projects?.map(project => <ProjectItem key={project.id} project={project} />)}</div>
				)}
				{!props.projects?.length && <Empty className="border mt-8">
					<EmptyHeader>
						<EmptyMedia variant={"icon"}>
							<FolderPlusIcon />
						</EmptyMedia>
						<EmptyTitle>No projects yet</EmptyTitle>
						<EmptyDescription>You haven't created any projects yet. Get started by adding your first project.</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button render={<Link href={"/projects/new"}></Link>}><PlusIcon data-icon="inline-start" /> Create project</Button>
					</EmptyContent>
				</Empty>}
			</div>
		</>
	)
}