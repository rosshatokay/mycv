import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { ChevronDownIcon, DownloadIcon, EditIcon, ShareIcon } from "lucide-react";

interface ViewAsGuestButton {
	viewAsGuestButton?: React.ReactElement
}

export default function ProfileMoreMenu({ viewAsGuestButton }: ViewAsGuestButton) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant={"outline"} size={"sm"}>More <ChevronDownIcon /></Button>}></DropdownMenuTrigger>
			<DropdownMenuContent className={"w-[210px]"} align="end">
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<ShareIcon /> Share
						<DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem render={<Link href={"/settings/profile"}><EditIcon /> Edit</Link>}></DropdownMenuItem>
					<DropdownMenuItem render={viewAsGuestButton}></DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator></DropdownMenuSeparator>
				<DropdownMenuGroup>
					<DropdownMenuItem><DownloadIcon /> Download as PDF</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}