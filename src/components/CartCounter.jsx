import React from "react";
import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import { Plus, Minus, Trash2 } from "lucide-react";

const CartCounter = ({ productId, quantity }) => {
  const dispatch = useDispatch();

  const handleIncrease = (e) => {
    e.stopPropagation(); // Prevent parent card navigation
    dispatch(increaseQuantity(productId));
  };

  const handleDecrease = (e) => {
    e.stopPropagation(); // Prevent parent card navigation
    dispatch(decreaseQuantity(productId));
  };

  return (
    <div
      className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white"
      onClick={(e) => e.stopPropagation()} // Prevent parent card navigation
    >
      <button
        onClick={handleDecrease}
        className="px-3 py-2 hover:bg-gray-100 transition-colors flex items-center justify-center"
      >
        {quantity === 1 ? (
          <Trash2 size={16} className="text-red-500" />
        ) : (
          <Minus size={16} />
        )}
      </button>

      <span className="px-4 py-2 min-w-[3rem] text-center font-medium bg-gray-50 border-x border-gray-300">
        {quantity}
      </span>

      <button
        onClick={handleIncrease}
        className="px-3 py-2 hover:bg-gray-100 transition-colors flex items-center justify-center"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default CartCounter;
