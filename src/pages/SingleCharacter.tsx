import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCharacter } from "../services/api"; 
import { Container, Card, Row, Col, ListGroup, Button } from "react-bootstrap";
import "../styles/SingleCharacter.scss";

const SingleCharacter: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [characterData, setCharacterData] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);

  const { data, isLoading, isError } = useCharacter(id ?? "");

  useEffect(() => {
    if (data) {
      setCharacterData(data);
      setLocation(data.location);
      setEpisodes(data.episode);
    }
  }, [data]);

  const handleLocationClick = () => {
    if (location?.id) {
      navigate(`/location/${location.id}`);
    }
  };

  const handleEpisodeClick = (episodeId: string) => {
    navigate(`/episode/${episodeId}`);
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">Error loading character data.</div>;

  return (
    <Container className="single-character-container mt-4">
      <Button 
        variant="outline-primary" 
        className="back-button mb-3"
        onClick={() => navigate("/characters")}
      >
        &larr; Back to Characters
      </Button>

      <Row className="justify-content-center mb-4">
        <h1 className="character-name text-center">{ characterData?.name }</h1>
      </Row>

      <Row className="justify-content-center">
        <Col lg={5} md={6} sm={12}>
          <Card className="character-card">
            <Card.Img
              variant="top"
              src={ characterData?.image }
              alt={ characterData?.name }
              className="character-image rounded"
            />
          </Card>
        </Col>

        <Col lg={7} md={6} sm={12}>
          <Card className="info-card mb-4">
            <Card.Body>
              <Card.Text><strong>Status:</strong> { characterData?.status }</Card.Text>

              <Card.Text><strong>Species:</strong> { characterData?.species }</Card.Text>

              <Card.Text><strong>Gender:</strong> { characterData?.gender }</Card.Text>

              <Button 
                variant="outline-info" 
                onClick={ handleLocationClick } 
                className="location-button mt-2"
              >
                <strong>Location:</strong> { location?.name || "Unknown Location" }
              </Button>
            </Card.Body>
          </Card>

          <Card className="episodes-card">
            <Card.Header className="episodes-title">Episodes:</Card.Header>

            <ListGroup variant="flush" className="episodes-list">
              { episodes?.map((episodeUrl: string, index: number) => {
                const episodeId = episodeUrl.split("/").pop();
                
                return (
                  episodeId && (
                    <ListGroup.Item key={ index } className="episode-item">
                      <Button 
                        variant="link" 
                        onClick={ () => handleEpisodeClick(episodeId) } 
                        className="episode-button"
                      >
                        Episode { episodeId }
                      </Button>
                    </ListGroup.Item>
                  )
                );
              })}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleCharacter;
