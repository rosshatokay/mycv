import { Template } from "@/components/templates/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useHttp } from "@inertiajs/react";
import { useEffect, useState } from "react";

interface ChooseTemplateDialogProps {
	isOpen: boolean
	setIsOpen: (state: boolean) => void
}

export default function ChooseTemplateDialog({ isOpen, setIsOpen }: ChooseTemplateDialogProps) {
	const { get, processing } = useHttp()
	const [templates, setTemplates] = useState<Template[] | null>(null)
	const getTemplates = () => {
		get('/api/templates', {
			onSuccess: (response) => {
				setTemplates(response as Template[])
			}
		})
	}

	useEffect(() => {
		if (isOpen && !templates) getTemplates()
	}, [isOpen])

	return (
		<Dialog open={isOpen} onOpenChange={(e) => !e ? setIsOpen(false) : undefined}>
			<DialogContent className={"sm:max-w-4xl h-[90vh] flex flex-col"}>
				<DialogHeader>
					<DialogTitle>Choose a template</DialogTitle>
				</DialogHeader>
				<div className="h-full overflow-y-auto -mx-4 px-4">
					{processing && <div className="flex-center w-full h-full"><Spinner className="size-8" /></div>}
					{templates && templates.length > 0 && (
						<div className="grid grid-cols-3 gap-6">
							{templates.map(template => (
								<div className="bg-card aspect-[4/5] rounded-md relative overflow-hidden">
									<img src={template.preview_image_url} className="absolute left-1/2 -translate-x-1/2 top-8 mx-auto sm:w-3/4 aspect-[3.5/6] object-cover rounded-md border-4" />
								</div>
							))}
						</div>
					)}
				</div>
				<DialogFooter>
					<Button>Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}