import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Chapter } from "../type/BookContent";

export function useBookByContent() {
  const { id } = useParams<{ id: string }>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading_content, setLoading] = useState<boolean>(true);
  const [error_content, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError("");
    fetch(`/api/chapter/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("找不到該書籍或發生錯誤");
        }
        return response.json();
      })
      .then((data: Chapter[]) => {
        setChapters(data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return { chapters, loading_content, error_content };
}
