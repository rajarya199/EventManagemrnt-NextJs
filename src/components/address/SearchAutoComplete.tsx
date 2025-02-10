"use client"
import React,{useEffect,useState,useRef} from 'react'
import { Search } from "lucide-react";
interface SearchAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    onLocationSelect: (lat: number, lng: number, address: string) => void;
  }
const SearchAutoComplete = ({
    value,
  onChange,
  onLocationSelect
}:SearchAutocompleteProps) => {
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    useEffect(() => {
        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };
      }, []);

      // search address ,query
      const searchAddress=async(query:string)=>{
        if (query.length < 3) {
            setSuggestions([]);
            return;
          }
          setLoading(true);
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
            const data = await response.json();
            setSuggestions(data);
          } catch (error) {
            console.error("Error fetching suggestions:", error);
          }
          setLoading(false)
      };
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          searchAddress(newValue);
        }, 300);
        setIsOpen(true);
      };
      const handleSuggestionClick = (suggestion: any) => {
        const address = suggestion.display_name;
        onChange(address);
        onLocationSelect(parseFloat(suggestion.lat), parseFloat(suggestion.lon), address);
        setIsOpen(false);
      };
  return (
    <div>
         <div className="relative">
      <div className="relative">
        <input type="text" value={value} onChange={handleInputChange} className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your address" />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      </div>
      {isOpen && (suggestions.length > 0 || loading) && <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {loading && <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>}
          {!loading && suggestions.map((suggestion, index) => <div key={index} className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer" onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.display_name}
              </div>)}
        </div>}
    </div>
    </div>
  )
}

export default SearchAutoComplete