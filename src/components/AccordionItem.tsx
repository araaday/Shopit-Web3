import type { PropsWithChildren, ReactNode } from "react";

type AccordionItemProps = PropsWithChildren &
  Pick<Attributes, "className"> & {
    /**
     * **Object** containing `text` & `className` (defaults to "h3")
     */
    header: Pick<Attributes, "className"> & {
      text: ReactNode;
    };
    id: string;
  };

export default function AccordionItem({
  children,
  header: { className, text },
  id: id_prop
}: AccordionItemProps) {
  const id = `${id_prop}-accordion-item`;
  const header_id = `${id}-header`;
  const collapse_id = `${id}-collapse`;
  return (
    <div className="accordion-item">
      <h1 className="accordion-header" id={header_id}>
        <button
          className={`accordion-button collapsed ${className || ""}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapse_id}`}
        >
          {text}
        </button>
      </h1>
      <div id={collapse_id} className="accordion-collapse collapse">
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
}
