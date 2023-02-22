import { ReactNode, useState } from "react";

import "./ConfirmationBtn.css";

type ConfirmationBtnProps = {
  negative: ReactNode;
  positive: ReactNode;
};

export default function ConfirmationBtn({ positive, negative }: ConfirmationBtnProps) {
  const [status, setStatus] = useState(false);

  function handleClick() {
    setStatus(!status);
  }

  return status ? (
    <button className="confirmation-btn confirmed" onClick={handleClick}>
      {positive}
    </button>
  ) : (
    <button className="confirmation-btn unconfirmed" onClick={handleClick}>
      {negative}
    </button>
  );
}
