import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormFieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
}

export function FormField({ label, name, type = "text", placeholder }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} placeholder={placeholder} />
    </div>
  )
}

