import UserControls from "@/partials/shared/UserControls";
import { TemplateComponentProps } from "../../types";
import { Boilerplate } from "../../utils/boilerplate";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import copyToClipboard, { formatYearsRange } from "@/lib/utils";
import ProjectSheet from "@/partials/ProjectSheet";
import { Button } from "@/components/ui/button";
import { CopyIcon, GlobeIcon, MailIcon } from "lucide-react";
import { LinkedInIcon } from "@/assets/linkedin";
import ChooseTemplateDialog from "@/partials/ChooseTemplateDialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import ShareDialog from "@/partials/ShareDialog";
import FloatingProfileTopBar from "@/pages/Profiles/components/FloatingProfileTopBar";

export default function LeanTemplate({ data }: TemplateComponentProps) {
	const [emailCopied, setEmailCopied] = useState<boolean>(false)
	const { auth, user, resume, work_experiences, projects, education, is_owner } = data
	const {
		isViewingAsGuest,
		setIsViewingAsGuest,
		setIsShareDialogOpen,
		isShareDialogOpen,
		floatingTopBarTargetRef,
		activeProject,
		setActiveProject,
		isPastProfileHeader,
		isChooseTempDialogOpen,
		setIsChooseTempDialogOpen
	} = Boilerplate(auth.user === null)

	const handleEmailCopy = () => {
		setEmailCopied(true)
		copyToClipboard(user.email)
		setTimeout(() => setEmailCopied(false), 2000)
	}

	return (
		<div className="main-container relative py-16 flex flex-col gap-11 text-[15px]">
			<FloatingProfileTopBar isShown={isPastProfileHeader} user={user} resume={resume} />
			<UserControls setIsChooseTempDialogOpen={setIsChooseTempDialogOpen} isOwner={is_owner} isViewingAsGuest={isViewingAsGuest} setIsViewingAsGuest={setIsViewingAsGuest} setIsShareDialogOpen={setIsShareDialogOpen} />
			<section className="flex justify-between" ref={floatingTopBarTargetRef}>
				<div className="flex flex-row gap-4">
					<Avatar className={"w-12 h-12"}>
						<AvatarImage src={user.avatar_url} alt={`@${user.username}'s picture`}></AvatarImage>
						<AvatarFallback>{user.full_name[0].toUpperCase()}</AvatarFallback>
					</Avatar>
					<div>
						<div>{user.full_name}</div>
						<div className="text-subtle">{resume.role}</div>
					</div>
				</div>
				<div className="w-fit flex gap-1">
					{resume.website_url &&
						<Tooltip>
							<TooltipContent>Website</TooltipContent>
							<TooltipTrigger delay={0} render={<Button variant={"ghost"} size={"icon-sm"} nativeButton={false} render={<a href={resume.website_url} target="_blank"></a>}><GlobeIcon /></Button>} />
						</Tooltip>
					}
					{resume.linkedin_url &&

						<Tooltip>
							<TooltipContent>LinkedIn</TooltipContent>
							<TooltipTrigger delay={0} render={<Button variant={"ghost"} size={"icon-sm"} nativeButton={false} render={<a href={`https://linkedin.com${resume.linkedin_url}`} target="_blank"></a>}><LinkedInIcon /></Button>} />
						</Tooltip>
					}
					<Tooltip>
						<TooltipContent>{emailCopied ? "Copied email" : "Copy email"}</TooltipContent>
						<TooltipTrigger closeOnClick={false} delay={0} onClick={handleEmailCopy} render={<Button variant={"ghost"} size={"icon-sm"}><MailIcon /></Button>} />
					</Tooltip>
				</div>
			</section>
			{!!resume.highlights.length && (
				<section>
					<h4 className="text-subtle mb-2">Highlights</h4>
					<ul className="flex flex-col gap-2 list-disc px-4 marker:text-subtle/70 max-w-3/4">
						{resume.highlights?.map(item => (
							<li key={item} className="pl-2">{item}</li>
						))}
					</ul>
				</section>
			)}
			{work_experiences?.length > 0 && (
				<section>
					<h4 className="text-subtle mb-2">Work experience</h4>
					<div className="flex flex-col gap-6">
						{work_experiences.map(item => (
							<div key={item.id}>
								<div className="flex items-start justify-between">
									<h3>{item.role} at {item.company}</h3>
									<p className="text-subtle">{formatYearsRange(item.start_year, item.end_year)}</p>
								</div>
								<p className="text-subtle">{item.location}</p>
							</div>
						))}
					</div>
				</section>
			)}
			{projects?.length > 0 && (
				<section>
					<h4 className="text-subtle mb-2">Projects</h4>
					<div className="-m-2">
						{projects.map(project => (
							<div
								key={project.id}
								className="p-2 rounded-lg hover:bg-card transition cursor-pointer"
								onClick={() => setActiveProject(project)}
							>
								<div className="flex items-start justify-between">
									<h3>{project.title}</h3>
									<p className="text-subtle">{project.year}</p>
								</div>
								<p className="text-subtle">{project.description}</p>
							</div>
						))}
					</div>
				</section>
			)}
			{education && (
				<section>
					<h4 className="text-subtle mb-2">Education</h4>
					<div className="flex flex-col gap-6">
						<div>
							<div className="flex items-start justify-between">
								<h3>{education.degree} in {education.major}</h3>
								<p className="text-subtle">{formatYearsRange(education.start_year, education.end_year)}</p>
							</div>
							<p className="text-subtle">{education.school}</p>
						</div>
					</div>
				</section>
			)}
			<section>
				<h4 className="text-subtle mb-2">Contact</h4>
				<div className="flex flex-col gap-4">
					<div className="grid grid-cols-[120px_1fr]">
						<div>Location</div>
						<div className="text-subtle">{resume.location}</div>
					</div>
					<div className="grid grid-cols-[120px_1fr]">
						<div>Email</div>
						<div className="flex gap-1 items-center">
							<span>{user.email}</span>
							<Tooltip>
								<TooltipContent>Copy</TooltipContent>
								<TooltipTrigger delay={0} render={<button className="text-subtle hover:text-foreground"><CopyIcon size={14} /></button>} />
							</Tooltip>
						</div>
					</div>
					{resume.website_url && (
						<div className="grid grid-cols-[120px_1fr]">
							<div>Website</div>
							<div className="items-center flex gap-1">
								<span>{resume.website_url.replace("https://", "")}</span>

							</div>
						</div>
					)}
					{resume.linkedin_url && (
						<div className="grid grid-cols-[120px_1fr]">
							<div>LinkedIn</div>
							<div className="items-center flex gap-1">
								<span>linkedin.com{resume.linkedin_url}</span>
							</div>
						</div>
					)}
				</div>
			</section>


			{projects?.length > 0 && (
				<ProjectSheet project={activeProject} setActiveProject={setActiveProject} />
			)}
			{is_owner && (
				<ShareDialog url={`https://highlight.cv/@${user.username}`} isOpen={isShareDialogOpen} setIsOpen={setIsShareDialogOpen} />
			)}
			{is_owner && (
				<ChooseTemplateDialog isOpen={isChooseTempDialogOpen} setIsOpen={setIsChooseTempDialogOpen} />
			)}
		</div>
	)
}