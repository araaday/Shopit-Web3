import "./index.css";
import Events from "../../components/Events";

export default function EventsPage() {
  return (
    <main className="bg-bg-dark-gradient position-relative py-5 text-center">
      <h1 className="border-4 border-bottom d-inline events-header">
        Events from your Favorite Brands!
      </h1>
      <div className="brandsItems">
        <Events />
      </div>
      <div className="addButton btn-solid btn-pri position-fixed rounded-2">
        <button className="btn btn-lg rounded-2 shadow-sm">Create Your Own Event</button>
      </div>
    </main>
  );
}
