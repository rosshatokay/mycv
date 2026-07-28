import React from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Link } from "@inertiajs/react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export interface Breadcrumb {
	label: string
	path: string
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function createBreadcrumbs(breadcrumbs: Breadcrumb[]) {
	return (
		<div>
			<Breadcrumb>
				<BreadcrumbList>
					{
						breadcrumbs.map((item, i) => {
							return (
								<React.Fragment key={i}>
									<BreadcrumbItem>
										{
											(i < breadcrumbs.length - 1) 
											? <BreadcrumbLink render={<Link href={item.path}></Link>}>{item.label}</BreadcrumbLink>
											: <BreadcrumbPage>{item.label}</BreadcrumbPage>
										}
									</BreadcrumbItem>
									{i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
								</React.Fragment>

							)
						})
					}
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	)
}