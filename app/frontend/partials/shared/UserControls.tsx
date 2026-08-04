import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "@inertiajs/react";
import { EditIcon, EyeIcon, EyeOffIcon, LayoutTemplateIcon, ShareIcon } from "lucide-react";

interface UserControlsProps {
	isOwner: boolean,
	isViewingAsGuest: boolean,
	setIsShareDialogOpen: (state: boolean) => void,
	setIsViewingAsGuest: (state: boolean) => void,
	setIsChooseTempDialogOpen: (state: boolean) => void
}

export default function UserControls({
	isOwner,
	isViewingAsGuest,
	setIsViewingAsGuest,
	setIsShareDialogOpen,
	setIsChooseTempDialogOpen
}: UserControlsProps) {
	console.log(isViewingAsGuest)

	return (
		<div className="absolute h-full top-16 -left-8">
			<div className="h-full">
				<div className="sticky top-4 flex flex-col gap-2 ">
					{(isOwner && !isViewingAsGuest) && (
						<div className="flex flex-col gap-2">
							<Tooltip>
								<TooltipTrigger delay={0} render={<Button size={"icon-sm"} nativeButton={false} variant={"outline"} className={"rounded-full"} render={<Link href={"/settings/profile"} />}><EditIcon /></Button>} />
								<TooltipContent side="left">Edit</TooltipContent>
							</Tooltip>
							{/* <Tooltip>
								<TooltipTrigger delay={0} render={<Button size={"icon-sm"} variant={"outline"} className={"rounded-full"} onClick={() => setIsChooseTempDialogOpen(true)}><LayoutTemplateIcon /></Button>} />
								<TooltipContent side="left">Change template</TooltipContent>
							</Tooltip> */}
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
	)
}