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
import { useForm } from "@inertiajs/react";
import { GlobeIcon, MapPinIcon } from "lucide-react";
import { useRef, useState } from "react";

export default function EditProfilePage({ auth }: AuthUser) {
	const imageFileInputRef = useRef<HTMLInputElement>(null)
	const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)
	const { data, processing, setData, patch } = useForm({
		full_name: auth.user.full_name || "",
		location: "",
		role: ""
	})

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
									<AvatarFallback>{auth.user.username[0].toUpperCase()}</AvatarFallback>
								</Avatar>
								<Input ref={imageFileInputRef} onChange={handleImageFileChange} type="file" accept="image/jpeg,image/png" className="hidden"></Input>
								<Button onClick={handleUploadImageBtnClick} variant={"secondary"}>Upload image</Button>
								{previewImageUrl && <Button variant={"outline"} onClick={handleRemoveImage}>Delete image</Button>}
							</Field>
							<Field>
								<FieldLabel htmlFor="">Full name</FieldLabel>
								<Input type="text" value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} className="h-9 px-3" placeholder="Enter your full name"></Input>
							</Field>
							<FieldGroup className="grid grid-cols-2">
								<Field>
									<FieldLabel htmlFor="">Role</FieldLabel>
									<Input type="text" className="h-9 px-3" placeholder="Enter your role (e.g Software Engineer)"></Input>
								</Field>
								<Field>
									<FieldLabel htmlFor="">Location</FieldLabel>
									<InputGroup className="h-9">
										<InputGroupInput type="text" className="h-9 px-3" placeholder="Enter your location" />
										<InputGroupAddon>
											<MapPinIcon></MapPinIcon>
										</InputGroupAddon>
									</InputGroup>
								</Field>
							</FieldGroup>
							<Field>
								<FieldLabel htmlFor="">About</FieldLabel>
								<Textarea placeholder="Describe yourself briefly"></Textarea>
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
						<Button disabled={processing} type="submit" size={"lg"} variant={processing ? "secondary" : "default"} className={"w-full"}>
							{processing ? <Spinner></Spinner> : null}
							Save profile
						</Button>
						{/* <Spinner></Spinner> */}
					</div>
				</FieldGroup>
			</form>
		</div >
	)
}

EditProfilePage.layout = (page: React.ReactNode) => <BaseLayout>{page}</BaseLayout>