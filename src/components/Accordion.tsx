import { PropsWithChildren, useEffect, useRef } from "react";

import "./Accordion.css";

type AccordionProps = PropsWithChildren & { id: string };

export default function Accordion({ children, id: id_prop }: AccordionProps) {
  const accordion = useRef<HTMLDivElement>(undefined!);

  const id = `${id_prop}-accordion`;

  useEffect(() => {
    const first_item = accordion.current.querySelector(".accordion-item:first-child");
    (first_item?.querySelector(".accordion-button") as HTMLButtonElement)?.click();
  }, []);

  return (
    <div className="accordion" id={id} ref={accordion}>
      {children}
    </div>
  );
}
