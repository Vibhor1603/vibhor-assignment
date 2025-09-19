import { useDispatch, useSelector } from "react-redux";
import CartCounter from "./CartCounter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );
  const isInCart = Boolean(cartItem);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card navigation
    dispatch(addToCart(product));
  };

  const handleProductInfo = () => {
    window.location.href = `/product-info/${product.id}`;
  };

  const handleKnowMore = (e) => {
    e.stopPropagation(); // Prevent card navigation
    window.location.href = `/product-info/${product.id}`;
  };

  return (
    <Card
      className="shadow-sm flex flex-col gap-0.5 py-0 hover:scale-105 transition-all duration-200 transform cursor-pointer"
      onClick={handleProductInfo}
    >
      {/* Image and Badges - More compact */}
      <CardHeader className="p-2 sm:p-2 md:p-3">
        <div className="aspect-square bg-background-light rounded-lg mb-2 flex items-center justify-center overflow-hidden">
          <img
            src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
            alt={product.title}
            className="w-full h-full object-contain p-1 sm:p-2 md:p-3  rounded-2xl"
          />
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          <Badge variant="default" className="text-xs px-1 py-0">
            ⭐ {product.rating?.rate || "N/A"}
          </Badge>
          <Badge
            variant="secondary"
            className="text-xs px-1 py-0 hidden sm:block"
          >
            {product.rating?.count || 0}
          </Badge>
        </div>

        {/* Title - More compact */}
        <CardTitle className="line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] text-xs sm:text-sm md:text-base leading-tight ">
          {product.title}
        </CardTitle>
      </CardHeader>

      {/* Price - More compact */}
      <CardContent className="px-2 sm:px-3 md:px-4">
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-lg md:text-xl font-bold text-primary">
            ${product.price}
          </span>
        </div>
      </CardContent>

      {/* Buttons - Compact, single button on mobile */}
      <CardFooter className=" p-2 sm:p-3 md:p-4">
        <div className="flex flex-col md:flex-row gap-2 w-full">
          {!isInCart ? (
            <Button
              className="w-full sm:flex-1 bg-primary text-white hover:bg-primary-dark hover:cursor-pointer hover:shadow-md transition-all duration-200 text-xs sm:text-sm py-1 sm:py-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          ) : (
            <CartCounter productId={product.id} quantity={cartItem.quantity} />
          )}

          <Button
            variant="outline"
            className="w-full sm:flex-1 text-xs sm:text-sm py-1 sm:py-2  sm:block hover:cursor-pointer hover:shadow-md hover:bg-background-light transition-all duration-200"
            onClick={handleKnowMore}
          >
            <p>Know More</p>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
