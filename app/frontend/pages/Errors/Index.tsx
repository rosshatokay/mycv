import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

interface ErrorPageProps {
	status_code: 400 | 404 | 422 | 500
	title: string
	description: string
}

export default function ErrorsPage(props: ErrorPageProps) {
	const HomeButton = () => <Button variant={"secondary"} nativeButton={false} render={<Link href={"/"} />}>Go home</Button>
	const RefreshButton = () => <Button variant={"outline"} onClick={() => location.reload()}>Refresh page</Button>

	return (
		<>
			<div className="w-full h-svh flex-center flex-col text-center">
				<h1 className="font-medium text-4xl mb-4">{props.status_code}</h1>
				<h2 className="text-xl font-medium mb-1">{props.title}</h2>
				<p className="text-subtle mb-6 max-w-sm">{props.description}</p>
				<div className="flex gap-2">
					<HomeButton />
					{props.status_code !== 404 && <RefreshButton />}
				</div>
			</div>
		</>
	)
}