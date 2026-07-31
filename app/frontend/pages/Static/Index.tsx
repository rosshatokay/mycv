import { LogoIcon } from "@/assets/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Head, useForm } from "@inertiajs/react"
import { ArrowRight } from "lucide-react"
import StaticHeader from "./StaticHeader"
import StaticFooter from "./StaticFooter"
import SimpleCarousel from "@/partials/SimpleCarousel"
import { CarouselItem } from "@/components/ui/carousel"

interface PageProps {
	images: string[]
}

export default function LandingPage(props: PageProps) {
	const { setData, get } = useForm({
		email: ""
	})
	const handleSubmit = (e: React.ChangeEvent) => {
		e.preventDefault()
		get(`/signup`)
	}


	return (
		<>
			<Head>
				<title>Create your minimalist professional profile</title>
				<meta name="description" content="Your page description" />
			</Head>
			<StaticHeader />
			<div className="py-20">
				<div className="large-container">
					<div className="flex flex-col text-center items-center gap-4">
						<div className="px-12 pt-6 flex-center mb-2">
							<LogoIcon size={48} fill="var(--foreground)" />
						</div>
						<h1 className="text-2xl max-w-[500px] tracking-tight">A new way to showcase your professional work profile — with a clean online resume.</h1>
						<form onSubmit={handleSubmit} className="max-w-xs w-full">
							<div className="relative text-[15px] w-full">
								<Input type="email" onChange={(e) => setData("email", e.target.value.trim())} placeholder="Email address" className="bg-black/5 dark:bg-white/5 w-full focus:!bg-transparent hover:bg-black/4 border-none h-11 rounded-full px-5 !text-[15px]" />
								<button type="submit" className="absolute top-1/2 right-5 -translate-y-1/2 whitespace-nowrap">Sign up</button>
							</div>
						</form>
						<p className="text-sm text-subtle">It takes only a minute.</p>
					</div>
					<div className="w-full mt-30">
						<h3 className="mb-4 text-subtle">Featured templates</h3>
						<SimpleCarousel slidesToScroll={3}>
							{props.images.map((image, index) => (
								<CarouselItem key={index} className="min-w-[calc(100%/3)] flex-[initial]">
									<div className="p-10 flex-center flex-col bg-card rounded-lg">
										<img src={image} alt="" className="aspect-[4/6] object-cover rounded-md" style={{ objectPosition: "top" }} />
										<div className="w-full text-sm pt-4">asd</div>
									</div>
								</CarouselItem>
							))}
						</SimpleCarousel>
						<div className="flex justify-center pt-12">
							<Button variant={"secondary"}>Explore all <ArrowRight /></Button>
						</div>
					</div>
				</div>
				<StaticFooter />
			</div>
		</>
	)
}