import { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import SearchFilter from "./SearchFilter";
import SortFilter from "./SortFilter";
import CategoryFilter from "./CategoryFilter";
import PriceRangeFilter from "./PriceRangeFilter";

export default function FilterComponent({ productList = [], onFiltersChange }) {
  const [filters, setFilters] = useState({
    searchTerm: "",
    sortBy: "",
    selectedCategory: "all",
    priceRange: [0, 1000],
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Get unique categories from products
  const categories = [
    ...new Set(productList.map((product) => product.category)),
  ].filter(Boolean);

  // Get price range from products
  const prices = productList
    .map((product) => product.price)
    .filter((price) => price > 0);
  const minPrice = prices.length > 0 ? Math.floor(Math.min(...prices)) : 0;
  const maxPrice = prices.length > 0 ? Math.ceil(Math.max(...prices)) : 1000;

  // Update filters and notify parent
  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  // Send filters to parent with debounce for search
  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (onFiltersChange) {
          onFiltersChange({
            ...filters,
            selectedCategory:
              filters.selectedCategory === "all"
                ? ""
                : filters.selectedCategory,
          });
        }
      },
      filters.searchTerm ? 300 : 0
    ); // Only debounce search

    return () => clearTimeout(timer);
  }, [filters, onFiltersChange]);

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      sortBy: "",
      selectedCategory: "all",
      priceRange: [minPrice, maxPrice],
    });
  };

  const activeFiltersCount = [
    filters.searchTerm,
    filters.sortBy,
    filters.selectedCategory !== "all",
    filters.priceRange[0] !== minPrice || filters.priceRange[1] !== maxPrice,
  ].filter(Boolean).length;

  return (
    <Card className="p-4 mb-6">
      {/* Desktop Filters */}
      <div className="hidden md:block">
        <div className="flex flex-wrap items-center gap-4">
          <SearchFilter
            value={filters.searchTerm}
            onChange={(value) => updateFilter("searchTerm", value)}
          />

          <SortFilter
            value={filters.sortBy}
            onChange={(value) => updateFilter("sortBy", value)}
          />

          <CategoryFilter
            value={filters.selectedCategory}
            onChange={(value) => updateFilter("selectedCategory", value)}
            categories={categories}
          />

          <PriceRangeFilter
            value={filters.priceRange}
            onChange={(value) => updateFilter("priceRange", value)}
            min={minPrice}
            max={maxPrice}
          />

          {activeFiltersCount > 0 && (
            <Button variant="ghost" onClick={clearFilters} className="text-sm">
              Clear All ({activeFiltersCount})
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden">
        <div className="flex items-center gap-2 mb-4">
          <SearchFilter
            value={filters.searchTerm}
            onChange={(value) => updateFilter("searchTerm", value)}
          />

          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="relative"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {activeFiltersCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>

        {showMobileFilters && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <Label className="text-sm font-medium mb-2 block">Sort By</Label>
              <SortFilter
                value={filters.sortBy}
                onChange={(value) => updateFilter("sortBy", value)}
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Category</Label>
              <CategoryFilter
                value={filters.selectedCategory}
                onChange={(value) => updateFilter("selectedCategory", value)}
                categories={categories}
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">
                Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </Label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilter("priceRange", value)}
                max={maxPrice}
                min={minPrice}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>${minPrice}</span>
                <span>${maxPrice}</span>
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
