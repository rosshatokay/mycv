import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Breadcrumb, createBreadcrumbs } from "@/lib/utils";
import { Head, useForm } from "@inertiajs/react";
import { PlusIcon, TrashIcon, UploadIcon } from "lucide-react";
import { YearSelect } from "./SelectYear";
import { Project } from "@/interfaces/project";

const breadcrumbs = [
	{ label: "Projects", path: "/projects" },
	{ label: "New project", path: "/projects/new" },
] satisfies Breadcrumb[]

interface PageProps {
	project: Project
	is_edit: boolean
}

export default function NewProject({ project, is_edit }: PageProps) {
	const { data, setData, processing, errors, post, patch } = useForm({
		project: {
			title: project.title || "",
			url: project.url || "",
			description: project.description || "",
			year: project.year || NaN,
			highlights: project.highlights || ['']
		}
	})

	const handleAddHighlight = () => {
		if (data.project.highlights.length < 6) {
			setData('project', {
				...data.project,
				highlights: [...data.project.highlights, '']
			})
		}
	}

	const handleHighlightChange = (index: number, value: string) => {
		const updated = [...data.project.highlights]
		updated[index] = value
		setData('project', {
			...data.project,
			highlights: updated
		})
	}

	const handleRemoveHighlight = (index: number) => {
		if (data.project.highlights.length > 1) {
			const updated = [...data.project.highlights.filter((_, i) => i !== index)]
			setData('project', {
				...data.project,
				highlights: updated
			})
		}
	}

	const handleSubmit = (e: React.ChangeEvent) => {
		e.preventDefault()
		if (is_edit) {
			patch(`/projects/${project.id}`)
			return
		}
		post("/projects", {
			preserveScroll: true
		})
	}

	return (
		<>
			<Head title={`${is_edit ? "Edit" : "New"} | highlight.cv`}>
			</Head>
			<div className="main-container py-16">
				{createBreadcrumbs(breadcrumbs)}
				<div className="text-xl font-medium mt-2">{is_edit ? "Edit" : "New"} project</div>
				<div className="text-subtle text-sm">
					{
						is_edit
							? "Add a new project to showcase on your resume profile."
							: ""
					}
				</div>
				<form className="mt-6" onSubmit={handleSubmit}>
					<FieldGroup>
						<FieldSet>
							<FieldGroup>
								<Field>
									<div className="flex gap-0.5">
										<FieldLabel htmlFor="title">Title</FieldLabel>
										<span className="text-red-500">*</span>
									</div>
									<Input type="text" id="title" required value={data.project.title} onChange={(e) => setData('project.title', e.target.value)} placeholder="Enter your project's title"></Input>
								</Field>
								<Field>
									<div className="flex gap-0.5">
										<FieldLabel htmlFor="description">Description</FieldLabel>
										<span className="text-red-500">*</span>
									</div>
									<Input type="text" id="description" value={data.project.description} onChange={(e) => setData('project.description', e.target.value)} required placeholder="Describe your project briefly"></Input>
								</Field>
								<div className="grid grid-cols-2 gap-4">
									<Field>
										<FieldLabel htmlFor="project_url">Project URL</FieldLabel>
										<InputGroup>
											<InputGroupInput
												value={data.project.url}
												id="project_url"
												aria-invalid={!!errors["project.url"]}
												onChange={(e) => setData('project.url', e.target.value)}
												placeholder="example.com" />
											<InputGroupAddon>
												<InputGroupText>https://</InputGroupText>
											</InputGroupAddon>
										</InputGroup>
										{errors["project.url"] && <FieldError>{errors["project.url"]}</FieldError>}
									</Field>
									<Field>
										<FieldLabel>Year</FieldLabel>
										<YearSelect value={data.project.year} onChange={(selectedYear) => setData('project.year', selectedYear)} />
									</Field>
								</div>
							</FieldGroup>
						</FieldSet>
						<FieldSeparator className="my-2"></FieldSeparator>
						<FieldSet>
							<FieldLegend>
								<div className="flex gap-0.5">
									<span>Attachments</span>
									<span className="text-[var(--destructive)]"> *</span>
								</div>
							</FieldLegend>
							<FieldDescription>Write 2–4 short bullet points, describing results achieved.</FieldDescription>
							<FieldGroup>
								{data.project.highlights.map((item, index) => (
									<Field orientation={"horizontal"} className="items-start" key={index}>
										<Textarea value={item} required onChange={(e) => handleHighlightChange(index, e.target.value)} placeholder={`Highlight ${index + 1}`} />
										<Tooltip>
											<TooltipContent>Remove highlight</TooltipContent>
											{data.project.highlights.length > 1 && (
												<TooltipTrigger delay={0} render={<Button variant={"ghost"} onClick={() => handleRemoveHighlight(index)} size={"icon-lg"}><TrashIcon color="var(--subtle)"></TrashIcon></Button>}></TooltipTrigger>
											)}
										</Tooltip>
									</Field>
								))}
								<Button size={"sm"} variant={"secondary"} className={"w-fit"} onClick={handleAddHighlight}>
									<PlusIcon></PlusIcon>
									Add highlight
								</Button>
							</FieldGroup>
						</FieldSet>
						<FieldSeparator className="my-2"></FieldSeparator>
						<FieldSet>
							<FieldLegend>Media</FieldLegend>
							<FieldDescription>Add images, video & audio to enrich your profile.</FieldDescription>
							<Empty className="border">
								<EmptyHeader>
									<EmptyMedia variant={"icon"}>
										<UploadIcon></UploadIcon>
									</EmptyMedia>
									<EmptyTitle className="text-sm">Drag and drop or browse files</EmptyTitle>
									<EmptyDescription className="text-xs">Allowed file types: PNG, JPG, GIF.</EmptyDescription>
								</EmptyHeader>
							</Empty>
						</FieldSet>
						<div className="h-16"></div>
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
											Save project
										</Button>
									</div>
								</div>
							</div>
						</div>
					</FieldGroup>
				</form>
			</div>
		</>
	)
}