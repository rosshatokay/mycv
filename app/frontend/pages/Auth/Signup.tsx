import { LogoIcon } from "@/assets/logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Head, Link, useForm } from "@inertiajs/react";

export default function SignupPage() {
	const queryParams = new URLSearchParams(window.location.search)
	const { data, setData, processing, post, errors, clearErrors } = useForm({
		user: {
			email: "",
			password: "",
			username: "",
			accept_tos: false
		}
	})

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()

		post('/registration')
	}

	return (
		<>
			<Head>
				<title>Sign up</title>
			</Head>
			<div className="w-full overflow-auto z-0">
				<div className="flex h-screen overflow-hidden">
					<div className="w-full overflow-auto">
						<div className="relative h-full">
							<div className="relative z-10 mx-auto py-8 sm:w-max sm:py-16">
								<div className="flex justify-center px-4">
									<LogoIcon size={36} fill="var(--primary)" />
								</div>
								<div className="mx-auto w-full bg-surface-white px-4 py-6 sm:w-96 sm:rounded-lg">
									<div className="text-center">
										<h1 className="font-medium text-xl leading-none tracking-tight text-ink-gray-9 mb-2">Create your free account</h1>
										<p className="text-subtle text-sm max-w-xs mx-auto">Create your free highligh.cv account to showcase your work.</p>
									</div>
									<div className="mt-6">
										<form onSubmit={handleSubmit}>
											<FieldSet>
												<FieldGroup className="">
													<Field>
														<FieldLabel htmlFor="name">Email address</FieldLabel>
														<Input id="name"
															type="email"
															required
															onChange={(e) => {
																setData('user.email', e.target.value)
																clearErrors('user.email')
															}}
															value={data.user.email || queryParams.get("email") || ""}
															autoComplete="off"
															className="h-10 px-3"
															placeholder="Enter your email address"
															aria-invalid={!!errors["user.email"]}
														/>
														{errors["user.email"] && <FieldError>{errors["user.email"]}</FieldError>}
														{/* <FieldDescription>This appears on invoices and emails.</FieldDescription> */}
													</Field>
													<Field>
														<FieldLabel htmlFor="password">Password</FieldLabel>
														<Input
															id="password"
															className="h-10 px-3"
															type="password"
															autoComplete="off"
															onChange={(e) => {
																setData('user.password', e.target.value)
																clearErrors('user.password')
															}}
															required
															placeholder="Enter your password"
															aria-invalid={!!errors['user.password']}
														/>
														{errors["user.password"] && <FieldError>{errors["user.password"]}</FieldError>}
														<FieldDescription className="text-xs">Should be at least 8 characters including a number and a lowercase letter.</FieldDescription>
													</Field>
													<Field>
														<FieldLabel htmlFor="username">Username</FieldLabel>
														<Input
															id="username"
															className="h-10 px-3"
															autoComplete="off"
															required
															type="text"
															onChange={(e) => {
																setData('user.username', e.target.value)
																clearErrors("user.username")
															}}
															placeholder="Enter a username"
															aria-invalid={!!errors["user.username"]}
														/>
														{errors["user.username"] && <FieldError>{errors["user.username"]}</FieldError>}
													</Field>
													<Field orientation={"horizontal"}>
														<Checkbox className={"mt-1"} id="accept-tos" onCheckedChange={(e) => {
															setData("user.accept_tos", e)
															clearErrors("user.accept_tos")
														}} />
														{/* <Label htmlFor="accept-tos" className="leading-normal text-subtle cursor-pointer">Accept highlight.cv's Terms of service and Privacy Policy.</Label> */}
														<div className="text-sm text-subtle">Accept highlight.cv's <Link href={"/terms"} className="underline">Terms of service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.</div>
													</Field>
													{errors["user.accept_tos"] && <FieldError>{errors["user.accept_tos"]}</FieldError>}
													<Field orientation="horizontal">
														{/* <Switch id="newsletter" /> */}
														<Button disabled={processing} type="submit" size={"lg"} variant={processing ? "secondary" : "default"} className={"w-full"}>
															{processing ? <Spinner></Spinner> : null}
															Create account
														</Button>
													</Field>
												</FieldGroup>
											</FieldSet>
										</form>
										<div className="mt-6 text-subtle">
											<div className="text-sm mb-2">Already have an account? <Link href={"/login"} className="underline text-foreground">Sign in</Link>.</div>
											{/* <div className="text-sm">By creating an account, you agree to Mycv's <a className="underline text-foreground">Terms of use</a> and <a className="underline text-foreground">Privacy policy</a>.</div> */}
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