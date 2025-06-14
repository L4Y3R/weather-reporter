"use client"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function HeaderSearch() {
  return (
    <div>
      <div className="max-w-lg mx-auto relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for a city or airport"
          className="pl-12 pr-4 py-4 w-full bg-gray-900/50 backdrop-blur-xl border-gray-800 rounded-2xl text-white placeholder:text-gray-400 focus:bg-gray-900/70 focus:border-gray-700 transition-all duration-200 text-lg"
        />
      </div>
    </div>
  );
}