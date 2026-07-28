import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface YearSelectProps {
	value?: number | string
	onChange: (year: number) => void
	startYear?: number
}

export function ProjectYearSelect({
	value,
	onChange,
	startYear = 1980
}: YearSelectProps) {
	const currYear = new Date().getFullYear()
	const years = Array.from({ length: currYear - startYear + 1 }, (_, i) => currYear - i)

	return (
		<Select value={value ? String(value) : undefined} onValueChange={(val) => onChange(Number(val))}>
			<SelectTrigger>
				<SelectValue placeholder="Select year"></SelectValue>
			</SelectTrigger>
			<SelectContent>
				{years.map((year) => (
					<SelectItem key={year} value={String(year)}>
						{year}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}