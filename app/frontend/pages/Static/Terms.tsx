import { marked } from "marked"
import StaticHeader from "./StaticHeader"
import StaticFooter from "./StaticFooter"

interface PageProps {
	raw_terms: string
}

export default function TermsPage(props: PageProps) {
	const parsed = marked.parse(props.raw_terms)

	return (
		<>
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