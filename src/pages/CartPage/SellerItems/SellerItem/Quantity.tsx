import { BigNumber } from "ethers";
import { useMemo } from "react";
import { useCart } from "react-use-cart";

import BaseQuantity from "../../../../components/Quantity";
import { BN1 } from "../../../../helpers";

export default function Quantity(item: BNCartItemType) {
  const { updateItemQuantity } = useCart();

  const conditions = useMemo(
    () => ({
      max: BigNumber.from(item.amount).eq(item.quantity),
      min: BN1.eq(item.quantity)
    }),
    [item]
  );
  const updates = useMemo(
    () => ({
      add: () => updateItemQuantity(item.hex_id, item.quantity as unknown as number),
      set: (ev: InputChangeEvent) => {
        const amount = BigNumber.from(item.amount);

        let updated_quantity = BigNumber.from(ev.target.value);
        if (updated_quantity) {
          if (updated_quantity.lt(BN1)) updated_quantity = BN1;
          else if (updated_quantity.gt(amount)) updated_quantity = amount;

          updateItemQuantity(item.hex_id, updated_quantity.toString() as unknown as number);
        }
      },
      subtract: () => updateItemQuantity(item.hex_id, item.quantity as unknown as number)
    }),
    [item, updateItemQuantity]
  );

  return (
    <BaseQuantity
      decrement_props={
        conditions.min
          ? {
              "data-bs-toggle": "modal",
              "data-bs-target": "#confirm-removal",
              "data-bs-item": JSON.stringify(item)
            }
          : { onClick: updates.subtract }
      }
      increment_props={conditions.max ? {} : { onClick: updates.add }}
      input_props={{ onChange: updates.set, value: item.quantity.toString() }}
    />
  );
}
