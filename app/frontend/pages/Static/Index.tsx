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
						<h1 className="text-5xl tracking-tight leading-none">
							<span>A new way to showcase</span><br />
							<span>your professional work profile with</span><br />
							<span>a <i className="headline text-[54px] leading-[-1em]">clean</i> and <i className="headline text-[54px] leading-[-1em]">minimalistic</i> resume</span>
						</h1>
						<p className="max-w-md">Create a clean, privacy-friendly digital resume with built-in analytics in minutes — for free.</p>
						<div className="w-fit flex gap-2">
							<Button className={"px-4 h-9"} nativeButton={false} size={"lg"} render={<Link href={"/signup"} />}>Create your profile</Button>
							<Button className={"px-4 h-9"} nativeButton={false} size={"lg"} render={<Link href={"/login"} />} variant={"secondary"}>Sign in</Button>
						</div>
					</div>
					<div className="w-full flex-center rounded-md bg-card aspect-video mt-12">
						<div className="w-[1000px] aspect-video bg-white dark:bg-white/5"></div>
					</div>
				</div>
			</div>
		</>
	)
}

LandingPage.layout = (page: React.ReactNode) => page