import { Card, CardContent } from "@/components/ui/card"

interface AdditionalDetailProps {
  label: string
  value: string
  subValue?: string
}

export default function AdditionalDetail({ label, value, subValue }: AdditionalDetailProps) {
  return (
    <Card className="bg-gray-900/40 backdrop-blur-xl border-gray-800 rounded-2xl">
      <CardContent className="p-6">
        <div className="text-gray-400 text-sm font-medium mb-2">{label}</div>
        <div className="text-3xl font-semibold text-white">{value}</div>
        {subValue && <div className="text-gray-500 text-sm">{subValue}</div>}
      </CardContent>
    </Card>
  )
}