import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { ChevronDownIcon, DownloadIcon, EditIcon, ShareIcon } from "lucide-react";

interface ViewAsGuestButton {
	viewAsGuestButton?: React.ReactElement
}

export default function ProfileMoreMenu({ viewAsGuestButton }: ViewAsGuestButton) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant={"secondary"} size={"sm"}>More <ChevronDownIcon /></Button>}></DropdownMenuTrigger>
			<DropdownMenuContent className={"w-[180px]"} align="end">
				<DropdownMenuGroup>
					<DropdownMenuItem><ShareIcon /> Share</DropdownMenuItem>
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