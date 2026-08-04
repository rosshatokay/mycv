import { LogoIcon } from "@/assets/logo"
import { Input } from "@/components/ui/input"
import { Head, useForm } from "@inertiajs/react"
import StaticHeader from "./StaticHeader"
import StaticFooter from "./StaticFooter"
import { BriefcaseIcon, ChartPieIcon, ChevronDown, FileTextIcon, FolderGit2Icon, GraduationCapIcon, Link2Icon, ShareIcon, ShieldCheckIcon, SpotlightIcon, UserIcon } from "lucide-react"
import SimpleCarousel from "@/partials/SimpleCarousel"
import { CarouselItem } from "@/components/ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface PageProps {
	images: string[]
}

const mainFeatures = [
	{
		icon: <FileTextIcon />,
		label: "Create a professional resume from a variety of clean templates."
	},
	{
		icon: <ChartPieIcon />,
		label: "Track key metrics about your profile - page views, bounce rates, and more."
	},
	{
		icon: <ShareIcon />,
		label: "Publish a custom digital resume that updates everywhere in seconds."
	},
]

const miscFeatures = [
	{
		icon: <UserIcon size={20} />,
		title: "Unified work profile",
		description: "Store your bio, location, role, and custom highlights in one centralized, modern profile.",
	},
	{
		icon: <BriefcaseIcon size={20} />,
		title: "Work experience timeline",
		description: "Document your career milestones, and dates with clean, chronological precision.",
	},
	{
		icon: <FolderGit2Icon size={20} />,
		title: "Project showcase",
		description: "Highlight your best builds with live URLs, execution years, and key technical takeaways.",
	},
	{
		icon: <GraduationCapIcon size={20} />,
		title: "Academic credentials",
		description: "Display your degrees, majors, and GPA in an easy-to-read academic breakdown.",
	},
	{
		icon: <Link2Icon size={20} />,
		title: "Custom social links",
		description: "Connect your personal website and LinkedIn so visitors can explore your work deeper.",
	},
	{
		icon: <ShieldCheckIcon size={20} />,
		title: "Secure & reliable",
		description: "Rest easy with encrypted sessions, instant page loads, and data synchronization.",
	},
]

const faqs = [
	{
		question: "How is this different from a standard PDF resume?",
		answer:
			"Unlike static PDFs that get outdated quickly, your profile is a dynamic, shareable website. You can update your projects, skills, or employment history in real time without needing to re-export or re-send files.",
	},
	{
		question: "Can I link my own custom projects and websites?",
		answer:
			"Yes! Every profile includes dedicated sections to showcase live builds with outbound links, year of completion, and key highlights so employers can see your real-world proof of work.",
	},
	{
		question: "Is my profile public to everyone?",
		answer:
			"Yes, your published profile generates a clean, shareable link that anyone can view. You can easily share it on LinkedIn, add it to job applications, or send it directly to recruiters.",
	},
	{
		question: "Can I customize what information is shown?",
		answer:
			"Absolutely. You have full control over your bio, job experience, education, social links, and custom highlights from your settings dashboard.",
	},
	{
		question: "How much does it cost to build a profile?",
		answer:
			"Getting started and creating your interactive online profile is completely free. You can set up your entire profile and start sharing your link in minutes.",
	},
]

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
							{props.images.map((image, index) => (
								<CarouselItem key={index} className="min-w-full flex-[initial]">
									<div className="p-6 pt-16 flex relative items-center flex-col dark:bg-card bg-white w-full sm:aspect-[6/5] aspect-square overflow-hidden rounded-lg">
										<img src={image} alt="" className="sm:w-3/4 aspect-[3.5/6] object-cover rounded-md border-10 rounded-t-2xl" style={{ objectPosition: "top" }} />
										<div className="bg-linear-to-t h-[200px] bottom-0 left-0 w-full from-white dark:from-[#242424] to-transparent absolute"></div>
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
		</>
	)
}