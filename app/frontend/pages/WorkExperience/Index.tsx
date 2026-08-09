import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { WorkExperience } from "@/interfaces/workExperience";
import { formatYearsRange } from "@/lib/utils";
import { Head, Link } from "@inertiajs/react";
import { BriefcaseIcon, Edit2Icon, PlusIcon, SquarePlusIcon } from "lucide-react";

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
				{props.work_experiences?.length > 0 && (
					<div className="mt-4 -m-2">
						{props.work_experiences.map(we => (
							<div className="relative flex items-center gap-4 p-2 group hover:bg-card rounded-lg transition" key={we.id}>
								<Link href={`/work-experience/${we.id}/edit`} className="absolute inset-0" />
								<div className="w-11 flex-center text-subtle aspect-square rounded-lg bg-card">
									<BriefcaseIcon size={20} />
								</div>
								<div className="w-full">
									<div className="flex items-start justify-between">
										<div className="flex items-center gap-1">
											<span>{we.role}</span>
											<Edit2Icon size={12} color="var(--subtle)" className="opacity-0 group-hover:opacity-100 transition" />
										</div>
										<div className="text-subtle text-sm pr-2">{formatYearsRange(we.start_year, we.end_year)}</div>
									</div>
									<div className="text-sm text-subtle">{we.company} • {we.location}</div>
								</div>
							</div>
						))}
					</div>
				)}
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