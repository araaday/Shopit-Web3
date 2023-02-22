import "./ImageInput.css";

type ImageInputProps = JSX.IntrinsicElements["figure"] & {
  img_props: Omit<JSX.IntrinsicElements["img"], "alt" | "id">;
  label_props: Omit<JSX.IntrinsicElements["label"], "htmlFor" | "role">;
  input_props: Omit<JSX.IntrinsicElements["input"], "accept" | "className" | "id" | "type">;
};

export default function ImageInput({
  img_props: { className: img_className, src, ...img_props },
  label_props: { className: label_className, ...label_props },
  input_props,
  className,
  id: id_prop,
  ...figure_props
}: ImageInputProps) {
  const id = `${id_prop}-image-input`;

  return (
    <figure
      className={`image-input position-relative ${className || ""} ${
        src ? "imaged-input" : "border border-secondary"
      }`}
      id={id}
      {...figure_props}
    >
      <img
        alt="Preview"
        className={`aspect-ratio-square d-block image-input-img w-100 ${img_className || ""}`}
        id={`${id}-img`}
        {...img_props}
        src={src}
      />
      <label
        className={`align-items-center d-flex h-100 image-input-label justify-content-center position-absolute start-0 top-0 w-100 ${
          label_className || ""
        }`}
        htmlFor={`${id}-input`}
        role="button"
        {...label_props}
      >
        <i className="fa-solid fa-image" />
      </label>
      <input
        accept="image/png, image/jpeg"
        className="d-none"
        id={`${id}-input`}
        type="file"
        {...input_props}
      />
    </figure>
  );
}
