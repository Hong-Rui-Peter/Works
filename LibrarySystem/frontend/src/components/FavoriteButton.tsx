import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';

interface FavoriteButtonProps {
  bookId: string;
  account: string;
  defaultFavorited?: boolean;
  onToggle?: (isNowFavorited: boolean) => void;
  size?: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  bookId,
  account,
  defaultFavorited = true,
  onToggle,
  size = 24
}) => {
  const [isFavorited, setIsFavorited] = useState(defaultFavorited);

  useEffect(() => {
    setIsFavorited(defaultFavorited);
  }, [defaultFavorited]);

  const toggleFavorite = async () => {
    if (!account) return;

    try {
      if (isFavorited) {
        await axios.delete(`/api/favorite/${account}/${bookId}`);
        setIsFavorited(false);
        onToggle?.(false);
      } else {
        await axios.post(`/api/favorite/${account}/${bookId}`);
        setIsFavorited(true);
        onToggle?.(true);
      }
    } catch (error) {
      console.error('切換收藏失敗', error);
    }
  };

  return (
    <div
      onClick={toggleFavorite}
      style={{
        cursor: 'pointer',
        color: isFavorited ? 'red' : 'gray',
        fontSize: `${size}px`,
        position: 'absolute',
        top: '8px',
        left: '16px',
        transition: 'transform 0.2s',
      }}
      title={isFavorited ? '取消收藏' : '加入收藏'}
    >
      {isFavorited ? <FaHeart /> : <FaRegHeart />}
    </div>
  );
};

export default FavoriteButton;
