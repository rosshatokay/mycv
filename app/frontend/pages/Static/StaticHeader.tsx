import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function StaticHeader() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<>
			<header className={cn(`fixed top-0 left-0 w-full h-16 bg-background z-2 transition border-b`, isScrolled ? "border-b" : "border-transparent")}>
				<div className="large-container flex items-center justify-between h-full relative z-2">
					<Link href={"/"} className="font-medium">highlight.cv</Link>
					<div className="flex gap-2">
						<Button nativeButton={false} variant={"ghost"} render={<Link href={"/login"} className="text-[15px]" />}>Log in</Button>
						<Button nativeButton={false} render={<Link href={"/register"} className="text-[15px]" />}>Create your profile</Button>
					</div>
				</div>
			</header>
			<div className="h-16"></div>
		</>
	)
}