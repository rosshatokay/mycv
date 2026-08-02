import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { WorkExperience } from "@/interfaces/workExperience";
import WorkExperienceItem from "@/partials/WorkExperienceItem";
import { Head, Link } from "@inertiajs/react";
import { MoreHorizontalIcon, PlusIcon, SquarePlusIcon } from "lucide-react";

interface PageProps {
	work_experiences: WorkExperience[]
}

export default function WorkExperiencesPage(props: PageProps) {
	return (
		<>
			<Head>
				<title>Work experience</title>
			</Head>
			<div className="main-container py-16">
				<div className="flex justify-between items-end">
					<div>
						<div className="text-xl font-medium">Work experience</div>
						<div className="text-subtle">Add your professional work experience.</div>
					</div>
					<Button nativeButton={false} variant={"secondary"} size={"sm"} render={<Link href={"/work-experience/new"}></Link>}><PlusIcon data-icon="inline-start" /> Add</Button>
				</div>
				<Table className="mt-6">
					<TableHeader>
						<TableRow>
							<TableHead className="text-subtle">Start year</TableHead>
							<TableHead className="text-subtle">End year</TableHead>
							<TableHead className="text-subtle">Company</TableHead>
							<TableHead className="text-subtle">Role</TableHead>
							<TableHead className="text-subtle"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{props.work_experiences?.length > 0 && (
							props.work_experiences.map(we => (
								<TableRow key={we.id} onClick={(e) => console.log()}>
									<TableCell>{we.start_year}</TableCell>
									<TableCell>{we.end_year || "Now"}</TableCell>
									<TableCell className="whitespace-nowrap">{we.company}</TableCell>
									<TableCell className="whitespace-nowrap">{we.role}</TableCell>
									<TableCell align="right">
										<DropdownMenu>
											<DropdownMenuTrigger render={<Button variant={"ghost"} size={"icon-sm"}><MoreHorizontalIcon /></Button>} />
											<DropdownMenuContent align="end">
												<DropdownMenuItem render={<Link href={`/work-experience/${we.id}/edit`} />}>Edit</DropdownMenuItem>
												<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
				{!props.work_experiences?.length && <Empty className="border mt-8">
					<EmptyHeader>
						<EmptyMedia variant={"icon"}>
							<SquarePlusIcon />
						</EmptyMedia>
						<EmptyTitle>No work experience yet</EmptyTitle>
						<EmptyDescription>You haven't created any work experiences yet. Get started by adding your first work experience.</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button nativeButton={false} render={<Link href={"/work-experience/new"}></Link>}><PlusIcon data-icon="inline-start" /> Add work experience</Button>
					</EmptyContent>
				</Empty>}
			</div>
		</>
	)
}