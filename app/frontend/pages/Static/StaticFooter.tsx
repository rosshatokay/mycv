import { LogoIcon } from "@/assets/logo"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"

export default function StaticFooter() {
	return (
		<footer className="py-8 mt-25 border-t">
			<div className="large-container flex items-center justify-between">
				<div className="flex items-center gap-1 opacity-60">
					<LogoIcon></LogoIcon>
					<div className="font-medium">highlight.cv</div>
				</div>
				<div className="flex gap-4 text-sm">
					<Button nativeButton={false} variant={"link"} render={<Link href={"/terms"} />} className={"!h-initial text-subtle !py-0"}>Terms of service</Button>
					<Button nativeButton={false} variant={"link"} render={<Link href={"/privacy"} />} className={"!h-initial text-subtle !py-0"}>Privacy policy</Button>
					{/* <Link>Privacy policy</Link> */}
				</div>
			</div>
		</footer>
	)
}