import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { AuthUser } from "@/interfaces/user";
import { createBreadcrumbs } from "@/lib/utils";
import { useForm } from "@inertiajs/react";

export default function SecurityPage({ auth }: AuthUser) {
	const { data, setData, patch, processing } = useForm({
		email: auth.user.email,
		new_password: "",
		password_confirmation: ""
	})

	const handleSubmit = (e: React.ChangeEvent) => {
		e.preventDefault()
		patch("/settings/security")
	}
	
	return (
		<div className="main-container py-16">
			{createBreadcrumbs([{ label: "Settings", path: "/settings" }, { label: "Login & Security", path: "/settings/security" }])}
			<div className="font-medium text-xl mt-4">Edit log in credentials</div>
			<div className="text-subtle">Change your log in password.</div>
			<form className="mt-6" onSubmit={handleSubmit}>
				<FieldSet>
					<FieldGroup>
						<Field>
							<div className="flex gap-0.5">
								<FieldLabel htmlFor="email">Email address</FieldLabel>
								{/* <span className="text-destructive">*</span> */}
							</div>
							<Input id="email" type="email" value={auth.user.email} placeholder="Enter your email address" readOnly disabled />
							<FieldDescription className="text-xs">You cannot change your email at this moment.</FieldDescription>
						</Field>
						<Field>
							<div className="flex gap-0.5">
								<FieldLabel htmlFor="password">New password</FieldLabel>
								<span className="text-destructive">*</span>
							</div>
							<Input
								id="password"
								type="password"
								placeholder="Enter a new password"
								onChange={(e) => setData("new_password", e.target.value)}
							/>
						</Field>
						<Field>
							<div className="flex gap-0.5">
								<FieldLabel htmlFor="password_confirmation">Confirm password</FieldLabel>
								<span className="text-destructive">*</span>
							</div>
							<Input
								id="password_confirmation"
								type="password"
								placeholder="Confirm your new password"
								onChange={(e) => setData("password_confirmation", e.target.value)}
							/>
						</Field>
					</FieldGroup>
				</FieldSet>
				<div className="fixed w-full bottom-0 left-0 bg-background/50 backdrop-blur-sm h-16 flex items-center">
					<div className="main-container px-5">
						<div className="flex justify-between py-4">
							<span className="text-sm">
								<span className="text-[var(--destructive)]">*</span>
								<span> required</span>
							</span>
							<div className="w-fit">
								<Button disabled={processing} type="submit" size={"lg"} variant={processing ? "secondary" : "default"} className={"w-full"}>
									{processing ? <Spinner></Spinner> : null}
									Save
								</Button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}