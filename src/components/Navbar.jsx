import { ShoppingCart, Store, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { removeToken } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { cartOpen } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(removeToken());
    navigate("/");
  };
  const totalItems = useSelector((state) => state.cart.totalItems);

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between hover:cursor-pointer">
          {/* Logo */}
          <div
            className="flex items-center gap-3 hover:cursor-pointer"
            onClick={() => navigate("/products")}
          >
            <div className="p-2 bg-primary-light rounded-lg">
              <Store className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">
                Luxe<span className="text-primary">Shop</span>
              </h2>
              <p className="text-xs text-text-muted">Premium Store</p>
            </div>
          </div>

          {/* Navigation Links */}

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Shopping Cart */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:cursor-pointer"
                onClick={() => dispatch(cartOpen())}
              >
                <ShoppingCart className="w-7 h-7" />
              </Button>
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {totalItems}
              </Badge>
            </div>

            {/* Logout Button */}
            <Button
              variant="outline"
              size="lg"
              onClick={handleLogout}
              className="flex items-center gap-2 hover:cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
