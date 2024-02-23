import { useState, useEffect, useCallback } from "react";
import HoverModalComponent from "./modal/hover-model.component";

const isChineseCharacter = (text: string) => {
  return /[\u4e00-\u9fa5]/.test(text);
};

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

const getWordFromText = (text: string, offset: number) => {
  // Split the text by spaces to get individual words
  const words = text.split(/(\s+)/).filter((w) => w.trim().length > 0);

  let cumulativeLength = 0;
  // Find the word that contains the offset
  for (const word of words) {
    cumulativeLength += word.length;
    if (offset <= cumulativeLength) {
      return isChineseCharacter(word) ? word : "";
    }
  }
  return "";
};

const HoverWatcherComponent = () => {
  const [isChinese, setIsChinese] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    debounce((e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const element = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement;

      if (element && element.textContent) {
        const range = document.caretRangeFromPoint(e.clientX, e.clientY);
        if (range) {
          const text = element.textContent;
          const offset = range.startOffset;
          const word = getWordFromText(text, offset);

          if (word && isChineseCharacter(word)) {
            setIsChinese(true);
            setSelectedWord(word);
            return;
          }
        }
      }
      setIsChinese(false);
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
        <HoverModalComponent
          selectedModal={{
            word: selectedWord,
            meaning: "Noun. This is the meaning of the word",
            mousePosition,
          }}
        />
      )}
    </>
  );
};

export default HoverWatcherComponent;
