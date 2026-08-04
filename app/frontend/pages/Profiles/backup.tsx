import { useHotkeys } from "react-hotkeys-hook"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Project } from "@/interfaces/project"
import { AuthUser } from "@/interfaces/user"
import { Head, Link, router } from "@inertiajs/react"
import { EditIcon, EyeIcon, EyeOffIcon, FolderPlusIcon, GlobeIcon, MailIcon, PlusIcon, ShareIcon, SquarePlus } from "lucide-react"
import { EducationProps, ResumeProps } from "../Settings/EditProfile"
import { LinkedInIcon } from "@/assets/linkedin"
import { useEffect, useRef, useState } from "react"
import { LogoIcon } from "@/assets/logo"
import ProjectItem from "@/partials/ProjectItem"
import FloatingProfileTopBar from "./components/FloatingProfileTopBar"
import ProjectSheet from "@/partials/ProjectSheet"
import ShareDialog from "@/partials/ShareDialog"
import { ProjectItemProps } from "@/interfaces/projectItemProps"
import { WorkExperience } from "@/interfaces/workExperience"
import WorkExperienceItem from "@/partials/WorkExperienceItem"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export interface ProfilePageProps {
	auth: AuthUser['auth'],
	user: {
		id: string
		email: string
		avatar_url?: string
		username: string,
		highlights: string[]
		full_name: string
	},
	projects: Project[]
	resume: string
	education: EducationProps
	work_experiences: WorkExperience[]
}

