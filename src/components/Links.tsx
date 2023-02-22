import { Link, LinkProps } from "react-router-dom";

type NoToLinkProps = Omit<LinkProps, "to">;
type EventLinkProps = NoToLinkProps & {
  id: string;
};
export function EventLink({ children, id, ...props }: EventLinkProps) {
  return (
    <Link to={`/event?id=${id}`} {...props}>
      {children}
    </Link>
  );
}

type ItemLinkProps = NoToLinkProps & {
  id: string;
};
export function ItemLink({ children, id, ...props }: ItemLinkProps) {
  return (
    <Link to={`/item?id=${id}`} {...props}>
      {children}
    </Link>
  );
}
