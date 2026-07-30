import { marked } from "marked"
import StaticHeader from "./StaticHeader"
import StaticFooter from "./StaticFooter"

interface PageProps {
	raw_privacy: string
}

export default function PrivacyPage(props: PageProps) {
	const parsed = marked.parse(props.raw_privacy)

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