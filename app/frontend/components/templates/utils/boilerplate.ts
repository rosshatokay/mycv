import { ProjectItemProps } from "@/interfaces/projectItemProps";
import { useEffect, useRef, useState } from "react";

export const Boilerplate = () => {
	const floatingTopBarTargetRef = useRef(null)

	const [activeProject, setActiveProject] = useState<ProjectItemProps['project'] | null>(null)
	const [isViewingAsGuest, setIsViewingAsGuest] = useState<boolean>(false)
	const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false)
	const [isChooseTempDialogOpen, setIsChooseTempDialogOpen] = useState<boolean>(false)
	const [isPast, setIsPast] = useState<boolean>(false)

	useEffect(() => {
		const target = floatingTopBarTargetRef.current;
		if (!target) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				// boundingClientRect.top < 0 means the element's top has moved above the viewport view
				// !entry.isIntersecting means the element is no longer visible in the view
				if (entry.boundingClientRect.top < 0 && !entry.isIntersecting) {
					setIsPast(true);
				} else {
					setIsPast(false);
				}
			},
			{
				threshold: 0, // triggers as soon as even 1 pixel changes visibility
			}
		);

		observer.observe(target);

		// Clean up observer on component unmount
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const userAside = document.getElementById('main-aside')
		if (isViewingAsGuest) {
			userAside?.classList.add('opacity-0', 'pointer-events-none')
		} else {
			userAside?.classList.remove('opacity-0', 'pointer-events-none')
		}
	}, [isViewingAsGuest])

	return {
		floatingTopBarTargetRef,
		isViewingAsGuest,
		setIsViewingAsGuest,
		isShareDialogOpen,
		setIsShareDialogOpen,
		isPast,
		setIsPast,
		activeProject,
		setActiveProject,
		isChooseTempDialogOpen,
		setIsChooseTempDialogOpen
	}
}
