import { Project } from "@/interfaces/project";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { ArrowUpRight } from "lucide-react";

export interface ProjectItemProps {
	project: Project
	onSelect: (project: any) => void
}

export default function ProjectItem({ project, onSelect }: ProjectItemProps) {
	return (
		<div key={project.id}>
			<div className={cn(`relative grid grid-cols-[148px_1fr] overflow-hidden`, project.is_owner ? "rounded-lg hover:bg-card p-3 -m-3 transition" : "")}>
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
					<div className="mt-4 grid grid-cols-3">
						{project.images?.map((image, index) => (
							<div className="hover:bg-black/40 cursor-zoom-in dark:hover:bg-white/40 p-1 rounded-lg transition" onClick={() => onSelect(project)} key={index}>
								<img src={image} className="bg-card rounded-md w-full aspect-[6/4] object-cover" />
							</div>
						))}
					</div>
				</div>
			</div >
		</div>
	)
}