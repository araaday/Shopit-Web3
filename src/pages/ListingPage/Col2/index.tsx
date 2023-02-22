import Quantity from "./Quantity";

import "./index.css";

export default function Col2() {
  return (
    <div className="d-flex flex-column gap-4 rightcontainer">
      <textarea
        className="bg-transparent border-secondary border-end-0 border-start-0 border-top-0 fs-2 text-primary"
        name="name"
        placeholder="Item Name"
        required
        rows={1}
      />
      <div className="bg-light border border-dark d-flex flex-column flex-xxl-row gap-3 half-grow px-5 py-4 rounded-3 text-grey w-100">
        <div className="d-flex flex-column flex-md-row fs-3 align-items-center">
          <span className="me-md-2">Price:</span>
          <span className="text-center">
            <input
              className="px-2"
              id="list-item-price-input"
              name="price"
              required
              title="Price"
              type="number"
            />
            <span className="ms-1">Tokens</span>
          </span>
        </div>
        <div className="d-flex flex-column flex-md-row align-items-center">
          <div className="fs-3 me-md-3">Quantity:</div>
          <Quantity />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        <h3 className="d-inline pb-1 title-underline">Description</h3>
        <textarea
          className="bg-transparent border-secondary w-100"
          name="description"
          placeholder="Describe this item..."
          required
          rows={1}
        />
      </div>
    </div>
  );
}
