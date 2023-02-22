import { EventLink } from "./Links";

import "./Event.css";

type EventProps = {
  item: {
    id: string;
    img: string;
    name: string;
  };
};

export default function Event({ item }: EventProps) {
  return (
    <div className="border border-3 border-accent-2 btn-solid btn-dark rounded-4">
      <EventLink
        className="btn h-100 px-2 py-3 shopit-event rounded-4 text-decoration-none"
        id={item.id}
      >
        <img
          alt={item.name}
          className="object-contain shopit-event-img"
          src={item.img}
          width="100%"
        />
        <h5 className="mt-3 text-center">{item.name}</h5>
      </EventLink>
    </div>
  );
}
