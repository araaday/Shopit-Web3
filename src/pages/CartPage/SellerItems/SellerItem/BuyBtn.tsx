import { useCart } from "react-use-cart";

import { buyItem } from "../../../../helpers";

export default function BuyBtn({ hex_id, quantity }: Pick<BNCartItemType, "hex_id" | "quantity">) {
  const { removeItem } = useCart();

  return (
    <div className="btn-accent-2 btn-solid rounded-2">
      <button
        className="btn w-100"
        onClick={() => buyItem({ id: hex_id, quantity }).then(() => removeItem(hex_id))}
      >
        Buy Now <i className="fas fa-tags" />
      </button>
    </div>
  );
}
