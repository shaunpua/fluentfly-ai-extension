import { FC } from "react";
import SelectedWordModal from "../models";

interface HoverModalProp {
  selectedModal: SelectedWordModal;
}

const HoverModalComponent: FC<HoverModalProp> = ({ selectedModal }) => {
  const { word, meaning, mousePosition } = selectedModal;

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
        {word}
      </h3>
      <p className=" text-base text-primary-text-lt overflow-hidden">
        {meaning}
      </p>
    </div>
  );
};

export default HoverModalComponent;
