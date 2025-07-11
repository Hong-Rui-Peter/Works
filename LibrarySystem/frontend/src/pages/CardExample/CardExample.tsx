import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./CardExample.css";

interface CardExampleProps {
  id: number;
  bookName: string;
  bookText: string;
  author: string;
  bookIcon: string;
  tag: string;
  rank: number;
}

const CardExample: React.FC<CardExampleProps> = ({
  bookName,
  bookText,
  bookIcon,
  rank,
}) => {
  return (
    <div className="d-flex justify-content-around">
      <Card className="custom-card">
        <span className="ranking-number">{rank}</span>
        <Card.Img variant="top" src={bookIcon} />
        <Card.Body>
          <Card.Title>{bookName}</Card.Title>
          <Card.Text>
            {bookText.length > 100 ? bookText.slice(0, 15) + "..." : bookText}
          </Card.Text>
          <Button variant="primary">Go</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardExample;
