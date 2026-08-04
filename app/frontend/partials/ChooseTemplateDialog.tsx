import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ChooseTemplateDialogProps {
	isOpen: boolean
	setIsOpen: (state: boolean) => void
}

export default function ChooseTemplateDialog({ isOpen, setIsOpen }: ChooseTemplateDialogProps) {
	return (
		<Dialog open={isOpen} onOpenChange={(e) => !e ? setIsOpen(false) : undefined}>
			<DialogContent className={"sm:max-w-3xl"}>
				<DialogHeader>
					<DialogTitle>Choose a template</DialogTitle>
				</DialogHeader>
				<div className="grid grid-cols-3 gap-6 max-h-[50vh] overflow-y-auto -mx-4 px-4">
					<div className="bg-card aspect-[4/6] rounded-md"></div>
					<div className="bg-card aspect-[4/6] rounded-md"></div>
					<div className="bg-card aspect-[4/6] rounded-md"></div>
					<div className="bg-card aspect-[4/6] rounded-md"></div>
					<div className="bg-card aspect-[4/6] rounded-md"></div>
					<div className="bg-card aspect-[4/6] rounded-md"></div>
					<div className="bg-card aspect-[4/6] rounded-md"></div>
					<div className="bg-card aspect-[4/6] rounded-md"></div>
				</div>
				<DialogFooter>
					<Button>Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}