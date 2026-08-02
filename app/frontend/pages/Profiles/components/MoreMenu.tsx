import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { ChevronDownIcon, EditIcon, ShareIcon } from "lucide-react";

interface ViewAsGuestButton {
	viewAsGuestButton?: React.ReactElement
	openShareDialog: () => void
}

export default function ProfileMoreMenu({ viewAsGuestButton, openShareDialog }: ViewAsGuestButton) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant={"outline"} size={"sm"}>More <ChevronDownIcon /></Button>}></DropdownMenuTrigger>
			<DropdownMenuContent className={"w-[210px]"} align="end">
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={openShareDialog}>
						<ShareIcon /> Share
						<DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem render={<Link href={"/settings/profile"}>
						<EditIcon /> Edit
						<DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
					</Link>
					}>
					</DropdownMenuItem>
					<DropdownMenuItem render={viewAsGuestButton}></DropdownMenuItem>
				</DropdownMenuGroup>
				{/* <DropdownMenuSeparator></DropdownMenuSeparator>
				<DropdownMenuGroup>
					<DropdownMenuItem><DownloadIcon /> Download as PDF</DropdownMenuItem>
				</DropdownMenuGroup> */}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}