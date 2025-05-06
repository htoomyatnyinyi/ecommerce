import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart } from "@/redux/slice/cartSlice";

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {items.map((item) => (
            <div
              key={item.productId}
              className="border-b py-2 flex justify-between"
            >
              <div>
                {item.title} x {item.quantity}
              </div>
              <div>${item.price * item.quantity}</div>
              <button
                onClick={() => dispatch(removeFromCart(item.productId))}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 font-bold">Total: ${total.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
};

export default Cart;
