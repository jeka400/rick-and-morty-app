import React from 'react';
import { Card } from 'react-bootstrap';

interface CharacterCardProps {
  character: any;
  onClick: (id: number) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  return (
    <Card
      className="character-card"
      style={{ margin: '10px', width: '18rem' }}
      onClick={() => onClick(character.id)}
    >
      <Card.Img variant="top" src={character.image} alt={character.name} />
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
        <Card.Text>Status: {character.status}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CharacterCard;
