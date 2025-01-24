import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from '../hooks/useLocation';
import { useCharactersByIds } from '../hooks/useCharactersByIds';
import { Container } from 'react-bootstrap';
import CharacterCard from '../components/CharacterCard';
import InfoCard from '../components/InfoCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import '../styles/SingleLocation.scss';

const SingleLocation: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: location,
    isLoading: locationLoading,
    isError: locationError,
  } = useLocation(Number(id));

  const [characterIds, setCharacterIds] = useState<string[]>([]);
  const {
    data: charactersData,
    isLoading: charactersLoading,
    isError: charactersError,
  } = useCharactersByIds(characterIds);

  useEffect(() => {
    if (location?.residents) {
      const ids = location.residents
        .map((url: string) => url.split('/').pop())
        .filter(Boolean) as string[];
      setCharacterIds(ids);
    }
  }, [location]);

  const handleCharacterClick = (id: number) => {
    navigate(`/characters/${id}`);
  };

  if (locationLoading || charactersLoading) return <Loading />;
  if (locationError) return <Error message="Error loading location data." />;
  if (charactersError) return <Error message="Error loading characters data." />;

  return (
    <Container className="single-location-container">
      <h1 className="title-location-name text-center mb-4">
        {location?.name || 'Unknown Location'}
      </h1>

      <div className="justify-content-center">
        <InfoCard title="Type" info={location?.type} />
        <InfoCard title="Dimension" info={location?.dimension} />

        <div className="characters-card mt-4">
          <p className="text-center">
            <strong>Residents:</strong>
          </p>

          <div className="characters-list-container">
            {charactersData?.map((character: any) => (
              <CharacterCard
                key={character.id}
                character={character}
                onClick={() => handleCharacterClick(character.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleLocation;
