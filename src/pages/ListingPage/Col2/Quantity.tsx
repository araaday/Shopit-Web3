import { useMemo, useState } from "react";

import BaseQuantity from "../../../components/Quantity";

export default function Quantity() {
  const [quantity, setQuantity] = useState(1);
  const quantity_states = useMemo(
    () => ({
      add: () => setQuantity(quantity + 1),
      min: quantity === 1,
      subtract: () => setQuantity(quantity - 1)
    }),
    [quantity]
  );
  const set = (ev: InputChangeEvent) => {
    let updated_quantity = ev.target.valueAsNumber;
    if (updated_quantity) {
      if (updated_quantity < 1) updated_quantity = 1;

      setQuantity(updated_quantity);
    }
  };

  return (
    <BaseQuantity
      decrement_props={quantity === 1 ? { disabled: true } : { onClick: quantity_states.subtract }}
      increment_props={{ onClick: quantity_states.add }}
      input_props={{ onChange: set, required: true, value: quantity }}
    />
  );
}
