import { FC } from "react";
import SelectedWordModal from "../models";
import CDictionaryInstance from "../../api/models";

interface HoverModalProp {
  dictionary: CDictionaryInstance;
  mousePosition: { x: number; y: number };
}

const HoverModalComponent: FC<HoverModalProp> = ({
  dictionary,
  mousePosition,
}) => {
  const { simplified, traditional, english } = dictionary;

  return (
    <div
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y + 20}px`,
        position: "absolute",
      }}
      className="w-36 h-auto z-max flex flex-col items-start justify-center p-4 bg-primary-background-lt  rounded-lg shadow-lg overflow-hidden"
    >
      <h3 className=" text-lg text-primary-text-lt font-bold overflow-hidden">
        {simplified}
      </h3>
      <p className=" text-base text-primary-text-lt overflow-hidden">
        {english[0]}
      </p>
    </div>
  );
};

export default HoverModalComponent;
