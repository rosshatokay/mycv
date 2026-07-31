import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Project } from "@/interfaces/project"
import { AuthUser } from "@/interfaces/user"
import { Head, Link } from "@inertiajs/react"
import { EyeIcon, EyeOffIcon, GlobeIcon, MailIcon } from "lucide-react"
import { EducationProps, ResumeProps } from "../Settings/EditProfile"
import { LinkedInIcon } from "@/assets/linkedin"
import { useEffect, useRef, useState } from "react"
import { LogoIcon } from "@/assets/logo"
import ProfileMoreMenu from "./components/MoreMenu"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import ProjectItem, { ProjectItemProps } from "@/partials/ProjectItem"
import FloatingProfileTopBar from "./components/FloatingProfileTopBar"
import ProjectSheet from "@/partials/ProjectSheet"

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
}

export default function ProfilePage(props: ProfilePageProps) {
	const isOwner = props.auth?.user?.id === props.user.id
	const resume = JSON.parse(props.resume as string) as ResumeProps
	const [isViewingAsGuest, setIsViewingAsGuest] = useState<boolean>(false)
	const [activeProject, setActiveProject] = useState<ProjectItemProps['project'] | null>(null)
	const targetRef = useRef(null);
	const [isPast, setIsPast] = useState(false);

	useEffect(() => {
		const target = targetRef.current;
		if (!target) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				console.log(entry.boundingClientRect)
				// boundingClientRect.top < 0 means the element's top has moved above the viewport view
				// !entry.isIntersecting means the element is no longer visible in the view
				if (entry.boundingClientRect.top < 0 && !entry.isIntersecting) {
					setIsPast(true);
				} else {
					setIsPast(false);
				}
			},
			{
				threshold: 0, // Triggers as soon as even 1 pixel changes visibility
			}
		);

		observer.observe(target);

		// Clean up observer on component unmount
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		console.log(activeProject)
	}, [activeProject])

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
			<div className="fixed top-0 left-0 w-full p-4 flex justify-end">
				<div className="flex gap-1">
					{(isOwner && !isViewingAsGuest) && <Button nativeButton={false} variant={"outline"} size={"sm"} render={<Link href={"/settings/profile"}></Link>}>Edit</Button>}
					{(isOwner && !isViewingAsGuest) && <Button nativeButton={false} variant={"outline"} size={"sm"} render={<Link href={"/settings/profile"}></Link>}>Change template</Button>}
					{(isOwner && !isViewingAsGuest) && <ProfileMoreMenu viewAsGuestButton={<DropdownMenuItem onClick={() => setIsViewingAsGuest(true)}><EyeIcon /> View as guest</DropdownMenuItem>} />}
					{isViewingAsGuest && <Button variant={"ghost"} size={"sm"} onClick={() => setIsViewingAsGuest(false)}>
						<EyeOffIcon></EyeOffIcon>
						Stop viewing as guest
					</Button>}
				</div>
			</div>
			{isViewingAsGuest &&
				<FloatingProfileTopBar user={props.user} resume={resume} isShown={isPast} />
			}
			<div className="main-container py-16 flex flex-col gap-16 text-[15px]">
				<section className="flex flex-col gap-4">
					<div>
						<div className="flex justify-between">
							<Avatar size="lg" className={"mb-4"}>
								<AvatarImage src={props.user.avatar_url} alt={`@${props.user.username}'s picture`}></AvatarImage>
								<AvatarFallback>{props.user.username[0].toUpperCase()}</AvatarFallback>
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
				<section>
					<div className="text-subtle mb-4">Work experience</div>
					as
				</section>
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
		</>
	)
}
