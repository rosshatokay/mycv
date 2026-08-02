import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { WorkExperience } from "@/interfaces/workExperience"
import { Breadcrumb, createBreadcrumbs } from "@/lib/utils"
import { YearSelect } from "../Projects/SelectYear"
import { useForm } from "@inertiajs/react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

interface PageProps {
	work_experience: WorkExperience
	is_edit: boolean
	countries_list: [{
		label: string
		value: string
	}]
}

export default function WorkExperienceFormPage({ work_experience, is_edit, countries_list }: PageProps) {
	const breadcrumbs = [
		{ label: "Work experience", path: "/work-experience" },
		{ label: `${is_edit ? 'Edit' : 'New'}`, path: "/work-experience/new" },
	] satisfies Breadcrumb[]

	const { data, setData, processing, post, patch } = useForm({
		work_experience: {
			role: work_experience.role || "",
			company: work_experience.company || "",
			city: work_experience.city || "",
			country: work_experience.country || "",
			start_year: work_experience.start_year || null,
			end_year: work_experience.end_year || null
		}
	})

	const handleSubmit = (e: React.ChangeEvent) => {
		e.preventDefault()

		if (is_edit) {
			patch(`/work-experience/${work_experience.id}`)
		} else {
			post("/work-experience")
		}
	}

	return (
		<div className="main-container py-16">
			{createBreadcrumbs(breadcrumbs)}
			<div className="text-xl font-medium mt-2">{is_edit ? "Edit" : "New"} work experience</div>
			<div className="text-subtle text-sm">Add a new work experience to your resume profile.</div>
			<form className="mt-6" onSubmit={handleSubmit}>
				<FieldGroup>
					<div className="grid grid-cols-2 gap-4">
						<Field>
							<div className="flex gap-0.5">
								<FieldLabel htmlFor="role" className="!w-fit inline">Role</FieldLabel>
								<span className="text-destructive">*</span>
							</div>
							<Input type="text" id="role" value={data.work_experience.role} placeholder="Enter your role" onChange={(e) => setData("work_experience.role", e.target.value)} />
						</Field>
						<Field>
							<div className="flex gap-0.5">
								<FieldLabel htmlFor="company" className="!w-fit inline">Company</FieldLabel>
								<span className="text-destructive">*</span>
							</div>
							<Input type="text" id="company" value={data.work_experience.company} placeholder="Enter your company" onChange={(e) => setData("work_experience.company", e.target.value)} />
						</Field>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<Field>
							<div className="flex gap-0.5">
								<FieldLabel htmlFor="city" className="!w-fit inline">City</FieldLabel>
								<span className="text-destructive">*</span>
							</div>
							<Input type="text" id="city" value={data.work_experience.city} placeholder="Enter the city" onChange={(e) => setData("work_experience.city", e.target.value)} />
						</Field>
						<Field>
							<div className="flex gap-0.5">
								<FieldLabel htmlFor="country" className="!w-fit inline">Country</FieldLabel>
								<span className="text-destructive">*</span>
							</div>
							<Select value={data.work_experience.country} items={countries_list} onValueChange={(e) => setData("work_experience.country", e as string)}>
								<SelectTrigger id="country">
									<SelectValue placeholder="Select a country" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Select a country</SelectLabel>
										<SelectItem value={null}>Select a country</SelectItem>
										{countries_list.map(country => (
											<SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</Field>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<Field>
							<div className="flex gap-0.5">
								<FieldLabel htmlFor="start_year" className="!w-fit inline">Start year</FieldLabel>
								<span className="text-destructive">*</span>
							</div>
							<YearSelect id="start_year" value={data.work_experience.start_year} startYear={1980} onChange={(e) => setData("work_experience.start_year", e)} />
						</Field>
						<Field>
							<div className="flex gap-0.5">
								<FieldLabel htmlFor="end_year" className="!w-fit inline">End year</FieldLabel>
								{/* <span className="text-destructive">*</span> */}
							</div>
							<YearSelect id="end_year" value={data.work_experience.end_year} onChange={(e) => setData("work_experience.end_year", e)} />
							<FieldDescription className="text-xs">Leave blank if it's your present workplace.</FieldDescription>
						</Field>
					</div>
					<div className="fixed w-full bottom-0 left-0 bg-background/50 backdrop-blur-sm h-16 flex items-center">
						<div className="main-container px-5">
							<div className="flex justify-between py-4">
								<span className="text-sm">
									<span className="text-[var(--destructive)]">*</span>
									<span> required</span>
								</span>
								<div className="w-fit">
									<Button disabled={processing} type="submit" size={"lg"} variant={processing ? "secondary" : "default"} className={"w-full"}>
										{processing ? <Spinner></Spinner> : null}
										Save work experience
									</Button>
								</div>
							</div>
						</div>
					</div>
				</FieldGroup>
			</form>
		</div>
	)
}