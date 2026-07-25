import { toast, Toaster } from "@/components/ui/toast";
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
			{auth?.user != null && <UserAside auth={auth} />}
			<main>
				{children}
			</main>
			<Toaster></Toaster>
		</div>
	)
}