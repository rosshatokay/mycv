import { LinkedInIcon } from "@/assets/linkedin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AuthUser } from "@/interfaces/user";
import { createBreadcrumbs } from "@/lib/utils";
import { Head, useForm, usePage } from "@inertiajs/react";
import { MapPinIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useRef, useState } from "react";
import { YearSelect } from "../Projects/SelectYear";

export interface EducationProps {
	school: string
	gpa: string
	major: string
	degree: string
	start_year: number
	end_year: number
}

export interface ResumeProps {
	role: string
	bio: string
	linkedin_url: string
	website_url: string
	location: string
	highlights: string[]
	education: EducationProps
}

export default function EditProfilePage({ auth }: AuthUser) {
	const imageFileInputRef = useRef<HTMLInputElement>(null)
	const resumeData = usePage().props.resume as any
	const { data, processing, setData, patch, errors, transform } = useForm({
		user: {
			full_name: auth.user.full_name || "",
			resume: JSON.parse(resumeData) as ResumeProps,
			avatar: null as File | string | null
		},
	})
	const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(auth.user.avatar_url as string)

	const handleUploadImageBtnClick = () => {
		imageFileInputRef.current?.click()
	}

	const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (file && file.type.startsWith("image/")) {
			const url = URL.createObjectURL(file)
			setPreviewImageUrl(url)
			setData("user.avatar", file)
		}
	}

	const handleRemoveImage = () => {
		if (previewImageUrl) { URL.revokeObjectURL(previewImageUrl) }

		setPreviewImageUrl(null)
		setData("user.avatar", null)

		if (imageFileInputRef.current) {
			imageFileInputRef.current.value = ""
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		e.preventDefault()

		transform((latestData) => ({
			user: {
				full_name: latestData.user.full_name,
				resume: latestData.user.resume,
				// Only include avatar if a new File was picked
				...(latestData.user.avatar instanceof File && { avatar: latestData.user.avatar }),
			}
		}))

		patch("/settings/profile", {
			preserveScroll: true
		})
	}

	const handleAddHighlight = () => {
		if (data.user.resume.highlights.length < 4) {
			setData('user', {
				...data.user,
				resume: { ...data.user.resume, highlights: [...data.user.resume.highlights, ''] }
			})
		}
	}

	const handleHighlightChange = (index: number, value: string) => {
		const updated = [...data.user.resume.highlights]
		updated[index] = value
		setData('user', {
			...data.user,
			resume: { ...data.user.resume, highlights: updated }
		})
	}

	const handleRemoveHighlight = (index: number) => {
		if (data.user.resume.highlights.length > 1) {
			const updated = [...data.user.resume.highlights.filter((_, i) => i !== index)]
			setData('user', {
				...data.user,
				resume: { ...data.user.resume, highlights: updated }
			})
		}
	}

	return (
		<>
			<Head>
				<title>Edit profile</title>
			</Head>
			<div className="main-container py-16 flex flex-col text-[15px]">
				{createBreadcrumbs([{ label: "Settings", path: "/settings" }, { label: "Edit profile", path: "/settings/profile" }])}
				<div className="font-medium text-xl mt-4">Edit profile</div>
				<div className="text-subtle">Customize your work profile details.</div>
				<form onSubmit={handleSubmit}>
					<FieldGroup>
						<FieldSet className="mt-6">
							<FieldGroup>
								<Field orientation={"horizontal"}>
									<Avatar className={"w-16 h-16 aspect-square mr-2"}>
										<AvatarImage src={previewImageUrl || ""}></AvatarImage>
										<AvatarFallback>{auth.user.full_name[0]?.toUpperCase() || auth.user.username[0].toUpperCase()}</AvatarFallback>
									</Avatar>
									<Input ref={imageFileInputRef} onChange={handleImageFileChange} type="file" accept="image/*" className="hidden"></Input>
									<Button onClick={handleUploadImageBtnClick} variant={"secondary"}>Upload image</Button>
									{/* {previewImageUrl && <Button variant={"outline"} onClick={handleRemoveImage}>Delete image</Button>} */}
								</Field>
								<Field>
									<FieldLabel htmlFor="full_name">Full name</FieldLabel>
									<Input type="text" id="full_name" value={data.user.full_name} onChange={(e) => setData('user.full_name', e.target.value)} className="h-9 px-3" placeholder="Enter your full name"></Input>
								</Field>
								<FieldGroup className="grid grid-cols-2">
									<Field>
										<FieldLabel htmlFor="role">Role</FieldLabel>
										<Input type="text" id="role" value={data.user.resume.role} onChange={(e) => setData('user.resume.role', e.target.value)} className="h-9 px-3" placeholder="Enter your role (e.g Software Engineer)"></Input>
									</Field>
									<Field>
										<FieldLabel htmlFor="location">Location</FieldLabel>
										<InputGroup className="h-9">
											<InputGroupInput id="location" type="text" value={data.user.resume.location} className="h-9 px-3" onChange={(e) => setData('user.resume.location', e.target.value)} placeholder="Enter your location" />
											<InputGroupAddon>
												<MapPinIcon></MapPinIcon>
											</InputGroupAddon>
										</InputGroup>
									</Field>
								</FieldGroup>
								<Field>
									<FieldLabel htmlFor="about">About</FieldLabel>
									<Textarea value={data.user.resume.bio} id="about" placeholder="Describe yourself briefly" onChange={(e) => setData('user.resume.bio', e.target.value)}></Textarea>
								</Field>
							</FieldGroup>
						</FieldSet>
						<FieldSeparator className="my-2"></FieldSeparator>
						<FieldSet>
							<FieldLegend>Highlights</FieldLegend>
							<FieldDescription>Add concise highlights about yourself.</FieldDescription>
							<FieldGroup>
								{data.user.resume.highlights.map((item, index) => (
									<Field orientation={"horizontal"} key={index}>
										<Input value={item} onChange={(e) => handleHighlightChange(index, e.target.value)} placeholder={`Highlight ${index + 1}`}></Input>
										<Tooltip>
											<TooltipContent>Remove highlight</TooltipContent>
											{data.user.resume.highlights.length > 1 && (
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
							<FieldLegend>Education</FieldLegend>
							<FieldDescription>Show your formal academic degree.</FieldDescription>
							<FieldGroup className="grid grid-cols-2">
								<Field>
									<FieldLabel>School</FieldLabel>
									<Input type="text" value={data.user.resume.education.school || ""} placeholder="e.g California College of the Arts" onChange={(e) => setData('user.resume.education.school', e.target.value)}></Input>
								</Field>
								<Field>
									<FieldLabel>Degree</FieldLabel>
									<Input type="text" value={data.user.resume.education.degree || ""} placeholder="e.g Bachelor of Fine Arts" onChange={(e) => setData('user.resume.education.degree', e.target.value)} />
								</Field>
							</FieldGroup>
							<FieldGroup className="grid grid-cols-2">
								<Field>
									<FieldLabel>Start year</FieldLabel>
									<YearSelect value={data.user.resume.education.start_year} onChange={(e) => setData("user.resume.education.start_year", e)} />
								</Field>
								<Field>
									<FieldLabel>End year</FieldLabel>
									<YearSelect value={data.user.resume.education.end_year} onChange={(e) => setData("user.resume.education.end_year", e)} endYear={2040} />
								</Field>
							</FieldGroup>
							<FieldGroup className="grid grid-cols-2">
								<Field>
									<FieldLabel>Major</FieldLabel>
									<Input type="text" value={data.user.resume.education.major || ""} onChange={(e) => setData('user.resume.education.major', e.target.value)} placeholder="e.g Bachelor of Fine Arts" />
								</Field>
								<Field>
									<FieldLabel>GPA</FieldLabel>
									<Input type="decimal" value={data.user.resume.education.gpa || ""} placeholder="e.g 90" onChange={(e) => setData('user.resume.education.gpa', e.target.value)} />
								</Field>
							</FieldGroup>
						</FieldSet>
						<FieldSeparator className="my-2"></FieldSeparator>
						<FieldSet>
							<FieldLegend>Contact information</FieldLegend>
							<FieldDescription>Add your social links and contact information.</FieldDescription>
							<FieldGroup>
								<Field>
									<FieldLabel>Website</FieldLabel>
									<InputGroup>
										<InputGroupInput
											value={data.user.resume.website_url}
											aria-invalid={!!errors["user.resume.website_url"]}
											onChange={(e) => setData('user.resume.website_url', e.target.value)}
											placeholder="example.com" />
										<InputGroupAddon>
											<InputGroupText>https://</InputGroupText>
										</InputGroupAddon>
									</InputGroup>
									{errors["user.resume.website_url"] && <FieldError>{errors["user.resume.website_url"]}</FieldError>}
								</Field>
								<Field>
									<FieldLabel>LinkedIn</FieldLabel>
									<InputGroup>
										<InputGroupInput
											value={data.user.resume.linkedin_url}
											aria-invalid={!!errors["user.resume.linkedin_url"]}
											onChange={(e) => setData('user.resume.linkedin_url', e.target.value)}
											placeholder="/in/your-username" />
										<InputGroupAddon><LinkedInIcon size={16} className="opacity-75" /></InputGroupAddon>
									</InputGroup>
									{errors["user.resume.linkedin_url"] && <FieldError>{errors["user.resume.linkedin_url"]}</FieldError>}
								</Field>
							</FieldGroup>
						</FieldSet>
						<div className="mt-8 flex justify-end">
							<div className="w-fit">
								<Button disabled={processing} type="submit" size={"lg"} variant={processing ? "secondary" : "default"} className={"w-full"}>
									{processing ? <Spinner></Spinner> : null}
									Save profile
								</Button>
							</div>
							{/* <Spinner></Spinner> */}
						</div>
					</FieldGroup>
				</form>
			</div >
		</>
	)
}
