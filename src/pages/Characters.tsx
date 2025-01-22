import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCharacters } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form } from "react-bootstrap";

const Characters: React.FC = () => {
    const [search, setSearch] = useState("");
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
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    useEffect(() => {
        if (!data) return;

        const result = filterCharacters(search);
        setFilteredCharacters(result);
    }, [data, search]);

    if (isLoading && !data) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading characters.</div>;
    }

    const totalCharacters = data?.pages[0]?.info?.count || 0; 

    const noMoreCharactersMessage =
        filteredCharacters.length === 0
        ? "No characters found."
        : filteredCharacters.length >= totalCharacters
        ? "No more characters to load."
        : null;

    const handleCharacterClick = (id: number) => {
            navigate(`/characters/${id}`);
    };

    return (
        <Container>
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1020,
                    background: "#fff",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                }}
            >
                <h1>Characters</h1>
                <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search characters..."
                    className="me-2"
                    aria-label="Search"
                    value={ search }
                    onChange={ (e) => setSearch(e.target.value) }
                />
                </Form>
            </div>

            <InfiniteScroll
                dataLength={ filteredCharacters.length }
                next={ () => fetchNextPage() }
                hasMore={ !!(filteredCharacters.length < totalCharacters && hasNextPage) }
                loader={
                    hasNextPage && !isFetchingNextPage && <h4>Loading more characters...</h4>
                }
                endMessage={
                    !hasNextPage && (
                        <p className="text-center">
                            { noMoreCharactersMessage || "All characters loaded." }
                        </p>
                )
                }
                pullDownToRefresh={ true} 
                refreshFunction={ () => filterCharacters }
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                { filteredCharacters.length === 0 ? (
                    <p>No characters match your search.</p>
                ) : (
                    filteredCharacters.map((character: any) => (

                    <Card
                        style={{ width: "18rem", margin: "10px" }}
                        key={ character.id }
                        onClick={ () => handleCharacterClick(character.id)}
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
                    ))
                )}
                </div>
            </InfiniteScroll>
        </Container>
    );
};

export default Characters;
