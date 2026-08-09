import { WorkExperience } from "@/interfaces/workExperience"

interface WorkExperienceItemProps {
	item: WorkExperience
}

export default function WorkExperienceItem({ item }: WorkExperienceItemProps) {
	return (
		<div className="relative grid grid-cols-[148px_1fr] overflow-hidden">
			<div className="text-subtle">{item.start_year} — {item.end_year ? item.end_year : "Now"}</div>
			<div className="min-w-0">
				<div>{item.role} at {item.company}</div>
				<div className="text-subtle">{item.location}</div>
			</div>
		</div>
	)
}