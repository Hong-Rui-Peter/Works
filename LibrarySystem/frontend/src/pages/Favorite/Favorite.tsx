import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FavoriteButton from '../../components/FavoriteButton';
import './Favorite.css';

interface Book {
  id: string;
  bookName: string;
  bookText: string;
  author: string;
  bookIcon: string;
  tag?: string;
}

const Favorite: React.FC = () => {
  const account = sessionStorage.getItem('user');
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (account) {
      axios.get(`/api/favorite/${account}`)
        .then(res => {
          setBooks(res.data);
        })
        .catch(err => console.error('取得收藏清單失敗', err));
    }
  }, [account]);

  return (
    <div className="favorite-container">
      <h2>我的最愛</h2>
      <div className="favorite-flex">
        {books.map(book => (
          <div className="item" key={book.id}>
            <div className="image">
              <a href={`/books/${book.id}`}>
                <img src={book.bookIcon} alt={book.bookName} />
              </a>
              {account && (
                <FavoriteButton
                  bookId={book.id}
                  account={account}
                  defaultFavorited={true}
                  size={26}
                />
              )}
            </div>
            <dl>
              <dt>
                <span>{book.author}</span>
                <a href={`/books/${book.id}`}>{book.bookName}</a>
              </dt>
              <dd>{book.bookText.length > 100 ? book.bookText.slice(0, 100) + '...' : book.bookText}</dd>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
