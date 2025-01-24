import { useQuery } from "react-query";
import { fetchCharacter } from "../services/queries/character";

export const useCharacter = (id: string) => {
    return useQuery(["character", id], () => fetchCharacter(id), {
        enabled: !!id,
    });
};
