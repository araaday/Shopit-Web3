import { PropsWithChildren } from "react";
import { Attributes, FunctionComponentElement, useEffect } from "react";

import "./Carousel.css";

type DataItem = Pick<JSX.IntrinsicElements["img"], "alt" | "src"> & {
  id: string;
};
type CarouselItemProps = PropsWithChildren & { className: string; id: string };
type CarouselProps = {
  data: DataItem[];
  id: string;
  Item: (props: Attributes & CarouselItemProps) => FunctionComponentElement<CarouselItemProps>;
  className?: string;
};

export default function Carousel({ className, data, id: id_prop, Item }: CarouselProps) {
  const id = `${id_prop}-carousel`;
  const id_reference = `#${id}`;

  const indicators: JSX.Element[] = [];
  const items: JSX.Element[] = [];
  for (let i = 0; i < data.length; i++) {
    const { id, alt, src } = data[i];
    indicators.push(
      <button data-bs-target={id_reference} data-bs-slide-to={i} key={id} type="button" />
    );
    items.push(
      <Item className="carousel-item" id={id} key={id}>
        <img alt={alt} className="d-block object-contain" height={500} src={src} width="100%" />
        <div className="carousel-caption d-none d-md-block">
          <h5>{alt}</h5>
        </div>
      </Item>
    );
  }

  useEffect(() => {
    const firsts = document.querySelectorAll(`${id_reference} > div > :first-child`);
    firsts.forEach((el) => el.classList.add("active"));
  }, [id_reference]);

  return (
    <div id={id} className={`carousel carousel-fade mb-5 slide ${className || ""}`} data-bs-ride>
      <div className="carousel-indicators">{indicators}</div>
      <div className="carousel-inner">{items}</div>
      <button
        className="carousel-control-prev"
        data-bs-target={id_reference}
        data-bs-slide="prev"
        type="button"
      >
        <i className="carousel-control-prev-icon" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        data-bs-target={id_reference}
        data-bs-slide="next"
        type="button"
      >
        <i className="carousel-control-next-icon" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
