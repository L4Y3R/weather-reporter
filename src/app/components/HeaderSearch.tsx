"use client"

import { Search, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react";

export default function HeaderSearch({ onSearch, onDetectLocation }: { onSearch: (city: string) => void, onDetectLocation: () => void }) {
  
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      onSearch(input.trim());
    }
  };

  const handleClick = () => {
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <div className="max-w-lg mx-auto relative flex items-center">
      <div className="relative group">
        <button
          onClick={onDetectLocation}
          className="text-gray-400 hover:text-white p-2 rounded-full"
        >
          <MapPin className="w-5 h-5" />
        </button>
      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap max-w-max">
          Detect My Location
      </span>
      </div>

      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for a city"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-12 pr-12 py-4 w-full bg-gray-900/50 backdrop-blur-xl border-gray-800 rounded-2xl text-white placeholder:text-gray-400 focus:bg-gray-900/70 focus:border-gray-700 transition-all duration-200 text-lg"
        />
        <button
          onClick={handleClick}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded-full"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}