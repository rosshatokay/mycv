import { toast, Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthUser } from "@/interfaces/user";
import UserAside from "@/partials/UserAside";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren, useEffect } from "react";

interface FlashProps {
	toast?: {
		title?: string
		description?: string
		variant?: 'default' | 'destructive'
	}
}

export default function BaseLayout({ children }: PropsWithChildren) {
	const { auth }: AuthUser = usePage().props as any
	const flash = usePage().flash as FlashProps
	const currComponent = usePage().component
	const shouldHideAside = ["Static/", "Auth/", "Onboarding/", "Errors/"].some(prefix => currComponent.startsWith(prefix))

	useEffect(() => {
		if (flash?.toast) {
			toast.add({
				timeout: 3000,
				description: flash.toast.description,
			})
		}
	})

	return (
		<div>
			{auth?.user != null && !shouldHideAside && <UserAside auth={auth} />}
			<main id="main" className="transition">
				{children}
			</main>
			<Toaster></Toaster>
			<TooltipProvider delay={0}></TooltipProvider>
		</div>
	)
}