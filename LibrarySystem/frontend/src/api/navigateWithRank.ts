import { type NavigateFunction } from "react-router-dom";

export const navigateWithRank = async (
  bookId: number,
  navigate: NavigateFunction
): Promise<void> => {
  try {
    await fetch(`/api/rank/${bookId}`, { method: "POST" });
  } catch (error) {
    console.error("送出排行榜紀錄失敗:", error);
  } finally {
    navigate(`/books/${bookId}`);
  }
};
