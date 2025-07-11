import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBookContentById } from "../../api/useBookContentById";
import "../SinglePage/PageContent.css";

const PageContent = () => {
  const { book, loading_content, error_content } = useBookContentById();

  useEffect(() => {
    if (book) {
      document.title = `${book.title}`;
    }
    return () => {
      document.title = "書界小說";
    };
  }, [book]);

  if (loading_content) return <div>載入中...</div>;
  if (error_content) return <div>{error_content}</div>;
  if (!book) return <div>找不到章節內容</div>;

  return (
    <div className="content">
      <div className="container">
        {/* Breadcrumb 導覽列 */}
        <ol className="breadcrumb">
          <li>
            <Link to="/" title="書界小說">
              首頁
            </Link>
          </li>
          <li>
            <Link to={`/result?tag=${encodeURIComponent(book.tag)}`}>
              {book.tag}
            </Link>
          </li>
          <li className="active">
            <Link to={`/books/${book.id}`}>{book.bookName}</Link>
          </li>
        </ol>
        <div className="book read">
          {/* 章節標題 */}
          <h2 className="chapter-title">{book.title}</h2>
          {/* 章節內容 */}
          <div className="chapter-content">
            {book.content
              .split("\n")
              .filter((line) => line.trim() !== "") // 避免空白行
              .map((line, index) => (
                <p key={index}>{line.trim()}</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PageContent;
