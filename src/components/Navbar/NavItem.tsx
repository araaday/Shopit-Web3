import { Link, LinkProps } from "react-router-dom";

import type { PropsWithChildren, RefAttributes } from "react";

import "./NavItem.css";

type NavItemProps = PropsWithChildren & LinkProps & RefAttributes<HTMLAnchorElement>;

export default function NavItem({ children, ...props }: NavItemProps) {
  return (
    <li className="nav-item">
      <Link className="fs-4 nav-link" {...props}>
        {children}
      </Link>
    </li>
  );
}
