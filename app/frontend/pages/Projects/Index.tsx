import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Project } from "@/interfaces/project";
import { Head, Link } from "@inertiajs/react";
import { Edit2Icon, FolderPlusIcon, ImageIcon, PlusIcon } from "lucide-react";

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
				<div className="flex justify-between items-end">
					<div>
						<div className="text-xl font-medium">Projects</div>
						<div className="text-subtle">Showcase your projects on your profile.</div>
					</div>
					<Button nativeButton={false} variant={"secondary"} size={"sm"} render={<Link href={"/work-experience/new"}></Link>}><PlusIcon data-icon="inline-start" /> Add</Button>
				</div>
				{props.projects && (
					<div className="mt-4 -m-2">
						{props.projects?.map(project =>
							<div key={project.id} className="flex items-center gap-4 group hover:bg-card p-2 rounded-lg relative transition">
								<Link href={`/projects/${project.id}`} className="absolute inset-0 z-1" />
								{project.images.length && (
									<div className="w-11 aspect-square bg-card rounded-lg" style={{background: `url(${project.images[0]}) center / cover`}}></div>
								)}
								{!project.images.length && (
									<div className="w-11 aspect-square bg-card rounded-lg flex-center"><ImageIcon size={20} color="var(--subtle)" className="opacity-70" /></div>
								)}
								<div className="w-full">
									<div className="flex justify-between items-start">
										<div className="flex items-center gap-1">
											<span>{project.title}</span>
											<Edit2Icon size={12} color="var(--subtle)" className="opacity-0 group-hover:opacity-100 transition" />
										</div>
										<div className="text-subtle text-sm pr-2">{project.year}</div>
									</div>
									<div className="text-subtle text-sm">{project.description}</div>
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