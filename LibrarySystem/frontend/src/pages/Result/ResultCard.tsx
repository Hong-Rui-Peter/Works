import type { Book } from "./Book";
import { Link } from "react-router-dom";
import "./BookCard.css";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../../components/FavoriteButton.tsx";

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();
  const account = sessionStorage.getItem('user');

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
    <div className="card book-card">
      {account && (
          <FavoriteButton
              bookId={book.id.toString()}
              account={account}
              defaultFavorited={book.isLike == 2}
              size={26}
          />
      )}
      <div className="card-content">
        <img src={book.bookIcon} alt={book.bookName} className="book-image" />
        <div className="card-body">
          <h5 className="card-title">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleBookClick(book.id);
              }}
            >
              {book.bookName}
            </a>
          </h5>
          <p className="card-author">
            作者：
            <Link to={`/result?author=${book.author}`} className="author-link">
              {book.author}
            </Link>
          </p>
          <p className="card-text">{book.bookText}</p>
          <p className="card-tag">
            <Link to={`/result?tag=${book.tag}`} className="author-link" style={{color: "#999"}}>
              #{book.tag}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
