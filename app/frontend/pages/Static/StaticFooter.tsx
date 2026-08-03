import { LogoIcon } from "@/assets/logo"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"

export default function StaticFooter() {
	return (
		<footer className="py-8 mt-16">
			<div className="medium-container flex sm:items-center sm:justify-between sm:flex-row flex-col">
				<div className="flex items-center gap-1 opacity-60 sm:mb-0 mb-4">
					<LogoIcon></LogoIcon>
					<div className="font-medium">highlight.cv</div>
				</div>
				<div className="flex flex-wrap sm:gap-4 sm:flex-row flex-col gap-1 text-sm">
					<Button nativeButton={false} variant={"link"} render={<Link href={"/terms"} />} className={"!h-initial text-subtle !py-0 w-fit px-0"}>Terms of service</Button>
					<Button nativeButton={false} variant={"link"} render={<Link href={"/privacy"} />} className={"!h-initial text-subtle !py-0 w-fit px-0"}>Privacy policy</Button>
					{/* <Link>Privacy policy</Link> */}
				</div>
			</div>
		</footer>
	)
}