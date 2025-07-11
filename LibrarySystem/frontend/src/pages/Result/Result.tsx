import { useEffect, useState } from "react";
import type { Book } from "./Book.ts";
import { fetchBooks } from "../../api/fetchBooks.ts";
import { useSearchParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import BookCard from "./ResultCard.tsx";
import SearchForm from "../../components/SearchForm.tsx";

const PAGE_SIZE = 10;

const Result = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const author = searchParams.get("author");
    const tag = searchParams.get("tag");

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

    return (
        <>
            <SearchForm />
            <Container className="pt-4">
                <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
                    {keyword && <h1>搜尋關鍵字 {keyword} 的結果：</h1>}
                    {author && <h1>搜尋作者 {author} 的結果：</h1>}
                    {tag && <h1>搜尋分類 {tag} 的結果：</h1>}
                </div>
                <InfiniteScroll
                    dataLength={books.length}
                    next={() => loadMoreBooks()}
                    hasMore={hasMore}
                    loader={<p className="text-center">載入中...</p>}
                    endMessage={<p className="text-center">沒有更多書籍了</p>}
                    style={{ overflow: "hidden" }}
                >
                    <Row>
                        {books.map(book => (
                            <Col key={book.id} xs={12} md={6} lg={4} className="mb-4">
                                <BookCard book={book} />
                            </Col>
                        ))}
                    </Row>
                </InfiniteScroll>
            </Container>
        </>
    );
};

export default Result;
