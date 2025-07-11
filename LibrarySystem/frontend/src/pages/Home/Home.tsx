// import { useEffect, useState } from "react";
// import CardExample from "../CardExample/CardExample";
// import axios from "axios";
import "./Home.css";
import SearchForm from "../../components/SearchForm.tsx";
import MainContent from "../Main/MainContent.tsx";

// interface Book {
//   id: number;
//   bookName: string;
//   bookText: string;
//   author: string;
//   bookIcon: string;
//   tag: string;
//   rank: number;
// }

const Home = () => {
  // const [books, setBooks] = useState<Book[]>([]);
  //
  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       const res = await axios.get<Book[]>("/api/rank");
  //       setBooks(res.data);
  //     } catch (error) {
  //       console.error("載入書籍時發生錯誤:", error);
  //     }
  //   };
  //
  //   fetchBooks();
  // }, []);

  return (
    <>
          <SearchForm></SearchForm>
        <div className="container-fluid tm-container-content tm-mt-60">
            <MainContent/>
        </div>
    </>
  );
};

export default Home;
