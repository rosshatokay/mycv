import { useRef, useState } from "react";
import { OnboardingFormDataProps } from "../Index";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ImageIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileStep({ props }: OnboardingFormDataProps) {
	const { data, setData, errors } = props
	const imageFileInputRef = useRef<HTMLInputElement>(null)
	const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)

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

	return (
		<>
			<Field>
				<FieldLabel>Picture</FieldLabel>
				<Field orientation={"horizontal"}>
					<Avatar className={"w-18 h-18 aspect-square mr-2"}>
						{previewImageUrl && <AvatarImage src={previewImageUrl}></AvatarImage>}
						<AvatarFallback><ImageIcon /></AvatarFallback>
					</Avatar>
					<div>
						<div className="flex gap-2">
							<Button onClick={handleUploadImageBtnClick} variant={"secondary"}>Upload image</Button>
							{previewImageUrl && <Button variant={"outline"} size={"icon"} onClick={handleRemoveImage}>
								<TrashIcon />
							</Button>}
						</div>
						<div className="text-xs mt-2 text-subtle">Upload a square JPG, PNG, or WEBP image under 5MB.</div>
					</div>
					<Input ref={imageFileInputRef} onChange={handleImageFileChange} type="file" accept="image/*" className="hidden"></Input>
				</Field>
			</Field>
			<Field>
				<div>
					<div className="flex gap-0.5">
						<FieldLabel>Full name</FieldLabel>
						<span className="text-destructive">*</span>
					</div>
					<FieldDescription className="text-xs">As will be displayed on your public profile.</FieldDescription>
				</div>
				<Input
					type="text"
					id="first_name"
					value={data.user.full_name}
					required
					onChange={(e) => setData('user.full_name', e.target.value)}
					placeholder="Enter your full name"
					aria-invalid={!!errors["user.full_name"]}
				/>
				{errors["user.full_name"] && <FieldError>{errors["user.full_name"]}</FieldError>}
			</Field>
		</>
	)
}