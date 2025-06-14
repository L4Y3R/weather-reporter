"use client"

import { CloudOff, RotateCcw } from "lucide-react"

export default function ErrorScreen() {
  return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-sm px-6">
        <div className="flex justify-center">
          <CloudOff size={64} className="text-gray-600" />
        </div>
        <div className="space-y-3">
          <h2 className="text-white text-lg font-medium">Unable to Load Weather</h2>
        </div>
      </div>
    </div>
  )
}