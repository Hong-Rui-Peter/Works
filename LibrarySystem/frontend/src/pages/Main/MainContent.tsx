import { useEffect, useState } from "react";
import axios from "axios";
import "./MainContent.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../../components/FavoriteButton";
import type { Book } from "../../pages/Result/Book";

const MainContent = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();
  const account = sessionStorage.getItem("user");

  const truncateText = (text: string, maxLength: number): string =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get<Book[]>("/api/rank");
        setBooks(res.data);
      } catch (error) {
        console.error("載入書籍時發生錯誤:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleBookClick = async (bookId: number) => {
    try {
      await fetch(`/api/rank/${bookId}`, { method: "POST" });
    } catch (error) {
      console.error("送出排行榜紀錄失敗:", error);
    } finally {
      navigate(`/books/${bookId}`);
    }
  };
  return (
    <div className="container">
      <h2 className="content-txt">熱門小說</h2>
      <div className="popular__list">
        {books.slice(0, 6).map((book) => (
          <div className="item" key={book.id}>
            <div className="image">
              <Link to={`/books/${book.id}`}>
                <img src={book.bookIcon} alt={book.bookName} />
              </Link>
            </div>
            <dl>
              <dt>
                <span>{book.author}</span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBookClick(book.id);
                  }}
                >
                  {book.bookName}
                </a>
              </dt>
              <dd>{truncateText(book.bookText, 100)}</dd>
            </dl>
            <div className="favorite-button">
              {account && (
                <FavoriteButton
                  bookId={book.id.toString()}
                  account={account}
                  defaultFavorited={book.isLike === 2}
                  size={26}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
