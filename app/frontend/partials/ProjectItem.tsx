import { Project } from "@/interfaces/project";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { ArrowUpRight } from "lucide-react";

interface ProjectItem {
	project: Project
}

export default function ProjectItem({ project }: ProjectItem) {
	
	return (
		<div key={project.id} className={cn(`relative grid grid-cols-[148px_1fr] overflow-hidden`, project.is_owner ? "rounded-lg hover:bg-card p-3 -m-3 transition" : "")}>
			{project.is_owner && <Link className="absolute inset-0" href={`/projects/${project.id}`}></Link>}
			<div>
				<div className="text-subtle">{project.year}</div>
			</div>
			<div className="min-w-0">
				<div className="flex justify-between items-start">
					<div>
						{project.url ?
							(<a href={project.url} target="_blank" className="w-fit flex items-center group z-2 relative">
								<span className="group-hover:underline font-medium">{project.title}</span>
								<ArrowUpRight size={15} className="opacity-50 group-hover:opacity-100 transition" />
							</a>)
							:
							(<div>{project.title}</div>)
						}
						<div className="text-subtle">{project.description}</div>
					</div>
				</div>
				<ul className="my-3 pl-5 flex flex-col gap-2 list-disc marker:text-subtle">
					{project.highlights?.map(item => (<li key={item}>{item}</li>))}
				</ul>
				<div className="mt-4 flex gap-2">
					{project.images?.map((image, index) => (
						<img src={image} key={index} className="bg-card rounded-md min-w-40 aspect-video object-cover" />
					))}
				</div>
			</div>
		</div >
	)
}