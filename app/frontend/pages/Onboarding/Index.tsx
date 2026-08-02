import { LogoIcon } from "@/assets/logo";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { AuthUser } from "@/interfaces/user";
import { FormDataErrors } from "@inertiajs/core";
import { Head, SetDataAction, useForm } from "@inertiajs/react";
import ProfileStep from "./steps/ProfileStep";
import AboutStep from "./steps/AboutStep";
import { CheckIcon } from "lucide-react";
import { ResumeProps } from "../Settings/EditProfile";
import HighlightsStep from "./steps/HighlightsStep";

export interface OnboardingFormDataProps {
	props: OnboardingStepProps
}

interface OnboardingDataProps {
	user: {
		avatar: File | string | null,
		full_name: string,
		resume: {
			role: string
			bio: string
			location: string
			highlights: string[]
		}
	},
}

export interface OnboardingStepProps {
	data: OnboardingDataProps
	setData: SetDataAction<OnboardingDataProps>
	errors: FormDataErrors<OnboardingDataProps>
}

interface PageProps {
	auth: AuthUser['auth']
	steps: {
		profile_completed: boolean
		about_completed: boolean
		highlights_completed: boolean
	},
	resume: ResumeProps
}

const STEP_COMPONENTS = {
	profile: ProfileStep,
	about: AboutStep,
	highlights: HighlightsStep,
	complete: null
}

const STEPS = [
	{ id: 'profile', title: "Create profile", description: "Add details to your public profile" },
	{ id: 'about', title: "Add more details", description: "Add more details about your public profile." },
	{ id: 'highlights', title: "Add highlights", description: "Add short highlights to your public profile." },
]

export default function OnboardingPage({ auth, steps, resume }: PageProps) {
	const { data, setData, patch, processing, errors } = useForm({
		user: {
			avatar: null as File | string | null,
			full_name: auth.user.full_name || "",
			resume: {
				role: resume.role,
				bio: resume.bio,
				location: resume.location,
				highlights: resume.highlights || [""]
			}
		}
	})

	const currentStepId = !steps.profile_completed ? 'profile'
		: !steps.about_completed ? 'about'
			: !steps.highlights_completed ? 'highlights'
				: 'complete'

	const ActiveComponent = STEP_COMPONENTS[currentStepId]
	const currStep = STEPS.find(o => o.id === currentStepId)
	const currStepIndex = STEPS.findIndex(o => o.id === currentStepId)

	const handleSubmit = (e: React.ChangeEvent) => {
		e.preventDefault()
		console.log(data)
		patch("/onboarding")
	}

	return (
		<>
			<Head>
				<title>Set up account</title>
			</Head>
			<div className="w-full overflow-auto z-0">
				<div className="absolute top-4 left-4">
					<LogoIcon size={32} fill="var(--subtle)" />
				</div>
				<div className="flex h-screen overflow-hidden">
					<div className="w-full overflow-auto">
						<div className="relative h-full pb-25">
							<div className="relative z-10 mx-auto py-8 sm:w-max sm:py-16 h-full flex items-center">
								<div className="mx-auto w-full bg-surface-white px-4 py-6 sm:w-96 sm:rounded-lg">
									<div className="text-center">
										<h1 className="font-medium text-xl leading-none tracking-tight text-ink-gray-9 mb-2">{currStep?.title}</h1>
										<p className="text-subtle text-sm max-w-xs mx-auto">{currStep?.description}</p>
									</div>
									<form onSubmit={handleSubmit}>
										<FieldGroup className="mt-6 gap-8">
											{ActiveComponent && (
												<ActiveComponent props={{ data, setData, errors }} />
											)}
											<Button type="submit" className={processing ? "secondary" : "default"} disabled={processing}>
												{processing ? <Spinner></Spinner> : null}
												Continue
											</Button>
										</FieldGroup>
									</form>
									<div className="flex items-center gap-2 mt-6 justify-center">
										{STEPS.map((_, index) => {
											if (index < currStepIndex) { return <span key={index} className="text-subtle"><CheckIcon size={16} /></span> }
											if (index > currStepIndex) { return <span key={index} className="w-2.5 aspect-square bg-foreground/40 rounded-full block"></span> }
											if (index == currStepIndex) { return <span key={index} className="w-2.5 aspect-square border border-foreground/75 rounded-full block"></span> }
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}