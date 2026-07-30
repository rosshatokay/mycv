import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { ProfilePageProps } from "../Show";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LinkedInIcon } from "@/assets/linkedin";
import { GlobeIcon, MailIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResumeProps } from "@/pages/Settings/EditProfile";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FloatingProfileProps {
	user: ProfilePageProps['user'],
	isShown: boolean,
	resume: ResumeProps
}

export default function FloatingProfileTopBar({ user, isShown, resume }: FloatingProfileProps) {
	return (
		<div className={cn("fixed h-16 top-0 left-0 w-full z-1 bg-background border-b z-10 transition duration-600", isShown ? "" : "-translate-y-100")}>
			<div className="main-container flex items-center h-full">
				<Item className="p-0">
					<ItemMedia variant={"image"}>
						<Avatar size="default">
							<AvatarImage src={user.avatar_url}></AvatarImage>
							<AvatarFallback>{user.full_name[0].toUpperCase()}</AvatarFallback>
						</Avatar>
					</ItemMedia>
					<ItemContent className="gap-0">
						<ItemTitle className="leading-[1.2]">{user.full_name}</ItemTitle>
						{resume.role && (
							<ItemDescription className="leading-[1.2]">{resume.role}</ItemDescription>
						)}
					</ItemContent>
				</Item>
				{resume.website_url &&
					<Tooltip>
						<TooltipContent>Website</TooltipContent>
						<TooltipTrigger delay={0} render={<Button variant={"ghost"} size={"icon"} nativeButton={false} render={<a href={resume.website_url} target="_blank"><GlobeIcon /></a>}></Button>}></TooltipTrigger>
					</Tooltip>
				}
				{resume.linkedin_url &&
					<Tooltip>
						<TooltipContent>LinkedIn</TooltipContent>
						<TooltipTrigger delay={0} render={<Button variant={"ghost"} size={"icon"} nativeButton={false} render={<a href={`https://linkedin.com${resume.linkedin_url}`} target="_blank"><LinkedInIcon /></a>}></Button>}></TooltipTrigger>
					</Tooltip>
				}
				{resume.linkedin_url &&
					<Tooltip>
						<TooltipContent>Copy email</TooltipContent>
						<TooltipTrigger delay={0} render={<Button variant={"ghost"} size={"icon"} className={""}><MailIcon /></Button>}></TooltipTrigger>
					</Tooltip>
				}
			</div>
		</div>
	)
}