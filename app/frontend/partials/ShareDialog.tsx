import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FacebookIcon } from "@/assets/facebook"
import { LinkedInIcon } from "@/assets/linkedin"
import copyToClipboard, { cn } from "@/lib/utils"
import { XIcon } from "@/assets/x"
import { Button } from "@/components/ui/button"
import { CopyIcon, MailIcon, MoreVerticalIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"

interface ShareDialogProps {
	url: string
	isOpen: boolean
}

const platforms = [
	{
		icon: <LinkedInIcon fill="#2D65BC" size={28} />,
		bgColor: "bg-[#2D65BC]",
		label: "LinkedIn",
		shareLink: "https://www.linkedin.com/shareArticle?url="
	},
	{
		icon: <XIcon fill="white" size={28} />,
		bgColor: "bg-black",
		label: "X",
		shareLink: "https://www.linkedin.com/shareArticle?url="
	},
	{
		icon: <FacebookIcon fill="white" size={28} />,
		bgColor: "bg-[#425894]",
		label: "Facebook",
		shareLink: "https://wa.me/?text="
	},
	{
		icon: <MailIcon />,
		bgColor: "bg-card",
		label: "Email",
		shareLink: "https://wa.me/?text=",
	},
	{
		icon: <MoreVerticalIcon />,
		bgColor: "bg-card",
		label: "More",
		shareLink: "https://wa.me/?text=",
		onClick: () => console.log("clicked")
	},
]

export default function ShareDialog({ url, isOpen }: ShareDialogProps) {
	const [isCopied, setIsCopied] = useState<boolean>(false)
	
	const handleUrlCopy = () => {
		setIsCopied(true)
		copyToClipboard(url)
	}
	
	return (
		<Dialog open={isOpen} onOpenChange={(e) => !e ? isOpen = false : undefined}>
			<DialogContent className={"sm:max-w-md"}>
				<DialogHeader>
					<DialogTitle>Share profile</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-5 pt-2">
					<Field>
						<FieldLabel>Copy link</FieldLabel>
						<Field orientation="horizontal">
							<Input type="text" readOnly value={url} />
							<Tooltip onOpenChange={(e) => !e ? setIsCopied(false) : null}>
								<TooltipTrigger delay={0} closeOnClick={false} onClick={handleUrlCopy} render={<Button variant={"secondary"} size={"icon"}><CopyIcon /></Button>} />
								<TooltipContent>{isCopied ? "URL Copied" : "Copy URL"}</TooltipContent>
							</Tooltip>
						</Field>
					</Field>
					<div>
						<div className="font-medium">Share to</div>
						<div className="grid grid-cols-5">
							{platforms.map((item, i) => (
								<div className="flex flex-col gap-2 items-center p-4" onClick={() => item.onClick ? item.onClick() : undefined} key={i}>
									<div className={cn("w-full aspect-square rounded-full flex-center", item.bgColor)}>
										{item.icon}
									</div>
									<span className="!text-xs">{item.label}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}