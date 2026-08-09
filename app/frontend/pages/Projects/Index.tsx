import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Project } from "@/interfaces/project";
import ProjectItem from "@/components/templates/items/classic/ProjectItem";
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
					// <div className="mt-6">{props.projects?.map(project => <ProjectItem key={project.id} project={project} />)}</div>
					<div className="mt-6 -m-2">
						{props.projects?.map(project =>
							<div key={project.id} className="flex items-center gap-4 hover:bg-card p-2 rounded-lg relative">
								<Link href={`/projects/${project.id}`} className="absolute inset-0 z-1" />
								{project.images.length && (
									<div className="w-12 aspect-square bg-card rounded-lg" style={{background: `url(${project.images[0]}) center / cover`}}></div>
								)}
								{!project.images.length && (
									<div className="w-12 aspect-square bg-card rounded-lg"></div>
								)}
								<div className="w-full">
									<div className="flex justify-between items-start">
										<div>{project.title}</div>
										<div className="text-subtle text-sm pr-2">{project.year}</div>
									</div>
									<div className="text-subtle text-[15px]">{project.description}</div>
								</div>
							</div>
						)}
					</div>
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