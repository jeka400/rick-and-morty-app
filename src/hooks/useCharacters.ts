import { useInfiniteQuery } from "react-query";
import { fetchCharacters } from "../services/queries/character";

export const useCharacters = () => {
    return useInfiniteQuery(
        "characters",
        fetchCharacters,
        {
            getNextPageParam: (lastPage) => {
                return lastPage.info.next ? lastPage.info.next.split("=")[1] : undefined;
            },
            keepPreviousData: true,
        }
    );
};
