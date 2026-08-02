import { Project } from "./project"

export interface ProjectItemProps {
	project: Project
	onSelect?: (project: any) => void
}