import { useContext } from "react";

import Carousel from "../components/Carousel";
import Items from "../components/Items";
import { EventLink } from "../components/Links";
import ItemsContext from "../contexts/ItemsContext";
import events from "../events.json";

export default function HomePage() {
  const items = useContext(ItemsContext);

  return (
    <main className="py-5">
      <Carousel
        className="bg-bg-dark-gradient border-3 border-accent-2 border-bottom border-top"
        id="home"
        data={events.events.map(({ id, jumbotron, name }) => ({ id, alt: name, src: jumbotron }))}
        Item={EventLink}
      />
      <Items items={items} title="Featured items" />
    </main>
  );
}