export default function ProfilePage(props: ProfilePageProps) {
	const isOwner = props.auth?.user?.id === props.user.id
	const resume = JSON.parse(props.resume as string) as ResumeProps
	const targetRef = useRef(null);

	const [isViewingAsGuest, setIsViewingAsGuest] = useState<boolean>(false)
	const [activeProject, setActiveProject] = useState<ProjectItemProps['project'] | null>(null)
	const [isPast, setIsPast] = useState(false);
	const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false)

	useHotkeys('mod+shift+s', () => setIsShareDialogOpen(true))
	useHotkeys('mod+shift+e', () => router.visit("/settings/profile"))
	useHotkeys('mod+shift+v', () => setIsViewingAsGuest(!isViewingAsGuest))

	useEffect(() => {
		const target = targetRef.current;
		if (!target) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				// boundingClientRect.top < 0 means the element's top has moved above the viewport view
				// !entry.isIntersecting means the element is no longer visible in the view
				if (entry.boundingClientRect.top < 0 && !entry.isIntersecting) {
					setIsPast(true);
				} else {
					setIsPast(false);
				}
			},
			{
				threshold: 0, // triggers as soon as even 1 pixel changes visibility
			}
		);

		observer.observe(target);

		// Clean up observer on component unmount
		return () => observer.disconnect();
	}, []);

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
			{isViewingAsGuest &&
				<FloatingProfileTopBar user={props.user} resume={resume} isShown={isPast} />
			}
			<div className="main-container relative py-16 flex flex-col gap-16 text-[15px]">
				<div className="absolute h-full top-16 -left-8">
					<div className="h-full">
						<div className="sticky top-4 flex flex-col gap-2 ">
							{(isOwner && !isViewingAsGuest) && (
								<div className="flex flex-col gap-2">
									<Tooltip>
										<TooltipTrigger delay={0} render={<Button size={"icon-sm"} nativeButton={false} variant={"outline"} className={"rounded-full"} render={<Link href={"/settings/profile"} />}><EditIcon /></Button>} />
										<TooltipContent side="left">Edit</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger delay={0} render={<Button size={"icon-sm"} variant={"outline"} className={"rounded-full"} onClick={() => setIsShareDialogOpen(true)}><ShareIcon /></Button>} />
										<TooltipContent side="left">Share</TooltipContent>
									</Tooltip>
								</div>
							)}
							{isOwner && (
								<Tooltip>
									<TooltipTrigger delay={0} render={<Button size={"icon-sm"} variant={"outline"} className={"rounded-full"} onClick={() => setIsViewingAsGuest(!isViewingAsGuest)}>{isViewingAsGuest ? (<EyeOffIcon />) : (<EyeIcon />)}</Button>} />
									<TooltipContent side="left">{isViewingAsGuest ? "Stop viewing as guest" : "View as guest"}</TooltipContent>
								</Tooltip>
							)}
						</div>
					</div>
				</div>
				<section className="flex flex-col gap-4">
					<div>
						<div className="flex justify-between">
							<Avatar size="lg" className={"mb-4"}>
								<AvatarImage src={props.user.avatar_url} alt={`@${props.user.username}'s picture`}></AvatarImage>
								<AvatarFallback>{props.user.full_name[0].toUpperCase()}</AvatarFallback>
							</Avatar>
						</div>
						<div className="flex flex-col">
							<div className="font-medium text-[17px]">{props.user.full_name}</div>
							<div className="text-subtle">{resume.role}</div>
							<div className="text-subtle">{resume.location}</div>
						</div>
					</div>
					{!!resume.highlights.length && (
						<ul className="flex flex-col gap-2 my-4 list-[numeral] px-4 marker:text-subtle/70 max-w-3/4">
							{resume.highlights?.map(item => (
								<li key={item} className="pl-2">{item}</li>
							))}
						</ul>
					)}
					<div className="flex justify-between" ref={targetRef}>
						<div className="w-fit flex gap-1">
							{resume.website_url && <Button variant={"secondary"} size={"sm"} nativeButton={false} render={<a href={resume.website_url} target="_blank"><GlobeIcon /> Website</a>}></Button>}
							{resume.linkedin_url && <Button variant={"secondary"} size={"sm"} nativeButton={false} render={<a href={`https://linkedin.com${resume.linkedin_url}`} target="_blank"><LinkedInIcon /> LinkedIn</a>} className={""}>LinkedIn</Button>}
							<Button variant={"secondary"} size={"sm"} className={""}><MailIcon /> Copy email</Button>
						</div>
					</div>
				</section>
				{props.work_experiences?.length > 0 && (
					<section>
						<div className="text-subtle mb-4">Work experience</div>
						<div className="flex flex-col gap-6">
							{props.work_experiences.map(item => (
								<WorkExperienceItem item={item} key={item.id} />
							))}
						</div>
					</section>
				)}
				{!(props.work_experiences?.length > 0) && !isViewingAsGuest && isOwner && (
					<section>
						<div className="text-subtle mb-4">Work experience</div>
						<Empty className="border">
							<EmptyHeader>
								<EmptyMedia variant={"icon"}>
									<SquarePlus />
								</EmptyMedia>
								<EmptyTitle>No work experience yet</EmptyTitle>
								<EmptyDescription>You haven't created any work experiences yet. Get started by adding your first work experience.</EmptyDescription>
							</EmptyHeader>
							<EmptyContent>
								<Button nativeButton={false} variant={"secondary"} render={<Link href={"/work-experience/new"}></Link>}><PlusIcon data-icon="inline-start" /> Add work experience</Button>
							</EmptyContent>
						</Empty>
					</section>
				)}
				{!(props.projects?.length > 0) && !isViewingAsGuest && isOwner && (
					<section>
						<div className="text-subtle mb-4">Projects</div>
						<Empty className="border">
							<EmptyHeader>
								<EmptyMedia variant={"icon"}>
									<FolderPlusIcon />
								</EmptyMedia>
								<EmptyTitle>No projects yet</EmptyTitle>
								<EmptyDescription>You haven't created any projects yet. Get started by adding your first project.</EmptyDescription>
							</EmptyHeader>
							<EmptyContent>
								<Button nativeButton={false} variant={"secondary"} render={<Link href={"/projects/new"}></Link>}><PlusIcon data-icon="inline-start" /> Create project</Button>
							</EmptyContent>
						</Empty>
					</section>
				)}
				{props.projects?.length > 0 && (
					<section>
						<div className="text-subtle mb-4">Projects</div>
						<div className="flex flex-col gap-10">
							{props.projects.map(project => <ProjectItem key={project.id} project={project} onSelect={setActiveProject} />)}
						</div>
					</section>
				)}
				{resume.bio && (
					<section>
						<div className="text-subtle mb-4">About</div>
						<p>{resume.bio}</p>
					</section>
				)}
				{props.education && (
					<section>
						<div className="text-subtle mb-4">Education</div>
						<div className="grid grid-cols-[148px_1fr] overflow-hidden">
							<div>
								<div className="text-subtle">{props.education.start_year}{props.education.end_year && ` — ${props.education.end_year}`}</div>
							</div>
							<div>
								<div className="font-medium">{props.education.degree}</div>
								<div className="text-subtle">{props.education.school}</div>
								<div className="text-subtle">{props.education.major}</div>
							</div>
						</div>
					</section>
				)}
				{(!props.auth.user || isViewingAsGuest) && <div className="xl:fixed bottom-8 left-8 xl:max-w-[200px]">
					<div>
						<hr className="mb-6 xl:hidden" />
						<a href="/" className="inline-block mb-2 opacity-50 hover:opacity-100 transition">
							<LogoIcon size={28}></LogoIcon>
						</a>
						<div className="text-subtle text-xs">
							Powered by <Link href="/" className="underline">highlight.cv</Link>. Create your own work profile for free.
						</div>
					</div>
				</div>}
			</div>
			{props.projects?.length > 0 && (
				<ProjectSheet project={activeProject} setActiveProject={setActiveProject}></ProjectSheet>
			)}
			<ShareDialog url={`https://highlight.cv/@${props.user.username}`} isOpen={isShareDialogOpen} setIsOpen={setIsShareDialogOpen} />
		</>
	)
}
