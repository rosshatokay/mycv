import { marked } from "marked"
import StaticHeader from "./StaticHeader"
import StaticFooter from "./StaticFooter"
import { Head } from "@inertiajs/react"

interface PageProps {
	raw_terms: string
}

export default function TermsPage(props: PageProps) {
	const parsed = marked.parse(props.raw_terms)

	return (
		<>
			<Head>
				<title>Terms of Use</title>
				<meta name="description" content="Highlight.cv's terms of use." />
			</Head>
			<StaticHeader />
			<div className="main-container">
				<article className="pt-12">
					<div dangerouslySetInnerHTML={{ __html: parsed }}></div>
				</article>
			</div>
			<StaticFooter />
		</>
	)
}