import { cartContext } from '@/global/context/page';
import { ShoppingCart } from 'lucide-react';
import {useContext} from 'react';

function Cart() {
 
let {quantity} = useContext(cartContext)
  
  return (
    <div className="relative">
    <button>
      <ShoppingCart/>
    </button>
      <div className="absolute -top-1 -right-1 text-xs font-light rounded-full bg-black text-white w-4 h-4 flex items-center justify-center">
      {quantity}
      </div>
  </div>
  );
  }

  export default Cart
 