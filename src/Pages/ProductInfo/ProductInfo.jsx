import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductInfo } from "../../hooks/useProductInfo";
import { addToCart } from "../../redux/cartSlice";
import CartCounter from "../../components/CartCounter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

function ProductInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axToken = useSelector((state) => state.auth.axToken);
  const { id: productId } = useParams();
  const { productInfo, loading, error } = useProductInfo(productId);

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === productInfo?.id)
  );
  const isInCart = Boolean(cartItem);

  useEffect(() => {
    if (!axToken) {
      toast.error("Please login first");
      navigate("/");
    }
  }, [axToken, navigate]);

  const handleAddToCart = () => {
    dispatch(addToCart(productInfo));
  };

  const handleBuyNow = () => {
    // Navigate to checkout with this single item
    navigate("/checkout", {
      state: {
        buyNowItem: {
          ...productInfo,
          quantity: 1,
        },
      },
    });
  };

  const handleGoBack = () => {
    navigate("/products");
  };

  if (loading || !productInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-96 rounded-lg mb-4"></div>
          <div className="bg-gray-200 h-8 rounded mb-2"></div>
          <div className="bg-gray-200 h-4 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <p>Error loading product: {error}</p>
        </div>
      </div>
    );
  }

  // This check is now handled above in the loading condition

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Go Back Button */}
      <Button
        variant="ghost"
        className="mb-4 p-2 hover:bg-gray-100 transition-colors hover:cursor-pointer"
        onClick={handleGoBack}
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </Button>

      <Card className="shadow-sm max-w-6xl mx-auto">
        <CardHeader className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Image Section - Left Side */}
            <div className="aspect-square bg-background-light rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
                alt={productInfo.title}
                className="w-full h-full object-contain p-4 rounded-3xl"
              />
            </div>

            {/* Product Info Section - Right Side */}
            <div className="flex flex-col gap-4">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="default" className="text-sm px-2 py-1">
                  ⭐ {productInfo.rating?.rate || "N/A"}
                </Badge>
                <Badge variant="secondary" className="text-sm px-2 py-1">
                  {productInfo.rating?.count || 0} reviews
                </Badge>
                <Badge
                  variant="outline"
                  className="text-sm px-2 py-1 capitalize"
                >
                  {productInfo.category}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                {productInfo.title}
              </h1>

              {/* Price */}
              <div className="text-3xl sm:text-4xl font-bold text-primary">
                ${productInfo.price}
              </div>

              {/* Description */}
              <div className="text-gray-600 leading-relaxed">
                <p>{productInfo.description}</p>
              </div>

              {/* Action Buttons Section */}
              <div className="mt-6 ">
                {/* Add to Cart */}
                {!isInCart ? (
                  <Button
                    className="w-full sm:w-auto bg-primary mr-4 text-white hover:shadow-lg hover:cursor-pointer transition-all duration-200 text-lg py-3 px-8"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Quantity:</span>
                    <CartCounter
                      productId={productInfo.id}
                      quantity={cartItem.quantity}
                    />
                  </div>
                )}

                {/* Buy Now Button */}
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-blue-600 text-primary hover:cursor-pointer hover:shadow-lg transition-all duration-200 text-lg py-3 px-8"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

export default ProductInfo;
