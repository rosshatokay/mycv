import { LogoIcon } from "@/assets/logo"
import { Input } from "@/components/ui/input"
import { Head, Link, useForm } from "@inertiajs/react"
import StaticHeader from "./StaticHeader"
import StaticFooter from "./StaticFooter"
import { ChevronRight, EyeIcon, PlusIcon, XIcon } from "lucide-react"
import SimpleCarousel from "@/partials/SimpleCarousel"
import { CarouselItem } from "@/components/ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"
import { useState } from "react"
import { faqs, mainFeatures, miscFeatures } from "./support/data"
import { Template } from "@/components/templates/types"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface PageProps {
	templates: Template[]
}


export default function LandingPage(props: PageProps) {
	const { setData, get } = useForm({
		email: ""
	})

	const [activePreviewTemplateId, setActivePreviewTemplateId] = useState<Template | null>(null)

	const handleSubmit = (e: React.ChangeEvent) => {
		e.preventDefault()
		get(`/signup`)
	}

	return (
		<>
			<Head>
				<title>Create a minimalist online resume</title>
				<meta name="description" content="Build an interactive online resume, showcase live projects, and share your work history with a modern digital profile." />
				<meta name="keywords" content="online resume, digital portfolio, career profile, project showcase, work experience" />
				<meta name="robots" content="index, follow" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="highlight.cv" />
				<meta property="og:description" content="Build an interactive online resume, showcase live projects, and share your work history with a modern digital profile." />
				<meta property="og:image" content="https://highlight.cv/app-banner.png" />
				<meta property="og:url" content="https://highlight.cv" />
				<link rel="canonical" href="https://highlight.cv" />
			</Head>
			<StaticHeader />
			<div className="py-16 pb-0">
				<div className="medium-container flex flex-col sm:gap-24 gap-16">
					<section className="flex flex-col gap-8">
						<div className="sm:w-10 w-9 aspect-square rounded-lg bg-white dark:hidden flex-center" style={{ boxShadow: "0px 8px 16px rgba(1,1,1,.05)" }}>
							<LogoIcon size={24} fill="var(--primary)" />
						</div>
						<div className="sm:w-10 w-9 aspect-square rounded-lg bg-white hidden dark:flex flex-center" style={{ boxShadow: "0px 8px 16px rgba(1,1,1,.05)" }}>
							<LogoIcon size={24} fill="var(--background)" />
						</div>
						<h1 className="sm:text-4xl text-[24px] sm:max-w-[500px] max-w-[400px] leading-[1.15] ">A new way to showcase your professional work profile — with a clean online resume.</h1>
						<div className="flex flex-col gap-4">
							<form onSubmit={handleSubmit} className="sm:max-w-xs w-full">
								<div className="relative text-[15px] w-full">
									<Input type="email" onChange={(e) => setData("email", e.target.value.trim())} placeholder="Email address" className="bg-black/5 dark:bg-white/5 w-full focus:!bg-transparent hover:bg-black/4 dark:hover:bg-white/10 border-none h-11 rounded-full px-5 !text-[15px]" />
									<button type="submit" className="absolute top-1/2 right-5 -translate-y-1/2 whitespace-nowrap">Sign up</button>
								</div>
							</form>
							<p className="text-xs text-subtle">It only takes a minute.</p>
						</div>
					</section>
					<section className="grid sm:grid-cols-3 gap-4">
						{mainFeatures.map((f, i) => (
							<div key={i} className="p-5 border rounded-xl flex flex-col gap-4">
								<div>{f.icon}</div>
								<p className="text-[15px]">{f.label}</p>
							</div>
						))}
					</section>
					<section>
						<h2 className="sm:text-2xl text-[21px] font-medium mb-6">Featured templates</h2>
						<SimpleCarousel slidesToScroll={1}>
							{props.templates?.map((template, index) => (
								<CarouselItem key={index} className="min-w-full flex-[initial]">
									<div className="p-4 gap-3 flex relative items-center flex-col dark:bg-card bg-white w-full sm:aspect-[6/5] aspect-square overflow-hidden rounded-lg">
										<div className="w-full flex items-start justify-end">
											{/* <div className="">{template.name}</div> */}
											<div className="flex gap-1">
												<Tooltip>
													<TooltipTrigger delay={0} render={
														<Button variant={"secondary"} size={"icon"} className={"rounded-full"} onClick={() => setActivePreviewTemplateId(template)}>
															<EyeIcon />
														</Button>
													} />
													<TooltipContent>Preview</TooltipContent>
												</Tooltip>
												<Tooltip>
													<TooltipTrigger delay={0} render={
														<Button variant={"secondary"} size={"icon"} nativeButton={false} className={"rounded-full"} render={<Link href={"/signup"} />}>
															<PlusIcon />
														</Button>
													} />
													<TooltipContent>Use for free</TooltipContent>
												</Tooltip>
											</div>
										</div>
										<div className="h-full overflow-hidden relative w-full">
											<img src={template.preview_image_url} alt="" className="mx-auto sm:w-3/4 aspect-[3.5/6] object-cover rounded-md border-10 rounded-t-2xl" style={{ objectPosition: "top" }} />
											<div className="bg-linear-to-t h-[200px] bottom-0 left-0 w-full from-white dark:from-[#242424] to-transparent absolute"></div>
										</div>
										<div className="w-full pb-1 px-1">
											<div className="relative z-2">
												<h3>
													<span>{template.name} </span>
													<span className="text-subtle">(Free)</span>
												</h3>
											</div>
										</div>
									</div>
								</CarouselItem>
							))}
						</SimpleCarousel>
					</section>
					<section>
						<h2 className="sm:text-2xl text-[21px] font-medium sm:mb-10 mb-8 sm:max-w-sm max-w-xs leading-[1.25]">Everything you need to showcase your professional journey</h2>
						<div className="grid sm:grid-cols-3 gap-x-8 sm:gap-y-12 gap-y-8">
							{miscFeatures.map((f, i) => (
								<div key={i} className="flex flex-col gap-2">
									<div className="mb-4 w-9 aspect-square bg-white dark:bg-card rounded-md flex-center" style={{ boxShadow: "0px 8px 16px rgba(1,1,1,.04)" }}>{f.icon}</div>
									<h3 className="font-medium">{f.title}</h3>
									<p className="text-subtle text-[15px]">{f.description}</p>
								</div>
							))}
						</div>
					</section>
					<section>
						<h2 className="sm:text-2xl text-[21px] font-medium mb-6 sm:max-w-sm max-w-xs leading-[1.25]">Infrequently asked <br /> questions</h2>
						<div className="space-y-4">
							<Accordion multiple={true}>
								{faqs.map((faq, index) => (
									<AccordionItem key={index}>
										<AccordionTrigger className={"text-base"}>{faq.question}</AccordionTrigger>
										<AccordionContent className={"text-[15px] text-foreground/75"}>{faq.answer}</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					</section>
				</div>
			</div>
			<StaticFooter />
			<Sheet open={activePreviewTemplateId !== null} onOpenChange={open => !open ? setActivePreviewTemplateId(null) : null}>
				<SheetContent showCloseButton={false} side="bottom" className={"max-h-[94vh] !h-full rounded-t-xl !gap-0"}>
					<SheetHeader className="flex-row items-center justify-between pb-2">
						<div className="flex items-center gap-1">
							<div className="text-subtle">Templates</div>
							<ChevronRight size={14} color="var(--subtle)" />
							<div>{activePreviewTemplateId?.name}</div>
						</div>
						<div className="flex gap-1">
							<Button nativeButton={false} render={<Link href={"/signup"} />}>Use for free</Button>
							<Button size={"icon"} variant={"ghost"} onClick={() => setActivePreviewTemplateId(null)}><XIcon /></Button>
						</div>
					</SheetHeader>
					<div className="h-full w-full p-2">
						{activePreviewTemplateId &&
							<iframe src={`/templates/${activePreviewTemplateId.id}`} className="w-full h-full rounded-lg"></iframe>
						}
					</div>
				</SheetContent>
			</Sheet>
		</>
	)
}