import events from "../events.json";
import Event from "./Event";

export default function Events() {
  return (
    <div className="d-flex flex-wrap gap-5 justify-content-center m-5">
      {events.events.map((item) => (
        <Event item={item} key={item.id} />
      ))}
    </div>
  );
}
