import "./Quantity.css";

type QuantityProps = Record<
  "decrement_props" | "increment_props",
  Omit<JSX.IntrinsicElements["input"], "className" | "title" | "type" | "value">
> & {
  input_props: Omit<JSX.IntrinsicElements["input"], "className" | "name" | "title" | "type">;
};

export default function Quantity<T extends QuantityProps>({
  decrement_props,
  increment_props,
  input_props
}: T) {
  return (
    <div className="d-flex fs-5 position-relative q-picker">
      <input
        className="align-items-center border border-2 border-dark border-end-0 d-flex fs-4 h-100 justify-content-center px-3 quantity-btn"
        title="decrement"
        type="button"
        value="-"
        {...decrement_props}
      />

      <input
        className="border-2 border-top border-bottom border-dark quantity text-center"
        name="quantity"
        title="quantity"
        type="number"
        {...input_props}
      />

      <input
        className="align-items-center border border-2 border-dark border-start-0 d-flex fs-4 h-100 justify-content-center px-3 quantity-btn"
        title="increment"
        type="button"
        value="+"
        {...increment_props}
      />
    </div>
  );
}
