import { LogoIcon } from "@/assets/logo"
import { Input } from "@/components/ui/input"
import { Head, useForm } from "@inertiajs/react"
import StaticHeader from "./StaticHeader"
import StaticFooter from "./StaticFooter"
import { ChartPieIcon, DownloadIcon, EditIcon, EyeIcon, ShareIcon, SpotlightIcon } from "lucide-react"
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu"

// interface PageProps {
// 	images: string[]
// }

export default function LandingPage() {
	const { setData, get } = useForm({
		email: ""
	})
	const handleSubmit = (e: React.ChangeEvent) => {
		e.preventDefault()
		get(`/signup`)
	}
	const days = ['S', 'M', 'T', 'W', 'T', 'F']

	return (
		<>
			<Head>
				<title>Your professional minimalist work profile</title>
				<meta name="description" content="Your page description" />
			</Head>
			<StaticHeader />
			<div className="py-20">
				<div className="large-container">
					<div className="flex flex-col text-center items-center gap-4">
						<div className="px-12 pt-6 flex-center mb-2">
							<LogoIcon size={48} fill="var(--primary)" className="md:block hidden" />
							<LogoIcon size={36} fill="var(--primary)" className="md:hidden" />
						</div>
						<h1 className="sm:text-2xl text-[21px] max-w-[500px] leading-[1.35] tracking-tight">A new way to showcase your professional work profile — with a clean online resume.</h1>
						<form onSubmit={handleSubmit} className="max-w-xs w-full">
							<div className="relative text-[15px] w-full">
								<Input type="email" onChange={(e) => setData("email", e.target.value.trim())} placeholder="Email address" className="bg-black/5 dark:bg-white/5 w-full focus:!bg-transparent hover:bg-black/4 dark:hover:bg-white/10 border-none h-11 rounded-full px-5 !text-[15px]" />
								<button type="submit" className="absolute top-1/2 right-5 -translate-y-1/2 whitespace-nowrap">Sign up</button>
							</div>
						</form>
						<p className="text-sm text-subtle">It takes only a minute.</p>
					</div>
					<div className="mt-30">
						<div className="rounded-xl w-full flex md:p-[4%_12%] p-[4%_8%] !pb-0 overflow-hidden justify-center sm:h-165" style={{ background: `url(https://images.unsplash.com/photo-1596367407372-96cb88503db6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) center / cover` }}>
							<img src="/page.png" alt="" className="rounded-t-xl object-cover md:max-w-[800px] w-[700px]" />
						</div>
						{/* <div className="rounded-xl bg-card w-full flex p-[4%_12%] pb-0 overflow-hidden justify-center sm:h-165"></div> */}
					</div>
					{/* <div className="w-full mt-30">
						<h3 className="mb-4 text-subtle">Featured templates</h3>
						<SimpleCarousel slidesToScroll={3}>
							{props.images.map((image, index) => (
								<CarouselItem key={index} className="min-w-[calc(100%/3)] flex-[initial]">
									<div className="p-10 flex-center flex-col bg-card rounded-lg">
										<img src={image} alt="" className="aspect-[4/6] object-cover rounded-md" style={{ objectPosition: "top" }} />
										<div className="w-full text-sm pt-4"></div>
									</div>
								</CarouselItem>
							))}
						</SimpleCarousel>
						<div className="flex justify-center pt-12">
							<Button variant={"secondary"}>Explore all <ArrowRight /></Button>
						</div>
					</div> */}
					<div className="mt-30 mb-16">
						<div className="flex items-center flex-col text-center">
							<div className="text-subtle mb-2">Features</div>
							<div className="font-medium text-2xl max-w-xs">Packed with simple, yet powerful features.</div>
						</div>
					</div>
					<div className="grid lg:grid-cols-3 gap-6">
						<div className="flex flex-col gap-4">
							<div className="bg-card rounded-xl w-full lg:aspect-square p-[8%] overflow-hidden">
								<div className="p-2 h-full bg-black/2 dark:bg-white/5 rounded-xl flex flex-col">
									<div className="text-xs p-2 pt-1 text-subtle">Personal projects</div>
									<div className="bg-white dark:bg-white/5 flex flex-col h-full rounded-lg p-4">
										<div className="text-xs text-subtle">2026</div>
										<div>QuickTask Manager</div>
										<div className="text-sm text-subtle">App to organize academic assignments.</div>
										<ul className="list-disc flex flex-col gap-2 px-5 text-sm mt-2 marker:text-subtle/50">
											<li><div className="h-full flex items-center"><span className="w-full h-2 bg-black/10 dark:bg-white/10 block rounded-[1px]"></span></div></li>
											<li><div className="h-full flex items-center"><span className="w-3/4 h-2 bg-black/10 dark:bg-white/10 block rounded-[1px]"></span></div></li>
											<li><div className="h-full flex items-center"><span className="w-3/4 h-2 bg-black/10 dark:bg-white/10 block rounded-[1px]"></span></div></li>
											<li><div className="h-full flex items-center"><span className="w-3/4 h-2 bg-black/10 dark:bg-white/10 block rounded-[1px]"></span></div></li>
											{/* <li>Created a clean interface to add, edit, and delete daily tasks</li>
											<li>Integrated browser storage.</li>
											<li>Developed fluid mobile-first designs.</li> */}
										</ul>
										<div className="grid grid-cols-3 gap-2 lg:mt-auto mt-8">
											<div className="bg-card aspect-[6/4] rounded-md" style={{ background: `url(https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fG1pbmltYWx8ZW58MHx8MHx8fDA%3D) center / cover` }}></div>
											<div className="bg-card aspect-[6/4] rounded-md" style={{ background: `url(https://images.unsplash.com/photo-1611572789411-6240f6cea970?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWluaW1hbGlzdHxlbnwwfHwwfHx8MA%3D%3D) center / cover` }}></div>
											<div className="bg-card aspect-[6/4] rounded-md" style={{ background: `url(https://images.unsplash.com/photo-1483794344563-d27a8d18014e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1pbmltYWxpc3R8ZW58MHx8MHx8fDA%3D) center / cover` }}></div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<SpotlightIcon className="mb-2" />
								<div className="font-medium mb-1">Showcase your projects</div>
								<div className="text-subtle">Enrich your profile by adding your personal projects with images and video.</div>
							</div>
						</div>
						<div className="flex flex-col gap-4">
							<div className="bg-card rounded-xl w-full lg:aspect-square p-[8%] overflow-hidden">
								<div className="p-2 h-full bg-black/2 dark:bg-white/5 rounded-xl flex flex-col">
									<div className="text-xs p-2 pt-1 text-subtle">Stats overview</div>
									<div className="bg-white dark:bg-white/8 h-full p-4 rounded-md w-full flex flex-col gap-6">
										<div className="flex gap-6">
											<div>
												<div className="text-sm text-subtle">People</div>
												<div className="font-medium mb-1">64</div>
												<div className="bg-black/5 dark:bg-white/10 h-3 w-12 rounded-[2px]"></div>
											</div>
											<div>
												<div className="text-sm text-subtle">Page views</div>
												<div className="font-medium mb-1">139</div>
												<div className="bg-black/5 dark:bg-white/10 h-3 w-12 rounded-[2px]"></div>
											</div>
										</div>
										<div className="grid grid-cols-6 gap-2 h-full">
											{
												Array.from({ length: 6 }, (_, index) => (
													<div className="flex flex-col gap-2 items-center justify-end" key={index}>
														<div className="bg-tertiary dark:bg-indigo-300 w-full rounded-md" style={{ height: `${Math.random() * (80 - 25) + 25}%` }}></div>
														<span className="text-[10px] text-subtle">{days[index]}</span>
													</div>
												))}
										</div>
									</div>
								</div>
							</div>
							<div>
								<ChartPieIcon className="mb-2" />
								<div className="font-medium mb-1">Track key metrics</div>
								<div className="text-subtle">Get key metrics about your profile - page views count, bounce rates, duration, and more.</div>
							</div>
						</div>
						<div className="flex flex-col gap-4">
							<div className="bg-card rounded-xl w-full lg:aspect-square p-[8%] flex items-center overflow-hidden">
								<div className="p-2 bg-black/2 dark:bg-white/5 rounded-xl flex flex-col w-full">
									<div className="text-xs p-2 pt-1 text-subtle">Profile options</div>
									<div className="bg-white dark:bg-white/8 h-full rounded-md w-full flex flex-col text-sm">
										<div className="flex items-center gap-2 p-3 opacity-70">
											<ShareIcon size={18} className="text-subtle" />
											Share
											<DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
										</div>
										<div className="flex items-center gap-2 p-3 opacity-70">
											<EditIcon size={18} className="text-subtle" />
											Edit
											<DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
										</div>
										<div className="flex items-center gap-2 p-3 opacity-70">
											<EyeIcon size={18} className="text-subtle" />
											View as guest
											<DropdownMenuShortcut>⇧⌘V</DropdownMenuShortcut>
										</div>
										<div className="flex items-center gap-2 p-3">
											<DownloadIcon size={18} className="text-subtle" />
											Export as PDF
										</div>
									</div>
								</div>
							</div>
							<div>
								<DownloadIcon className="mb-2" />
								<div className="font-medium mb-1">Download as PDF</div>
								<div className="text-subtle">Export and save your profile as a resume PDF — in just a single click.</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<StaticFooter />
		</>
	)
}