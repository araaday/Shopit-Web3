import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { BN0 } from "../../helpers";

import "./CartBtn.css";

export default function CartBtn() {
  const { items } = useCart();

  let total = BN0;
  for (const { quantity } of items as unknown as CartItemType[]) {
    total = total.add(quantity);
  }

  return (
    <Link
      className="fa-solid fa-cart-shopping fs-4 ms-3 position-relative text-decoration-none text-light"
      to="/cart"
    >
      {total.isZero() ? (
        <></>
      ) : (
        <small
          className="align-items-center d-flex justify-content-center position-absolute rounded-pill"
          id="cart-total"
        >
          {total.gt(99) ? "99+" : total.toString()}
        </small>
      )}
    </Link>
  );
}
