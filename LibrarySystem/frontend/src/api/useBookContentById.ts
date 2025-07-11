import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { BookContentByPic } from "../type/BookContent";

export function useBookContentById() {
  const { id, chapter_number } = useParams<{
    id: string;
    chapter_number: string;
  }>();
  const [book, setChapter] = useState<BookContentByPic | null>(null);
  const [loading_content, setLoading] = useState<boolean>(true);
  const [error_content, setError] = useState<string>("");

  useEffect(() => {
    if (!id || !chapter_number) return;

    fetch(`/api/chapter/${id}/${chapter_number}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch chapter");
        return res.json();
      })
      .then((data: BookContentByPic) => {
        setChapter(data);
        setLoading(false); // ✅ 成功後關閉 loading
      })
      .catch((err) => {
        console.error("取得章節錯誤:", err);
        setChapter(null);
        setError(err.message);
        setLoading(false); // ✅ 錯誤後也關閉 loading
      });
  }, [id, chapter_number]);

  return { book, loading_content, error_content };
}
