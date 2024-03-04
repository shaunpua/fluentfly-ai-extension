import { FC } from "react";

import CDictionaryInstance from "../../api/models";

interface HoverModalProp {
  dictionary: CDictionaryInstance[];
  mousePosition: { x: number; y: number };
}

const HoverModalComponent: FC<HoverModalProp> = ({
  dictionary,
  mousePosition,
}) => {
  return (
    <div
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y + 40}px`,
        position: "absolute",
      }}
      className="min-w-40  max-w-48 h-auto z-max flex flex-col items-start justify-center p-4 bg-primary-background-lt  rounded-lg shadow-lg overflow-hidden"
    >
      {Array.isArray(dictionary) &&
        dictionary.map((word) => {
          return (
            <div key={word.id}>
              <h3 className=" text-lg text-primary-text-lt font-bold overflow-hidden">
                {word.simplified}
                {word.traditional.trim() !== word.simplified.trim() &&
                  ` ${word.traditional.trim()}`}
              </h3>
              <div className="w-5/6 flex items-center justify-start">
                {word.english.map((meaning) => {
                  return (
                    <p
                      key={meaning[0]}
                      className="pl-r text-xs text-primary-text-lt"
                    >{` • ${meaning}`}</p>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default HoverModalComponent;
