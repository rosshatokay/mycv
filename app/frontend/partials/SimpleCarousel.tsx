import { Button } from "@/components/ui/button"
import { Carousel, CarouselApi, CarouselContent } from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PropsWithChildren, useEffect, useState } from "react"

interface SimpleCarouselProps {
	loop?: boolean
	slidesToScroll?: number
}

export default function SimpleCarousel({ children, slidesToScroll = 1, loop = false }: PropsWithChildren<SimpleCarouselProps>) {
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
		<Carousel setApi={setApi} opts={{
			loop: loop,
			align: 'end',
			slidesToScroll: slidesToScroll,
			axis: "x"
		}}>
			<CarouselContent>
				{children}
			</CarouselContent>
			<div className="flex items-center justify-between mt-4">
				<div className="flex gap-2">
					<Button size={"icon"} variant={"outline"} disabled={!canScrollPrev} onClick={() => api?.scrollPrev()}><ChevronLeft /></Button>
					<Button size={"icon"} variant={"outline"} disabled={!canScrollNext} onClick={() => api?.scrollNext()}><ChevronRight /></Button>
				</div>
				<span className="text-subtle text-sm">{current} of {count}</span>
			</div>
		</Carousel>
	)
}