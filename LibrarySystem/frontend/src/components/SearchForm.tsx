import { useState } from 'react';
import {useNavigate} from "react-router-dom";

const SearchForm = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!query.trim()) {
            return;
        }

        navigate(`/result?keyword=${encodeURIComponent(query)}`);
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
        </>
    );
}

export default SearchForm;
