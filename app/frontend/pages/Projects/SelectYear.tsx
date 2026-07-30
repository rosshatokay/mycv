import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface YearSelectProps {
	value?: number | string
	onChange: (year: number) => void
	startYear?: number,
	endYear?: number
}

export function YearSelect({
	value,
	onChange,
	startYear = 1980,
	endYear = new Date().getFullYear()
}: YearSelectProps) {
	const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i)

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