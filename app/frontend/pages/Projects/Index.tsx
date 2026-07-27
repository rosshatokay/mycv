import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Head } from "@inertiajs/react";
import { FolderPlusIcon, PlusIcon } from "lucide-react";

export default function ProjectsPage() {
	return (
		<>
			<Head>
				<title>Projects | highlight.cv</title>
			</Head>
			<div className="main-container py-16">
				<div className="text-2xl font-medium">Projects</div>
				<div className="text-subtle">Showcase your projects on your profile.</div>
				<Empty className="border mt-8">
					<EmptyHeader>
						<EmptyMedia variant={"icon"}>
							<FolderPlusIcon />
						</EmptyMedia>
						<EmptyTitle>No projects yet</EmptyTitle>
						<EmptyDescription>You haven't created any projects yet. Get started by adding your first project.</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button><PlusIcon data-icon="inline-start" /> Create project</Button>
					</EmptyContent>
				</Empty>
			</div>
		</>
	)
}