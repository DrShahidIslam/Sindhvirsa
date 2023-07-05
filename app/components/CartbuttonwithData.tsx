"use client";
import { cartTable, db } from "@/lib/drizzle";
import CartButton from './Cartbutton';
import { useState, useEffect } from 'react';
import { sql, eq } from 'drizzle-orm';

const userId = 'some-user-id'; // The ID of the user whose cart you want to display

const CartButtonWithData: React.FC = () => {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      const result = await db.select({ total: sql`SUM(${cartTable.quantity})` })
        .from(cartTable)
        .where(eq(cartTable.user_id, userId));

      setItemCount(result[0].total as number);
    };
    fetchCartData();

    const handleCartChanged = () => {
      fetchCartData();
    };

    window.addEventListener('cartChanged', handleCartChanged);

    return () => {
      window.removeEventListener('cartChanged', handleCartChanged);
    };
  }, []);

  return <CartButton itemCount={itemCount} />;
};

export default CartButtonWithData;
