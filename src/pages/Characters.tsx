import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCharacters } from '../hooks/useCharacters';
import { useNavigate } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import CharacterCard from '../components/CharacterCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import '../styles/Characters.scss';

const Characters: React.FC = () => {
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCharacters();

  const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]);

  const filterCharacters = (searchTerm: string) => {
    if (!data) return [];

    return data.pages
      .flatMap((page) => page.results)
      .filter((character: any) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
  };

  useEffect(() => {
    if (!data) return;

    const result = filterCharacters(search);
    setFilteredCharacters(result);
  }, [data, search]);

  if (isLoading && !data) {
    return <Loading />;
  }

  if (isError) {
    return <Error message="Error loading characters." />;
  }

  const totalCharacters = data?.pages[0]?.info?.count || 0;

  const noMoreCharactersMessage =
    filteredCharacters.length === 0
      ? 'No characters found.'
      : filteredCharacters.length >= totalCharacters
        ? 'No more characters to load.'
        : null;

  const handleCharacterClick = (id: number) => {
    navigate(`/characters/${id}`);
  };

  return (
    <Container className="characters-container">
      <div className="search-container">
        <h1 className="title-characters text-center mb-4">Characters</h1>

        <Form className="form-search">
          <div className="search-icon">
            <FaSearch />
          </div>

          <Form.Control
            type="search"
            placeholder="Search characters..."
            className="me-2"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form>
      </div>

      <InfiniteScroll
        dataLength={filteredCharacters.length}
        next={() => fetchNextPage()}
        hasMore={!!(filteredCharacters.length < totalCharacters && hasNextPage)}
        loader={
          hasNextPage &&
          !isFetchingNextPage && <h4>Loading more characters...</h4>
        }
        endMessage={
          !hasNextPage && (
            <p className="text-center">
              {noMoreCharactersMessage || 'All characters loaded.'}
            </p>
          )
        }
        pullDownToRefresh={true}
        refreshFunction={() => filterCharacters(search)}
      >
        <div className="characters-list-container">
          {filteredCharacters.length === 0 ? (
            <p>No characters match your search.</p>
          ) : (
            filteredCharacters.map((character: any) => (
              <CharacterCard
                key={character.id}
                character={character}
                onClick={() => handleCharacterClick(character.id)}
              />
            ))
          )}
        </div>
      </InfiniteScroll>
    </Container>
  );
};

export default Characters;
