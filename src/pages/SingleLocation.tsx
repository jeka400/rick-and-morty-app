import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "../hooks/useLocation";
import { useCharactersByIds } from "../hooks/useCharactersByIds";
import { Container, Card } from "react-bootstrap";
import "../styles/SingleLocation.scss";

const SingleLocation: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: location, isLoading: locationLoading, isError: locationError } = useLocation(Number(id));

  const [characterIds, setCharacterIds] = useState<string[]>([]);
  const { data: charactersData, isLoading: charactersLoading, isError: charactersError } = useCharactersByIds(characterIds);

  useEffect(() => {
    if (location?.residents) {
      const ids = location.residents.map((url: string) => url.split("/").pop()).filter(Boolean) as string[];
      setCharacterIds(ids);
    }
  }, [location]);

  const handleCharacterClick = (id: number) => {
    navigate(`/characters/${id}`);
  };

  if (locationLoading || charactersLoading) return <div className="loading">Loading...</div>;
  if (locationError) return <div className="error">Error loading location data.</div>;
  if (charactersError) return <div className="error">Error loading characters data.</div>;

  return (
    <Container className="single-location-container">

        <h1 className="title-location-name text-center mb-4">{location?.name || "Unknown Location"}</h1>

        <div className="justify-content-center">
          <Card className="location-card">
            <Card.Body>
              <Card.Text><strong>Type:</strong> { location?.type || "Unknown" }</Card.Text>
              <Card.Text><strong>Dimension:</strong> { location?.dimension || "Unknown" }</Card.Text>
            </Card.Body>
          </Card>

          <div className="characters-card mt-4">
            <p className="text-center"><strong>Residents:</strong></p>

            <div className="characters-list-container">
              { charactersData?.map((character: any) => (
               <Card
                    className="character-card"
                    style={{ margin: "10px", width: "18rem"}}
                    key={ character.id }
                    onClick={ () => handleCharacterClick(character.id) }
                >
                  <Card.Img
                      variant="top"
                      src={ character.image }
                      alt={ character.name }
                  />

                  <Card.Body>
                      <Card.Title>{ character.name }</Card.Title>
                      <Card.Text>Status: { character.status }</Card.Text>
                  </Card.Body>
              </Card>
              ))}
            </div>
          </div>
      </div>
    </Container>
  );
};

export default SingleLocation;