import BrowserImageManipulation from "browser-image-manipulation";

import BaseImageInput from "../../components/ImageInput";

type ImageInputProps = {
  setSrc: SetState<string>;
  src: string;
};

export default function ImageInput({ setSrc, src }: ImageInputProps) {
  return (
    <BaseImageInput
      className="mb-0 rounded-pill"
      id="profile"
      img_props={{
        className: "rounded-pill",
        height: 120,
        src,
        width: 120
      }}
      label_props={{ className: "rounded-pill" }}
      input_props={{
        onChange: (ev) => {
          const file = ev.target.files?.[0];
          if (file) {
            return new BrowserImageManipulation()
              .loadBlob(file)
              .toSquare(768)
              .saveAsImage()
              .then(setSrc);
          }
        }
      }}
    />
  );
}
