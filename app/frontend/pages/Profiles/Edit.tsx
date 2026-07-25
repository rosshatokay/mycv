import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { AuthUser } from "@/interfaces/user";
import BaseLayout from "@/layouts/BaseLayout";
import { createBreadcrumbs } from "@/lib/utils";
import { useForm, usePage } from "@inertiajs/react";
import { MapPinIcon } from "lucide-react";
import { useRef, useState } from "react";

export interface ResumeAttributes {
	role: string
	bio: string
	location: string
}

export default function EditProfilePage({ auth }: AuthUser) {
	const imageFileInputRef = useRef<HTMLInputElement>(null)
	const resumeData = usePage().props.resume as any
	const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)
	const { data, processing, setData, patch } = useForm({
		user: {
			full_name: auth.user.full_name || "",
			resume_attributes: JSON.parse(resumeData) as ResumeAttributes
		},
	})

	console.log(data)
	
	const handleUploadImageBtnClick = () => {
		imageFileInputRef.current?.click()
	}

	const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (file && file.type.startsWith("image/")) {
			const url = URL.createObjectURL(file)
			setPreviewImageUrl(url)
		}
	}

	const handleRemoveImage = () => {
		if (previewImageUrl) { URL.revokeObjectURL(previewImageUrl) }

		setPreviewImageUrl(null)

		if (imageFileInputRef.current) {
			imageFileInputRef.current.value = ""
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		patch("/settings/profile", {
			preserveScroll: true
		})
	}

	return (
		<div className="main-container py-16 flex flex-col text-[15px]">
			{createBreadcrumbs([{ label: "Settings", path: "/settings" }, { label: "Edit profile", path: "/settings/profile" }])}
			<div className="font-medium text-xl mt-4">Edit profile</div>
			<div className="text-subtle">Customize your work profile details</div>
			<form onSubmit={handleSubmit}>
				<FieldGroup>
					<FieldSet className="mt-6">
						<FieldGroup>
							<Field orientation={"horizontal"}>
								<Avatar className={"w-16 h-16 aspect-square mr-2"}>
									<AvatarImage src={previewImageUrl || ""}></AvatarImage>
									<AvatarFallback>{auth.user.full_name[0]?.toUpperCase() || auth.user.username[0].toUpperCase()}</AvatarFallback>
								</Avatar>
								<Input ref={imageFileInputRef} onChange={handleImageFileChange} type="file" accept="image/jpeg,image/png" className="hidden"></Input>
								<Button onClick={handleUploadImageBtnClick} variant={"secondary"}>Upload image</Button>
								{previewImageUrl && <Button variant={"outline"} onClick={handleRemoveImage}>Delete image</Button>}
							</Field>
							<Field>
								<FieldLabel htmlFor="">Full name</FieldLabel>
								<Input type="text" value={data.user.full_name} onChange={(e) => setData('user.full_name', e.target.value)} className="h-9 px-3" placeholder="Enter your full name"></Input>
							</Field>
							<FieldGroup className="grid grid-cols-2">
								<Field>
									<FieldLabel htmlFor="">Role</FieldLabel>
									<Input type="text" value={data.user.resume_attributes.role} onChange={(e) => setData('user.resume_attributes.role', e.target.value)} className="h-9 px-3" placeholder="Enter your role (e.g Software Engineer)"></Input>
								</Field>
								<Field>
									<FieldLabel htmlFor="">Location</FieldLabel>
									<InputGroup className="h-9">
										<InputGroupInput type="text" value={data.user.resume_attributes.location} className="h-9 px-3" onChange={(e) => setData('user.resume_attributes.location', e.target.value)} placeholder="Enter your location" />
										<InputGroupAddon>
											<MapPinIcon></MapPinIcon>
										</InputGroupAddon>
									</InputGroup>
								</Field>
							</FieldGroup>
							<Field>
								<FieldLabel htmlFor="">About</FieldLabel>
								<Textarea value={data.user.resume_attributes.bio} placeholder="Describe yourself briefly" onChange={(e) => setData('user.resume_attributes.bio', e.target.value)}></Textarea>
							</Field>
						</FieldGroup>
					</FieldSet>
					<FieldSeparator className="my-4"></FieldSeparator>
					<FieldSet>
						<FieldLegend>Contact information</FieldLegend>
						<FieldDescription>Add your social links and contact information</FieldDescription>
						<FieldGroup>
							<Field>
								<FieldLabel>Website URL</FieldLabel>
								<InputGroup>
									<InputGroupInput></InputGroupInput>
									<InputGroupAddon>
										<InputGroupText>https://</InputGroupText>
									</InputGroupAddon>
								</InputGroup>
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
	)
}

EditProfilePage.layout = (page: React.ReactNode) => <BaseLayout>{page}</BaseLayout>