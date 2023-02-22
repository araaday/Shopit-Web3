import { useCart } from "react-use-cart";

import Checkout from "./Checkout";
import ConfirmRemoval from "./ConfirmRemoval";

import "./index.css";
import { Link } from "react-router-dom";
import { BN0, formatToken } from "../../helpers";
import { BigNumber } from "ethers";
import SellerItems from "./SellerItems";

export default function CartPage() {
  const { items } = useCart();

  const seller2items: Record<CartItemType["seller"]["account"], BNCartItemType[]> = {};
  const amounts: BigNumber[] = [];
  const ids: BigNumber[] = [];
  let total = BN0;
  for (const {
    amount,
    description,
    id,
    image,
    name,
    price,
    quantity,
    seller
  } of items as unknown as CartItemType[]) {
    const item = {
      amount: BigNumber.from(amount),
      description,
      hex_id: id,
      id: BigNumber.from(id),
      image,
      name,
      price: BigNumber.from(price),
      quantity: BigNumber.from(quantity),
      seller
    };
    if (seller2items[seller.account]) seller2items[seller.account].push(item);
    else seller2items[seller.account] = [item];

    amounts.push(item.quantity);
    ids.push(item.id);
    total = total.add(item.price);
  }

  const seller_items_arr = [];
  for (const seller in seller2items) {
    seller_items_arr.push(
      <SellerItems
        key={seller}
        items={seller2items[seller]}
        seller={seller2items[seller][0]["seller"]}
      />
    );
  }

  return (
    <main className="align-items-start d-flex flex-wrap gap-4 mx-5 py-5">
      <h1 className="mb-0 ms-3 w-100">Shopping Cart</h1>

      <div className="cart-items d-flex flex-column flex-grow-1 gap-3">
        {seller_items_arr.length ? (
          seller_items_arr
        ) : (
          <p className="mx-3">
            No Items in Cart! Consider checking out these <Link to="/">Featured Items</Link>.
          </p>
        )}
      </div>

      <Checkout amounts={amounts} ids={ids} total={formatToken(total)} />

      <ConfirmRemoval />
    </main>
  );
}
