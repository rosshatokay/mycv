import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Project } from "@/interfaces/project"
import { AuthUser } from "@/interfaces/user"
import BaseLayout from "@/layouts/BaseLayout"
import { Head, Link } from "@inertiajs/react"
import { ArrowUpRight } from "lucide-react"

interface ProfilePageProps {
	auth: AuthUser['auth'],
	user: {
		id: string
		email: string
		username: string,
		bio: string[]
		full_name: string
	},
	projects: Project[]
}

export default function ProfilePage(props: ProfilePageProps) {
	const isOwner = props.auth.user.id === props.user.id

	return (
		<>
			<Head>
				<title>{props.user.full_name}</title>
			</Head>
			<div className="main-container py-20 flex flex-col gap-16 text-[15px]">
				<section className="flex flex-col gap-8">
					<div>
						<Avatar size="lg" className={"mb-4"}>
							<AvatarImage src="https://github.com/shadcn.png" alt={`@${props.user.username}'s picture`}></AvatarImage>
							<AvatarFallback>{props.user.username[0].toUpperCase()}</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<div className="font-medium text-base">{props.user.username}</div>
							<div className="text-subtle">Software design & engineering</div>
							<div className="text-subtle">London, UK</div>
						</div>
					</div>
					<ul className="flex flex-col gap-2 list-[lower-roman] px-4 marker:text-subtle/70 max-w-3/4">
						{props.user.bio.map(item => (
							<li key={item} className="pl-2">{item}</li>
						))}
					</ul>
					<div className="flex justify-between">
						<div className="w-fit flex gap-1">
							<Button variant={"secondary"} size={"lg"} nativeButton={false} className={"px-3"} render={<a href="https://google.com" target="_blank">Website</a>}></Button>
							<Button variant={"outline"} size={"lg"} className={"px-3"}>Copy email</Button>
							<Button variant={"outline"} size={"lg"} className={"px-3"}>Copy phone</Button>
						</div>
						{isOwner && <Button nativeButton={false} variant={"ghost"} size={"lg"} className={"px-3 rounded-full"} render={<Link href={"/settings/profile"}></Link>}>Edit profile</Button>}
					</div>
				</section>
				<section>
					<div className="text-subtle mb-4">Projects</div>
					<div className="flex flex-col gap-10">

						{props.projects.map(project => (
							<div key={project.id} className="grid grid-cols-[148px_1fr] overflow-hidden">
								<div>
									<div className="text-subtle">{project.year}</div>
								</div>
								<div className="min-w-0">
									<a href="" target="_blank" className="w-fit flex items-center group">
										<span className="group-hover:underline font-medium">{project.title}</span>
										<ArrowUpRight size={15} className="opacity-50 group-hover:opacity-100 transition" />
									</a>
									<div className="text-subtle">Social e-reading website platform</div>
									<ul className="my-3 pl-5 flex flex-col gap-2 list-disc marker:text-subtle">
										{project.points.map(item => (<li key={item}>{item}</li>))}
									</ul>
									<div className="mt-4 flex gap-2">
										<div className="bg-card rounded-md min-w-40 aspect-video"></div>
										<div className="bg-card rounded-md min-w-40 aspect-video"></div>
										<div className="bg-card rounded-md min-w-40 aspect-video"></div>
										<div className="bg-card rounded-md min-w-40 aspect-video"></div>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
				<section>
					<div className="text-subtle mb-4">Education</div>
					<div className="grid grid-cols-[148px_1fr] overflow-hidden">
						<div>
							<div className="text-subtle">2022 — 2026</div>
						</div>
						<div>
							<div className="font-medium">B.Sc Software Engineering</div>
							<div className="text-subtle">Harvard University, USA</div>
							<div className="text-subtle">Specialization in Data Science and Machine Learning</div>
						</div>
					</div>
				</section>
				{!props.auth && <div className="fixed bottom-8 left-8 max-w-[200px]">
					<div className="text-subtle text-sm">
						Powered by MyCV. Create your own work profile for free.
					</div>
				</div>}

			</div>
		</>
	)
}

ProfilePage.layout = (page: React.ReactNode) => <BaseLayout>{page}</BaseLayout>