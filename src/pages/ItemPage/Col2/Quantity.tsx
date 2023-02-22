import { BigNumber } from "ethers";
import { useMemo, useState } from "react";

import BaseQuantity from "../../../components/Quantity";
import { BN1 } from "../../../helpers";

export default function Quantity(item: ItemType) {
  const amount = BigNumber.from(item.amount);

  const [quantity, setQuantity] = useState(BN1);
  const quantity_states = useMemo(
    () => ({
      add: () => setQuantity(quantity.add(BN1)),
      min: quantity.eq(BN1),
      subtract: () => setQuantity(quantity.sub(BN1))
    }),
    [quantity]
  );
  const set = (ev: InputChangeEvent) => {
    let updated_quantity = BigNumber.from(ev.target.value);
    if (updated_quantity) {
      if (updated_quantity.lt(BN1)) updated_quantity = BN1;
      else if (updated_quantity.gt(amount)) updated_quantity = amount;

      setQuantity(updated_quantity);
    }
  };

  return (
    <BaseQuantity
      decrement_props={
        quantity_states.min ? { disabled: true } : { onClick: quantity_states.subtract }
      }
      increment_props={quantity.eq(amount) ? { disabled: true } : { onClick: quantity_states.add }}
      input_props={{ onChange: set, value: quantity.toString() }}
    />
  );
}
