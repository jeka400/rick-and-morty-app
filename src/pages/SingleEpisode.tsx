import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEpisode } from '../hooks/useEpisode';
import { useCharactersByIds } from '../hooks/useCharactersByIds';
import { Container } from 'react-bootstrap';
import CharacterCard from '../components/CharacterCard';
import InfoCard from '../components/InfoCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import '../styles/SingleEpisode.scss';

const SingleEpisode: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: episode,
    isLoading: episodeLoading,
    isError: episodeError,
  } = useEpisode(Number(id));

  const [characterIds, setCharacterIds] = useState<string[]>([]);
  const {
    data: charactersData,
    isLoading: charactersLoading,
    isError: charactersError,
  } = useCharactersByIds(characterIds);

  useEffect(() => {
    if (episode?.characters) {
      const ids = episode.characters
        .map((url: string) => url.split('/').pop())
        .filter(Boolean) as string[];
      setCharacterIds(ids);
    }
  }, [episode]);

  const handleCharacterClick = (id: number) => {
    navigate(`/characters/${id}`);
  };

  if (episodeLoading || charactersLoading) return <Loading />;
  if (episodeError) return <Error message="Error loading episode data." />;
  if (charactersError) return <Error message="Error loading characters data." />;

  return (
    <Container className="single-episode-container">
      <h1 className="title-episode-name text-center mb-4">
        {episode?.name || 'Unknown Episode'}
      </h1>

      <div className="justify-content-center">
        <InfoCard title="Air Date" info={episode?.air_date} />
        <InfoCard title="Episode" info={episode?.episode} />

        <div className="characters-card">
          <p className="text-center">
            <strong>Characters:</strong>
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

export default SingleEpisode;
