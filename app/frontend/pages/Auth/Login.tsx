import { LogoIcon } from "@/assets/logo";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Link, useForm } from "@inertiajs/react";

export default function LoginPage() {
	const { data, setData, post, processing, errors, clearErrors } = useForm({
		email: "",
		password: ""
	})

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		post("/session")
	}

	return (
		<div className="w-full overflow-auto z-0">
			<div className="flex h-screen overflow-hidden">
				<div className="w-full overflow-auto">
					<div className="relative h-full">
						<div className="relative z-10 mx-auto py-8 sm:w-max sm:py-16">
							<div className="flex flex-col px-4">
								<LogoIcon size={36} />
							</div>
							<div className="mx-auto w-full bg-surface-white px-4 py-6 sm:w-96 sm:rounded-lg">
								<h1 className="text-xl leading-5 tracking-tight text-ink-gray-9 mb-2">Sign in to your account</h1>
								<p className="text-subtle text-sm">A new way to showcase your work</p>
								<div className="mt-6">
									<form onSubmit={handleSubmit}>
										<FieldSet>
											<FieldGroup>
												<Field>
													<FieldLabel htmlFor="name">Email address</FieldLabel>
													<Input id="name"
														type="email"
														required
														onChange={(e) => {
															setData('email', e.target.value)
															clearErrors('email')
														}}
														value={data.email}
														className="h-10 px-3"
														placeholder="Enter your email address"
														aria-invalid={!!errors.email}
													/>
													{errors.email && <FieldError>{errors.email}</FieldError>}
													{/* <FieldDescription>This appears on invoices and emails.</FieldDescription> */}
												</Field>
												<Field>
													<div className="flex justify-between">
														<FieldLabel htmlFor="password">Password</FieldLabel>
														<Link className="underline text-sm">Forgot password</Link>
													</div>
													<Input
														id="password"
														className="h-10 px-3"
														type="password"
														autoComplete="off"
														placeholder="Enter your password" 
														onChange={(e) => {
															setData('password', e.target.value)
															clearErrors('password')
														}}
													/>
													{/* <FieldError>Choose another username.</FieldError> */}
												</Field>
												<Field orientation="horizontal">
													{/* <Switch id="newsletter" /> */}
													<Button disabled={processing} type="submit" size={"lg"} variant={processing ? "secondary" : "default"} className={"w-full rounded-full"}>
														{processing ? <Spinner></Spinner> : null}
														Sign in
													</Button>
												</Field>
											</FieldGroup>
										</FieldSet>
									</form>
									<div className="mt-6 text-subtle">
										<div className="text-sm mb-2">Don't have an account? <Link href={"/register"} className="underline text-foreground">Sign up for free</Link>.</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}