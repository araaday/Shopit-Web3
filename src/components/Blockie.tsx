import "./Blockie.css";

export type BlockieProps = {
  size: JSX.IntrinsicElements["img"]["height"];
  src: JSX.IntrinsicElements["img"]["src"];
};

export default function Blockie({ size, src }: BlockieProps) {
  return (
    <img
      alt="Blockie"
      className="aspect-ratio-square rounded-pill"
      height={size}
      src={src}
      width={size}
    />
  );
}
