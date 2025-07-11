import axios from "axios";
import type {Book} from "../pages/Result/Book.ts";

export const fetchBooks = async (
    keyword?: string,
    author?: string,
    tag?: string,
    size?: number,
    skip?: number) => {

    try {

        const params: { [key: string]: string | number } = {};

        if (keyword) {
            params.keyword = keyword;
        }
        if (author) {
            params.author = author;
        }
        if (tag) {
            params.tag = tag;
        }
        if (size) {
            params.size = size;
        }
        if (skip) {
            params.skip = skip;
        }

        const response = await axios.get<Book[]>("/api/book", { params });

        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}