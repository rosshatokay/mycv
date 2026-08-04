import { Head, Link } from "@inertiajs/react";
import { TemplateComponentProps } from "../../types";
import { Boilerplate } from "../../utils/boilerplate";
import { Button } from "@/components/ui/button";
import { FolderPlusIcon, GlobeIcon, MailIcon, PlusIcon, SquarePlusIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import WorkExperienceItem from "@/partials/WorkExperienceItem";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { LinkedInIcon } from "@/assets/linkedin";
import ProjectItem from "@/partials/ProjectItem";
import { LogoIcon } from "@/assets/logo";
import ProjectSheet from "@/partials/ProjectSheet";
import ShareDialog from "@/partials/ShareDialog";
import FloatingProfileTopBar from "@/pages/Profiles/components/FloatingProfileTopBar";
import ChooseTemplateDialog from "@/partials/ChooseTemplateDialog";
import UserControls from "@/partials/shared/UserControls";

export default function ClassicTemplate({ data }: TemplateComponentProps) {
	const { auth, user, resume, work_experiences, projects, education, is_owner } = data
	const { 
		isViewingAsGuest,
		setIsViewingAsGuest,
		setIsShareDialogOpen,
		isShareDialogOpen,
		floatingTopBarTargetRef,
		activeProject,
		setActiveProject,
		isPast,
		isChooseTempDialogOpen,
		setIsChooseTempDialogOpen
	} = Boilerplate()

	return (
		<>
			{isViewingAsGuest &&
				<FloatingProfileTopBar user={user} resume={resume} isShown={isPast} />
			}
			<div className="main-container relative py-16 flex flex-col gap-16 text-[15px]">
				<UserControls setIsChooseTempDialogOpen={setIsChooseTempDialogOpen} isOwner={is_owner} isViewingAsGuest={isViewingAsGuest} setIsViewingAsGuest={setIsViewingAsGuest} setIsShareDialogOpen={setIsShareDialogOpen} />
				<section className="flex flex-col gap-4">
					<div>
						<div className="flex justify-between">
							<Avatar size="lg" className={"mb-4"}>
								<AvatarImage src={user.avatar_url} alt={`@${user.username}'s picture`}></AvatarImage>
								<AvatarFallback>{user.full_name[0].toUpperCase()}</AvatarFallback>
							</Avatar>
						</div>
						<div className="flex flex-col">
							<div className="font-medium text-[17px]">{user.full_name}</div>
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
					<div className="flex justify-between" ref={floatingTopBarTargetRef}>
						<div className="w-fit flex gap-1">
							{resume.website_url && <Button variant={"secondary"} size={"sm"} nativeButton={false} render={<a href={resume.website_url} target="_blank"><GlobeIcon /> Website</a>}></Button>}
							{resume.linkedin_url && <Button variant={"secondary"} size={"sm"} nativeButton={false} render={<a href={`https://linkedin.com${resume.linkedin_url}`} target="_blank"><LinkedInIcon /> LinkedIn</a>} className={""}>LinkedIn</Button>}
							<Button variant={"secondary"} size={"sm"} className={""}><MailIcon /> Copy email</Button>
						</div>
					</div>
				</section>
				{work_experiences?.length > 0 && (
					<section>
						<div className="text-subtle mb-4">Work experience</div>
						<div className="flex flex-col gap-6">
							{work_experiences.map(item => (
								<WorkExperienceItem item={item} key={item.id} />
							))}
						</div>
					</section>
				)}
				{!(work_experiences?.length > 0) && !isViewingAsGuest && is_owner && (
					<section>
						<div className="text-subtle mb-4">Work experience</div>
						<Empty className="border">
							<EmptyHeader>
								<EmptyMedia variant={"icon"}>
									<SquarePlusIcon />
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
				{!(projects?.length > 0) && !isViewingAsGuest && is_owner && (
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
				{projects?.length > 0 && (
					<section>
						<div className="text-subtle mb-4">Projects</div>
						<div className="flex flex-col gap-10">
							{projects.map(project => <ProjectItem key={project.id} project={project} onSelect={setActiveProject} />)}
						</div>
					</section>
				)}
				{resume.bio && (
					<section>
						<div className="text-subtle mb-4">About</div>
						<p>{resume.bio}</p>
					</section>
				)}
				{education && (
					<section>
						<div className="text-subtle mb-4">Education</div>
						<div className="grid grid-cols-[148px_1fr] overflow-hidden">
							<div>
								<div className="text-subtle">{education.start_year}{education.end_year && ` — ${education.end_year}`}</div>
							</div>
							<div>
								<div className="font-medium">{education.degree}</div>
								<div className="text-subtle">{education.school}</div>
								<div className="text-subtle">{education.major}</div>
							</div>
						</div>
					</section>
				)}
				{(!auth.user || isViewingAsGuest) && <div className="xl:fixed bottom-8 left-8 xl:max-w-[200px]">
					<div>
						<hr className="mb-6 xl:hidden" />
						<a href="/" className="inline-block mb-2 opacity-50 hover:opacity-100 transition">
							<LogoIcon size={28} />
						</a>
						<div className="text-subtle text-xs">
							Powered by <Link href="/" className="underline">highlight.cv</Link>. Create your own work profile for free.
						</div>
					</div>
				</div>}
			</div>
			{projects?.length > 0 && (
				<ProjectSheet project={activeProject} setActiveProject={setActiveProject}></ProjectSheet>
			)}
			<ShareDialog url={`https://highlight.cv/@${user.username}`} isOpen={isShareDialogOpen} setIsOpen={setIsShareDialogOpen} />
			{is_owner && (
				<ChooseTemplateDialog isOpen={isChooseTempDialogOpen} setIsOpen={setIsChooseTempDialogOpen} />
			)}
		</>
	)
}