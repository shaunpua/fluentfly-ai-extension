import { FC } from "react";
import SelectedWordModal from "../models";

interface HoverModalProp {
  selectedModal: SelectedWordModal;
}

const HoverModalComponent: FC<HoverModalProp> = ({ selectedModal }) => {
  const { word, meaning } = selectedModal;

  return (
    <div className=" w-28 h-24 z-max flex flex-col items-start justify-center p-4 bg-primary-background-lt  z-max rounded-lg shadow-lg">
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
