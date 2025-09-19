import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "../../hooks/useProducts";
import { SkeletonCard } from "../../components/SkeletonCard";
import ProductCard from "../../components/ProductCard";
import FilterComponent from "../../components/FilterComponent";

export const Products = () => {
  const { productList, loading } = useProducts();
  const [filters, setFilters] = useState({
    searchTerm: "",
    sortBy: "",
    selectedCategory: "",
    priceRange: [0, 1000],
  });

  // Filter and sort products based on current filters
  const filteredProducts = useMemo(() => {
    if (!productList || productList.length === 0) return [];

    let filtered = [...productList];

    // Search filter
    if (filters.searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === filters.selectedCategory
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Sort products
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "name-asc":
            return a.title.localeCompare(b.title);
          case "name-desc":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [productList, filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Section Header */}
      <div className="text-center mb-10 ">
        <Badge variant="secondary" className="mb-4">
          🔥 Trending Now
        </Badge>

        <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-text-primary ">
          Featured <span className="text-primary text-">Products</span>
        </h2>
      </div>
      <FilterComponent
        productList={productList}
        onFiltersChange={handleFiltersChange}
      />
      {loading ? (
        <div className="flex flex-wrap gap-12 justify-center">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-text-secondary">
                {productList && productList.length > 0
                  ? "No products match your filters"
                  : "No products found"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Products Grid */}

      {/* Call to Action */}
    </div>
  );
};
