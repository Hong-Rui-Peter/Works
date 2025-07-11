import { Link } from "react-router-dom";
import "../SinglePage/SinglePage.css";
import { useBook } from "../../api/useBook";
import { useBookByContent } from "../../api/useBookByContent";
import { useSortedChapters } from "../../api/useSortedChapters";

const SinglePage = () => {
  const { book, loading, error } = useBook();
  const { chapters } = useBookByContent();

  // 排序邏輯
  const { sortedChapters, isDescending, setIsDescending } =
    useSortedChapters(chapters);

  const sortedChaptersDate = [...chapters].sort((a, b) => {
    return new Date(b.createDate).getTime() - new Date(a.createDate).getTime();
  });

  const latestChapter =
    sortedChaptersDate.length > 0 ? sortedChaptersDate[0] : null;

  if (loading) return <div>載入中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="content">
        <div className="container">
          <ol className="breadcrumb">
            <li>
              <Link to="/" title="書界小說">
                首頁
              </Link>
            </li>
            <li>
              <Link to={`/result?tag=${encodeURIComponent(book?.tag ?? "")}`}>
                {book?.tag}
              </Link>
            </li>
            <li className="active">
              {book?.id ? (
                <Link to={`/books/${book.id}`}>{book.bookName}</Link>
              ) : (
                <span>資料錯誤</span>
              )}
            </li>
          </ol>
          <div className="book pt10">
            <div className="bookcover hidden-xs">
              <img
                className="thumbnail"
                src={book?.bookIcon}
                alt={book?.bookName}
              />
            </div>
            <div className="bookinfo">
              <h1 className="booktitle">{book?.bookName}</h1>
              <p className="booktag">
                <span className="bule">
                  <Link
                    to={`/result?tag=${encodeURIComponent(book?.tag ?? "")}`}
                    className="author-link"
                  >
                    {book?.tag}
                  </Link>
                </span>
              </p>
              <p></p>
              <p className="booktitle-new">
                最新章節:
                <a
                  className="bookchapter"
                  href={`/chapter/${latestChapter?.id}/${latestChapter?.chapter_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &nbsp; &nbsp;{latestChapter?.title}
                </a>
              </p>
              <p className="booktime">
                更新時間: &nbsp;{latestChapter?.createDate}
              </p>
              <div className="clear"></div>
            </div>
          </div>
          <dl className="book chapterlist">
            <dt>
              <h2 className="chapter-title">
                {book?.bookName} 全部章節目錄
                <div className="sorting">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDescending(false);
                    }}
                    style={{ display: isDescending ? "inline" : "none" }}
                  >
                    倒序
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDescending(true);
                    }}
                    style={{ display: isDescending ? "none" : "inline" }}
                  >
                    正序
                  </a>
                </div>
              </h2>
            </dt>
            <hr />
            <div id="allchapter">
              {sortedChapters.map((chapter) => (
                <dd key={chapter.id}>
                  <Link
                    to={`/chapter/${chapter.id}/${chapter.chapter_number}`}
                    className="chapter-link"
                  >
                    {chapter.title}
                  </Link>
                </dd>
              ))}
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};
export default SinglePage;
