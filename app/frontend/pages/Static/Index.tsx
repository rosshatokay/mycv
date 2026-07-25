import { LogoIcon } from "@/assets/logo"
import { Button } from "@/components/ui/button"
import { Head, Link } from "@inertiajs/react"

export default function LandingPage() {
	return (
		<>
			<Head>
				<title>Your page title</title>
				<meta name="description" content="Your page description" />
			</Head>
			<div className="pt-20">

				<div className="large-container">
					<div className="flex flex-col gap-8">
						<LogoIcon size={36} />
						<h1 className="text-5xl headline tracking-tight">
							<span>A new way to showcase</span><br />
							<span>your professional work profile with</span><br />
							<span>a <i>clean</i> and <i>minimalistic</i> resume</span>
						</h1>
						<p className="max-w-md">Create a clean, privacy-friendly digital resume with built-in analytics in minutes — for free.</p>
						<div className="w-fit flex gap-2">
							<Button className={"px-4 h-9 text-base"} size={"lg"} render={<Link href={"/register"}>Create your profile</Link>}></Button>
							<Button className={"px-4 h-9 text-base"} size={"lg"} variant={"secondary"}>Sign in</Button>
						</div>
					</div>
					<div className="w-full flex-center rounded-md bg-card aspect-video mt-12">
						<div className="w-[1000px] aspect-video bg-white"></div>
					</div>
				</div>
			</div>
		</>
	)
}