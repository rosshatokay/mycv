import { Button } from "@/components/ui/button";
import { OnboardingFormDataProps } from "../Index";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PlusIcon, TrashIcon } from "lucide-react";

export default function HighlightsStep({ props }: OnboardingFormDataProps) {
	const { data, setData, errors } = props

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
			<FieldGroup>
				{data.user.resume.highlights.map((item, index) => (
					<Field orientation={"horizontal"} key={index}>
						<Input value={item} onChange={(e) => handleHighlightChange(index, e.target.value)} placeholder={`Highlight ${index + 1}`}></Input>
						<Tooltip>
							<TooltipContent>Remove highlight</TooltipContent>
							{data.user.resume.highlights.length > 1 && (
								<TooltipTrigger delay={0} render={<Button variant={"ghost"} onClick={() => handleRemoveHighlight(index)} size={"icon-lg"}><TrashIcon color="var(--subtle)" /></Button>}></TooltipTrigger>
							)}
						</Tooltip>
					</Field>
				))}
				<Button size={"sm"} variant={"secondary"} className={"w-fit"} onClick={handleAddHighlight}>
					<PlusIcon />
					Add highlight
				</Button>
			</FieldGroup>
		</>
	)
}