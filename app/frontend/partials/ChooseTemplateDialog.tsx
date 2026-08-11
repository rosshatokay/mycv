import { Template } from "@/components/templates/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { useHttp } from "@inertiajs/react";
import { useEffect, useState } from "react";

interface ChooseTemplateDialogProps {
	isOpen: boolean
	setIsOpen: (state: boolean) => void
}

export default function ChooseTemplateDialog({ isOpen, setIsOpen }: ChooseTemplateDialogProps) {
	const { get, processing } = useHttp()
	const [templates, setTemplates] = useState<Template[] | null>(null)
	const [chosenTemplate, setChosenTemplate] = useState<Template['id'] | null>(null)
	const getTemplates = () => {
		get('/api/templates', {
			onSuccess: (response) => {
				setTemplates(response as Template[])
			}
		})
	}
	const templateHttp = useHttp({ template_id: chosenTemplate })

	const handleSubmit = () => {
		templateHttp.patch("/settings/templates", {
			onSuccess: (res: any) => {
				if (res.success) location.reload()
			},
			onError: () => console.log('error'),
			onHttpException: (e) => {
				setIsOpen(false)
				toast.add({
					description: "Something went wrong. Try again."
				})
			}
		})
	}

	// console.log(templateHttp.)
	// toast.add({description: "hey"})
	
	useEffect(() => {
		if (isOpen && !templates) getTemplates()
		if (!isOpen) setChosenTemplate(null)
	}, [isOpen])

	useEffect(() => {
		templateHttp.setData({template_id: chosenTemplate})
	}, [chosenTemplate])

	return (
		<Dialog open={isOpen} onOpenChange={(e) => !e ? setIsOpen(false) : undefined}>
			<DialogContent className={"sm:max-w-4xl h-[90vh] flex flex-col"}>
				<DialogHeader>
					<DialogTitle>Choose a template</DialogTitle>
				</DialogHeader>
				<div className="h-full overflow-y-auto py-4 -mx-4 px-4">
					{processing && <div className="flex-center w-full h-full"><Spinner className="size-8" /></div>}
					{templates && templates.length > 0 && (
						<div className="grid grid-cols-3 gap-6">
							{templates.map(template => {
								const isChosen = template.id === chosenTemplate

								return (
									<div
										key={template.id}
										onClick={() => setChosenTemplate(template.id)}
										className={cn(`bg-card ring-2 
											ring-transparent cursor-pointer 
											rounded-md relative 
											transition aspect-square
											flex flex-col`, isChosen ? "ring-primary" : "hover:ring-primary/30")}
									>
										<div className="w-full h-full overflow-hidden">
											<img src={template.preview_image_url} className="mx-auto mt-8 sm:w-3/4 aspect-[3.5/6] object-cover rounded-md border-4" />
										</div>
										<div className="p-2">{template.name}</div>
									</div>
								)
							})}
						</div>
					)}
				</div>
				<DialogFooter>
					<Button disabled={!chosenTemplate || templateHttp.processing} onClick={handleSubmit}>
						{templateHttp.processing && <Spinner />}
						Continue
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}