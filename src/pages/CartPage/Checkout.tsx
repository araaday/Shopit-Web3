import { useCart } from "react-use-cart";

import { MarkITplace } from "../../helpers";

import "./Checkout.css";

type CheckoutProps = {
  amounts: EthersParam[];
  ids: EthersParam[];
  total: EthersParam;
};

export default function Checkout({ amounts, ids, total }: CheckoutProps) {
  const { emptyCart } = useCart();

  return (
    <aside className="cart-checkout glassmorphic glassmorphic-accent-2">
      <header className="bg-header h3 mb-1 text-light">Checkout</header>
      <section>
        Total:
        {` ${total}`}
      </section>
      <div className="btn-accent-2 btn-solid checkout-btn rounded-2">
        <button
          className="btn fs-5 w-100"
          {...(ids.length
            ? {
                onClick: () =>
                  MarkITplace()
                    .functions.batchBuy(ids, amounts)
                    .then(() => emptyCart())
              }
            : { disabled: true })}
        >
          Proceed to Checkout <i className="fa-solid fa-bag-shopping ms-1" />
        </button>
      </div>
    </aside>
  );
}
