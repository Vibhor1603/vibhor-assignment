import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchFilter({ value, onChange }) {
  return (
    <div className="flex-1 min-w-[200px] max-w-[300px]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search products..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
}
