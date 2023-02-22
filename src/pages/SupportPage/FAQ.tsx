import { Color } from "frostcolor";

import Dropdown from "../../components/Dropdown";
import { strToRgb } from "../../helpers";

export const class_name = "faq";

type FAQProps = {
  a: string;
  i: number;
  q: string;
};

export default function FAQ({ a, q, i }: FAQProps) {
  const hex = new Color(...strToRgb(q.replace(/\W+/, "").toLowerCase()))
    .setBrightness(80)
    .setSaturation(55)
    .setAlpha(0.5)
    .toHexString();

  return (
    <Dropdown
      className="rounded-2"
      header={{ text: q }}
      id={`${class_name}-${i}`}
      style={{ background: hex }}
    >
      {a}
    </Dropdown>
  );
}
