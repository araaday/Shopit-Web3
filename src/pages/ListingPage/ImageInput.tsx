import BrowserImageManipulation from "browser-image-manipulation";

import BaseImageInput from "../../components/ImageInput";

type ImageProps = {
  setSrc: SetState<string>;
  src: string;
};

export default function ImageInput({ setSrc, src }: ImageProps) {
  return (
    <BaseImageInput
      className="leftcontainer rounded-3"
      id="list-item"
      img_props={{ className: "rounded-3", src }}
      label_props={{ className: "rounded-3" }}
      input_props={{
        name: "image",
        onChange: (ev) => {
          const file = ev.target.files?.[0];
          if (file) {
            return new BrowserImageManipulation()
              .loadBlob(file)
              .toSquare(768)
              .saveAsImage()
              .then(setSrc);
          }
        },
        required: true
      }}
    />
  );
}
