import { useState, useMemo } from "react";
import type { Chapter } from "../type/BookContent";

export function useSortedChapters(chapters: Chapter[]) {
  const [isDescending, setIsDescending] = useState<boolean>(true);

  const sortedChapters = useMemo(() => {
    return [...chapters].sort((a, b) => {
      const timeA = new Date(a.createDate).getTime();
      const timeB = new Date(b.createDate).getTime();
      return isDescending ? timeB - timeA : timeA - timeB;
    });
  }, [chapters, isDescending]);

  return {
    sortedChapters,
    isDescending,
    setIsDescending,
  };
}
