import { Project } from "@/interfaces/project"
import { AuthUser } from "@/interfaces/user"
import { WorkExperience } from "@/interfaces/workExperience"
import { EducationProps, ResumeProps } from "@/pages/Settings/EditProfile"

export interface TemplateDataProps {
	auth: AuthUser['auth'],
	user: {
		id: string
		email: string
		avatar_url?: string
		username: string,
		highlights: string[]
		full_name: string
	},
	is_owner: boolean
	projects: Project[]
	resume: ResumeProps
	education: EducationProps
	work_experiences: WorkExperience[]
}

export interface TemplateComponentProps {
	data: TemplateDataProps,
	isPreview?: boolean
}