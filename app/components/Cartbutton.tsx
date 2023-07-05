import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  itemCount: number;
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount }) => {
  return (
    <div className="relative">
      <button>
        <ShoppingCart/>
      </button>
        <div className="absolute -top-1 -right-1 rounded-full bg-black text-white w-4 h-4 flex items-center justify-center">
          {itemCount}
        </div>
    </div>
  );
};

export default CartButton;