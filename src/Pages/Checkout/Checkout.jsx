import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard } from "lucide-react";
import toast from "react-hot-toast";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items);
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    // Check if coming from "Buy Now" with a single item
    if (location.state?.buyNowItem) {
      setCheckoutItems([location.state.buyNowItem]);
    } else {
      // Use cart items
      setCheckoutItems(cartItems);
    }

    // Redirect if no items to checkout
    if (!location.state?.buyNowItem && cartItems.length === 0) {
      navigate("/products");
    }
  }, [cartItems, location.state, navigate]);

  const calculateTotal = () => {
    return checkoutItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handlePayNow = () => {
    toast.success("Payment successful");
    navigate("/products");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>No items to checkout</p>
          <Button onClick={() => navigate("/products")} className="mt-4">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-4 p-2 hover:bg-gray-100 transition-colors"
        onClick={handleGoBack}
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Order Summary
                <Badge variant="secondary">
                  {checkoutItems.length} item(s)
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checkoutItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <img
                      src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
                      alt={item.title}
                      className="w-16 h-16 object-contain rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {item.category}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-primary">
                          ${item.price}
                        </span>
                        <span className="text-sm text-gray-500">
                          x {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>$0.00</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">${calculateTotal()}</span>
                </div>
              </div>

              <Button
                onClick={handlePayNow}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3"
                size="lg"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Pay Now
              </Button>

              <div className="text-center text-sm text-gray-500">
                <p>Secure checkout powered by demo</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
