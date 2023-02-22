import type { ReactNode } from "react";

import Item from "./Item";

import "./index.css";

type ItemsProps = {
  items: ItemsType;
  title: ReactNode;
};

export default function Items({ items, title }: ItemsProps) {
  const item_elements = [];

  for (const item of items) {
    item_elements.push(<Item key={item.hex_id} {...item} />);
  }

  return (
    <div className="align-items-center items d-flex flex-wrap glassmorphic glassmorphic-pri px-5 px-sm-0 rounded-1">
      <div className="d-flex ps-5 pt-4 w-100 align-items-center justify-content-between">
        <h2 className="m-0 text-center text-sm-start d-inline title-underline pb-2">{title}</h2>
      </div>
      <div className="d-flex flex-wrap gap-4 mt-4 pb-5 px-5">{item_elements}</div>
    </div>
  );
}
