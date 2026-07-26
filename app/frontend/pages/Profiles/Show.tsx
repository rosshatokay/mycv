import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Project } from "@/interfaces/project"
import { AuthUser } from "@/interfaces/user"
import BaseLayout from "@/layouts/BaseLayout"
import { Head, Link } from "@inertiajs/react"
import { ArrowUpRight, GlobeIcon, MailIcon } from "lucide-react"
import { ResumeProps } from "./Edit"
import { LinkedInIcon } from "@/assets/linkedin"
import { useEffect, useState } from "react"
import { LogoIcon } from "@/assets/logo"


interface ProfilePageProps {
	auth: AuthUser['auth'],
	user: {
		id: string
		email: string
		username: string,
		highlights: string[]
		full_name: string
	},
	projects: Project[]
	resume: string
}

export default function ProfilePage(props: ProfilePageProps) {
	const isOwner = props.auth?.user?.id === props.user.id
	const resume = JSON.parse(props.resume as string) as ResumeProps
	const [isViewingAsGuest, setIsViewingAsGuest] = useState<boolean>(false)

	useEffect(() => {
		const userAside = document.getElementById('main-aside')
		if (isViewingAsGuest) {
			userAside?.classList.add('opacity-0', 'pointer-events-none')
		} else {
			userAside?.classList.remove('opacity-0', 'pointer-events-none')
		}
	}, [isViewingAsGuest])

	return (
		<>
			<Head>
				<title>{props.user.full_name}</title>
			</Head>
			<div className="main-container py-20 flex flex-col gap-16 text-[15px]">
				<section className="flex flex-col gap-8">
					<div>
						<div className="flex justify-between">
							<Avatar size="lg" className={"mb-4"}>
								<AvatarImage src="https://github.com/shadcn.png" alt={`@${props.user.username}'s picture`}></AvatarImage>
								<AvatarFallback>{props.user.username[0].toUpperCase()}</AvatarFallback>
							</Avatar>
							<div className="flex gap-1">
								{(isOwner && !isViewingAsGuest) && <Button nativeButton={false} variant={"secondary"} size={"sm"} render={<Link href={"/settings/profile"}></Link>}>Edit profile</Button>}
								{isOwner &&
									<Button variant={"secondary"} size={"sm"} onClick={() => setIsViewingAsGuest(!isViewingAsGuest)}>
										{isViewingAsGuest ? "Stop viewing as guest" : "View as guest"}
									</Button>}
							</div>
						</div>
						<div className="flex flex-col">
							<div className="font-medium text-[17px]">{props.user.full_name}</div>
							<div className="text-subtle">{resume.role}</div>
							<div className="text-subtle">{resume.location}</div>
						</div>
					</div>
					{/* <ul className="flex flex-col gap-2 list-[lower-roman] px-4 marker:text-subtle/70 max-w-3/4">
						{props.user.highlights.map(item => (
							<li key={item} className="pl-2">{item}</li>
						))}
					</ul> */}
					<div className="flex justify-between -mt-4">
						<div className="w-fit flex gap-1">
							{/* <Tooltip>
								<TooltipContent>Website</TooltipContent>
								<TooltipTrigger delay={0} render={<Button variant={"secondary"} size={"icon-lg"}><GlobeIcon /></Button>}></TooltipTrigger>
							</Tooltip>
							<Tooltip>
								<TooltipContent>LinkedIn</TooltipContent>
								<TooltipTrigger delay={0} render={<Button variant={"secondary"} size={"icon-lg"}><LinkedInIcon /></Button>}></TooltipTrigger>
							</Tooltip>
							<Tooltip>
								<TooltipContent>Copy email</TooltipContent>
								<TooltipTrigger delay={0} render={<Button variant={"secondary"} size={"icon-lg"}><MailIcon /></Button>}></TooltipTrigger>
							</Tooltip> */}

							{resume.website_url && <Button variant={"secondary"} size={"sm"} nativeButton={false} render={<a href={`https://${resume.website_url}`} target="_blank"><GlobeIcon /> Website</a>}></Button>}
							{resume.linkedin_url && <Button variant={"secondary"} size={"sm"} nativeButton={false} render={<a href={`https://linkedin.com${resume.linkedin_url}`} target="_blank"><LinkedInIcon /> LinkedIn</a>} className={""}>LinkedIn</Button>}
							<Button variant={"secondary"} size={"sm"} className={""}><MailIcon /> Copy email</Button>
						</div>
					</div>
				</section>
				<section>
					<div className="text-subtle mb-4">Projects</div>
					<div className="flex flex-col gap-10">

						{props.projects.map(project => (
							<div key={project.id} className="grid grid-cols-[148px_1fr] overflow-hidden">
								<div>
									<div className="text-subtle">{project.year}</div>
								</div>
								<div className="min-w-0">
									<a href="" target="_blank" className="w-fit flex items-center group">
										<span className="group-hover:underline font-medium">{project.title}</span>
										<ArrowUpRight size={15} className="opacity-50 group-hover:opacity-100 transition" />
									</a>
									<div className="text-subtle">Social e-reading website platform</div>
									<ul className="my-3 pl-5 flex flex-col gap-2 list-disc marker:text-subtle">
										{project.points.map(item => (<li key={item}>{item}</li>))}
									</ul>
									<div className="mt-4 flex gap-2">
										<div className="bg-card rounded-md min-w-40 aspect-video"></div>
										<div className="bg-card rounded-md min-w-40 aspect-video"></div>
										<div className="bg-card rounded-md min-w-40 aspect-video"></div>
										<div className="bg-card rounded-md min-w-40 aspect-video"></div>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
				<section>
					<div className="text-subtle mb-4">Education</div>
					<div className="grid grid-cols-[148px_1fr] overflow-hidden">
						<div>
							<div className="text-subtle">2022 — 2026</div>
						</div>
						<div>
							<div className="font-medium">B.Sc Software Engineering</div>
							<div className="text-subtle">Harvard University, USA</div>
							<div className="text-subtle">Specialization in Data Science and Machine Learning</div>
						</div>
					</div>
				</section>
				{(!props.auth.user || isViewingAsGuest) && <div className="xl:fixed bottom-8 left-8 xl:max-w-[200px]">
					<div>
						<hr className="mb-6 xl:hidden" />
						<a href="/" className="inline-block mb-2 opacity-50 hover:opacity-100 transition">
							<LogoIcon size={28}></LogoIcon>
						</a>
						<div className="text-subtle text-xs">
							Powered by <a href="/" className="underline">highlight</a>. Create your own work profile for free.
						</div>
					</div>
				</div>}

			</div>
		</>
	)
}

ProfilePage.layout = (page: React.ReactNode) => <BaseLayout>{page}</BaseLayout>