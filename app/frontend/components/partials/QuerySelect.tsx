import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { router } from "@inertiajs/core"

interface Props {
  endpoint: string
  defaultValue?: string
  items: { label: string, value: string }[]
  paramKey: string
  triggerIcon?: React.ReactNode
  placeholder?: string
}

export default function QuerySelect({ 
  endpoint, 
  defaultValue, 
  items, 
  paramKey, 
  triggerIcon, 
  placeholder = "Select..." 
}: Props) {
  const handleValueChange = (newValue: string | null) => {
    const params = new URLSearchParams(window.location.search)
    
    if (newValue) {
      params.set(paramKey, newValue)
    } else {
      params.delete(paramKey)
    }

    router.get(endpoint, Object.fromEntries(params), {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    })
  }

  return (
    <Select value={defaultValue ?? ""} items={items} onValueChange={handleValueChange}>
      <SelectTrigger>
        {triggerIcon && triggerIcon}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map(item => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}