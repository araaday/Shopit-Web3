import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

import "./Searchbar.css";

type SearchbarProps = Pick<Attributes, "className"> &
  Pick<JSX.IntrinsicElements["input"], "placeholder"> & {
    getResults: (query: string) => ReactNode[];
    id: string;
  };

export default function Searchbar({
  getResults,
  id,
  className: classNameProp,
  placeholder
}: SearchbarProps) {
  const className = useMemo(
    () =>
      `d-flex flex-grow-1 flex-md-grow-0 fs-5 mt-2 pb-1 position-relative searchbar ${
        classNameProp || "text-white"
      }`,
    [classNameProp]
  );
  const input_id = useMemo(() => `searchbar-${id}`, [id]);

  const [results, setResults] = useState<ReactNode[]>([]);
  const container = useRef<HTMLDivElement>(undefined!);
  const input = useRef<HTMLInputElement>(undefined!);

  useEffect(() => {
    const input_element = input.current;
    const container_element = container.current;
    input_element.onblur = () => setTimeout(() => container_element.classList.remove("focus"), 250);
    input_element.onfocus = () => container_element.classList.add("focus");
  }, []);

  const changeQuery = useCallback<Exclude<JSX.IntrinsicElements["input"]["onChange"], undefined>>(
    ({ target: { value } }) => setResults(value ? getResults(value) : []),
    [getResults]
  );

  return (
    <div className={className} ref={container}>
      <label className="fa-solid fa-magnifying-glass my-auto pe-3 ps-1" htmlFor={input_id} />
      <div className="position-relative w-100">
        <input
          className="bg-transparent border-0 d-flex w-100"
          id={input_id}
          onChange={changeQuery}
          placeholder={placeholder || "Search..."}
          ref={input}
        />
        {results.length ? (
          <div className="me-3 mt-3 position-absolute results w-50">{results}</div>
        ) : (
          <></>
        )}
      </div>
      <div className="top-100 overborder position-absolute w-100" />
    </div>
  );
}
