import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet";
import { CarouselItem } from "@/components/ui/carousel";
import SimpleCarousel from "./SimpleCarousel";
import { ProjectItemProps } from "@/interfaces/projectItemProps";

interface ProjectSheetProps {
	project: ProjectItemProps['project'] | null,
	setActiveProject: (project: any) => void
}

export default function ProjectSheet({ project, setActiveProject }: ProjectSheetProps) {
	return (
		<Sheet open={project !== null} onOpenChange={() => setActiveProject(null)}>
			<SheetClose onClick={() => alert("clicked")}></SheetClose>
			<SheetContent side="bottom" className={"rounded-t-2xl"}>
				<div className="h-[92vh] overflow-y-auto overflow-x-hidden">
					<div className="main-container pt-16 pb-12">
						<SimpleCarousel slidesToScroll={1}>
							{project?.images.map((image, index) => (
								<CarouselItem key={index}>
									<img src={image} className="w-full aspect-[6/4] rounded-lg object-cover" />
									{/* <div className="bg-white/10 w-full aspect-[6/4] rounded-lg"></div> */}
								</CarouselItem>
							))}
						</SimpleCarousel>
						<div className="mt-8">
							<div className="text-subtle text-sm">{project?.year}</div>
							<div className="text-lg">{project?.title}</div>
							<div className="text-subtle text-base">{project?.description}</div>
							<ul className="list-disc px-[1rem] mt-4 text-base">
								{project?.highlights.map((item, index) => (
									<li key={index} className="mb-2">{item}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}