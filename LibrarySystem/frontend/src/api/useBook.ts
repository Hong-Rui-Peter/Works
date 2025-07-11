// hooks/useBook.ts
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Book } from "../pages/Result/Book";

export function useBook() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const idNum = parseInt(id ?? "", 10);
    if (isNaN(idNum)) {
      setError("無效的書籍 ID");
      setLoading(false);
      return;
    }

    axios
      .get<Book>(`/api/book/${idNum}`)
      .then((res) => {
        setBook(res.data);
        setError("");
      })
      .catch(() => {
        setError("找不到該書籍或發生錯誤");
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { book, loading, error };
}
