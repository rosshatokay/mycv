import { OnboardingFormDataProps } from "../Index";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { MapPinIcon } from "lucide-react";

export default function AboutStep({ props }: OnboardingFormDataProps) {
	const { data, setData, errors } = props

	return (
		<>
			<FieldGroup>
				<Field>
					<div className="flex gap-0.5">
						<FieldLabel htmlFor="role">Role</FieldLabel>
						<span className="text-destructive">*</span>
					</div>
					<Input
						required
						type="text"
						id="role"
						value={data.user.resume.role}
						onChange={(e) => setData('user.resume.role', e.target.value)}
						className="h-9 px-3"
						placeholder="Enter your role (e.g Software Engineer)"
						aria-invalid={!!errors["user.resume.role"]}
					/>
					{errors["user.resume.role"] && <FieldError>{errors["user.resume.role"]}</FieldError>}
				</Field>
				<Field>
					<div className="flex gap-0.5">
						<FieldLabel htmlFor="location">Location</FieldLabel>
						<span className="text-destructive">*</span>
					</div>
					<InputGroup className="h-9">
						<InputGroupInput
							required
							id="location"
							type="text"
							value={data.user.resume.location}
							className="h-9 px-3"
							onChange={(e) => setData('user.resume.location', e.target.value)}
							placeholder="Enter your location" 
							aria-invalid={!!errors["user.resume.location"]}
						/>
						<InputGroupAddon>
							<MapPinIcon />
						</InputGroupAddon>
					</InputGroup>
					{errors["user.resume.location"] && <FieldError>{errors["user.resume.location"]}</FieldError>}
				</Field>
				<Field>
					<div className="flex gap-0.5">
						<FieldLabel htmlFor="about">About</FieldLabel>
						<span className="text-destructive">*</span>
					</div>
					<Textarea
						value={data.user.resume.bio}
						id="about"
						placeholder="Describe yourself briefly"
						aria-invalid={!!errors["user.resume.bio"]}
						onChange={(e) => setData('user.resume.bio', e.target.value)}></Textarea>
					{errors["user.resume.bio"] && <FieldError>{errors["user.resume.bio"]}</FieldError>}
				</Field>
			</FieldGroup>
		</>
	)
}