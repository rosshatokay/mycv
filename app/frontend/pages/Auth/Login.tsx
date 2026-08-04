import { LogoIcon } from "@/assets/logo";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Head, Link, useForm } from "@inertiajs/react";

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
		<>
			<Head>
				<title>Log in</title>
				<meta name="description" content="Log in to your highlight.cv account."></meta>
			</Head>
			<div className="w-full overflow-auto z-0">
				<div className="flex min-h-svh flex-center overflow-hidden">
					<div className="w-full overflow-auto">
						<div className="relative h-full">
							<div className="relative z-10 mx-auto py-8 sm:w-max sm:py-16">
								<div className="flex justify-center px-4">
									<div className="sm:w-10 w-9 aspect-square rounded-lg bg-white dark:hidden flex-center" style={{ boxShadow: "0px 8px 16px rgba(1,1,1,.05)" }}>
										<LogoIcon size={24} fill="var(--primary)" />
									</div>
									<div className="sm:w-10 w-9 aspect-square rounded-lg bg-white hidden dark:flex flex-center" style={{ boxShadow: "0px 8px 16px rgba(1,1,1,.05)" }}>
										<LogoIcon size={24} fill="var(--background)" />
									</div>
								</div>
								<div className="mx-auto w-full bg-surface-white px-4 py-6 sm:w-96 sm:rounded-lg">
									<div className="text-center">
										<h1 className="font-medium text-xl leading-none tracking-tight text-ink-gray-9 mb-2">Log in to your account</h1>
										<p className="text-subtle text-sm max-w-xs mx-auto">Welcome back, sign in to your account below.</p>
									</div>
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
															{/* <Link className="underline text-sm">Forgot password</Link> */}
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
														<Button disabled={processing} type="submit" size={"lg"} variant={processing ? "secondary" : "default"} className={"w-full"}>
															{processing ? <Spinner></Spinner> : null}
															Log in
														</Button>
													</Field>
												</FieldGroup>
											</FieldSet>
										</form>
										<div className="mt-6 text-subtle">
											<div className="text-sm mb-2">Don't have an account? <Link href={"/signup"} className="underline text-foreground">Sign up for free</Link>.</div>
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}