import { Card, CardContent } from "@/components/ui/card"
import { AdditionalDetailProps } from "../types/additionalDetailProps"

export default function AdditionalDetail({ label, value, subValue }: AdditionalDetailProps) {
  return (
    <Card className="
        bg-gray-900/40 backdrop-blur-xl border-gray-800 rounded-2xl
        transition-transform duration-300 ease-in-out
        hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50
        cursor-pointer
      ">
      <CardContent className="p-6">
        <div className="text-gray-400 text-sm font-medium mb-2">{label}</div>
        <div className="text-3xl font-semibold text-white">{value}</div>
        {subValue && <div className="text-gray-500 text-sm">{subValue}</div>}
      </CardContent>
    </Card>
  )
}