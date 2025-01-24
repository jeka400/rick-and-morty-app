import { useQuery } from "react-query";
import { fetchEpisode } from "../services/queries/episode";

export const useEpisode = (id: number) => {
    return useQuery(["episode", id], () => fetchEpisode(id), {
        enabled: !!id,
    });
};