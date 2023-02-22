import { useCallback, useState } from "react";
import { useCart } from "react-use-cart";
import { buyItem } from "../../../helpers";

import "./Actions.css";

export default function Actions(item: ItemType) {
  const { addItem, getItem } = useCart();
  const [adding, setAdding] = useState(false);

  const quantity = (getItem(item.hex_id) as CartItemType)?.quantity || "0";
  const max = item.amount.eq(quantity);
  const onClick = useCallback(() => {
    const { amount, id, price, ...non_bn_props } = item;
    const cart_item: CartItemType = {
      amount: amount.toString(),
      id: id.toHexString(),
      price: price.toString(),
      quantity,
      ...non_bn_props
    };
    addItem(cart_item as any);
    setAdding(true);
    setTimeout(() => setAdding(false), 1000);
  }, [addItem, item, quantity]);

  return (
    <div className="gap-3 px-5 py-4 w-100 d-flex flex-column flex-lg-row half-grow">
      <div className="btn-accent-1 btn-solid rounded-3">
        <button
          className="btn py-3 fs-4 w-100"
          {...(max ? { disabled: true } : { onClick })}
          type="button"
        >
          <span className={`${adding ? "added" : "d-none"}`}>
            Added <i className="fa-solid fa-check" />
          </span>
          <span className="add-to-cart">
            Add to Cart <i className="fa-solid fa-cart-plus" />
          </span>
        </button>
      </div>
      <div className="btn-accent-2 btn-solid rounded-3">
        <button
          className="btn py-3 fs-4 w-100"
          {...(item.amount
            ? // TODO:
              { onClick: () => buyItem({ id: item.id, quantity: "1" }) }
            : { disabled: true })}
        >
          Buy Now <i className="fas fa-tags" />
        </button>
      </div>
    </div>
  );
}
