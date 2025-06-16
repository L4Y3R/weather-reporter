"use client"

import { Cloud } from "lucide-react"
import { useEffect, useState } from "react"

export default function LoadingScreen() {
    const [dots, setDots] = useState("")

    useEffect(() => {
        const interval = setInterval(() => {
        setDots((prev) => {
            if (prev === "...") return ""
            return prev + "."
        })
        }, 600)

        return () => clearInterval(interval)
    }, [])

      return (
        <div className="fixed inset-0 bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-8">

            <div className="flex justify-center">
            <Cloud size={64} className="text-white animate-pulse" />
            </div>

            <div className="space-y-2">
            <p className="text-white text-lg font-medium">Weather</p>
            <p className="text-gray-400 text-sm min-h-[20px]">Loading{dots}</p>
            </div>

            <div className="w-32 mx-auto">
            <div className="h-0.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full animate-progress"></div>
            </div>
            </div>
        </div>
        </div>
    );
}