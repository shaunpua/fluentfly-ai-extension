import { useState, useEffect, useCallback } from "react";
import HoverModalComponent from "./modal/hover-model.component";

const isChineseCharacter = (text: string) => {
  return /[\u4e00-\u9fa5]/.test(text);
};

// Debounce function to limit how often a function is executed
const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>) => {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
};

const HoverWatcherComponent = () => {
  const [isChinese, setIsChinese] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Use useCallback to memoize the debounced function
  const handleMouseMove = useCallback(
    debounce((e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (
        element &&
        element.textContent &&
        isChineseCharacter(element.textContent)
      ) {
        setIsChinese(true);
        setSelectedWord(element.textContent);
      } else {
        setIsChinese(false);
      }
    }, 200), // 200ms debounce time
    []
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <>
      {isChinese && (
        <div
          style={{
            position: "absolute",
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y + 20}px`, // TODO PASS AS PROPS
          }}
        >
          <HoverModalComponent
            selectedModal={{
              word: selectedWord,
              meaning: "Noun. This is the meaning of the word",
            }}
          />
        </div>
      )}
    </>
  );
};

export default HoverWatcherComponent;
