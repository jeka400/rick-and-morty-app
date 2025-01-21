import React, { useState } from "react";
import { useCharacters } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

const Characters: React.FC = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data } = useCharacters(page);

  const handleCharacterClick = (id: number) => {
    navigate(`/characters/${id}`);
  };

  return (
    <Container>
      <h1>Characters</h1>
      
      <div>
        {data.map((character: any) => (

            <Card 
                style={{ width: '18rem' }} 
                key={ character.id }
                onClick={ () => handleCharacterClick(character.id) }
            >
                <Card.Img variant="top" src={ character.image }  alt={ character.name}  />
                <Card.Body>
                    <Card.Title>{ character.name }</Card.Title>
                    <Card.Text>
                        Status: { character.status }
                    </Card.Text>
                </Card.Body>
            </Card>
        ))}
      </div>
    </Container>
  );
};

export default Characters;
