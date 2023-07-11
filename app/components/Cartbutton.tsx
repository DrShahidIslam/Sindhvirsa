import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';

function Cart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchCartData() {
      
      const response = await fetch('/api/cart?user_id=Shahid Islam');
      const data = await response.json();
      setProducts(data.products);
    }
    fetchCartData();
  }, []);
  
  return (
    <div className="relative">
    <button>
      <ShoppingCart/>
    </button>
      <div className="absolute -top-1 -right-1 text-xs font-light rounded-full bg-black text-white w-4 h-4 flex items-center justify-center">
      {products && products.length}
      </div>
  </div>
  );
  }

  export default Cart
 