import { useEffect, useRef, useState } from "react";
import { useCart } from "react-use-cart";
import { BLANK_ITEM } from "../../helpers";

export default function ConfirmRemoval() {
  const { removeItem } = useCart();

  const modal = useRef<HTMLDivElement>(undefined!);
  const modal_close = useRef<HTMLButtonElement>(undefined!);

  const [item, setItem] = useState(BLANK_ITEM);

  useEffect(() => {
    modal.current.addEventListener("show.bs.modal", (ev) => {
      const btn = (ev as unknown as { relatedTarget: HTMLButtonElement }).relatedTarget;
      const item = btn.getAttribute("data-bs-item");
      if (item) {
        setItem(JSON.parse(item));
      }
    });
  }, []);

  return (
    <div className="modal fade" id="confirm-removal" ref={modal} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="confirm-removal-label">
              Confirm Removal
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              ref={modal_close}
              title="Cancel"
            />
          </div>
          <div className="modal-body">Remove {item.name}?</div>
          <div className="modal-footer">
            <div className="btn-solid btn-pri rounded-2">
              <button type="button" className="btn w-100" data-bs-dismiss="modal">
                Cancel
              </button>
            </div>
            <div className="btn-solid btn-danger rounded-2">
              <button
                type="button"
                className="btn w-100"
                onClick={() => {
                  removeItem(item.hex_id);
                  modal_close.current.click();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
