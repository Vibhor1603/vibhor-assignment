import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PriceRangeFilter({ value, onChange, min, max }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="min-w-[140px]">
          ${value[0]} - ${value[1]}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <Label className="text-sm font-medium">Price Range</Label>
          <Slider
            value={value}
            onValueChange={onChange}
            max={max}
            min={min}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>${min}</span>
            <span>${max}</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
