import { useState, useEffect, useCallback } from "react";
import HoverModalComponent from "./modal/hover-model.component";
import { getChineseDictionarySelectedWord } from "../api/api-indexdb";
import CDictionaryInstance from "../api/models";

interface HoverModalState {
  dictionary: CDictionaryInstance[] | null;
  mousePosition: {
    x: number;
    y: number;
  };
}

const isChineseCharacter = (text: string) => {
  return /[\u4e00-\u9fa5]/.test(text);
};

const selectHoveredWord = (text: string, offset: number): string => {
  if (offset < 0 || offset >= text.length) return "";

  let end = offset;
  for (let i = 0; i < 5 && end < text.length; i++, end++) {
    if (!isChineseCharacter(text[end])) {
      break; // Stop if we encounter a non-Chinese character
    }
  }
  return text.substring(offset, end);
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

const HoverWatcherComponent = () => {
  const [isChinese, setIsChinese] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [modalData, setModalData] = useState<HoverModalState>({
    dictionary: null,
    mousePosition: { x: 0, y: 0 },
  });

  useEffect(() => {
    const getChineseDictionarySelectedWordData = async (word: string) => {
      try {
        const data = await getChineseDictionarySelectedWord(word);

        data.sort((a, b) => b.simplified.length - a.simplified.length);
        console.log("RESPONSE DB", data);
        setModalData((currentState) => ({
          ...currentState,
          dictionary: data,
        }));
      } catch (error) {
        console.error("Failed to fetch dictionary entries:", error);
      }
    };

    if (selectedWord) {
      getChineseDictionarySelectedWordData(selectedWord);
    }
  }, [selectedWord]);

  const handleMouseMove = useCallback(
    debounce((e) => {
      const element = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement;

      if (element && element.textContent) {
        const range = document.caretRangeFromPoint(e.clientX, e.clientY);
        if (range) {
          const text = element.textContent || "";
          const offset = Math.min(range.startOffset, text.length - 1);
          const charUnderCursor = text[offset];

          if (isChineseCharacter(charUnderCursor)) {
            const word = selectHoveredWord(text, offset);
            if (word) {
              setIsChinese(true);
              setSelectedWord(word);
              setModalData((currentState) => ({
                ...currentState,
                mousePosition: { x: e.clientX, y: e.clientY },
              }));
              console.log("hover data", isChinese, selectedWord);
              return;
            }
          }
        }
      }
      setIsChinese(false);
    }, 200),
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
      {isChinese && modalData.dictionary && (
        <HoverModalComponent
          dictionary={modalData.dictionary!}
          mousePosition={modalData.mousePosition}
        />
      )}
    </>
  );
};

export default HoverWatcherComponent;
