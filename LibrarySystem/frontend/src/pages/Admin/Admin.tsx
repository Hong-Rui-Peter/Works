import { useEffect, useState } from "react";
import type { Book } from "../Result/Book.ts";
import { fetchBooks } from "../../api/fetchBooks.ts";
import { useNavigate, useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Table } from "react-bootstrap";
import "./Admin.css";
import axios from "axios";

const PAGE_SIZE = 20;

const Admin = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const author = searchParams.get("author");
    const tag = searchParams.get("tag");

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const account = sessionStorage.getItem('user');

    if (account !== "admin") {
        navigate(`/`);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate(`/admin?keyword=${encodeURIComponent(query)}`);
    };

    useEffect(() => {
        setBooks([]);
        setSkip(0);
        setHasMore(true);
        loadMoreBooks(true);
    }, [keyword, author, tag]);

    const loadMoreBooks = async (isFirstLoad = false) => {
        try {
            const newBooks = await fetchBooks(
                keyword || undefined,
                author || undefined,
                tag || undefined,
                PAGE_SIZE,
                isFirstLoad ? 0 : skip
            );

            if (newBooks.length > 0) {
                setBooks(prev => isFirstLoad ? newBooks : [...prev, ...newBooks]);
                setSkip(prev => prev + newBooks.length);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("讀取書籍時發生錯誤：", error);
            setHasMore(false);
        }
    };

    const handleBookClick = async (bookId: number) => {
        navigate(`/books/${bookId}`);
    };

    const deleteBook = async (id: number) => {
        const confirmDelete = window.confirm("確定要刪除嗎？");
        if (!confirmDelete) return;

        try {
            const res = await axios.delete(`/api/book/${id}`);
            if (res.data && typeof res.data === 'string' && res.data !== "") {
                alert(`刪除失敗：${res.data}`);
            } else {
                alert("刪除成功");
                setBooks(prev => prev.filter(book => book.id !== id));
            }
        } catch (error) {
            console.error("刪除失敗：", error);
            alert("刪除失敗，請稍後再試。");
        }
    };

    return (
        <>
            <div
                className="tm-hero d-flex justify-content-center align-items-center"
                data-parallax="scroll"
                style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <form className="d-flex tm-search-form" onSubmit={handleSubmit}>
                    <input
                        className="form-control tm-search-input"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="btn btn-outline-success tm-search-btn" type="submit">
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            </div>

            <InfiniteScroll
                dataLength={books.length}
                next={() => loadMoreBooks()}
                hasMore={hasMore}
                loader={<p className="text-center">載入中...</p>}
                endMessage={<p className="text-center">沒有更多書籍了</p>}
            >
                <Table className="admin-table">
                    <thead>
                    <tr>
                        <th>名稱</th>
                        <th>內容</th>
                        <th>作者</th>
                        <th>封面</th>
                        <th>標籤</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleBookClick(book.id);
                                    }}
                                >
                                    {book.bookName}
                                </a>
                            </td>
                            <td className="limit-text">{book.bookText}</td>
                            <td>{book.author}</td>
                            <td>
                                {book.bookIcon ? (
                                    <img src={book.bookIcon} alt="封面" style={{ maxWidth: 50 }} />
                                ) : (
                                    "無封面"
                                )}
                            </td>
                            <td>{book.tag}</td>
                            <td>
                                <button
                                    onClick={() => deleteBook(book.id)}
                                    style={{
                                        backgroundColor: "#e74c3c",
                                        color: "white",
                                        border: "none",
                                        padding: "5px 10px",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    刪除
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </InfiniteScroll>
        </>
    );
};

export default Admin;
