import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  cartClose,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

export function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartOpen = useSelector((state) => state.cart.cartOpen);
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalItems = useSelector((state) => state.cart.totalItems);

  const handleClose = () => {
    dispatch(cartClose());
  };

  const handleCheckout = () => {
    dispatch(cartClose());
    navigate("/checkout");
  };

  return (
    <Sheet open={cartOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems} items)</SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 py-4 flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-text-muted">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border rounded-lg"
              >
                <img
                  src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
                  alt={item.title}
                  className="w-16 h-16 object-contain bg-background-light rounded"
                />

                <div className="flex-1">
                  <h4 className="font-medium text-sm line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-primary font-bold">${item.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-8 text-center">{item.quantity}</span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-error hover:text-error-dark"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <SheetFooter className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total: ${totalAmount.toFixed(2)}</span>
            </div>

            <div className="flex gap-2">
              <SheetClose asChild>
                <Button variant="outline" className="flex-1">
                  Continue Shopping
                </Button>
              </SheetClose>

              <Button
                className="flex-1 bg-primary hover:bg-primary-dark"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
