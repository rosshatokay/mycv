import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet";
import { ProjectItemProps } from "./ProjectItem";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectSheetProps {
	project: ProjectItemProps['project'] | null,
	setActiveProject: (project: any) => void
}

export default function ProjectSheet({ project, setActiveProject }: ProjectSheetProps) {
	const [api, setApi] = useState<CarouselApi>()
	const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false)
	const [canScrollNext, setCanScrollNext] = useState<boolean>(false)
	const [current, setCurrent] = useState(0)
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (!api) return

		setCount(api.scrollSnapList().length)
		setCurrent(api.selectedScrollSnap() + 1)

		setCanScrollPrev(api.canScrollPrev())
		setCanScrollNext(api.canScrollNext())

		api.on("scroll", () => {
			setCanScrollPrev(api.canScrollPrev())
			setCanScrollNext(api.canScrollNext())
		})

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1)
		})
	}, [api])

	return (
		<Sheet open={project !== null} onOpenChange={() => setActiveProject(null)}>
			<SheetClose onClick={() => alert("clicked")}></SheetClose>
			<SheetContent side="bottom" className={"rounded-t-2xl"}>
				<div className="h-[92vh] overflow-y-auto overflow-x-hidden">
					<div className="main-container pt-16 pb-12">
						<Carousel setApi={setApi} opts={{
							loop: false,
							align: 'end'
						}}>
							<CarouselContent>
								{project?.images.map((image, index) => (
									<CarouselItem key={index}>
										<img src={image} className="w-full aspect-[6/4] rounded-lg object-cover" />
										{/* <div className="bg-white/10 w-full aspect-[6/4] rounded-lg"></div> */}
									</CarouselItem>
								))}
							</CarouselContent>
							<div className="flex items-center justify-between mt-4">
								<div className="flex gap-2">
									<Button size={"icon"} variant={"outline"} disabled={!canScrollPrev} onClick={() => api?.scrollPrev()}><ChevronLeft /></Button>
									<Button size={"icon"} variant={"outline"} disabled={!canScrollNext} onClick={() => api?.scrollNext()}><ChevronRight /></Button>
								</div>
								<span className="text-subtle">{current} of {count}</span>
							</div>
						</Carousel>
						<div className="mt-8">
							<div className="text-lg font-medium">{project?.title}</div>
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