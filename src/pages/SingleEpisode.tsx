import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEpisode, useCharactersByIds } from "../services/api";
import { Container, Card } from "react-bootstrap";
import "../styles/SingleEpisode.scss";

const SingleEpisode: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: episode, isLoading: episodeLoading, isError: episodeError } = useEpisode(Number(id));
  const [characterIds, setCharacterIds] = useState<string[]>([]);
  const { data: charactersData, isLoading: charactersLoading, isError: charactersError } = useCharactersByIds(characterIds);

  useEffect(() => {
    if (episode?.characters) {
      const ids = episode.characters.map((url: string) => url.split("/").pop()).filter(Boolean) as string[];
      setCharacterIds(ids);
    }
  }, [episode]);

  const handleCharacterClick = (id: number) => {
    navigate(`/characters/${id}`);
  };

  if (episodeLoading || charactersLoading) return <div className="loading">Loading...</div>;
  if (episodeError) return <div className="error">Error loading episode data.</div>;
  if (charactersError) return <div className="error">Error loading characters data.</div>;

  return (
    <Container className="single-episode-container">

      <h1 className="title-episode-name text-center mb-4">{episode?.name || "Unknown Episode"}</h1>

      <div className="justify-content-center">
        <Card className="episode-card">
          <Card.Body>
            <Card.Text><strong>Air Date:</strong> {episode?.air_date || "Unknown"}</Card.Text>
            
            <Card.Text><strong>Episode:</strong> {episode?.episode || "Unknown"}</Card.Text>
          </Card.Body>
        </Card>

        <div className="characters-card">
          <p className="text-center"><strong>Characters:</strong></p>

          <div className="characters-list-container">
            {charactersData?.map((character: any) => (
              <Card
                className="character-card"
                style={{ margin: "10px", width: "18rem" }}
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

export default SingleEpisode;