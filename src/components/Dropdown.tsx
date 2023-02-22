import type { PropsWithChildren, ReactNode } from "react";

import "./Dropdown.css";

type DropdownProps = PropsWithChildren &
  Pick<Attributes, "className"> &
  JSX.IntrinsicElements["div"] & {
    /**
     * **Object** containing `text` & `className` (defaults to "")
     */
    header: Pick<Attributes, "className"> & {
      text: ReactNode;
    };
    id: string;
  };

export const class_name = "shopit-dropdown";

export default function Dropdown({
  children,
  header,
  id: id_prop,
  className,
  ...props
}: DropdownProps) {
  const id = `${class_name}-${id_prop}`;

  return (
    <div className={`d-flex ${class_name} flex-column ${className || ""}`} id={id} {...props}>
      <input className="d-none" id={`${id}-input`} type="checkbox" />
      <label className="d-flex justify-content-between me-2 ms-1" htmlFor={`${id}-input`}>
        <header className={`mb-0 ${header.className || "h3"}`}>{header.text}</header>
        <i className="align-items-center d-flex fa-solid fa-caret-down fs-4" />
      </label>
      <div className="content rounded-2">{children}</div>
    </div>
  );
}
